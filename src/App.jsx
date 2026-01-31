import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Studio from './pages/Studio';
import ProjectDetail from './pages/ProjectDetail';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="main-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<Studio />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
