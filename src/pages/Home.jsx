import React, { useState } from 'react';
import BoidCanvas from '../components/BoidCanvas';
import './Home.css';

const Home = () => {
  const [aboutExpanded, setAboutExpanded] = useState(false);
  
  return (
    <div className="home-page">
      {/* About Me section with collapsible content */}
      <div className="about-section pixel-box">
        <h2>Welcome to b0id.dev</h2>
        
        <div 
          className="about-preview"
          onClick={() => setAboutExpanded(!aboutExpanded)}
        >
          <div className="about-preview-content">
            <img
              className="pixel-portrait"
              src="/115111701.jpeg"
              alt="Portrait"
              style={{ width: 96, height: 96, borderRadius: '12px', objectFit: 'cover' }}
            />
            <div className="about-teaser-container">
              <p className="about-teaser">Click to learn more about b0id...</p>
              <span className={`expand-icon ${aboutExpanded ? 'expanded' : ''}`}>
                {aboutExpanded ? '▲' : '▼'}
              </span>
            </div>
          </div>
        </div>
        
        {aboutExpanded && (
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm not built for a single lane. I'm a generalist—wired for breadth, driven by depth, and drawn to the liminal spaces between disciplines. My background spans science, electronics, systems engineering, and now, nursing—where technical mastery meets human care. I move between code and compassion, signal and soul.
              </p>
              <p>
                I orbit around the idea of boids—simple agents following elegant rules that, together, create emergent beauty. That's how I work, too. I trust curiosity to guide the way, pattern recognition to shape understanding, and hands-on building to root abstract ideas in something real.
              </p>
              <p>
                Where others see disjointed paths, I see convergence. I believe engineering and empathy belong in the same sentence. That clinical care can be improved by system design. That resilience isn't theory—it's lived experience, refined into practice.
              </p>
              <p>
                I make tools, craft systems, and connect knowledge across boundaries. Whether I'm restoring old machines or designing new ones, writing code or mentoring students, debugging BIOS or exploring bioethics—it all feeds one goal:
              </p>
              <p>
                To understand, repair, and reimagine the systems we live inside.
                Whether they're electronic, ecological, institutional, or internal.

                If you've ever felt too many things, chased too many ideas, or refused to be defined by just one field—
                you're in the right place.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Rename second section to Navigation Tips */}
      <div className="navigation-guide pixel-box">
        <h2>Navigation Tips</h2>
        <p>
          This site features a custom navigation system inspired by the classic arcade game Q*bert! (If you are on a mobile device you might prefer to use the hamburger menu at the top left)</p>
        <p>
          Click on the isometric cubes to jump between different sections of the site.
        </p>
        <p>
          Watch as Q*bert hops from cube to cube, changing their colors and revealing
          new content with each jump.
        </p>
      </div>

      {/* Boids section - keep as is */}
      <div className="welcome-box pixel-box">
        <div className="boid-text-header">
          <h2>Boids Algorithm Playground</h2>
          <p style={{ textAlign: 'justify' }}>
            My digital playground exploring the intersections of nursing, electronics,
            engineering, and science through the lens of emergent behavior.
          </p>
          <p style={{ textAlign: 'justify' }}>
            Like the boid algorithm that simulates flocking behavior through simple rules,
            my diverse interests follow patterns that create something greater than the sum
            of their parts.
          </p>
        </div>
        
        <div style={{ 
          position: 'relative',
          width: '100%',
          height: '400px',
          marginTop: '1rem',
          border: '1px solid var(--primary-color)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <BoidCanvas />
        </div>
      </div>
    </div>
  );
};

export default Home;
