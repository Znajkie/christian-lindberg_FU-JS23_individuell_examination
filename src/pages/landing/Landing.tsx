import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.scss';
import Logo from '../../assets/logo.png';
import Backgroundleft from '../../assets/header-left.svg';
import Backgroundright from '../../assets/header-right.svg';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/datafetcher');
  };
  return (
    <>
      <div
        className="wrapper"
        onClick={handleNavigate}
        style={{ cursor: 'pointer' }}>
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
