import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavMenu from '../../modules/navMenu/NavMenu';
import profileImg from '../../assets/Profile.svg';
import headerImg from '../../assets/header.svg';
import './orderstatus.scss';
import {useUserStore} from '../../Store/userStore';

interface UserHistoryRecord {
  total: number;
  orderNr: string;
  orderDate: string;
}

const OrderStatus = () => {
  const { name, password } = useUserStore();
  console.log('NAME PASSWORD:', name, password);

  const navigate = useNavigate();

  // Use state to store fetched data
const [userHistory, setUserHistory] = useState<UserHistoryRecord[] | null>(
  null
);
  const [error, setError] = useState('');

const fetchUserHistory = async () => {
  try {

    const localStorageToken = localStorage.getItem('jwt');
    const response = await fetch(
      'https://airbean-api-xjlcn.ondigitalocean.app/api/user/history',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Du måste skapa en användare först');
    }

    const data = await response.json();
    setUserHistory(data.orderHistory);
    console.log('User history data:', data.orderHistory);
    
  } catch (error) {
    setError(error.message);
    console.error('An error occurred:', error.message);
    navigate('../signup');
  }
};

  useEffect(() => {
    const localStorageToken = localStorage.getItem('jwt');
    console.log('TOKEN STATUS', localStorageToken);
    if (localStorageToken) {
      fetchUserHistory();
    }
  }, []);


  return (
    <>
      <div className="history-wrapper">
        <div className="history-nav">
          <NavMenu />
        </div>
        <img className="history__img" src={headerImg} alt="Header" />
        <img className="history__img" src={profileImg} alt="Profile" />
        <h2 className="history__name">{name}</h2>
        <p className="history__epost">{password}</p>
        <section className="history__section">
          <h2 className="history__section-title">Orderhistorik</h2>
          {userHistory ? (
            <ul>
              {userHistory.map((order, index) => (
                <li key={index}>
                  <p>Total: {order.total}</p>
                  <p>Order Nr: {order.orderNr}</p>
                  <p>Order Date: {order.orderDate}</p>
                </li>
              ))}
            </ul>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <p>Loading...</p>
          )}
        </section>
      </div>
    </>
  );
};

export default OrderStatus;
