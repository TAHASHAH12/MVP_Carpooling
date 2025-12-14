import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRide } from '../context/RideContext';
import { useCarpool } from '../context/CarpoolContext';
import Header from '../components/common/Header';
import UserProfile from '../components/auth/UserProfile';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import CreateCarpool from '../components/carpool/CreateCarpool';
import { useNavigate } from 'react-router-dom';
import { 
  FaHistory, 
  FaUser, 
  FaChartLine, 
  FaCar, 
  FaDollarSign, 
  FaStar,
  FaClock,
  FaPlus,
  FaCheckCircle,
  FaUsers,
  FaRoute
} from 'react-icons/fa';

const DriverDashboard = () => {
  const { user } = useAuth();
  const { rideHistory } = useRide();
  const { mycarpools } = useCarpool();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCarpoolModal, setShowCarpoolModal] = useState(false);
  const navigate = useNavigate();

  // Calculate driver statistics
  const completedRides = rideHistory.filter(r => r.status === 'completed').length;
  const totalEarnings = rideHistory
    .filter(r => r.status === 'completed')
    .reduce((sum, ride) => sum + (parseFloat(ride.fare) || 0), 0);
  const activeCarpools = mycarpools?.filter(cp => cp.status === 'open').length || 0;
  const totalCarpools = mycarpools?.length || 0;

  return (
    <div className="dashboard-page">
      <Header />
      
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="sidebar-header">
            <div className="user-avatar-large driver">
              <FaCar size={32} />
            </div>
            <h3>{user?.name}</h3>
            <span className="user-role-badge driver">Driver</span>
            {user?.driverInfo?.verified ? (
              <span className="verified-badge">
                <FaCheckCircle /> Verified
              </span>
            ) : (
              <span className="pending-badge">
                <FaClock /> Pending Verification
              </span>
            )}
          </div>

          <nav className="dashboard-nav">
            <button 
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              <FaChartLine /> Overview
            </button>
            <button 
              className={activeTab === 'carpools' ? 'active' : ''}
              onClick={() => setActiveTab('carpools')}
            >
              <FaUsers /> My Carpools
            </button>
            <button 
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              <FaUser /> Profile
            </button>
            <button 
              className={activeTab === 'history' ? 'active' : ''}
              onClick={() => setActiveTab('history')}
            >
              <FaHistory /> Earnings History
            </button>
          </nav>

          <div className="sidebar-quick-actions">
            <h4>Quick Actions</h4>
            <Button 
              onClick={() => setShowCarpoolModal(true)} 
              variant="primary" 
              className="btn-full"
            >
              <FaPlus /> Create Carpool
            </Button>
            <Button 
              onClick={() => navigate('/driver')} 
              variant="secondary" 
              className="btn-full"
            >
              <FaCar /> Go Online
            </Button>
          </div>

          {/* Vehicle Info Card */}
          {user?.driverInfo && (
            <div className="vehicle-info-card">
              <h4>Your Vehicle</h4>
              <div className="vehicle-details">
                <p><strong>{user.driverInfo.vehicleMake} {user.driverInfo.vehicleModel}</strong></p>
                <p className="vehicle-meta">{user.driverInfo.vehicleYear} • {user.driverInfo.vehicleColor}</p>
                <p className="vehicle-plate">{user.driverInfo.licensePlate}</p>
              </div>
            </div>
          )}
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="dashboard-header">
                <div>
                  <h1>Welcome back, {user?.name}! 🚗</h1>
                  <p>Here's your driver performance overview</p>
                </div>
                <div className="header-actions">
                  <Button onClick={() => setShowCarpoolModal(true)} variant="primary">
                    <FaPlus /> Create Carpool
                  </Button>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="stats-grid-4">
                <div className="stat-card-modern">
                  <div className="stat-icon-wrapper primary">
                    <FaRoute />
                  </div>
                  <div className="stat-details">
                    <h3>{completedRides}</h3>
                    <p>Total Rides</p>
                  </div>
                </div>

                <div className="stat-card-modern">
                  <div className="stat-icon-wrapper success">
                    <FaDollarSign />
                  </div>
                  <div className="stat-details">
                    <h3>${totalEarnings.toFixed(2)}</h3>
                    <p>Total Earnings</p>
                  </div>
                </div>

                <div className="stat-card-modern">
                  <div className="stat-icon-wrapper warning">
                    <FaUsers />
                  </div>
                  <div className="stat-details">
                    <h3>{activeCarpools}</h3>
                    <p>Active Carpools</p>
                  </div>
                </div>

                <div className="stat-card-modern">
                  <div className="stat-icon-wrapper info">
                    <FaStar />
                  </div>
                  <div className="stat-details">
                    <h3>{user?.rating || 5.0}</h3>
                    <p>Driver Rating</p>
                  </div>
                </div>
              </div>

              {/* Earnings Chart Section */}
              <div className="section-card">
                <h2>Earnings Overview</h2>
                <div className="earnings-summary">
                  <div className="earning-item">
                    <span className="earning-label">Today</span>
                    <span className="earning-value">$0.00</span>
                  </div>
                  <div className="earning-item">
                    <span className="earning-label">This Week</span>
                    <span className="earning-value">${totalEarnings > 0 ? (totalEarnings * 0.3).toFixed(2) : '0.00'}</span>
                  </div>
                  <div className="earning-item">
                    <span className="earning-label">This Month</span>
                    <span className="earning-value">${totalEarnings.toFixed(2)}</span>
                  </div>
                  <div className="earning-item">
                    <span className="earning-label">All Time</span>
                    <span className="earning-value">${totalEarnings.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="section-card">
                <h2>Recent Rides</h2>
                {rideHistory.length > 0 ? (
                  <div className="recent-rides-list">
                    {rideHistory.slice(0, 5).map((ride, index) => (
                      <div key={index} className="recent-ride-item">
                        <div className="ride-icon">
                          <FaCar />
                        </div>
                        <div className="ride-info">
                          <h4>{ride.origin?.name} → {ride.destination?.name}</h4>
                          <p className="ride-meta">
                            <FaClock /> {new Date(ride.createdAt).toLocaleDateString()}
                            <span className={`status-pill ${ride.status}`}>
                              {ride.status}
                            </span>
                          </p>
                        </div>
                        <div className="ride-fare success">
                          +${ride.fare}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state-small">
                    <p>No rides completed yet. Create a carpool to get started!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'carpools' && (
            <div className="carpools-tab">
              <div className="section-header">
                <h1>My Carpools</h1>
                <Button onClick={() => setShowCarpoolModal(true)} variant="primary">
                  <FaPlus /> Create New
                </Button>
              </div>

              {totalCarpools > 0 ? (
                <div className="carpools-grid">
                  {mycarpools.map((carpool) => (
                    <div key={carpool.id} className="carpool-card-driver">
                      <div className="carpool-status-header">
                        <span className={`status-badge ${carpool.status}`}>
                          {carpool.status}
                        </span>
                        <span className="carpool-date">
                          {carpool.date} at {carpool.time}
                        </span>
                      </div>
                      <div className="carpool-route-info">
                        <p className="route-from">{carpool.origin?.name}</p>
                        <div className="route-arrow">→</div>
                        <p className="route-to">{carpool.destination?.name}</p>
                      </div>
                      <div className="carpool-stats">
                        <div className="stat">
                          <FaUsers />
                          <span>{carpool.passengers?.length || 0}/{carpool.totalSeats}</span>
                        </div>
                        <div className="stat">
                          <FaDollarSign />
                          <span>${carpool.pricePerSeat}/seat</span>
                        </div>
                      </div>
                      {carpool.passengers && carpool.passengers.length > 0 && (
                        <div className="passengers-list">
                          <h5>Passengers:</h5>
                          {carpool.passengers.map((passenger, idx) => (
                            <div key={idx} className="passenger-item">
                              <FaUser /> {passenger.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <FaUsers size={64} />
                  <h3>No Carpools Yet</h3>
                  <p>Create your first carpool and start earning!</p>
                  <Button onClick={() => setShowCarpoolModal(true)} variant="primary">
                    <FaPlus /> Create Carpool
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="profile-tab">
              <h1>My Profile</h1>
              <UserProfile />
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="history-tab">
              <h1>Earnings History</h1>
              <div className="earnings-history">
                {rideHistory.filter(r => r.status === 'completed').length > 0 ? (
                  <div className="history-list">
                    {rideHistory.filter(r => r.status === 'completed').map((ride, index) => (
                      <div key={index} className="history-item">
                        <div className="history-header">
                          <span className="status-badge completed">Completed</span>
                          <span className="ride-date">
                            <FaClock /> {new Date(ride.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="history-route">
                          <div className="route-point">
                            <span>{ride.origin?.name}</span>
                          </div>
                          <div className="route-line"></div>
                          <div className="route-point">
                            <span>{ride.destination?.name}</span>
                          </div>
                        </div>
                        <div className="history-footer">
                          <div className="ride-details">
                            <span>Distance: {ride.distance} km</span>
                            <span>Type: {ride.rideType}</span>
                          </div>
                          <div className="ride-earning">
                            <span>Earned:</span>
                            <strong className="earning-amount">+${ride.fare}</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <FaDollarSign size={64} />
                    <h3>No Earnings Yet</h3>
                    <p>Complete rides to start earning money!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
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

export default DriverDashboard;
