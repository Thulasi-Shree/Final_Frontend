/* eslint-disable no-alert */
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import './login.scss';
import CryptoJS from 'crypto-js';
import { Card } from 'react-bootstrap';

const LoginWithOtp = () => {
  const emailOrPhone = JSON.parse(localStorage.getItem('emailOrPhone'));
  const navigate = useNavigate();
  const [email, setEmail] = useState(emailOrPhone);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   if (validator.current.allValid()) {
  //     try {
  //       setLoading(true);
  //       const response = await axios.post('/api/login', { email, otp });
  //       const { token, user } = response.data;
  //       document.cookie = `token=${token}; path=/;`;
  //       localStorage.setItem('user', JSON.stringify(user));
  //       localStorage.setItem('isloggedIn', 'true');
  //       setLoading(false);
  //       if (user && user.role !== 'user') {
  //         navigate('/admin/dashboard');
  //         localStorage.removeItem('emailOrPhone');
  //       } else {
  //         navigate('/');
  //       }
  //     } catch (error) {
  //       alert('Login failed. Please try again.');
  //       setLoading(false);
  //     }
  //   } else {
  //     validator.current.showMessages();
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      try {
        setLoading(true);
        const encryptedOtp = CryptoJS.AES.encrypt(
          otp,
          'ghjdjdgdhddjjdhgdcdghww#hsh536'
        ).toString();

        const response = await axios.post('/api/login', {
          email,
          otp: encryptedOtp
        });
        const { token, user } = response.data;
        document.cookie = `token=${token}; path=/;`;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isloggedIn', 'true');
        setLoading(false);
        if (user && user.role !== 'user') {
          navigate('/admin/dashboard');
          localStorage.removeItem('emailOrPhone');
        } else {
          navigate('/');
        }
      } catch (error) {
        alert('Login failed. Please try again.');
        setLoading(false);
      }
    } else {
      validator.current.showMessages();
    }
  };

  return (
    <div className=" bg-white py-4" style={{ height: "75vh" }}>
      <div className="signup-form-container mx-auto col-md-5 py-4 my-5">
        <Card className='bg-white Cardimg123'>
        <form onSubmit={handleLogin}>
          <div className="row mx-3 custom-table" id="CardBackIMg1">
            <div className="col-11 mx-auto">
              <h1 className="text-center mt-3 font-regular-29" id="CardText">
                Log in
              </h1>
              <div className="mt-4 text-black">
                Do not have an account?
                <Link to="/signup" className="ms-2" id="CardText">
                <button className='btn my-3 px-4 btn border border-danger rounded bg-white text-black'>
                  Sign Up
                  </button>
                </Link>
              </div>
              <div className="mb-3" style={{ display: 'none' }}>
                <label htmlFor="email" className="form-label" id="CardText">
                  Email address{' '}
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <input
                  style={{ backgroundColor: 'white', color: 'black' }}
                  value={email}
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
            <div className="col-11 mx-auto">
              <div className="mb-3">
                <label htmlFor="otp" className="form-label mt-2 text-black">
                  OTP{' '}
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <input
                  style={{ backgroundColor: 'white', color: 'black' }}
                  value={otp}
                  name="otp"
                  onChange={(e) => setOtp(e.target.value)}
                  type="otp"
                  required
                  placeholder="Field is required"
                  className="form-control mt-2"
                />
                {validator.current.message('otp', otp, 'required')}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn my-3 px-4 btn border border-danger rounded bg-white w-100 my-3 text-black "

              >
                {loading ? 'Logging in...' : 'Submit'}
              </button>
            </div>
            <div className='row my-2 mx-auto'>
            <div className='col-6'>
              <Link to="/login" id="CardText">
              <button className='btn my-3 px-4 btn border border-danger rounded bg-white my-3 text-black'>
                Back to login
                </button>
              </Link>
            </div>
            <div className=" col-6">
              <Link to="/" id="CardText">
              <button className='btn my-3 px-4 btn border border-danger rounded bg-white my-3 text-black'>
                Continue as Guest
                </button>
              </Link>
            </div>
            </div>
          </div>
        </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginWithOtp;
