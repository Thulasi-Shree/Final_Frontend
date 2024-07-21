import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomAlert from 'components/utilities/Alert';

const Settings = ({ token }) => {
  const [settings, setSettings] = useState({
    minDeliveryCharge: 0,
    taxAmount: 0,
    deliveryChargePerKm: 0
  });
  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/admin/settings/get', {
          headers: { 'x-auth-token': token }
        });
        const { minDeliveryCharge, taxAmount, deliveryChargePerKm } =
          response.data.data[0]; // assuming response structure
        setSettings({ minDeliveryCharge, taxAmount, deliveryChargePerKm });
      } catch (error) {
        console.error('Fetch settings error', error);
      }
    };

    fetchSettings();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/admin/settings', settings, {
        headers: { 'x-auth-token': token }
      });
      // alert('Settings updated');
      setAlert({ message: 'Settings updated!', type: 'success' });

    } catch (error) {
      setAlert({ message: 'Update settings error', type: 'error' });

      console.error('Update settings error', error);
    }
  };
  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value
    }));
  };

  return (
    <div className="bg-white py-5 d-flex justify-content-center align-items-center text-black">
      <Card className='p-4 col-xl-4 col-xs-12 col-sm-12 col-lg-6 col-md-8 Cardimg123'>
        <h2>Tax & Delivery Charges</h2>
        {alert.message && (
          <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Minimum Delivery Charges</label>
            <input type="number" className="form-control" name="minDeliveryCharge" value={settings.minDeliveryCharge} onChange={handleChange} placeholder="Min Delivery Charge" required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Tax Amount</label>
            <input type="number" className="form-control" name="taxAmount" value={settings.taxAmount} onChange={handleChange} placeholder="Tax Amount" required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Delivery Charges per KM</label>
            <input type="number" className="form-control" name="deliveryChargePerKm" value={settings.deliveryChargePerKm} onChange={handleChange} placeholder="Delivery Charge Per Km" required />
          </div>

          <button className='btn my-3 px-4 btn rounded w-100 ' type="submit">Update</button>
        </form>
      </Card>
    </div>
  )
}

export default Settings