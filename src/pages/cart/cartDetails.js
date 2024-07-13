import React, { Fragment, useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import './cartDetails.css';

export default function Cart(handleAdd, handleMinus) {
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const initialQuantities = storedCartItems.reduce((acc, item) => {
      acc[item._id] = Number(item.quantity);
      return acc;
    }, {});
    setQuantities(initialQuantities);
    setCartItems(storedCartItems);
  }, []);

  const updateLocalStorage = (updatedCartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  // const handleAdd = (menuItem) => {
  //   if (menuItem.isAvailable === false) return;

  //   const updatedQuantities = {
  //     ...quantities,
  //     [menuItem._id]: (quantities[menuItem._id] || 0) + 1
  //   };
  //   setQuantities(updatedQuantities);

  //   const updatedCartItems = cartItems.map((cartItem) => {
  //     if (cartItem._id === menuItem._id) {
  //       return { ...cartItem, quantity: (cartItem.quantity || 0) + 1 };
  //     }
  //     return cartItem;
  //   });
  //   updateLocalStorage(updatedCartItems);
  // };

  // const handleMinus = (item) => {
  //   if (item.isAvailable === false) return;

  //   const updatedQuantities = {
  //     ...quantities,
  //     [item._id]: Math.max((quantities[item._id] || 0) - 1, 0)
  //   };

  //   setQuantities(updatedQuantities);

  //   let updatedCartItems;

  //   if (updatedQuantities[item._id] === 0) {
  //     updatedCartItems = cartItems.filter(
  //       (cartItem) => cartItem._id !== item._id
  //     );
  //   } else {
  //     updatedCartItems = cartItems.map((cartItem) => {
  //       if (cartItem._id === item._id) {
  //         return {
  //           ...cartItem,
  //           quantity: Math.max((cartItem.quantity || 0) - 1, 0)
  //         };
  //       }
  //       return cartItem;
  //     });
  //   }

  //   updateLocalStorage(updatedCartItems);
  // };

  const handleAddToCartClick = (menuItem) => {
    const updatedQuantities = {
      ...quantities,
      [menuItem._id]: 1
    };
    setQuantities(updatedQuantities);

    const updatedCartItems = [...cartItems, { ...menuItem, quantity: 1 }];
    updateLocalStorage(updatedCartItems);
  };

  const handleDelete = (menuItem) => {
    const updatedCartItems = cartItems.filter(
      (item) => item._id !== menuItem._id
    );

    updateLocalStorage(updatedCartItems);

    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[menuItem._id];
      return updatedQuantities;
    });
  };
  // Calculate the total price
  const totalPrice = Number(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  ).toFixed(2);

  // Store the total price in local storage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartTotal', totalPrice);
  }, [totalPrice]);
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="mt-5 text-center">
          <FontAwesomeIcon icon={faShoppingCart} size="4x" color="#e7c5c9" />
          <p className="mt-2" style={{ color: 'black', backgroundColor: 'transparent', fontWeight: '500' }}>Your Cart is Empty</p>
        </div>
      ) : (
        <>
          <ListGroup.Item className='my-3' style={{ fontSize: '1rem' }}> Your Cart: <b>{cartItems.length} items</b></ListGroup.Item>
          <div id="MainCart">
            <Card className="p-2 cart-card" style={{ height: "" }}>
              <div className="col-12">
                {cartItems.map((item) => (
                  <Fragment key={item._id}>
                    <div className="row ">
                      <div className="col-5">
                        <p className="" style={{ fontSize: '0.8rem' }}>{item.name}</p>
                      </div>
                      <div className="col-4">
                        {/* <p className="" style={{ fontSize: '0.8rem' }}>Qty: {item.quantity || 1}</p> */}
                        <div className="col-12 border">
                          <div className="row align-items-center "  style={{ cursor: 'pointer' }} >
                            <div className="d-flex  justify-content-between w-100" style={{ fontSize: '0.8rem' }}>
                              
                              <span
                                className="col-4 d-flex border justify-content-center"
                                onClick={() => handleMinus(item)}
                              >
                                -
                              </span>
                              <span className="col-4 d-flex border justify-content-center">
                                {item.quantity}
                              </span>
                              <span
                                className="col-4 d-flex border justify-content-center"
                                onClick={() => handleAdd(item)}
                              >
                                +
                              </span>
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className="col-3">
                        <p className="" style={{ fontSize: '0.8rem' }}>${item.price * item.quantity}</p>
                      </div>
                    </div>
                    <hr className="cart-divider" />
                  </Fragment>
                ))}
              </div>
              
            </Card>
            
          </div>
          <div id="order_summary" className='col-11 pt-2'>
                <p className="order-total">
                  Items total:{' '}
                  <span className="order-summary-values">
                    ${totalPrice}
                  </span>
                </p>
              </div>
        </>
      )}
    </>
  );
}
