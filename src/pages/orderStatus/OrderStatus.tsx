import React, { useEffect, useState } from 'react';
import NavMenu from '../../modules/navMenu/NavMenu';
import profileImg from '../../assets/Profile.svg';
import headerImg from '../../assets/header.svg';
import './orderstatus.scss';
import { useUserStore } from '../../store/userStore';
import useTokenStore from '../../store/token';
import { UserHistoryRecord } from '../../interface/interface';

const OrderStatus = () => {
  const { name, password } = useUserStore();
  const { token } = useTokenStore();
  const [userHistory, setUserHistory] = useState<UserHistoryRecord[] | null>(null);
  const [totalSpent, setTotalSpent] = useState<number>(0);

  const [error, setError] = useState('');

  const fetchUserHistory = async () => {
    try {
      const response = await fetch(
        'https://airbean-api-xjlcn.ondigitalocean.app/api/user/history',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Du måste skapa en användare först');
      }

      const data = await response.json();
      const total = data.orderHistory.reduce(
        (acc, order) => acc + order.total,
        0
      );

      setTotalSpent(total);
      setUserHistory(data.orderHistory);
  
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUserHistory();
  }, []);

  return (
    <>
      <div className="history-wrapper">
        <div className="history-nav">
          <NavMenu />
        </div>
        <section className="history-header">
          <img className="history__img" src={headerImg} alt="Header" />
          <img className="history__img" src={profileImg} alt="Profile" />
          <h2 className="history__name">{name}</h2>
          <p className="history__epost">{password}</p>
        </section>
        <section className="history__section">
          <h2 className="history__section-title">Orderhistorik</h2>
          {userHistory && userHistory.length > 0 ? (
            <ul>
              {userHistory.map((order, index) => (
                <li className="order-wrapper-li" key={index}>
                  <section className="flex-container">
                    <div className="order-nr">
                      <span>#{order.orderNr}</span>
                    </div>
                    <div className="order-date">
                      <span>{order.orderDate}</span>
                    </div>
                  </section>
                  <section className="flex-container">
                    <p className="total-ordersumma">total ordersumma</p>
                    <div className="order-price">
                      <span>{order.total}kr</span>
                    </div>
                  </section>
                  <div
                    className={
                      index === userHistory.length - 1
                        ? 'line last-line'
                        : 'line'
                    }
                  ></div>
                </li>
              ))}
              <li className="total-spent-summary">
                <strong className="order-total">
                  <div>
                    <p>Totalt spenderat:</p>
                  </div>
                  <div>
                    <span>{totalSpent}kr</span>
                  </div>
                </strong>
              </li>
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
