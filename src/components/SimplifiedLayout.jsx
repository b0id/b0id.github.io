import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import SimplifiedQBertNav from './SimplifiedQBertNav';
import Footer from './Footer';
import './SimplifiedLayout.css';
import { enableMobileTouchEvents, setupMobileView } from '../utils/mobileHelpers';

const SimplifiedLayout = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentTheme, setCurrentTheme] = useState('home');
  const contentRef = useRef(null);
  
  // Define navigation sections with their themes
  const sections = [
    { name: 'Home', path: '/', theme: 'home' },
    { name: 'Nursing', path: '/nursing', theme: 'nursing' },
    { name: 'Electronics', path: '/electronics', theme: 'electronics' },
    { name: 'Engineering', path: '/engineering', theme: 'engineering' },
    { name: 'Life', path: '/life', theme: 'life' },
    { name: 'About', path: '/about', theme: 'about' }
  ];
  
  // Update theme based on current path
  useEffect(() => {
    const currentSection = sections.find(section => 
      location.pathname === section.path || location.pathname.startsWith(`${section.path}/`)
    );
    setCurrentTheme(currentSection?.theme || 'home');
  }, [location.pathname]);
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Apply mobile fixes right after resize if needed
      if (mobile) {
        setupMobileView();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply mobile fixes on initial load and route changes
  useEffect(() => {
    if (isMobile) {
      // Fix scrolling issues
      setupMobileView();
      
      // Extra fix to ensure scroll position resets on route change
      window.scrollTo(0, 0);
      
      // Set up proper content scrolling
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
        
        // Ensure the content area is scrollable
        contentRef.current.style.overflow = 'auto';
        contentRef.current.style.webkitOverflowScrolling = 'touch';
        contentRef.current.style.touchAction = 'auto';
      }
      
      // Re-apply after a delay to catch any dynamic content changes
      const timer = setTimeout(() => {
        if (isMobile) {
          enableMobileTouchEvents();
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile, location.pathname]); // Re-run when path changes

  return (
    <div 
      className={`site-wrapper theme-${currentTheme}`}
      style={isMobile ? { minHeight: '100%', height: 'auto', overflowY: 'visible' } : {}}
    >
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
            <div className="qbert-container mobile" style={{
              width: '60px',
              height: '60px',
              minWidth: '60px',
              minHeight: '60px',
              position: 'relative',
              overflow: 'visible'
            }}>
              <SimplifiedQBertNav isMobile={true} currentTheme={currentTheme} />
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
                onClick={() => {
                  setMenuOpen(false);
                  // Reset scroll position when navigating
                  window.scrollTo(0, 0);
                }}
              >
                {section.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
      
      {/* Main layout area */}
      <div 
        className="main-layout"
        style={isMobile ? { 
          height: 'auto', 
          minHeight: '50vh',
          overflow: 'visible',
          position: 'relative' 
        } : {}}
      >
        {/* Desktop sidebar */}
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
        
        {/* Desktop Layout */}
        {!isMobile && (
          <>
            {/* Middle column - Q*bert */}
            <div className="qbert-panel">
              <div className="qbert-container desktop">
                <SimplifiedQBertNav isMobile={false} currentTheme={currentTheme} />
              </div>
            </div>
            
            {/* Right column - Content */}
            <main className="content-area desktop">
              <div className="page-container">
                <Outlet context={{ currentTheme }} />
              </div>
            </main>
          </>
        )}
        
        {/* Mobile content area - FIXED FOR SCROLLING */}
        {isMobile && (
          <main 
            ref={contentRef}
            className="content-area mobile" 
            style={{ 
              WebkitOverflowScrolling: 'touch',
              touchAction: 'auto',
              overflowY: 'visible',
              position: 'relative',
              height: 'auto',
              minHeight: '50vh',
              paddingBottom: '60px', // Add space for footer
              pointerEvents: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="page-container"
              style={{ 
                position: 'relative', 
                zIndex: 5,
                touchAction: 'auto',
                pointerEvents: 'auto'
              }}
            >
              <Outlet context={{ currentTheme }} />
            </div>
          </main>
        )}
      </div>
      
      {/* Footer with improved visibility */}
      <Footer currentTheme={currentTheme} />
    </div>
  );
};

export default SimplifiedLayout;