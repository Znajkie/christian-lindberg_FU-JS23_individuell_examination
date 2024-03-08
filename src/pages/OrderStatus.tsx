import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavMenu from './NavMenu';
import profileImg from '../assets/Profile.svg'
import headerImg from '../assets/header.svg'
import './orderstatus.css'

const OrderStatus = () => {
  const location = useLocation();
  const { orderNr } = location.state || {};

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/profile');
  };

  return (
    <>
      <div className="history-wrapper">
        <div className="history-nav">{<NavMenu />}</div>
        <img className="history__img" src={headerImg} alt="Header" />
        <img className="history__img" src={profileImg} alt="Header" />
        <h2 className="history__name">Namn</h2>
        <p className="history__epost">epost</p>
        <section className="history__section">
          <h2 className="history__section-title">Orderhistorik</h2>
          {/* gör en map */}
          <p className="order__section-p">Totalt spenderat</p>
        </section>
      </div>
    </>
  );
};

export default OrderStatus;

