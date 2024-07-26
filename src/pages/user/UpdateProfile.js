import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MetaData from 'layout/MetaData';
import { Link } from 'react-router-dom';
import './UpdateProfile.css';
import { Card } from 'react-bootstrap';
import CustomAlert from 'components/utilities/Alert';
export default function UpdateProfile() {
  const userId = JSON.parse(localStorage.getItem('user'));
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [avatarPreview, setAvatarPreview] = useState('');
  const id = userId._id;
  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('lastName', lastName);
      formData.append('phone', phone);
      formData.append('avatar', avatar);

      const response = await axios.put(`/api/update1/${id}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        // alert('Profile updated successfully');
        setAlert({ message: 'Profile updated successfully', type: 'success' });

      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : 'Internal Server Error';
      // alert(errorMessage);
      setAlert({ message: errorMessage, type: 'error' });

    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/myprofile/${id}`);
      const { user } = response.data.data;
      setName(user.name);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setAvatarPreview(user.avatar);
    };
    fetchUser();
  }, []);

  return (
    <div className=" bg-white py-5">
      <MetaData title="update" />
      <div className="col-11 custom-table col-lg-4 mx-auto Cardimg123">
      {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
        <Card className='Cardimg123'>
        {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
        <form
          id="CardText"
          onSubmit={submitHandler}
          //   className="shadow-lg"
          encType="multipart/form-data"
        >
          <div className="mt-4 px-3">
            <h4 className="mt-4 my-3">Update Profile</h4>
          </div>

          <div className="form-group mx-5 my-2">
            <label
              htmlFor="name_field"
              style={{
                fontWeight: '550'
              }}
            >
              Name
            </label>
            <input
              type="name"
              style={{ backgroundColor: 'white', color: 'black' }}
              id="name_field"
              className="form-control"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mx-5 my-2">
            <label
              htmlFor="lastName_field"
              style={{
                fontWeight: '550'
              }}
            >
              Last Name
            </label>
            <input
              style={{ backgroundColor: 'white', color: 'black' }}
              type="name"
              id="lastName_field"
              className="form-control"
              name="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-group mx-5 my-2">
            <label
              htmlFor="email_field"
              style={{
                fontWeight: '550'
              }}
            >
              Email
            </label>
            <input
              style={{ backgroundColor: 'white', color: 'black' }}
              type="email"
              id="email_field"
              className="form-control"
              required
              name="email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mx-5 my-2">
            <label
              htmlFor="phone_field"
              style={{
                fontWeight: '550'
              }}
            >
              Phone
            </label>
            <input
              style={{ backgroundColor: 'white', color: 'black' }}
              type="tel"
              id="phone_field"
              className="form-control"
              required
              disabled
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4 my-2 mx-5">
            <label
              htmlFor="customFile"
              style={{
                fontWeight: '550'
              }}
            >
              Avatar
            </label>

            <div className="custom-file">
              <input
                style={{ backgroundColor: 'white', color: 'black' }}
                type="file"
                name="avatar"
                className="form-control"
                alt="Avatar Preview"
                id="customFile"
                onChange={onChangeAvatar}
              />

              <label
                className="custom-file-label"
                htmlFor="customFile"
                id="CardText"
              >
                Chosen Avatar
              </label>
            </div>

            <figure className="image-preview mt-3">
              <img
                className="mr-2 mb-2"
                src={avatarPreview}
                width="55"
                height="52"
              />
            </figure>
          </div>
          <div className="px-3">
            <button
              type="submit"
              className="btn my-3 px-4 btn rounded w-100 mb-3"
            >
              Update
            </button>
            <Link to="/myProfile/:id">
              <button
                type="submit"
                className="btn my-3 px-4 btn rounded w-100 "
              >
                Back
              </button>
            </Link>
          </div>
        </form>
        </Card>
      </div>
    </div>
  );
}
