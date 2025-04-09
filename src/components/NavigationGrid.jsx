import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigationGrid.css';

const sections = [
  { name: 'Nursing', path: '/nursing' },
  { name: 'Electronics', path: '/electronics' },
  { name: 'Engineering', path: '/engineering' },
  { name: 'Life Updates', path: '/life' },
];

const NavigationGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="navigation-grid">
      {sections.map(section => (
        <div key={section.path} className="nav-cube" onClick={() => navigate(section.path)}>
          {section.name}
        </div>
      ))}
    </div>
  );
};

export default NavigationGrid;
