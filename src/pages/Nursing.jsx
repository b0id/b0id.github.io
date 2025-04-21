import React, { useState } from 'react';
import './Nursing.css';

const tabList = [
  { key: 'overview', label: 'Overview', icon: '🩺' },
  { key: 'projects', label: 'Projects', icon: '💡' },
  { key: 'resources', label: 'Resources', icon: '📚' },
];

// Nursing projects data
const nursingProjects = [
  {
    title: "Microbial Outbreak Case Study App",
    tag: "Epidemiology",
    description:
      "An interactive teaching tool for nursing and microbiology students that guides users through the investigation of a simulated summer camp outbreak. Includes data visualization, symptom tracking, diagnostic tools, and differential diagnosis workflows.",
    status: "Complete",
    buttonText: "View Project",
    appLink: "https://outbreakdash.vercel.app",
    githubLink: "https://github.com/b0id/outbreakdash"
  },
  {
    title: "Atypical Antipsychotics Classifier",
    tag: "Mental Health",
    description:
      "A reference web app that classifies atypical antipsychotic medications by receptor activity, generation, and clinical use case. Designed to help students and clinicians visualize pharmacodynamics and side effect profiles with clarity.",
    status: "Deployed",
    buttonText: "View Project",
    appLink: "https://atypicalpsychotics.vercel.app",  // Add your app URL here
    githubLink: "https://github.com/b0id/atypical" // Add your GitHub repo URL here
  },
  {
    title: "Geospacial SIER model",
    tag: "Mapping Data Science",
    description:
      "This project simulates a leptospirosis outbreak in Eastport, Maine following a hurricane event. It implements a spatially-explicit SEIR (Susceptible-Exposed-Infectious-Recovered) model to simulate disease spread through a population and evaluates the impact of different intervention timelines.",
    status: "In Use",
    buttonText: "View Project",
    githubLink: "https://github.com/b0id/eastportEpidemic"
  },
  
];

// Project details component
const NursingProjectDetails = ({ project }) => {
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
      <div className="project-status">
        <span className="status-label">Status:</span>
        <span className="status-value">{project.status}</span>
      </div>
      
      {/* Replace button div with links */}
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

// Slideshow component for Nursing Journey images
const journeyImages = [
  { src: '/490976491_1834881777312091_8774613981237538139_n.jpg', alt: 'Portrait 1' },
  { src: '/490975990_1242426440737218_2297786335550649617_n.jpg', alt: 'Portrait 2' },
];

function NursingJourneySlideshow() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((idx - 1 + journeyImages.length) % journeyImages.length);
  const next = () => setIdx((idx + 1) % journeyImages.length);

  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={journeyImages[idx].src}
        alt={journeyImages[idx].alt}
        className="nursing-portrait"
        style={{ width: 240, height: 240, borderRadius: '18px', objectFit: 'cover', margin: '2rem 0' }}
      />
      <div>
        <button onClick={prev} aria-label="Previous photo" style={{ fontSize: '1.5rem', marginRight: '1rem' }}>&lt;</button>
        <span style={{ margin: '0 1rem' }}>{idx + 1} / {journeyImages.length}</span>
        <button onClick={next} aria-label="Next photo" style={{ fontSize: '1.5rem', marginLeft: '1rem' }}>&gt;</button>
      </div>
    </div>
  );
}

const Nursing = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="page-container">
      <h1 className="page-title">Nursing</h1>

      <div className="nursing-two-column">
        {/* Tabs/Navigation */}
        <nav className="nursing-tabs">
          <div
            className="tab-indicator"
            style={{
              top: `${tabList.findIndex((tab) => tab.key === activeSection) * 60}px`,
            }}
          />
          {tabList.map((tab) => (
            <button
              key={tab.key}
              className={`tab-btn${activeSection === tab.key ? ' active' : ''}`}
              onClick={() => setActiveSection(tab.key)}
              tabIndex={0}
              aria-pressed={activeSection === tab.key}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="nursing-section-content">
          {activeSection === 'overview' && (
            <div className="nursing-journey-two-column">
              {/* Left: Specialty grid (narrow column) */}
              <div className="nursing-journey-left">
                <div className="specialty-grid">
                  <div className="specialty-item">
                    <div className="specialty-icon">💊</div>
                    <h3>Med-Surg</h3>
                    <p>
                      Currently focusing on medical-surgical nursing with an interest
                      in integrating technology to improve patient monitoring and care.
                    </p>
                  </div>
                  <div className="specialty-item">
                    <div className="specialty-icon">🖥️</div>
                    <h3>Nursing Informatics</h3>
                    <p>
                      Exploring the intersection of nursing science, computer science,
                      and information technology to enhance healthcare delivery.
                    </p>
                  </div>
                  <div className="specialty-item">
                    <div className="specialty-icon">🧠</div>
                    <h3>Patient Education</h3>
                    <p>
                      Developing innovative approaches to patient education using
                      technology and visual learning principles.
                    </p>
                  </div>
                  <div className="specialty-item">
                    <div className="specialty-icon">🤖</div>
                    <h3>Healthcare Technology</h3>
                    <p>
                      Studying how emerging technologies can support nursing practice
                      and improve patient outcomes.
                    </p>
                  </div>
                </div>
              </div>
              {/* Right: Header box, description, and slideshow below */}
              <div className="nursing-journey-right">
                <div className="pixel-box">
                  <h2>My Nursing Journey</h2>
                  <div className="nursing-journey-description">
                    <p>
                      As a student nurse with a background in engineering and electronics,
                      I bring a unique perspective to healthcare. The systematic thinking
                      required in engineering translates well to nursing assessment and care
                      planning, while my electronics knowledge helps me understand and work
                      with medical technologies.
                    </p>
                    <p>
                      My fascination with emergent behaviors in boid algorithms has led me
                      to recognize similar patterns in patient care and healthcare systems.
                    </p>
                  </div>
                </div>
                <NursingJourneySlideshow />
              </div>
            </div>
          )}

          {activeSection === 'projects' && (
            <div>
              <div className="pixel-box">
                <h2>Nursing & Technology Projects</h2>
                <p>
                  Where my nursing education meets my technical background. These
                  projects represent my efforts to bridge healthcare needs with
                  technological solutions.
                </p>
              </div>
              {/* Responsive two-column projects layout */}
              <div className="projects-two-column">
                <div className="projects-list">
                  {nursingProjects.map((project, idx) => (
                    <div
                      key={project.title}
                      className={`project-card${selectedProject === idx ? ' selected' : ''}`}
                      onClick={() => setSelectedProject(idx)}
                      tabIndex={0}
                      role="button"
                      aria-pressed={selectedProject === idx}
                    >
                      <div className="project-header">
                        <h3>{project.title}</h3>
                        <div className="pixel-tag">{project.tag}</div>
                      </div>
                      <div className="pixel-button">{project.buttonText}</div>
                    </div>
                  ))}
                </div>
                <NursingProjectDetails project={nursingProjects[selectedProject]} />
              </div>
            </div>
          )}

          {activeSection === 'resources' && (
            <div>
              <div className="pixel-box">
                <h2>Nursing Resources</h2>
                <p>
                  A collection of tools and references I've found helpful during my
                  nursing education, as well as some I've created myself.
                </p>
              </div>
              
              <div className="resources-grid">
                <div className="resource-card">
                  <h3>Lab Value Cheat Sheet</h3>
                  <p>
                    A quick reference guide for common laboratory values with visual
                    indicators for high, normal, and low ranges.
                  </p>
                  <button className="download-btn">Download PDF</button>
                </div>
                
                <div className="resource-card">
                  <h3>Medication Calculator</h3>
                  <p>
                    An interactive tool for practicing medication calculations with
                    instant feedback and step-by-step explanations.
                  </p>
                  <button className="launch-btn">Launch Tool</button>
                </div>
                
                <div className="resource-card">
                  <h3>NCLEX Study System</h3>
                  <p>
                    My personal approach to NCLEX preparation, combining spaced
                    repetition with conceptual mapping.
                  </p>
                  <button className="view-btn">View Guide</button>
                </div>
                
                <div className="resource-card">
                  <h3>Assessment Flowchart</h3>
                  <p>
                    A systematic approach to patient assessment based on body systems
                    with visual cues for abnormal findings.
                  </p>
                  <button className="download-btn">Download PDF</button>
                </div>
              </div>
              
              <div className="pixel-box mt-4">
                <h2>Learning Philosophy</h2>
                <p>
                  My approach to nursing education is influenced by my background in
                  systems thinking and emergent behavior. I believe that understanding
                  the underlying patterns and connections between different aspects of
                  healthcare leads to more holistic and effective patient care.
                </p>
                <p>
                  Just as a boid simulation creates complex flocking behavior from
                  simple rules, nursing practice integrates countless small decisions
                  and actions into comprehensive care. This perspective helps me connect
                  the dots between different aspects of nursing knowledge.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nursing;