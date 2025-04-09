import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Gamever.css';

const PasswordProtectedGamever = () => {
  // Password protection state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const correctPassword = '06042022'; // DDMMYYYY format
  
  // Game state
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showTreat, setShowTreat] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [level, setLevel] = useState(1);
  const [heartSpeed, setHeartSpeed] = useState(800);
  const gameAreaRef = useRef(null);
  const winThreshold = 20;

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  // Start the game
  const startGame = () => {
    setScore(0);
    setTimeLeft(40);
    setGameActive(true);
    setGameOver(false);
    setShowTreat(false);
    setHearts([]);
    setObstacles([]);
    setLevel(1);
    setHeartSpeed(800);
  };

  // End the game
  const endGame = (isWinner) => {
    setGameActive(false);
    setGameOver(true);
    
    if (isWinner) {
      setShowTreat(true);
      console.log("Player won! showTreat set to:", true);
    } else {
      setShowTreat(false);
    }
  };

  // Handle click on a heart
  const catchHeart = (id, points = 1) => {
    const newScore = score + points;
    setScore(newScore);
    setHearts(prevHearts => prevHearts.filter(heart => heart.id !== id));
    
    // Check for level up
    if (newScore >= level * 5 && level < 3) {
      setLevel(prev => prev + 1);
      setHeartSpeed(prev => prev * 0.8);
    }
    
    // Check if we've reached the winning score
    if (newScore >= winThreshold) {
      console.log("Win threshold reached!");
      endGame(true);
    }
  };

  // Handle click on an obstacle (penalty)
  const hitObstacle = (id) => {
    setScore(prevScore => Math.max(0, prevScore - 2));
    setObstacles(prevObstacles => prevObstacles.filter(obstacle => obstacle.id !== id));
  };

  // Generate a new heart
  const generateHeart = () => {
    if (!gameAreaRef.current) return;
    
    const gameArea = gameAreaRef.current.getBoundingClientRect();
    const heartTypes = ['❤️', '💕', '💓', '💗', '💖'];
    const heartSizes = ['small', 'medium', 'large'];
    
    const isSpecial = Math.random() < 0.15;
    
    const newHeart = {
      id: Date.now(),
      x: Math.random() * (gameArea.width - 40),
      y: Math.random() * (gameArea.height - 40),
      type: isSpecial ? '💝' : heartTypes[Math.floor(Math.random() * heartTypes.length)],
      size: isSpecial ? 'large' : heartSizes[Math.floor(Math.random() * heartSizes.length)],
      rotation: Math.floor(Math.random() * 360),
      special: isSpecial,
      points: isSpecial ? 3 : 1,
      disappearTime: isSpecial ? 2000 : 3000
    };
    
    setHearts(prevHearts => [...prevHearts, newHeart]);
    
    setTimeout(() => {
      setHearts(prevHearts => prevHearts.filter(heart => heart.id !== newHeart.id));
    }, newHeart.disappearTime);
  };

  // Generate obstacles
  const generateObstacle = () => {
    if (!gameAreaRef.current || level < 2) return;
    
    const gameArea = gameAreaRef.current.getBoundingClientRect();
    const obstacleTypes = ['💔', '❌', '⚡️'];
    
    const newObstacle = {
      id: Date.now() + 1000,
      x: Math.random() * (gameArea.width - 40),
      y: Math.random() * (gameArea.height - 40),
      type: obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)],
      rotation: Math.floor(Math.random() * 360)
    };
    
    setObstacles(prevObstacles => [...prevObstacles, newObstacle]);
    
    setTimeout(() => {
      setObstacles(prevObstacles => prevObstacles.filter(obstacle => obstacle.id !== newObstacle.id));
    }, 2500);
  };

  // Moving hearts (level 3)
  useEffect(() => {
    if (!gameActive || level < 3) return;
    
    const moveInterval = setInterval(() => {
      if (!gameAreaRef.current) return;
      const gameArea = gameAreaRef.current.getBoundingClientRect();
      
      setHearts(prevHearts => prevHearts.map(heart => {
        const moveX = Math.random() * 20 - 10;
        const moveY = Math.random() * 20 - 10;
        
        const newX = Math.max(0, Math.min(gameArea.width - 40, heart.x + moveX));
        const newY = Math.max(0, Math.min(gameArea.height - 40, heart.y + moveY));
        
        return {
          ...heart,
          x: newX,
          y: newY
        };
      }));
    }, 500);
    
    return () => clearInterval(moveInterval);
  }, [gameActive, level]);

  // Timer for the game
  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (gameActive && timeLeft === 0) {
      endGame(false);
    }
    
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);

  // Generate hearts at regular intervals
  useEffect(() => {
    let heartGenerator;
    if (gameActive) {
      heartGenerator = setInterval(generateHeart, heartSpeed);
    }
    
    return () => clearInterval(heartGenerator);
  }, [gameActive, heartSpeed]);

  // Generate obstacles at regular intervals
  useEffect(() => {
    let obstacleGenerator;
    if (gameActive && level >= 2) {
      obstacleGenerator = setInterval(generateObstacle, 2000);
    }
    
    return () => clearInterval(obstacleGenerator);
  }, [gameActive, level]);

  // Debug logging for showTreat state changes
  useEffect(() => {
    console.log("showTreat state changed to:", showTreat);
  }, [showTreat]);

  // Render password protection screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="password-container">
        <h2 className="password-title">Password Required</h2>
        <p className="password-question">Where did our first meet?</p>
        <p className="password-hint">(Format: DDMMYYYY)</p>
        
        <form onSubmit={handlePasswordSubmit} className="password-form">
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
      </div>
    );
  }

  // Render game if authenticated
  return (
    <div className="gamever-container">
      <h1 className="gamever-title">Love Catcher Challenge ONLY FOR DRAKE</h1>
      <p className="gamever-subtitle">Catch {winThreshold} hearts in 40 seconds to win a sweet treat!</p>
      
      {!gameActive && !gameOver && (
        <div className="game-start">
          <p>Ready to play for a special treat? This won't be easy!</p>
          <button className="start-button" onClick={startGame}>Start Game</button>
        </div>
      )}
      
      {gameActive && (
        <div className="game-stats">
          <div className="game-score">Hearts: {score}/{winThreshold}</div>
          <div className="game-level">Level: {level}</div>
          <div className="game-timer">Time: {timeLeft}s</div>
        </div>
      )}
      
      <div 
        ref={gameAreaRef} 
        className={`game-area ${gameActive ? 'active' : ''}`}
      >
        {hearts.map(heart => (
          <div
            key={heart.id}
            className={`falling-heart ${heart.size} ${heart.special ? 'special-heart' : ''}`}
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              transform: `rotate(${heart.rotation}deg)`,
              filter: heart.special ? 'drop-shadow(0 0 8px gold)' : 'none'
            }}
            onClick={() => catchHeart(heart.id, heart.points)}
          >
            {heart.type}
          </div>
        ))}
        
        {obstacles.map(obstacle => (
          <div
            key={obstacle.id}
            className="obstacle"
            style={{
              left: `${obstacle.x}px`,
              top: `${obstacle.y}px`,
              transform: `rotate(${obstacle.rotation}deg)`,
              position: 'absolute',
              fontSize: '36px',
              cursor: 'pointer',
              filter: 'drop-shadow(0 0 5px red)',
              animation: 'pulse 0.8s infinite alternate'
            }}
            onClick={() => hitObstacle(obstacle.id)}
          >
            {obstacle.type}
          </div>
        ))}
        
        {gameOver && !showTreat && (
          <div className="game-over-message">
            <h2>Game Over!</h2>
            <p>You caught {score} hearts.</p>
            <p>Try again to win that ice cream!</p>
            <button className="retry-button" onClick={startGame}>Play Again</button>
          </div>
        )}
    
        {gameOver && showTreat && (
          <div className="winner-treat">
            <h2>You Won DRAKE WOWOWOW! 🎉</h2>
            <p>You're a Love Catching Master!</p>
            <p>Here's your virtual ice cream reward:</p>
            
            <div className="ice-cream-container">
              <div className="ice-cream">
                <div className="scoop chocolate"></div>
                <div className="scoop vanilla"></div>
                <div className="scoop strawberry"></div>
                <div className="cone"></div>
                <div className="cherry"></div>
                <div className="sprinkles"></div>
              </div>
            </div>
            
            <div className="claim-message">
              <p>"This virtual ice cream can be redeemed for a real one! 
                Screenshot then send it to me hehe."</p>
            </div>
            
            <button 
              className="retry-button" 
              onClick={startGame}
            >
              Play Again!
            </button>
          </div>
        )}
      </div>
      
      <Link to="/bouquet" className="flowgame-button">
        <span>Please Proceed I have a Gift for you</span>
      </Link>
      
      <div className="game-instructions">
        <h3>THIS IS HOW YOU PLAY DISRAELI DRAKE ESCARDA:</h3>
        <p>1. Click on hearts to catch them - try to be quick RRRR!</p>
        <p>2. Special hearts (💝) are worth 3 points but disappear faster</p>
        <p>3. AVOID clicking on bad symbols (💔, ❌, ⚡️) - they'll subtract points!</p>
        <p>4. The game gets harder as you level up - hearts will move at level 3!</p>
        <p>5. Catch {winThreshold} hearts before time runs out to win your treat</p>
      </div>
      
      <div className="navigation-buttons">
        <Link to="/" className="return-button">
          <span>Return to Our Anniversary</span>
        </Link>
        
        <Link to="/pictures" className="pictures-button">
          <span>View Our Memories</span>
        </Link>
      </div>
    </div>
  );
};

export default PasswordProtectedGamever;