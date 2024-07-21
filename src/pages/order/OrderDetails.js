/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
// import './UserOrderList.css';

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const { id } = useParams();

  // Function to fetch order details
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`/api/order/${id}`);
      const orderData = response.data.order;

      if (orderData && Array.isArray(orderData.items)) {
        setOrderDetails(orderData);
      } else {
        console.error('Invalid order details response:', orderData);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  useEffect(() => {
    // Fetch order details when the component mounts
    fetchOrderDetails();
  }, [id, ]); // Re-fetch data when id changes

  // Helper function to determine if delivery info should be shown
  const shouldShowDeliveryInfo = () => {
    // Check if orderDetails and orderType are valid
    return orderDetails?.orderType === 'Delivery';
  };

  return (
    <div className="container-fluid bg-white py-5" id="ProfileMainImg">
      <div className="row container-fluild Cardimg123 bg-white custom-table mx-auto" id="CardBackIMg">
        <div className="col-12 col-lg-10 mx-auto p-2" >
          <div className="row d-flex justify-content-around">
          <h4 className="my-4">
                <b>Order Info</b>
              </h4>
            <div className="col-12 col-lg-6 order-details">
              
              <p id="CardText" style={{ marginBottom: '1rem' }}>
                <b>Order Id:</b> {orderDetails?.orderId}
              </p>

              <p id="CardText" style={{ marginBottom: '1rem' }}>
                <b>Name:</b>{' '}
                {`${orderDetails?.shipping.name} ${
                  orderDetails?.shipping.lastName || ''
                }`}
              </p>
              <p id="CardText" style={{ marginBottom: '1rem' }}>
                <b>Phone:</b> {orderDetails?.shipping.phone || 'not found'}
              </p>
              <Card style={{ marginBottom: '1rem', padding: '10px' }}>
                <p id="CardText">
                  <b className="">Billing Address:</b>{' '}
                  {`${orderDetails?.shipping?.address?.line1 || ''}, ${
                    orderDetails?.shipping?.address?.city || ''
                  }, ${orderDetails?.shipping?.address?.state || ''}, ${
                    orderDetails?.shipping?.address?.country || ''
                  }, ${orderDetails?.shipping?.address?.postalCode || ''}`}
                </p>
              </Card>
              {/* Conditionally render delivery address based on orderType */}
              {shouldShowDeliveryInfo() && (
                <Card style={{ marginBottom: '1rem', padding: '10px' }}>
                  <p id="CardText">
                    <b className="">Delivery Address:</b>{' '}
                    {`${orderDetails?.delivery?.line1 || ''}, ${
                      orderDetails?.delivery?.city || ''
                    }, ${orderDetails?.delivery?.state || ''}, ${
                      orderDetails?.delivery?.country || ''
                    }, ${orderDetails?.delivery?.postalCode || ''}`}
                  </p>
                </Card>
              )}
              <Card className="mb-3" style={{ marginBottom: '1rem', padding: '10px' }}>
                <p id="CardText">
                  <b>Restaurant:</b>{' '}
                  {orderDetails?.restaurantBranch || 'not found'}
                </p>
                <p id="CardText">
                  <b>Selected time:</b>{' '}
                  {orderDetails?.selectedTimeSlot || 'not found'}
                </p>
                <p id="CardText">
                  <b>Selected Date:</b> {orderDetails?.orderDate || 'not found'}
                </p>
                <p id="CardText">
                  <b>Order Type:</b> {orderDetails?.orderType || 'not found'}
                </p>
              </Card>
              <Card className="pt-2" style={{ marginBottom: '1rem', padding: '10px' }}>
                <p id="CardText">
                  <b>Total Amount:</b> ${orderDetails?.totalPrice}
                </p>
                <p id="CardText">
                  <b>Payment:</b> {orderDetails?.paymentStatus}
                </p>
                <p id="CardText">
                  <b>Payment Id:</b> {orderDetails?.paymentInfo}
                </p>
                <p id="CardText">
                  <b>Paid at:</b> {orderDetails?.paidAt}
                </p>
              </Card>
              <Card
                style={{ marginBottom: '1rem', padding: '10px' }}
                className={`my-4 ${
                  orderDetails?.orderStatus === 'Delivered'
                    ? 'greenColor'
                    : 'redColor'
                }`}
              >
                <p id="CardText">
                  <b className="mx-2">Order Status:</b>{' '}
                  {orderDetails?.orderStatus}
                </p>
              </Card>
             
              {/* Conditionally render delivery instruction based on orderType */}
              {/* {shouldShowDeliveryInfo() && (
                <p id="CardText" style={{ marginBottom: '1rem' }}>
                  <b>Delivery Instruction:</b>{' '}
                  {orderDetails?.deliveryInstruction || '-'}
                </p>
              )} */}
            </div>

            <div className="col-12 col-lg-6 mx-auto mt-4">
            <div className="col-12 col-lg-10 mx-auto">
            <Card className="pt-2" style={{ marginBottom: '1rem', padding: '10px' }}>
                <p id="CardText" style={{ marginBottom: '1rem' }}>
                <b>Order Instruction:</b>{' '}
                {orderDetails?.orderInstruction || '-'}
              </p>
              </Card>
            
              </div>
              <div className="col-9 px-5 mx-auto">
                
                <h3 className="my-4">Order Items:</h3>
              </div>
              <div className="col-12 col-lg-10 mx-auto">
                {orderDetails?.items.length > 0 ? (
                  orderDetails?.items.map((item) => (
                    <Card className="cart-item my-3 container-fluid col-12" key={item._id}>
                    <div className="row my-2 d-flex align-items-center">
                      <div className="col-6 col-lg-6 d-flex align-items-center">
                        <p id="CardText" className="mb-0">{item.name}</p>
                      </div>
                      <div className="col-3 col-lg-2 mt-4 mt-lg-0 d-flex align-items-center">
                        <p id="CardText" className="mb-0">${item.price}</p>
                      </div>
                      <div className="col-3 col-lg-3 mt-4 mt-lg-0 d-flex align-items-center">
                        <p id="CardText" className="mb-0">Qty-{item.itemQuantity}</p>
                      </div>
                    </div>
                  </Card>
                  
                  ))
                ) : (
                  <p>Items failed to display</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
