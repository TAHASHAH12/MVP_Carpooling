import React, { useState } from 'react';
import { useCarpool } from '../../context/CarpoolContext';
import { useAuth } from '../../context/AuthContext';
import CarpoolCard from './CarpoolCard';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { FaSearch, FaFilter } from 'react-icons/fa';

const CarpoolList = () => {
  const { carpools, joinCarpool } = useCarpool();
  const { user } = useAuth();
  const [filters, setFilters] = useState({ origin: '', destination: '', date: '' });
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedCarpool, setSelectedCarpool] = useState(null);

  const handleJoinClick = (carpool) => {
    setSelectedCarpool(carpool);
    setShowJoinModal(true);
  };

  const handleConfirmJoin = () => {
    if (selectedCarpool) {
      joinCarpool(selectedCarpool.id, {
        id: user.id,
        name: user.name,
        joinedAt: new Date().toISOString(),
      });
      alert('Successfully joined carpool!');
      setShowJoinModal(false);
      setSelectedCarpool(null);
    }
  };

  const filteredCarpools = carpools.filter(carpool => {
    if (filters.origin && !carpool.origin?.name.toLowerCase().includes(filters.origin.toLowerCase())) {
      return false;
    }
    if (filters.destination && !carpool.destination?.name.toLowerCase().includes(filters.destination.toLowerCase())) {
      return false;
    }
    if (filters.date && carpool.date !== filters.date) {
      return false;
    }
    return true;
  });

  return (
    <div className="carpool-list">
      <div className="carpool-list-header">
        <h2>Available Carpools</h2>
        <div className="carpool-filters">
          <Input
            placeholder="Origin"
            value={filters.origin}
            onChange={(e) => setFilters({...filters, origin: e.target.value})}
          />
          <Input
            placeholder="Destination"
            value={filters.destination}
            onChange={(e) => setFilters({...filters, destination: e.target.value})}
          />
          <Input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({...filters, date: e.target.value})}
          />
          <Button variant="secondary">
            <FaFilter /> Filter
          </Button>
        </div>
      </div>

      <div className="carpool-grid">
        {filteredCarpools.length > 0 ? (
          filteredCarpools.map(carpool => (
            <CarpoolCard 
              key={carpool.id} 
              carpool={carpool} 
              onJoin={handleJoinClick}
            />
          ))
        ) : (
          <div className="no-carpools">
            <p>No carpools available matching your criteria</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        title="Join Carpool"
      >
        {selectedCarpool && (
          <div className="join-carpool-modal">
            <p>Are you sure you want to join this carpool?</p>
            <div className="carpool-summary">
              <p><strong>Route:</strong> {selectedCarpool.origin?.name} → {selectedCarpool.destination?.name}</p>
              <p><strong>Date & Time:</strong> {selectedCarpool.date} at {selectedCarpool.time}</p>
              <p><strong>Price:</strong> ${selectedCarpool.pricePerSeat}</p>
            </div>
            <div className="modal-actions">
              <Button onClick={handleConfirmJoin} variant="primary" className="btn-full">
                Confirm Join
              </Button>
              <Button onClick={() => setShowJoinModal(false)} variant="secondary" className="btn-full">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CarpoolList;
