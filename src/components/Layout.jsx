import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BoidCanvas from './BoidCanvas';
import NavigationGrid from './NavigationGrid';
import QBertSprite from './QBertSprite';
import './Layout.css';

const Layout = () => {
  const location = useLocation();
  const [theme, setTheme] = useState('default');
  const [title, setTitle] = useState('b0id.dev');
  const [subtitle, setSubtitle] = useState('A Digital Polymath Playground');

  // Set theme based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('nursing')) {
      setTheme('nursing');
      setTitle('Nursing');
      setSubtitle('Healthcare Insights & Clinical Adventures');
    } else if (path.includes('electronics')) {
      setTheme('electronics');
      setTitle('Electronics');
      setSubtitle('Circuits, Components & Creative Builds');
    } else if (path.includes('engineering')) {
      setTheme('engineering');
      setTitle('Engineering');
      setSubtitle('Problem-Solving Through Design & Analysis');
    } else if (path.includes('life')) {
      setTheme('life');
      setTitle('Life Updates');
      setSubtitle('Personal Journey & Reflections');
    } else {
      setTheme('default');
      setTitle('b0id.dev');
      setSubtitle('A Digital Polymath Playground');
    }
  }, [location]);

  return (
    <div className={`layout theme-${theme}`}>
      <BoidCanvas theme={theme} />
      <QBertSprite />
      
      <header className="header">
        <div className="retro-title-container">
          <pre className="retro-title">
{`      ██       ████  ██      ██
       ░██      █░░░██░░      ░██
       ░██     ░█  █░█ ██     ░██
       ░██████ ░█ █ ░█░██  ██████
       ░██░░░██░██  ░█░██ ██░░░██
       ░██  ░██░█   ░█░██░██  ░██
       ░██████ ░ ████ ░██░░██████
       ░░░░░    ░░░░  ░░  ░░░░░░`}
          </pre>
        </div>
        
        <div className="current-section">
          <h1 className="section-title">{title}</h1>
          <p className="section-subtitle">{subtitle}</p>
        </div>
      </header>
      
      {location.pathname === '/' && (
        <div className="welcome-message">
          <div className="pixel-container">
            <p>Welcome to my digital playground! I'm a generalist exploring the intersections of nursing, electronics, engineering, and science.</p>
            <p>Navigate through the isometric cubes below to learn more about my journey.</p>
            <div className="pixel-arrow">▼</div>
          </div>
        </div>
      )}
      
      <NavigationGrid />
      
      <main className="content">
        <Outlet />
      </main>
      
      <footer>
        <p className="footer-text">© 2025 b0id.dev | Built with <span className="pixel-heart">♥</span> and React</p>
        
        {/* Pixelated social links */}
        <div className="social-links">
          <a href="#" className="social-link" aria-label="GitHub">
            <div className="pixel-icon github-icon"></div>
          </a>
          <a href="#" className="social-link" aria-label="Twitter">
            <div className="pixel-icon twitter-icon"></div>
          </a>
          <a href="#" className="social-link" aria-label="LinkedIn">
            <div className="pixel-icon linkedin-icon"></div>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;