import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import { FaCar, FaEnvelope, FaPhone, FaLock, FaUser, FaIdCard } from 'react-icons/fa';

const DriverRegister = ({ onSwitchToLogin, onSwitchToRider }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    cnic: '',
    address: '',
    
    // Vehicle Info
    vehicleType: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    licensePlate: '',
    
    // Documents
    licenseNumber: '',
    licenseExpiry: '',
    insurance: '',
  });
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    const userData = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      cnic: formData.cnic,
      address: formData.address,
      role: 'driver',
      isDriver: true,
      rating: 5.0,
      createdAt: new Date().toISOString(),
      driverInfo: {
        vehicleType: formData.vehicleType,
        vehicleMake: formData.vehicleMake,
        vehicleModel: formData.vehicleModel,
        vehicleYear: formData.vehicleYear,
        vehicleColor: formData.vehicleColor,
        licensePlate: formData.licensePlate,
        licenseNumber: formData.licenseNumber,
        licenseExpiry: formData.licenseExpiry,
        insurance: formData.insurance,
        verified: false,
      },
    };
    
    login(userData);
    navigate('/driver');
  };

  return (
    <div className="auth-form driver-register-form">
      <div className="auth-icon driver-icon">
        <FaCar size={48} />
      </div>
      <h2>Register as Driver</h2>
      <p className="auth-subtitle">Join our driver community</p>

      {/* Progress Indicator */}
      <div className="registration-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <span>Personal</span>
        </div>
        <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <span>Vehicle</span>
        </div>
        <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <span>Documents</span>
        </div>
      </div>

      <form onSubmit={step === 3 ? handleRegister : handleNext}>
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="form-step">
            <h3 className="step-title">Personal Information</h3>
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
              label="CNIC Number"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              placeholder="XXXXX-XXXXXXX-X"
              required
            />
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your complete address"
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
          </div>
        )}

        {/* Step 2: Vehicle Information */}
        {step === 2 && (
          <div className="form-step">
            <h3 className="step-title">Vehicle Information</h3>
            <div className="input-group">
              <label className="input-label">Vehicle Type <span className="required">*</span></label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select vehicle type</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="van">Van</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
            </div>
            <Input
              label="Vehicle Make"
              name="vehicleMake"
              value={formData.vehicleMake}
              onChange={handleChange}
              placeholder="e.g., Toyota, Honda"
              required
            />
            <Input
              label="Vehicle Model"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleChange}
              placeholder="e.g., Corolla, Civic"
              required
            />
            <div className="form-row">
              <Input
                label="Year"
                type="number"
                name="vehicleYear"
                value={formData.vehicleYear}
                onChange={handleChange}
                placeholder="2020"
                min="2000"
                max={new Date().getFullYear()}
                required
              />
              <Input
                label="Color"
                name="vehicleColor"
                value={formData.vehicleColor}
                onChange={handleChange}
                placeholder="e.g., White"
                required
              />
            </div>
            <Input
              label="License Plate"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              placeholder="ABC-1234"
              required
            />
          </div>
        )}

        {/* Step 3: Documents */}
        {step === 3 && (
          <div className="form-step">
            <h3 className="step-title">License & Documents</h3>
            <Input
              label="Driver's License Number"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="Enter your license number"
              required
            />
            <Input
              label="License Expiry Date"
              type="date"
              name="licenseExpiry"
              value={formData.licenseExpiry}
              onChange={handleChange}
              required
            />
            <Input
              label="Insurance Policy Number"
              name="insurance"
              value={formData.insurance}
              onChange={handleChange}
              placeholder="Enter your insurance policy number"
              required
            />
            <div className="info-box">
              <p><strong>Note:</strong> Your documents will be verified by our team. You'll receive a confirmation email within 24-48 hours.</p>
            </div>
          </div>
        )}

        <div className="form-navigation">
          {step > 1 && (
            <Button type="button" onClick={handleBack} variant="secondary" className="btn-full">
              Back
            </Button>
          )}
          <Button type="submit" variant="primary" className="btn-full">
            {step === 3 ? 'Complete Registration' : 'Next'}
          </Button>
        </div>
      </form>

      <div className="auth-divider">
        <span>or</span>
      </div>

      <Button 
        onClick={onSwitchToRider} 
        variant="secondary" 
        className="btn-full"
      >
        <FaUser /> Register as Rider Instead
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

export default DriverRegister;
