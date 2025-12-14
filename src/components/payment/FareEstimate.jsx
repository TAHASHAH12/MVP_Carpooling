import React from 'react';
import { FaDollarSign, FaClock, FaRoute } from 'react-icons/fa';

const FareEstimate = ({ fare, distance, duration, rideType }) => {
  const breakDown = {
    baseFare: 50,
    distanceCharge: (distance * (rideType === 'carpool' ? 8 : 15)),
    serviceFee: 5,
  };

  return (
    <div className="fare-estimate">
      <h3>Fare Estimate</h3>
      
      <div className="fare-total">
        <FaDollarSign size={32} />
        <span className="fare-amount">${fare}</span>
      </div>

      <div className="fare-breakdown">
        <div className="breakdown-item">
          <span>Base Fare</span>
          <span>${breakDown.baseFare}</span>
        </div>
        <div className="breakdown-item">
          <span>Distance ({distance} km)</span>
          <span>${Math.round(breakDown.distanceCharge)}</span>
        </div>
        <div className="breakdown-item">
          <span>Service Fee</span>
          <span>${breakDown.serviceFee}</span>
        </div>
        <div className="breakdown-divider"></div>
        <div className="breakdown-item total">
          <strong>Total</strong>
          <strong>${fare}</strong>
        </div>
      </div>

      <div className="ride-info">
        <div className="info-item">
          <FaRoute />
          <span>{distance} km</span>
        </div>
        <div className="info-item">
          <FaClock />
          <span>{duration || '15'} min</span>
        </div>
      </div>
    </div>
  );
};

export default FareEstimate;
