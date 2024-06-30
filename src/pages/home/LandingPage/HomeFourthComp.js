
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './index.css';
import ContactUs from 'pages/contactUs/contactUs';

const HomeFourthComp = () => {
  return (
    <div className="home-fourth-comp" style={{ backgroundColor: 'rgb(249, 233, 233)', paddingTop: '60px', paddingBottom: '60px' }}>
      <Container>
        <Row className="text-center justify-content-center">
          <Col lg={10} md={10} xs={12}>
            <h1 className="mb-4">
              Sign up to receive news and offers from us!
            </h1>
            <Col style={{background: 'rgb(249, 233, 233)'}} lg={12} xs={12} sm={12}>
         <div style={{background: 'rgb(249, 233, 233)'}} className="mt-4 mx-auto">
            <ContactUs />
           </div>
         </Col>
            <h5 className="mt-4 ">
              * We promise not to spam your inbox in any way
            </h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeFourthComp;
