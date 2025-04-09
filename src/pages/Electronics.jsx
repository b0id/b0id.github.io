import React from 'react';

const Electronics = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Electronics</h1>
      
      <div className="pixel-box">
        <h2>Circuit Playground</h2>
        <p>
          From breadboards to PCB designs, this section chronicles my exploration
          of electronic circuits and components. Like boids following simple
          rules to create complex behavior, electronic components follow
          fundamental principles to create intricate systems.
        </p>
      </div>
      
      <div className="projects-grid">
        <div className="project-card">
          <div className="project-header">
            <h3>Arduino-Based Vitals Monitor</h3>
            <div className="pixel-tag">Healthcare</div>
          </div>
          <p>
            A custom-built patient monitoring system using Arduino and various
            sensors to track vitals. The intersection of my nursing studies
            and electronics passion.
          </p>
          <div className="pixel-button">View Project</div>
        </div>
        
        <div className="project-card">
          <div className="project-header">
            <h3>Retro Gaming Console</h3>
            <div className="pixel-tag">Entertainment</div>
          </div>
          <p>
            A Raspberry Pi-powered gaming console housed in a custom 3D printed
            case, designed to resemble classic 8-bit systems with modern
            conveniences.
          </p>
          <div className="pixel-button">View Project</div>
        </div>
        
        <div className="project-card">
          <div className="project-header">
            <h3>IoT Environmental Monitor</h3>
            <div className="pixel-tag">Sensing</div>
          </div>
          <p>
            A network of sensors that monitor air quality, temperature, and
            humidity throughout my home, sending data to a central dashboard.
          </p>
          <div className="pixel-button">View Project</div>
        </div>
      </div>
      
      <div className="pixel-box">
        <h2>Component Library</h2>
        <p>
          My collection of electronic components continues to grow with each 
          project. Browse through the categories below to see what I've been
          working with:
        </p>
        
        <div className="component-list">
          <div className="component-category">
            <span className="category-icon">⚡</span>
            <span className="category-name">Microcontrollers</span>
          </div>
          <div className="component-category">
            <span className="category-icon">📊</span>
            <span className="category-name">Sensors</span>
          </div>
          <div className="component-category">
            <span className="category-icon">🔌</span>
            <span className="category-name">Passive Components</span>
          </div>
          <div className="component-category">
            <span className="category-icon">💡</span>
            <span className="category-name">Display & Output</span>
          </div>
        </div>
      </div>
      
      <div className="coming-soon">
        <div className="pixel-animated-text">More projects coming soon!</div>
        <div className="pixel-progress-bar">
          <div className="pixel-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Electronics;