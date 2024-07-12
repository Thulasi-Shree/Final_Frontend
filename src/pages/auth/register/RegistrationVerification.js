import React from 'react';
import './SignUpForm.css'; // Import the CSS file for styling

const OpenEmailAppLink = () => {
  const openEmailApp = () => {
    window.location.href = 'mailto:';
  };

  return (
    <div className='bg-white' style={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
     <div className='p-5 d-flex justify-content-center'>
      <h2 className="text-center">
        Registration link has been sent to your email successfully! <br/> Please verify your email to login!
      </h2>
    </div>
      <button onClick={openEmailApp} className=" btn email-button">
        Open Email App
      </button>
    </div>
  );
};

export default OpenEmailAppLink;
