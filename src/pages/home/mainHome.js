import React, { useState, useEffect } from 'react';
import { Button, Card, ListGroup, Modal } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import MenuList from '../menu/userMenuList';
import FilterPanel from '../menu/FilterPanel';
// import './home.css';
import Cart from 'pages/cart/cartDetails';
import CustomAlert from 'components/utilities/Alert';

const Home = () => {
  const branch = localStorage.getItem('branch');
  const address = localStorage.getItem('Address');
  const date = localStorage.getItem('selectedDate');
  const selectedBranch = localStorage.getItem('restaurantId');
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, setCartItems] = useState(storedCartItems);
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [localQuantities, setLocalQuantities] = useState(
    storedCartItems.reduce((acc, item) => {
      acc[item._id] = Number(item.quantity);
      return acc;
    }, {})
  );
  const [quantities, setQuantities] = useState({});
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [productsCount, setProductsCount] = useState(0);
  const [resPerPage, setResPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [mealTypeCategory, setMealTypeCategory] = useState(null);
  const [dietaryPreferenceCategory, setDietaryPreferenceCategory] =
    useState(null);
  const [dietaryCategories, setDietaryCategories] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [items, setItems] = useState(0);
  const [screenSize, setScreenSize] = useState('large');

  const handleResize = () => {
    if (window.innerWidth <= 992) {
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

  useEffect(() => {
    const handleStorage = () => {
      const items = JSON.parse(localStorage.getItem('cartItems'));
      // console.log(items);
      if (items) {
        setItems(items.length);
        // console.log(items);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [items.length]);

  const handleAddToCart = (menuItem) => {
    // Check if menuItem is defined and has an _id property
    if (!menuItem || !menuItem._id) {
      // console.error('Invalid menuItem:', menuItem);
      return;
    }

    // Check if the item is already in the cart
    const existingCartItem = cartItems.find(
      (item) => item._id === menuItem._id
    );

    if (existingCartItem) {
      return;
    }
    const updatedCartItems = [
      ...cartItems,
      { ...menuItem, quantity: cartItems.quantity || 1 }
    ];
    setCartItems(updatedCartItems);

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    const items = JSON.parse(localStorage.getItem('cartItems'));
    if (items) {
      setItems(items.length);
    }
  };
  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };

  const handleViewDetails = (selectedMenu) => {
    setSelectedMenuItem(selectedMenu);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [show, setShow] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const getProducts = async (
    keyword,
    dietaryPreferenceCategory,
    mealTypeCategory,
    currentPage
  ) => {
    try {
      setLoading(true);
      let link = `/api/products?restaurantId=${selectedBranch}&page=${currentPage}`;
      if (keyword) {
        link += `&keyword=${keyword}`;
      }
      if (mealTypeCategory) {
        link += `&mealTypeCategory=${mealTypeCategory}`;
      }
      if (dietaryPreferenceCategory) {
        link += `&dietaryPreferenceCategory=${dietaryPreferenceCategory}`;
      }
      const response = await axios.get(link);
      setMenus(response.data.Menus);
      setProductsCount(response.data.Count);
      setResPerPage(response.data.resPerPage);
      setLoading(false);
    } catch (error) {
      // console.error('Error fetching menus:', error);
      setLoading(false);
      // toast.warning('No menus available!', {
      //   position: toast.POSITION.BOTTOM_CENTER,
      //   autoClose: 3000
      // });
      setMealTypeCategory(null);
      setDietaryPreferenceCategory(null);
    }
  };

  const handleClearFilter = () => {
    setMealTypeCategory(null);
    setDietaryPreferenceCategory(null);
  };

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchTerm('');
  };

  const handleAdd = (item) => {
    if (item.isAvailable === false) return;

    const updatedQuantities = {
      ...localQuantities,
      [item._id]: (localQuantities[item._id] || 0) + 1
    };

    setLocalQuantities(updatedQuantities);

    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem._id === item._id) {
        return { ...cartItem, quantity: (cartItem.quantity || 0) + 1 };
      }
      return cartItem;
    });

    setCartItems(updatedCartItems);

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('localQuantities', JSON.stringify(updatedQuantities));
  };

  const handleMinus = (item) => {
    if (item.isAvailable === false) return;

    const updatedQuantities = {
      ...localQuantities,
      [item._id]: Math.max((localQuantities[item._id] || 0) - 1, 0)
    };

    setLocalQuantities(updatedQuantities);

    const updatedCartItems = cartItems
      .map((cartItem) => {
        if (cartItem._id === item._id) {
          return {
            ...cartItem,
            quantity: Math.max((cartItem.quantity || 0) - 1, 0)
          };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.quantity > 0);
    setCartItems(updatedCartItems);

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('localQuantities', JSON.stringify(updatedQuantities));
  }


  const handleDelete = (itemId) => {
    try {
      const storedCartItem =
        JSON.parse(localStorage.getItem('cartItems')) || [];
      const updatedCartItems = storedCartItem.filter(
        (item) => item._id !== itemId
      );

      // Update state
      setLocalQuantities((prevQuantities) => {
        const { [itemId]: _, ...rest } = prevQuantities;
        return rest;
      });
      setCartItems(updatedCartItems);

      // Update localStorage
      if (updatedCartItems.length === 0) {
        localStorage.removeItem('cartItems');
      } else {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      }
    } catch (error) {
      // console.error('Error deleting item:', error.message);
      // alert('Error deleting item');
      setAlert({ message: 'Error deleting item!', type: 'error' });

    }
  };
  const checkoutHandler = () => {
    const cartItemsTotal = cartItems.reduce((acc, item) => {
      const quantity = item.quantity || 1; // Use item.quantity directly
      const price = Number(item.price);
      const subtotal = quantity * price;
      // console.log(`Item: ${item._id}, Subtotal: ${subtotal}`);
      return acc + subtotal;
    }, 0);

    if (cartItemsTotal > 0) {
      localStorage.setItem('cartItemsTotal', JSON.stringify(cartItemsTotal));
      navigate('/shippingInfo');
    } else {
      // toast.error('Cannot proceed to checkout with an empty cart.');
    }
  };
  // const returnBack = () => {
  //   getProducts();
  // };

  useEffect(() => {
    if (storedCartItems.length > 0) {
      handleDelete();
    }
  }, [storedCartItems.length]);

  useEffect(() => {
    getProducts(
      searchTerm,
      dietaryPreferenceCategory,
      mealTypeCategory,
      currentPage
    );
  }, [
    currentPage,
    searchTerm,
    mealTypeCategory,
    dietaryPreferenceCategory,
    branch
  ]);
  const handlegoback = () => {
    navigate(-1);
  }
  useEffect(() => {
    axios
      .get('/api/dietary-preferences')
      .then((response) => setDietaryCategories(response.data.data))
      .catch((error) =>
        // console.error('Error fetching dietary categories:', error)
        // alert('Error fetching dietary categories')
        setAlert({ message: 'Error fetching dietary categories', type: 'error' })

        
      );

    axios
      .get('/api/meal-types')
      .then((response) => setMealCategories(response.data.data))
      .catch((error) =>
        // console.error('Error fetching meal categories:', error)
        // alert('Error fetching meal categories')
        setAlert({ message: 'Error fetching meal categories', type: 'error' })
        
      );
  }, []);

  return (
    <>
      {screenSize === 'small' ? (
        <div className='bg-white'>
          <div className=" bg-white">
            <button
              className=" my-2 text-center bg-transparent mx-3  mt-4"
              onClick={handleShow}
              style={{
                position: 'sticky',
                border: 'none',
                top: 4,
                zIndex: 100
              }}
            >
              <FontAwesomeIcon
                className=" btn filter-icon-fa  mx-auto"
                icon={faFilter}
                style={{
                  position: 'sticky',
                  height: '1.5rem',
                  zIndex: 100
                }}
              />
            </button>

            <Container fluid>
              <Row>
                {showFilterPanel && (
                  <Col xs={12} sm={12} md={3} lg={3} className="mb-5">
                    <FilterPanel
                      dietaryCategories={dietaryCategories}
                      mealCategories={mealCategories}
                      mealTypeCategory={mealTypeCategory}
                      setMealTypeCategory={setMealTypeCategory}
                      dietaryPreferenceCategory={dietaryPreferenceCategory}
                      setDietaryPreferenceCategory={setDietaryPreferenceCategory}
                      handleClearFilter={handleClearFilter}
                    />
                  </Col>
                )}
                <Col xs={12} sm={12} md={showFilterPanel ? 9 : 9} lg={showFilterPanel ? 9 : 12} className="mb-5 mx-auto">
                {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
                  <MenuList
                    menus={menus}
                    handleViewDetails={handleViewDetails}
                    handleAddToCart={handleAddToCart}
                    handleSearchChange={handleSearchChange}
                    handleSearchSubmit={handleSearchSubmit}
                    handlePageChange={handlePageChange}
                    searchTerm={searchTerm}
                    handleCloseModal={handleCloseModal}
                    showModal={showModal}
                    show={showModal}
                    onHide={handleCloseModal}
                    selectedMenuItem={selectedMenuItem}
                  />
                </Col>
              </Row>
              <div className="col-12 d-flex justify-content-center">
                <button
                  id="checkout_btn"
                  onClick={handlegoback}
                  className="btn my-4 ms-md-5"
                  style={{ background: 'rgb(249, 233, 233)', color: 'black', border: 'red' }}
                >
                  Back to Select
                </button>
              </div>
              <Modal
                show={showModal}
                onHide={handleClose}
                className="CardImg12 modal fade bg-transparent"
                style={{ backgroundColor: 'transparent' }}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Filter Panel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <FilterPanel
                    dietaryCategories={dietaryCategories}
                    mealCategories={mealCategories}
                    mealTypeCategory={mealTypeCategory}
                    setMealTypeCategory={setMealTypeCategory}
                    dietaryPreferenceCategory={dietaryPreferenceCategory}
                    setDietaryPreferenceCategory={setDietaryPreferenceCategory}
                    handleClearFilter={handleClearFilter}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="btn"
                    style={{ background: 'rgb(249, 233, 233)', color: 'black', border: 'red' }}
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Container>
          </div>
        </div>

      ) : (
        <div className="container-fluid mt-4">
          <Col md={12} lg={12} xs={12} sm={12}>
            <div className="row bg-white">
              <aside className="sidebar col-md-3 col-xl-2 col fixed-sidebar">
                <Card style={{ fontSize: '1rem' }}>
                  <Card.Body>
                    <Card.Header className="delivery-card-header" style={{ fontSize: '1.2rem' }}>
                      <p className="delivery-card-title mb-2" style={{ fontSize: '1.2rem' }}>Categories</p>
                    </Card.Header>
                    <ListGroup className="mt-2">
                      <ListGroup.Item style={{ fontSize: '1rem', textAlign: "center" }}>All</ListGroup.Item>
                      <FilterPanel
                        dietaryCategories={dietaryCategories}
                        mealCategories={mealCategories}
                        mealTypeCategory={mealTypeCategory}
                        setMealTypeCategory={setMealTypeCategory}
                        dietaryPreferenceCategory={dietaryPreferenceCategory}
                        setDietaryPreferenceCategory={setDietaryPreferenceCategory}
                        handleClearFilter={handleClearFilter}
                      />
                    </ListGroup>
                  </Card.Body>
                </Card>
              </aside>
              <div className="main-content col col-xl-10 col-md-9" style={{ height: '90vh', overflow: 'auto' }}>
                <MenuList
                  menus={menus}
                  handleViewDetails={handleViewDetails}
                  handleAddToCart={handleAddToCart}
                  handleSearchChange={handleSearchChange}
                  handleSearchSubmit={handleSearchSubmit}
                  handlePageChange={handlePageChange}
                  searchTerm={searchTerm}
                  handleCloseModal={handleCloseModal}
                  showModal={showModal}
                  show={showModal}
                  onHide={handleCloseModal}
                  selectedMenuItem={selectedMenuItem}
                />
              </div>
              {/* <aside className="col-md-4 col-lg-4 col-xl-3 col-12" style={{ height: "90vh" }}>
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
                    <Cart
                      handleAdd={handleAdd}
                      handleMinus={handleMinus}
                    />
                  </div>
                </Card>
              </aside> */}
            </div>
          </Col>
        </div>
      )}
    </>
  );
};

export default Home;

