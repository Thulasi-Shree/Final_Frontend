/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import './login.scss';
import CryptoJS from 'crypto-js'; // Importing CryptoJS library
import { Card } from 'react-bootstrap';
import CustomAlert from 'components/utilities/Alert';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );
  const isAuthenticated = localStorage.getItem('isloggedIn') === 'true';
  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        'ghjdjdgdhddjjdhgdcdghww#hsh536'
      ).toString(); // Encrypting the password

      setLoading(true);
      try {
        const response = await axios.post('/api/login', {
          email,
          password: encryptedPassword
        });
        console.log(response)

        const { token, user } = response.data;
        document.cookie = `token=${token}; path=/;`;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isloggedIn', true);
        sessionStorage.setItem('isloggedIn', true);
        navigate(user.role !== 'user' ? '/admin/dashboard' : '/');
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    } else {
      validator.current.showMessages();
      setEmail('');
      setPassword('');
    }
  };
  
  useEffect(() => {
    if (error) {
      // alert(error);
      setAlert({ message: error, type: 'error' });

      setError(null);
    }
    if (isAuthenticated) {
      const user = JSON.parse(localStorage.getItem('user'));
      navigate(user && user.role !== 'user' ? '/admin/dashboard' : '/');
    }
  }, [error, isAuthenticated, navigate]);

  return (
    <div className="container-fluid bg-white">
      <div className="signup-form-container col-lg-7 col-xl-6  mx-auto pt-5 bg-white">
        <Card className='Cardimg123 bg-white'>
        {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
        <form onSubmit={handleLogin}>
          <div className="row mx-auto p-3">
            <div className="col-md-12 ">
              <h1 className="text-center mt-3 fs-1 signup-form-container">
                Login
              </h1>
              <div className="mb-3 address-container">
                <p
                  htmlFor="email"
                  className="form-label mt-4 text-black" 
                 
                  style={{
                    fontWeight: '500'
                  }}
                >
                  Email address
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </p>
                <input
                  value={email}
                  style={{ backgroundColor: 'white', color: 'black' }}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Email address is required"
                  className="form-control text-black"
                />
                {validator.current.message('Email', email, 'required')}
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3 address-container">
                <p
                  htmlFor="password"
                  className="form-label text-black"
                  id="CardText"
                  style={{
                    fontWeight: '500'
                  }}
                >
                  Password
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </p>
                <input
                  style={{ backgroundColor: 'white', color: 'black' }}
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="Password is required"
                  className="form-control"
                />
                {validator.current.message('password', password, 'required')}
              </div>
            </div>
            <div>
              <div className="d-flex col-md-3  rounded mx-auto justify-content-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn my-3 px-4 btn rounded w-100 "
                  id="Btn"
                >
                  Submit
                </button>
              </div>
            
              <div className="links-container row mb-4 ms-md-4 my-4">
                <p className='col-md-4 col-12 signup-form-container' style={{ fontSize: '17px' }}>
                  <Link
                    to="/"
                    id="CardText"
                    style={{
                      backgroundColor: 'transparent'
                    }}
                  >
                   {/* <button className=' btn rounded'> */}
                    Go to HomePage
                    {/* </button> */}
                  </Link>
                </p>

                <p className='col-md-4 col-12 signup-form-container' style={{ fontSize: '17px' }}>
                  <Link
                    to="/password/forgot"
                    id="CardText"
                    style={{
                      backgroundColor: 'transparent'
                    }}
                  >
                      {/* <button className=' btn rounded'> */}
                    {' '}
                    Forgot password?
                    {/* </button> */}
                  </Link>
                </p>
                <p className='col-md-4 col-12 signup-form-container' style={{ fontSize: '17px' }}>
                  <Link
                    to="/login/otp"
                    id="CardText"
                    style={{
                      backgroundColor: 'transparent'
                    }}
                  >
                    {/* <button className=' btn rounded'> */}
                    Login with OTP
                    {/* </button> */}
                  </Link>
                </p>
              </div>
              <p className="mt-4 text-black" style={{ fontSize: '17px' }}>
                Do not have account?
                <Link to="/signup" className="ms-2 signup-form-container">
                
                  Sign Up
              
                </Link>
              </p>
            </div>
          </div>
        </form>
        </Card>
      </div>
    </div>
  );
};
export default LoginPage;