// src/Pages/Anniversary/Anniversary.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Anniversary.css';

const Anniversary = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [showSecretButton, setShowSecretButton] = useState(false);

  // Calculate time since January 10, 2024
  useEffect(() => {
    const startDate = new Date('January 10, 2024');
    
    const calculateTime = () => {
      const now = new Date();
      const difference = now - startDate;
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    
    // Show the secret button after 5 seconds
    const secretTimer = setTimeout(() => {
      setShowSecretButton(true);
    }, 5000);
    
    return () => {
      clearInterval(timer);
      clearTimeout(secretTimer);
    };
  }, []);

  // Calculate months and remaining days
  const monthsCount = 16; // 1 year and 4 months
  const specialDay = "April 10, 2025";
  
  return (
    <div className="anniversary-container">
      <div className="card">
        <div className="header">
          <h1>Our Journey Together</h1>
          <h2>1 Year & 4 Months of Saying "Yes"</h2>
          <div className="date-highlight">Since January 10, 2024</div>
        </div>
        
        <div className="timeline">
          <div className="milestone">
            <div className="dot start"></div>
            <div className="label">Jan 10, 2024</div>
          </div>
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
          <div className="milestone">
            <div className="dot current"></div>
            <div className="label">Apr 10, 2025</div>
          </div>
        </div>
        
        <div className="stats-container">
          <div className="stat-box">
            <div className="stat-value">{monthsCount}</div>
            <div className="stat-label">Months</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{timeElapsed.days}</div>
            <div className="stat-label">Days</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{timeElapsed.hours}</div>
            <div className="stat-label">Hours</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{timeElapsed.minutes}</div>
            <div className="stat-label">Minutes</div>
          </div>
        </div>
        
        <div className="message">
          <p>Today marks our special milestone - {monthsCount} months of beautiful memories together.</p>
          <p>From the moment I said "Yes" to today, every moment has been a treasure.</p>
          <p>Here's to many more years of love, laughter,and happiness!</p>
        </div>
        
        <div className="hearts">
          <span className="heart">❤️</span>
          <span className="heart">❤️</span>
          <span className="heart">❤️</span>
        </div>

        {showSecretButton && (
          <div className="secret-container">
            <div className="hint">Psst... I have a secret for you!</div>
            <Link to="/pictures" className="secret-button">
              <span className="button-text">Unlock Our Memories</span>
              <span className="button-sparkle sparkle1"></span>
              <span className="button-sparkle sparkle2"></span>
              <span className="button-sparkle sparkle3"></span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Anniversary;