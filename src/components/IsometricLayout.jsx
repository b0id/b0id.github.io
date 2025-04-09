import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import './IsometricLayout.css';

const sections = [
  { name: 'Electronics', path: '/electronics', color: 'gold' },
  { name: 'Nursing', path: '/nursing', color: 'purple' },
  { name: 'Engineering', path: '/engineering', color: 'grey' },
  { name: 'Life Updates', path: '/life', color: 'blue' }
];

// Define the positions as seen in your second image
const cubePositions = [
  { top: 340, left: 753, section: 'Nursing', rotate: 0, cubeSize: 80 },
  { top: 400, left: 700, section: 'Engineering', rotate: 0, cubeSize: 80 },
  { top: 330, left: 650, section: 'Electronics', rotate: 0, cubeSize: 80 },
  { top: 450, left: 750, section: 'Life Updates', rotate: 0, cubeSize: 80 }
];

const IsometricLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [qbertPosition, setQbertPosition] = useState({ top: 270, left: 843 });
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [activeCube, setActiveCube] = useState('');

  // Handle navigation when a cube is clicked
  const handleCubeClick = (path, section) => {
    // Find the position for the clicked cube
    const cubePosition = cubePositions.find(pos => pos.section === section);
    
    // Set Q*bert position to "hop" onto that cube
    if (cubePosition) {
      setQbertPosition({
        top: cubePosition.top - 60, // Position Q*bert above the cube
        left: cubePosition.left + 20
      });
      
      // Show speech bubble when navigating
      setShowSpeechBubble(true);
      setTimeout(() => setShowSpeechBubble(false), 2000);
      
      // Set active cube
      setActiveCube(section);
      
      // Navigate to the selected path
      navigate(path);
    }
  };

  // Set active cube based on current path
  useEffect(() => {
    const currentPath = location.pathname.substring(1) || 'home';
    const currentSection = sections.find(section => 
      section.path === `/${currentPath}` || 
      (currentPath === 'home' && section.path === '/electronics')
    );
    
    if (currentSection) {
      setActiveCube(currentSection.name);
    }
  }, [location]);

  return (
    <div className="isometric-layout">
      {/* Green "b0id" logo */}
      <div className="boid-logo">
        <img src="/boid-logo.png" alt="b0id logo" />
      </div>
      
      {/* Navigation cubes */}
      {cubePositions.map((position, index) => {
        const section = sections.find(s => s.name === position.section);
        if (!section) return null;
        
        const isActive = activeCube === section.name;
        
        return (
          <div
            key={section.path}
            className={`isometric-cube ${section.color.toLowerCase()} ${isActive ? 'active' : ''}`}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              transform: `rotate(${position.rotate}deg)`,
              zIndex: isActive ? 10 : 5
            }}
            onClick={() => handleCubeClick(section.path, section.name)}
          >
            <div className="isometric-cube-top"></div>
            <div className="isometric-cube-right"></div>
            <div className="isometric-cube-left"></div>
            <div className="cube-label">{section.name}</div>
          </div>
        );
      })}
      
      {/* Q*bert sprite */}
      <div 
        className="qbert-character"
        style={{
          top: `${qbertPosition.top}px`,
          left: `${qbertPosition.left}px`,
          zIndex: 20
        }}
      >
        {/* Orange Q*bert character from sprite sheet */}
        <div className="qbert-sprite"></div>
        
        {/* Speech bubble */}
        {showSpeechBubble && (
          <div className="speech-bubble">
            @!#?@!
          </div>
        )}
      </div>
      
      {/* Page content section - this would contain the current page */}
      <div className="page-content">
        {/* Current page content would go here */}
      </div>
    </div>
  );
};

export default IsometricLayout;