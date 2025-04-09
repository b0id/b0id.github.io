import React, { useState } from 'react';

const Nursing = () => {
  const [activeSection, setActiveSection] = useState('overview');
  
  return (
    <div className="page-container">
      <h1 className="page-title">Nursing</h1>
      
      <div className="section-tabs">
        <button 
          className={`tab-btn ${activeSection === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveSection('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeSection === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveSection('projects')}
        >
          Projects
        </button>
        <button 
          className={`tab-btn ${activeSection === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveSection('resources')}
        >
          Resources
        </button>
      </div>
      
      {activeSection === 'overview' && (
        <div className="section-content">
          <div className="pixel-box">
            <h2>My Nursing Journey</h2>
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
              Just as simple rules guide each boid to create complex flocking behavior,
              nursing protocols and best practices guide individual care actions that
              together create comprehensive patient care.
            </p>
          </div>
          
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
      )}
      
      {activeSection === 'projects' && (
        <div className="section-content">
          <div className="pixel-box">
            <h2>Nursing & Technology Projects</h2>
            <p>
              Where my nursing education meets my technical background. These
              projects represent my efforts to bridge healthcare needs with
              technological solutions.
            </p>
          </div>
          
          <div className="projects-list">
            <div className="project-item">
              <div className="project-icon">
                <div className="pixel-heart"></div>
              </div>
              <div className="project-details">
                <h3>Vitals Monitoring Interface</h3>
                <p>
                  A redesigned patient monitoring interface that uses principles
                  from emergent systems and boid algorithms to visually represent
                  changes in patient vitals over time. The pattern-based display
                  helps nurses quickly identify concerning trends.
                </p>
                <div className="project-status">
                  <span className="status-label">Status:</span>
                  <span className="status-value">Prototype</span>
                </div>
              </div>
            </div>
            
            <div className="project-item">
              <div className="project-icon">
                <div className="pixel-pill"></div>
              </div>
              <div className="project-details">
                <h3>Medication Administration Assistant</h3>
                <p>
                  A mobile app concept that assists nursing students in learning
                  medication administration protocols through interactive scenarios
                  and real-time feedback. Incorporates barcode scanning and visual
                  recognition of medications.
                </p>
                <div className="project-status">
                  <span className="status-label">Status:</span>
                  <span className="status-value">Design Phase</span>
                </div>
              </div>
            </div>
            
            <div className="project-item">
              <div className="project-icon">
                <div className="pixel-clipboard"></div>
              </div>
              <div className="project-details">
                <h3>Clinical Decision Support System</h3>
                <p>
                  A research project exploring how machine learning algorithms can
                  assist nurses in clinical decision-making by identifying patterns
                  in patient data that might indicate early warning signs of
                  deterioration.
                </p>
                <div className="project-status">
                  <span className="status-label">Status:</span>
                  <span className="status-value">Research</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeSection === 'resources' && (
        <div className="section-content">
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
  );
};

export default Nursing;