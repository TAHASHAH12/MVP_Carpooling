import React from 'react';

const Button = ({ children, onClick, variant = 'primary', disabled = false, className = '', type = 'button', ...props }) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
