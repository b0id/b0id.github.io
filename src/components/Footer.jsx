import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = ({ currentTheme }) => {
  return (
    <footer className={`site-footer theme-${currentTheme}`}>
      <div className="footer-content">
        <div className="social-links">
          <a href="https://github.com/b0id" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://twitter.com/b0id_dev" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com/in/b0id" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="mailto:contact@b0id.dev" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} b0id.dev</p>
      </div>
    </footer>
  );
};

export default Footer;