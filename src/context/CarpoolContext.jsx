import React, { createContext, useState, useContext } from 'react';

const CarpoolContext = createContext();

export const useCarpool = () => useContext(CarpoolContext);

export const CarpoolProvider = ({ children }) => {
  const [carpools, setCarpools] = useState([]);
  const [mycarpools, setMyCarpool] = useState([]);

  const createCarpool = (carpoolData) => {
    const newCarpool = {
      id: Date.now(),
      ...carpoolData,
      passengers: [],
      availableSeats: carpoolData.totalSeats,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    setCarpools([...carpools, newCarpool]);
    setMyCarpool([...mycarpools, newCarpool]);  // ✅ Fixed here
    return newCarpool;
  };

  const joinCarpool = (carpoolId, passengerData) => {
    const updatedCarpools = carpools.map(carpool => {
      if (carpool.id === carpoolId && carpool.availableSeats > 0) {
        return {
          ...carpool,
          passengers: [...carpool.passengers, passengerData],
          availableSeats: carpool.availableSeats - 1,
          status: carpool.availableSeats - 1 === 0 ? 'full' : 'open',
        };
      }
      return carpool;
    });
    setCarpools(updatedCarpools);
  };

  const leaveCarpool = (carpoolId, passengerId) => {
    const updatedCarpools = carpools.map(carpool => {
      if (carpool.id === carpoolId) {
        return {
          ...carpool,
          passengers: carpool.passengers.filter(p => p.id !== passengerId),
          availableSeats: carpool.availableSeats + 1,
          status: 'open',
        };
      }
      return carpool;
    });
    setCarpools(updatedCarpools);
  };

  const searchCarpools = (filters) => {
    return carpools.filter(carpool => {
      if (filters.origin && !carpool.origin.toLowerCase().includes(filters.origin.toLowerCase())) {
        return false;
      }
      if (filters.destination && !carpool.destination.toLowerCase().includes(filters.destination.toLowerCase())) {
        return false;
      }
      if (filters.date && carpool.date !== filters.date) {
        return false;
      }
      return carpool.status === 'open';
    });
  };

  return (
    <CarpoolContext.Provider value={{ 
      carpools, 
      mycarpools,  // ✅ Changed from mycarpool to mycarpools
      createCarpool, 
      joinCarpool, 
      leaveCarpool, 
      searchCarpools 
    }}>
      {children}
    </CarpoolContext.Provider>
  );
};
