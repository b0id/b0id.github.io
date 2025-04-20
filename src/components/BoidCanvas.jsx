import React, { useEffect, useRef, useState } from 'react';
import './BoidCanvas.css'; // We'll create this CSS file

const BoidCanvas = (props) => {
  // Add props for opacity and other styling
  const { opacity = 1, showBorder = false } = props;

  // Add mobile detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const userChangedSize = useRef(false);
  
  // Refs for canvas and animation frame
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  // --- State for sliders ---
  // Updated boidSize to be smaller on mobile by default
  const [speed, setSpeed] = useState(0.1);
  const [boidSize, setBoidSize] = useState(isMobile ? 3 : 6);
  const [visualRange, setVisualRange] = useState(80);
  const [avoidRadius, setAvoidRadius] = useState(28);
  // New sliders for factors
  const [cohesionFactor, setCohesionFactor] = useState(0.003); // Cohesion strength
  const [separationFactor, setSeparationFactor] = useState(0.195); // Separation strength
  const [alignmentFactor, setAlignmentFactor] = useState(0.00); // Alignment strength
  // ------------------------

  // Check for mobile device on resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Update boid size when mobile status changes (only if user hasn't manually changed it)
  useEffect(() => {
    if (!userChangedSize.current) {
      setBoidSize(isMobile ? 3 : 6);
    }
  }, [isMobile]);

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
    
    // Function to resize canvas to match parent
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    
    // Set initial size and listen for window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // --- Boids Logic Functions (using paramsRef) ---

    const distance = (b1, b2) => Math.hypot(b1.x - b2.x, b1.y - b2.y);

    const keepWithinBounds = (boid) => {
      // Wrap around when boids leave the screen
      if (boid.x < 0) boid.x += canvas.width;
      if (boid.x > canvas.width) boid.x -= canvas.width;
      if (boid.y < 0) boid.y += canvas.height;
      if (boid.y > canvas.height) boid.y -= canvas.height;
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
    return () => { 
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) { 
        cancelAnimationFrame(animationFrameId.current); 
      }
      console.log("BoidCanvas cleaned up.");
    };
    // --- End Cleanup ---

  }, []); // Empty dependency array: runs only once on mount

  // --- JSX ---
  return (
    <div className="boid-simulator">
      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        style={{ 
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          border: showBorder ? '1px solid #444' : 'none'
        }}
      />
      
      {/* Controls positioned in top left */}
      <div className="boid-controls-topleft">
        {/* Existing Sliders */}
        <label>
          <span>Speed: ({speed.toFixed(1)})</span>
          <input type="range" min="0.1" max="2" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} />
        </label>
        <label>
          <span>Boid Size: ({boidSize})</span>
          <input 
            type="range" 
            min="2" 
            max="10" 
            step="1" 
            value={boidSize} 
            onChange={(e) => {
              userChangedSize.current = true;
              setBoidSize(parseInt(e.target.value, 10));
            }} 
          />
        </label>
        <label>
          <span>Visual Range: ({visualRange})</span>
          <input type="range" min="25" max="150" step="5" value={visualRange} onChange={(e) => setVisualRange(parseInt(e.target.value, 10))} />
        </label>
        <label>
          <span>Avoid Radius: ({avoidRadius})</span>
          <input type="range" min="5" max="50" step="1" value={avoidRadius} onChange={(e) => setAvoidRadius(parseInt(e.target.value, 10))} />
        </label>

        {/* Keep all the NEW Sliders for Factors */}
        <label>
          <span>Cohesion: ({cohesionFactor.toFixed(3)})</span>
          <input
            type="range"
            min="0"
            max="0.02"
            step="0.001"
            value={cohesionFactor}
            onChange={(e) => setCohesionFactor(parseFloat(e.target.value))}
          />
        </label>
        <label>
          <span>Separation: ({separationFactor.toFixed(3)})</span>
          <input
            type="range"
            min="0"
            max="0.2"
            step="0.005"
            value={separationFactor}
            onChange={(e) => setSeparationFactor(parseFloat(e.target.value))}
          />
        </label>
        <label>
          <span>Alignment: ({alignmentFactor.toFixed(3)})</span>
          <input
            type="range"
            min="0"
            max="0.2"
            step="0.005"
            value={alignmentFactor}
            onChange={(e) => setAlignmentFactor(parseFloat(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default BoidCanvas;
