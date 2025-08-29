import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './auth/AuthModal';

const Layout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'municipality': return 'bg-blue-100 text-blue-800';
      case 'commuter': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <span className="text-4xl">🕳️</span>
              <h1 className="text-2xl font-bold">Pothole Mapper</h1>
            </Link>
            
            <nav className="flex space-x-4 items-center">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(user?.role)}`}>
                      {user?.role}
                    </span>
                    <span className="text-white/90">Welcome, {user?.name}</span>
                  </div>
                  
                  <Link
                    to="/report"
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Report Pothole
                  </Link>
                  
                  <Link
                    to="/dashboard"
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActivePage('/dashboard') 
                        ? 'bg-white/30' 
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/map"
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActivePage('/map') 
                        ? 'bg-white/30' 
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    Map View
                  </Link>
                  
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isActivePage('/admin') 
                          ? 'bg-white/30' 
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      Admin Panel
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActivePage('/profile') 
                        ? 'bg-white/30' 
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    Profile
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Report Pothole
                  </button>
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Sign In
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Pothole Mapper. Making roads safer, one pothole at a time.</p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
};

export default Layout;