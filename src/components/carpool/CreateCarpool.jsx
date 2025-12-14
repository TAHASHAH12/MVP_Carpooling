import React, { useState } from 'react';
import { useCarpool } from '../../context/CarpoolContext';
import { useAuth } from '../../context/AuthContext';
import LocationPicker from '../map/LocationPicker';
import Input from '../common/Input';
import Button from '../common/Button';

const CreateCarpool = ({ onClose }) => {
  const { user } = useAuth();
  const { createCarpool } = useCarpool();
  const [formData, setFormData] = useState({
    origin: null,
    destination: null,
    date: '',
    time: '',
    totalSeats: 4,
    pricePerSeat: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.origin || !formData.destination) {
      alert('Please select both origin and destination');
      return;
    }

    const carpoolData = {
      ...formData,
      driverId: user.id,
      driverName: user.name,
      driverRating: user.rating,
    };

    createCarpool(carpoolData);
    alert('Carpool created successfully!');
    onClose && onClose();
  };

  return (
    <div className="create-carpool">
      <h2>Create Carpool</h2>
      <form onSubmit={handleSubmit}>
        <LocationPicker 
          onLocationSelect={(loc) => setFormData({...formData, origin: loc})}
          label="Starting Point"
        />
        
        <LocationPicker 
          onLocationSelect={(loc) => setFormData({...formData, destination: loc})}
          label="Destination"
        />

        <div className="form-row">
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />
          <Input
            label="Time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            required
          />
        </div>

        <div className="form-row">
          <Input
            label="Available Seats"
            type="number"
            min="1"
            max="7"
            value={formData.totalSeats}
            onChange={(e) => setFormData({...formData, totalSeats: parseInt(e.target.value)})}
            required
          />
          <Input
            label="Price per Seat ($)"
            type="number"
            min="1"
            value={formData.pricePerSeat}
            onChange={(e) => setFormData({...formData, pricePerSeat: e.target.value})}
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label">Description (Optional)</label>
          <textarea
            className="textarea"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Add any additional information..."
            rows="3"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary" className="btn-full">
            Create Carpool
          </Button>
          {onClose && (
            <Button type="button" onClick={onClose} variant="secondary" className="btn-full">
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateCarpool;
