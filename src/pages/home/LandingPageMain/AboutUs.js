// // WelcomeSection.js
// import React, { useEffect, useRef } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import backgroundImage from '../../../assets/img/bg23.png';
// import './AboutUs.css';

// const AboutUs = () => {
//     const welcomeRef = useRef(null);

//     useEffect(() => {
//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     entry.target.classList.add('fadeIn');
//                 }
//             });
//         }, {
//             rootMargin: '0px',
//             threshold: 0.2
//         });

//         if (welcomeRef.current) {
//             observer.observe(welcomeRef.current);
//         }

//         return () => {
//             if (welcomeRef.current) {
//                 observer.unobserve(welcomeRef.current);
//             }
//         };
//     }, []);

//     return (
//         <div ref={welcomeRef} className="welcome-section container-fluid mx-auto " style={{
//             backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundBlendMode: 'overlay',
//         }}>
//             <Container className="mx-auto text-center ">
//                 <Row className='mx-auto' style={{ height: 'auto', width: '100%' }}>
//                     <Col
//                         xs={12}
//                         sm={12}
//                         lg={{ span: 9, offset: 2 }}
//                         md={{ span: 9, offset: 2 }}
//                         className="mb-3 col-10 col-md-8 col-lg-5 mx-auto text-center text-dark"
//                     >
//                         <h1
//                             style={{
//                                 fontSize: 'calc(1.8rem + 1vw)',
//                                 backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent white background
//                                 color: 'white', // Text color
//                                 padding: '10px', // Optional padding for better appearance
//                                 // borderRadius: '30px', // Optional rounded corners
//                             }}
//                             className="HomeH1Tag mb-3"
//                         >
//                             WELCOME TO GRAND INDIA RESTAURANTS
//                         </h1>
//                         <p
//                             style={{
//                                 fontSize: 'calc(1.5rem + 1vw)',
//                                 color: 'white',
//                                 backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
//                                 padding: '10px', // Optional padding for better appearance
//                                 // borderRadius: '30px', // Optional rounded corners
//                             }}
//                             className="py-2 fs-4"
//                         >
//                             THE PERFECT CHOICE FOR YOUR RESTAURANT
//                         </p>
//                         <h3
//                             style={{
//                                 fontSize: 'calc(1.8rem + 1vw)',
//                                 color: 'white',
//                                 backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
//                                 padding: '10px', // Optional padding for better appearance
//                                 // borderRadius: '30px', // Optional rounded corners
//                             }}
//                         >
//                             IT'S TIME TO ENJOY THE{' '}
//                             <span style={{ color: 'orange' }}>FINER THINGS </span> IN LIFE.{' '}
//                         </h3>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default AboutUs;
import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import backgroundImage from '../../../assets/img/bg23.png';
import './AboutUs.css';

const AboutUs = () => {
    const welcomeRef = useRef(null);
    const headingRef = useRef(null);
    const subHeadingRef = useRef(null);
    const textRef = useRef(null);

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

        if (headingRef.current) observer.observe(headingRef.current);
        if (subHeadingRef.current) observer.observe(subHeadingRef.current);
        if (textRef.current) observer.observe(textRef.current);

        return () => {
            if (headingRef.current) observer.unobserve(headingRef.current);
            if (subHeadingRef.current) observer.unobserve(subHeadingRef.current);
            if (textRef.current) observer.unobserve(textRef.current);
        };
    }, []);

    return (
        <div ref={welcomeRef} className="welcome-section container-fluid mx-auto" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
        }}>
            <Container className="mx-auto py-5 text-center">
                <Row className='mx-auto py-5' style={{ height: 'auto', width: '100%' }}>
                    <Col
                        xs={12}
                        sm={12}
                        lg={{ span: 9, offset: 2 }}
                        md={{ span: 9, offset: 2 }}
                        className="mb-3 col-10 col-md-8 col-lg-5 mx-auto text-center text-dark"
                    >
                        <h1
                            ref={headingRef}
                            style={{
                                fontSize: 'calc(1.2rem + 1vw)',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                display: 'inline-block',
                                color: 'white',
                                padding: '10px',
                            }}
                            className="HomeH1Tag mb-3"
                        >
                            WELCOME TO GRAND INDIA RESTAURANTS
                        </h1>
                        <p
                            ref={subHeadingRef}
                            style={{
                                fontSize: 'calc(0.8rem + 1vw)',
                                color: 'white',
                                display: 'inline-block',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                padding: '10px',
                            }}
                            className="py-2 fs-4"
                        >
                            THE PERFECT CHOICE FOR YOUR RESTAURANT
                        </p>
                        <h3
                            ref={textRef}
                            style={{
                                fontSize: 'calc(0.9rem + 1vw)',
                                color: 'white',
                                display: 'inline-block',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                padding: '10px',
                            }}
                        >
                            IT'S TIME TO ENJOY THE{' '}
                            <span style={{ color: 'orange' }}>FINER THINGS </span> IN LIFE.{' '}
                        </h3>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AboutUs;
