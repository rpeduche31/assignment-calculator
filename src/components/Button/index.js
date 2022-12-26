import React from 'react';
import './button.css';

const Button = ({ children, buttonStyles, onHandleClick }) => {
  return (
    <div onClick={onHandleClick} className='button-component' style={buttonStyles}>
      {children}
    </div>
  );
};

export default Button;
