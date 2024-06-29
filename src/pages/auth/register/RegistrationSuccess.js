
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import '../../order/OrderSuccess.css';

const RegistrationSuccess = () => {
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(`${token}`);
        if (response.data.success) {
          setVerificationStatus('Email verified successfully!');
        } else {
          setVerificationStatus(
            'Email verification failed. Please contact support.'
          );
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setVerificationStatus('Error verifying email. Please try again later.');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div id="OrderSuccessMainImg" style={{ height: "75vh" }}>
     <div className="row justify-content-center mx-auto">
     <div className="col-12 mt-5 text-center">
          {/* <img
            className="my-5 img-fluid d-block mx-auto"
            src="https://static.vecteezy.com/system/resources/thumbnails/001/622/545/original/success-check-mark-icon-animation-video.jpg"
            alt="Registration Success"
            width="200"
            height="200"
          /> */}
           <img
            className="my-5 img-fluid d-block mx-auto"
            src={require('../../../assets/img/OrderSuccessImg.png')}
            alt="Order Success"
            width="300"
            height="300"
          />

          <h2 className="mb-3" id="CardText">{verificationStatus}</h2>

          {verificationStatus === 'Email verified successfully!' && (
            <Link to="/login" style={{textDecoration:'none', color:'black'}}>
              <Button className="my-global-button  mb-5 mt-3">
              Login
              </Button>{' '}
              </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
