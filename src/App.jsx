import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SimplifiedLayout from './components/SimplifiedLayout';
import MetaHead from './components/MetaHead'; // Import the new MetaHead component
import Home from './pages/Home';
import Nursing from './pages/Nursing';
import Electronics from './pages/Electronics';
import Engineering from './pages/Engineering';
import LifeUpdates from './pages/LifeUpdates';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './App.css';
import './styles/PageStyles.css';
import './styles/mobile-optimizations.css'; 

function App() {
  return (
    <Router>
      {/* Add the MetaHead component here */}
      <MetaHead />
      
      <Routes>
        <Route path="/" element={<SimplifiedLayout />}>
          <Route index element={<Home />} />
          <Route path="nursing" element={<Nursing />} />
          <Route path="electronics" element={<Electronics />} />
          <Route path="engineering" element={<Engineering />} />
          <Route path="life" element={<LifeUpdates />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;