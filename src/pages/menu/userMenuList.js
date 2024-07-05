import React, { useState, useEffect } from 'react';
import { Button, Col, Badge } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './userMenuList.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const MenuList = ({ menus, searchTerm, handleSearchChange }) => {
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [animationId, setAnimationId] = useState(null);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const initialQuantities = storedCartItems.reduce((acc, item) => {
      acc[item._id] = Number(item.quantity);
      return acc;
    }, {});
    setQuantities(initialQuantities);
    setCartItems(storedCartItems);
  }, [cartItems]);

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
  return (
    <div className='bg-white'>
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
                  <Row noGutters>
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
                            className=" bg-white border  border-danger text-center py-2 pb-4"
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
  );
};
export default MenuList;