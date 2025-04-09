import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Nursing from './pages/Nursing';
import Electronics from './pages/Electronics';
import Engineering from './pages/Engineering';
import LifeUpdates from './pages/LifeUpdates';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Welcome to b0id.dev! Select a branch.</div>} />
        <Route path="nursing" element={<Nursing />} />
        <Route path="electronics" element={<Electronics />} />
        <Route path="engineering" element={<Engineering />} />
        <Route path="life" element={<LifeUpdates />} />
      </Route>
    </Routes>
  );
};

export default App;
