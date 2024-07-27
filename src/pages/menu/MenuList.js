/* eslint-disable no-alert */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ReusableTable from '../../components/ReusableTable';
import './index.css';
import CustomAlert from 'components/utilities/Alert';

const MenuList = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const { restaurantId } = user;
  const { role } = user;
  const [menuData, setMenuData] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [selectedBranch, setSelectedBranch] = useState(restaurantId || 'all');
  // const { id: productId } = useParams();
  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  // const {role} = user;
  const fetchOrders = async () => {
    try {
      let response;

      if (selectedBranch === 'all') {
        response = await axios.get('/api/admin/products');
      } else {
        const restaurantId = { restaurantId: selectedBranch };
        response = await axios.post('/api/admin/products/branch', restaurantId);
      }

      // Extract the menus array from the response, handling both object and array responses
      const menus = Array.isArray(response.data)
        ? response.data
        : response.data.data;

      setMenuData(menus || []);
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedBranch]);

  const handleAdd = () => {
    navigate('/admin/createMenu');
  };

  const handleEdit = (menuId) => {
    // Implement edit functionality here
    navigate(`/admin/updateMenu/${menuId}`);
    // console.log(`Edit menu item with ID ${menuId}`);
  };
  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/api/restaurant/get');
        const restaurant = response.data.data;
        setRestaurant(restaurant);
      } catch (error) {
        console.error('Error fetching time slots:', error.message);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (menuId) => {
    try {
      // Make an Axios DELETE request to delete the product
      await axios.delete(`/api/admin/product/${menuId}`);
      fetchOrders();
      // Handle success, e.g., navigate to another page or show a success message
      // alert('Product Deleted Successfully!');
      setAlert({ message: 'Product Deleted Successfully!', type: 'success' });


      // Optionally, navigate to another page after successful deletion
      // history.push('/some-other-page');
    } catch (error) {
      // Handle errors, e.g., show an error message
      // alert(error.message || 'An error occurred');
      setAlert({ message: error.message || 'An error occurred', type: 'error' });

    }
  };

  const headers = [
    'Sl No',
    'Menu Name',
    'Price',
    'Category',
    'Restaurant Branch'
  ];

  return (
    <div className=" bg-white">
      <div className="col-11 mx-auto">
        <div className="row">
          <div className="col">
            <h3 className="text-center text-black mt-3">Menus</h3>
            <div className="d-flex justify-content-end ">
              <Button
                className=" btn my-3 px-4 btn rounded "
                id="CardText"
                onClick={handleAdd}
              >
                Add Menu
              </Button>
            </div>
            <div className="col-12 col-lg-3 ">
              <div className="form-group">
                {role !== 'admin' && (
                  <div className="form-group">
                    <h4 className="mt-lg-n5" id="CardText">
                      Select branch
                    </h4>
                    <select
                      className="form-control"
                      name="status"
                      value={selectedBranch}
                      onChange={handleBranchChange}
                    >
                      <option value="all">All</option>
                      {restaurant &&
                    restaurant.map((restaurant) => (
                      <option
                        key={restaurant._id}
                        value={restaurant.restaurantId}
                      >
                        {restaurant.restaurantBranch} 
                      </option>
                    ))}
                    </select>
                  </div>
                )}
              </div>
              {/* Remove the Submit button as it's no longer needed */}
            </div>
            {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
            <ReusableTable
              headers={headers}
              data={menuData}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuList;
