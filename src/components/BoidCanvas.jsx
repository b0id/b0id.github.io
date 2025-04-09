import React, { useRef, useEffect, useState } from 'react';

const BoidCanvas = ({ theme = 'default' }) => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Theme colors based on the current section
  const themeColors = {
    default: { primary: '#7b68ee', secondary: '#5d478b' },
    nursing: { primary: '#ff6b6b', secondary: '#ee5253' },
    electronics: { primary: '#32ff7e', secondary: '#3ae374' },
    engineering: { primary: '#18dcff', secondary: '#17c0eb' },
    life: { primary: '#ffad66', secondary: '#ff9f43' }
  };

  const colors = themeColors[theme] || themeColors.default;

  // Boid configuration
  const BOID_COUNT = 50;
  const SEPARATION_RADIUS = 25;
  const ALIGNMENT_RADIUS = 50;
  const COHESION_RADIUS = 50;
  const SEPARATION_FORCE = 1.5;
  const ALIGNMENT_FORCE = 1.0;
  const COHESION_FORCE = 1.0;
  const MAX_SPEED = 2;
  const BOID_SIZE = 3;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setDimensions({ width: canvas.width, height: canvas.height });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Initialize boids
    const boids = Array.from({ length: BOID_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
      color: Math.random() > 0.5 ? colors.primary : colors.secondary
    }));

    const calculateForces = (boid, boids) => {
      let separationX = 0, separationY = 0, separationCount = 0;
      let alignmentX = 0, alignmentY = 0, alignmentCount = 0;
      let cohesionX = 0, cohesionY = 0, cohesionCount = 0;
      
      boids.forEach(other => {
        if (boid === other) return;
        
        const dx = other.x - boid.x;
        const dy = other.y - boid.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Separation
        if (distance < SEPARATION_RADIUS) {
          separationX -= dx / distance;
          separationY -= dy / distance;
          separationCount++;
        }
        
        // Alignment
        if (distance < ALIGNMENT_RADIUS) {
          alignmentX += other.vx;
          alignmentY += other.vy;
          alignmentCount++;
        }
        
        // Cohesion
        if (distance < COHESION_RADIUS) {
          cohesionX += other.x;
          cohesionY += other.y;
          cohesionCount++;
        }
      });
      
      // Normalize separation
      if (separationCount > 0) {
        separationX /= separationCount;
        separationY /= separationCount;
      }
      
      // Normalize alignment
      if (alignmentCount > 0) {
        alignmentX /= alignmentCount;
        alignmentY /= alignmentCount;
      }
      
      // Normalize cohesion
      if (cohesionCount > 0) {
        cohesionX = cohesionX / cohesionCount - boid.x;
        cohesionY = cohesionY / cohesionCount - boid.y;
        
        // Normalize the direction
        const length = Math.sqrt(cohesionX * cohesionX + cohesionY * cohesionY);
        if (length > 0) {
          cohesionX /= length;
          cohesionY /= length;
        }
      }
      
      return {
        separation: { x: separationX, y: separationY },
        alignment: { x: alignmentX, y: alignmentY },
        cohesion: { x: cohesionX, y: cohesionY }
      };
    };

    const updateBoids = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update each boid
      for (let i = 0; i < boids.length; i++) {
        const boid = boids[i];
        
        // Calculate forces
        const { separation, alignment, cohesion } = calculateForces(boid, boids);
        
        // Update velocity
        boid.vx += separation.x * SEPARATION_FORCE + 
                   alignment.x * ALIGNMENT_FORCE + 
                   cohesion.x * COHESION_FORCE;
        boid.vy += separation.y * SEPARATION_FORCE + 
                   alignment.y * ALIGNMENT_FORCE + 
                   cohesion.y * COHESION_FORCE;
        
        // Limit speed
        const speed = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy);
        if (speed > MAX_SPEED) {
          boid.vx = (boid.vx / speed) * MAX_SPEED;
          boid.vy = (boid.vy / speed) * MAX_SPEED;
        }
        
        // Update position
        boid.x += boid.vx;
        boid.y += boid.vy;
        
        // Wrap around screen
        if (boid.x < 0) boid.x = canvas.width;
        if (boid.y < 0) boid.y = canvas.height;
        if (boid.x > canvas.width) boid.x = 0;
        if (boid.y > canvas.height) boid.y = 0;
        
        // Draw boid as pixelated square (8-bit style)
        ctx.fillStyle = boid.color;
        ctx.fillRect(
          Math.floor(boid.x), 
          Math.floor(boid.y), 
          BOID_SIZE, 
          BOID_SIZE
        );
      }
      
      animationFrameId.current = requestAnimationFrame(updateBoids);
    };
    
    updateBoids();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [theme]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />;
};

export default BoidCanvas;