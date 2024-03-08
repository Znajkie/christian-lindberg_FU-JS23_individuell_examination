import React from 'react';
import { useShopStore } from '../Store/counter';
import './cart.css';
import postOrder from '../modules/API/PostReq';
import Dots from '../modules/Dots/Dots';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC<{ toggleOverlay?: () => void }> = ({ toggleOverlay }) => {
  

  const {
    shoppingList,
    menuItems,
    getTotalPrice,
    incrementItemQuantity,
    decrementItemQuantity,
  } = useShopStore((state) => ({
    shoppingList: state.shoppingList,
    menuItems: state.menuItems,
    getTotalPrice: state.getTotalPrice,
    incrementItemQuantity: state.incrementItemQuantity,
    decrementItemQuantity: state.decrementItemQuantity,
  }));

const navigate = useNavigate();
   
  const handleCheckout = () => {
    postOrder(
      shoppingList, // The cart items
      menuItems, // Full menu items
      
      (data) => {console.log('Checkout successful:', data);
       navigate('/checkout', {
         state: { eta: data.eta, orderNr: data.orderNr },
       });
      },
      (error) => {console.error('Checkout failed:', error);
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
              <>
                <li className="cart-item" key={cartItem.id}>
                  <div className="item-title">{itemDetail?.title}</div>
                  <div className="item-quantity-sum">
                    <Dots />
                    <div className="quantity-controls">
                      <button
                        onClick={() => incrementItemQuantity(cartItem.id)}
                      >
                        <span className="arrow-up" key={'down-up'}>
                          ^
                        </span>
                      </button>
                      <span className="quantity">{cartItem.quantity}</span>
                      <button
                        onClick={() => decrementItemQuantity(cartItem.id)}
                      >
                        <span className="arrow-down" key={'down-arrow'}>
                          ^
                        </span>
                      </button>
                    </div>
                  </div>
                </li>
                <span className="item-price">
                  {cartItem.quantity * (itemDetail?.price || 0)} kr
                </span>
              </>
            );
          })}
        </ul>
        <div className="total-price">
          <span className="total-price__title">Total:</span>
          <span>
            <Dots /> {getTotalPrice()} kr
          </span>
        </div>
        <button className="checkout-button" onClick={handleCheckout}>
          Take my money!
        </button>
      </div>
    </>
  );
};

export default Cart;
