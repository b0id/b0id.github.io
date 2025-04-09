import React, { useRef, useEffect } from 'react';

const BoidCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const boids = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
    }));

    let animationFrameId;
    const updateBoids = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      boids.forEach(boid => {
        boid.x += boid.vx;
        boid.y += boid.vy;
        if (boid.x < 0 || boid.x > canvas.width) boid.vx *= -1;
        if (boid.y < 0 || boid.y > canvas.height) boid.vy *= -1;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(boid.x, boid.y, 2, 2);
      });
      animationFrameId = requestAnimationFrame(updateBoids);
    };
    updateBoids();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />;
};

export default BoidCanvas;
