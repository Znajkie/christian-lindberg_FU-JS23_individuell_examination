import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navmenu.scss';
import NavIcon from '../../assets/navicon.svg';
import CloseBtn from '../../assets/close.svg'

const NavMenu = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <>
      <button className="NavIcon" onClick={toggleOverlay}>
        <img src={NavIcon} alt="Nav-icon" />
      </button>
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="close-btn" onClick={toggleOverlay}>
              <img src={CloseBtn} alt="close-btn" />
            </button>
            <Link to="/datafetcher" className="overlay-link">
              Meny
            </Link>
            <Link to="/about" className="overlay-link">
              Vårt kaffe
            </Link>
            <Link to="/profile" className="overlay-link">
              Min profil
            </Link>
            <Link to="/signup" className="overlay-link">
              Skapa användare
            </Link>
            <Link to="/orderstatus" className="overlay-link">
              Orderstatus
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavMenu;
