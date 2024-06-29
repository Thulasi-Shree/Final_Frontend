/* eslint-disable no-alert */
import { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import '../login/login.scss';
import { Card } from 'react-bootstrap';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );
  const navigate = useNavigate();
  const { token } = useParams();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (validator.current.allValid()) {
  //     try {
  //       const response = await axios.put(`/api/password/reset/${token}`, {
  //         password,
  //         confirmPassword
  //       });
  //       console.log('Password reset success:', response.data);
  //       alert('Reset success');
  //       navigate('/login');
  //     } catch (error) {
  //       console.error('Password reset failed:', error);

  //       alert(error.response.data.message);
  //     }
  //   } else {
  //     alert('Password Reset failed!');
  //     validator.current.showMessages();
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirm password fields
    if (!validator.current.allValid()) {
      alert('Password Reset failed!');
      validator.current.showMessages();
      return;
    }

    // Encrypt the passwords before sending them to the server
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      'ghjdjdgdhddjjdhgdcdghww#hsh536'
    ).toString();
    const encryptedConfirmPassword = CryptoJS.AES.encrypt(
      confirmPassword,
      'ghjdjdgdhddjjdhgdcdghww#hsh536'
    ).toString();

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match');
      return;
    }

    try {
      const response = await axios.put(`/api/password/reset/${token}`, {
        password: encryptedPassword,
        confirmPassword: encryptedConfirmPassword
      });
      console.log('Password reset success:', response.data);
      alert('Reset success');
      navigate('/login');
    } catch (error) {
      console.error('Password reset failed:', error);
      alert(error.response.data.message);
    }
  };

  return (
    <div  className="py-4 bg-white text-black">
      <div className="container-fluid mx-auto col-md-5 mt-5 mb-4 ">
        <Card className='Cardimg123'>
        <form onSubmit={handleSubmit}>
          <div className="row  custom-table mx-3 my-5" id="CardBackIMg1">
            <div className="col-md-12">
              <h3 className="text-center text-black mt-3 fs-2">
                Reset password
              </h3>
              <div className="mb-3 address-container">
                <label className="form-label text-black " htmlFor="password_field">
                  Password
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <input
                  type="password"
                  id="password_field"
                  placeholder="Field is required"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 address-container">
                <label className="form-label text-black " htmlFor="confirm_password_field">
                  Confirm Password
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </label>
                <input
                  type="password"
                  id="confirm_password_field"
                  className="form-control"
                  placeholder="Field is required"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {validator.current.message('password', password, 'required')}
                {validator.current.message(
                  'confirmPassword',
                  confirmPassword,
                  'required|same:password'
                )}
              </div>
            </div>
            <div className="mb-3 d-flex justify-content-center">
              <button
                type="submit"
                className="btn my-3 px-4 btn border border-danger rounded bg-white w-100 text-black"
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
  );
};

export default ResetPassword;
