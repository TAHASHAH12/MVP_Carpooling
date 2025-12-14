import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRide } from '../context/RideContext';
import { useCarpool } from '../context/CarpoolContext';
import Header from '../components/common/Header';
import UserProfile from '../components/auth/UserProfile';
import RideHistory from '../components/payment/RideHistory';
import ActiveRide from '../components/ride/ActiveRide';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { 
  FaHistory, 
  FaUser, 
  FaChartLine, 
  FaCar, 
  FaUsers, 
  FaDollarSign, 
  FaStar,
  FaRoute,
  FaClock
} from 'react-icons/fa';

const RiderDashboard = () => {
  const { user } = useAuth();
  const { rideHistory, currentRide } = useRide();
  const { carpools } = useCarpool();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Calculate rider statistics
  const completedRides = rideHistory.filter(r => r.status === 'completed').length;
  const totalSpent = rideHistory
    .filter(r => r.status === 'completed')
    .reduce((sum, ride) => sum + (parseFloat(ride.fare) || 0), 0);
  const joinedCarpools = carpools.filter(cp => 
    cp.passengers?.some(p => p.id === user?.id)
  ).length;

  return (
    <div className="dashboard-page">
      <Header />
      
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="sidebar-header">
            <div className="user-avatar-large">
              <FaUser size={32} />
            </div>
            <h3>{user?.name}</h3>
            <span className="user-role-badge rider">Rider</span>
          </div>

          <nav className="dashboard-nav">
            <button 
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              <FaChartLine /> Overview
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
              <FaHistory /> Ride History
            </button>
          </nav>

          <div className="sidebar-quick-actions">
            <h4>Quick Actions</h4>
            <Button 
              onClick={() => navigate('/rider')} 
              variant="primary" 
              className="btn-full"
            >
              <FaCar /> Book a Ride
            </Button>
            <Button 
              onClick={() => navigate('/rider')} 
              variant="secondary" 
              className="btn-full"
            >
              <FaUsers /> Find Carpool
            </Button>
          </div>
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="dashboard-header">
                <div>
                  <h1>Welcome back, {user?.name}! 👋</h1>
                  <p>Here's your riding activity overview</p>
                </div>
                <div className="header-actions">
                  <Button onClick={() => navigate('/rider')} variant="primary">
                    <FaCar /> Book New Ride
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
                    <h3>${totalSpent.toFixed(2)}</h3>
                    <p>Total Spent</p>
                  </div>
                </div>

                <div className="stat-card-modern">
                  <div className="stat-icon-wrapper warning">
                    <FaUsers />
                  </div>
                  <div className="stat-details">
                    <h3>{joinedCarpools}</h3>
                    <p>Carpools Joined</p>
                  </div>
                </div>

                <div className="stat-card-modern">
                  <div className="stat-icon-wrapper info">
                    <FaStar />
                  </div>
                  <div className="stat-details">
                    <h3>{user?.rating || 5.0}</h3>
                    <p>Your Rating</p>
                  </div>
                </div>
              </div>

              {/* Active Ride Section */}
              {currentRide ? (
                <div className="section-card">
                  <h2>Active Ride</h2>
                  <ActiveRide />
                </div>
              ) : (
                <div className="empty-state">
                  <FaCar size={64} />
                  <h3>No Active Ride</h3>
                  <p>Ready to go somewhere? Book your next ride now!</p>
                  <Button onClick={() => navigate('/rider')} variant="primary">
                    Book a Ride
                  </Button>
                </div>
              )}

              {/* Recent Activity */}
              <div className="section-card">
                <h2>Recent Activity</h2>
                {rideHistory.length > 0 ? (
                  <div className="recent-rides-list">
                    {rideHistory.slice(0, 3).map((ride, index) => (
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
                        <div className="ride-fare">
                          ${ride.fare}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state-small">
                    <p>No rides yet. Start your journey today!</p>
                  </div>
                )}
              </div>
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
              <RideHistory />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
