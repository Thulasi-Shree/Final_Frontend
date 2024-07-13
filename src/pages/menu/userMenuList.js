import React, { useState, useEffect, Fragment } from 'react';
import { Button, Col, Badge, ListGroup } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './userMenuList.css';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Cart from 'pages/cart/cartDetails';

const MenuList = ({ menus, searchTerm, handleSearchChange }) => {
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [animationId, setAnimationId] = useState(null);
  const branch = localStorage.getItem('branch');
  const address = localStorage.getItem('Address');
  const date = localStorage.getItem('selectedDate');
  const [screenSize, setScreenSize] = useState('large');

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const initialQuantities = storedCartItems.reduce((acc, item) => {
      acc[item._id] = Number(item.quantity);
      return acc;
    }, {});
    setQuantities(initialQuantities);
    setCartItems(storedCartItems);
  }, []);

  const updatelocalStorage = (updatedCartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const handleAdd = (menuItem) => {
    if (menuItem.isAvailable === false) return;

    const updatedQuantities = {
      ...quantities,
      [menuItem._id]: (quantities[menuItem._id] || 0) + 1
    };
    setQuantities(updatedQuantities);

    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem._id === menuItem._id) {
        return { ...cartItem, quantity: (cartItem.quantity || 0) + 1 };
      }
      return cartItem;
    });
    updatelocalStorage(updatedCartItems);
  };

  const handleMinus = (item) => {
    if (item.isAvailable === false) return;

    const updatedQuantities = {
      ...quantities,
      [item._id]: Math.max((quantities[item._id] || 0) - 1, 0)
    };

    setQuantities(updatedQuantities);

    let updatedCartItems;

    if (updatedQuantities[item._id] === 0) {
      updatedCartItems = cartItems.filter(
        (cartItem) => cartItem._id !== item._id
      );
    } else {
      updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          return {
            ...cartItem,
            quantity: Math.max((cartItem.quantity || 0) - 1, 0)
          };
        }
        return cartItem;
      });
    }

    updatelocalStorage(updatedCartItems);
  };

  const handleAddToCartClick = (menuItem) => {
    const updatedQuantities = {
      ...quantities,
      [menuItem._id]: 1
    };
    setQuantities(updatedQuantities);

    const updatedCartItems = [...cartItems, { ...menuItem, quantity: 1 }];
    updatelocalStorage(updatedCartItems);
    setAnimationId(menuItem._id);
    setTimeout(() => setAnimationId(null), 1000); // Remove animation class after 1000ms
  };
  const totalPrice = Number(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  ).toFixed(2);

  const handleDelete = (menuItem) => {
    const updatedCartItems = cartItems.filter(
      (item) => item._id !== menuItem._id
    );

    updatelocalStorage(updatedCartItems);

    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[menuItem._id];
      return updatedQuantities;
    });
  };
  const handleResize = () => {
    if (window.innerWidth <=992) {
      setScreenSize('small');
    } else {
      setScreenSize('large');
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Check the size on initial render
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className='bg-white row'>
      <div className=' col-12 col-xl-8 col-md-12 col-lg-7 '>
        <Col className='col-11 mx-auto'>
          <div className="search-container mb-3">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search menus..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </Col>
        <div className='col-12'>
          {menus.length === 0 ? (
            <div className="no-menus-found">
              <p>No menus found.</p>
            </div>
          ) : (
            <Container className='bg-white'>
              <Row id="RowFourthComp">
                {menus.map((menuItem) => (
                  <Col key={menuItem._id} className="col-xl-6 col-12">
                    <Card className={`menu-card mb-3 ${animationId === menuItem._id ? 'move-to-cart-animation' : ''}`}>
                      <Row >
                        <Col xs={6}>
                          <Card.Img
                            variant="top"
                            src={
                              menuItem.images.length > 0
                                ? menuItem.images[0].image
                                : 'https://via.placeholder.com/285x200'
                            }
                            alt={menuItem.name}
                            className="card-img"
                          />
                        </Col>
                        <Col xs={6}>
                          <div className='p-2'>
                            <div className='row'>
                              <div className='col-8' style={{ fontSize: '1rem' }}>{menuItem.name}</div>
                              <div className="col-4" style={{ fontSize: '0.9rem', color: 'red' }}>${menuItem.price}</div>
                            </div>

                            <div style={{ fontSize: '0.9rem' }}>{menuItem.mealTypeCategory}</div>
                            <div className="mb-2" style={{ fontSize: '0.8rem' }}>{menuItem.description}</div>
                            {quantities[menuItem._id] ? (
                              <div className="d-flex justify-content-center align-items-center">
                                <button
                                  className="quantity-button"
                                  onClick={() => handleMinus(menuItem)}
                                >
                                  -
                                </button>
                                <span style={{ fontSize: '0.9rem' }} className="quantity-text">
                                  {quantities[menuItem._id]}
                                </span>
                                <button
                                  className="quantity-button"
                                  onClick={() => handleAdd(menuItem)}
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                id="cart_btn"
                                disabled={!menuItem.isAvailable}
                                onClick={() => handleAddToCartClick(menuItem)}
                                className=" bg-white border  border-warning text-center py-2 pb-4"
                                style={{ width: '70%', height: '25px', borderRadius: '10px' }}
                              >
                                {!menuItem.isAvailable ? (
                                  <> Sold Out</>
                                ) : (
                                  <>Add to Cart</>
                                )}
                              </button>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>

              <div className="view-cart-button-container mx-auto">
                <Button
                  as={Link}
                  to="/cart"
                  className="view-cart-button d-flex justify-content-center align-items-center mx-auto px-3"
                >
                  <div className="cart-items-count col-auto">
                    {cartItems && cartItems.length > 1 ? (
                      <div>{cartItems.length} items added</div>
                    ) : (
                      <div>{cartItems.length} item added</div>
                    )}
                  </div>
                  <div className="view-cart-text col-auto">View cart</div>
                </Button>
              </div>
            </Container>
          )}
        </div>
      </div>
      {screenSize === 'large' ? 
      (<aside className="fixed-aside mx-auto col-lg-5 col-xl-4" >
        <Card className='p-3 delivery-card' style={{ fontSize: '1rem' }}>
          <Card.Header className='delivery-card-header' style={{ fontSize: '1.2rem' }}>
            <p className='delivery-card-title' style={{ fontSize: '1.2rem' }}>Delivery Information</p>
          </Card.Header>
          <Card.Body>
            <div className="delivery-info" style={{ fontSize: '1rem' }}>
              <b>Branch:</b> {branch}
            </div>
            <div className="delivery-info" style={{ fontSize: '1rem' }}>
              <b>Date:</b> {date}
            </div>
          </Card.Body>
          <div className="cart-items">
            {/* <Cart
                      handleAdd={handleAdd}
                      handleMinus={handleMinus}
                    /> */}
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
                                  <div className="row align-items-center " style={{ cursor: 'pointer' }} >
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
          </div>
        </Card>
      </aside>) : (null)}
    </div>
  );
};
export default MenuList;