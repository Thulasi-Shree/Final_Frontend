/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import CustomAlert from 'components/utilities/Alert';

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: '',
    confirmEmail: '',
    phone: '',
    restaurantBranch: '',
    restaurantId: ''
  });
  const [restaurantBranches, setRestaurantBranches] = useState([]);
  const [restaurantIds, setRestaurantIds] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const selectedId = restaurantIds.find(
      (id, index) => restaurantBranches[index] === value
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      restaurantBranch:
        name === 'restaurantBranch' ? value : prevFormData.restaurantBranch,
      restaurantId:
        name === 'restaurantBranch' ? selectedId : prevFormData.restaurantId
    }));
  };
  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', formData);
      // alert('Registration successful!');
      setAlert({ message: 'Registration successful!', type: 'success' });
    } catch (error) {
      console.error('error', error.response.data.message);
      // alert(`${error.response.data.message}`);
      setAlert({ message: error.response.data.message, type: 'error' });

    }
  };
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const branchesResponse = await axios.get('/api/restaurant/get');
        const restaurants = branchesResponse.data.data;
        const branches = restaurants.map(
          (restaurant) => restaurant.restaurantBranch
        );
        const ids = restaurants.map((restaurant) => restaurant.restaurantId);

        setRestaurantBranches(branches);
        setRestaurantIds(ids);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };
    fetchRestaurantData();
  }, []);

  return (
    <div className="bg-white text-black py-5">
      <Card
        className="address-container container  p-4 col-md-8 col-lg-6 col-xl-4 Cardimg123"
      >
         {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
        <form onSubmit={handleSubmit} className='text-black'>
          <div>
            <h2 className='text-black'>Create Admin</h2>
          </div>

          <div className="mb-3">
            <label htmlFor="name"  >
              First name:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: 'white', color: 'black' }}
              type="text"
              className={`form-control `}
              id="name"
              name="name"
              required
              placeholder="Field is required"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName">
              Last name:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: 'white', color: 'black' }}
              type="text"
              className={`form-control `}
              id="lastName"
              name="lastName"
              placeholder="Field is required"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              Email:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: 'white', color: 'black' }}
              type="email"
              className={`form-control `}
              id="email1"
              name="email"
              placeholder="Field is required"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              Password:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: 'white', color: 'black' }}
              type="password"
              id="password"
              className={`form-control `}
              name="password"
              placeholder="Field is required"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">
              Phone:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              style={{ backgroundColor: 'white', color: 'black' }}
              type="tel"
              id="phone"
              name="phone"
              className={`form-control `}
              placeholder="Field is required"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" id="CardText">
              Role:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <select
              style={{ backgroundColor: 'white', color: 'black' }}
              className="form-control"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option
                value="superAdmin"
                style={{ backgroundColor: 'white', color: 'black' }}
              >
                Super Admin
              </option>
              <option
                value="admin"
                style={{ backgroundColor: 'white', color: 'black' }}
              >
                Admin
              </option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="restaurantBranch" id="CardText">
              Restaurant Branch:
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <select
              style={{ backgroundColor: 'white', color: 'black' }}
              id="restaurantBranch"
              className="form-control"
              name="restaurantBranch"
              value={formData.restaurantBranch}
              onChange={handleChange}
              required
            >
              <option value="">Select Branch</option>
              {restaurantBranches &&
                restaurantBranches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <input
              type="hidden"
              id="restaurantId"
              name="restaurantId"
              value={formData.restaurantId}
            />
          </div>
          <div className="mb-3 d-flex justify-content-center">
            <Button type="submit" className=" btn my-3 px-4 btn rounded w-100 mb-4 mt-3">
              Create Admin
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default CreateAdmin;
