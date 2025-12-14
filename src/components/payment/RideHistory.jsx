import React from 'react';
import { useRide } from '../../context/RideContext';
import { FaMapMarkerAlt, FaCalendar, FaDollarSign } from 'react-icons/fa';

const RideHistory = () => {
  const { rideHistory } = useRide();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="ride-history">
      <h2>Ride History</h2>
      
      {rideHistory.length > 0 ? (
        <div className="history-list">
          {rideHistory.map((ride, index) => (
            <div key={index} className="history-item">
              <div className="history-header">
                <span className={`status-badge ${ride.status}`}>
                  {ride.status}
                </span>
                <span className="ride-date">
                  <FaCalendar />
                  {formatDate(ride.createdAt)}
                </span>
              </div>

              <div className="history-route">
                <div className="route-point">
                  <FaMapMarkerAlt color="#4CAF50" />
                  <span>{ride.origin?.name}</span>
                </div>
                <div className="route-line"></div>
                <div className="route-point">
                  <FaMapMarkerAlt color="#f44336" />
                  <span>{ride.destination?.name}</span>
                </div>
              </div>

              <div className="history-footer">
                <div className="ride-details">
                  <span>Distance: {ride.distance} km</span>
                  <span>Type: {ride.rideType}</span>
                </div>
                <div className="ride-fare">
                  <FaDollarSign />
                  <strong>${ride.fare}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-history">
          <p>No ride history available</p>
        </div>
      )}
    </div>
  );
};

export default RideHistory;
