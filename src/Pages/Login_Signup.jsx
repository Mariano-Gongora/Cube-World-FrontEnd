import '../Styles.css'

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCart, useUser } from '../main';
import Homebar from '../Components/Homebar.jsx';

export const Login_SignUp = () => {

    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [toggleSignUp, setToggleSignUp] = useState(true);
    const { search } = useParams();
    const { updateCart } = useCart();
    const { LogInState, setUserID } = useUser();
    const navigate = useNavigate();


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
                    admin: false,
                    CartList: []
                })
            };
            const res = await fetch('https://cube-world-api-3a55a0cf69a0.herokuapp.com/setProfile', requestOptions);
            if (res.status == 200) {
                const loginOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: Email.toString(),
                        password: Password.toString()
                    })
                };
                const response = await fetch('https://cube-world-api-3a55a0cf69a0.herokuapp.com/login', loginOptions);
                const data = await response.json();
                updateCart(data.cartList);
                LogInState(true);
                setUserID(data.id)
                localStorage.setItem("user", data.email)
                localStorage.setItem("cart", data.cartList)
                navigate('/')
            }
            else {
                alert("There is already a user with that email address")
            }
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
            const response = await fetch('https://cube-world-api-3a55a0cf69a0.herokuapp.com/login', requestOptions);
            if (response.status === 401) {
                alert("Non-matched Email and Password")
            }
            const data = await response.json();
            updateCart(data.cartList);
            LogInState(true);
            setUserID(data.id)
            localStorage.setItem("user", data.email)
            localStorage.setItem("cart", data.cartList)
            if (data.admin === true) {
                navigate('/Admin')
            }
            else
                navigate('/')


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



    useEffect(() => {
        if (search) {
            fetch(`https://cube-world-api-3a55a0cf69a0.herokuapp.com/Products/${search}`)
                .then(response => response.json())
                .then(data => setProducts(data));
        } else {
            fetch(`https://cube-world-api-3a55a0cf69a0.herokuapp.com/Products`)
                .then(response => response.json())
                .then(data => setProducts(data));
        }
    }, [search]);

    const Log_out_click = () => {
        localStorage.removeItem("user")
        setUserID("")
        navigate('/')
    }

    return (
        <>
            <Homebar />
            {localStorage.getItem("user") ?
                <div className='sign-up-log-in-page'>
                    <div className='log-in'>Logged in as: {localStorage.getItem("user")}<button onClick={Log_out_click}>Log Out</button></div>

                </div>
                :
                <div className='sign-up-log-in-page'>
                    {toggleSignUp && <div className='log-in'>
                        <div>Log In</div>

                        <input placeholder="Email" type="text" value={Email} onChange={handleEmailChange} />

                        <input placeholder="Password" type="password" value={Password} onChange={handlePasswordChange} />

                        <label id='alert'>one or more fields is empty</label>

                        <button onClick={logIn}>Login</button>
                        <label onClick={handleSignUpClick} style={{ cursor: "pointer" }}>Dont have an account? Sign-Up</label>
                    </div>
                    }

                    {!toggleSignUp && <div className='sign-up'>
                        <div>Sign Up</div>

                        <input placeholder="First Name" type="text" value={FirstName} onChange={handleFirstNameChange} />

                        <input placeholder="Last Name" type="text" value={LastName} onChange={handleLastNameChange} />

                        <input placeholder="Email" type="text" value={Email} onChange={handleEmailChange} />

                        <input placeholder="Password" type="password" value={Password} onChange={handlePasswordChange} />

                        <label id='alert'>One or more fields is empty</label>

                        <button onClick={signUp}>Sign Up</button>
                        <label onClick={handleSignUpClick} style={{ cursor: "pointer" }}>Already have an account? Log-In</label>
                    </div>
                    }
                </div>
            }

        </>
    );
};

export default Login_SignUp;