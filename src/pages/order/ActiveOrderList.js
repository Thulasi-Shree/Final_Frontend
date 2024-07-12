
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReusableTable from '../../components/ReusableTable';
import './ActiveOrders.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const OrdersTable = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const { restaurantId } = user;
  const { role } = user;
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 30;
  const [restaurant, setRestaurant] = useState([]);
  const [orderType, setSelectedOrderType] = useState('all');
  const [selectedOrderStatus, setSelectedOrderStatus] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(restaurantId || 'all');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${month}/${day}`;
  });
  const generateDates = (numDays) => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < numDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
      dates.push(formattedDate);
    }

    return dates;
  };

  const availableDates = generateDates(7);
  const headers = [
    'Sl No',
    'Order ID',
    'Customer',
    'Restaurant Branch',
    'Pickup/Delivery Time',
    'Status'
  ];

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const handleOrderTypeChange = (orderType) => {
    setSelectedOrderType(orderType);
  };

  const handleClear = () => {
    setSelectedOrderType('all');
  };

  const formatAddress = (address) => {
    return `${address.line1}, ${address.city}, ${address.state} - ${address.postalCode}, ${address.country}`;
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const fetchOrders = async () => {
    try {
      let response;

      if (selectedBranch === 'all') {
        response = await axios.get(
          `/api/admin/orders/active?restaurantId=${selectedBranch}&selectedDate=${selectedDate}&page=${
            page + 1
          }&pageSize=${pageSize}`
        );
      } else {
        response = await axios.get(
          `/api/admin/order/active?restaurantId=${selectedBranch}&selectedDate=${selectedDate}&page=${
            page + 1
          }&pageSize=${pageSize}`
        );
      }

      let orders = Array.isArray(response.data)
        ? response.data
        : response.data.orders;

      if (orderType !== 'all') {
        orders = orders.filter((order) => order.orderType === orderType);
      }
      orders.sort((a, b) => {
        const dateA = new Date(`1970-01-01T${a.selectedTimeSlot}:00`);
        const dateB = new Date(`1970-01-01T${b.selectedTimeSlot}:00`);

        return dateA - dateB;
      });

      setOrders(orders || []);
      setTotalPages(Math.ceil(response.headers['x-total-count'] / pageSize));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected);
  };

  const handleEdit = (orderId) => {
    navigate(`/admin/order/${orderId}`);
  };

  const handleUpdateOrder = async (orderId) => {
    const response = await axios.put(`/api/admin/order/${orderId}`, {
      orderStatus: selectedOrderStatus
    });

    if (response.status === 200) {
      fetchOrders(orderId);
    } else {
      console.error('Failed to update order status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedBranch, orderType, selectedDate, page, pageSize]);

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

  return (
    <div className="bg-white text-black" style={{ minHeight: '58vh' }}>
      <div className="col-11 mx-auto py-2">
        <h4 className="text-center">Current orders</h4>
        <div className="row justify-content-end">
          {/* <div className="col-lg-4" /> */}
          <div className="col-lg-9 mx-auto">
            <h5 className="mt-3 text-black">Select order type</h5>
            <label>
              <input
                id="pickup"
                type="radio"
                name="orderType"
                value="Pickup"
                checked={orderType === 'Pickup'}
                onChange={() => handleOrderTypeChange('Pickup')}
              />{' '}
              <span className='text-black'>Pickup</span>
            </label>{' '}
            <label>
              <input
                id="delivery"
                type="radio"
                className="ms-2 className='text-black'"
                name="orderType"
                value="Delivery"
                checked={orderType === 'Delivery'}
                onChange={() => handleOrderTypeChange('Delivery')}
              />{' '}
              <span>Delivery</span>
            </label>{' '}
            <button
              className=" my-3 px-4 border border-warning rounded "
              onClick={handleClear}
              style={{ backgroundColor: 'white', border: 'none' }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <div className="date-buttons col-8  my-2">
              {availableDates.map((date) => (
                <button
                  key={date}
                  className=" my-3 mx-2 px-2 rounded"
                  value={date}
                  onClick={() => handleDateSelection(date)}
                  style={{
                    backgroundColor: selectedDate === date ? 'orange' : 'white',
                    border:
                      selectedDate === date
                        ? '2px solid orange'
                        : '1px solid orange'
                  }}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
          <div className="col-lg-3 col-7 mx-auto">
            {role !== 'admin' && (
              <div className="">
                <h5 className="my-2">Select Branch</h5>
                <select
                  className="form-select form-select-sm"
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
                        {restaurant.restaurantBranch} -{' '}
                        {formatAddress(restaurant.address)}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <h5 className="mt-2">Update order</h5>
            {/* <select
              className="form-control mb-2 text-black"
              value={selectedOrderStatus}
              required
              onChange={(e) => setSelectedOrderStatus(e.target.value)}
            >
              <option>Select Order Status</option>
              <option value="Preparing">Preparing</option>
              <option value="Out For Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select> */}
            <select
      className="form-control mb-2 text-black"
      value={selectedOrderStatus}
      required
      onChange={(e) => setSelectedOrderStatus(e.target.value)}
    >
      <option value="Order Placed">Order Placed</option>
      <option value="Preparing">Preparing</option>
        <option value="Out For Delivery">Out for Delivery</option>
        <option value="Ready for Pickup">Ready for Pickup</option>
        <option value="On the Way">On the Way</option>
        <option value="Delivered">Delivered</option>
    </select>
          </div>
          <div className="col-lg-12 btn bg-white">
            <ReusableTable
              data={orders}
              headers={headers}
              update={handleUpdateOrder}
              onEdit={handleEdit}
            />
            <ReactPaginate
              className="pagination bg-white"
              id="CardText"
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
