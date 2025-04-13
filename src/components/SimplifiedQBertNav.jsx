// QBertNavigation.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './QBertNavigation.css';

const SimplifiedQBertNav = () => {
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
          qbert.jumpProgress = 1; const landedCubeId = qbert.targetCube; qbert.currentCube = landedCubeId; qbert.moving = false; updateQbertPosition();
          // Show standard "@!#?@!" bubble on successful landing
          setSpeechBubbleText("@!#?@!");
          if (speechBubbleTimeoutRef.current) { clearTimeout(speechBubbleTimeoutRef.current); }
          speechBubbleTimeoutRef.current = setTimeout(() => { setSpeechBubbleText(null); speechBubbleTimeoutRef.current = null; }, 5000);
          const targetRoute = cubeRoutes[landedCubeId]; if (targetRoute && location.pathname !== targetRoute) { navigate(targetRoute); } // Check targetRoute exists
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

  // --- Grid Creation - Modified for 4 Rows ---
  const createGrid = (width, height) => {
    const centerX = width / 2;
    // Move grid slightly higher to accommodate 4th row
    const topY = height * 0.2;
    const cubeSize = Math.max(40, Math.min(width / 6, 65)); // Slightly smaller max size maybe needed
    const cubeHeight = cubeSize * 0.5;
    const isoAngle = Math.PI / 6; const cosAngle = Math.cos(isoAngle); const sinAngle = Math.sin(isoAngle);
    const cubes = []; let cubeId = 1;
    const rows = 4; // INCREASED to 4 rows

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col <= row; col++) {
        // Stop creating cubes if we exceed the number defined in cubeRoutes
        if (cubeId > Object.keys(cubeRoutes).length) break;

        // Adjust vertical spacing slightly to fit 4 rows
        const x = centerX + (col - row / 2) * cubeSize * cosAngle * 1.8;
        const y = topY + row * (cubeSize * sinAngle + cubeHeight * 0.55); // Reduced multiplier

        cubes.push({
            id: cubeId,
            // route: cubeRoutes[cubeId], // Store route directly? Optional.
            x, y, row, col, visited: false
        });
        cubeId++; // Increment ID for next cube
      }
       if (cubeId > Object.keys(cubeRoutes).length) break; // Break outer loop too
    }
    console.log(`Grid created with ${rows} rows. Total cubes: ${cubes.length}`);
    return { cubes, cubeSize, cubeHeight, cosAngle, sinAngle };
  };
   // --- End Grid Creation ---

  // --- Main useEffect (Click handler uses scaled coords from previous fix) ---
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;

    // Initialization Logic
    if (!isInitialized.current) {
      console.log("Initializing QBertNav...");
      const resizeCanvas = () => { /* ... same resize using fixed height 400 ... */
          if (!canvas.parentElement) return; const parentRect = canvas.parentElement.getBoundingClientRect();
          const newWidth = parentRect.width - 32; // Assume 1rem padding
          const newHeight = 400; // Fixed height
          if (canvas.width !== newWidth || canvas.height !== newHeight) {
              canvas.width = newWidth; canvas.height = newHeight;
              console.log(`Canvas internal size set to: ${canvas.width}x${canvas.height}`);
              if (qbertRef.current) { gridRef.current = createGrid(canvas.width, canvas.height); if (!qbertRef.current.moving) { updateQbertPosition(); } }
          }
      };
      resizeCanvas(); window.addEventListener('resize', resizeCanvas);

      gridRef.current = createGrid(canvas.width, canvas.height);
      qbertRef.current = { /* ... qbert init ... */ currentCube: routeMap[location.pathname] || 1, targetCube: routeMap[location.pathname] || 1, x: 0, y: 0, moving: false, jumpProgress: 0, startX: 0, startY: 0, targetX: 0, targetY: 0, spriteWidth: 48, spriteHeight: 48, spriteImage: new Image(), spriteLoaded: false };
      qbertRef.current.spriteImage.onload = () => { if(qbertRef.current) qbertRef.current.spriteLoaded = true; }; qbertRef.current.spriteImage.onerror = () => { console.error("Failed Q*bert sprite load."); if(qbertRef.current) qbertRef.current.spriteLoaded = false; }; qbertRef.current.spriteImage.src = '/qbert-sprite.png';
      updateQbertPosition();

      const handleClick = (e) => { /* ... same scaled click handler ... */
          if (!qbertRef.current || qbertRef.current.moving || !gridRef.current || !canvasRef.current) return; const canvas = canvasRef.current; const rect = canvas.getBoundingClientRect();
          const scaleX = canvas.width / rect.width; const scaleY = canvas.height / rect.height;
          const canvasX = (e.clientX - rect.left) * scaleX; const canvasY = (e.clientY - rect.top) * scaleY;
          let clickedCube = null; let minDistance = Infinity; const clickRadius = 40;
          for (const cube of gridRef.current.cubes) { const dx = cube.x - canvasX; const dy = (cube.y - gridRef.current.cubeHeight / 2) - canvasY; const distance = Math.sqrt(dx * dx + dy * dy); if (distance < clickRadius && distance < minDistance) { clickedCube = cube; minDistance = distance; } }
          if (clickedCube) { console.log(`Canvas Clicked (Scaled): Cube ${clickedCube.id} at [${canvasX.toFixed(1)}, ${canvasY.toFixed(1)}]`); jumpToNewCube(clickedCube.id); }
      };
      canvas.addEventListener('click', handleClick);
      isInitialized.current = true;
      canvas.cleanupListeners = () => { console.log("Cleaning up QBertNav init listeners..."); window.removeEventListener('resize', resizeCanvas); canvas.removeEventListener('click', handleClick); };
    } // End Initialization

    // Check for Path Changes (Unchanged)
    const qbert = qbertRef.current; if (qbert && isInitialized.current) { const targetCubeIdFromPath = routeMap[location.pathname] || 1; if (targetCubeIdFromPath !== qbert.currentCube && !qbert.moving) { console.log(`Path changed to ${location.pathname}. Triggering jump from ${qbert.currentCube} to ${targetCubeIdFromPath}`); jumpToNewCube(targetCubeIdFromPath); } else if (targetCubeIdFromPath === qbert.currentCube && !qbert.moving) { updateQbertPosition(); } }

    // Animation Loop (Unchanged)
    const animate = () => { if (!canvasRef.current || !qbertRef.current || !gridRef.current) return; const currentCtx = canvasRef.current.getContext('2d'); if (!currentCtx) return; currentCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); if (qbertRef.current.moving) { updateQbertJump(); } drawGrid(currentCtx); drawQbert(currentCtx); frameId = requestAnimationFrame(animate); }; animate();

    // Cleanup (Unchanged)
    return () => { console.log("Running QBertNav cleanup..."); cancelAnimationFrame(frameId); if (speechBubbleTimeoutRef.current) { clearTimeout(speechBubbleTimeoutRef.current); speechBubbleTimeoutRef.current = null; } if (canvas && canvas.cleanupListeners) { canvas.cleanupListeners(); delete canvas.cleanupListeners; } };

  }, [location.pathname]); // Dependency


  return <canvas ref={canvasRef} className="qbert-canvas" />;
};

export default SimplifiedQBertNav;
