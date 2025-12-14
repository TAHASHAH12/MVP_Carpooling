import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaCar, FaUser, FaSignOutAlt, FaTachometerAlt, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const goToDashboard = () => {
    setMobileMenuOpen(false);
    if (user?.isDriver) {
      navigate('/driver-dashboard');
    } else {
      navigate('/rider-dashboard');
    }
  };

  const navigateTo = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo" onClick={() => navigateTo('/')}>
            <FaCar className="logo-icon" />
            <h1>RideShare</h1>
          </div>
          
          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="nav-menu">
              <button onClick={goToDashboard} className="nav-link">
                <FaTachometerAlt /> Dashboard
              </button>
              {user?.isDriver ? (
                <>
                  <button onClick={() => navigateTo('/driver')} className="nav-link">
                    Drive
                  </button>
                  <button onClick={() => navigateTo('/rider')} className="nav-link">
                    Ride
                  </button>
                </>
              ) : (
                <button onClick={() => navigateTo('/rider')} className="nav-link">
                  Ride
                </button>
              )}
            </nav>
          )}

          <div className="header-actions">
            {isAuthenticated ? (
              <>
                <div className="user-info">
                  {user?.isDriver ? <FaCar /> : <FaUser />}
                  <span>{user?.name || 'User'}</span>
                  <span className={`role-indicator ${user?.isDriver ? 'driver' : 'rider'}`}>
                    {user?.isDriver ? 'Driver' : 'Rider'}
                  </span>
                </div>
                <button onClick={handleLogout} className="btn-logout">
                  <FaSignOutAlt /> <span>Logout</span>
                </button>
                {/* Mobile Menu Toggle */}
                <button 
                  className="mobile-menu-toggle" 
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <FaBars />
                </button>
              </>
            ) : (
              <button onClick={() => navigateTo('/')} className="btn-primary">
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isAuthenticated && (
        <>
          <div 
            className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <div className="mobile-menu-header">
              <div className="user-info">
                {user?.isDriver ? <FaCar /> : <FaUser />}
                <div>
                  <strong>{user?.name}</strong>
                  <span className={`role-indicator ${user?.isDriver ? 'driver' : 'rider'}`}>
                    {user?.isDriver ? 'Driver' : 'Rider'}
                  </span>
                </div>
              </div>
              <button 
                className="mobile-menu-close" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>
            <div className="mobile-nav-links">
              <button onClick={goToDashboard}>
                <FaTachometerAlt /> Dashboard
              </button>
              {user?.isDriver ? (
                <>
                  <button onClick={() => navigateTo('/driver')}>
                    <FaCar /> Drive
                  </button>
                  <button onClick={() => navigateTo('/rider')}>
                    <FaUser /> Ride
                  </button>
                </>
              ) : (
                <button onClick={() => navigateTo('/rider')}>
                  <FaCar /> Ride
                </button>
              )}
              <button onClick={handleLogout} style={{ color: 'var(--danger-color)' }}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
