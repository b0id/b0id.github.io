import React, { useState, useEffect, useRef } from 'react';
import './QBertSprite.css';

const QBertSprite = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [jumping, setJumping] = useState(false);
  const [spriteState, setSpriteState] = useState('idle'); // idle, jumping, falling
  const animationRef = useRef(null);
  const jumpTimerRef = useRef(0);

  useEffect(() => {
    let lastTimestamp = 0;
    const JUMP_INTERVAL = 2000; // ms between jumps
    
    const animate = (timestamp) => {
      // Calculate time delta
      const delta = timestamp - lastTimestamp;
      
      // Update jump timer
      jumpTimerRef.current += delta;
      
      // If it's time to jump
      if (jumpTimerRef.current >= JUMP_INTERVAL) {
        jumpTimerRef.current = 0;
        
        // Start jump sequence
        handleJump();
      }
      
      lastTimestamp = timestamp;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 60),
        y: prev.y
      }));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Jump animation sequence
  const handleJump = () => {
    // Random jump direction
    const newDirection = Math.random() > 0.5 ? 1 : -1;
    setDirection(newDirection);
    
    // Set jumping state
    setJumping(true);
    setSpriteState('jumping');
    
    // Calculate new position for landing
    setTimeout(() => {
      setPosition(prev => {
        const newX = prev.x + (newDirection * 60);
        const newY = prev.y + (Math.random() > 0.5 ? 30 : -30);
        
        // Keep within bounds
        return {
          x: Math.max(10, Math.min(window.innerWidth - 60, newX)),
          y: Math.max(10, Math.min(200, newY))
        };
      });
      
      // Set falling state
      setSpriteState('falling');
      
      // Complete the jump
      setTimeout(() => {
        setJumping(false);
        setSpriteState('idle');
        
        // Sometimes show speech bubble after landing
        if (Math.random() < 0.3) {
          setShowSpeechBubble(true);
          setTimeout(() => setShowSpeechBubble(false), 1500);
        }
      }, 300);
    }, 300);
  };

  return (
    <div 
      className={`qbert-sprite ${spriteState} ${jumping ? 'jumping' : ''}`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: `scaleX(${direction})`,
      }}
    >
      {/* Main body */}
      <div className="qbert-body"></div>
      
      {/* Eyes */}
      <div className="qbert-eyes">
        <div className="qbert-eye left"></div>
        <div className="qbert-eye right"></div>
      </div>
      
      {/* Nose */}
      <div className="qbert-nose"></div>
      
      {/* Legs - only visible during jump */}
      <div className="qbert-legs">
        <div className="qbert-leg left"></div>
        <div className="qbert-leg right"></div>
      </div>
      
      {/* Speech bubble */}
      {showSpeechBubble && (
        <div className="qbert-speech-bubble">
          @!#?@!
          <div className="speech-pointer"></div>
        </div>
      )}
    </div>
  );
};

export default QBertSprite;