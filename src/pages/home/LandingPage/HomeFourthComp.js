
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './index.css';
import ContactUs from 'pages/contactUs/contactUs';

const HomeFourthComp = () => {
  return (
    <div className="home-fourth-comp mt-4 pt-4 bg-white col-12 col-md-6 mx-auto">
      <Container>
        <Row className="text-center justify-content-center">
          <Col lg={10} md={10} xs={12}>
            <h3 className="mb-2" style={{ fontSize: 'calc(1.1rem + 1vw)',  lineHeight: '1.1' }}>
              Sign up to receive news and offers from us!
            </h3>
            <Col style={{background: 'rgb(249, 233, 233)'}} lg={12} xs={12} sm={12}>
         <div className=" bg-white mx-auto">
            <ContactUs />
           </div>
         </Col>
            <p className="mt-2 ">
              * We promise not to spam your inbox in any way
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeFourthComp;
