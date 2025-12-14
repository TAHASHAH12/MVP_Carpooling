import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import Input from '../common/Input';

const LocationPicker = ({ onLocationSelect, label = "Location" }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Mock location suggestions
  const mockLocations = [
    { id: 1, name: 'Times Square, New York', lat: 40.7580, lng: -73.9855 },
    { id: 2, name: 'Central Park, New York', lat: 40.7829, lng: -73.9654 },
    { id: 3, name: 'Brooklyn Bridge, New York', lat: 40.7061, lng: -73.9969 },
    { id: 4, name: 'Empire State Building', lat: 40.7484, lng: -73.9857 },
    { id: 5, name: 'Statue of Liberty', lat: 40.6892, lng: -74.0445 },
  ];

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value.length > 2) {
      const filtered = mockLocations.filter(loc => 
        loc.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (location) => {
    setSearchQuery(location.name);
    setSuggestions([]);
    onLocationSelect(location);
  };

  return (
    <div className="location-picker">
      <div className="location-input-wrapper">
        <FaMapMarkerAlt className="location-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={label}
          className="location-input"
        />
        <FaSearch className="search-icon" />
      </div>
      
      {suggestions.length > 0 && (
        <div className="location-suggestions">
          {suggestions.map(location => (
            <div 
              key={location.id} 
              className="suggestion-item"
              onClick={() => handleSelect(location)}
            >
              <FaMapMarkerAlt />
              <span>{location.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
