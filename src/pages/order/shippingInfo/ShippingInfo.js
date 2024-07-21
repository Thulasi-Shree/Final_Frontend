/* eslint-disable no-alert */
/* eslint-disable no-useless-catch */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PersonalDetails from './PersonalDetails';
import OrderDetails from './OrderDetails';
import DeliveryAddress from './DeliveryAddress';
import { getDistance } from 'geolib';
import BillingAddress from './BillingAddress';
import CryptoJS from 'crypto-js';
import './ShippingInfo.css';
import CustomAlert from 'components/utilities/Alert';

const ShippingInfo1 = () => {
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(localStorage.getItem('isloggedIn'));
  const delivery = JSON.parse(localStorage.getItem('deliveryAddress') || '{}');
  const order = JSON.parse(localStorage.getItem('orderType')|| '{}');
  const orderInstruction = JSON.parse(localStorage.getItem('orderNotes' || ''));
  const billing = JSON.parse(localStorage.getItem('billingAddress') || '{}');
  const user = JSON.parse(localStorage.getItem('user'));
  const restaurantLongitude = JSON.parse(localStorage.getItem('restaurantLongitude'));
  const restaurantLatitude = JSON.parse(localStorage.getItem('restaurantLatitude'));
  const [enteredOtp, setOtp] = useState('');
  const [orderType, setOrderType] = useState(order || '');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [streetAddress, setStreetAddress] = useState(
    (delivery && delivery.streetAddress) ||
    (billing && billing.streetAddress) ||
    ''
  );
  const [city, setCity] = useState(delivery.city || billing.city || '');
  const [country, setCountry] = useState('US');
  const [state, setState] = useState(delivery.state || billing.state || '');
  const [postal_code, setPostal_code] = useState(delivery.postal_code ||'');
  const [textBox1, setTextBox1] = useState(orderInstruction || '');
  const [textBox2, setTextBox2] = useState(orderInstruction || '');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [locationApi, setLocationApi] = useState(null);
  const [deliveryKm, setDeliveryKm] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [locationApi1, setLocationApi1] = useState(null);
  const [name, setFirstName] = useState(isLoggedIn ? user.name : '');
  const [lastName, setLastName] = useState(isLoggedIn ? user.lastName : '');
  const [email, setEmail] = useState(isLoggedIn ? user.email : '');
  const [deliveryVerified, setDeliveryVerified] = useState(false);
  const [billingVerified, setBillingVerified] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [distanceResult, setDistanceResult] = useState(null);
  const [toastShown, setToastShown] = useState(false);
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null
  });
  const [billingCoordinates, setBillingCoordinates] = useState({
    latitude: null,
    longitude: null
  });
  const [userLocation, setUserLocation] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(
    isLoggedIn ? user.phone : ''
  );
  const [errors, setErrors] = useState({});
  const lat = JSON.parse(localStorage.getItem('lat'));
  const lng = JSON.parse(localStorage.getItem('lng'));
  const [time, setTime] = useState(null);
  const location = useLocation();
  const oldState = location.state;

 
  const handleTimeChange = (newTime) => {
    setTime(newTime);
    // console.log(time);
  };
  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };

  // Function to handle user name change
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  // Function to handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleTimeSlotChange = (e) => {
    const selectedSlot = e.target.value;
    setSelectedTimeSlot(selectedSlot);
    localStorage.setItem('selectedTimeSlot', JSON.stringify(selectedSlot));
  };

  // Function to handle mobile number change
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleText1 = (e) => {
    const orderNotes = e.target.value;
    setTextBox1(orderNotes);
    localStorage.setItem('orderNotes', JSON.stringify(orderNotes));
  };
  const handleText2 = (e) => {
    const deliveryInstruction = e.target.value;
    setTextBox2(deliveryInstruction);
    localStorage.setItem(
      'deliveryInstruction',
      JSON.stringify(deliveryInstruction)
    );
  };
  // Function to handle order type change
  const handleOrderTypeChange = (e) => {
     setBillingVerified(false);
     setDeliveryVerified(false);
    const selectedOrderType = e.target.value;
    localStorage.setItem('orderType', JSON.stringify(selectedOrderType));
    setOrderType(selectedOrderType);
  };

  // Function to handle street address change
  const handleStreetAddressChange = (e) => {
    setStreetAddress(e.target.value);
  };

  // Function to handle city change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  // Function to handle state change
  const handleStateChange = (e) => {
    setState(e.target.value);
  };
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Function to handle ZIP code change
  const handleZipCodeChange = (e) => {
    setPostal_code(e.target.value);
  };
  const handleConfirmOtp = async () => {
    try {
      const encryptedOtp = CryptoJS.AES.encrypt(
        enteredOtp,
        'ghjdjdgdhddjjdhgdcdghww#hsh536'
      ).toString();
      const apiUrl = '/api/verify/otp';
     

      const response = await axios.post(apiUrl, {
        email: emailOrMobile,
        mobile: emailOrMobile,
        enteredOtp : encryptedOtp
      });

      if (response.data.success) {
        // console.log('OTP verified successfully');
        // alert('OTP verified successfully');
        setAlert({ message: 'OTP verified successfully! ', type: 'success' });

        localStorage.setItem('emailOrMobile', JSON.stringify(emailOrMobile));
        setOtpVerified(true);
      } else {
        // alert(`OTP verification failed!`);
        setAlert({ message: 'OTP verification failed!', type: 'success' });

      }
    } catch (error) {
      // alert(`OTP verification failed!`);
      setAlert({ message: `OTP verification failed!`, type: 'error' });

    }
  };
  const handleEmailOrMobileChange = (e) => {
    setEmailOrMobile(e.target.value);
  };

  const handleGetOtp = async () => {
    try {
      const apiUrl = '/api/send/otp';
      const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        emailOrMobile
      );
      console.log(isEmail);
      // /\S+@\S+\.\S+/
      const isPhone = /^\d{10}$/.test(emailOrMobile);

      // Send the request to get OTP
      await axios.post(apiUrl, {
        email: isEmail ? emailOrMobile : undefined,
        mobile: isPhone ? emailOrMobile : undefined
      });

      // alert('OTP sent successfully!');
      setAlert({ message: 'OTP sent successfully!', type: 'success' });

      setIsOtpSent(true);
    } catch (error) {
      // console.error('Error sending OTP:', error);
      // alert(`Error sending OTP!`);
      setAlert({ message: `Error sending OTP!`, type: 'error' });

    }
  };
  const [sameAsDelivery, setSameAsDelivery] = useState(false);
  const [billingStreetAddress, setBillingStreetAddress] = useState(billing.streetAddress|| '');
  const [billingpostal_code, setBillingpostal_code] = useState(billing.postalCode || billing.postal_code || '');
  const [billingCity, setBillingCity] = useState(billing.city || '');
  const [billingState, setBillingState] = useState(billing.state || '');
  const [billingCountry, setBillingCountry] = useState('US');
  const handleSameAsDeliveryChange = () => {
    setSameAsDelivery(!sameAsDelivery);

    if (!sameAsDelivery) {
      // If the user selects "Same as Delivery," auto-populate billing address
      setBillingStreetAddress(streetAddress);
      setBillingpostal_code(postal_code);
      setBillingCity(city);
      setBillingState(state);
      setBillingCountry(country);
    } else {
      // If the user unselects "Same as Delivery," clear the billing address
      setBillingStreetAddress('');
      setBillingpostal_code('');
      setBillingCity('');
      setBillingState('');
      // setBillingCountry('');
      localStorage.removeItem('billingAddress');
    }
  };
  const handleDeliveryBillingAddressChange = async (event) => {
    const fullBillingAddress = `${billingStreetAddress}, ${billingCity}, ${billingState}, ${billingpostal_code}, ${billingCountry}`;

    const geocodeBillingAddressToCoordinates = async (address) => {
      try {
        const encodedAddress = encodeURIComponent(address);
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${locationApi1}`
        );

        if (!response.data.features || response.data.features.length === 0) {
          throw new Error(
            'Coordinates not found for the given billing address'
          );
        }

        const firstFeature = response.data.features[0];
        const { lat, lon } = firstFeature.properties;

        localStorage.setItem('billingLat', JSON.stringify(lat));
        localStorage.setItem('billingLng', JSON.stringify(lon));
        setBillingVerified(true);

        return { latitude: lat, longitude: lon };
      } catch (error) {
        // toast.error('Error geocoding billing address');
        setBillingVerified(false);
        throw error;
      }
    };

    try {
      const billingCoordinates = await geocodeBillingAddressToCoordinates(
        fullBillingAddress
      );
      setBillingCoordinates(billingCoordinates);
    } catch (error) {
      // console.error('Error getting billing coordinates:', error.message);
      // alert('Enter the correct address!');
      setAlert({ message: 'Enter the correct address!', type: 'error' });

      // Handle errors for billing address coordinates
    }
  };
  const handleBillingAddressChange = async (event) => {
    event.preventDefault();

    const fullBillingAddress = `${streetAddress}, ${city}, ${state}, ${postal_code}, ${country}`;

    const geocodeBillingAddressToCoordinates = async (address) => {
      try {
        const encodedAddress = encodeURIComponent(address);
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${locationApi1}`
        );

        if (!response.data.features || response.data.features.length === 0) {
          throw new Error(
            'Coordinates not found for the given billing address'
          );
        }

        const firstFeature = response.data.features[0];
        const { lat, lon } = firstFeature.properties;
        setBillingVerified(true);
        localStorage.setItem('billingLat', JSON.stringify(lat));
        localStorage.setItem('billingLng', JSON.stringify(lon));

        return { latitude: lat, longitude: lon };
      } catch (error) {
        throw error;
      }
    };

    try {
      const billingCoordinates = await geocodeBillingAddressToCoordinates(
        fullBillingAddress
      );

      setBillingCoordinates(billingCoordinates);
    } catch (error) {
      setBillingVerified(false);
      // alert('Please enter the address correctly');
      setAlert({ message: 'Please enter the address correctly', type: 'error' });

      // Handle the error accordingly, you might want to set an error state
    }
  };
  const handleDeliveryAddressChange = async (event) => {
    event.preventDefault();
  
    const fullDeliveryAddress = `${streetAddress}, ${city}, ${state}, ${postal_code}, ${country}`;
  
    const geocodeDeliveryAddressToCoordinates = async (address) => {
      try {
        const encodedAddress = encodeURIComponent(address);
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${locationApi1}`
        );
  
        if (!response.data.features || response.data.features.length === 0) {
          throw new Error('Coordinates not found for the given delivery address');
        }
  
        const firstFeature = response.data.features[0];
        const { lat, lon } = firstFeature.properties;
        setDeliveryVerified(true);
        localStorage.setItem('deliveryLat', JSON.stringify(lat));
        localStorage.setItem('deliveryLng', JSON.stringify(lon));
  
        return { latitude: lat, longitude: lon };
      } catch (error) {
        throw error;
      }
    };
  
    try {
      const deliveryCoordinates = await geocodeDeliveryAddressToCoordinates(
        fullDeliveryAddress
      );
      
      const restaurantCoordinates = {
        latitude: restaurantLatitude,
        longitude: restaurantLongitude
      };
  
      const distance = getDistance(restaurantCoordinates, deliveryCoordinates);
      const distanceInKm = distance / 1000;
      console.log(distanceInKm);
      setDistanceResult(distanceInKm);
  
      if (distanceInKm <= deliveryKm) {
        // alert(`Order Available for your location!`);
        setAlert({ message: `Order Available for your location!`, type: 'success' });

        setDeliveryVerified(true);
      } else {
        setDeliveryVerified(false);
        // alert(`Delivery address is too far. Maximum delivery distance is ${deliveryKm} km.`);
        setAlert({ message: `Delivery address is too far. Maximum delivery distance is ${deliveryKm} km.`, type: 'success' });

      }
  
      setCoordinates(deliveryCoordinates);
    } catch (error) {
      setDeliveryVerified(false);
      // alert('Please enter the address correctly');
      setAlert({ message: 'Please enter the address correctly', type: 'error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addressData = {
        orderType,
        name,
        lastName,
        email,
        mobileNumber,
        textBox1,
        textBox2
      };
      if (orderType === 'Pickup') {
        await handleBillingAddressChange(e);
      } else {
        await handleDeliveryBillingAddressChange(e);
        // await handleButtonClick();
      }
      if (orderType === 'Delivery') {
        await handleDeliveryAddressChange(e);
      } else {
        await handleDeliveryBillingAddressChange(e);
        // await handleButtonClick();
      }

      localStorage.setItem('shippingInfo', JSON.stringify(addressData));
    } catch (error) {
      // Handle other errors
      console.error('Error submitting form:', error);
      // alert('Error submitting form. Please try again later.');
      setAlert({ message: 'Error submitting form. Please try again later.', type: 'error' });
    }
  };
   useEffect(() => {
    // Fetch time slots from the API
    const fetchTimeSlots = async () => {
      try {
        const restaurantId = JSON.parse(localStorage.getItem('restaurantId'));
        const response = await axios.post('/api/timeSlots', { restaurantId });
        const timeSlotsData = response.data.timeSlots;
        setTimeSlots(timeSlotsData);
      } catch (error) {
        // console.error('Error fetching time slots:', error.message);
        // alert('Error fetching time slots');
        setAlert({ message: 'Error fetching time slots', type: 'error' });
      }
    };
    const fetchdata = async () => {
      try {
        const response = await axios.get(`/api/admin/settings/get`);
        setDeliveryKm(response.data.data[0].deliveryKm);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        // alert('Error fetching delivery & tax charges');
        setAlert({ message: 'Error fetching delivery & tax charges', type: 'error' });
      }
    };

    fetchdata();

    fetchTimeSlots();
  }, [deliveryKm]);
  
  useEffect(() => {
    // Fetch encrypted API keys from backend
    axios.get('/api/get-location-api-key')
      .then(response => {
        const encryptedLocationApi = response.data.apiKey;
        const decryptedLocationApi = decryptApiKey(encryptedLocationApi);
        setLocationApi(decryptedLocationApi);
      })
      .catch(error => {
        // console.error('Error fetching API key:', error);
        // alert('Error fetching API key');
        setAlert({ message:'Error fetching API key' , type: 'error' });
      });

    axios.get('/api/locationApikey')
      .then(response => {
        const encryptedLocationApi1 = response.data.apiKey;
        const decryptedLocationApi1 = decryptApiKey(encryptedLocationApi1);
        setLocationApi1(decryptedLocationApi1);
      })
      .catch(error => {
        console.error('Error fetching API key:', error);
        // alert('Error fetching API key');
        setAlert({ message: 'Error fetching API key', type:"error" });

      });
  }, []);

  const decryptApiKey = (encryptedApiKey) => {
    const secretKey = 'ghjdjdgdhddjjdhgdcdghww#hsh536'; // Replace with your decryption key

    try {
      const bytes = CryptoJS.AES.decrypt(encryptedApiKey, secretKey);
      const decryptedApiKey = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedApiKey;
    } catch (error) {
      console.error('Error decrypting API key:', error);
      return '';
    }
  };
 
  useEffect(() => {
    // This useEffect will run whenever any of the billing address state values change
    // and it will update localStorage accordingly.
    localStorage.setItem(
      'billingAddress',
      JSON.stringify({
        streetAddress: billingStreetAddress,
        postal_code: billingpostal_code || postal_code,
        city: billingCity,
        state: billingState,
        country: billingCountry
      })
    );
  }, [
    billingStreetAddress,
    billingpostal_code,
    billingCity,
    billingState,
    billingCountry
  ]);
  useEffect(() => {
    localStorage.setItem(
      'deliveryAddress',
      JSON.stringify({
        streetAddress,
        postal_code,
        city,
        state,
        country
      })
    );
  }, [streetAddress, postal_code, city, state, country]);
  useEffect(() => {
    // console.log('sameAsDelivery changed:', sameAsDelivery);
    if (sameAsDelivery) {
      if (!useCurrentLocation) {
        setBillingStreetAddress(streetAddress);
        setBillingpostal_code(postal_code);
        setBillingCity(city);
        setBillingState(state);
        setBillingCountry(country);
      } else {
        // If not manually entered, use the current location address
        setBillingStreetAddress(
          userLocation.features[0].properties.address_line1
        );
        setBillingpostal_code(userLocation.features[0].properties.postcode);
        setBillingCity(userLocation.features[0].properties.city);
        setBillingState(userLocation.features[0].properties.state);
        setBillingCountry(userLocation.features[0].properties.country);
      }
    }
  }, [sameAsDelivery, streetAddress, postal_code, city, state, country]);
  useEffect(() => {
    // if (billingVerified && deliveryVerified) {
    //   navigate('/order/confirm');
    // }
    if (
      (billingVerified === true && deliveryVerified === true) ||
      (orderType === 'Pickup' && billingVerified === true)
    ) { 
      setAlert({ message: "Address verified", type: "success"});
      // alert('Address verified')
      navigate('/order/confirm');
    }
  }, [billingVerified, deliveryVerified, orderType, navigate]);

  return (
    <div id="ShippingInfo" className="py-5 bg-white">
      <div className="container col-11 mx-auto bg-white col-lg-6 py-3 custom-table my-4" id="CardBackIMg">
      {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
        <form className="checkout-form bg-white" onSubmit={handleSubmit}>
          {!isLoggedIn && (
            <PersonalDetails
              name={name}
              lastName={lastName}
              email={email}
              otp={enteredOtp}
              handleGetOtp={handleGetOtp}
              isOtpSent={isOtpSent}
              otpVerified={otpVerified}
              emailOrMobile={emailOrMobile}
              handleConfirmOtp={handleConfirmOtp}
              handleFirstNameChange={handleFirstNameChange}
              handleLastNameChange={handleLastNameChange}
              handleEmailChange={handleEmailChange}
              handleOtpChange={handleOtpChange}
              handleEmailOrMobileChange={handleEmailOrMobileChange}
              errors={errors}
            />
          )}
          {(otpVerified || isLoggedIn) && (
            <OrderDetails
              orderType={orderType}
              selectedTimeSlot={selectedTimeSlot}
              timeSlots={timeSlots}
              handleOrderTypeChange={handleOrderTypeChange}
              handleTimeSlotChange={handleTimeSlotChange}
              handleTimeChange={handleTimeChange}
              time={time}
              textBox1={textBox1}
              handleText1={handleText1}
            />
          )}
          {orderType === 'Delivery' && (
            <DeliveryAddress
              streetAddress={streetAddress}
              postal_code={postal_code}
              city={city}
              state={state}
              country={country}
              textBox2={textBox2}
              setBillingVerified={setBillingVerified}
              handleStreetAddressChange={handleStreetAddressChange}
              handleZipCodeChange={handleZipCodeChange}
              handleCityChange={handleCityChange}
              handleStateChange={handleStateChange}
              handleCountryChange={handleCountryChange}
              handleText2={handleText2}
              // handleButtonClick={handleButtonClick}
              toastShown={toastShown}
              setToastShown={setToastShown}
              useCurrentLocation={useCurrentLocation}
              // findMyCoordinates={findMyCoordinates}
              userLocation={userLocation}
              sameAsDelivery={sameAsDelivery}
              billingCity={billingCity}
              billingState={billingState}
              billingCountry={billingCountry}
              setBillingStreetAddress={setBillingStreetAddress}
              handleSameAsDeliveryChange={handleSameAsDeliveryChange}
              billingStreetAddress={billingStreetAddress}
              billingPostalCode={billingpostal_code}
              setBillingPostalCode={setBillingpostal_code}
              setBillingCity={setBillingCity}
              setBillingState={setBillingState}
              setBillingCountry={setBillingCountry}
              coordinates={coordinates}
              // handleUseCurrentLocationChange={handleUseCurrentLocationChange}
              distanceResult={distanceResult}
            />
          )}
          {orderType === 'Pickup' && (
            <BillingAddress
              streetAddress={streetAddress}
              postal_code={postal_code}
              city={city}
              state={state}
              country={country}
              textBox1={textBox1}
              // handleBillingAddressChange={handleButtonClick}
              handleStreetAddressChange={handleStreetAddressChange}
              handleZipCodeChange={handleZipCodeChange}
              handleCityChange={handleCityChange}
              handleStateChange={handleStateChange}
              handleCountryChange={handleCountryChange}
              handleText1={handleText1}
              orderType={orderType}
            />
          )}
          <div className="d-flex justify-content-center">
            <button
               type="submit"
               id="checkout_btn"
               className="btn my-4"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingInfo1;