import React from 'react';
import cart from '../../assets/bag.svg';
import cartbg from '../../assets/cartbg.png';
import { useShopStore } from '../../Store/Store';
import { useState } from 'react';
import Cart from '../cart/Cart';
import './ShoppingCart.scss';

const ShoppingCart = () => {
  const [showCart, setShowCart] = useState(false);
  const toggleCart = () => setShowCart(!showCart);

  const getTotalItemCount = useShopStore((state) => state.getTotalItemCount);

  return (
    <>
      <div className="cart-wrapper" onClick={toggleCart}>
        <img className="cart" src={cart} alt="cart" />
        <img src={cartbg} alt="cartbg" />
        <div className="cart-count">{getTotalItemCount()}</div>
      </div>
      {showCart && (
        <>
          <div className="overlay" onClick={toggleCart}></div>
          <Cart />
        </>
      )}
    </>
  );
};

export default ShoppingCart;
