
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image } from 'react-bootstrap';
import './index.css';

const HomeThirdComponent = () => {
  return (
    <div>
      <Container
        className="col-lg-10 col-xxl-9 col-11 mx-auto "
        style={{ paddingTop: '10px', paddingBottom: '10px' }}
        fluid
      >
        <Row className="my-2 col-12 d-flex justify-content-center mx-auto">
          <Col
            className="col-lg-6 col-xxl-6 float-end d-flex align-items-center col-12"
            id="HomeSecRightMain"
          >
            <Col>
              <h3
                style={{ color: 'black', fontWeight: '500' }}
                className="HomeSecH1 text-center"
              >
                WHY CHOOSE US
              </h3>
              <hr className="text-black " />
              <br />
              <h2 className="HomeSecH2 text-center mt-2 text-black">
                WE ALWAYS WANT OUR CUSTOMERS TO BE SATISFIED
              </h2>
              <p style={{ color: 'black', fontSize: '16px' }}>
                The restaurant has a luxurious and elegant space, ensuring that
                utensils, tables and chairs and other items are always clean.
                Customers will feel secure and comfortable at home when dining
                at our restaurant. Donec ullamcorper justo ac dolor sagittis
                mattis.
              </p>
              <br />
              <p style={{ color: 'black', fontSize: '16px' }}>
                {/* <Row className="mt-5">
              <Col lg={{ span: 7, offset: 0 }} sm={12} md={6} xs={10}>
                <ul>
                  <li>MUSIC AND SPACE</li>
                  <br />
                  <li>ATMOSPHERE OF FUN</li>
                </ul>
              </Col>
              <Col lg={{ span: 5, offset: 0 }} sm={12} md={6} xs={10}>
                <ul>
                  <li>EXPERIENCE THE COZY SPACE</li>
                  <br />
                  <li>EVERYTHING IS ALWAYS CLEAN AND TIDY</li>
                </ul>
              </Col>
            </Row> */}
              </p>
            </Col>
            <br />
            {/* <Button style={{ backgroundColor: '#EB003D', padding: '15px 35px', borderRadius: "30px" }}>Know More</Button> */}
          </Col>

          <Col className="col-12 col-lg-5 col-xxl-6">
            <Image
              style={{
                height: '35rem',
                width: 'auto',
                borderRadius: '30px'
              }}
              src={require('../../../assets/img/IndB7.jpeg')}
              className="HomeSecondImg mx-auto d-block col-lg-12 col-12 "
              fluid
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeThirdComponent;
