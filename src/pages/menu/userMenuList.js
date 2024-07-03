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

const MenuList = ({ menus, searchTerm, handleSearchChange, handleShow }) => {
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
    <Col
      lg={{ span: 4, offset: 4 }}
      md={{ span: 6, offset: 3 }}
      sm={{ span: 10, offset: 1 }}
      xs={12}
    >
      <div className="search-container">
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
        <Row id="RowFourthComp" xs={12} sm={2} lg={3} xl={4} md={3} className="mt-5">
          {menus.map((menuItem) => (
            <Col key={menuItem._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="menu-card">
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
                <Card.Body>
                  <Card.Title className="text-center card-title">
                    {menuItem.name}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-center card-subtitle">
                    ${menuItem.price}
                  </Card.Subtitle>
                  <Card.Text className="text-center card-text">
                    {menuItem.mealTypeCategory}
                  </Card.Text>
                  <Card.Text className="text-center card-text">
                    {menuItem.description}
                  </Card.Text>
                  {quantities[menuItem._id] ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <Button
                        className="quantity-button"
                        onClick={() => handleMinus(menuItem)}
                      >
                        -
                      </Button>
                      <span className="quantity-text">
                        {quantities[menuItem._id]}
                      </span>
                      <Button
                        className="quantity-button"
                        onClick={() => handleAdd(menuItem)}
                      >
                        +
                      </Button>
                    </div>
                  ) : (
                    <Button
                      id="cart_btn"
                      disabled={!menuItem.isAvailable}
                      onClick={() => handleAddToCartClick(menuItem)}
                      className="btn add-to-cart-btn"
                    >
                      {!menuItem.isAvailable ? (
                        <h6>Sold Out</h6>
                      ) : (
                        <h6>Add to Cart</h6>
                      )}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* View Cart Button */}
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
