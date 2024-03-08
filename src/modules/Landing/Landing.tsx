import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';
import Logo from '../../assets/logo.png';
import Backgroundleft from '../../assets/header-left.svg';
import Backgroundright from '../../assets/header-right.svg';


const LandingPage = () => {
  const navigate = useNavigate();

  // Function to navigate to DataFetcher
  const navigateToDataFetcher = () => {
    navigate('/datafetcher');
  };
  return (
    <>
      <div
        className="wrapper"
        onClick={navigateToDataFetcher}
        style={{ cursor: 'pointer' }}
      >
        <img src={Backgroundleft} alt="Small Logo" />
        <img src={Backgroundright} alt="Small Logo" />
        <div className="landing-page">
          <img src={Logo} alt="Small Logo" />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
