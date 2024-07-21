
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import './ProductModal.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import CustomAlert from 'components/utilities/Alert';

const RestaurantSelection = () => {
  const [restaurantId, setRestaurantId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [branch, setBranch] = useState('');
  const [restaurant, setRestaurant] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const navigate = useNavigate();
  const generateDates = (numDays) => {
    const dates = [];
    const today = new Date();

    // const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < numDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
      dates.push(formattedDate);
    }

    return dates;
  };

  const availableDates = generateDates(7);
  const formatAddress = (address) => {
    return `${address.line1}, ${address.city}, ${address.state} - ${address.postalCode}, ${address.country}`;
  };

  const handleRestaurantIdChange = (e) => {
    const selectedRestaurantId = e.target.value;

    // Find the selected restaurant based on the restaurantId
    const selectedRestaurant = restaurant.find(
      (r) => r.restaurantId === parseInt(selectedRestaurantId, 10)
    );

    if (selectedRestaurant) {
      // Set the ZIP code as the restaurantId
      setRestaurantId(selectedRestaurantId);

      // Optionally, you can set the full address in a separate state variable
      const fullAddress = formatAddress(selectedRestaurant.address);
      setFullAddress(fullAddress);
      const branch = selectedRestaurant.restaurantBranch;
      setBranch(branch);
    }
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    // console.log(setSelectedDate);
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };

  const handleContinue = () => {
    if (restaurantId && selectedDate && selectedTimeSlot) {
      // Store data in localStorage
      localStorage.setItem('restaurantId', restaurantId);
      localStorage.setItem('selectedDate', JSON.stringify(selectedDate));
      localStorage.setItem(
        'selectedTimeSlot',
        JSON.stringify(selectedTimeSlot)
      );
      localStorage.setItem('Address', JSON.stringify(fullAddress));
      localStorage.setItem('branch', JSON.stringify(branch));
      localStorage.removeItem('cartItems');

      // Navigate to the menus page using useNavigate
      navigate(`/home`);
    } else {
      // Show an error toast message
      // alert('Please select restaurant, time and delivery date.');
      setAlert({ message: 'Please select restaurant, time and delivery date.', type: 'error' });
    }
  };

  useEffect(() => {
    // Fetch time slots from the API
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/api/restaurant/get');
        const restaurant = response.data.data;
        const latitude = restaurant[0].address.latitude;
        const longitude = restaurant[0].address.longitude;
        localStorage.setItem('restaurantLatitude', latitude);
        localStorage.setItem('restaurantLongitude', longitude);
        // const timeSlotsData = Array.isArray(response.data) ? response.data : [];
        // console.log(restaurant);
        setRestaurant(restaurant);
      } catch (error) {
        // console.error('Error fetching time slots:', error.message);
        // alert('Error fetching time slots');
        setAlert({ message: 'Error fetching Restaurants', type: 'error' });
      }
    };

    fetchRestaurants();
  }, [selectedDate]);
  useEffect(() => {
    // Fetch time slots from the API
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.post('/api/timeSlots', { restaurantId });
        const timeSlotsData = response.data.timeSlots;
        setTimeSlots(timeSlotsData);
      } catch (error) {
        // console.error('Error fetching time slots:', error.message);
        // alert('Error fetching time slots');
        setAlert({ message: 'Error fetching time slots', type: 'error' });
      }
    };

    if (restaurantId) {
      fetchTimeSlots();
    }
  }, [restaurantId]);
  return (
    <div className="OrdCard py-5 bg-white " >
      <Container>
        <Row>
          <Col
            lg={{ span: 6, offset: 3 }}
            md={{ span: 7, offset: 3 }}
            xs={12}
            sm={12}
          >
            <Card className=" mx-auto mt-lg-5 mt-md-2 py-3 CardImg114" id="CardBackIMg122">
            {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
              <Card.Body>
                <Card.Title className='my-3' id="CardTextLog">
                  <h5>Select Restaurant</h5>
                </Card.Title>
                <Form className="container">
                  <Form.Group controlId="formrestaurantId">
                    <p>
                      <Form.Select
                        id="CardTextLog"
                        style={{ backgroundColor: 'white', color: 'black' }}
                        value={restaurantId}
                        className="container"
                        onChange={handleRestaurantIdChange}
                        aria-label="Select ZIP Code"
                      >
                        <option className="container" value="">
                          Select a RestaurantBranch
                        </option>
                        {restaurant &&
                          restaurant.map((restaurant) => (
                            <option
                              style={{
                                backgroundColor: 'white',
                                color: 'black'
                              }}
                              className="container text-black"
                              key={restaurant._id}
                              value={restaurant.restaurantId}
                            >
                              {restaurant.restaurantBranch} -{' '}
                              {formatAddress(restaurant.address)}
                            </option>
                          ))}
                      </Form.Select>
                    </p>
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Body>
                <div className="modal-body">
                  <Card.Title>
                    <h5>Order Date</h5>
                  </Card.Title>
                  {/* You would generate the following buttons dynamically based on available dates */}
                  <div className="date-buttons my-2">
                    {availableDates.map((date) => (
                      <button
                        key={date}
                        className="text-black mx-2 my-2 p-2"
                        onClick={() => handleDateSelection(date)}
                        variant="outline-danger"
                        style={{
                          borderRadius: '10px',
                          backgroundColor:
                            selectedDate === date ? 'white' : 'transparent',
                          color: selectedDate === date ? 'black' : 'white',
                          border:
                            selectedDate === date
                              ? '2px solid orange'
                              : '1px solid #ccc'
                        }}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>
              </Card.Body>
              <Card.Body>
                <div className="modal-body">
                  <Card.Title id="CardTextLog">
                    <h5>Order Time</h5>
                  </Card.Title>
                  <p>
                    <Form.Select
                      style={{ backgroundColor: 'white', color: 'black' }}
                      id="CardTextLog"
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a time
                      </option>
                      {timeSlots.map((slot) => (
                        <option
                          key={slot._id}
                          value={slot.slot}
                          className="text-black"
                        >
                          {slot.slot}
                        </option>
                      ))}
                    </Form.Select>
                  </p>
                </div>
              </Card.Body>
              <div className="d-flex justify-content-end mb-4  px-4">
                <button
                  // className="btn my-global-button"
                   className='btn'
                  onClick={handleContinue}
                >
                  Continue
                  <FaArrowRight/>
                </button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RestaurantSelection;
