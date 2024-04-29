import React, { useState, useEffect, useCallback } from 'react';
import '../Styles.css';
import { useCart } from '../main';
import { useUser } from '../main';
import { TbTrashX } from "react-icons/tb";
import ProductView from "../Components/ProductView.jsx";

export const Cart = () => {
    const { cart, initializeCart } = useCart();
    const { user, loggedIn } = useUser();
    const [items, setItems] = useState([]);
    const [trigger,setTrigger]= useState(false);

    const { removeFromCart } = useCart();

    const onTrashClick = (key) => {
        console.log("this is key: "+ key)
        removeFromCart(key);
        setTrigger(!trigger);
    };

    const fetchItemsFromIds = (async () => {
        const itemPromises = cart.map(async (itemId) => {
            const response = await fetch(`http://localhost:8080/getProductFromId/${itemId}`);
            return await response.json();
        });

        const itemsData = await Promise.all(itemPromises);
        setItems(itemsData);

    });

    useEffect(() => {
        fetchItemsFromIds();
    }, [localStorage.getItem("cart"),trigger]);

    useEffect(() => {
        if (localStorage.getItem("cart")) {
            initializeCart(localStorage.getItem("cart").split(','))
        }
    }, []);

    // Render cart items after items are fetched and loading is complete
    return (
        <>
            <div className='cart'>Cart
                {items.map((item, index) => (
                    <div key={item} className='cart-item'>
                        <img className='cart-item-picture' src={(items[index]).Images[0]} />
                        <div className='inner-cart-div'>{(items[index]).productName}</div>
                        <div className='inner-cart-div'>${(items[index]).price}</div>
                        <div className='trash-btn' onClick={() => onTrashClick(index)} ><TbTrashX /></div>
                    </div>
                ))
                }
            </div>
        </>
    );
};

export default Cart;
