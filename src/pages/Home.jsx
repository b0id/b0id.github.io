import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="welcome-box pixel-box">
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

      <div className="sections-container">
        <h2>Explore My Journey</h2>

        <div className="sections-grid">
          <div className="section-card nursing-card">
            <h3>Nursing</h3>
            <p>
              My education in nursing school, merging healthcare with technology
              and systems thinking.
            </p>
            <Link to="/nursing" className="pixel-button">Explore</Link>
          </div>

          <div className="section-card electronics-card">
            <h3>Electronics</h3>
            <p>
              Circuit designs, microcontroller projects, and electronic experiments
              that bridge the physical and digital worlds.
            </p>
            <Link to="/electronics" className="pixel-button">Explore</Link>
          </div>

          <div className="section-card engineering-card">
            <h3>Engineering</h3>
            <p>
              Problem-solving through design, applying engineering principles
              across disciplines and projects.
            </p>
            <Link to="/engineering" className="pixel-button">Explore</Link>
          </div>

          <div className="section-card life-card">
            <h3>Life Updates</h3>
            <p>
              Personal reflections, current projects, and the ongoing journey
              of a digital polymath.
            </p>
            <Link to="/life" className="pixel-button">Explore</Link>
          </div>
        </div>
      </div>

      <div className="about-section pixel-box">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="pixel-portrait"></div>
          <div className="about-text">
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

      <div className="navigation-guide pixel-box">
        <h2>Q*bert Navigation</h2>
        <p>
          This site features a custom navigation system inspired by the classic arcade game Q*bert!
          Click on the isometric cubes to jump between different sections of the site.
        </p>
        <p>
          Watch as Q*bert hops from cube to cube, changing their colors and revealing
          new content with each jump.
        </p>
      </div>
    </div>
  );
};

export default Home;