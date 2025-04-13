import React, { useEffect, useRef, useState } from 'react';

const BoidCanvas = () => {
  // Refs for canvas and animation frame
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  // --- State for sliders ---
  // Existing
  const [speed, setSpeed] = useState(1);
  const [boidSize, setBoidSize] = useState(2);
  const [visualRange, setVisualRange] = useState(75);
  const [avoidRadius, setAvoidRadius] = useState(20);
  // New sliders for factors
  const [cohesionFactor, setCohesionFactor] = useState(0.005); // Cohesion strength
  const [separationFactor, setSeparationFactor] = useState(0.05); // Separation strength
  const [alignmentFactor, setAlignmentFactor] = useState(0.05); // Alignment strength
  // ------------------------

  // Refs to store current simulation parameters for access within animation loop
  // Updated to include new factors
  const paramsRef = useRef({
    speed,
    boidSize,
    visualRange,
    avoidRadius,
    cohesionFactor,
    separationFactor,
    alignmentFactor,
  });

  // Ref for the boids array
  const boids = useRef([]);

  // Fixed canvas dimensions
  const canvasWidth = 200;
  const canvasHeight = 200;

  // Update param refs whenever state changes
  // Updated dependencies to include new factors
  useEffect(() => {
    paramsRef.current = {
      speed,
      boidSize,
      visualRange,
      avoidRadius,
      cohesionFactor,
      separationFactor,
      alignmentFactor,
    };
  }, [speed, boidSize, visualRange, avoidRadius, cohesionFactor, separationFactor, alignmentFactor]); // Added new dependencies

  // Main effect for initialization and animation loop - runs only once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // --- Boids Logic Functions (using paramsRef) ---

    const distance = (b1, b2) => Math.hypot(b1.x - b2.x, b1.y - b2.y);

    const keepWithinBounds = (boid) => {
      const margin = 20; // How close to edge before turning
      const turnFactor = 1; // How quickly to turn
      if (boid.x < margin) boid.dx += turnFactor;
      if (boid.x > canvas.width - margin) boid.dx -= turnFactor;
      if (boid.y < margin) boid.dy += turnFactor;
      if (boid.y > canvas.height - margin) boid.dy -= turnFactor;
    };

    // --- Updated to use cohesionFactor from paramsRef ---
    const flyTowardsCenter = (boid) => {
      // const centeringFactor = 0.005; // Old hardcoded value
      const currentCenteringFactor = paramsRef.current.cohesionFactor; // Use ref
      let centerX = 0, centerY = 0, count = 0;
      const currentVisualRange = paramsRef.current.visualRange;
      for (const other of boids.current) {
        if (distance(boid, other) < currentVisualRange) {
          centerX += other.x;
          centerY += other.y;
          count++;
        }
      }
      if (count > 1) {
        centerX /= count;
        centerY /= count;
        // Use current factor from ref
        boid.dx += (centerX - boid.x) * currentCenteringFactor;
        boid.dy += (centerY - boid.y) * currentCenteringFactor;
      }
    };

    // --- Updated to use separationFactor from paramsRef ---
    const avoidOthers = (boid) => {
      // const avoidFactor = 0.05; // Old hardcoded value
      const currentAvoidFactor = paramsRef.current.separationFactor; // Use ref
      let moveX = 0, moveY = 0;
      const currentAvoidRadius = paramsRef.current.avoidRadius;
      for (const other of boids.current) {
        if (other !== boid) {
          const dist = distance(boid, other);
          if (dist > 0 && dist < currentAvoidRadius) { // Ensure dist > 0 to avoid division by zero
            // Calculate vector away from the other boid, weighted by distance
             moveX += (boid.x - other.x) / dist;
             moveY += (boid.y - other.y) / dist;
          }
        }
      }
       // Apply avoidance force using current factor from ref
      boid.dx += moveX * currentAvoidFactor;
      boid.dy += moveY * currentAvoidFactor;
    };

    // --- Updated to use alignmentFactor from paramsRef ---
    const matchVelocity = (boid) => {
      // const matchingFactor = 0.05; // Old hardcoded value
      const currentMatchingFactor = paramsRef.current.alignmentFactor; // Use ref
      let avgDX = 0, avgDY = 0, count = 0;
      const currentVisualRange = paramsRef.current.visualRange;
      for (const other of boids.current) {
        if (distance(boid, other) < currentVisualRange) {
          avgDX += other.dx;
          avgDY += other.dy;
          count++;
        }
      }
      if (count > 1) {
        avgDX /= count;
        avgDY /= count;
        // Use current factor from ref
        boid.dx += (avgDX - boid.dx) * currentMatchingFactor;
        boid.dy += (avgDY - boid.dy) * currentMatchingFactor;
      }
    };

    const limitSpeed = (boid) => {
      const speedLimit = 15; // Max pixels per frame
      const spd = Math.hypot(boid.dx, boid.dy);
      if (spd > speedLimit) {
        boid.dx = (boid.dx / spd) * speedLimit;
        boid.dy = (boid.dy / spd) * speedLimit;
      }
    };

    const drawBoid = (boid) => {
      const angle = Math.atan2(boid.dy, boid.dx);
      const currentBoidSize = paramsRef.current.boidSize;
      ctx.save();
      ctx.translate(boid.x, boid.y);
      ctx.rotate(angle);
      ctx.fillStyle = '#558cf4'; // Boid color
      ctx.beginPath();
      ctx.moveTo(currentBoidSize, 0);
      ctx.lineTo(-currentBoidSize, currentBoidSize / 1.5);
      ctx.lineTo(-currentBoidSize, -currentBoidSize / 1.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // --- End Boids Logic ---

    // Initialize boids only once
    const initBoids = () => { /* ... same init logic ... */
        boids.current = [];
        for (let i = 0; i < 100; i++) {
            boids.current.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, dx: Math.random() * 4 - 2, dy: Math.random() * 4 - 2, });
        }
    };

    // Animation loop
    const animate = () => { /* ... same animation logic ... */
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const currentSpeed = paramsRef.current.speed;
        for (const boid of boids.current) {
            flyTowardsCenter(boid); avoidOthers(boid); matchVelocity(boid);
            limitSpeed(boid); keepWithinBounds(boid);
            boid.x += boid.dx * currentSpeed; boid.y += boid.dy * currentSpeed;
            drawBoid(boid);
        }
        animationFrameId.current = requestAnimationFrame(animate);
    };

    // --- Start Simulation ---
    initBoids();
    animate();
    // ----------------------

    // --- Cleanup function ---
    return () => { /* ... same cleanup logic ... */
        if (animationFrameId.current) { cancelAnimationFrame(animationFrameId.current); }
        console.log("BoidCanvas cleaned up.");
    };
    // --- End Cleanup ---

  }, []); // Empty dependency array: runs only once on mount

  // --- JSX ---
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        style={{ width: `${canvasWidth}px`, height: `${canvasHeight}px`, borderRadius: '8px', flexShrink: 0, border: '1px solid #444' }}
      />
      {/* Controls */}
      <div style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem', minWidth: '150px' }}>
        {/* Existing Sliders */}
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Speed: ({speed.toFixed(1)})
          <input type="range" min="0.1" max="2" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} style={{ width: '100%' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Boid Size: ({boidSize})
          <input type="range" min="2" max="10" step="1" value={boidSize} onChange={(e) => setBoidSize(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Visual Range: ({visualRange})
          <input type="range" min="25" max="150" step="5" value={visualRange} onChange={(e) => setVisualRange(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Avoid Radius: ({avoidRadius})
          <input type="range" min="5" max="50" step="1" value={avoidRadius} onChange={(e) => setAvoidRadius(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
        </label>

        {/* --- NEW Sliders for Factors --- */}
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Cohesion: ({cohesionFactor.toFixed(3)})
          <input
            type="range"
            min="0"
            max="0.02" // Adjust max as needed
            step="0.001"
            value={cohesionFactor}
            onChange={(e) => setCohesionFactor(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Separation: ({separationFactor.toFixed(3)})
          <input
            type="range"
            min="0"
            max="0.2" // Adjust max as needed
            step="0.005"
            value={separationFactor}
            onChange={(e) => setSeparationFactor(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Alignment: ({alignmentFactor.toFixed(3)})
          <input
            type="range"
            min="0"
            max="0.2" // Adjust max as needed
            step="0.005"
            value={alignmentFactor}
            onChange={(e) => setAlignmentFactor(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </label>
        {/* --- End NEW Sliders --- */}

      </div>
    </div>
  );
};

export default BoidCanvas;
