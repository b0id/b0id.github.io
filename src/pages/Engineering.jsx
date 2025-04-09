import React, { useState } from 'react';

const Engineering = () => {
  const [activeTab, setActiveTab] = useState('projects');
  
  return (
    <div className="page-container">
      <h1 className="page-title">Engineering</h1>
      
      <div className="pixel-tabs">
        <button 
          className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button 
          className={`tab-button ${activeTab === 'concepts' ? 'active' : ''}`}
          onClick={() => setActiveTab('concepts')}
        >
          Concepts
        </button>
        <button 
          className={`tab-button ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          Tools
        </button>
      </div>
      
      {activeTab === 'projects' && (
        <div className="tab-content">
          <div className="pixel-box">
            <h2>Problem Solving Through Design</h2>
            <p>
              My engineering projects focus on solving problems through iterative
              design and creative thinking. Like the emergent behavior in a boid
              simulation, engineering solutions often arise from the interaction
              of simple components and principles.
            </p>
          </div>
          
          <div className="isometric-grid">
            <div className="iso-card">
              <div className="iso-icon">🏗️</div>
              <h3>Bridge Load Simulator</h3>
              <p>
                A small-scale bridge simulation that demonstrates structural
                principles and load distribution for educational purposes.
              </p>
            </div>
            
            <div className="iso-card">
              <div className="iso-icon">💨</div>
              <h3>Smart Ventilation System</h3>
              <p>
                An adaptive ventilation system that optimizes airflow based on
                room occupancy, temperature, and air quality metrics.
              </p>
            </div>
            
            <div className="iso-card">
              <div className="iso-icon">🔄</div>
              <h3>Waste Recycling Sorter</h3>
              <p>
                A prototype for an automated waste sorting system using computer
                vision to identify and separate recyclable materials.
              </p>
            </div>
            
            <div className="iso-card">
              <div className="iso-icon">🚀</div>
              <h3>Water Rocket Optimizations</h3>
              <p>
                Experiments with water rocket designs to maximize altitude
                and stability through pressure system modifications.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'concepts' && (
        <div className="tab-content">
          <div className="pixel-box">
            <h2>Engineering Principles</h2>
            <p>
              The fundamentals that guide my approach to engineering problems,
              from systems thinking to the iterative design process.
            </p>
          </div>
          
          <div className="concept-list">
            <div className="concept-item">
              <h3>Emergent Systems</h3>
              <p>
                How complex behavior emerges from simple rules - the parallel
                between boid algorithms and engineered systems.
              </p>
            </div>
            
            <div className="concept-item">
              <h3>Feedback Loops</h3>
              <p>
                The importance of sensing, analyzing, and responding in
                engineered systems - creating self-regulating processes.
              </p>
            </div>
            
            <div className="concept-item">
              <h3>Redundancy & Resilience</h3>
              <p>
                Designing systems that can withstand failures through
                redundant components and resilient architectures.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'tools' && (
        <div className="tab-content">
          <div className="pixel-box">
            <h2>Engineering Toolkit</h2>
            <p>
              The software and hardware tools I use to bring engineering
              projects from concept to reality.
            </p>
          </div>
          
          <div className="tools-grid">
            <div className="tool-card">
              <h3>CAD Software</h3>
              <ul className="pixel-list">
                <li>Fusion 360</li>
                <li>SolidWorks</li>
                <li>FreeCAD</li>
              </ul>
            </div>
            
            <div className="tool-card">
              <h3>Simulation</h3>
              <ul className="pixel-list">
                <li>ANSYS</li>
                <li>MATLAB</li>
                <li>Custom Python Simulations</li>
              </ul>
            </div>
            
            <div className="tool-card">
              <h3>Fabrication</h3>
              <ul className="pixel-list">
                <li>3D Printing</li>
                <li>Laser Cutting</li>
                <li>CNC Machining</li>
              </ul>
            </div>
            
            <div className="tool-card">
              <h3>Electronics</h3>
              <ul className="pixel-list">
                <li>Eagle PCB</li>
                <li>Oscilloscopes & Multimeters</li>
                <li>Soldering Equipment</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="pixel-box mt-4">
        <h2>Engineering & Healthcare Intersection</h2>
        <p>
          My unique perspective combining engineering principles with healthcare
          knowledge from nursing school has led to innovative approaches in both
          fields. I'm particularly interested in:
        </p>
        
        <div className="intersection-points">
          <div className="intersection-item">
            <h3>Medical Device Design</h3>
            <p>
              Creating more user-friendly and effective medical devices by
              applying engineering principles to clinical needs.
            </p>
          </div>
          
          <div className="intersection-item">
            <h3>Healthcare Workflow Optimization</h3>
            <p>
              Using systems engineering to improve efficiency and reduce errors
              in healthcare delivery processes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engineering;