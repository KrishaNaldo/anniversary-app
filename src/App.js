import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Anniversary from './Pages/Anniversary/Anniversary';
import Pictures from './Pages/Memories/Pictures';
import Gamever from './Pages/Gamever/Gamever';
import PasswordProtected from './Pages/PasswordProtected/components/PasswordProtected';
import FlowerBouquet from './Pages/FlowerBouquet/FlowBou'; 
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Anniversary />} /> 
        <Route path="/pictures" element={<Pictures />} />
        <Route path="/game" element={<Gamever />} /> 
        <Route path="/bouquet" element={<FlowerBouquet />} />
        <Route path="/Gamever" element={
          <PasswordProtected correctPassword="06042022">
            <Gamever />
          </PasswordProtected>
        } />

      </Routes>
    </Router>
  );
}

export default App;