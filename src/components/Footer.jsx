import React from 'react';
import './Footer.css';

const Footer = ({ currentTheme }) => {
  return (
    <footer className={`site-footer theme-${currentTheme || 'home'}`}>
      <div className="footer-content">
        {/* Brand/logo section */}
        <div className="footer-brand">
          <div className="footer-brand-unit">
            <img
              src="/115111701.jpeg"
              alt="b0id.dev logo"
              className="footer-logo-img"
            />
            <div>
              <div className="footer-logo">b0id.dev</div>
              <div className="footer-tagline">A Digital Polymath Playground</div>
            </div>
          </div>
        </div>

        {/* Navigation links and connect section */}
        <div className="footer-links">
          {/* Navigation columns */}
          <div className="footer-section nav-columns">
            <h3>Navigation</h3>
            <div className="footer-nav-columns">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/nursing">Nursing</a></li>
              </ul>
              <ul>
                <li><a href="/electronics">Electronics</a></li>
                <li><a href="/engineering">Engineering</a></li>
              </ul>
              <ul>
                <li><a href="/life">Life</a></li>
                <li><a href="/about">About</a></li>
              </ul>
            </div>
          </div>

          {/* Connect section with icons */}
          <div className="footer-section">
            <h3>Connect</h3>
            <ul className="footer-connect-list">
              <li>
                <a href="mailto:colby@b0id.dev" aria-label="Email">
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 4h20v16H2V4zm2 2v.01L12 13l8-6.99V6H4zm16 2.236l-7.447 6.5a1 1 0 0 1-1.106 0L4 8.236V18h16V8.236z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://github.com/b0id" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.495.998.108-.775.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://x.com/DevB0id" target="_blank" rel="noopener noreferrer" aria-label="X">
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.53 6.47a.75.75 0 0 1 1.06 1.06l-4.72 4.72 4.72 4.72a.75.75 0 1 1-1.06 1.06l-4.72-4.72-4.72 4.72a.75.75 0 1 1-1.06-1.06l4.72-4.72-4.72-4.72a.75.75 0 1 1 1.06-1.06l4.72 4.72 4.72-4.72z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/colby-stoker/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
                  </svg>
                </a>
              </li>
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