import React, { useState } from 'react';
import Header from '../components/common/Header';
import DriverDashboard from '../components/driver/DriverDashboard';
import DriverRegistration from '../components/driver/DriverRegistration';
import CreateCarpool from '../components/carpool/CreateCarpool';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import { FaPlus } from 'react-icons/fa';

const DriverPage = () => {
  const { user } = useAuth();
  const [showCarpoolModal, setShowCarpoolModal] = useState(false);
  const isDriver = user?.role === 'driver';

  if (!isDriver) {
    return (
      <div className="driver-page">
        <Header />
        <div className="driver-registration-container">
          <DriverRegistration />
        </div>
      </div>
    );
  }

  return (
    <div className="driver-page">
      <Header />
      
      <div className="driver-container">
        <div className="driver-header">
          <h1>Driver Portal</h1>
          <Button 
            onClick={() => setShowCarpoolModal(true)} 
            variant="primary"
          >
            <FaPlus /> Create Carpool
          </Button>
        </div>

        <DriverDashboard />
      </div>

      <Modal
        isOpen={showCarpoolModal}
        onClose={() => setShowCarpoolModal(false)}
        title="Create New Carpool"
      >
        <CreateCarpool onClose={() => setShowCarpoolModal(false)} />
      </Modal>
    </div>
  );
};

export default DriverPage;
