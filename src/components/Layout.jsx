import React from 'react';
import { Outlet } from 'react-router-dom';
import BoidCanvas from './BoidCanvas';
import NavigationGrid from './NavigationGrid';
import QBertSprite from './QBertSprite';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <header className="header">
        <pre className="retro-title">
{`        ██       ████  ██      ██
       ░██      █░░░██░░      ░██
       ░██     ░█  █░█ ██     ░██
       ░██████ ░█ █ ░█░██  ██████
       ░██░░░██░██  ░█░██ ██░░░██
       ░██  ░██░█   ░█░██░██  ░██
       ░██████ ░ ████ ░██░░██████
        ░░░░░    ░░░░  ░░  ░░░░░░`}
        </pre>
      </header>
      <BoidCanvas />
      <NavigationGrid />
      <QBertSprite />
      <main className="content">
        <Outlet />
      </main>
      <footer>
        <p>© 2025 b0id.dev</p>
      </footer>
    </div>
  );
};

export default Layout;
