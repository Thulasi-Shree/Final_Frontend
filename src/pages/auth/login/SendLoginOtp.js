/* eslint-disable no-alert */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import './login.scss';
import { Card } from 'react-bootstrap';

const SendLoginOtp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isAuthenticated = localStorage.getItem('isloggedIn') === 'true';
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (error) {
      alert('Failed!');
      setError(null);
    }
  }, [error, isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      setLoading(true);
      try {
        await axios.post('/api/login/otp', { email });
        localStorage.setItem('emailOrPhone', JSON.stringify(email));
        alert('OTP sent!');
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
    <div className="bg-white py-4" style={{ height: "75vh" }}>
      <div className="container-fluid mx-auto col-md-5 mt-5 mb-4 signup-form-container ">
        <Card className="bg-white Cardimg123">
        <form onSubmit={handleLogin}>
          <div className="row  custom-table mx-3 my-5" id="CardBackIMg1">
            <div className="col-11 mx-auto">
              <h4 className="text-center mt-3 font-regular-29" id="CardText">
                Send OTP
              </h4>
              <div className="mb-3">
                <label className="form-label mt-2 text-black">
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
                  className="btn my-3 px-4 btn border border-danger rounded bg-white text-black w-100 mb-4 mt-2 "
                  style={{ backgroundColor: '#bd870b', borderRadius: '30px' }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
        </Card>
      </div>
    </div>
  );
};
export default SendLoginOtp;
