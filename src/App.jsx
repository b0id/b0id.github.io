import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Nursing from './pages/Nursing';
import Electronics from './pages/Electronics';
import Engineering from './pages/Engineering';
import LifeUpdates from './pages/LifeUpdates';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nursing" element={<Nursing />} />
          <Route path="electronics" element={<Electronics />} />
          <Route path="engineering" element={<Engineering />} />
          <Route path="life" element={<LifeUpdates />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

