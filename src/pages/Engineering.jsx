import React, { useState } from 'react';
import MetaHead from '../components/MetaHead';
import './Engineering.css';

const tabList = [
  { key: 'projects', label: 'Projects', icon: '🏗️' },
  { key: 'concepts', label: 'Concepts', icon: '💡' },
  { key: 'tools', label: 'Tools', icon: '🔧' },
];

// Engineering projects data
const engineeringProjects = [
  {
    title: "Custom Fluid Bed Coffee Roaster",
    description: "A home-built fluid bed roaster capable of 2-kilo batches in under 12 minutes, engineered for precise thermal profiling and roast development.",
    icon: "🌀"
  },
  {
    title: "ForgeRAM: AI Memory Orchestration",
    description: "A Rust-based memory management system for multi-GPU AI inference on ROCm, optimizing tensor flow across large local models.",
    icon: "🧠"
  },
  {
    title: "Rainwater Harvesting System",
    description: "An off-grid, gravity-fed water infrastructure with seasonal bypasses and filtration, built to support ecological restoration and sustainable farming.",
    icon: "🌧️"
  },
  {
    title: "PCIe Layout & Multi-Boot Redesign",
    description: "Reconfigured PC hardware layout for optimal GPU and NVMe performance, with clean bootloader integration across Arch, Fedora, and Windows.",
    icon: "🧰"
  }
  
];

// Engineering concepts data
const engineeringConcepts = [
  {
    title: "Emergent Systems",
    description: "How complex behavior emerges from simple rules - the parallel between boid algorithms and engineered systems."
  },
  {
    title: "Feedback Loops",
    description: "The importance of sensing, analyzing, and responding in engineered systems - creating self-regulating processes."
  },
  {
    title: "Redundancy & Resilience",
    description: "Designing systems that can withstand failures through redundant components and resilient architectures."
  },
  {
    title: "Modular Design",
    description: "Breaking complex builds into self-contained components for easier maintenance, adaptability, and scaling."
  },
  {
    title: "Resource Efficiency",
    description: "Engineering with constraint in mind—maximizing output with minimal waste in power, time, and material."
  },
  {
    title: "Fault Tolerance",
    description: "Accepting that failure will happen—and engineering pathways for graceful degradation, not catastrophic collapse."
  },
  {
    title: "System Interoperability",
    description: "Ensuring components with different origins can communicate and collaborate reliably in the same environment."
  }
];


// Engineering tools data
const engineeringTools = [
  {
    category: "CAD Software",
    tools: ["Fusion 360", "SolidWorks", "FreeCAD", "Onshape", "Blender (for visual prototyping)"]
  },
  {
    category: "Simulation",
    tools: ["ANSYS", "MATLAB", "COMSOL Multiphysics", "QGIS", "Custom Python Simulations", "GeoPandas"]
  },
  {
    category: "Fabrication",
    tools: ["3D Printing", "Laser Cutting", "CNC Machining", "Manual Lathe & Mill", "Plasma Cutting"]
  },
  {
    category: "Electronics",
    tools: ["Eagle PCB", "KiCad", "Oscilloscopes & Multimeters", "Logic Analyzers", "Soldering Stations", "Reflow Ovens"]
  },
  {
    category: "Programming & Scripting",
    tools: ["Python", "Rust", "Bash", "JavaScript", "Node.js", "C++", "Go", "Julia"]
  },
  {
    category: "AI & Data Science",
    tools: ["PyTorch", "TensorFlow", "Llama.cpp", "Pandas", "Jupyter", "R", "SciKit-Learn", "ROCm"]
  },
  {
    category: "Embedded Systems & IoT",
    tools: ["Arduino", "ESP32", "Raspberry Pi", "MicroPython", "PlatformIO", "MQTT"]
  },
  {
    category: "Version Control & Deployment",
    tools: ["Git", "GitHub", "Vercel", "Docker", "CI/CD Pipelines", "Nginx"]
  },
  {
    category: "Knowledge Management",
    tools: ["Obsidian", "Zotero", "Anki", "Markdown-based Vault Systems", "Templater", "Dataview", "QuickAdd"]
  },
  {
    category: "Networking & Security",
    tools: ["Wireshark", "nmap", "Kali Linux", "UFW", "OpenVPN", "Fail2ban", "Burp Suite"]
  },
  {
    category: "Healthcare & Clinical",
    tools: ["SIM Lab Gear", "EMR Systems", "Medication Administration Records", "Cardiac Monitors", "Diagnostic Tools"]
  },
  {
    category: "Craftsmanship & Restoration",
    tools: ["Lathe (Woodworking)", "Hand Planes", "Kilns", "Potter’s Wheel", "Joinery Tools", "Restoration Epoxies"]
  }
];


const Engineering = () => {
  const [activeSection, setActiveSection] = useState('projects');

  return (
    <div className="page-container">
      {/* Page-specific metadata */}
      <MetaHead 
        title="Engineering | b0id.dev"
        description="Exploring engineering projects, concepts, and tools through the lens of emergent systems and boid algorithms."
        image="/115111701.jpeg"
      />

      <h1 className="page-title">Engineering</h1>

      <div className="pixel-box">
        <h2>Problem Solving Through Design</h2>
        <p>
          My engineering projects focus on solving problems through iterative
          design and creative thinking. Like the emergent behavior in a boid
          simulation, engineering solutions often arise from the interaction
          of simple components and principles.
        </p>
      </div>

      <div className="engineering-two-column">
        {/* Tabs/Navigation */}
        <nav className="engineering-tabs">
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
        <div className="engineering-section-content">
          {activeSection === 'projects' && (
            <div>
              <div className="pixel-box">
                <h2>Engineering Projects</h2>
                <p>
                  These projects represent practical applications of engineering principles,
                  each solving different problems through thoughtful design and iteration.
                </p>
              </div>
              
              <div className="isometric-grid">
                {engineeringProjects.map((project) => (
                  <div key={project.title} className="iso-card">
                    <div className="iso-icon">{project.icon}</div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="pixel-box mt-4">
                <h2>Project Development Process</h2>
                <p>
                  My approach to engineering projects follows a systematic but iterative process,
                  allowing for discovery and refinement at each stage.
                </p>
                <div className="project-process">
                  <ol>
                    <li><strong>Problem Identification:</strong> Clear definition of the challenge</li>
                    <li><strong>Research & Analysis:</strong> Gathering information and analyzing constraints</li>
                    <li><strong>Concept Generation:</strong> Developing multiple possible solutions</li>
                    <li><strong>Prototyping & Testing:</strong> Building early versions and evaluating performance</li>
                    <li><strong>Refinement:</strong> Iterative improvements based on testing feedback</li>
                    <li><strong>Documentation:</strong> Thorough documentation of process and outcomes</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'concepts' && (
            <div>
              <div className="pixel-box">
                <h2>Engineering Principles</h2>
                <p>
                  The fundamentals that guide my approach to engineering problems,
                  from systems thinking to the iterative design process.
                </p>
              </div>
              
              <div className="concept-list">
                {engineeringConcepts.map((concept) => (
                  <div key={concept.title} className="concept-item">
                    <h3>{concept.title}</h3>
                    <p>{concept.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="pixel-box mt-4">
                <h2>Thinking in Systems</h2>
                <p>
                  At the core of my engineering philosophy is systems thinking - understanding
                  how components interact to create complex behaviors and outcomes. This approach
                  allows me to design more resilient and adaptable solutions that anticipate
                  real-world conditions and edge cases.
                </p>
                <p>
                  Just as boids follow simple rules to create complex flocking patterns,
                  good engineering designs establish fundamental principles that lead to
                  elegant solutions through their interactions.
                </p>
              </div>
            </div>
          )}

          {activeSection === 'tools' && (
            <div>
              <div className="pixel-box">
                <h2>Engineering Toolkit</h2>
                <p>
                  The software and hardware tools I use to bring engineering
                  projects from concept to reality.
                </p>
              </div>
              
              <div className="tools-grid">
                {engineeringTools.map((toolCategory) => (
                  <div key={toolCategory.category} className="tool-card">
                    <h3>{toolCategory.category}</h3>
                    <ul className="pixel-list">
                      {toolCategory.tools.map((tool, index) => (
                        <li key={index}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="pixel-box mt-4">
                <h2>Process & Methodology</h2>
                <p>
                  My engineering approach combines traditional methodologies with
                  modern tools and technologies. I focus on creating maintainable,
                  well-documented solutions that can be easily understood and modified
                  by others.
                </p>
                <p>
                  For physical projects, I follow an incremental prototyping workflow,
                  moving from quick paper sketches to CAD models, then to physical
                  prototypes with increasing fidelity.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
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