/* eslint-disable no-alert */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */

import axios from 'axios';
import Cart from 'pages/cart/cartDetails';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ConfirmOrder.css';
import Cart1 from 'pages/cart/cart1';
import CustomAlert from 'components/utilities/Alert';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [restaurantBranch, setRestaurantBranch] = useState(null);
  const [isPickup, setIsPickup] = useState(true);
  const [loading, setLoading] = useState(true);
  const orderType = JSON.parse(localStorage.getItem('orderType'));
  // const [orderType, setOrderType] = useState(orderType1)
  const getLocalStorageData = (key, defaultValue = {}) => {
    try {
      const rawData = localStorage.getItem(key);
      return rawData ? JSON.parse(rawData) : defaultValue;
    } catch (error) {
      console.error(`Error parsing JSON for key ${key}:`, error);
      return defaultValue;
    }
  };
  
  const localData = getLocalStorageData('shippingInfo', {});
  const user = getLocalStorageData('user', {});
  const emailOrMobile = JSON.parse(localStorage.getItem('emailOrMobile'));
  const orderInstruction = JSON.parse(localStorage.getItem('orderNotes'));
  // const name = JSON.parse(localStorage.getItem('name'));
  const billingAddress = JSON.parse(localStorage.getItem('billingAddress'));
  const deliveryAddress = JSON.parse(localStorage.getItem('deliveryAddress'));
  const restaurantId = JSON.parse(localStorage.getItem('restaurantId'));
  const selectedDate = JSON.parse(localStorage.getItem('selectedDate'));
  const time = JSON.parse(localStorage.getItem('selectedTimeSlot'));
  const distanceResponse = JSON.parse(localStorage.getItem('distanceResponse'));
  const isLoggedIn = JSON.parse(localStorage.getItem('isloggedIn'));
  const [deliveryChargePerKm, setDeliveryChargePerKm] = useState('');
  const [minDeliveryCharge, setMinDeliveryCharge] = useState('');
  const [tax, setTax] = useState('');
  // const userData = JSON.parse(localStorage.getItem('user'));
  const fetchdata = async () => {
    try {
      const response = await axios.get(`/api/admin/settings/get`, {

      });
      setDeliveryChargePerKm(response.data.data[0].deliveryChargePerKm);
      setMinDeliveryCharge(response.data.data[0].minDeliveryCharge);
      setTax(response.data.data[0].taxAmount);
    } catch (error) {
      // console.error('Error fetching restaurant details:', error.message);
      // alert('Error fetching delivery & tax charges');
      setAlert({ message: 'Error fetching delivery & tax charges', type: 'error' });

    }
  };
  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };

  const shippingPrice = isPickup
    ? 0
    : (Number(minDeliveryCharge) + Number(distanceResponse * deliveryChargePerKm)).toFixed(2);

  // Calculate total price without shipping
  const cartItemsTotal = JSON.parse(localStorage.getItem('cartItemsTotal'));
  const totalPriceWithoutShipping = Number(cartItemsTotal);
  // Calculate tax price
  const taxPrice = Number(tax * totalPriceWithoutShipping).toFixed(2);

  // Calculate total price
  const totalPrice = Number(
    Number(shippingPrice) + Number(totalPriceWithoutShipping) + Number(tax)
  ).toFixed(2);

  const fetchRestaurantBranch = async () => {
    try {
      const response = await axios.get(`/api/restaurant`, {
        params: {
          id: restaurantId
        }
      });
      setRestaurantBranch(response.data.restaurant.restaurantBranch);
      // console.log(response.data.restaurant.restaurantBranch);
      localStorage.setItem(
        'restaurantBranch',
        JSON.stringify(restaurantBranch)
      );
    } catch (error) {
      // console.error('Error fetching restaurant details:', error.message);
      // alert('Error fetching restaurant details');
      setAlert({ message: 'Error fetching restaurant details', type: 'error' });

    }
  };
  useEffect(() => {
    fetchRestaurantBranch();
    fetchdata()
    setLoading(false);
    console.log(orderType)
  }, [restaurantId, localData]);
  // Map shipping information
  const mapData = () => {
    return {
      userName: `${user.name} ${user.lastName}`,
      city: billingAddress.city,
      orderType: orderType,
      selectedTimeSlot: `${time}`,
      state: billingAddress.state,
      streetAddress: billingAddress.streetAddress,
      postalCode: billingAddress.postalCode || billingAddress.postal_code,
      country: billingAddress.country
    };
  };

  // Map data using the function
  const mappedData = mapData();

  const processPayment = () => {
    const data = {
      shippingInfo: mappedData, // Shipping information
      cartItems,
      orderSummary: {
        shipping: Number(shippingPrice),
        tax: Number(tax),
        total: Number(totalPrice)
      }
    };

    // Save order information to localStorage
    localStorage.setItem('confirmOrder', JSON.stringify(data));

    // Redirect to the payment page
    navigate('/payment');
  };

  // Fetch cart items from session storage
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // console.log('data missing')
    setCartItems(storedCartItems);
    setIsPickup(orderType === 'Pickup');
    // if (storedCartItems.length === 0) {
    //   navigate('/select');
    // }
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="ConfirmOrderMainImg bg-white">
      <div className="py-5">
        <Card
          className="row d-flex CardImg114 justify-content-between col-12 col-md-10 col-sm-12 col-xs-12 col-lg-8 mx-auto"
          id="CardBackIMg1"
        >
          <div className=" order-confirm " style={{ textAlign: 'left' }}>
            <h4 className="mb-3 my-2" id="CardText">
              Order Info
            </h4>
            <div className="container text-center">
              <div className="row">
              {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                  <Card className="p-2 borderUp" id="CardText">
                    <p id="CardText">
                      <b>Name:</b> {user.name} {user.lastName}
                      {/* Replace with actual name data */}
                    </p>
                    {isLoggedIn && (
                      <>
                        <p id="CardText">
                          <b>Email:</b> {user.email}
                        </p>
                        <p id="CardText">
                          <b>Phone:</b> {localData.mobileNumber || user.phone}
                        </p>
                      </>
                    )}
                    {!isLoggedIn && (
                      <>
                        <p id="CardText">
                          <b>Email / Phone:</b> {emailOrMobile}
                        </p>
                        {/* <p className="mb-4" id="CardText">
                    <b>Billing Address:</b> {mappedData.streetAddress},{' '}
                    {mappedData.city}, {mappedData.state},{' '}
                    {mappedData.postalCode}, {mappedData.country}
                  </p> */}
                        <hr />
                      </>
                    )}
                    {orderType === 'Pickup' ? (
                      <div id="CardText">
                        <p id="CardText">
                          <b>Type:</b> Pickup
                        </p>
                        <p id="CardText">
                          <b>Order date:</b> {selectedDate}
                        </p>
                        <p id="CardText">
                          <b>Pickup Time:</b> {mappedData.selectedTimeSlot}
                        </p>
                        <p id="CardText">
                          <b>Restaurant:</b> {restaurantBranch}
                        </p>
                        <Card className="mt-3 p-2" id="CardText">
                          <p className="mb-4" id="CardText">
                            <b id="CardText">Billing Address:</b>{' '}
                            {mappedData.streetAddress}, {mappedData.city},{' '}
                            {mappedData.state}, {mappedData.postalCode || billingAddress.postalCode},{' '}
                            {mappedData.country}
                          </p>
                        </Card>
                      </div>
                    ) : (
                      <div>
                        <p id="CardText">
                          <b>Type:</b> Delivery
                        </p>
                        <p id="CardText">
                          <b>Restaurant:</b> {restaurantBranch}
                        </p>
                        <p id="CardText">
                          <b>Delivery Time:</b>{' '}
                          {mappedData.selectedTimeSlot || Date.now()}
                        </p>
                        <Card className="mt-3 p-2" id="CardText">
                          <p className="mb-4" id="CardText">
                            <b id="CardText">Billing Address:</b>{' '}
                            {mappedData.streetAddress}, {mappedData.city},{' '}
                            {mappedData.state}, {mappedData.postalCode || billingAddress.postal_code},{' '}
                            {mappedData.country}
                          </p>
                        </Card>
                        <Card className="mt-3 p-2" id="CardText">
                          <p className="mb-4" id="CardText">
                            <b id="CardText">Delivery Address:</b>{' '}
                            {deliveryAddress.streetAddress},{' '}
                            {deliveryAddress.city}, {deliveryAddress.state},{' '}
                            {deliveryAddress.postalCode || deliveryAddress.postal_code},{' '}
                            {deliveryAddress.country}
                          </p>
                        </Card>
                        <Card className="mt-3 p-2" id="CardText">
                          <p className="mb-4" id="CardText">
                            <b id="CardText">Order Instruction:</b>{' '}
                            {orderInstruction}
                          </p>
                        </Card>
                      </div>
                    )}
                  </Card>
                </div>
                {/* <Card className="p-2 " style={{ borderRadius: '10px' }}> */}
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                  <div className="row">
                    <div className="col-lg-12 col-sm-12 col-xs-12 col-md-6 col-lg-6">
                      <Cart1 />
                    </div>{' '}
                    {/* </Card> */}
                    <div className="col-lg-12 col-sm-12 col-md-6 col-lg-6">
                      <Card
                        className=" p-5 borderUp h-100 "
                        style={{
                          color: 'black',
                          backgroundColor: 'transparent',
                          fontWeight: '500'
                        }}
                        id="order_summary"
                      >
                        <p id="CardText">
                          Tax:{' '}
                          <span className="order-summary-values" id="CardText">
                            ${tax}
                          </span>
                        </p>

                        {orderType === 'Delivery' ? (
                          <p id="CardText">
                            Delivery:{' '}
                            <span className="order-summary-values">
                              ${shippingPrice}
                            </span>
                          </p>
                        ) : (
                          ''
                        )}


                        {/* <hr /> */}

                        <p id="CardText">
                          Total:{' '}
                          <span className="order-summary-values" id="CardText">
                            ${totalPrice}
                          </span>
                        </p>
                        {/* <hr /> */}
                      </Card>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    id="checkout_btn"
                     className='btn btn my-color my-3'
                    onClick={processPayment}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmOrder;
