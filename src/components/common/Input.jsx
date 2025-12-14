import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, required = false, error, name, ...props }) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label} {required && <span className="required">*</span>}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`input ${error ? 'input-error' : ''}`}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;
