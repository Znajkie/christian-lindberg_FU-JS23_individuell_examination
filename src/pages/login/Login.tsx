import React from 'react';
import { useState } from 'react';
import NavMenu from '../../modules/navMenu/NavMenu';
import { postLogin } from '../../modules/API/postLogin';
import headerImg from '../../assets/header.svg';
import droneImg from '../../assets/drone.svg';
import './login.scss';
import { useUserStore } from '../../store/userStore';
import useTokenStore from '../../store/token';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { name, setName, password, setPassword } = useUserStore();
  const { token, setToken } = useTokenStore();
  const [gdprConsent, setGdprConsent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gdprConsent) {
      console.log('GDPR consent required');
      return;
    }

    try {
      const authToken = await postLogin(name, password);
      setToken(authToken);
      navigate('/orderstatus');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile__navbar">{<NavMenu />}</div>
      <img className="img" src={headerImg} alt="Header" />
      <div className="profile__container">
        <main className="profile__login">
          <img src={droneImg} className="profile__logo" alt="Profile Logo" />
          <h1 className="profile__title">Välkommen till AirBean-familjen!</h1>
          <p>Vänligen logga in för att kunna se din orderhistorik!</p>

          <form onSubmit={handleSubmit}>
            <p className="form-title">Namn</p>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="form-title">Epost</p>
            <input
              type="email"
              className="form-control"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
              />
              <span className="checkmark"></span>
              GDPR Ok!
            </label>
            <button type="submit" className="btn-primary">
              Brew me a cup!
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;
