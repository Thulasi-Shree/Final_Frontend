import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const confirmOrderData = JSON.parse(localStorage.getItem('confirmOrder'));
  const emailOrMobile = JSON.parse(localStorage.getItem('emailOrMobile'));
  const user = JSON.parse(localStorage.getItem('user'));
  const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
  const billingAddress = JSON.parse(localStorage.getItem('billingAddress'));
  const cartInfo = JSON.parse(localStorage.getItem('cartItems'));
  const deliveryAddress = JSON.parse(localStorage.getItem('deliveryAddress'));
  const deliveryInstruction = JSON.parse(
    localStorage.getItem('deliveryInstruction')
  );
  const orderNotes = JSON.parse(localStorage.getItem('orderNotes'));
  const time = JSON.parse(localStorage.getItem('selectedTimeSlot'));
  const restaurantId = JSON.parse(localStorage.getItem('restaurantId'));
  const restaurantBranch = JSON.parse(localStorage.getItem('branch'));
  const restaurantAddress = JSON.parse(localStorage.getItem('Address'));
  const orderDate = JSON.parse(localStorage.getItem('selectedDate'));
  const userId = JSON.parse(localStorage.getItem('user'));

  const [error, setError] = useState(null);

  const paymentData = {
    amount: Math.round(confirmOrderData.orderSummary.total),
    shipping: {
      name: `${user?.name || shippingInfo.name} ${
        user?.lastName || shippingInfo.lastName
      }`,
      phone: user?.phone || emailOrMobile,
      address: {
        line1: billingAddress?.streetAddress,
        line2: null,
        city: billingAddress?.city,
        state: billingAddress?.state,
        postal_code: billingAddress?.postalCode,
        country: billingAddress?.country
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector('#pay_btn').disabled = true;

    try {
      const { data } = await axios.post('/api/payment/process', paymentData);
      const clientSecret = data.client_secret;
      const cardNumberElement = elements.getElement(CardNumberElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: `${user?.name || shippingInfo.name} ${
              user?.lastName || shippingInfo.lastName
            }`,
            email: user?.email || emailOrMobile
          }
        }
      });

      if (result.error) {
        alert(result.error.message);
        document.querySelector('#pay_btn').disabled = false;
      } else if (result.paymentIntent.status === 'succeeded') {
        localStorage.setItem('payment', JSON.stringify(result));

        // Create order after successful payment
        const orderData = {
          shipping: {
            name: `${shippingInfo.name} ${shippingInfo.lastName}`,
            email: shippingInfo.email,
            phone: shippingInfo.mobileNumber,
            emailOrMobile,
            address: {
              user: shippingInfo.name,
              email: shippingInfo.email,
              emailOrMobile,
              phone: shippingInfo.mobileNumber,
              line1: billingAddress.streetAddress,
              city: billingAddress.city,
              orderType: shippingInfo.orderType,
              state: billingAddress.state,
              postalCode: billingAddress.postalCode,
              country: billingAddress.country
            }
          },
          delivery: deliveryAddress
            ? {
                line1: deliveryAddress.streetAddress,
                city: deliveryAddress.city,
                state: deliveryAddress.state,
                postalCode: deliveryAddress.postalCode,
                country: deliveryAddress.country
              }
            : undefined,
          items: cartInfo.map((cartItem) => ({
            name: cartItem.name,
            image: cartItem.images[0].image || 'https://via.placeholder.com/20',
            price: cartItem.price,
            itemQuantity: cartItem.quantity
          })),
          orderNotes,
          userId: userId?._id || 'Guest',
          deliveryInstruction,
          itemsPrice: confirmOrderData.orderSummary.estimatedTotal,
          taxPrice: confirmOrderData.orderSummary.tax,
          shippingPrice: confirmOrderData.orderSummary.shipping,
          totalPrice: confirmOrderData.orderSummary.total,
          paymentInfo: result.paymentIntent.id,
          orderInstruction: orderNotes,
          paymentStatus: result.paymentIntent.status,
          restaurantId,
          restaurantBranch: `${restaurantBranch}, ${restaurantAddress}`,
          orderType: confirmOrderData.shippingInfo.orderType,
          selectedTimeSlot: `${time}`,
          orderDate
        };

        try {
          const response = await axios.post('/api/order/new', orderData);
          console.log('Order created:', response.data);

          // Navigate to success page
          navigate('/order/success');
          localStorage.removeItem('cartItems');
        } catch (orderError) {
          console.error('Error creating order:', orderError.message);
          alert('Order creation failed, please contact support!');
        }
      } else {
        alert('Payment failed, Please try again!');
      }
    } catch (paymentError) {
      console.error('Error processing payment:', paymentError.message);
    }
  };

  useEffect(() => {
    setError(null);
  }, [error]);

  return (
    <div className="bg-white p-3" >
      <div className="col-11 bg-white col-md-4 mx-auto py-3">
        <Form
          onSubmit={submitHandler}
          className="shadow-lg custom-table"
          id="CardBackIMg1"
        >
          <div className="m-3 py-3">
            <h4 className="mb-4 " id="CardText">
              Card Info
            </h4>
            <div className="form-group">
              <label htmlFor="card_num_field" id="CardText">
                Card Number
              </label>
              <CardNumberElement
                type="text"
                style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                id="card_num_field"
                className="form-control "
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field" id="CardText">
                Card Expiry
              </label>
              <CardExpiryElement
                style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                type="text"
                id="card_exp_field"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                type="password"
                id="card_cvc_field"
                className="form-control "
                value=""
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                id="pay_btn"
                type="submit"
                className='btn btn border-danger my-color mt-3 text-black'
              >
                Pay -{' '}
                {` $${
                  confirmOrderData.orderSummary &&
                  confirmOrderData.orderSummary.total
                }`}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Payment;
