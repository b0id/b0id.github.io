import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './QBertNav.css';

// This component wraps your vanilla JS navigation module in React
const QBertNav = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Navigation configuration - map cube IDs to routes
  const routes = {
    1: '/',               // Home cube
    2: '/nursing',        // Nursing cube
    3: '/electronics',    // Electronics cube  
    4: '/engineering',    // Engineering cube
    5: '/life'            // Life Updates cube
  };

  // Initialize QBert navigation when component mounts
  useEffect(() => {
    if (!canvasRef.current) return;

    // Get the canvas element
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to fit container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight || 500; // fallback height
    };
    
    // Call resize initially and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize grid
    const grid = createGrid(canvas.width, canvas.height);
    
    // Initialize character
    const qbert = new Character('qbert', grid);
    
    // Set up navigation handler that integrates with React Router
    const navHandler = setupNavigation(qbert, (cubeId) => {
      // When navigation completes in the QBert module,
      // use React Router to change the actual route
      const targetRoute = routes[cubeId];
      if (targetRoute) {
        navigate(targetRoute);
      }
    });
    
    // Set initial cube based on current route
    const currentPath = location.pathname;
    const currentCubeId = Object.entries(routes).find(
      ([_, path]) => path === currentPath
    )?.[0];
    
    if (currentCubeId) {
      qbert.jumpTo(parseInt(currentCubeId));
    }
    
    // Game loop
    let lastTimestamp = 0;
    const gameLoop = (timestamp) => {
      // Calculate delta time for smooth animations
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = (timestamp - lastTimestamp) / 1000; // seconds
      lastTimestamp = timestamp;
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.fillStyle = '#121212';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw the game elements
      qbert.update(deltaTime);
      grid.draw(ctx);
      qbert.draw(ctx);
      
      // Continue the animation loop
      requestAnimationFrame(gameLoop);
    };
    
    // Start the game loop
    const animationId = requestAnimationFrame(gameLoop);
    
    // Clean up on component unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [navigate, location]);

  // Your existing QBert navigation functions
  // We're including these here to make the component self-contained
  function createGrid(width, height) {
    const pyramidLevels = 5; // Number of rows in the pyramid
    const cubeSize = 60;     // Base size of cubes
    const cubeHeight = cubeSize * 0.5; // Visual height of cube sides

    // Calculate positions based on screen size
    const centerX = width / 2;
    const topY = height / 4; // Start pyramid higher up

    // Isometric projection constants
    const isoAngle = Math.PI / 6; // 30 degrees
    const cosAngle = Math.cos(isoAngle);
    const sinAngle = Math.sin(isoAngle);

    // Calculate step distances
    const stepX = cubeSize * cosAngle;
    const stepY = cubeSize * sinAngle;

    // Generate cube positions
    const cubes = [];
    let cubeIdCounter = 1;
    
    for (let row = 0; row < pyramidLevels; row++) {
      for (let col = 0; col <= row; col++) {
        // Calculate isometric coordinates from grid position
        const isoX = (col - row / 2) * stepX * 2;
        const isoY = row * (stepY + cubeHeight / 2);

        const screenX = centerX + isoX;
        const screenY = topY + isoY;

        cubes.push({
          row,        // 0-based row index
          col,        // 0-based col index within row
          id: cubeIdCounter++,
          x: screenX, // Center X on screen
          y: screenY, // Top-center Y on screen
          color: '#ebdc7d', // Default Q*bert yellow
          visited: false,
          url: null
        });
      }
    }

    return {
      cubes,
      cubeSize,
      cubeHeight,
      cosAngle,
      sinAngle,

      draw(ctx) {
        ctx.save();
        // Draw cubes from back to front
        for (const cube of this.cubes) {
          this.drawCube(ctx, cube);
        }
        ctx.restore();
      },

      drawCube(ctx, cube) {
        const { x, y, color, visited } = cube;
        const topColor = visited ? '#ff721c' : color; // Orange when visited
        const leftColor = '#633100'; // Dark brown
        const rightColor = '#8a4500'; // Medium brown

        const halfWidth = this.cubeSize * this.cosAngle;
        const halfHeight = this.cubeSize * this.sinAngle;
        const sideHeight = this.cubeHeight;

        // Draw the cube faces
        // Top face (diamond)
        ctx.beginPath();
        ctx.moveTo(x, y - halfHeight); // Top point
        ctx.lineTo(x + halfWidth, y);   // Right point
        ctx.lineTo(x, y + halfHeight); // Bottom point
        ctx.lineTo(x - halfWidth, y);   // Left point
        ctx.closePath();
        ctx.fillStyle = topColor;
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Left face
        ctx.beginPath();
        ctx.moveTo(x - halfWidth, y);
        ctx.lineTo(x, y + halfHeight);
        ctx.lineTo(x, y + halfHeight + sideHeight);
        ctx.lineTo(x - halfWidth, y + sideHeight);
        ctx.closePath();
        ctx.fillStyle = leftColor;
        ctx.fill();
        ctx.stroke();

        // Right face
        ctx.beginPath();
        ctx.moveTo(x + halfWidth, y);
        ctx.lineTo(x, y + halfHeight);
        ctx.lineTo(x, y + halfHeight + sideHeight);
        ctx.lineTo(x + halfWidth, y + sideHeight);
        ctx.closePath();
        ctx.fillStyle = rightColor;
        ctx.fill();
        ctx.stroke();
      },

      getCubeAt(index) {
        return index >= 1 && index <= this.cubes.length ? this.cubes[index - 1] : null;
      },

      findCubeIndex(targetRow, targetCol) {
        const cube = this.cubes.find(c => c.row === targetRow && c.col === targetCol);
        return cube ? cube.id : -1;
      },

      markVisited(index) {
        const cube = this.getCubeAt(index);
        if (cube) {
          cube.visited = true;
        }
      },

      isValidPosition(pos) {
        if (!pos || pos.row < 0 || pos.row >= pyramidLevels) return false;
        if (pos.col < 0 || pos.col > pos.row) return false;
        return this.findCubeIndex(pos.row, pos.col) !== -1;
      }
    };
  }

  class Character {
    constructor(type, grid) {
      this.type = type;
      this.grid = grid;
      this.currentCube = 1; // Start at cube 1 (top)
      this.targetCube = 1;
      this.x = 0;
      this.y = 0;
      this.spriteWidth = 40;
      this.spriteHeight = 40;
      this.moving = false;
      this.jumpSpeed = 5; // Adjust for desired speed
      this.jumpHeight = 80; // Max height during jump
      this.jumpProgress = 0;

      // Initialize position
      this.updatePositionToCurrentCube();
    }

    updatePositionToCurrentCube() {
      const cube = this.grid.getCubeAt(this.currentCube);
      if (cube) {
        this.x = cube.x;
        this.y = cube.y - this.spriteHeight/2 - this.grid.cubeHeight/4;
      } else {
        console.error(`Cannot find cube ${this.currentCube}`);
        // Default position if cube not found
        this.x = 0;
        this.y = 0;
      }
    }

    jumpTo(targetCubeIndex) {
      if (this.moving || targetCubeIndex === this.currentCube) return;

      const targetCube = this.grid.getCubeAt(targetCubeIndex);
      if (!targetCube) {
        console.warn(`Invalid cube index: ${targetCubeIndex}`);
        return;
      }

      this.targetCube = targetCubeIndex;
      this.moving = true;
      this.jumpProgress = 0;

      // Mark the target cube as visited
      this.grid.markVisited(targetCubeIndex);
    }

    update(deltaTime) {
      if (!this.moving) return;

      const startCube = this.grid.getCubeAt(this.currentCube);
      const targetCube = this.grid.getCubeAt(this.targetCube);

      if (!startCube || !targetCube) {
        this.moving = false;
        return;
      }

      // Update jump progress
      this.jumpProgress += deltaTime * this.jumpSpeed;

      if (this.jumpProgress >= 1) {
        // Jump complete
        this.jumpProgress = 1;
        this.currentCube = this.targetCube;
        this.updatePositionToCurrentCube();
        this.moving = false;
        return;
      }

      // Calculate current position during jump
      const t = this.jumpProgress;
      const startX = startCube.x;
      const startY = startCube.y - this.spriteHeight/2 - this.grid.cubeHeight/4;
      const targetX = targetCube.x;
      const targetY = targetCube.y - this.spriteHeight/2 - this.grid.cubeHeight/4;

      // Linear interpolation for X and base Y
      this.x = startX + (targetX - startX) * t;
      const baseY = startY + (targetY - startY) * t;

      // Add parabolic jump arc
      const jumpOffset = Math.sin(Math.PI * t) * this.jumpHeight;
      this.y = baseY - jumpOffset;
    }

    draw(ctx) {
      // Fallback simple Q*bert drawing
      ctx.save();
      
      // Main body (orange circle)
      ctx.fillStyle = '#ff721c'; // Q*bert orange
      ctx.beginPath();
      ctx.arc(this.x, this.y + this.spriteHeight/2, this.spriteWidth/2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Simple eyes
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(this.x - 8, this.y + this.spriteHeight/2 - 5, 5, 0, Math.PI * 2);
      ctx.arc(this.x + 8, this.y + this.spriteHeight/2 - 5, 5, 0, Math.PI * 2);
      ctx.fill();
      
      // Pupils
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(this.x - 8, this.y + this.spriteHeight/2 - 5, 2, 0, Math.PI * 2);
      ctx.arc(this.x + 8, this.y + this.spriteHeight/2 - 5, 2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
  }

  // Handles clicking on the navigation links
  function setupNavigation(qbert, onNavigate) {
    // Add click event listeners to the cubes
    const handleCubeClick = (event) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Get click coordinates relative to canvas
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      
      // Find which cube was clicked
      const grid = qbert.grid;
      let closestCube = null;
      let closestDistance = Infinity;
      
      for (const cube of grid.cubes) {
        const dx = cube.x - clickX;
        const dy = cube.y - clickY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Check if point is close enough to cube
        if (distance < 50 && distance < closestDistance) {
          closestCube = cube;
          closestDistance = distance;
        }
      }
      
      if (closestCube && !qbert.moving) {
        // Jump to the clicked cube
        qbert.jumpTo(closestCube.id);
        
        // Call the navigation callback
        if (onNavigate) {
          setTimeout(() => {
            onNavigate(closestCube.id);
          }, 600); // Delay to allow jump animation to complete
        }
      }
    };
    
    // Add event listener
    canvasRef.current.addEventListener('click', handleCubeClick);
    
    // Return cleanup function
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('click', handleCubeClick);
      }
    };
  }

  return (
    <div className="qbert-navigation-container">
      <canvas ref={canvasRef} className="qbert-canvas" />
    </div>
  );
};

export default QBertNav;