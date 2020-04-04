import React from 'react';
import { Carousel } from 'react-responsive-carousel';


const practice = () => {
    return (
        <div className="carousel-wrapper">
            <Carousel infiniteLoop >
                <div>
                    <img src="http://placekitten.com/g/400/200"/>
                </div>
                <div>
                    <img src="http://placekitten.com/g/400/200"/>
                </div>
                <div>
                    <img src="http://placekitten.com/g/400/200"/>
                </div>
            </Carousel>
        </div>
    );
}

export default practice;