import '../Styles.css'

import React from "react";
import Homebar from '../Components/Homebar.jsx';
import LinkedIn from "../img/174857.png";
import Github from "../img/25231.png";
import Person from "../img/person.png";

export const ContactUs = () => {
    return (
        <>
            <Homebar />
            <div>
                <div className='contact-img-div'>
                    <a href='https://www.linkedin.com/in/mariano-gongora/'><img className="contact-img" src={LinkedIn}></img></a>
                    <a href='https://github.com/Mariano-Gongora'><img className="contact-img" src={Github}></img></a>
                    <a href='https://mariano-gongora.github.io/Portfolio/'><img className="contact-img" src={Person}></img></a>
                </div>
            </div>
            <h1 className='Contact-email' ><a href='mailto:mariano.gongora55@gmail.com'>mariano.gongora55@gmail.com</a></h1>
        </>
    );
};

export default ContactUs;