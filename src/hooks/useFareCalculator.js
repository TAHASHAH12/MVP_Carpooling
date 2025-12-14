import { useState, useCallback } from 'react';

export const useFareCalculator = () => {
  const [fare, setFare] = useState(0);

  const calculateFare = useCallback((distance, rideType = 'regular') => {
    const baseFare = 50; // ✅ Fixed: was 'basefare'
    const perKmRate = {
      regular: 15,
      premium: 25,
      shared: 10,
      carpool: 8,
    };

    const calculatedFare = baseFare + (distance * perKmRate[rideType]);
    setFare(Math.round(calculatedFare));
    return Math.round(calculatedFare);
  }, []);

  const calculateDistance = (origin, destination) => {
    // Simplified distance calculation (Haversine formula approximation)
    const R = 6371; // Earth's radius in km
    const dLat = (destination.lat - origin.lat) * Math.PI / 180;
    const dLng = (destination.lng - origin.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(origin.lat * Math.PI / 180) * Math.cos(destination.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return { fare, calculateFare, calculateDistance };
};
