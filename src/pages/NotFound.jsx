import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const [jumpPosition, setJumpPosition] = useState(0);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  
  // Animate Q*bert jumping
  useEffect(() => {
    const jumpInterval = setInterval(() => {
      setJumpPosition(prev => (prev + 1) % 4);
      
      // Toggle speech bubble visibility
      if (jumpPosition === 0) {
        setShowSpeechBubble(true);
        setTimeout(() => setShowSpeechBubble(false), 2000);
      }
    }, 800);
    
    return () => clearInterval(jumpInterval);
  }, [jumpPosition]);
  
  return (
    <div className="not-found-container">
      <div className="pixel-box error-box">
        <h1 className="error-title">404</h1>
        <p className="error-subtitle">Page Not Found</p>
        
        <div className="qbert-container">
          <div 
            className={`qbert-sprite jump-${jumpPosition}`}
            style={{ 
              transform: `translateY(${jumpPosition === 1 || jumpPosition === 3 ? '-20px' : '0'})` 
            }}
          >
            {/* Q*bert basic shape */}
            <div className="qbert-body"></div>
            <div className="qbert-eyes">
              <div className="qbert-eye left"></div>
              <div className="qbert-eye right"></div>
            </div>
            <div className="qbert-nose"></div>
            
            {/* Speech bubble */}
            {showSpeechBubble && (
              <div className="speech-bubble">
                @!#?@!
                <div className="bubble-pointer"></div>
              </div>
            )}
          </div>
          
          {/* Isometric platform with cubes */}
          <div className="iso-platform">
            {Array.from({ length: 9 }).map((_, index) => (
              <div 
                key={index} 
                className={`platform-cube ${
                  index === 0 || index === 4 || index === 8 ? 'highlighted' : ''
                }`}
              ></div>
            ))}
          </div>
        </div>
        
        <p className="error-message">
          Oops! Q*bert seems to have jumped to a non-existent platform.
        </p>
        
        <Link to="/" className="return-button">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;