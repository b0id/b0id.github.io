// QBertNavigation.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './QBertNavigation.css';

const SimplifiedQBertNav = ({ isMobile = false }) => {
  console.log("QBertNav rendering...");
  const canvasRef = useRef(null);
  const qbertRef = useRef(null);
  const gridRef = useRef(null);
  const animationRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // State for Speech Bubble Text (null = hidden)
  const [speechBubbleText, setSpeechBubbleText] = useState(null);
  // Ref to store the speech bubble timeout
  const speechBubbleTimeoutRef = useRef(null);
  // Ref to track if initialization is done
  const isInitialized = useRef(false);

  // Add this state at the beginning of your component
  const [previousPath, setPreviousPath] = useState(location.pathname);

  // --- Mappings: Added Placeholders ---
  // Map routes to cube IDs (Placeholders don't strictly need entries here if using cubeRoutes directly)
  const routeMap = {
    '/': 1, '/nursing': 2, '/electronics': 3, '/engineering': 4, '/life': 5, '/about': 6,
    // Placeholders don't map *from* a route
  };
  // Map cube IDs to routes (null for placeholders)
  const cubeRoutes = {
    1: '/', 2: '/nursing', 3: '/electronics', 4: '/engineering', 5: '/life', 6: '/about',
    7: null, 8: null, 9: null, 10: null // Placeholders for the 4th row
  };
  // Color themes - Added placeholder color
  const placeholderColor = { top: '#555', left: '#333', right: '#444' }; // Grey for placeholders
  const cubeColors = {
    '/': { top: '#ebdc7d', left: '#633100', right: '#8a4500' }, // Base color for non-active non-placeholders
    '/nursing': { top: '#ff8a8a', left: '#cc6a6a', right: '#e57a7a' },
    '/electronics': { top: '#8aff8a', left: '#6acc6a', right: '#7ae57a' },
    '/engineering': { top: '#8ae8ff', left: '#6accdc', right: '#7ae0e5' },
    '/life': { top: '#ffd08a', left: '#ccaa6a', right: '#e5c07a' },
    '/about': { top: '#c08aff', left: '#a06acc', right: '#b07ae5' },
    // No explicit entry needed for null route, handled in drawGrid
  };
  // --- End Mappings ---

  // --- Helper Functions ---
  const getCubeById = (id) => { if (!gridRef.current) return null; return gridRef.current.cubes.find(cube => cube.id === id); };
  const updateQbertPosition = (cubeId) => { /* ... same ... */ const qbert = qbertRef.current; const grid = gridRef.current; if (!qbert || !grid) return; if (cubeId !== undefined) { qbert.currentCube = cubeId; } const cube = getCubeById(qbert.currentCube); if (cube) { qbert.x = cube.x; qbert.y = cube.y - (qbert.spriteHeight / 2) - (grid.cubeHeight / 4); } };

  // --- Modified jumpToNewCube to Handle Placeholders ---
  const jumpToNewCube = (targetCubeId) => {
    const qbert = qbertRef.current;
    const grid = gridRef.current;

    // Check if target is a placeholder BEFORE checking other conditions
    const targetRoute = cubeRoutes[targetCubeId];
    if (targetRoute === null) {
      console.log(`Clicked Placeholder Cube: ${targetCubeId}`);
      // Show "Coming Soon!" bubble and stop
      if (speechBubbleTimeoutRef.current) { clearTimeout(speechBubbleTimeoutRef.current); }
      setSpeechBubbleText("Coming Soon!"); // Set specific text
      speechBubbleTimeoutRef.current = setTimeout(() => {
          setSpeechBubbleText(null); // Hide after 5s
          speechBubbleTimeoutRef.current = null;
      }, 5000);
      return; // Do not proceed with jump animation
    }

    // Continue with normal jump logic if not a placeholder
    if (!qbert || !grid || qbert.moving || targetCubeId === qbert.currentCube) { console.log(`Jump cancelled or redundant: moving=${qbert?.moving}, target=${targetCubeId}, current=${qbert?.currentCube}`); if (qbert && targetCubeId === qbert.currentCube && !qbert.moving) { updateQbertPosition(); } return; }
    const targetCube = getCubeById(targetCubeId); const startCube = getCubeById(qbert.currentCube); if (!targetCube || !startCube) { console.error("Cannot find start or target cube for jump."); return; }
    console.log(`Starting jump from ${qbert.currentCube} to ${targetCubeId}`);
    if (speechBubbleTimeoutRef.current) { clearTimeout(speechBubbleTimeoutRef.current); speechBubbleTimeoutRef.current = null; setSpeechBubbleText(null); } // Clear any existing bubble
    qbert.startX = startCube.x; qbert.startY = startCube.y - (qbert.spriteHeight / 2) - (grid.cubeHeight / 4); qbert.targetX = targetCube.x; qbert.targetY = targetCube.y - (qbert.spriteHeight / 2) - (grid.cubeHeight / 4);
    qbert.targetCube = targetCubeId; qbert.moving = true; qbert.jumpProgress = 0;
    if (targetCube) targetCube.visited = true; // Mark target visited (ensure targetCube exists)
  };
  // --- End jumpToNewCube ---

  const updateQbertJump = () => {
      const qbert = qbertRef.current; if (!qbert || !qbert.moving) return;
      qbert.jumpProgress += 0.05;
      if (qbert.jumpProgress >= 1) {
          qbert.jumpProgress = 1; 
          const landedCubeId = qbert.targetCube; 
          qbert.currentCube = landedCubeId; 
          qbert.moving = false; 
          updateQbertPosition();
          
          // Show standard "@!#?@!" bubble on successful landing
          setSpeechBubbleText("@!#?@!");
          if (speechBubbleTimeoutRef.current) { clearTimeout(speechBubbleTimeoutRef.current); }
          speechBubbleTimeoutRef.current = setTimeout(() => { 
            setSpeechBubbleText(null); 
            speechBubbleTimeoutRef.current = null; 
          }, 5000);
          
          const targetRoute = cubeRoutes[landedCubeId]; 
          if (targetRoute && location.pathname !== targetRoute) { 
            console.log(`Navigating to: ${targetRoute} from cube ${landedCubeId}`);
            navigate(targetRoute); 
          } else if (targetRoute) {
            console.log(`Already on route: ${targetRoute}`);
          } else {
            console.log(`No navigation - cube ${landedCubeId} is a placeholder`);
          }
          
          qbert.jumpProgress = 0;
          return;
      }
      // ... jump interpolation logic (same) ...
      const t = qbert.jumpProgress; const startX = qbert.startX; const startY = qbert.startY; const targetX = qbert.targetX; const targetY = qbert.targetY; qbert.x = startX + (targetX - startX) * t; const baseY = startY + (targetY - startY) * t; const jumpHeight = 60; const jumpOffset = Math.sin(Math.PI * t) * jumpHeight; qbert.y = baseY - jumpOffset;
  };
  // --- End Helpers ---

  // --- Drawing Functions ---
  // --- Modified drawGrid to color placeholders ---
  const drawGrid = (ctx) => {
      const grid = gridRef.current; if (!grid || !grid.cubes) return;
      const currentPath = location.pathname;

      for (const cube of grid.cubes) {
          const { x, y, id } = cube;
          const route = cubeRoutes[id]; // Get route (could be null)
          const isActive = route === currentPath;
          let colors;

          if (route === null) {
              // Use placeholder color
              colors = placeholderColor;
          } else if (isActive) {
              // Use theme color for the active route
              colors = cubeColors[route] || cubeColors['/']; // Fallback to default if color missing
          } else {
              // Use default non-active color
              colors = cubeColors['/'];
          }

          const halfWidth = grid.cubeSize * grid.cosAngle;
          const halfHeight = grid.cubeSize * grid.sinAngle;
          const sideHeight = grid.cubeHeight;

          if (colors) { // Draw faces...
              ctx.beginPath(); ctx.moveTo(x, y - halfHeight); ctx.lineTo(x + halfWidth, y); ctx.lineTo(x, y + halfHeight); ctx.lineTo(x - halfWidth, y); ctx.closePath(); ctx.fillStyle = colors.top; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 1; ctx.stroke();
              ctx.beginPath(); ctx.moveTo(x - halfWidth, y); ctx.lineTo(x, y + halfHeight); ctx.lineTo(x, y + halfHeight + sideHeight); ctx.lineTo(x - halfWidth, y + sideHeight); ctx.closePath(); ctx.fillStyle = colors.left; ctx.fill(); ctx.stroke();
              ctx.beginPath(); ctx.moveTo(x + halfWidth, y); ctx.lineTo(x, y + halfHeight); ctx.lineTo(x, y + halfHeight + sideHeight); ctx.lineTo(x + halfWidth, y + sideHeight); ctx.closePath(); ctx.fillStyle = colors.right; ctx.fill(); ctx.stroke();
          }
      }
  };
  // --- End drawGrid ---

  // --- Modified drawQbert to use speechBubbleText state ---
  const drawQbert = (ctx) => {
      const qbert = qbertRef.current; if (!qbert) return; ctx.save();
      const drawX = qbert.x; const drawY = qbert.y;
      // ... sprite/fallback drawing (same) ...
      if (qbert.spriteLoaded && qbert.spriteImage) { ctx.drawImage(qbert.spriteImage, drawX - qbert.spriteWidth / 2, drawY - qbert.spriteHeight / 2, qbert.spriteWidth, qbert.spriteHeight); }
      else { const radius = 20; ctx.fillStyle = '#ff721c'; ctx.beginPath(); ctx.arc(drawX, drawY, radius, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(drawX - radius * 0.4, drawY - radius * 0.2, radius * 0.25, 0, Math.PI * 2); ctx.arc(drawX + radius * 0.4, drawY - radius * 0.2, radius * 0.25, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = 'black'; ctx.beginPath(); ctx.arc(drawX - radius * 0.4, drawY - radius * 0.2, radius * 0.1, 0, Math.PI * 2); ctx.arc(drawX + radius * 0.4, drawY - radius * 0.2, radius * 0.1, 0, Math.PI * 2); ctx.fill(); }

      // Draw speech bubble using text from state
      if (speechBubbleText) {
          const bubbleX = drawX + 25; const bubbleY = drawY - 50;
          // Adjust width slightly based on text? Or keep fixed.
          const dynamicWidth = ctx.measureText(speechBubbleText).width + 20;
          const bubbleW = Math.max(70, dynamicWidth); // Min width 70
          const bubbleH = 25; const bubbleR = 5;
          // ... bubble drawing geometry (same) ...
          ctx.fillStyle = 'white'; ctx.strokeStyle = '#000'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bubbleX + bubbleR, bubbleY); ctx.lineTo(bubbleX + bubbleW - bubbleR, bubbleY); ctx.quadraticCurveTo(bubbleX + bubbleW, bubbleY, bubbleX + bubbleW, bubbleY + bubbleR); ctx.lineTo(bubbleX + bubbleW, bubbleY + bubbleH - bubbleR); ctx.quadraticCurveTo(bubbleX + bubbleW, bubbleY + bubbleH, bubbleX + bubbleW - bubbleR, bubbleY + bubbleH); ctx.lineTo(bubbleX + bubbleR, bubbleY + bubbleH); ctx.quadraticCurveTo(bubbleX, bubbleY + bubbleH, bubbleX, bubbleY + bubbleH - bubbleR); ctx.lineTo(bubbleX, bubbleY + bubbleR); ctx.quadraticCurveTo(bubbleX, bubbleY, bubbleX + bubbleR, bubbleY); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(bubbleX + 10, bubbleY + bubbleH -1); ctx.lineTo(bubbleX + 15, bubbleY + bubbleH + 8); ctx.lineTo(bubbleX + 25, bubbleY + bubbleH -1); ctx.closePath(); ctx.fillStyle = 'white'; ctx.fill(); ctx.stroke();
          // Draw the text from state
          ctx.fillStyle = 'black'; ctx.font = 'bold 14px "JetBrains Mono", monospace';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(speechBubbleText, bubbleX + bubbleW / 2, bubbleY + bubbleH / 2);
      }
      ctx.restore();
  };
  // --- End drawQbert ---
  // --- End Drawing Functions ---

  // --- Grid Creation - Modified for Responsive Size ---
  const createGrid = (width, height) => {
    // Scale more appropriately for mobile
    const scale = isMobile ? 0.3 : 1; // Smaller scale for mobile
    
    const centerX = width / 2;
    // Move grid slightly higher to accommodate view
    const topY = height * (isMobile ? 0.25 : 0.2); // Adjusted for mobile
    
    // Adjust cube size for mobile
    const cubeSize = Math.max(25 * scale, Math.min(width / 7, 60 * scale)); 
    const cubeHeight = cubeSize * 0.5;
    const isoAngle = Math.PI / 6; 
    const cosAngle = Math.cos(isoAngle); 
    const sinAngle = Math.sin(isoAngle);
    const cubes = []; 
    let cubeId = 1;
    // Reduce rows for mobile
    const rows = isMobile ? 3 : 4;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col <= row; col++) {
        // Stop creating cubes if we exceed the number defined in cubeRoutes
        if (cubeId > Object.keys(cubeRoutes).length) break;

        // Adjust vertical spacing slightly to fit rows
        const x = centerX + (col - row / 2) * cubeSize * cosAngle * 1.8;
        const y = topY + row * (cubeSize * sinAngle + cubeHeight * 0.55);

        cubes.push({
            id: cubeId,
            x, y, row, col, visited: false
        });
        cubeId++;
      }
      if (cubeId > Object.keys(cubeRoutes).length) break;
    }
    
    return { cubes, cubeSize, cubeHeight, cosAngle, sinAngle };
  };
   // --- End Grid Creation ---

  // --- Main useEffect (Click handler uses scaled coords from previous fix) ---
  useEffect(() => {
    console.log("Main useEffect running, location:", location.pathname);
    const canvas = canvasRef.current; 
    if (!canvas) {
      console.error("Canvas ref is null!");
      return;
    }
    
    const ctx = canvas.getContext('2d');
    let frameId;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return; 
      const parentRect = canvas.parentElement.getBoundingClientRect();
      console.log("Parent element dimensions:", parentRect.width, parentRect.height);
      
      // Set size based on isMobile prop
      const newWidth = isMobile ? 100 : (parentRect.width - 32);
      const newHeight = isMobile ? 100 : 400;
      
      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth; 
        canvas.height = newHeight;
        console.log(`Canvas internal size set to: ${canvas.width}x${canvas.height}`);
        
        // Re-initialize grid when size changes
        gridRef.current = createGrid(canvas.width, canvas.height);
        updateQbertPosition();
      }
    };
    
    resizeCanvas(); 
    window.addEventListener('resize', resizeCanvas);

    // Only initialize Q*bert and grid if not already initialized
    // or if there is no existing movement happening
    if (!qbertRef.current || !gridRef.current) {
      console.log("Creating new grid and Q*bert instance");
      
      // Initialize grid
      gridRef.current = createGrid(canvas.width, canvas.height);
      
      // Initialize Q*bert at current route's position
      qbertRef.current = { 
        currentCube: routeMap[location.pathname] || 1, 
        targetCube: routeMap[location.pathname] || 1, 
        x: 0, y: 0, 
        moving: false, 
        jumpProgress: 0, 
        startX: 0, 
        startY: 0, 
        targetX: 0, 
        targetY: 0, 
        spriteWidth: 48, 
        spriteHeight: 48, 
        spriteImage: new Image(), 
        spriteLoaded: false 
      };
      
      qbertRef.current.spriteImage.onload = () => {
        qbertRef.current.spriteLoaded = true;
      }; 
      
      qbertRef.current.spriteImage.onerror = (e) => {
        console.error("Failed to load Q*bert sprite:", e);
      }; 
      
      qbertRef.current.spriteImage.src = '/qbert-sprite.png';
      updateQbertPosition();
    } else {
      // If Q*bert exists but isn't moving, update its current cube based on route
      // WITHOUT teleporting it (don't call updateQbertPosition)
      if (!qbertRef.current.moving) {
        const targetCubeId = routeMap[location.pathname];
        if (targetCubeId && targetCubeId !== qbertRef.current.currentCube) {
          console.log("Q*bert exists and not moving - will be repositioned by route change handler");
        }
      } else {
        console.log("Q*bert is currently moving - preserving animation state");
      }
    }

    // Define the handleClick function
    const handleClick = (e) => {
      if (!qbertRef.current || !gridRef.current || !canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      const canvasX = (e.clientX - rect.left) * scaleX;
      const canvasY = (e.clientY - rect.top) * scaleY;
      
      // Debug click position
      console.log(`Click at canvas coords: [${canvasX.toFixed(1)}, ${canvasY.toFixed(1)}]`);
      
      let clickedCube = null;
      let minDistance = Infinity;
      const clickRadius = 60; // Increased for easier clicking
      
      for (const cube of gridRef.current.cubes) {
        const dx = cube.x - canvasX;
        // Aim for the top of the cube for better click detection
        const dy = (cube.y - gridRef.current.cubeHeight/2) - canvasY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < clickRadius && distance < minDistance) {
          clickedCube = cube;
          minDistance = distance;
        }
      }
      
      if (clickedCube) {
        console.log(`Clicked cube ${clickedCube.id} (route: ${cubeRoutes[clickedCube.id] || 'placeholder'})`);
        jumpToNewCube(clickedCube.id);
      } else {
        console.log('No cube clicked');
      }
    };

    // Actually attach the click handler to the canvas
    canvas.addEventListener('click', handleClick);
    
    // Set up animation loop
    const animate = () => {
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(ctx);
        updateQbertJump(); // Update Q*bert position if moving
        drawQbert(ctx);
        frameId = requestAnimationFrame(animate);
      } catch (error) {
        console.error("Error in animation loop:", error);
        cancelAnimationFrame(frameId);
      }
    };
    
    // Start animation
    animate();
    isInitialized.current = true;
    
    // Clean up on unmount or when dependencies change
    return () => {
      console.log("Cleaning up Q*bert effect");
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [location.pathname, navigate, isMobile]); // Add isMobile to dependencies

  // Add a useEffect to detect route changes from navbar
  useEffect(() => {
    // Skip on initial render
    if (previousPath === location.pathname) return;
    
    console.log(`Route changed from ${previousPath} to ${location.pathname}`);
    
    // If Q*bert is initialized, animate the jump to the new route's cube
    const qbert = qbertRef.current;
    const grid = gridRef.current;
    
    if (qbert && grid && !qbert.moving) {
      const targetCubeId = routeMap[location.pathname];
      
      // Only animate if we have a valid target cube
      if (targetCubeId && targetCubeId !== qbert.currentCube) {
        console.log(`Animating Q*bert jump to cube ${targetCubeId} for route ${location.pathname}`);
        
        jumpToNewCube(targetCubeId);
      }
    }
    
    // Update previous path for next change
    setPreviousPath(location.pathname);
  }, [location.pathname]); // Remove previousPath from dependencies

  useEffect(() => {
    console.log("SimplifiedQBertNav mounted");
    return () => {
      console.log("SimplifiedQBertNav unmounted");
      // Reset initialization on unmount
      isInitialized.current = false;
    };
  }, []);
  
  // Make sure to return the canvas element
  return (
    <div className="qbert-nav-container" style={{ 
      width: '100%',
      height: '100%',
      padding: 0,
      margin: 0
    }}>
      <canvas 
        ref={canvasRef}
        className="qbert-canvas"
        style={{
          cursor: 'pointer', 
          borderRadius: '4px',
          border: 'none',
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
};

export default SimplifiedQBertNav;
