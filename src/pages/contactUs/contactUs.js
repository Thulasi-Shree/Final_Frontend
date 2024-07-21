/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import axios from 'axios';
import './contactUs.css';
import CustomAlert from 'components/utilities/Alert';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.querySelector('#contact').disabled = true;
    try {
      const response = await axios.post('api/send-email', formData);
      console.log(response);

      // alert('Email sent successfully');
      setAlert({ message:'Email sent successfully!' , type: 'success' });

      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      // console.error('Error sending email:', error);
      // alert('Error sending email');
      setAlert({ message: 'Error sending email!', type: 'error' });

      // Handle the error (show error message or redirect)
    }
  };

  return (
    <div className='mx-auto address-container'>
      {/* Button to open modal */}
      <div
        type="button"
        data-bs-toggle="modal"
        className="btn my-3 px-4 btn rounded"
        data-bs-target="#contactModal"
      >
        Contact Us
      </div>

      {/* Modal */}
      <div
        className="modal fade bg-transparent"
        id="contactModal"
        style={{ backgroundColor: 'transparent' }}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" id="CardText1">
          <div className="modal-content bg-white CardImg114">
          {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
            <div className="modal-header">
              <h5 className="modal-title " id="exampleModalLabel">
                Contact Us
              </h5>
              <button
                type="button"
                className="btn-close "
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {/* Contact form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="fullName"
                    className="form-label text-black"
                    placeholder="Field is required"
                    required
                  >
                    Full Name<span className="text-danger">
                    {' '}
                    <b>*</b>
                    </span>
                  </label>
                  
                  <input
                    type="text"
                    style={{ backgroundColor: 'white', color: 'black' }}
                    className="form-control border "
                    id="fullName"
                    name="fullName"
                     placeholder="Field is required"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-black">
                    Email Address <span className="text-danger">
                    {' '}
                    <b>*</b>
                    </span>
                  </label>
                 
                  <input
                    type="email"
                     placeholder="Field is required"
                    style={{ backgroundColor: 'white', color: 'black' }}
                    className="form-control border "
                    id="email"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label text-black">
                    Subject<span className="text-danger">
                    {' '}
                    <b>*</b>
                    </span>
                  </label>
                  
                  <input
                    type="text"
                     placeholder="Field is required"
                    style={{ backgroundColor: 'white', color: 'black' }}
                    className="form-control border "
                    id="subject"
                    name="subject"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="message" className="form-label text-black">
                    Message<span className="text-danger">
                    {' '}
                    <b>*</b>
                    </span>
                  </label>
                  
                  <textarea
                    style={{ backgroundColor: 'white', color: 'black' }}
                    className="form-control border "
                    id="message"
                    name="message"
                     placeholder="Field is required"
                    rows="4"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  id="contact"
                  className="btn my-3 px-4 btn border rounded w-100"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
