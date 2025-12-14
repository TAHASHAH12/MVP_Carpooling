import React, { useState, useEffect } from 'react';
import { useRide } from '../../context/RideContext';
import { useFareCalculator } from '../../hooks/useFareCalculator';
import Button from '../common/Button';
import { FaCar, FaUsers, FaStar, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';

const RideBooking = ({ currentLocation, onLocationUpdate }) => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [rideType, setRideType] = useState('regular');
  const [clickMode, setClickMode] = useState(null);
  const { createRide } = useRide();
  const { fare, calculateFare, calculateDistance } = useFareCalculator();

  const rideTypes = [
    { id: 'regular', name: 'Regular', icon: <FaCar />, description: 'Affordable rides' },
    { id: 'premium', name: 'Premium', icon: <FaStar />, description: 'Luxury vehicles' },
    { id: 'shared', name: 'Shared', icon: <FaUsers />, description: 'Share and save' },
    { id: 'carpool', name: 'Carpool', icon: <FaUsers />, description: 'Eco-friendly' },
  ];

  // Update parent component whenever origin/destination changes
  useEffect(() => {
    if (onLocationUpdate) {
      onLocationUpdate(origin, destination, clickMode);
    }
  }, [origin, destination, clickMode]);

  const handleSetPickup = () => {
    const newMode = clickMode === 'pickup' ? null : 'pickup';
    setClickMode(newMode);
  };

  const handleSetDestination = () => {
    const newMode = clickMode === 'destination' ? null : 'destination';
    setClickMode(newMode);
  };

  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      setOrigin({
        ...currentLocation,
        name: `Current Location (${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)})`
      });
      setClickMode(null);
    }
  };

  // Expose function to parent via window event
  useEffect(() => {
    const handleMapClick = (event) => {
      const { lat, lng } = event.detail;
      
      if (clickMode === 'pickup') {
        setOrigin({
          lat,
          lng,
          name: `Pickup (${lat.toFixed(4)}, ${lng.toFixed(4)})`
        });
        setClickMode(null);
      } else if (clickMode === 'destination') {
        setDestination({
          lat,
          lng,
          name: `Destination (${lat.toFixed(4)}, ${lng.toFixed(4)})`
        });
        setClickMode(null);
      }
    };

    window.addEventListener('mapLocationSelected', handleMapClick);
    
    return () => {
      window.removeEventListener('mapLocationSelected', handleMapClick);
    };
  }, [clickMode]);

  const handleBookRide = () => {
    if (!origin || !destination) {
      alert('Please select both pickup and drop-off locations');
      return;
    }

    const distance = calculateDistance(origin, destination);
    const rideFare = calculateFare(distance, rideType);

    const rideData = {
      origin,
      destination,
      rideType,
      distance: distance.toFixed(2),
      fare: rideFare,
      requestedAt: new Date().toISOString(),
    };

    createRide(rideData);
    alert('Ride requested successfully!');
  };

  useEffect(() => {
    if (origin && destination) {
      const distance = calculateDistance(origin, destination);
      calculateFare(distance, rideType);
    }
  }, [origin, destination, rideType]);

  return (
    <div className="ride-booking">
      <h2>Book a Ride</h2>
      
      <div className="location-inputs">
        <div className="location-selector">
          <label className="location-label">
            <FaMapMarkerAlt color="#4CAF50" /> Pickup Location
          </label>
          {origin ? (
            <div className="selected-location">
              <span>{origin.name}</span>
              <button onClick={() => setOrigin(null)} className="clear-btn">
                <FaTimes />
              </button>
            </div>
          ) : (
            <div className="location-buttons">
              <Button onClick={handleSetPickup} variant={clickMode === 'pickup' ? 'primary' : 'secondary'} className="btn-full">
                {clickMode === 'pickup' ? '📍 Click on Map...' : 'Select on Map'}
              </Button>
              {currentLocation && (
                <Button onClick={handleUseCurrentLocation} variant="secondary" className="btn-full">
                  Use Current Location
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="location-selector">
          <label className="location-label">
            <FaMapMarkerAlt color="#f44336" /> Drop-off Location
          </label>
          {destination ? (
            <div className="selected-location">
              <span>{destination.name}</span>
              <button onClick={() => setDestination(null)} className="clear-btn">
                <FaTimes />
              </button>
            </div>
          ) : (
            <div className="location-buttons">
              <Button onClick={handleSetDestination} variant={clickMode === 'destination' ? 'primary' : 'secondary'} className="btn-full">
                {clickMode === 'destination' ? '🎯 Click on Map...' : 'Select on Map'}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="ride-types">
        <h3>Select Ride Type</h3>
        <div className="ride-type-grid">
          {rideTypes.map(type => (
            <div 
              key={type.id}
              className={`ride-type-card ${rideType === type.id ? 'selected' : ''}`}
              onClick={() => setRideType(type.id)}
            >
              <div className="ride-type-icon">{type.icon}</div>
              <h4>{type.name}</h4>
              <p>{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      {origin && destination && (
        <div className="fare-estimate">
          <h3>Estimated Fare</h3>
          <p className="fare-amount">${fare}</p>
          <p className="fare-details">
            Distance: {calculateDistance(origin, destination).toFixed(2)} km
          </p>
        </div>
      )}

      <Button 
        onClick={handleBookRide} 
        variant="primary" 
        className="btn-full btn-large"
        disabled={!origin || !destination}
      >
        Request Ride
      </Button>
    </div>
  );
};

export default RideBooking;
