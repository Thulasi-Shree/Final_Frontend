
import { React, useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown, Stack } from 'react-bootstrap';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import './header.css';
import axios from 'axios'

const Header = () => {
  const pathname1 = window.location.pathname;
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const cartItemsFromStorage =
    JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, setCartItems] = useState(cartItemsFromStorage);
  const { token } = useParams();
  const navigate = useNavigate();
  const isloggedIn = localStorage.getItem('isloggedIn' || false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavbarToggle = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      document.cookie =
        'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      localStorage.clear();
      sessionStorage.clear();
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const getUserRole = () => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      return user.role;
    }
    return null;
  };

  const role = getUserRole();
  useEffect(() => {
    setNavbarExpanded(false);
  }, [navigate, token]);

  return (
    <Navbar
      expand="lg"
      className="container-fluid header-custom custom-navbar"
      id="header"
      style={{ backgroundColor: 'brown', color: 'black', }}
      expanded={navbarExpanded}
    >
       
      {/* {pathname1 === '/login' ||
      pathname1 === '/signup' ||
      pathname1 === '/password/forgot' ||
      pathname1 === '/login/otp' ||
      pathname1 === '/loginWithOtp' ||
      pathname1 === `/api/password/reset/:${token}` ? (
        <></>
      ) : ( */}
        <Container>
                 
      {/* <div className='mx-3'>
        {pathname1 !== '/' && (
          <Navbar.Brand>
            <Nav.Link as={Link} to="#" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} /> 
            </Nav.Link>
          </Navbar.Brand>
        )}
      </div> */}
          <Navbar.Brand className="col-md-1 ">
            <Nav.Link as={Link} to="/">
              <img
                src={require('../assets/img/grandIndiaLogo1.png')}
                alt="Grand India Logo"
                style={{ height: '40px', width: '130px' }}
              />
            </Nav.Link>
          </Navbar.Brand>  
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={handleNavbarToggle}
            style={{ border: '2px solid orange' }}
          >
            {' '}
            <FontAwesomeIcon icon={faBars} style={{ color: 'orange' }} />
          </Navbar.Toggle>
      
          <Navbar.Collapse id="responsive-navbar-nav">
       
            <Nav
              style={{ fontSize: '17px', fontWeight: '500', color: '#2a206b'}}
              className="col-md-7 col-lg-11 col-xl-10 mx-auto "
            >
              {isloggedIn === 'true' ? (
                <>
                  {role === 'user' && (
                    <>
                      <ul>
                        <li>
                          <NavLink to="/" id="HomeTag" style={{background: 'none'}} className="ms-lg-4">
                            Home
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            id="HomeTag"
                            className="ms-lg-4"
                            to="/select"
                            style={{background: 'none'}}
                          >
                            Order
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            id="HomeTag"
                            className="ms-lg-4"
                            to={`/myProfile/${user._id}`}
                          >
                            Profile
                          </NavLink>
                        </li>
                      </ul>
                    </>
                  )}
                  {role === 'admin' && (
                    <>
                      <ul>
                        <li>
                          <NavLink to="/" id="HomeTag" className="ms-lg-4">
                            Home
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/select"
                            id="HomeTag"
                            className="ms-lg-4"
                          >
                            Order
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            id="HomeTag"
                            className="ms-lg-4"
                            to={`/myProfile/${user._id}`}
                          >
                            Profile
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            id="HomeTag"
                            className="ms-lg-4"
                            to="/admin/dashboard"
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            id="HomeTag"
                            className="ms-lg-4"
                            to="/admin/orders"
                          >
                            <span>Active Orders</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            id="HomeTag"
                            className="ms-lg-4"
                            to="/admin/orderHistory"
                          >
                            Order History
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            id="HomeTag"
                            className="ms-lg-4"
                            as={Link}
                            to="/admin/menus"
                          >
                            Menus
                          </NavLink>
                        </li>
                      </ul>
                    </>
                  )}
                  {role === 'superAdmin' && (
                    <>
                      <ul>
                        <li>
                          <NavLink
                            to="/admin/dashboard"
                            id="HomeTag"
                            className="ms-lg-4"
                          >
                            <span>Dashboard</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            id="HomeTag"
                            className="ms-lg-4"
                            to="/admin/orders"
                          >
                            <span>Active Orders</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            id="HomeTag"
                            className="ms-lg-4"
                            to="/admin/menus"
                          >
                            <span>Menus</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            id="HomeTag"
                            className="ms-lg-4"
                            to="/admin/orderHistory"
                          >
                            <span>Order History</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            id="HomeTag"
                            className="ms-lg-4"
                            to="/admin/users"
                          >
                            <span>Users</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            id="HomeTag"
                            className="ms-lg-4"
                            to="/admin/restaurants"
                          >
                            <span>Restaurants</span>
                          </NavLink>
                        </li>
                      </ul>
                    </>
                  )}
                  <div
                    className="logout-login-buttons"
                    style={{ marginRight: '-5rem' }}
                  >
                    {!isLoggedIn ? (
                      <Nav.Link
                       
                        className="btn border rounded p-2 mx-auto"
                        onClick={handleLogout}
                      >
                        Logout
                      </Nav.Link>
                    ) : (
                      <>
                        <Stack direction="horizontal" gap={3} />
                        <Nav.Link
                        
                          className="btn border rounded p-2 mx-auto"
                          as={Link}
                          to="/login"
                        >
                          Login
                        </Nav.Link>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <ul>
                    <li>
                      <NavLink to="/" id="HomeTag" className="ms-lg-4">
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/select" className="ps-lg-4" id="HomeTag">
                        Order
                      </NavLink>
                    </li>
                  </ul>
                  <div
                    className="logout-login-buttons "
                    style={{ marginRight: '-5rem' }}
                  >
                    <Stack direction="horizontal" gap={3} />
                    {isLoggedIn ? (
                      <Nav.Link
                        className="btn border rounded p-2 mx-auto"
                        onClick={handleLogout}
                      >
                        Logout
                      </Nav.Link>
                    ) : (
                      <Nav>
                        <Stack direction="horizontal" gap={3} />
                        <Nav.Link
                          style={{
                            width: '100px',
                            textAlign: 'center',
                            display: 'inline-block'

                          }}
                          className="btn border rounded p-2 mx-auto mt-lg-n1"
                          as={Link}
                          to="/login"
                        >
                          Login
                        </Nav.Link>
                      </Nav>
                    )}
                  </div>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      {/* )} */}
    </Navbar>
  );
};
export default Header;
