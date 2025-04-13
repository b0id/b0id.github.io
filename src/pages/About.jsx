import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header glass-panel">
        <div className="pixel-portrait"></div>
        <div className="about-intro">
          <h2>About Me</h2>
          <p className="tagline">A generalist exploring the intersections of multiple disciplines</p>
        </div>
      </div>
      
      <div className="about-content">
        <div className="about-section glass-panel">
          <h3>The Polymath Approach</h3>
          <p>
            I'm a generalist to the extreme—a polymath with a background in science,
            engineering, and electronics. Currently pursuing nursing education, I
            explore the connections between seemingly disparate fields.
          </p>
          <p>
            My journey has taken me through various disciplines, each contributing to
            a unique perspective that allows me to see patterns and solutions where
            specialization might create blind spots.
          </p>
        </div>
        
        <div className="about-section glass-panel">
          <h3>Emergent Behavior</h3>
          <p>
            My online persona revolves around the concept of boids (bird-oid objects),
            an algorithm that simulates the flocking behavior of birds. Just as simple
            rules guide each boid to create complex flocking behavior, I follow my
            curiosity across disciplines to discover emergent patterns and connections.
          </p>
          <p>
            This fascination with emergence informs how I approach problems and build
            systems—simple components working together to create something greater
            than the sum of their parts.
          </p>
        </div>
        
        <div className="about-section glass-panel">
          <h3>Q*bert & Retro Aesthetic</h3>
          <p>
            The Q*bert avatar represents my love for retro aesthetics and the
            isometric perspective that allows us to see things from multiple angles
            simultaneously—much like how I approach problems and learning.
          </p>
          <p>
            The pixel art style isn't just nostalgia; it's a deliberate choice to
            emphasize that complex systems often emerge from simple, discrete units
            working together—whether those units are pixels, code, or ideas.
          </p>
        </div>
        
        <div className="about-section glass-panel">
          <h3>Current Focus</h3>
          <p>
            My current professional journey centers on bridging healthcare and
            technology through nursing education. I'm particularly interested in:
          </p>
          <ul className="focus-list">
            <li><span className="focus-highlight">Medical Device Design</span> with a human-centered approach</li>
            <li><span className="focus-highlight">Healthcare Workflow Optimization</span> using systems engineering</li>
            <li><span className="focus-highlight">Patient Monitoring Technology</span> that integrates seamlessly with care</li>
            <li><span className="focus-highlight">Interdisciplinary Education</span> in healthcare and technology</li>
          </ul>
        </div>
        
        <div className="about-section glass-panel">
          <h3>Let's Connect</h3>
          <p>
            I'm always open to collaboration, conversation, and new perspectives.
            Whether you're interested in one specific field or exploring the connections
            between many, I'd love to hear from you.
          </p>
          <div className="contact-options">
            <a href="mailto:contact@b0id.dev" className="contact-link email">
              <span className="contact-icon">✉️</span>
              <span className="contact-label">Email</span>
            </a>
            <a href="https://github.com/b0id" className="contact-link github">
              <span className="contact-icon">
                <svg viewBox="0 0 24 24" className="contact-svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.495.998.108-.775.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"></path>
                </svg>
              </span>
              <span className="contact-label">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;