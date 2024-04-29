
import '../Styles.css'
import React from "react";
import { useNavigate } from 'react-router-dom';



export const LowerButtons = () => {
  const navigate = useNavigate();
  const handle_home_Click = () => navigate('/');
  const handle_product_Click = () => navigate('/products');
  const handle_abt_Click = () => navigate('/about');
  const handle_contact_Click = () => navigate('/contactus');
  return (
    <>
      <div className="Lowerbtns">
        <div>
          <h1 className='home-label' onClick={handle_home_Click}>Home</h1>
        </div>
        <div>
          <h1 className='products-label' onClick={handle_product_Click}>Products</h1>
        </div>
        <div>
          <h1 className='about-label' onClick={handle_abt_Click}>About</h1>
        </div>
        <div>
          <h1 className='contact-us-label' onClick={handle_contact_Click}>Contact Us</h1>
        </div>

      </div>
      <div className='under-header-buttons'>
      </div>
    </>
  );
};

export default LowerButtons;