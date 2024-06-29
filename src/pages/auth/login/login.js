/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */

// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState, useRef } from 'react';
// import SimpleReactValidator from 'simple-react-validator';
// import { clearAuthError, login } from '../../../redux-toolkit/actions/auth';
// import './login.scss';
// import CryptoJS from 'crypto-js';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { loading, error, loginSuccess } = useSelector(
//     (state) => state.authState
//   );
//   const validator = useRef(
//     new SimpleReactValidator({ className: 'text-danger' })
//   );
//   const isAuthenticated = localStorage.getItem('isloggedIn') === 'true';

//   // const handleLogin = (e) => {
//   //   e.preventDefault();
//   //   if (validator.current.allValid()) {
//   //     dispatch(login(email, password));
//   //   } else {
//   //     validator.current.showMessages();
//   //     setEmail('');
//   //     setPassword('');
//   //   }
//   // };
//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (validator.current.allValid()) {
//       const encryptedPassword = CryptoJS.AES.encrypt(
//         password,
//         'ghjdjdgdhddjjdhgdcdghww#hsh536'
//       ).toString(); // Encrypting the password
//       dispatch(login(email, encryptedPassword));
//     } else {
//       validator.current.showMessages();
//       setEmail('');
//       setPassword('');
//     }
//   };
//   useEffect(() => {
//     if (loginSuccess) {
//       const { token, user } = loginSuccess.payload;
//       document.cookie = `token=${token}; path=/;`;
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       localStorage.setItem('user', JSON.stringify(user));
//     }
//     if (error) {
//       alert(error, {
//         onClose: () => {
//           dispatch(clearAuthError);
//         }
//       });
//     }
//     if (isAuthenticated) {
//       const user = JSON.parse(localStorage.getItem('user'));
//       if (user && user.role !== 'user') {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/');
//       }
//     }
//   }, [error, isAuthenticated, dispatch, navigate, loginSuccess]);

//   return (
//     <div className="container-fluid" id="LoginMainImg">
//       <div className="signup-form-container mx-auto py-5">
//         <form onSubmit={handleLogin}>
//           <div className="row custom-table mx-auto mt-5" id="CardBackIMg1">
//             <div className="col-md-12 ">
//               <h1 className="text-center mt-3 font-regular-29" id="CardText">
//                 Log in
//               </h1>
//               <p className="mt-4" id="CardText" style={{ fontSize: '19px' }}>
//                 Do not have account?
//                 <Link to="/signup" className="ms-2 text-white" id="CardText">
//                   Sign Up
//                 </Link>
//               </p>
//               <div className="mb-3 address-container">
//                 <p
//                   htmlFor="email"
//                   className="form-label mt-4"
//                   id="CardText"
//                   style={{
//                     backgroundColor: 'transparent',
//                     fontWeight: '500'
//                   }}
//                 >
//                   Email address
//                   <span className="text-danger">
//                     {' '}
//                     <b>*</b>
//                   </span>
//                 </p>
//                 <input
//                   value={email}
//                   style={{ backgroundColor: 'white', color: 'black' }}
//                   name="email"
//                   onChange={(e) => setEmail(e.target.value)}
//                   type="email"
//                   required
//                   placeholder="Email address is required"
//                   className="form-control text-black"
//                 />
//                 {validator.current.message('Email', email, 'required')}
//               </div>
//             </div>
//             <div className="col-md-12">
//               <div className="mb-3 address-container">
//                 <p
//                   htmlFor="password"
//                   className="form-label"
//                   id="CardText"
//                   style={{
//                     backgroundColor: 'transparent',
//                     fontWeight: '500'
//                   }}
//                 >
//                   Password
//                   <span className="text-danger">
//                     {' '}
//                     <b>*</b>
//                   </span>
//                 </p>
//                 <input
//                   style={{ backgroundColor: 'white', color: 'black' }}
//                   value={password}
//                   name="password"
//                   onChange={(e) => setPassword(e.target.value)}
//                   type="password"
//                   required
//                   placeholder="Password is required"
//                   className="form-control"
//                 />
//                 {validator.current.message('password', password, 'required')}
//               </div>
//             </div>
//             <div>
//               <div className="d-flex justify-content-center">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="btn  my-3 px-4 "
//                   id="Btn"
//                   style={{ backgroundColor: '#bd870b', borderRadius: '30px' }}
//                 >
//                   Submit
//                 </button>
//               </div>

//               <div className="links-container mb-4">
//                 <p>
//                   <Link
//                     to="/"
//                     id="CardText"
//                     style={{
//                       backgroundColor: 'transparent'
//                     }}
//                   >
//                     Continue as Guest
//                   </Link>
//                 </p>

//                 <p>
//                   <Link
//                     to="/password/forgot"
//                     id="CardText"
//                     style={{
//                       backgroundColor: 'transparent'
//                     }}
//                   >
//                     {' '}
//                     Forgot password?
//                   </Link>
//                 </p>
//                 <p>
//                   <Link
//                     to="/login/otp"
//                     id="CardText"
//                     style={{
//                       backgroundColor: 'transparent'
//                     }}
//                   >
//                     Login with OTP
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default LoginPage;


import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import './login.scss';
import CryptoJS from 'crypto-js'; // Importing CryptoJS library
import { Card } from 'react-bootstrap';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );
  const isAuthenticated = localStorage.getItem('isloggedIn') === 'true';

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
      alert(error);
      setError(null);
    }
    if (isAuthenticated) {
      const user = JSON.parse(localStorage.getItem('user'));
      navigate(user && user.role !== 'user' ? '/admin/dashboard' : '/');
    }
  }, [error, isAuthenticated, navigate]);

  return (
    <div className="container-fluid bg-white" style={{ height: "75vh" }}>
      <div className="signup-form-container col-lg-7 col-xl-6  mx-auto py-5 bg-white">
        <Card className='Cardimg123 bg-white'>
        <form onSubmit={handleLogin}>
          <div className="row mx-auto mt-5">
            <div className="col-md-12 ">
              <h1 className="text-center mt-3 fs-1 text-black">
                Log in
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
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn my-3 px-4 btn border border-danger rounded bg-white w-100 "
                  id="Btn"
                >
                  Submit
                </button>
              </div>
            
              <div className="links-container row mb-4 ms-md-4 my-4">
                <p className='col-md-4 col-12 '>
                  <Link
                    to="/"
                    id="CardText"
                    style={{
                      backgroundColor: 'transparent'
                    }}
                  >
                   <button className=' btn border border-danger rounded bg-white text-black'>
                    Go to HomePage
                    </button>
                  </Link>
                </p>

                <p className='col-md-4 col-12'>
                  <Link
                    to="/password/forgot"
                    id="CardText"
                    style={{
                      backgroundColor: 'transparent'
                    }}
                  >
                      <button className=' btn border border-danger rounded bg-white text-black'>
                    {' '}
                    Forgot password?
                    </button>
                  </Link>
                </p>
                <p className='col-md-4 col-12'>
                  <Link
                    to="/login/otp"
                    id="CardText"
                    style={{
                      backgroundColor: 'transparent'
                    }}
                  >
                    <button className=' btn border border-danger rounded bg-white text-black '>
                    Login with OTP
                    </button>
                  </Link>
                </p>
              </div>
              <p className="mt-4 text-black" style={{ fontSize: '19px' }}>
                Do not have account?
                <Link to="/signup" className="ms-2">
                <button className=' btn border border-danger rounded bg-white text-black '>
                  Sign Up
                  </button>
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