import React, { useState, useEffect } from 'react';
import { useRide } from '../../context/RideContext';
import Button from '../common/Button';
import { FaMapMarkerAlt, FaClock, FaPhone } from 'react-icons/fa';

const ActiveRide = () => {
  const { currentRide, startRide, completeRide, cancelRide } = useRide();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (currentRide?.status === 'in-progress') {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentRide]);

  if (!currentRide) {
    return <div className="no-active-ride">No active ride</div>;
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="active-ride">
      <div className="active-ride-header">
        <h2>Active Ride</h2>
        <span className={`ride-status status-${currentRide.status}`}>
          {currentRide.status}
        </span>
      </div>

      <div className="ride-progress">
        <div className="location-timeline">
          <div className="timeline-item">
            <FaMapMarkerAlt color="#4CAF50" />
            <div>
              <p className="location-label">Pickup</p>
              <p className="location-name">{currentRide.origin?.name}</p>
            </div>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-item">
            <FaMapMarkerAlt color="#f44336" />
            <div>
              <p className="location-label">Destination</p>
              <p className="location-name">{currentRide.destination?.name}</p>
            </div>
          </div>
        </div>
      </div>

      {currentRide.status === 'in-progress' && (
        <div className="ride-timer">
          <FaClock />
          <span>Ride Time: {formatTime(timer)}</span>
        </div>
      )}

      <div className="driver-contact">
        <h3>Driver Information</h3>
        <div className="driver-details">
          <p><strong>Name:</strong> {currentRide.driverName || 'John Doe'}</p>
          <p><strong>Vehicle:</strong> {currentRide.vehicle || 'Toyota Camry'}</p>
          <p><strong>License:</strong> {currentRide.licensePlate || 'ABC-1234'}</p>
        </div>
        <Button variant="secondary" className="btn-full">
          <FaPhone /> Contact Driver
        </Button>
      </div>

      <div className="ride-actions">
        {currentRide.status === 'booked' && (
          <Button onClick={startRide} variant="primary" className="btn-full">
            Start Ride
          </Button>
        )}
        {currentRide.status === 'in-progress' && (
          <Button onClick={completeRide} variant="success" className="btn-full">
            Complete Ride
          </Button>
        )}
        <Button onClick={cancelRide} variant="danger" className="btn-full">
          Cancel Ride
        </Button>
      </div>
    </div>
  );
};

export default ActiveRide;
