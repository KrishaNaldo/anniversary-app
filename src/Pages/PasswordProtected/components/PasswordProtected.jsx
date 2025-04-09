import React, { useState } from 'react';

const PasswordProtected = ({ correctPassword, onSuccess, children }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError('');
      if (onSuccess) onSuccess();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="password-container">
      <h2 className="password-title">Password Required</h2>
      <p className="password-question">Where did our first meet?</p>
      <p className="password-hint">(Format: DDMMYYYY)</p>
      
      <form onSubmit={handleSubmit} className="password-form">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
          placeholder="Enter password"
        />
        <button type="submit" className="password-button">Submit</button>
      </form>
      
      {error && <p className="password-error">{error}</p>}
      
      <style jsx="true">{`
        .password-container {
          background: linear-gradient(135deg, #ff8ba7 0%, #ffb4a2 50%, #ffcdb2 100%);
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          max-width: 400px;
          margin: 100px auto;
          box-shadow: 0 10px 30px rgba(109, 89, 122, 0.4);
          font-family: 'Poppins', sans-serif;
          color: #6d597a;
        }
        
        .password-title {
          font-family: 'Bubblegum Sans', cursive;
          font-size: 2rem;
          margin-bottom: 20px;
          color: #6d597a;
        }
        
        .password-question {
          font-size: 1.2rem;
          margin-bottom: 5px;
        }
        
        .password-hint {
          font-size: 0.9rem;
          margin-bottom: 20px;
          opacity: 0.8;
        }
        
        .password-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .password-input {
          padding: 12px;
          border-radius: 30px;
          border: 2px solid #6d597a;
          background: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          text-align: center;
        }
        
        .password-button {
          background: #6d597a;
          color: white;
          border: none;
          border-radius: 30px;
          padding: 12px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .password-button:hover {
          background: #574a64;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(109, 89, 122, 0.4);
        }
        
        .password-error {
          color: #e63946;
          margin-top: 15px;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default PasswordProtected;