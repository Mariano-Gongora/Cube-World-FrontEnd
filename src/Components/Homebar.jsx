import '../Styles.css'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

import React from "react";

export const Homebar = () => {

    const navigate = useNavigate();
    const handle_login_signup_click = () => navigate('/login_signup');
    const handle_logo_click = () => navigate('/');
    const [searchTerm, setSearchTerm] = useState('');
    


    const onEnterPress = () => {
        navigate(`/products/${searchTerm}`);
      };
    
      const onSearchPress= () =>{
        navigate(`/products/${searchTerm}`);
      }

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
      };

    return (
        <div className="header">
        <div className='search-bar-pair'>
          <input type="text" value={searchTerm} onKeyDown={(event) => { if (event.key === "Enter") { onEnterPress() } }} onChange={handleInputChange} placeholder="Search" className='search-input' />
          <button className='search-btn' onClick={onSearchPress} ><FaSearch size={25}/></button>
        </div>
        
        <div>
          <label className='Cube-World-Logo' onClick={handle_logo_click}>Cube World</label>
        </div>
        <div>
          {localStorage.getItem("user") ? <label className='login-signup-label' onClick={handle_login_signup_click}>View Profile</label> : <label className='login-signup-label' onClick={handle_login_signup_click}>Login/Sign Up</label> }
        </div>

      </div>
    );
};

export default Homebar;