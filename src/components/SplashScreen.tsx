

import React from 'react';
import { useLocation } from 'react-router-dom';
import './SplashScreen.css';


interface SplashScreenProps {
  onContinue: () => void;
}


const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
     return (
       <div className="splash-container">
         <div style={{ fontSize: 64, marginBottom: 16 }}>☕</div>
         <div className="splash-text" style={{ color: '#6F4E37', fontWeight: 700 }}>Welcome to Da-coffee!</div>
         <div className="splash-subtext">Your specialty coffee experience starts here...</div>
        <button className="splash-btn" onClick={onContinue} style={{
          background: '#6F4E37',
          color: '#FFF8E7',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 32px',
          fontSize: '1.1rem',
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: 24,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'background 0.2s',
        }}>
           {isAdmin ? 'Go to Admin Panel' : 'Enter the Menu'}
         </button>
       </div>
     );
};

export default SplashScreen;
