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
import CustomAlert from 'components/utilities/Alert';

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

  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
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
        // alert(result.error.message);
        setAlert({ message: result.error.message, type: 'error' });
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
          // alert('Order creation failed, please contact support!');
          setAlert({ message: 'Order creation failed, please contact support!', type: 'error' });

        }
      } else {
        // alert('Payment failed, Please try again!');
        setAlert({ message: 'Payment failed, Please try again!', type: 'success' });

      }
    } catch (paymentError) {
      console.error('Error processing payment:', paymentError.message);
    }
  };

  useEffect(() => {
    setError(null);
  }, [error]);

  return (
    <div className="bg-white p-5" >
      <div className="col-12 CardImg114 bg-white col-lg-6 mx-auto ">
        <Form
          onSubmit={submitHandler}
          className="shadow-lg  custom-table"
          id="CardBackIMg1"
        >
          <div className="my-2 p-2">
            <h5 className="mb-4 text-center" id="CardText">
              CARD INFO
            </h5>
            <div className="form-group my-3">
              <h6 htmlFor="card_num_field" id="CardText">
                Card Number
              </h6>
              <CardNumberElement
                type="text"
                style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                id="card_num_field"
                className="form-control "
              />
            </div>

            <div className="form-group my-3">
              <h6 htmlFor="card_exp_field" id="CardText">
                Card Expiry
              </h6>
              <CardExpiryElement
                style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                type="text"
                id="card_exp_field"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <h6 htmlFor="card_cvc_field">Card CVC</h6>
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
                className='btn btn my-color mt-3'
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
      {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
    </div>
  );
};

export default Payment;
