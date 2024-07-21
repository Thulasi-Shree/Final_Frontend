/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './OrderSuccess.css';

const OrderSuccess = () => {
  useEffect(() => {
    const keysToKeep = ['user', 'isloggedIn'];
    for (const key in localStorage) {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    }
  }, []);

  return (
    <div id="OrderSuccessMainImg bg-white" style={{height: '70vh'}}>
      <div className="row justify-content-center mx-auto">
        <div className="col-12 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src={require('../../assets/img/OrderSuccessImg.png')}
            alt="Order Success"
            width="300"
            height="300"
          />

          <h1 className="mb-3" id="CardText">
            Your Order has been placed successfully.
          </h1>
          <div>
            <Link to="/">
              <Button className="my-global-button  mb-5 mt-3">
                Go to home
              </Button>{' '}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
