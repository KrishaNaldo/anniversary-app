import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Pictures.css';

const Pictures = () => {
  const [activePhoto, setActivePhoto] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const audioRef = useRef(null);
  
  // Photo data with all photos set as images (not videos)
  const photos = [
    {
      id: 1,
      title: "Our Official First Date",
      date: "January 11 2024",
      description: "When our first date as couple",
      cssClass: "photo-1", // CSS class to apply background image
      isVideo: false
    },
    {
      id: 2,
      title: "First Flower",
      date: "February 14 2023",
      description: "Kabalo ka ngano kana ang title kay diha man na day gitagaan ko nimo og flower HAHAHAH wala koy pics sa flower",
      cssClass: "photo-2",
      isVideo: false
    },
    {
      id: 3,
      title: "Unplanned Laag Somewhere",
      date: "March 14,2023",
      description: "It is where like diri na dayun gasugod sugod ang laag permi gabii na dayun makauli huhu",
      cssClass: "photo-3",
      isVideo: false
    },
    {
      id: 4,
      title: "Mine Tour",
      date: "March 2024",
      description: "Wowowow Mine Together",
      cssClass: "photo-4",
      isVideo: false
    },
    {
      id: 5,
      title: "Fun Run",
      date: "May 21 2024",
      description: "First Fun Run Together uhmm wowow",
      cssClass: "photo-5",
      isVideo: false
    },
    {
      id: 6,
      title: "Cinema Together",
      date: "August 8 2023",
      description: "Ga cinema bisag walay moni :<",
      cssClass: "photo-6",
      isVideo: false
    },
    {
      id: 7,
      title: "A Kitt and First Photobooth",
      date: "Somewhere Year 2022",
      description: "Hehe First Time naku maka photobooth sa ano like crush naku aw feelingon. Im super shy pi!",
      cssClass: "photo-7",
      isVideo: false
    },
    {
      id: 8,
      title: "Anniversary Trip To Jespera Beach",
      date: "January 10,2025",
      description: "Wowowowow nagdugay nata yepeee hehehe sirok pakay na kay hapit di ma enroll HAHAHAH",
      cssClass: "photo-8",
      isVideo: false  // Changed from true to false
    }
  ];
  
  // Auto rotate photos every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [photos.length]);
  
  // Look for a specific click pattern to reveal a secret message
  const [clickPattern, setClickPattern] = useState([]);
  
  useEffect(() => {
    if (clickPattern.join('') === "12121") {
      setShowSecret(true);
      
      // Play the music when secret is revealed
      if (audioRef.current) {
        audioRef.current.volume = 0.6; // Set volume to 60%
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
      }
      
      // Auto-close the secret message after 10 seconds
      const timer = setTimeout(() => {
        setShowSecret(false);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [clickPattern]);
  
  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);
  
  const handlePatternClick = (num) => {
    setClickPattern(prev => {
      const newPattern = [...prev, num];
      if (newPattern.length > 5) {
        return newPattern.slice(1);
      }
      return newPattern;
    });
  };
  
  return (
    <div className="pictures-container">
      <h1 className="pictures-title">Our Memories Together</h1>
      <div className="pattern-hint">(Try clicking: corner, middle, corner, middle, corner)</div>
      
      {/* Audio element for the secret message music */}
      <audio 
        ref={audioRef} 
        src="/audio/bad-wave-to-earth.mp3"
        preload="auto"
      />
      
      <div className="photo-viewer">
        <div className="photo-controls">
          <button 
            className="photo-nav prev" 
            onClick={() => setActivePhoto((prev) => (prev - 1 + photos.length) % photos.length)}
          >
            ❮
          </button>
          
          <div className="photo-frame">
            <div className={`photo ${photos[activePhoto].cssClass}`}>
              <div className="photo-info">
                <h3>{photos[activePhoto].title}</h3>
                <div className="photo-date">{photos[activePhoto].date}</div>
                <p>{photos[activePhoto].description}</p>
              </div>
            </div>
          </div>
          
          <button 
            className="photo-nav next" 
            onClick={() => setActivePhoto((prev) => (prev + 1) % photos.length)}
          >
            ❯
          </button>
        </div>
        
        <div className="photo-dots">
          {photos.map((photo, index) => (
            <span 
              key={photo.id} 
              className={`photo-dot ${activePhoto === index ? 'active' : ''}`}
              onClick={() => setActivePhoto(index)}
            ></span>
          ))}
        </div>
      </div>
      
      <div className="pattern-clicks">
        <div className="pattern-row">
          <button className="pattern-button corner" onClick={() => handlePatternClick(1)}></button>
          <button className="pattern-button edge" onClick={() => handlePatternClick(3)}></button>
          <button className="pattern-button corner" onClick={() => handlePatternClick(1)}></button>
        </div>
        <div className="pattern-row">
          <button className="pattern-button edge" onClick={() => handlePatternClick(3)}></button>
          <button className="pattern-button middle" onClick={() => handlePatternClick(2)}></button>
          <button className="pattern-button edge" onClick={() => handlePatternClick(3)}></button>
        </div>
        <div className="pattern-row">
          <button className="pattern-button corner" onClick={() => handlePatternClick(1)}></button>
          <button className="pattern-button edge" onClick={() => handlePatternClick(3)}></button>
          <button className="pattern-button corner" onClick={() => handlePatternClick(1)}></button>
        </div>
      </div>
      
      {showSecret && (
        <div className="secret-message">
          <div className="secret-content">
            <h3>You found the secret message!</h3>
            <p>I love you so much love hehehe and galisod kog himo code ani aw but yah Happy 1 year and 4 months gasp wowow. I hope our relationship continues to grow stronger and lasts until we're old. I wish that all our dreams come true and that we have a bright future ahead of us. 
              I'll always support you and love you, even though I give you some attitude sometimes,HEHEHE. I want you to know that I care for you and love you so much.</p>
            <p className="secret-signature">krisuu cutey gorly</p>
            <div className="secret-timer">
              <div className="timer-bar"></div>
            </div>
          </div>
        </div>
      )}
      
      <div className="navigation-buttons">
        <Link to="/" className="return-button">
          <span>Return to Our Anniversary</span>
        </Link>
        
        <Link to="/game" className="game-button">
          <span>Play My Game Drakey</span>
        </Link>
      </div>
    </div>
  );
};

export default Pictures;