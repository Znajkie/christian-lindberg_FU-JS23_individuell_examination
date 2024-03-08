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
        <h1>Din beställning</h1>
        <ul>
          {shoppingList.map((cartItem) => {
            const itemDetail = menuItems.find(
              (menuItem) => menuItem.id === cartItem.id
            );
            return (
              <li className="cart-item" key={cartItem.id}>
                <div className="item-title">{itemDetail?.title}</div>
                <div className="item-quantity-price">
                  <Dots />
                  <div className="quantity-controls">
                    <button onClick={() => incrementItemQuantity(cartItem.id)}>
                      &#129169;
                    </button>
                    <span className="quantity">{cartItem.quantity}</span>
                    <button onClick={() => decrementItemQuantity(cartItem.id)}>
                      &#129171;
                    </button>
                  </div>

                  <span className="item-price">
                    {cartItem.quantity * (itemDetail?.price || 0)} kr
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="total-price">
          Total:
          <Dots /> {getTotalPrice()} kr
        </div>
        <button className="checkout-button" onClick={handleCheckout}>
          Take my money!
        </button>
      </div>
    </>
  );
};

export default Cart;
