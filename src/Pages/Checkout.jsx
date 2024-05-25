import '../Styles.css'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { useCart, useUser } from '../main';

import React from "react";



export const Checkout = () => {

    const [items, setItems] = useState([]);
    const { cart, updateCart } = useCart();
    const [subtotal, setSubtotal] = useState(0);
    const { user } = useUser();
    const navigate = useNavigate();

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

    const handlePayOnClick = async () => {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        updateCart(0)
        localStorage.setItem("cart", [])
        setTimeout(() => {
            navigate('/');
        }, 3000)
        
        let data
        if (localStorage.getItem("user")) {
            let response = await fetch(`https://cube-world-api-3a55a0cf69a0.herokuapp.com/getUser/${user}`)
            data = await response.json();
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    FirstName: data.FirstName,
                    LastName: data.LastName,
                    Email: data.Email,
                    Password: data.Password,
                    CartList: JSON.parse("[]")

                })
            };
            const response2 = await fetch(`https://cube-world-api-3a55a0cf69a0.herokuapp.com/updateUser/${user}`, requestOptions);
            const data2 = await response2.json();
        }



    }

    const addToTotal = () => {
        let total = 0
        items.map((item, index) => (
            total = (items[index]).price + total
        ))
        setSubtotal(total)

    }

    useEffect(() => {
        addToTotal();
    }, [items])

    useEffect(() => {
        fetchItemsFromIds();
    }, [])

    return (
        <>
            <div style={{ fontSize: "30px", justifyContent: "center", display: "Flex", marginTop: "30px" }}>This checkout page is only a shell do not enter actual sensitive information!</div>
            <div className='Checkout-page'>
                <div className='Checkout'>
                    <div className='Checkout-header'>Payment information</div>
                    <div>Name: </div>
                    <input className='Checkout-input'></input>
                    <div>Credit Card #: </div>
                    <input className='Checkout-input'></input>
                    <div>Expiration Date: </div>
                    <input className='Checkout-input'></input>
                    <div>CVC: </div>
                    <input className='Checkout-input'></input>
                    <div >Billing Address: </div>
                    <input className='Checkout-input'></input>
                </div>

                <div className='Checkout'>
                    <div className='Checkout-header'>Shipping information</div>
                    <div>Address: </div>
                    <input className='Checkout-input'></input>
                    <div>City: </div>
                    <input className='Checkout-input'></input>
                    <div>Zip Code: </div>
                    <input className='Checkout-input'></input>
                    <div>State: </div>
                    <input className='Checkout-input'></input>
                </div>

                <div className='Checkout'>
                    <div style={{ fontWeight: "bold", marginBottom: "25px" }}>Total ${subtotal}</div>
                    <button className='pay-btn' onClick={handlePayOnClick}>Confirm and Pay</button>
                </div>
            </div>
            <div style={{ fontSize: "30px", marginTop: "50px", paddingLeft: "50px" }}>Summary:</div>
            <div className='Checkout-item-list' >
                <div className='Checkout-items'>
                    {items.map((item, index) => (
                        <div key={item} className='cart-item'>
                            <img className='cart-item-picture' src={(items[index]).Images[0]} />
                            <div className='inner-cart-div'>{(items[index]).productName}</div>
                            <div className='inner-cart-div'>${(items[index]).price}</div>
                        </div>
                    ))
                    }
                </div>
            </div>
            <div id="snackbar">Ordered successfully!</div>





        </>
    )
}
export default Checkout;