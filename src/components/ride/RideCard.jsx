import React from 'react';
import { FaUser, FaStar, FaCar, FaMapMarkerAlt } from 'react-icons/fa';
import Button from '../common/Button';

const RideCard = ({ ride, onSelect }) => {
  return (
    <div className="ride-card">
      <div className="ride-card-header">
        <div className="driver-info">
          <FaUser className="driver-avatar" />
          <div>
            <h4>{ride.driverName || 'Driver'}</h4>
            <div className="driver-rating">
              <FaStar color="#ffc107" size={14} />
              <span>{ride.rating || 4.8}</span>
            </div>
          </div>
        </div>
        <div className="vehicle-info">
          <FaCar />
          <span>{ride.vehicle || 'Toyota Camry'}</span>
        </div>
      </div>

      <div className="ride-card-body">
        <div className="location-info">
          <div className="location">
            <FaMapMarkerAlt color="#4CAF50" />
            <span>{ride.origin?.name || 'Pickup Location'}</span>
          </div>
          <div className="location">
            <FaMapMarkerAlt color="#f44336" />
            <span>{ride.destination?.name || 'Destination'}</span>
          </div>
        </div>

        <div className="ride-details">
          <div className="detail-item">
            <span>Distance:</span>
            <strong>{ride.distance} km</strong>
          </div>
          <div className="detail-item">
            <span>Fare:</span>
            <strong>${ride.fare}</strong>
          </div>
          <div className="detail-item">
            <span>Type:</span>
            <strong>{ride.rideType}</strong>
          </div>
        </div>
      </div>

      <div className="ride-card-footer">
        <Button onClick={() => onSelect(ride)} variant="primary" className="btn-full">
          Select Ride
        </Button>
      </div>
    </div>
  );
};

export default RideCard;
