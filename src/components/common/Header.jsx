import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaCar, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate('/')}>
          <FaCar className="logo-icon" />
          <h1>RideShare</h1>
        </div>
        
        {isAuthenticated && (
          <nav className="nav-menu">
            <button onClick={() => navigate('/dashboard')} className="nav-link">
              Dashboard
            </button>
            <button onClick={() => navigate('/rider')} className="nav-link">
              Ride
            </button>
            <button onClick={() => navigate('/driver')} className="nav-link">
              Drive
            </button>
          </nav>
        )}

        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <div className="user-info">
                <FaUser />
                <span>{user?.name || 'User'}</span>
              </div>
              <button onClick={handleLogout} className="btn-logout">
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <button onClick={() => navigate('/')} className="btn-primary">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
