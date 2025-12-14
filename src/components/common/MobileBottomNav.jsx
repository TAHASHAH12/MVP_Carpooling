import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaTachometerAlt, FaCar, FaUser, FaHistory, FaUsers } from 'react-icons/fa';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navItems = user?.isDriver ? [
    { path: '/driver-dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/driver', icon: FaCar, label: 'Drive' },
    { path: '/rider', icon: FaUser, label: 'Ride' },
  ] : [
    { path: '/rider-dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/rider', icon: FaCar, label: 'Ride' },
  ];

  return (
    <div className="mobile-bottom-nav">
      <div className="bottom-nav-items">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`bottom-nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <item.icon />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
