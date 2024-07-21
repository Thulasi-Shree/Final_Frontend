// CustomAlert.js
import React from 'react';
// import '';

const CustomAlert = ({ message, type, onClose }) => {
    return (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <p className={type}>{message}</p>
          </div>
        </div>
      );
};

export default CustomAlert;
