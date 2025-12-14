import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker for current location
const currentLocationIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iIzIxOTZGMyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjQiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

// Green marker for pickup
const pickupIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDAgQzUuMzczIDAgMCA1LjM3MyAwIDEyIEMwIDE4LjYyNyAxMiAzNiAxMiAzNiBDMTIgMzYgMjQgMTguNjI3IDI0IDEyIEMyNCA1LjM3MyAxOC42MjcgMCAxMiAwWiIgZmlsbD0iIzRDQUY1MCIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI1IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=',
  iconSize: [32, 45],
  iconAnchor: [16, 45],
  popupAnchor: [0, -45],
});

// Red marker for destination
const destinationIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDAgQzUuMzczIDAgMCA1LjM3MyAwIDEyIEMwIDE4LjYyNyAxMiAzNiAxMiAzNiBDMTIgMzYgMjQgMTguNjI3IDI0IDEyIEMyNCA1LjM3MyAxOC42MjcgMCAxMiAwWiIgZmlsbD0iI2Y0NDMzNiIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI1IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=',
  iconSize: [32, 45],
  iconAnchor: [16, 45],
  popupAnchor: [0, -45],
});

// Component to handle map clicks
function MapClickHandler({ onMapClick, clickMode }) {
  useMapEvents({
    click(e) {
      if (onMapClick && clickMode) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
}

// Component to recenter map
function RecenterMap({ center }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lng], map.getZoom());
    }
  }, [center, map]);
  
  return null;
}

const MapView = ({ 
  origin, 
  destination, 
  drivers = [], 
  useCurrentLocation = true,
  onMapClick,
  clickMode = null,
  showClickInstructions = false
}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Get user's current location
  useEffect(() => {
    if (!useCurrentLocation) return;

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(location);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationError(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(location);
      },
      (error) => {
        console.error('Error watching location:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [useCurrentLocation]);

  const center = origin || currentLocation || { lat: 40.7128, lng: -74.0060 };

  return (
    <div className="map-container">
      {locationError && (
        <div className="map-error">
          <p>⚠️ {locationError}</p>
          <p style={{ fontSize: '0.875rem' }}>Please enable location access in your browser</p>
        </div>
      )}

      {showClickInstructions && clickMode && (
        <div className="map-instructions">
          <p>
            {clickMode === 'pickup' ? '📍 Click on the map to set PICKUP location' : ''}
            {clickMode === 'destination' ? '🎯 Click on the map to set DROP-OFF location' : ''}
          </p>
        </div>
      )}
      
      <MapContainer 
        center={[center.lat, center.lng]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <RecenterMap center={currentLocation} />
        <MapClickHandler onMapClick={onMapClick} clickMode={clickMode} />

        {/* Current Location Marker */}
        {currentLocation && (
          <Marker position={[currentLocation.lat, currentLocation.lng]} icon={currentLocationIcon}>
            <Popup>
              <strong>Your Current Location</strong>
              <br />
              Lat: {currentLocation.lat.toFixed(6)}
              <br />
              Lng: {currentLocation.lng.toFixed(6)}
            </Popup>
          </Marker>
        )}
        
        {/* Pickup Location Marker */}
        {origin && (
          <Marker position={[origin.lat, origin.lng]} icon={pickupIcon}>
            <Popup>
              <strong>Pickup Location</strong>
              <br />
              {origin.name || `${origin.lat.toFixed(4)}, ${origin.lng.toFixed(4)}`}
            </Popup>
          </Marker>
        )}
        
        {/* Destination Marker */}
        {destination && (
          <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}>
            <Popup>
              <strong>Destination</strong>
              <br />
              {destination.name || `${destination.lat.toFixed(4)}, ${destination.lng.toFixed(4)}`}
            </Popup>
          </Marker>
        )}

        {/* Driver Markers */}
        {drivers.map((driver, index) => (
          <Marker key={index} position={[driver.location.lat, driver.location.lng]}>
            <Popup>{driver.name} - {driver.vehicle}</Popup>
          </Marker>
        ))}

        {/* Route Line */}
        {origin && destination && (
          <Polyline 
            positions={[[origin.lat, origin.lng], [destination.lat, destination.lng]]} 
            color="blue"
            weight={4}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
