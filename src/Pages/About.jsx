import '../Styles.css'

import React from "react";
import Homebar from '../Components/Homebar.jsx';
import Img from "../img/20240511_174036.jpg";


export const About = () => {
    return (
        <>
            <Homebar />
            <div>
                <h1 className='About'>When a friend asked me if I could make them a website where they could put their cosplay/video props for sale from their small business
                    I realized that I had no idea how despite my Bachelor's of Computer Science degree. That is when I decided to take the initiative and learn how to make one and decided to tie it to another one of my passions which is Rubik's Cubes.
                    Every item for "sale" is one of my own puzzles that I enjoy solving regularly!
                    For my frontend I learned React because it is the most widely used frontend framework, for my backend I used SpringBoot due to my previous experience with Java,
                    and for my database I used MySQL.
                </h1>
                <h1 className='About'>Disclamer: This is not a real ecommerce website, do not enter real emails or passwords please and thank you!</h1>
                <div className='img-div'><img className="img" src={Img}></img></div>

            </div>

        </>
    );
};

export default About;