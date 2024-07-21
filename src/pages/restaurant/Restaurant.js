
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReusableTable from '../../components/ReusableTable';
import './index.css';
import CustomAlert from 'components/utilities/Alert';

const RestaurantTable = () => {
  const headers = [
    'Sl No',
    'Restaurant Branch',
    'Opening Hours',
    'Restaurant Address'
  ];
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: '', type: '' });


  const handleAdd = () => {
    navigate('/admin/create/restaurant');
  };
  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };


  const onEdit = (id) => {
    // console.log(`Edit restaurant with ID ${id}`);
    // navigate(`/admin/updateRestaurant/${id}`);
    navigate(`/admin/updateRestaurant/${id}`);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/restaurant/get');
      const { data } = response;

      // Check if the response is successful and contains the expected structure
      if (data.success && Array.isArray(data.data)) {
        setRestaurants(data.data);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (menuId) => {
    try {
      // Make an Axios DELETE request to delete the product
      await axios.delete(`/api/restaurant/delete/${menuId}`);

      // Handle success, e.g., navigate to another page or show a success message
      // alert('Product Deleted Successfully!');
      setAlert({ message: 'Product Deleted Successfully!', type: 'success' });
      fetchData();

      // Optionally, navigate to another page after successful deletion
      // history.push('/some-other-page');
    } catch (error) {
      // Handle errors, e.g., show an error message
      // alert(error.message || 'An error occurred');
      setAlert({ message: error.message || 'An error occurred', type: 'error' });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white text-black pt-4" style={{ minHeight: '58vh' }}>
      <div className="container-fluid" id="CardText">
        <div className="row">
        {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
          <h1 className=" mt-3" style={{ fontWeight: 'bold' }}>
            Restaurants
          </h1>
          <div className="col bg-white">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div style={{ display: 'flex' }}>
                <h5 className="mt-2 text-black">Create a new restaurant - </h5>
                <button
                  className="btn  px-4 btn rounded ms-2 m-1"
                  onClick={handleAdd}
                >
                  Create
                </button>
              </div>
            )}
          </div>
          <ReusableTable
            headers={headers}
            data={restaurants}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantTable;
