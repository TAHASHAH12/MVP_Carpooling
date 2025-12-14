import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaCar, FaDollarSign, FaStar, FaClock } from 'react-icons/fa';

const DriverDashboard = () => {
  const { user } = useAuth();
  const [stats] = useState({
    totalRides: 142,
    earnings: 3250,
    rating: 4.8,
    hoursOnline: 156,
  });

  return (
    <div className="driver-dashboard">
      <div className="dashboard-header">
        <h2>Driver Dashboard</h2>
        <p>Welcome back, {user?.name}!</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaCar />
          </div>
          <div className="stat-info">
            <h3>{stats.totalRides}</h3>
            <p>Total Rides</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaDollarSign />
          </div>
          <div className="stat-info">
            <h3>${stats.earnings}</h3>
            <p>Total Earnings</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaStar />
          </div>
          <div className="stat-info">
            <h3>{stats.rating}</h3>
            <p>Average Rating</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-info">
            <h3>{stats.hoursOnline}h</h3>
            <p>Hours Online</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-info">
              <p className="activity-title">Ride to Times Square</p>
              <p className="activity-time">2 hours ago</p>
            </div>
            <div className="activity-amount">$25</div>
          </div>
          <div className="activity-item">
            <div className="activity-info">
              <p className="activity-title">Carpool to Brooklyn</p>
              <p className="activity-time">5 hours ago</p>
            </div>
            <div className="activity-amount">$18</div>
          </div>
          <div className="activity-item">
            <div className="activity-info">
              <p className="activity-title">Ride to JFK Airport</p>
              <p className="activity-time">Yesterday</p>
            </div>
            <div className="activity-amount">$45</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
