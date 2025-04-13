import React, { useEffect, useRef, useState } from 'react';

const BoidCanvas = () => {
  // Refs for canvas and animation frame
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  // State for sliders
  const [speed, setSpeed] = useState(1);
  const [boidSize, setBoidSize] = useState(2);
  const [visualRange, setVisualRange] = useState(75);
  const [avoidRadius, setAvoidRadius] = useState(20);

  // Refs to store current simulation parameters for access within animation loop
  const paramsRef = useRef({ speed, boidSize, visualRange, avoidRadius });

  // Ref for the boids array
  const boids = useRef([]);

  // Fixed canvas dimensions
  const canvasWidth = 200;
  const canvasHeight = 200;

  // Update param refs whenever state changes
  useEffect(() => {
    paramsRef.current = { speed, boidSize, visualRange, avoidRadius };
  }, [speed, boidSize, visualRange, avoidRadius]);

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

    const flyTowardsCenter = (boid) => {
      const centeringFactor = 0.005; // Adjust velocity towards center
      let centerX = 0, centerY = 0, count = 0;
      // Use visualRange from paramsRef
      const currentVisualRange = paramsRef.current.visualRange;
      for (const other of boids.current) {
        // Check distance based on current visual range
        if (distance(boid, other) < currentVisualRange) {
          centerX += other.x;
          centerY += other.y;
          count++;
        }
      }
      if (count > 1) { // Only apply if there are other boids nearby
        centerX /= count;
        centerY /= count;
        boid.dx += (centerX - boid.x) * centeringFactor;
        boid.dy += (centerY - boid.y) * centeringFactor;
      }
    };

    const avoidOthers = (boid) => {
      const avoidFactor = 0.05; // Adjust velocity away from others
      let moveX = 0, moveY = 0;
      // Use avoidRadius from paramsRef
      const currentAvoidRadius = paramsRef.current.avoidRadius;
      for (const other of boids.current) {
        if (other !== boid) {
          // Check distance based on current avoid radius
          const dist = distance(boid, other);
          if (dist < currentAvoidRadius) {
            // Calculate vector away from the other boid
            moveX += (boid.x - other.x) / dist; // Normalize avoidance vector
            moveY += (boid.y - other.y) / dist;
          }
        }
      }
       // Apply avoidance force
      boid.dx += moveX * avoidFactor;
      boid.dy += moveY * avoidFactor;
    };

    const matchVelocity = (boid) => {
      const matchingFactor = 0.05; // Adjust velocity towards average
      let avgDX = 0, avgDY = 0, count = 0;
       // Use visualRange from paramsRef
      const currentVisualRange = paramsRef.current.visualRange;
      for (const other of boids.current) {
         // Check distance based on current visual range
        if (distance(boid, other) < currentVisualRange) {
          avgDX += other.dx;
          avgDY += other.dy;
          count++;
        }
      }
      if (count > 1) { // Only match if there are others nearby
        avgDX /= count;
        avgDY /= count;
        boid.dx += (avgDX - boid.dx) * matchingFactor;
        boid.dy += (avgDY - boid.dy) * matchingFactor;
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
      // Use boidSize from paramsRef
      const currentBoidSize = paramsRef.current.boidSize;
      ctx.save();
      ctx.translate(boid.x, boid.y);
      ctx.rotate(angle);
      ctx.fillStyle = '#558cf4'; // Boid color
      ctx.beginPath();
      // Draw triangle shape based on size
      ctx.moveTo(currentBoidSize, 0); // Tip of the triangle
      ctx.lineTo(-currentBoidSize, currentBoidSize / 1.5); // Back left corner
      ctx.lineTo(-currentBoidSize, -currentBoidSize / 1.5); // Back right corner
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // --- End Boids Logic ---

    // Initialize boids only once
    const initBoids = () => {
      boids.current = [];
      for (let i = 0; i < 100; i++) { // Number of boids
        boids.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: Math.random() * 4 - 2, // Initial velocity range
          dy: Math.random() * 4 - 2,
          // history: [], // History not used currently, removed for simplicity
        });
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get current speed from ref
      const currentSpeed = paramsRef.current.speed;

      // Update and draw each boid
      for (const boid of boids.current) {
        // Apply flocking rules
        flyTowardsCenter(boid);
        avoidOthers(boid);
        matchVelocity(boid);

        // Apply physics
        limitSpeed(boid);
        keepWithinBounds(boid);

        // Update position based on current speed
        boid.x += boid.dx * currentSpeed;
        boid.y += boid.dy * currentSpeed;

        // Draw the boid
        drawBoid(boid);
      }

      // Request next frame
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // --- Start Simulation ---
    initBoids(); // Create initial boids
    animate(); // Start animation loop
    // ----------------------

    // --- Cleanup function ---
    return () => {
      // Stop the animation loop on unmount
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      // No need to remove resize listener as it wasn't added
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
        // Style matches fixed attributes for consistency
        style={{ width: `${canvasWidth}px`, height: `${canvasHeight}px`, borderRadius: '8px', flexShrink: 0, border: '1px solid #444' }}
      />
      {/* Controls */}
      <div style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem', minWidth: '150px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Speed: ({speed.toFixed(1)})
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            style={{ width: '100%' }} // Make sliders take width
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Boid Size: ({boidSize})
          <input
            type="range"
            min="2" // Min size
            max="10" // Max size
            step="1"
            value={boidSize}
            onChange={(e) => setBoidSize(parseInt(e.target.value, 10))}
            style={{ width: '100%' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Visual Range: ({visualRange})
          <input
            type="range"
            min="25"
            max="150"
            step="5"
            value={visualRange}
            onChange={(e) => setVisualRange(parseInt(e.target.value, 10))}
            style={{ width: '100%' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Avoid Radius: ({avoidRadius})
          <input
            type="range"
            min="5"
            max="50"
            step="1" // Finer control for avoidance
            value={avoidRadius}
            onChange={(e) => setAvoidRadius(parseInt(e.target.value, 10))}
            style={{ width: '100%' }}
          />
        </label>
      </div>
    </div>
  );
};

export default BoidCanvas;
