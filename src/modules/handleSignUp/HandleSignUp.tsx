import React, { useState } from 'react';
import NavMenu from '../navMenu/NavMenu';
import headerImg from '../../assets/header.svg';
import droneImg from '../../assets/drone.svg';
import useUserStore from '../../store/userStore';
import './handleSignUp.scss';

const HandleSignUp = () => {
  const setName = useUserStore((state) => state.setName);
  const setPassword = useUserStore((state) => state.setPassword);
  const [username, setUserName] = useState('');
  const [password, setPasswordLocal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://airbean-9pcyw.ondigitalocean.app/api/user/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username, password: password }),
        }
      );

      if (!response.ok) {
        throw new Error('Signup failed');
      }
      console.log('account created');

      setName(username);
      setPassword(password);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile__navbar">
        <NavMenu />
      </div>
      <img className="img" src={headerImg} alt="Header" />
      <div className="profile__container">
        <main className="profile__login">
          <img src={droneImg} className="profile__logo" alt="Profile Logo" />
          <h1 className="profile__title">Välkommen till AirBean-familjen!</h1>
          <p>
            Genom att skapa ett konto nedan kan du spara och se din
            orderhistorik.
          </p>
          <div>
            <h2>Skapa ett konto</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <p className="form-title">Namn</p>
                <input
                  type="text"
                  id="userName"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="form-wrapper">
                <p className="form-title">Epost</p>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPasswordLocal(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">
                Skapa konto
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HandleSignUp;
