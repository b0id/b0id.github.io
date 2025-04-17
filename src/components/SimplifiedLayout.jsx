import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import SimplifiedQBertNav from './SimplifiedQBertNav';
import './SimplifiedLayout.css';

const SimplifiedLayout = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Define navigation sections
  const sections = [
    { name: 'Home', path: '/', theme: 'home' },
    { name: 'Nursing', path: '/nursing', theme: 'nursing' },
    { name: 'Electronics', path: '/electronics', theme: 'electronics' },
    { name: 'Engineering', path: '/engineering', theme: 'engineering' },
    { name: 'Life', path: '/life', theme: 'life' },
    { name: 'About', path: '/about', theme: 'about' }
  ];
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="site-wrapper">
      {/* Header with title */}
      <header className="site-header">
        <div className="header-content">
          {/* Hamburger menu for mobile only */}
          {isMobile && (
            <button 
              className={`hamburger-menu ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}
          
          {/* Site title */}
          <div className="logo-container">
            <h1 className="site-name">b0id.dev</h1>
            <p className="site-subtitle">A Digital Polymath Playground</p>
          </div>
          
          {/* Q*bert in header for mobile only */}
          {isMobile && (
            <div className="qbert-container mobile">
              <SimplifiedQBertNav isMobile={true} />
            </div>
          )}
          
          {/* Placeholder for desktop to maintain header layout */}
          {!isMobile && <div className="header-spacer"></div>}
        </div>
      </header>

      {/* Mobile navigation */}
      {isMobile && (
        <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav-items">
            {sections.map(section => (
              <Link
                key={section.path}
                to={section.path}
                className={`nav-item ${section.theme} ${location.pathname === section.path ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {section.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
      
      {/* Main layout area */}
      <div className="main-layout">
        {/* Left column - Sidebar */}
        {!isMobile && (
          <div className="sidebar">
            <nav>
              {sections.map(section => (
                <Link
                  key={section.path}
                  to={section.path}
                  className={`nav-item ${section.theme} ${location.pathname === section.path ? 'active' : ''}`}
                >
                  {section.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
        
        {/* Middle column - Q*bert (desktop only) */}
        {!isMobile && (
          <div className="qbert-panel">
            <div className="qbert-container desktop">
              <SimplifiedQBertNav isMobile={false} />
            </div>
          </div>
        )}
        
        {/* Right column - Content */}
        {!isMobile ? (
          <main className="content-area desktop">
            <Outlet />
          </main>
        ) : (
          <main className="content-area mobile">
            <Outlet />
          </main>
        )}
      </div>
    </div>
  );
};

export default SimplifiedLayout;