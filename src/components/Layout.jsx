import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import QBertNav from './QBertNav';
import './Layout.css';

const Layout = () => {
  const location = useLocation();
  const [theme, setTheme] = useState('default');
  const [pageTitle, setPageTitle] = useState('b0id.dev');
  const [pageSubtitle, setPageSubtitle] = useState('A Digital Polymath Playground');

  // Update theme and title based on current route
  useEffect(() => {
    const path = location.pathname;
    
    if (path.includes('nursing')) {
      setTheme('nursing');
      setPageTitle('Nursing');
      setPageSubtitle('Healthcare Insights & Clinical Adventures');
    } else if (path.includes('electronics')) {
      setTheme('electronics');
      setPageTitle('Electronics');
      setPageSubtitle('Circuits, Components & Creative Builds');
    } else if (path.includes('engineering')) {
      setTheme('engineering');
      setPageTitle('Engineering');
      setPageSubtitle('Problem-Solving Through Design & Analysis');
    } else if (path.includes('life')) {
      setTheme('life');
      setPageTitle('Life Updates');
      setPageSubtitle('Personal Journey & Reflections');
    } else {
      setTheme('default');
      setPageTitle('b0id.dev');
      setPageSubtitle('A Digital Polymath Playground');
    }
  }, [location.pathname]);

  return (
    <div className={`layout ${theme}`}>
      <header>
        <div className="ascii-logo">
          <pre>
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
        
        <div className="page-header">
          <h1 className="page-title">{pageTitle}</h1>
          <p className="page-subtitle">{pageSubtitle}</p>
        </div>
      </header>
      
      {/* Your QBert Navigation component */}
      <div className="navigation-container">
        <QBertNav />
      </div>
      
      {/* Page content */}
      <main className="content">
        <Outlet />
      </main>
      
      <footer>
        <p>© 2025 b0id.dev | Built with <span className="heart">♥</span> and React</p>
        
        <div className="social-links">
          <a href="https://github.com/b0id" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;