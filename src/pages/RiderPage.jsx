import React, { useState } from 'react';
import Header from '../components/common/Header';
import RideBooking from '../components/ride/RideBooking';
import CarpoolList from '../components/carpool/CarpoolList';
import MapView from '../components/map/MapView';
import { useGeolocation } from '../hooks/useGeolocation';
import { FaCar, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';

const RiderPage = () => {
  const [activeTab, setActiveTab] = useState('ride');
  const [clickMode, setClickMode] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const { location, error, loading, refreshLocation } = useGeolocation();

  const handleMapClick = (latlng) => {
    // Dispatch custom event that RideBooking will listen to
    const event = new CustomEvent('mapLocationSelected', {
      detail: { lat: latlng.lat, lng: latlng.lng }
    });
    window.dispatchEvent(event);
  };

  const handleLocationUpdate = (newOrigin, newDestination, newClickMode) => {
    setOrigin(newOrigin);
    setDestination(newDestination);
    setClickMode(newClickMode);
  };

  return (
    <div className="rider-page">
      <Header />
      
      <div className="rider-container">
        <div className="rider-sidebar">
          <div className="tab-selector">
            <button 
              className={`tab-btn ${activeTab === 'ride' ? 'active' : ''}`}
              onClick={() => setActiveTab('ride')}
            >
              <FaCar /> Book Ride
            </button>
            <button 
              className={`tab-btn ${activeTab === 'carpool' ? 'active' : ''}`}
              onClick={() => setActiveTab('carpool')}
            >
              <FaUsers /> Join Carpool
            </button>
          </div>

          {/* GPS Status */}
          <div className="gps-status">
            {loading && (
              <div className="gps-loading">
                <FaMapMarkerAlt /> Getting your location...
              </div>
            )}
            {error && (
              <div className="gps-error">
                <p>⚠️ {error}</p>
                <button onClick={refreshLocation} className="btn btn-secondary btn-small">
                  Retry
                </button>
              </div>
            )}
            {location && !loading && (
              <div className="gps-success">
                <FaMapMarkerAlt style={{ color: '#4CAF50' }} />
                <span>Location Active</span>
                <small>Accuracy: {Math.round(location.accuracy)}m</small>
              </div>
            )}
          </div>

          <div className="tab-content">
            {activeTab === 'ride' && (
              <RideBooking 
                currentLocation={location}
                onLocationUpdate={handleLocationUpdate}
              />
            )}
            {activeTab === 'carpool' && <CarpoolList />}
          </div>
        </div>

        <div className="rider-map">
          <MapView 
            currentLocation={location}
            origin={origin}
            destination={destination}
            useCurrentLocation={true}
            onMapClick={handleMapClick}
            clickMode={clickMode}
            showClickInstructions={true}
          />
        </div>
      </div>
    </div>
  );
};

export default RiderPage;
