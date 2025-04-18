import React, { useState } from 'react';
import './Electronics.css';

// Placeholder component for project details
const ProjectDetails = ({ project }) => {
  if (!project) {
    return (
      <div className="project-details-placeholder">
        <p>Select a project to view details.</p>
      </div>
    );
  }
  return (
    <div className="project-details">
      <h3>{project.title}</h3>
      <div className="pixel-tag">{project.tag}</div>
      <p>{project.description}</p>
      <div className="pixel-button">{project.buttonText}</div>
    </div>
  );
};

const projects = [
  {
    title: "Arduino-Based Vitals Monitor",
    tag: "Healthcare",
    description: "A custom-built patient monitoring system using Arduino and various sensors to track vitals. The intersection of my nursing studies and electronics passion.",
    buttonText: "View Project"
  },
  {
    title: "Retro Gaming Console",
    tag: "Entertainment",
    description: "A Raspberry Pi-powered gaming console housed in a custom 3D printed case, designed to resemble classic 8-bit systems with modern conveniences.",
    buttonText: "View Project"
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