import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShopStore } from '../../Store/counter';
import postOrder from '../API/PostReq';
import Dots from '../Dots/Dots';
import './cart.css';
import { OrderResponseData, ShopStore } from '../../interface/interface'

interface CartProps {
  toggleOverlay?: () => void;
}

const Cart: React.FC<CartProps> = ({ toggleOverlay }) => {
  const navigate = useNavigate();
  const {
    shoppingList,
    menuItems,
    getTotalPrice,
    incrementItemQuantity,
    decrementItemQuantity,
  } = useShopStore() as ShopStore; // Antag att `useShopStore` returnerar `ShopStore`

  const handleCheckout = () => {
    postOrder(
      shoppingList,
      menuItems,
      (data: OrderResponseData) => {
        console.log('Checkout successful:', data);
        navigate('/checkout', {
          state: { eta: data.eta, orderNr: data.orderNr },
        });
      },
      (error: Error) => {
        console.error('Checkout failed:', error);
      }
    );
  };

  return (
    <>
      {toggleOverlay && <div className="overlay"></div>}
      <div className="cart-container">
        <h1 className="cart__title">Din beställning</h1>
        <ul className="cart__ul">
          {shoppingList.map((cartItem) => {
            const itemDetail = menuItems.find(
              (menuItem) => menuItem.id === cartItem.id
            );
            return (
              <React.Fragment key={cartItem.id}>
                <li className="cart-item">
                  <div className="item-title">{itemDetail?.title}</div>
                  <div className="item-quantity-sum">
                    <Dots />
                    <div className="quantity-controls">
                      <button
                        onClick={() => incrementItemQuantity(cartItem.id)}
                      >
                        <span className="arrow-up">^</span>
                      </button>
                      <span className="quantity">{cartItem.quantity}</span>
                      <button
                        onClick={() => decrementItemQuantity(cartItem.id)}
                      >
                        <span className="arrow-down">^</span>
                      </button>
                    </div>
                  </div>
                </li>
                <span className="item-price">
                  {cartItem.quantity * (itemDetail?.price || 0)} kr
                </span>
              </React.Fragment>
            );
          })}
        </ul>
        <div className="total-price">
          <span className="total-price__title">Total:</span>
          <span>
            <Dots /> {getTotalPrice()} kr
          </span>
        </div>
        <p className="total-price__p">inkl moms + drönarleverans</p>
        <button className="checkout-button" onClick={handleCheckout}>
          Take my money!
        </button>
      </div>
    </>
  );
};

export default Cart;
