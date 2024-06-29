/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../login/login.scss';
import { Card } from 'react-bootstrap';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('email', email);
        const config = {
          headers: {
            'Content-type': 'application/json'
          }
        };

        const response = await axios.post(
          '/api/password/forgot',
          formData,
          config
        );

        setMessage(response.data.message);
        alert(response.data.message);
        setEmail('');
      } catch (error) {
        setError(error.response ? error.response.data : 'An error occurred');
        const errorMessage = error.response
          ? error.response.data.message
          : 'An error occurred';
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fix the validation errors');
      validator.current.showMessages();
    }
  };

  useEffect(() => {
    return () => { };
  }, []);

  return (
    <div className="container-fluid bg-white" style={{ height: "100vh" }}>
      <div className='row '>
        <div className='col-lg-5 col-xs-12 col-md-9 mx-auto my-5'>
        <Card className='Cardimg123'>
          <form onSubmit={handleSubmit}>
            <div className=" my-5 bg-white p-4">
              <div className="">
                <h2 className="text-center mt-1 font-regular-29" id="CardText">
                  Forgot password
                </h2>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-black ">
                    Email address{' '}
                    <span className="text-danger">
                      {' '}
                      <b>*</b>
                    </span>
                  </label>
                  <input
                    id="CardText"
                    value={email}
                    style={{ backgroundColor: 'white', color: 'black' }}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    placeholder="Field is required"
                    className="form-control"
                  />
                  {validator.current.message('Email', email, 'required')}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn my-3 px-4 btn border border-danger rounded bg-white w-100"
                  style={{ borderRadius: '30px' }}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          </Card>
        </div>
        </div>
        </div>
  );
};

export default ForgotPasswordPage;
