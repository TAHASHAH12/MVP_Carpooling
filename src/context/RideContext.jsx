import React, { createContext, useState, useContext } from 'react';

const RideContext = createContext();

export const useRide = () => useContext(RideContext);

export const RideProvider = ({ children }) => {
  const [currentRide, setCurrentRide] = useState(null);
  const [rideHistory, setRideHistory] = useState([]);
  const [availableRides, setAvailableRides] = useState([]);

  const createRide = (rideData) => {
    const newRide = {
      id: Date.now(),
      ...rideData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setAvailableRides([...availableRides, newRide]);
    return newRide;
  };

  const bookRide = (ride) => {
    setCurrentRide({ ...ride, status: 'booked' });
  };

  const startRide = () => {
    if (currentRide) {
      setCurrentRide({ ...currentRide, status: 'in-progress' });
    }
  };

  const completeRide = () => {
    if (currentRide) {
      setRideHistory([...rideHistory, { ...currentRide, status: 'completed', completedAt: new Date().toISOString() }]);
      setCurrentRide(null);
    }
  };

  const cancelRide = () => {
    if (currentRide) {
      setRideHistory([...rideHistory, { ...currentRide, status: 'cancelled', cancelledAt: new Date().toISOString() }]);
      setCurrentRide(null);
    }
  };

  return (
    <RideContext.Provider value={{ 
      currentRide, 
      rideHistory, 
      availableRides, 
      createRide, 
      bookRide, 
      startRide, 
      completeRide, 
      cancelRide 
    }}>
      {children}
    </RideContext.Provider>
  );
};
