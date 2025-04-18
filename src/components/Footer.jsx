import React from 'react';
import './Footer.css';

const Footer = ({ currentTheme }) => {
  return (
    <footer className={`site-footer theme-${currentTheme || 'home'}`}>
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">b0id.dev</div>
          <p className="footer-tagline">A Digital Polymath Playground</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-section">
            <h3>Navigation</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/nursing">Nursing</a></li>
              <li><a href="/electronics">Electronics</a></li>
              <li><a href="/engineering">Engineering</a></li>
              <li><a href="/life">Life</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Connect</h3>
            <ul>
              <li><a href="https://github.com/b0id" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://twitter.com/b0id_dev" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="mailto:contact@b0id.dev">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} b0id.dev | All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;