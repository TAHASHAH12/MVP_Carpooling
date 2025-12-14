import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCar } from 'react-icons/fa';

const RiderRegister = ({ onSwitchToLogin, onSwitchToDriver }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    emergencyContact: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    const userData = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      emergencyContact: formData.emergencyContact,
      role: 'rider',
      isDriver: false,
      rating: 5.0,
      createdAt: new Date().toISOString(),
    };
    login(userData);
    navigate('/dashboard');
  };

  return (
    <div className="auth-form">
      <div className="auth-icon">
        <FaUser size={48} />
      </div>
      <h2>Register as Rider</h2>
      <p className="auth-subtitle">Start your journey with us</p>
      
      <form onSubmit={handleRegister}>
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+92 300 1234567"
          required
        />
        <Input
          label="Emergency Contact"
          type="tel"
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleChange}
          placeholder="Emergency contact number"
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a strong password"
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
        />
        
        <Button type="submit" variant="primary" className="btn-full btn-large">
          <FaUser /> Register as Rider
        </Button>
      </form>

      <div className="auth-divider">
        <span>or</span>
      </div>

      <Button 
        onClick={onSwitchToDriver} 
        variant="secondary" 
        className="btn-full"
      >
        <FaCar /> Register as Driver Instead
      </Button>

      <p className="auth-switch">
        Already have an account?{' '}
        <span onClick={onSwitchToLogin} className="link">
          Login
        </span>
      </p>
    </div>
  );
};

export default RiderRegister;
