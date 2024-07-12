/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// import SimpleReactValidator from 'simple-react-validator';
import './index.css';
import { Button, Card } from 'react-bootstrap';

const PersonalDetails = ({
  name,
  lastName,
  handleFirstNameChange,
  handleLastNameChange,
  handleGetOtp,
  handleOtpChange,
  emailOrMobile,
  handleEmailOrMobileChange,
  enteredOtp,
  otpVerified,
  isOtpSent,
  handleConfirmOtp
  // errors
}) => {
  const [errors, setErrors] = useState('');
  return (
    <div>
      <Card className="my-3 p-3" style={{ backgroundColor: 'transparent' }}>
        <h4 id="CardText">Personal Details</h4>
        <div className="mb-3 address-container ">
          <label htmlFor="userName" className="form-label" id="CardText">
            First Name{' '}
            <span className="text-danger">
              <b>*</b>
            </span>
          </label>
          <input
            type="text"
            style={{ backgroundColor: 'white', color: 'black' }}
            className={`form-control `}
            id="userName"
            value={name}
            onChange={handleFirstNameChange}
            placeholder="First Name is Required"
            required
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="mb-3 address-container">
          <label htmlFor="lastName" className="form-label" id="CardText">
            Last Name{' '}
            <span className="text-danger">
              {' '}
              <b>*</b>
            </span>
          </label>
          <input
            style={{ backgroundColor: 'white', color: 'black' }}
            type="text"
            className={`form-control `}
            id="lastName"
            value={lastName}
            placeholder="Last Name is Required"
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div
          className="mb-3 address-container"
          style={{ display: otpVerified ? 'none' : 'block' }}
        >
          <label htmlFor="emailOrMobile" className="form-label" id="CardText">
            Email / Mobile Number{' '}
            <span className="text-danger">
              {' '}
              <b>*</b>
            </span>
          </label>
          <input
            type="text"
            style={{ backgroundColor: 'white', color: 'black' }}
            className="form-control"
            id="emailOrMobile"
            value={emailOrMobile}
            onChange={handleEmailOrMobileChange}
            required
            placeholder="Email id / Mobile number is required"
          />
        </div>
        <Button
          type="button"
          className="my-global-button btn my-2"
          onClick={handleGetOtp}
          style={{ display: otpVerified ? 'none' : 'block' }}
        >
          Get OTP
        </Button>
        {isOtpSent && (
          <>
            <div style={{ display: otpVerified ? 'none' : 'block' }}>
              <label htmlFor="otp" className="form-label mt-4" id="CardText">
                Enter OTP{' '}
                <span className="text-danger">
                  {' '}
                  <b>*</b>
                </span>
              </label>
              <input
                style={{ backgroundColor: 'white', color: 'black' }}
                type="tel"
                className={`form-control `}
                id="otp"
                value={enteredOtp}
                onChange={handleOtpChange}
                required
                placeholder="Field is required"
              />
            </div>
            <Button
              type="button"
              className="my-3 my-global-button"
              required
              onClick={handleConfirmOtp}
              style={{ display: otpVerified ? 'none' : 'block' }}
            >
              Confirm OTP
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default PersonalDetails;