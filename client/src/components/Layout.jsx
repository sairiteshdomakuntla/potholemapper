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
      case 'admin': return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
      case 'municipality': return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'commuter': return 'bg-green-500/20 text-green-300 border border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
    }
  };

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-lg border-b border-white/10 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <span className="text-4xl">🕳️</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
                Pothole Mapper
              </h1>
            </Link>
            
            <nav className="flex space-x-4 items-center">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${getRoleBadgeColor(user?.role)}`}>
                      {user?.role}
                    </span>
                    <span className="text-white/90">Welcome, {user?.name}</span>
                  </div>
                  
                  <Link
                    to="/report"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-orange-500/25"
                  >
                    Report Pothole
                  </Link>
                  
                  <Link
                    to="/dashboard"
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm ${
                      isActivePage('/dashboard') 
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' 
                        : 'bg-white/10 border border-white/20 hover:bg-white/20'
                    }`}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/map"
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm ${
                      isActivePage('/map') 
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' 
                        : 'bg-white/10 border border-white/20 hover:bg-white/20'
                    }`}
                  >
                    Map View
                  </Link>
                  
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm ${
                        isActivePage('/admin') 
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' 
                          : 'bg-white/10 border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      Admin Panel
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm ${
                      isActivePage('/profile') 
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' 
                        : 'bg-white/10 border border-white/20 hover:bg-white/20'
                    }`}
                  >
                    Profile
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="bg-white/10 border border-white/20 hover:bg-white/20 px-4 py-2 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-orange-500/25"
                  >
                    Report Pothole
                  </button>
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="bg-white/10 border border-white/20 hover:bg-white/20 px-4 py-2 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm"
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
      <footer className="bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-lg border-t border-white/10 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">&copy; 2025 Pothole Mapper. Making roads safer, one pothole at a time.</p>
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