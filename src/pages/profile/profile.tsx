import React from 'react';
import { useState } from 'react';
import NavMenu from '../../modules/navMenu/NavMenu';
import headerImg from '../../assets/header.svg';
import droneImg from '../../assets/drone.svg';
import './profile.css';
import { useJwt } from 'react-jwt';
const token = '';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);

  const handleSubmit = (e) => {
    const { decodedToken, isExpired } = useJwt(token);
    e.preventDefault();

    if (gdprConsent) {
    } else {
    }

    // Handle the login logic here
    // This would include creating the JWT and handling the API call
    // Remember to check the gdprConsent before proceeding

    console.log('Login with', name, email, gdprConsent);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile__navbar">{<NavMenu />}</div>
      <img className="img" src={headerImg} alt="Header" />
      <div className="profile__container">
        <main className="profile__login">
          <img src={droneImg} className="profile__logo" alt="Profile Logo" />
          <h1 className="profile__title">Välkommen till AirBean-familjen!</h1>
          <p>
            Genom att skapa ett konto nedan kan du spara och se din
            orderhistorik.
          </p>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default Profile;
