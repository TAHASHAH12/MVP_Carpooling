import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';

const DriverRegistration = ({ onComplete }) => {
  const { updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    vehicleType: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    licensePlate: '',
    licenseNumber: '',
    insurance: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ role: 'driver', vehicleInfo: formData });
    alert('Driver registration successful!');
    onComplete && onComplete();
  };

  return (
    <div className="driver-registration">
      <h2>Become a Driver</h2>
      <p>Fill in your vehicle and license information</p>

      <form onSubmit={handleSubmit}>
        <Input
          label="Vehicle Type"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          placeholder="e.g., Sedan, SUV"
          required
        />

        <div className="form-row">
          <Input
            label="Vehicle Make"
            name="vehicleMake"
            value={formData.vehicleMake}
            onChange={handleChange}
            placeholder="e.g., Toyota"
            required
          />
          <Input
            label="Vehicle Model"
            name="vehicleModel"
            value={formData.vehicleModel}
            onChange={handleChange}
            placeholder="e.g., Camry"
            required
          />
        </div>

        <div className="form-row">
          <Input
            label="Vehicle Year"
            name="vehicleYear"
            type="number"
            value={formData.vehicleYear}
            onChange={handleChange}
            placeholder="e.g., 2020"
            required
          />
          <Input
            label="License Plate"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            placeholder="e.g., ABC-1234"
            required
          />
        </div>

        <Input
          label="Driver's License Number"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
          placeholder="Enter your license number"
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

        <Button type="submit" variant="primary" className="btn-full btn-large">
          Register as Driver
        </Button>
      </form>
    </div>
  );
};

export default DriverRegistration;
