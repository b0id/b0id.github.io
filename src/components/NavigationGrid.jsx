import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavigationGrid.css';

const sections = [
  { name: 'Nursing', path: '/nursing', color: 'purple' },
  { name: 'Electronics', path: '/electronics', color: 'yellow' },
  { name: 'Engineering', path: '/engineering', color: 'gray' },
  { name: 'Life Updates', path: '/life', color: 'purple' },
];

// Cube layout in isometric grid (just like in the Q*bert game)
const cubePositions = [
  { row: 0, col: 2 }, // top cube
  { row: 1, col: 1 }, // second row left
  { row: 1, col: 2 }, // second row right
  { row: 2, col: 1 }, // third row
];

const NavigationGrid = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredCube, setHoveredCube] = useState(null);
  const [qbertPosition, setQbertPosition] = useState({ row: 0, col: 2 });

  // Determine if a cube is active based on current path
  const isActive = (path) => location.pathname === path;

  // Handle animation when a cube is clicked
  const handleCubeClick = (path, index) => {
    // Set Q*bert position to the clicked cube
    setQbertPosition({
      row: cubePositions[index].row,
      col: cubePositions[index].col
    });
    
    // Navigate to the selected path
    navigate(path);
  };

  // Calculate proper grid position for cube display
  const calculatePosition = (row, col) => {
    // Each cube is offset based on its row and column
    const baseXOffset = 50; // percentage offset for columns
    const baseYOffset = 35; // percentage offset for rows
    
    return {
      left: `${col * baseXOffset}%`,
      top: `${row * baseYOffset}%`,
    };
  };

  // Calculate grid size to fit all cubes
  const gridStyle = {
    height: `${cubePositions.reduce((max, pos) => Math.max(max, pos.row), 0) * 35 + 150}px`,
  };

  return (
    <div className="qbert-navigation-grid" style={gridStyle}>
      {sections.map((section, index) => {
        const position = calculatePosition(cubePositions[index].row, cubePositions[index].col);
        const isActiveLink = isActive(section.path);
        
        return (
          <div
            key={section.path}
            className={`qbert-cube ${section.color} ${isActiveLink ? 'active' : ''} ${
              hoveredCube === index ? 'hovered' : ''
            }`}
            style={{
              left: position.left,
              top: position.top,
              zIndex: cubePositions[index].row,
            }}
            onClick={() => handleCubeClick(section.path, index)}
            onMouseEnter={() => setHoveredCube(index)}
            onMouseLeave={() => setHoveredCube(null)}
          >
            <div className="cube-top"></div>
            <div className="cube-left"></div>
            <div className="cube-right"></div>
            <div className="cube-label">{section.name}</div>
          </div>
        );
      })}

      {/* Q*bert avatar */}
      <div 
        className="qbert-avatar"
        style={{
          left: `${qbertPosition.col * 50 + 15}%`, 
          top: `${qbertPosition.row * 35 - 15}%`,
          zIndex: qbertPosition.row + 10
        }}
      >
        {/* This will be the sprite */}
        <div className="qbert-speech" style={{ display: hoveredCube !== null ? 'block' : 'none' }}>
          @!#?@!
        </div>
      </div>
    </div>
  );
};

export default NavigationGrid;