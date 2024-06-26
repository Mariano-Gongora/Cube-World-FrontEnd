import React, { useState, useEffect, useCallback } from 'react';
import '../Styles.css';
import { useCart } from '../main';
import { useUser } from '../main';
import { TbTrashX } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const { cart, updateCart } = useCart();
    const { user } = useUser();
    const [items, setItems] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const { removeFromCart } = useCart();
    const [subtotal, setSubtotal] = useState(0);
    const [showDelayedText, setShowDelayedText] = useState(true);
    const navigate = useNavigate();

    const onTrashClick = async (key) => {
        let data
        removeFromCart(key);
        setTrigger(!trigger);
        let response1 = await fetch(`https://cube-world-api-3a55a0cf69a0.herokuapp.com/getUser/${user}`)
        data = await response1.json();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                FirstName: data.FirstName,
                LastName: data.LastName,
                Email: data.Email,
                Password: data.Password,
                CartList: JSON.parse("[" + localStorage.getItem("cart") + "]")

            })
        };
        const response2 = await fetch(`https://cube-world-api-3a55a0cf69a0.herokuapp.com/updateUser/${user}`, requestOptions);
    };

    const fetchItemsFromIds = (async () => {
        try {
            const itemPromises = cart.map(async (itemId) => {
                if (itemId == "null") { }
                else {
                    const response = await fetch(`https://cube-world-api-3a55a0cf69a0.herokuapp.com/getProductFromId/${itemId}`);
                    return await response.json();
                }
            });

            const itemsData = await Promise.all(itemPromises);
            setItems(itemsData);

        }
        catch (err) { }
    });

    useEffect(() => {
        fetchItemsFromIds();
        addToTotal();

    }, [localStorage.getItem("cart"), trigger]);

    useEffect(() => {
        setTimeout(() => {
            setShowDelayedText(false);
        }, 1000)
        if (localStorage.getItem("cart")) {
            updateCart(localStorage.getItem("cart").split(','))
        }

    }, []);

    useEffect(() => {
        addToTotal();

    }, [items]);

    const addToTotal = () => {
        let total = 0
        items.map((item, index) => (
            total = (items[index]).price + total
        ))
        setSubtotal(total)
    }

    const handleCheckoutClick = () => {
        navigate('/checkout')
    }


    // Render cart items after items are fetched and loading is complete
    return (
        <>
            <div className='cart'>Cart
                {showDelayedText ? (
                    <div>Loading...</div>

                ) :
                    (items.map((item, index) => (
                        <div key={item} className='cart-item'>
                            <img className='cart-item-picture' src={(items[index]).Images[0]} />
                            <div className='inner-cart-div'>{(items[index]).productName}</div>
                            <div className='inner-cart-div'>${(items[index]).price}</div>
                            <div className='trash-btn' onClick={() => onTrashClick(index)} ><TbTrashX /></div>
                        </div>
                    ))
                    )
                }
                <div style={{ paddingTop: "10px" }}>Items: {items.length}</div>
                <div>Subtotal: ${subtotal}</div>
                {localStorage.getItem("cart").length > 0 && <button className='checkout-btn' onClick={handleCheckoutClick}>Checkout</button>}
            </div>

        </>
    );
};

export default Cart;
