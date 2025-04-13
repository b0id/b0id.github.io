import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import SimplifiedQBertNav from './SimplifiedQBertNav';
import './SimplifiedLayout.css';

const SimplifiedLayout = () => {
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
    } else if (path.includes('about')) {
      setTheme('about');
      setPageTitle('About Me');
      setPageSubtitle('The Person Behind the Pixels');
    } else {
      setTheme('default');
      setPageTitle('b0id.dev');
      setPageSubtitle('A Digital Polymath Playground');
    }
  }, [location.pathname]);

  // Navigation sections with descriptions
  const sections = [
    {
      name: 'Home',
      path: '/',
      theme: 'default',
      description: 'Welcome to my digital playground exploring the intersections of nursing, electronics, engineering, and science.'
    },
    {
      name: 'Nursing',
      path: '/nursing',
      theme: 'nursing',
      description: 'My education in nursing school, merging healthcare with technology and systems thinking.'
    },
    {
      name: 'Electronics',
      path: '/electronics',
      theme: 'electronics',
      description: 'Circuit designs, microcontroller projects, and electronic experiments that bridge physical and digital worlds.'
    },
    {
      name: 'Engineering',
      path: '/engineering',
      theme: 'engineering',
      description: 'Problem-solving through design, applying engineering principles across disciplines and projects.'
    },
    {
      name: 'Life Updates',
      path: '/life',
      theme: 'life',
      description: 'Personal reflections, current projects, and the ongoing journey of a digital polymath.'
    },
    {
      name: 'About Me',
      path: '/about',
      theme: 'about',
      description: 'Learn more about the person behind b0id.dev and my approach to connecting different disciplines.'
    }
  ];

  return (
    <div className={`layout ${theme}`}>
      <header className="site-header">
        <div className="logo-container">
          <h1 className="site-name">b0id.dev</h1>
          <p className="site-subtitle">A Digital Polymath Playground</p>
        </div>
      </header>

      <div className="page-layout">
        {/* Left navigation */}
        <div className="sidebar">
          <nav className="navigation-menu">
            {sections.map(section => (
              <Link
                key={section.path}
                to={section.path}
                className={`nav-item ${section.theme} ${location.pathname === section.path ? 'active' : ''}`}
              >
                <div className="nav-name">{section.name}</div>
                <div className="nav-desc">{section.description}</div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main content area */}
        <div className="main-content">
          <div className="page-header">
            <h2 className="page-title">{pageTitle}</h2>
            <p className="page-subtitle">{pageSubtitle}</p>
          </div>

          {/* Wrap Q*bert and Outlet in a new div */}
          <div className="center-right-wrapper"> {/* Added this wrapper */}
            <div className="qbert-navigation">
              <SimplifiedQBertNav />
            </div>
            <div className="content-container">
              <Outlet />
            </div>
          </div> {/* Close wrapper */}
        </div>
      </div>

      <footer className="site-footer">
        <p>© 2025 b0id.dev | Built with React</p>

        <div className="social-links">
          <a href="https://github.com/b0id" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

export default SimplifiedLayout;