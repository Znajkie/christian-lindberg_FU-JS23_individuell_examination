import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShopStore } from '../../store/store';
import useTokenStore from '../../store/token';
import postOrder from '../API/PostReq';
import './cart.scss';
import { OrderResponseData, ShopStore } from '../../interface/interface';

interface CartProps {
  toggleOverlay?: () => void;
}

const Cart: React.FC<CartProps> = ({ toggleOverlay }) => {
  const navigate = useNavigate();
  // interface ShopState {
  //   shoppingList: ShoppingListItem[];
  //   menuItems: MenuItem[];
  //   addToShoppingList: (id: string) => void;
  //   getTotalItemCount: () => number;
  //   getTotalPrice: () => number;
  //   incrementItemQuantity: (id: string) => void;
  //   decrementItemQuantity: (id: string) => void;
  //   setMenuItems: (menuItems: MenuItem[]) => void;
  // }
  const {
    shoppingList,
    menuItems,
    getTotalPrice,
    incrementItemQuantity,
    decrementItemQuantity,
  } = useShopStore() as ShopStore;
  const { token } = useTokenStore();

  const handleCheckout = () => {
    console.log('SHOPPING LIST', shoppingList)
    console.log('MENU ITEMS', menuItems)
    postOrder(
      token,
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
                  <div className="dotted-line"></div>
                  <div className="item-quantity-sum">
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
          <span>{getTotalPrice()} kr</span>
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
