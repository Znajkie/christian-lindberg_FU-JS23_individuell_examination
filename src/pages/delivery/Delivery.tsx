import DroneImg from '../../assets/droneB.svg'
import './delivery.scss'
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useTokenStore from '../../store/token';

const Checkout = () => {
  const { token } = useTokenStore();
  const isLoggedIn = token !== '';
  const location = useLocation();
  const { eta, orderNr } = location.state || {};

  const navigate = useNavigate();
  const handleNavigate = () => {
    
    if (isLoggedIn) {
      navigate('/orderstatus')
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <div className="order-wrapper">
        <div className="order-num">Ordernummer #{orderNr}</div>
        <img src={DroneImg}></img>
        <h1 className='order-title'>Din beställning är påväg!</h1>
        <div className="order-eta">{eta}minuter</div>
        <button className="order-btn" onClick={handleNavigate}>Ok, cool!</button>
      </div>
    </>
  );
};

export default Checkout

