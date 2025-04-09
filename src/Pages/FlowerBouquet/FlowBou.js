import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FlowBou.css'

const FlowerBouquet = () => {
  // Password protection state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const correctPassword = '02062023'; // First kiss date (DDMMYYYY)
  
  // Flower animation state
  const [revealed, setRevealed] = useState(false);
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleReveal = () => {
    setRevealed(true);
    
    // Show message after flowers are revealed
    setTimeout(() => {
      setShowMessage(true);
    }, 2000);
  };

  // If not authenticated, show password screen
  if (!isAuthenticated) {
    return (
      <div className="fb-password-container">
        <h2 className="fb-password-title">One More Special Gift</h2>
        <p className="fb-password-question">When was our first kiss?</p>
        <p className="fb-password-hint">(Format: DDMMYYYY)</p>
        
        <form onSubmit={handlePasswordSubmit} className="fb-password-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="fb-password-input"
            placeholder="Enter the date"
          />
          <button type="submit" className="fb-password-button">Unlock Gift</button>
        </form>
        
        {error && <p className="fb-password-error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="fb-bouquet-container">
      <h1 className="fb-bouquet-title">A Special Bouquet For You</h1>
      
      {!revealed && (
        <div className="fb-gift-box">
          <div className="fb-gift-lid"></div>
          <div className="fb-gift-box-body"></div>
          <div className="fb-gift-ribbon"></div>
          <button className="fb-open-gift-button" onClick={handleReveal}>Open Your Gift</button>
        </div>
      )}
      
      {revealed && (
        <div className="fb-bouquet-wrapper">
          <div className="fb-bouquet">
            <div className="fb-flower fb-flower-center fb-rose">
              <div className="fb-petal-ring fb-outer">
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
              </div>
              <div className="fb-petal-ring fb-middle">
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
              </div>
              <div className="fb-petal-ring fb-inner">
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
              </div>
              <div className="fb-center"></div>
            </div>
            
            <div className="fb-flower fb-rose fb-left-rose">
              <div className="fb-petal-ring fb-outer">
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
              </div>
              <div className="fb-petal-ring fb-middle">
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
              </div>
              <div className="fb-center"></div>
            </div>
            
            <div className="fb-flower fb-rose fb-right-rose">
              <div className="fb-petal-ring fb-outer">
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
              </div>
              <div className="fb-petal-ring fb-middle">
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
                <div className="fb-petal"></div>
              </div>
              <div className="fb-center"></div>
            </div>
            
            <div className="fb-flower fb-tulip fb-left-tulip">
              <div className="fb-petal"></div>
              <div className="fb-petal"></div>
              <div className="fb-petal"></div>
            </div>
            
            <div className="fb-flower fb-tulip fb-right-tulip">
              <div className="fb-petal"></div>
              <div className="fb-petal"></div>
              <div className="fb-petal"></div>
            </div>
            
            <div className="fb-leaves">
              <div className="fb-leaf fb-leaf-1"></div>
              <div className="fb-leaf fb-leaf-2"></div>
              <div className="fb-leaf fb-leaf-3"></div>
              <div className="fb-leaf fb-leaf-4"></div>
              <div className="fb-leaf fb-leaf-5"></div>
            </div>
            
            <div className="fb-stems">
              <div className="fb-stem fb-stem-1"></div>
              <div className="fb-stem fb-stem-2"></div>
              <div className="fb-stem fb-stem-3"></div>
              <div className="fb-stem fb-stem-4"></div>
              <div className="fb-stem fb-stem-5"></div>
            </div>
            
            <div className="fb-wrapper-ribbon">
              <div className="fb-ribbon-segment fb-ribbon-segment-1"></div>
              <div className="fb-ribbon-segment fb-ribbon-segment-2"></div>
            </div>
          </div>
          
          {showMessage && (
            <div className="fb-love-message">
              <h2>Drakeyy,</h2>
              <p>Every day with you has been a beautiful journey. This bouquet represents my love for you - it will never wilt or fade.</p>
              <p>Thank you for being the most amazing partner. I cherish every moment we spend together.</p>
              <p>Krisuuuu,</p>
              <p className="fb-signature">❤️</p>
            </div>
          )}
        </div>
      )}
      
      <div className="fb-navigation-buttons">
        <Link to="/gamever" className="fb-return-button">
          <span>Back to Game</span>
        </Link>
        
        <Link to="/" className="fb-home-button">
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};

export default FlowerBouquet;