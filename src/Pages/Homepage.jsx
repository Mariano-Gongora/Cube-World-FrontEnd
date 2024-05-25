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
  const [numberOfItems, setnumberOfItems] = useState(0)

  const clickCartButton = () => {
    setShowingCart((showingCart) => !showingCart);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      updateCart(localStorage.getItem("cart").split(','))
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("cart").length > 0) {
        setnumberOfItems(localStorage.getItem("cart").split(',').length);
      }
      else if (localStorage.getItem("cart").length == 0)
        setnumberOfItems(0)
    }, 10)


  }, [updateCart], [localStorage.getItem("cart")]);





  return (
    <>
      <Homebar />
      <div className='under-header-buttons'>
      </div>
      <LowerButtons />
      <h1 className='best-seller-label'>BEST SELLERS: </h1>
      <BestSellers />
      {showingCart && <Cart />}
      <button className='cart-button' onClick={clickCartButton}><FaShoppingCart className="shopping-cart-icon" />{numberOfItems > 0 && <div className='Cart-Item-Counter'>{numberOfItems}</div>}</button>

    </>
  );
};

export default Home;
