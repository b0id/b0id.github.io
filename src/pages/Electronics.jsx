import React, { useState } from 'react';
import './Electronics.css';

// In your Electronics.jsx file

// Add this new component for the coffee roaster
const CoffeeRoasterProject = () => {
  const [mediaIndex, setMediaIndex] = useState(0);
  
  // Mixed media array with both images and videos
  const roasterMedia = [
    { type: 'image', src: '/coffee-roaster-1.jpg', alt: 'Coffee at Espresso Bar' },
    { type: 'image', src: '/coffee-roaster-2.jpg', alt: 'Fluid bed coffee roaster' },
    { type: 'image', src: '/coffee-roaster-3.jpg', alt: 'Complete 4lb roast' },
    { type: 'image', src: '/coffee-roaster-4.jpg', alt: 'Wiring (in progress)' },
    { type: 'video', src: '/coffee-roaster-demo.mp4', alt: 'Roasting Process Demo' },
    { type: 'image', src: '/coffee-roaster-5.jpg', alt: 'Air flow component (Made from ceramic in my cermaic studio' },
    { type: 'image', src: '/coffee-roaster-6.jpg', alt: 'Controller' },
    { type: 'image', src: '/coffee-roaster-7.jpg', alt: 'Assembly' },
    { type: 'image', src: '/coffee-roaster-8.jpg', alt: 'Roast Chamber' },
    { type: 'image', src: '/coffee-roaster-9.jpg', alt: 'Finished Assembly' }
  ];
  
  const prevMedia = () => {
    setMediaIndex((prev) => (prev - 1 + roasterMedia.length) % roasterMedia.length);
  };
    
  const nextMedia = () => {
    setMediaIndex((prev) => (prev + 1) % roasterMedia.length);
  };
  
  // Render different media types
  const renderMedia = () => {
    const media = roasterMedia[mediaIndex];
    
    if (media.type === 'video') {
      return (
        <div className="media-container video-container">
          <video 
            className="roaster-video"
            controls
            autoPlay={false}
            preload="metadata"
          >
            <source src={media.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else { // image
      return (
        <div className="media-container">
          <img 
            src={media.src}
            alt={media.alt}
            className="roaster-image"
          />
        </div>
      );
    }
  };
  
  return (
    <div className="project-details">
      <h3>Arduino-Based Coffee Roaster Controller</h3>
      <div className="pixel-tag">Coffee Roasting</div>
      
      {/* Media Slideshow */}
      <div className="project-slideshow">
        {renderMedia()}
        
        {/* Navigation controls above/below the media */}
        <div className="slideshow-controls">
          <button 
            onClick={prevMedia} 
            aria-label="Previous media"
            className="nav-button"
          >
            ❮
          </button>
          <span className="slideshow-counter">
            {mediaIndex + 1} / {roasterMedia.length}
          </span>
          <button 
            onClick={nextMedia} 
            aria-label="Next media"
            className="nav-button"
          >
            ❯
          </button>
        </div>
      </div>
      
      <p>Minicommercial coffee roaster. The intersection of my coffee studies and electronics passion.</p>
      
      <div className="project-details-section">
        <h4>Project Details</h4>
        <ul>
          <li><strong>Built from:</strong> Modified heat gun elements, Vacuum blower, SSR-pontentiometer</li>
          <li><strong>Sensors:</strong> Thermocouples for bean temp & environmental temp</li>
          <li><strong>Controls:</strong> Heat modulation, air flow controllers</li>
          <li><strong>Software:</strong> Soon...Custom Arduino sketch with PID control--(I did not write this code only implementation)</li>
        </ul>
      </div>
      
      <div className="github-link">
        <a 
          href="https://github.com/elkayem/CoffeeRoaster/tree/master" 
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-button github-button"
        >
          Arduino Code
        </a>
      </div>
    </div>
  );
};

// Placeholder component for project details
const ProjectDetails = ({ project }) => {
  if (!project) {
    return (
      <div className="project-details-placeholder">
        <p>Select a project to view details.</p>
      </div>
    );
  }
  if (project.title === "Coffee Roaster") {
    return <CoffeeRoasterProject />;
  }
  

  return (
    <div className="project-details">
      <h3>{project.title}</h3>
      <div className="pixel-tag">{project.tag}</div>
      <p>{project.description}</p>
      
      {/* Add project links */}
      <div className="project-links">
        {project.appLink && (
          <a 
            href={project.appLink}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-button"
          >
            View Live App
          </a>
        )}
        
        {project.githubLink && (
          <a 
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-button github-button"
            style={{ marginLeft: '0.5rem' }}
          >
            GitHub Repo
          </a>
        )}
        
        {/* Show the basic button text if no links provided */}
        {!project.appLink && !project.githubLink && (
          <div className="pixel-button">{project.buttonText}</div>
        )}
      </div>
    </div>
  );
};

const projects = [
  {
    title: "Coffee Roaster",
    tag: "Coffee Roasting",
    description: "Coffee roasting system(current) using Arduino(future) and various sensors to track roast progess. The intersection of my coffee studies and electronics passion.",
    buttonText: "View Project"
  },
  {
    title: "BlackArch Panel",
    tag: "Cybersecurity",
    description: "A comprehensive CLI utility for exploring, managing, and streamlining over 2,800 BlackArch Linux security tools with keyword search, tool metadata, and automated script generation.",
    buttonText: "View Project",
    githubLink: "https://github.com/b0id/blackarch-panel" // Add your GitHub repo URL here
  }, 
  
  {
    title: "IoT Environmental Monitor",
    tag: "Sensing",
    description: "A network of sensors that monitor air quality, temperature, and humidity throughout my home, sending data to a central dashboard.",
    buttonText: "View Project"
  }
];

const Electronics = () => {
  const [selected, setSelected] = useState(null);

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

      {/* Responsive two-column layout */}
      <div className="projects-two-column">
        <div className="projects-list">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`project-card${selected === idx ? ' selected' : ''}`}
              onClick={() => setSelected(idx)}
              tabIndex={0}
              role="button"
              aria-pressed={selected === idx}
            >
              <div className="project-header">
                <h3>{project.title}</h3>
                <div className="pixel-tag">{project.tag}</div>
              </div>
              <div className="pixel-button">{project.buttonText}</div>
            </div>
          ))}
        </div>
        <ProjectDetails project={projects[selected]} />
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