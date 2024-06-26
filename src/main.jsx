import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const setUserID = (ID) => {
    setUser(ID);
  };

  const LogInState = (bool) => {
    setLoggedIn(bool);
  };

  return (
    <UserContext.Provider value={{ user, loggedIn, setUserID, LogInState }}>
      {children}
    </UserContext.Provider>
  );
};

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [addTrigger, setaddTrigger] = useState(false); //checks if the user exists
  const [removeTrigger, setremoveTrigger] = useState(false);

  const updateCart = (list) => {
    setCart(list);
    setaddTrigger(!addTrigger);
  };

  const removeFromCart = (key) => {
    setCart((prevCart) => prevCart.filter((item, index) => index !== key));
    setremoveTrigger(!removeTrigger);//calls useEffect #2, the purpose is to save the changes made to "cart" to the localstorage
  };

  useEffect(() => {//useEffect #1
    if (cart.length > 1) {
      localStorage.setItem("cart", cart)
    }
  }, [addTrigger])

  useEffect(() => {//useEffect #2
    localStorage.setItem("cart", cart)
  }, [removeTrigger])

  return (
    <CartContext.Provider value={{ cart, removeFromCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};



ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <CartProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </CartProvider>
  </UserProvider>
)
