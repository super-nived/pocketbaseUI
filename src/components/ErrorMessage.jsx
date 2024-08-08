// ErrorMessage.js
import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({error}) => {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <div className="error-text">{"We're currently facing some technical issues. Please try again later."}</div>

    </div>
  );
};

export default ErrorMessage;
