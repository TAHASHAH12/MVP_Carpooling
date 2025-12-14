import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/common/Header';
import UserProfile from '../components/auth/UserProfile';
import RideHistory from '../components/payment/RideHistory';
import ActiveRide from '../components/ride/ActiveRide';
import { FaHistory, FaUser, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard-page">
      <Header />
      
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <h2>Dashboard</h2>
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
              <FaHistory /> History
            </button>
          </nav>
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <h1>Welcome, {user?.name}!</h1>
              <div className="quick-stats">
                <div className="stat-card">
                  <h3>0</h3>
                  <p>Total Rides</p>
                </div>
                <div className="stat-card">
                  <h3>$0</h3>
                  <p>Total Spent</p>
                </div>
                <div className="stat-card">
                  <h3>{user?.rating || 5.0}</h3>
                  <p>Your Rating</p>
                </div>
              </div>
              <ActiveRide />
            </div>
          )}
          
          {activeTab === 'profile' && <UserProfile />}
          {activeTab === 'history' && <RideHistory />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
