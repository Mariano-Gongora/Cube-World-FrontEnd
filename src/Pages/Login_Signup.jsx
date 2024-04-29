import '../Styles.css'

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { useCart, useUser } from '../main';

export const Login_SignUp = () => {

    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [toggleSignUp, setToggleSignUp] = useState(true);
    const { search } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const { initializeCart } = useCart();
    const { cart } = useCart();
    const { LogInState, loggedIn , setUserID, user} = useUser();

    async function signUp() {
        if ((FirstName === "") || (LastName === "") || (Email === "") || (Password === "")) {
            const alert = document.getElementById('alert');
            if (alert.style.visibility === 'visible') {
                alert.style.visibility = 'hidden';
            }
            { showAlert(true) }
        }
        else {
            { showAlert(false) }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    FirstName: FirstName.toString(),
                    LastName: LastName.toString(),
                    Email: Email.toString(),
                    Password: Password.toString(),
                    CartList: []
                })
            };
            const response = await fetch('http://localhost:8080/setProfile', requestOptions);
            const data = await response;
            console.log(data);

        }
    }

    async function logIn() {
        if ((Email === "") || (Password === "")) {
            const alert = document.getElementById('alert');
            if (alert.style.visibility === 'visible') {
                alert.style.visibility = 'hidden';
            }
            { showAlert(true) }
        }
        else {
            { showAlert(false) }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: Email.toString(),
                    password: Password.toString(),
                })
            };
            const response = await fetch('http://localhost:8080/login', requestOptions);
            const data = await response.json();
            initializeCart(data.cartList);
            console.log(data);
            LogInState(true);
            setUserID(data.id)
            localStorage.setItem("user",data.email)
            localStorage.setItem("cart",data.cartList)
            
            
        }
    }

    const showAlert = (boolean) => {
        const alert = document.getElementById('alert');
        if (boolean) {
            alert.style.visibility = 'visible';
        }
        else {
            alert.style.visibility = 'hidden';
        }
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignUpClick = () => {
        setToggleSignUp((toggleSignUp) => !toggleSignUp);
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
    }

    const navigate = useNavigate();
    const handle_login_signup_click = () => navigate('/login_signup');
    const handle_logo_click = () => navigate('/');

    useEffect(() => {
        if (search) {
            fetch(`http://localhost:8080/Products/${search}`)
                .then(response => response.json())
                .then(data => setProducts(data));
        } else {
            fetch(`http://localhost:8080/Products`)
                .then(response => response.json())
                .then(data => setProducts(data));
        }
    }, [search]);

    const handleViewClick = (product) => {
        if (product) {
            setSelectedProduct(null);
        }
        setSelectedProduct(product);
    };

    const onEnterPress = () => {
        navigate(`/products/${searchTerm}`);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <div className="header">
                <div className='search-bar-pair'>
                    <input type="text" onKeyDown={(event) => { if (event.key === "Enter") { onEnterPress() } }} value={searchTerm} onChange={handleInputChange} placeholder="Search" className='search-input' />
                </div>
                <div>
                    <label className='Cube-World-Logo' onClick={handle_logo_click}>Cube World</label>
                </div>
                <div>
                    <label className='login-signup-label' onClick={handle_login_signup_click}>Login/Sign Up</label>
                </div>
            </div>
            {localStorage.getItem("user")?
            <div className='sign-up-log-in-page'>
                <div  className='log-in'>Logged in as: {localStorage.getItem("user")}</div>
            </div>
                :
                <div className='sign-up-log-in-page'>
                {toggleSignUp && <div className='log-in'>
                    <div>Log In</div>

                    <input placeholder="email" type="text" value={Email} onChange={handleEmailChange} />

                    <input placeholder="password" type="text" value={Password} onChange={handlePasswordChange} />

                    <label id='alert'>one or more fields is empty</label>

                    <button onClick={logIn}>login</button>
                    <label onClick={handleSignUpClick}>Dont have an account? Sign-Up</label>
                </div>
                }

                {!toggleSignUp && <div className='sign-up'>
                    <div>Sign Up</div>

                    <input placeholder="firstname" type="text" value={FirstName} onChange={handleFirstNameChange} />

                    <input placeholder="lastname" type="text" value={LastName} onChange={handleLastNameChange} />

                    <input placeholder="email" type="text" value={Email} onChange={handleEmailChange} />

                    <input placeholder="password" type="text" value={Password} onChange={handlePasswordChange} />

                    <label id='alert'>One or more fields is empty</label>

                    <button onClick={signUp}>Sign Up</button>
                    <label onClick={handleSignUpClick}>Already have an account? Log-In</label>
                </div>
                }
            </div>
            }
            
        </>
    );
};

export default Login_SignUp;