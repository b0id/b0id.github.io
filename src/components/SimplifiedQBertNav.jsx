// QBertNavigation.jsx
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './QBertNavigation.css';

const SimplifiedQBertNav = () => {
  const canvasRef = useRef(null);
  const qbertRef = useRef(null);
  const gridRef = useRef(null);
  const animationRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Map routes to cube IDs
  const routeMap = {
    '/': 1,
    '/nursing': 2,
    '/electronics': 3,
    '/engineering': 4,
    '/life': 5,
    '/about': 6
  };

  // Map cube IDs to routes
  const cubeRoutes = {
    1: '/',
    2: '/nursing',
    3: '/electronics',
    4: '/engineering',
    5: '/life',
    6: '/about'
  };

  // Color themes
  const cubeColors = {
    '/': { top: '#ebdc7d', left: '#633100', right: '#8a4500' },
    '/nursing': { top: '#ff6b6b', left: '#b63d3d', right: '#d44d4d' },
    '/electronics': { top: '#32ff7e', left: '#1a8c45', right: '#26bd5d' },
    '/engineering': { top: '#18dcff', left: '#0e89a3', right: '#14b4d4' },
    '/life': { top: '#ffad66', left: '#b86e2e', right: '#d9894a' },
    '/about': { top: '#7b68ee', left: '#4b3da8', right: '#5f4fc3' }
  };

  // Set up canvas and game objects
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 400;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create grid if it doesn't exist
    if (!gridRef.current) {
      gridRef.current = createGrid(canvas.width, canvas.height);
    }
    
    // Initialize Q*bert character
    if (!qbertRef.current) {
      qbertRef.current = {
        currentCube: routeMap[location.pathname] || 1,
        targetCube: routeMap[location.pathname] || 1,
        x: 0,
        y: 0,
        moving: false,
        jumpProgress: 0,
        spriteWidth: 40,
        spriteHeight: 40,
        spriteImage: new Image(),
        spriteLoaded: false
      };
      
      // Load sprite image
      qbertRef.current.spriteImage.onload = () => {
        qbertRef.current.spriteLoaded = true;
      };
      qbertRef.current.spriteImage.src = '/qbert-sprite.png';
      
      // Set initial position
      updateQbertPosition();
    }
    
    // Handle canvas clicks
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Find clicked cube
      const grid = gridRef.current;
      let clickedCube = null;
      let minDistance = Infinity;
      
      for (const cube of grid.cubes) {
        const dx = cube.x - x;
        const dy = cube.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 40 && distance < minDistance) {
          clickedCube = cube;
          minDistance = distance;
        }
      }
      
      if (clickedCube && !qbertRef.current.moving) {
        jumpToNewCube(clickedCube.id);
      }
    };
    
    canvas.addEventListener('click', handleClick);
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update Q*bert position if moving
      if (qbertRef.current.moving) {
        updateQbertJump();
      }
      
      // Draw grid and Q*bert
      drawGrid(ctx);
      drawQbert(ctx);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationRef.current);
    };
  }, [location.pathname]);
  
  // Helper functions
  const createGrid = (width, height) => {
    const centerX = width / 2;
    const topY = height / 4;
    const cubeSize = 60;
    const cubeHeight = cubeSize * 0.5;
    const isoAngle = Math.PI / 6;
    const cosAngle = Math.cos(isoAngle);
    const sinAngle = Math.sin(isoAngle);
    
    const cubes = [];
    let cubeId = 1;
    const rows = 3; // 3 rows for 6 cubes total
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col <= row; col++) {
        const x = centerX + (col - row / 2) * cubeSize * cosAngle * 2;
        const y = topY + row * (cubeSize * sinAngle + cubeHeight / 2);
        
        cubes.push({
          id: cubeId++,
          x, y,
          row, col,
          visited: false
        });
      }
    }
    
    return {
      cubes,
      cubeSize,
      cubeHeight,
      cosAngle,
      sinAngle
    };
  };
  
  const updateQbertPosition = () => {
    const qbert = qbertRef.current;
    const grid = gridRef.current;
    const cube = getCubeById(qbert.currentCube);
    
    if (cube) {
      qbert.x = cube.x;
      qbert.y = cube.y - qbert.spriteHeight / 2 - grid.cubeHeight / 4;
    }
  };
  
  const updateQbertJump = () => {
    const qbert = qbertRef.current;
    const grid = gridRef.current;
    const startCube = getCubeById(qbert.currentCube);
    const targetCube = getCubeById(qbert.targetCube);
    
    if (!startCube || !targetCube) {
      qbert.moving = false;
      return;
    }
    
    // Update jump progress
    qbert.jumpProgress += 0.05;
    
    if (qbert.jumpProgress >= 1) {
      // Jump complete
      qbert.jumpProgress = 0;
      qbert.currentCube = qbert.targetCube;
      qbert.moving = false;
      updateQbertPosition();
      
      // Navigate to the corresponding route
      navigate(cubeRoutes[qbert.currentCube]);
      return;
    }
    
    // Calculate current position during jump
    const t = qbert.jumpProgress;
    const startX = startCube.x;
    const startY = startCube.y - qbert.spriteHeight / 2 - grid.cubeHeight / 4;
    const targetX = targetCube.x;
    const targetY = targetCube.y - qbert.spriteHeight / 2 - grid.cubeHeight / 4;
    
    // Linear interpolation for X and base Y
    qbert.x = startX + (targetX - startX) * t;
    const baseY = startY + (targetY - startY) * t;
    
    // Add parabolic jump arc
    const jumpHeight = 60;
    const jumpOffset = Math.sin(Math.PI * t) * jumpHeight;
    qbert.y = baseY - jumpOffset;
  };
  
  const jumpToNewCube = (cubeId) => {
    const qbert = qbertRef.current;
    
    if (qbert.moving || cubeId === qbert.currentCube) return;
    
    const targetCube = getCubeById(cubeId);
    if (!targetCube) return;
    
    qbert.targetCube = cubeId;
    qbert.moving = true;
    qbert.jumpProgress = 0;
    
    // Mark the cube as visited
    const cube = getCubeById(cubeId);
    if (cube) {
      cube.visited = true;
    }
  };
  
  const getCubeById = (id) => {
    const grid = gridRef.current;
    return grid.cubes.find(cube => cube.id === id);
  };
  
  const drawGrid = (ctx) => {
    const grid = gridRef.current;
    const pathname = location.pathname;
    
    for (const cube of grid.cubes) {
      const { x, y } = cube;
      const route = cubeRoutes[cube.id];
      const colors = cube.visited || route === pathname ? cubeColors[route] : cubeColors['/'];
      
      const halfWidth = grid.cubeSize * grid.cosAngle;
      const halfHeight = grid.cubeSize * grid.sinAngle;
      const sideHeight = grid.cubeHeight;
      
      // Top face
      ctx.beginPath();
      ctx.moveTo(x, y - halfHeight);
      ctx.lineTo(x + halfWidth, y);
      ctx.lineTo(x, y + halfHeight);
      ctx.lineTo(x - halfWidth, y);
      ctx.closePath();
      ctx.fillStyle = colors.top;
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
      ctx.fillStyle = colors.left;
      ctx.fill();
      ctx.stroke();
      
      // Right face
      ctx.beginPath();
      ctx.moveTo(x + halfWidth, y);
      ctx.lineTo(x, y + halfHeight);
      ctx.lineTo(x, y + halfHeight + sideHeight);
      ctx.lineTo(x + halfWidth, y + sideHeight);
      ctx.closePath();
      ctx.fillStyle = colors.right;
      ctx.fill();
      ctx.stroke();
    }
  };
  
  const drawQbert = (ctx) => {
    const qbert = qbertRef.current;
    
    ctx.save();
    
    if (qbert.spriteLoaded) {
      // Draw sprite image
      ctx.drawImage(
        qbert.spriteImage,
        qbert.x - qbert.spriteWidth / 2,
        qbert.y - qbert.spriteHeight / 2,
        qbert.spriteWidth,
        qbert.spriteHeight
      );
    } else {
      // Fallback: Draw orange circle
      ctx.fillStyle = '#ff721c';
      ctx.beginPath();
      ctx.arc(qbert.x, qbert.y + qbert.spriteHeight / 4, qbert.spriteWidth / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw eyes
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(qbert.x - 8, qbert.y + qbert.spriteHeight / 4 - 5, 5, 0, Math.PI * 2);
      ctx.arc(qbert.x + 8, qbert.y + qbert.spriteHeight / 4 - 5, 5, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw pupils
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(qbert.x - 8, qbert.y + qbert.spriteHeight / 4 - 5, 2, 0, Math.PI * 2);
      ctx.arc(qbert.x + 8, qbert.y + qbert.spriteHeight / 4 - 5, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw speech bubble occasionally during jumps
    if (qbert.moving && qbert.jumpProgress > 0.5 && Math.random() < 0.2) {
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.roundRect(qbert.x + 20, qbert.y - 30, 70, 25, 5);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Speech bubble pointer
      ctx.beginPath();
      ctx.moveTo(qbert.x + 15, qbert.y - 10);
      ctx.lineTo(qbert.x + 25, qbert.y - 20);
      ctx.lineTo(qbert.x + 35, qbert.y - 10);
      ctx.closePath();
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.stroke();
      
      // Speech bubble text
      ctx.fillStyle = 'black';
      ctx.font = '12px "Press Start 2P", monospace';
      ctx.fillText('@!#?@!', qbert.x + 35, qbert.y - 15);
    }
    
    ctx.restore();
  };

  return <canvas ref={canvasRef} className="qbert-canvas" />;
};

export default SimplifiedQBertNav;
