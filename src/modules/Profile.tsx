import React from 'react'
import profilImg from '../assets/profileface.svg'
const Profile = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '2rem'
      }}
    >
       <img src={profilImg} alt="Profile" style={{ maxWidth: '100%', height: 'auto' }}/>
      <h1>Eva Cortado</h1>
      <p>VD & Grundare</p>
    </div>
  );
}

export default Profile