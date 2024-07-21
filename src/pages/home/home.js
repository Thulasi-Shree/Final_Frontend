
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantSelection from '../../pages/restaurant/RestaurantSelection';
import ProductModal from './HomeModel';
import CustomAlert from 'components/utilities/Alert';

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/restaurant/get');
      const { data } = response;

      if (Array.isArray(data.data)) {
        setRestaurants(data.data);
      } else {
        setError('Invalid data format');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 400 Bad Request error
        // console.error('Bad Request:', error.response.data);
        // Optionally, you can display a toast message here
        // alert(`Bad Request: ${error.response.data}`);
        setAlert({ message: "Error fetching data", type: 'error' });

      } else {
        // setError('Error fetching data');
        setAlert({ message: "Error fetching data", type: 'error' });
        // Display a toast message or log the error to the console
        // console.error('Error fetching data:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    // alert('Error!');
    setAlert({ message: "An error occured!", type: 'error' });
    return null;
  }
  return (
    <div>
      <ProductModal />
      <div className="">
      {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
        <RestaurantSelection />
      </div>
    </div>
  );
};

export default HomePage;
