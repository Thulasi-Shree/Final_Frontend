/* eslint-disable no-alert */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import './login.scss';
import { Card } from 'react-bootstrap';
import CustomAlert from 'components/utilities/Alert';

const SendLoginOtp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const isAuthenticated = localStorage.getItem('isloggedIn') === 'true';
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (error) {
      alert('Please register to Login!');
      setError(null);
    }
  }, [error, isAuthenticated, navigate]);

  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      setLoading(true);
      try {
        await axios.post('/api/login/otp', { email });
        localStorage.setItem('emailOrPhone', JSON.stringify(email));
        // alert('OTP sent!');
        setAlert({ message: 'OTP sent!', type: 'success' });

        navigate('/loginWithOtp');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to send OTP');
      } finally {
        setLoading(false);
      }
    } else {
      validator.current.showMessages();
      setEmail('');
    }
  };

  return (
    <div id="ForgetPMainImg" className="py-4 bg-white box-shadow">
      <Card className="container col-10 mx-auto col-md-5 Cardimg123 mt-5 mb-4 box-shadow signup-form-container">
      {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
        <form onSubmit={handleLogin}>
          <div className="row mx-3 my-5" >
            <div className="col-11 mx-auto">
              <h4 className="text-center font-regular-29" id="CardText">
                Send OTP
              </h4>
              <div className="mb-3">
                <label className="form-label text-black mt-2" id="CardText">
                  Email
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <input
                  value={email}
                  style={{ backgroundColor: 'white', color: 'black' }}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Field is required"
                  className="form-control"
                />
                {validator.current.message('email', email, 'required')}
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  disabled={loading}
                  className=' btn  px-4 py-2 mt-3 rounded'
                 
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SendLoginOtp;
