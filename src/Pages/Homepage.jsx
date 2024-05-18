import { LowerButtons } from '../Components/LowerButtons.jsx'
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import '../Styles.css'
import { useCart } from '../main';
import React from "react";
import BestSellers from '../Components/BestSellers.jsx';
import Cart from '../Components/Cart.jsx';
import Homebar from '../Components/Homebar.jsx';


export const Home = () => {
  const { updateCart } = useCart();
  const [showingCart, setShowingCart] = useState(false);

  const clickCartButton = () => {
    setShowingCart((showingCart) => !showingCart);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");
  
    if (user) {
      // Check if cart is "null" or null, and initialize properly
      if (cart === null || cart === "null") {
        cart = "";
        localStorage.setItem("cart", cart);
      }
      updateCart(cart.split(','));
    } else {
      localStorage.setItem("cart", "");
    }
  }, []);
  

  return (
    <>
      <Homebar />
      <div className='under-header-buttons'>
      </div>
      <LowerButtons />
      <h1 className='best-seller-label'>BEST SELLERS: </h1>
      <BestSellers />
      {showingCart && <Cart />}
      <button className='cart-button' onClick={clickCartButton}><FaShoppingCart className="shopping-cart-icon" /></button>
    </>
  );
};

export default Home;