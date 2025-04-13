import React, { useState } from 'react';

const QBertTech = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="page-container">
      <h1 className="page-title">Q*bert Navigation System</h1>
      
      <div className="pixel-box">
        <h2>Isometric Navigation Inspired by Classic Gaming</h2>
        <p>
          The navigation system on this site is inspired by the classic arcade game Q*bert, 
          which uses an isometric pyramid of cubes for gameplay. This retro-inspired design
          choice complements the pixel art aesthetic and connects to my interest in 
          emergent behaviors.
        </p>
      </div>
      
      <div className="section-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'technical' ? 'active' : ''}`}
          onClick={() => setActiveTab('technical')}
        >
          Technical Details
        </button>
        <button 
          className={`tab-btn ${activeTab === 'animation' ? 'active' : ''}`}
          onClick={() => setActiveTab('animation')}
        >
          Animation
        </button>
      </div>
      
      {activeTab === 'overview' && (
        <div className="tab-content">
          <div className="pixel-box">
            <h2>Design Concept</h2>
            <p>
              Q*bert's isometric grid creates a unique spatial relationship between different
              sections of the site. Just as each cube in Q*bert connects to others in specific ways,
              the sections of this site are conceptually connected through the lens of emergent behavior.
            </p>
            
            <div className="concept-item">
              <h3>Isometric Perspective</h3>
              <p>
                The isometric view provides a unique perspective that bridges 2D and 3D space,
                symbolizing how I approach problems from multiple angles simultaneously.
              </p>
            </div>
            
            <div className="concept-item">
              <h3>Character Movement</h3>
              <p>
                Q*bert's character jumps from cube to cube with distinct movement patterns.
                Similarly, navigating between conceptual spaces requires "jumping" between
                different modes of thinking.
              </p>
            </div>
            
            <div className="concept-item">
              <h3>Color Changes</h3>
              <p>
                In the original game, Q*bert changes the color of cubes by jumping on them.
                This represents how exploring different fields changes my perspective and
                understanding of each domain.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'technical' && (
        <div className="tab-content">
          <div className="pixel-box">
            <h2>Implementation Details</h2>
            <p>
              The navigation system is built using HTML5 Canvas and React, combining
              retro game mechanics with modern web development techniques.
            </p>
            
            <div className="tech-grid">
              <div className="tech-item">
                <h3>Canvas Rendering</h3>
                <p>
                  Isometric cubes are drawn using HTML5 Canvas with custom drawing functions
                  that create the illusion of 3D space through careful use of geometry and color.
                </p>
                <div className="code-snippet">
                  <pre>
                    <code>
{`// Draw isometric cube
const drawCube = (ctx, x, y, size, color) => {
  const halfSize = size / 2;
  
  // Top face (diamond)
  ctx.beginPath();
  ctx.moveTo(x, y - halfSize);
  ctx.lineTo(x + halfSize, y);
  ctx.lineTo(x, y + halfSize);
  ctx.lineTo(x - halfSize, y);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};`}
                    </code>
                  </pre>
                </div>
              </div>
              
              <div className="tech-item">
                <h3>Navigation Logic</h3>
                <p>
                  Each cube maps to a specific route in the React Router setup,
                  with state management handling the active section and animation states.
                </p>
                <div className="code-snippet">
                  <pre>
                    <code>
{`// Handle navigation
const handleCubeClick = (cube) => {
  setIsJumping(true);
  setShowSpeechBubble(true);
  
  // Animate jumping
  const startPos = { ...qbertPosition };
  const endPos = { x: cube.x, y: cube.y - 40 };
  
  // After animation completes
  setActiveCube(cube.id);
  navigate(cube.path);
};`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'animation' && (
        <div className="tab-content">
          <div className="pixel-box">
            <h2>Animation Techniques</h2>
            <p>
              Smooth animations bring the navigation to life, with carefully timed
              movements and visual feedback inspired by classic arcade sprite work.
            </p>
            
            <div className="animation-grid">
              <div className="animation-item">
                <h3>Jump Arcs</h3>
                <p>
                  Q*bert's jumps follow realistic parabolic arcs using sine functions
                  to create natural movement between cubes.
                </p>
                <div className="code-snippet">
                  <pre>
                    <code>
{`// Calculate jump arc
const progress = elapsed / jumpDuration;
const newX = startPos.x + (endPos.x - startPos.x) * progress;
const baseY = startPos.y + (endPos.y - startPos.y) * progress;
const jumpHeight = 40 * Math.sin(Math.PI * progress);

setQbertPosition({
  x: newX,
  y: baseY - jumpHeight
});`}
                    </code>
                  </pre>
                </div>
              </div>
              
              <div className="animation-item">
                <h3>Speech Bubbles</h3>
                <p>
                  Timed speech bubbles with Q*bert's characteristic "@!#?@!" exclamation
                  provide feedback when navigating between sections.
                </p>
                <div className="code-snippet">
                  <pre>
                    <code>
{`// Show speech bubble
setShowSpeechBubble(true);

// Hide speech bubble after delay
setTimeout(() => {
  setShowSpeechBubble(false);
}, 1000);`}
                    </code>
                  </pre>
                </div>
              </div>
              
              <div className="animation-item">
                <h3>Visual Feedback</h3>
                <p>
                  Color changes, scaling effects, and smooth transitions provide
                  visual cues for navigation state and interaction possibilities.
                </p>
                <div className="code-snippet">
                  <pre>
                    <code>
{`// Active cube styles
const topColor = isActive ? '#ff721c' : '#ebdc7d';
const leftColor = isActive ? '#b45014' : '#633100';
const rightColor = isActive ? '#d06018' : '#8a4500';`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="pixel-box mt-4">
        <h2>Why Q*bert?</h2>
        <p>
          Beyond the aesthetic charm, Q*bert's gameplay embodies principles of emergence:
          simple rules create complex patterns and behaviors. This parallels how I approach
          the intersection of my various interests in nursing, engineering, and electronics.
        </p>
        <p>
          The character also represents a certain playfulness and curiosity that I bring to
          my projects—jumping between different domains, changing perspectives, and making
          unexpected connections.
        </p>
      </div>
    </div>
  );
};

export default QBertTech;