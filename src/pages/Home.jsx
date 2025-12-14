import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../components/auth/Login';
import RiderRegister from '../components/auth/RiderRegister';
import DriverRegister from '../components/auth/DriverRegister';
import { FaCar, FaUsers, FaDollarSign, FaLeaf, FaUserAlt, FaCarSide } from 'react-icons/fa';

const Home = () => {
  const [authMode, setAuthMode] = useState('login'); // login, rider-register, driver-register
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="hero-content">
          <h1>Welcome to RideShare</h1>
          <p>Your trusted carpooling and ride-sharing platform</p>
          
          <div className="features">
            <div className="feature">
              <FaCar size={40} />
              <h3>Easy Booking</h3>
              <p>Book rides in seconds</p>
            </div>
            <div className="feature">
              <FaUsers size={40} />
              <h3>Carpool</h3>
              <p>Share rides, save money</p>
            </div>
            <div className="feature">
              <FaDollarSign size={40} />
              <h3>Affordable</h3>
              <p>Best prices guaranteed</p>
            </div>
            <div className="feature">
              <FaLeaf size={40} />
              <h3>Eco-Friendly</h3>
              <p>Reduce carbon footprint</p>
            </div>
          </div>

          {/* Role Selection Cards */}
          {authMode === 'login' && (
            <div className="role-selection">
              <h3>Join as</h3>
              <div className="role-cards">
                <div className="role-card" onClick={() => setAuthMode('rider-register')}>
                  <FaUserAlt size={48} />
                  <h4>Rider</h4>
                  <p>Book rides and carpools</p>
                </div>
                <div className="role-card" onClick={() => setAuthMode('driver-register')}>
                  <FaCarSide size={48} />
                  <h4>Driver</h4>
                  <p>Offer rides and earn</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="auth-container">
          {authMode === 'login' && (
            <Login 
              onSwitchToRiderRegister={() => setAuthMode('rider-register')}
              onSwitchToDriverRegister={() => setAuthMode('driver-register')}
            />
          )}
          {authMode === 'rider-register' && (
            <RiderRegister 
              onSwitchToLogin={() => setAuthMode('login')}
              onSwitchToDriver={() => setAuthMode('driver-register')}
            />
          )}
          {authMode === 'driver-register' && (
            <DriverRegister 
              onSwitchToLogin={() => setAuthMode('login')}
              onSwitchToRider={() => setAuthMode('rider-register')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
