import { LowerButtons } from '../Components/LowerButtons.jsx'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import '../Styles.css'
import { useCart } from '../main';
import React from "react";
import BestSellers from '../Components/BestSellers.jsx';
import Cart from '../Components/Cart.jsx';

export const Home = () => {
  const { cart, initializeCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [showingCart, setShowingCart] = useState(false);
  const navigate = useNavigate();
  const handle_login_signup_click = () => navigate('/login_signup');
  const handle_logo_click = () => navigate('/');

  const onEnterPress = () => {
    navigate(`/products/${searchTerm}`);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clickCartButton = () => {
    setShowingCart((showingCart) => !showingCart);
    console.log(showingCart);
  };

  useEffect(()=>{
    if(localStorage.getItem("user")){

        initializeCart(localStorage.getItem("cart").split(','))
    }
    else{
      localStorage.setItem("cart",[])
    }
  }, []);


  return (
    <>
      <div className="header">
        <div className='search-bar-pair'>
          <input type="text" value={searchTerm} onKeyDown={(event) => { if (event.key === "Enter") { onEnterPress() } }} onChange={handleInputChange} placeholder="Search" className='search-input' />
        </div>
        <div>
          <label className='Cube-World-Logo' onClick={handle_logo_click}>Cube World</label>
        </div>
        <div>
          <label className='login-signup-label' onClick={handle_login_signup_click}>Login/Sign Up</label>
        </div>

      </div>
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