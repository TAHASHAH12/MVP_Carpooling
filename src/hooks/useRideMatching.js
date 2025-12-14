import { useState, useCallback } from 'react';

export const useRideMatching = () => {
  const [matches, setMatches] = useState([]);

  const findMatches = useCallback((userLocation, availableRides, maxDistance = 5) => {
    const matched = availableRides.filter(ride => {
      const distance = calculateDistance(userLocation, ride.pickupLocation);
      return distance <= maxDistance;
    });

    setMatches(matched.sort((a, b) => {
      const distA = calculateDistance(userLocation, a.pickupLocation);
      const distB = calculateDistance(userLocation, b.pickupLocation);
      return distA - distB;
    }));

    return matched;
  }, []);

  const calculateDistance = (loc1, loc2) => {
    const R = 6371;
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return { matches, findMatches };
};
