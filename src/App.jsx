import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RideProvider } from './context/RideContext';
import { CarpoolProvider } from './context/CarpoolContext';
import Home from './pages/Home';
import RiderDashboard from './pages/RiderDashboard';
import DriverDashboard from './pages/DriverDashboard';
import RiderPage from './pages/RiderPage';
import DriverPage from './pages/DriverPage';

// Protected Route Component
const ProtectedRoute = ({ children, requireDriver }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  if (requireDriver && !user?.isDriver) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

// Dashboard Router - redirects based on user role
const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (user?.isDriver) {
    return <Navigate to="/driver-dashboard" />;
  }
  
  return <Navigate to="/rider-dashboard" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <RideProvider>
          <CarpoolProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Redirect /dashboard based on user role */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardRouter />
                  </ProtectedRoute>
                } 
              />
              
              {/* Rider Routes */}
              <Route 
                path="/rider-dashboard" 
                element={
                  <ProtectedRoute>
                    <RiderDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/rider" 
                element={
                  <ProtectedRoute>
                    <RiderPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Driver Routes */}
              <Route 
                path="/driver-dashboard" 
                element={
                  <ProtectedRoute requireDriver>
                    <DriverDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/driver" 
                element={
                  <ProtectedRoute requireDriver>
                    <DriverPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </CarpoolProvider>
        </RideProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
