import React from 'react';
import { FaUser, FaStar, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';
import Button from '../common/Button';

const CarpoolCard = ({ carpool, onJoin }) => {
  return (
    <div className="carpool-card">
      <div className="carpool-header">
        <div className="driver-info">
          <FaUser className="driver-avatar" />
          <div>
            <h4>{carpool.driverName}</h4>
            <div className="driver-rating">
              <FaStar color="#ffc107" size={14} />
              <span>{carpool.driverRating || 4.8}</span>
            </div>
          </div>
        </div>
        <div className="carpool-status">
          <span className={`status-badge ${carpool.status}`}>
            {carpool.status}
          </span>
        </div>
      </div>

      <div className="carpool-route">
        <div className="route-location">
          <FaMapMarkerAlt color="#4CAF50" />
          <div>
            <p className="location-label">From</p>
            <p className="location-name">{carpool.origin?.name}</p>
          </div>
        </div>
        <div className="route-divider"></div>
        <div className="route-location">
          <FaMapMarkerAlt color="#f44336" />
          <div>
            <p className="location-label">To</p>
            <p className="location-name">{carpool.destination?.name}</p>
          </div>
        </div>
      </div>

      <div className="carpool-details">
        <div className="detail-item">
          <FaClock />
          <div>
            <span>{carpool.date}</span>
            <span>{carpool.time}</span>
          </div>
        </div>
        <div className="detail-item">
          <FaUsers />
          <span>{carpool.availableSeats} / {carpool.totalSeats} seats available</span>
        </div>
        <div className="detail-item price">
          <span>Price per seat:</span>
          <strong>${carpool.pricePerSeat}</strong>
        </div>
      </div>

      {carpool.description && (
        <div className="carpool-description">
          <p>{carpool.description}</p>
        </div>
      )}

      <div className="carpool-footer">
        {carpool.status === 'open' && carpool.availableSeats > 0 && (
          <Button onClick={() => onJoin(carpool)} variant="primary" className="btn-full">
            Join Carpool
          </Button>
        )}
        {carpool.status === 'full' && (
          <Button disabled variant="secondary" className="btn-full">
            Carpool Full
          </Button>
        )}
      </div>
    </div>
  );
};

export default CarpoolCard;
