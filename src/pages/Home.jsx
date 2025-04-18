import React from 'react';
import BoidCanvas from '../components/BoidCanvas';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* About Me section FIRST, with image and swapped heading */}
      <div className="about-section pixel-box">
        <h2>Welcome to b0id.dev</h2>
        <div className="about-content">
          <img
            className="pixel-portrait"
            src="/115111701.jpeg"
            alt="Portrait"
            style={{ width: 96, height: 96, borderRadius: '12px', objectFit: 'cover', marginRight: '1rem' }}
          />
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
          </div>
        </div>
      </div>

      {/* Navigation Guide section SECOND */}
      <div className="navigation-guide pixel-box">
        <h2>About Me</h2>
        <p>
          This site features a custom navigation system inspired by the classic arcade game Q*bert!
          Click on the isometric cubes to jump between different sections of the site.
        </p>
        <p>
          Watch as Q*bert hops from cube to cube, changing their colors and revealing
          new content with each jump.
        </p>
      </div>

      {/* Boid Algorithm section THIRD */}
      <div className="welcome-box pixel-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <BoidCanvas width={150} height={150} />
        <div style={{ textAlign: 'right', flex: 1 }}>
          <h2>Boids Algorithm Playground</h2>
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
      </div>
    </div>
  );
};

export default Home;
