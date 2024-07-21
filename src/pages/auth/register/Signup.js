
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './SignUpForm.css';
// import CryptoJS from 'crypto-js';
// import { Card } from 'react-bootstrap';

// const SignUpForm = () => {
//   const defaultAvatarImage =
//     'https://th.bing.com/th/id/OIP.QTPhxyhDQjv4eE1mA4ulLAHaJs?w=168&h=220&c=7&r=0&o=5&dpr=1.3&pid=1.7';
//   const [formData, setFormData] = useState({
//     name: '',
//     lastName: '',
//     password: '',
//     confirmPassword: '',
//     email: '',
//     avatar: defaultAvatarImage,
//     phone: ''
//   });


  
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const response = await axios.post('/api/register', formData);
//   //     alert('Registration link has been sent to your email successfully!');
//   //   } catch (error) {
//   //     alert(`${error.response.data.message}`);
//   //   }
//   // };
 
//   // };
//   const defaultAvatarStyle = {
//     display: formData.avatar === defaultAvatarImage ? 'block' : 'none',
//     maxWidth: '100px'
//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const encryptedPassword = CryptoJS.AES.encrypt(
//       formData.password,
//       'ghjdjdgdhddjjdhgdcdghww#hsh536'
//     ).toString();
//     try {
     
//     const response = await axios.post('/api/register', {
//         ...formData,
//         password: encryptedPassword
//       });
//       alert('Registration link has been sent to your email successfully!');
//     } catch (error) {
//       alert(`${error.response.data.message}`);
//     }
    
//   };

//   const customAvatarStyle = {
//     display: formData.avatar !== defaultAvatarImage ? 'block' : 'none',
//     maxWidth: '100px'
//   };
//   const avatarContainerStyle = {
//     textAlign: 'center'
//   };

//   return (
//     <div className="container-fluid py-5 bg-white"
//     >
// <Card className='Cardimg123 col-lg-5 mx-auto' >
//       <form onSubmit={handleSubmit}>
//         <div
//           className="col-11 col-md-8 col-lg-12 mx-auto custom-table mx-3 mt-4 bg-white"
//         >
//           <div className="col-md-12 col-12 px-4">
//             <h1 className="text-center mt-3 fs-1" id="CardText">
//               Sign up
//             </h1>
      
//             <div className="col-md-11 mx-auto">
//               <div className="mb-3 address-container">
//                 <label htmlFor="name" id="CardText">
//                   First name:
//                   <span className="text-danger">
//                     {' '}
//                     <b>*</b>
//                   </span>
//                 </label>
//                 <div>
//                   <input
//                     style={{ backgroundColor: 'white', color: 'black' }}
//                     type="text"
//                     id="name"
//                     name="name"
//                     placeholder="FirstName is required"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className={`form-control `}
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-11 mx-auto">
//               <div className="mb-3 address-container">
//                 <label htmlFor="lastName" id="CardText">
//                   Last name:
//                   <span className="text-danger">
//                     {' '}
//                     <b>*</b>
//                   </span>
//                 </label>
//                 <div>
//                   <input
//                     style={{ backgroundColor: 'white', color: 'black' }}
//                     type="text"
//                     id="lastName"
//                     name="lastName"
//                     placeholder="LastName is required"
//                     value={formData.lastName}
//                     className={`form-control `}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-11 mx-auto">
//               <div className="mb-3 address-container">
//                 <label htmlFor="email1" id="CardText">
//                   Email:{' '}
//                   <span className="text-danger">
//                     {' '}
//                     <b>*</b>
//                   </span>
//                 </label>
//                 <div>
//                   <input
//                     style={{ backgroundColor: 'white', color: 'black' }}
//                     type="email"
//                     id="email1"
//                     name="email"
//                     placeholder="Email is required"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`form-control `}
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-11 mx-auto">
//               <div className="mb-3 address-container">
//                 <label htmlFor="password" id="CardText">
//                   Password:{' '}
//                   <span className="text-danger">
//                     {' '}
//                     <b>*</b>
//                     <span>
//                       <label
//                         id="CardText"
//                         style={{
//                           fontWeight: '500',
//                           fontSize: '14px'
//                         }}
//                       >
//                         At least 8 characters
//                       </label>
//                     </span>
//                   </span>
//                 </label>
//                 <div>
//                   <input
//                     style={{ backgroundColor: 'white', color: 'black' }}
//                     type="password"
//                     id="password"
//                     name="password"
//                     placeholder="Password is required"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className={`form-control `}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-11 mx-auto">
//               <div className="mb-3 address-container">
//                 <label htmlFor="phone" id="CardText">
//                   Phone:{' '}
//                   <span className="text-danger">
//                     {' '}
//                     <b>*</b>
//                   </span>
//                 </label>
//                 <div>
//                   <input
//                     style={{ backgroundColor: 'white', color: 'black' }}
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     placeholder="Phone number is required"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     className={`form-control `}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div style={{ textAlign: 'center', display: 'none' }}>
//               <label
//                 htmlFor="avatar"
//                 id="CardText"
//                 style={{
//                   fontWeight: '500',
//                   fontSize: '19px'
//                 }}
//               >
//                 Avatar Image:
//               </label>
//               <div style={avatarContainerStyle}>
//                 <img
//                   src={formData.avatar}
//                   alt="User Avatar"
//                   style={{ ...defaultAvatarStyle, marginBottom: '10px' }}
//                 />
//                 <img
//                   src={formData.avatar}
//                   alt="User Avatar"
//                   style={customAvatarStyle}
//                 />
//               </div>
//               <input
//                 style={{ backgroundColor: 'white', color: 'black' }}
//                 type="file"
//                 id="avatar"
//                 name="avatar"
//                 accept="image/*"
//                 onChange={(e) =>
//                   setFormData({ ...formData, avatar: e.target.files[0] })
//                 }
//               />
//             </div>

//             <div className="my-3 d-flex justify-content-center">
//               <button
//                 type="submit"
//                 className="px-4 btn mt-4 className=' btn border border-danger w-100 rounded bg-white text-black '"
//                 style={{  borderRadius: '30px' }}
//               >
//                 Sign up
//               </button>
//             </div>
//               <p className='float-center my-4'>If you have an account?{' '}
//                   <Link to="/login" id="CardText" className="text-black fs-5">
//                   <button className=' btn border border-danger rounded bg-white text-black '>
//                     Login
//                     </button>
//                   </Link>
//                   </p>
//           </div>
//         </div>
//       </form>
//       </Card>
//     </div>
//   );
// };

// export default SignUpForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignUpForm.css';
import CryptoJS from 'crypto-js';
import { Card } from 'react-bootstrap';
import CustomAlert from '../../../components/utilities/Alert';

const SignUpForm = () => {
  const defaultAvatarImage =
    'https://th.bing.com/th/id/OIP.QTPhxyhDQjv4eE1mA4ulLAHaJs?w=168&h=220&c=7&r=0&o=5&dpr=1.3&pid=1.7';
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    avatar: defaultAvatarImage,
    phone: ''
  });
  const [alert, setAlert] = useState({ message: '', type: '' });
const navigate = useNavigate();
  useEffect(() => {
    return () => {
      setFormData({
        name: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        email: '',
        avatar: defaultAvatarImage,
        phone: ''
      });
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const encryptedPassword = CryptoJS.AES.encrypt(
      formData.password,
      'ghjdjdgdhddjjdhgdcdghww#hsh536'
    ).toString();

    try {
      const response = await axios.post('/api/register', {
        ...formData,
        password: encryptedPassword
      });
      // navigate('/email/Confirmation')
      // alert('Verification email sent! Please check your inbox to login.');
      setAlert({ message: 'Verification email sent! Please check your inbox to log in. Note: Your registration will be removed after 5 minutes if the email is not verified.', type: 'success' });
    } catch (error) {
      // alert(`${error.response.data.message}`);
      setAlert({ message: error.response.data.message, type: 'error' });
    }
  };
  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };
  const defaultAvatarStyle = {
    display: formData.avatar === defaultAvatarImage ? 'block' : 'none',
    maxWidth: '100px'
  };

  const customAvatarStyle = {
    display: formData.avatar !== defaultAvatarImage ? 'block' : 'none',
    maxWidth: '100px'
  };

  const avatarContainerStyle = {
    textAlign: 'center'
  };

  return (
    <div className="container-fluid py-5 bg-white" >
      
      <Card className="Cardimg123 col-lg-5 mx-auto">
      {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
        <form onSubmit={handleSubmit}>
          <div className="col-11 col-md-8 col-lg-12 mx-auto  mx-3 mt-4 bg-white">
            <div className="col-md-12 col-12 px-4">
              <h1 className="text-center mt-3 signup-form-container fs-1" id="CardText">
                Sign up
              </h1>

              <div className="col-md-11 mx-auto">
                <div className="mb-3 address-container">
                  <label htmlFor="name" id="CardText">
                    First name:
                    <span className="text-danger">
                      {' '}
                      <b>*</b>
                    </span>
                  </label>
                  <div>
                    <input
                      style={{ backgroundColor: 'white', color: 'black' }}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="FirstName is required"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-11 mx-auto">
                <div className="mb-3 address-container">
                  <label htmlFor="lastName" id="CardText">
                    Last name:
                    <span className="text-danger">
                      {' '}
                      <b>*</b>
                    </span>
                  </label>
                  <div>
                    <input
                      style={{ backgroundColor: 'white', color: 'black' }}
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="LastName is required"
                      value={formData.lastName}
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-11 mx-auto">
                <div className="mb-3 address-container">
                  <label htmlFor="email1" id="CardText">
                    Email:{' '}
                    <span className="text-danger">
                      {' '}
                      <b>*</b>
                    </span>
                  </label>
                  <div>
                    <input
                      style={{ backgroundColor: 'white', color: 'black' }}
                      type="email"
                      id="email1"
                      name="email"
                      placeholder="Email is required"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-11 mx-auto">
                <div className="mb-3 address-container">
                  <label htmlFor="password" id="CardText">
                    Password:{' '}
                    <span className="text-danger">
                      {' '}
                      <b>*</b>
                      <span>
                        <label
                          id="CardText"
                          style={{
                            fontWeight: '500',
                            fontSize: '14px'
                          }}
                        >
                          At least 8 characters
                        </label>
                      </span>
                    </span>
                  </label>
                  <div>
                    <input
                      style={{ backgroundColor: 'white', color: 'black' }}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password is required"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-11 mx-auto">
                <div className="mb-3 address-container">
                  <label htmlFor="phone" id="CardText">
                    Phone:{' '}
                    <span className="text-danger">
                      {' '}
                      <b>*</b>
                    </span>
                  </label>
                  <div>
                    <input
                      style={{ backgroundColor: 'white', color: 'black' }}
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Phone number is required"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center', display: 'none' }}>
                <label
                  htmlFor="avatar"
                  id="CardText"
                  style={{
                    fontWeight: '500',
                    fontSize: '19px'
                  }}
                >
                  Avatar Image:
                </label>
                <div style={avatarContainerStyle}>
                  <img
                    src={formData.avatar}
                    alt="User Avatar"
                    style={{ ...defaultAvatarStyle, marginBottom: '10px' }}
                  />
                  <img
                    src={formData.avatar}
                    alt="User Avatar"
                    style={customAvatarStyle}
                  />
                </div>
                <input
                  style={{ backgroundColor: 'white', color: 'black' }}
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, avatar: e.target.files[0] })
                  }
                />
              </div>

              <div className="my-3 d-flex col-md-3  rounded mx-auto justify-content-center">
                <button
                  type="submit"
                  className="px-4 btn mt-4 w-100 rounded "
                  style={{ borderRadius: '30px' }}
                >
                  Sign up
                </button>
              </div>
              <p className="float-center my-4" style={{ fontSize: '17px' }}>
                If you have an account?{' '}
                <Link to="/login" id="CardText" style={{ fontSize: '17px', color: 'orange' }} className="signup-form-container">
                  {/* <button className="btn rounded "> */}
                    Login
                  {/* </button> */}
                </Link>
              </p>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignUpForm;
