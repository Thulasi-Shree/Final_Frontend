import React from 'react';
import saladImage from '../../../assets/img/southindian.avif';
import './WelcomeSection.css'; // Import your CSS file for animations

const WelcomeSection = () => {
  return (
    <div className='bg-white welcome container mx-auto row pb-4'>
      <div className='col-11 col-md-6 col-lg-8 d-flex mx-auto  col justify-content-center align-items-center'>
        <div className='text-animation'>
          <div className='col-12 mb-3 ' style={{ fontSize: 'calc(1.1rem + 1vw)',  color:'#a290b0', lineHeight: '1.1' }}>NURTURE YOUR PASSION FOR FOOD AND LIFE...</div>
          <div className='col-12'>
            <p style={{ fontSize: '1.1rem' }}>
              Cuisine is a teamwork of Cuisine Restaurant Cafe, aiming to promote
              the foodstuff industry through its branches.
            </p>
          </div>
        </div>
      </div>
      <div className='col-12 col-md-6 col-lg-4 d-flex p-4 justify-content-center align-items-center'>
        <img
          className='col-sm-9 col-md-12 mt-3 col-12 image-animation align-self-end'
          src={saladImage}
          alt="Salad"
          style={{
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)',
          }}
        />
      </div>
    </div>
  );
};

export default WelcomeSection;
