import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IsometricLayout from './components/IsometricLayout';
import Nursing from './pages/Nursing';
import Electronics from './pages/Electronics';
import Engineering from './pages/Engineering';
import LifeUpdates from './pages/LifeUpdates';
import NotFound from './pages/NotFound';
import './PageStyles.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<IsometricLayout />}>
        <Route index element={<Home />} />
        <Route path="nursing" element={<Nursing />} />
        <Route path="electronics" element={<Electronics />} />
        <Route path="engineering" element={<Engineering />} />
        <Route path="life" element={<LifeUpdates />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

// Home component for the landing page
const Home = () => {
  return (
    <div className="page-container">
      <div className="welcome-content">
        <div className="pixel-box">
          <h2>Welcome to b0id.dev</h2>
          <p>
            My digital playground exploring the intersections of nursing, electronics, 
            engineering, and science through the lens of emergent behavior.
          </p>
          <p>
            Like the boid algorithm that simulates flocking behavior through simple rules,
            my diverse interests follow patterns that create something greater than the sum
            of their parts.
          </p>
        </div>
        
        <div className="section-overview">
          <h2>Explore My Journey</h2>
          
          <div className="sections-grid">
            <div className="section-card nursing">
              <h3>Nursing</h3>
              <p>
                My education in nursing school, merging healthcare with technology
                and systems thinking.
              </p>
              <div className="pixel-arrow">→</div>
            </div>
            
            <div className="section-card electronics">
              <h3>Electronics</h3>
              <p>
                Circuit designs, microcontroller projects, and electronic experiments
                that bridge the physical and digital worlds.
              </p>
              <div className="pixel-arrow">→</div>
            </div>
            
            <div className="section-card engineering">
              <h3>Engineering</h3>
              <p>
                Problem-solving through design, applying engineering principles
                across disciplines and projects.
              </p>
              <div className="pixel-arrow">→</div>
            </div>
            
            <div className="section-card life">
              <h3>Life Updates</h3>
              <p>
                Personal reflections, current projects, and the ongoing journey
                of a digital polymath.
              </p>
              <div className="pixel-arrow">→</div>
            </div>
          </div>
        </div>
        
        <div className="about-section">
          <div className="about-container">
            <div className="pixel-portrait"></div>
            <div className="about-content">
              <h2>About Me</h2>
              <p>
                I'm a generalist to the extreme—a polymath with a background in science,
                engineering, and electronics. Currently pursuing nursing education, I
                explore the connections between seemingly disparate fields.
              </p>
              <p>
                My online persona revolves around the concept of boids (bird-oid objects),
                an algorithm that simulates the flocking behavior of birds. Just as simple
                rules guide each boid to create complex flocking behavior, I follow my
                curiosity across disciplines to discover emergent patterns and connections.
              </p>
              <p>
                The Q*bert avatar represents my love for retro aesthetics and the
                isometric perspective that allows us to see things from multiple angles
                simultaneously—much like how I approach problems and learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;