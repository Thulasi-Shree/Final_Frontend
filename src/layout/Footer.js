
// // import React from 'react';
// // import Container from 'react-bootstrap/Container';
// // import Row from 'react-bootstrap/Row';
// // import Col from 'react-bootstrap/Col';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import {
// //   faFacebook,
// //   faInstagram,
// //   faTwitter,
// //   faPinterest
// // } from '@fortawesome/free-brands-svg-icons';
// // import { Image } from 'react-bootstrap';
// // import './footer.css';

// // const Footer = () => {
// //   return (
// //     <div
// //       style={{
// //         backgroundColor: '#e6c5c5',
// //         color: 'white',
// //         padding: '20px 0'
// //         // overflow: 'hidden'
// //       }}
// //     >
// //       <Container>
// //         <Row
// //           style={{
// //             display: 'flex',
// //             flexWrap: 'wrap',
// //             justifyContent: 'space-around'
// //           }}
// //           md={3}
// //         >
// //           <Col md={3} xs={9} className='text-center text-black'>
// //             <h3 style={{ color: '#c6ac83', marginTop: '20px' }} className='text-black'>WE ARE HERE</h3>
// //             <p className='text-black'>82 Place Charles de Gaulle, Paris</p>
// //             <p  className='text-black'>+91 801-555-99-43</p>
// //           </Col>
// //           <Col md={1} xs={12} className='text-black'>
// //             <hr
// //               style={{
// //                 border: '0',
// //                 borderTop: '1px solid black',
// //                 marginTop: '20px',
// //                 width: '100%'
// //               }}
// //             />
// //           </Col>
// //           <Col lg={3} xs={12} md={4} className='text-black' >
// //             <Image
// //               src={require('../assets/img/grandIndiaLogo1.png')}
// //               style={{ height: '70px', width: '190px', marginLeft: '60px' }}
// //               className=""
// //             />
// //             <p id="HomeSecRightMain2" className='text-black'>
// //               A distinctive, well-preserved and comfortable space, high-quality
// //               products, authentic cuisine, food and drinks are done flawlessly.
// //             </p>
// //             <FontAwesomeIcon icon={faFacebook} style={{ marginLeft: '80px' }} />
// //             <FontAwesomeIcon icon={faTwitter} style={{ marginLeft: '20px' }} />
// //             <FontAwesomeIcon
// //               icon={faPinterest}
// //               style={{ marginLeft: '20px' }}
// //             />
// //             <FontAwesomeIcon
// //               icon={faInstagram}
// //               style={{ marginLeft: '20px' }}
// //             />
// //           </Col>
// //           <Col md={1} xs={12}>
// //             <hr style={{ color: 'black' }} />
// //           </Col>
// //           <Col md={3} xs={12} className='text-center text-black'>
// //             <h3 style={{ color: '#c6ac83', marginTop: '20px' }} className='text-black'>
// //               OPENING TIME
// //             </h3>
// //             <p style={{ marginTop: '10px', color: '#c6ac83' }} className='text-black'>
// //               82 Place Charles de Gaulle, Paris1
// //             </p>
// //             <p style={{ color: '#c6ac83' }} className='text-black'>+91 801-555-99-433</p>
// //           </Col>
// //         </Row>
// //       </Container>
// //     </div>
// //   );
// // };

// // export default Footer;
// import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faFacebook,
//   faInstagram,
//   faTwitter,
//   faPinterest
// } from '@fortawesome/free-brands-svg-icons';
// import { Image } from 'react-bootstrap';
// import './footer.css'; // Ensure your custom CSS file is correctly linked

// const Footer = () => {
//   return (
//     <div className="footer-container">
//       <Container>
//         <Row className="footer-row">
//           <Col md={3} xs={12} className=" text-center">
//             <h4 className="footer-heading">WE ARE HERE</h4>
//             <p className="footer-description">82 Place Charles de Gaulle, Paris</p>
//             <p className="footer-description">+91 801-555-99-43</p>
//           </Col>
//           <Col md={1} xs={12} className="">
//             <hr className="footer-hr" />
//           </Col>
//           <Col lg={3} xs={12} md={4} className="footer-column mx-auto">
//             <Image
//               src={require('../assets/img/grandIndiaLogo1.png')}
//               alt="Grand India Logo"
//               className="footer-logo mx-auto"
//             />
//             <p className="footer-description">
//               A distinctive, well-preserved and comfortable space, high-quality
//               products, authentic cuisine, food and drinks are done flawlessly.
//             </p>
//             <div className="footer-icons">
//               <FontAwesomeIcon icon={faFacebook} className="icon" />
//               <FontAwesomeIcon icon={faTwitter} className="icon" />
//               <FontAwesomeIcon icon={faPinterest} className="icon" />
//               <FontAwesomeIcon icon={faInstagram} className="icon" />
//             </div>
//           </Col>
//           <Col md={1} xs={12} className="">
//             <hr className="footer-hr" />
//           </Col>
//           <Col md={3} xs={12} className=" text-center">
//             <h4 className="footer-heading">OPENING TIME</h4>
//             <p className="footer-descriptiont">82 Place Charles de Gaulle, Paris1</p>
//             <p className="footer-description">+91 801-555-99-433</p>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Footer;
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faPinterest
} from '@fortawesome/free-brands-svg-icons';
import { Image } from 'react-bootstrap';
import './footer.css'; // Ensure your custom CSS file is correctly linked

const Footer = () => {
  return (
    <footer className="footer-container mt-5" style={{ bottom: '0', width: '100%' }}>
      <Container >
        <Row className="footer-row ">
          <Col md={3} xs={12} className=" text-center">
            <h4 className="footer-heading">WE ARE HERE</h4>
            <p className="footer-description">82 Place Charles de Gaulle, Paris</p>
            <p className="footer-description">+91 801-555-99-43</p>
          </Col>
          <Col md={1} xs={12} className="">
            <hr className="footer-hr" />
          </Col>
          <Col lg={3} xs={12} md={4} className="footer-column mx-auto">
            <Image
              src={require('../assets/img/grandIndiaLogo1.png')}
              alt="Grand India Logo"
              className="footer-logo mx-auto"
            />
            <p className="footer-description">
              A distinctive, well-preserved and comfortable space, high-quality
              products, authentic cuisine, food and drinks are done flawlessly.
            </p>
            <div className="footer-icons">
              <FontAwesomeIcon icon={faFacebook} className="icon" />
              <FontAwesomeIcon icon={faTwitter} className="icon" />
              <FontAwesomeIcon icon={faPinterest} className="icon" />
              <FontAwesomeIcon icon={faInstagram} className="icon" />
            </div>
          </Col>
          <Col md={1} xs={12} className="">
            <hr className="footer-hr" />
          </Col>
          <Col md={3} xs={12} className=" text-center">
            <h4 className="footer-heading">OPENING TIME</h4>
            <p className="footer-description">82 Place Charles de Gaulle, Paris1</p>
            <p className="footer-description">+91 801-555-99-433</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
