import React, { useEffect, useRef } from 'react';
import './WhatWeOffer.css';
import { Card } from 'react-bootstrap';

const WhatWeOffer = () => {
    const offerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fadeIn');
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.2
        });

        if (offerRef.current) {
            observer.observe(offerRef.current);
        }

        return () => {
            if (offerRef.current) {
                observer.unobserve(offerRef.current);
            }
        };
    }, []);

    return (
        <section id="offer" className="offer py-4" ref={offerRef}>
            <div className="offerContent">
                <h2 className="pt-4 ">What We Offer?</h2>
                <div className="row p-4 justify-content-center align-items-center">
                    <div className='p-3 col-12 col-sm-6 col-xl-3 align-items-center' style={{font: '16px'}}>
                        <Card className="p-4 offerItem" style={{ height: '250px',
                width: 'auto',}}>
                            <Card.Title>Fresh Ingredients</Card.Title>
                            <p>We use only the freshest ingredients to ensure the highest quality in every dish.</p>
                        </Card>
                    </div>
                    <div className='p-3 col-12 col-sm-6 col-xl-3 align-items-center' >
                        <Card className="p-4 offerItem" style={{height: '250px',
                width: 'auto',}}>
                            <Card.Title>Authentic Recipes</Card.Title>
                            <p>Our recipes are passed down through generations, bringing authentic flavors to your table..</p>
                        </Card>
                    </div>

                    <div className='p-3 col-12 col-sm-6 col-xl-3 align-items-center'>
                        <Card className="p-4 offerItem" style={{height: '250px',
                width: 'auto',}}>
                            <Card.Title>Excellent Service</Card.Title>
                            <p>We use only the freshest ingredients to ensure the highest quality in every dish.</p>
                        </Card>
                    </div>
                    <div className='p-3 col-12 col-sm-6 col-xl-3 align-items-center'>
                        <Card className="p-4 offerItem" style={{height: '250px',
                width: 'auto',}}>
                            <Card.Title>Quality</Card.Title>
                            <p>We use only the freshest ingredients to ensure the highest quality in every dish.</p>
                        </Card>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default WhatWeOffer;
