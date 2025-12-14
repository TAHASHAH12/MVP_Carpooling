import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import { FaSignInAlt, FaUser, FaCar } from 'react-icons/fa';

const Login = ({ onSwitchToRiderRegister, onSwitchToDriverRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login - in real app, validate against backend
    const userData = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      role: 'rider',
      isDriver: false,
      phone: '',
      rating: 4.8,
    };
    login(userData);
    navigate('/dashboard');
  };

  return (
    <div className="auth-form">
      <div className="auth-icon">
        <FaSignInAlt size={48} />
      </div>
      <h2>Welcome Back</h2>
      <p className="auth-subtitle">Login to continue your journey</p>
      
      <form onSubmit={handleLogin}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        
        <div className="forgot-password">
          <span className="link">Forgot password?</span>
        </div>

        <Button type="submit" variant="primary" className="btn-full btn-large">
          <FaSignInAlt /> Login
        </Button>
      </form>

      <div className="auth-divider">
        <span>or</span>
      </div>

      <div className="register-options">
        <p className="register-prompt">Don't have an account? Register as:</p>
        <div className="register-buttons">
          <Button onClick={onSwitchToRiderRegister} variant="secondary" className="btn-full">
            <FaUser /> Rider
          </Button>
          <Button onClick={onSwitchToDriverRegister} variant="secondary" className="btn-full">
            <FaCar /> Driver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
