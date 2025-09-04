import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import AuthModal from './auth/AuthModal';

const Layout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
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
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      {/* Header */}
      <header className={`backdrop-blur-lg border-b shadow-lg transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-900/95 to-black/95 border-white/10 text-white' 
          : 'bg-gradient-to-r from-white/95 to-gray-100/95 border-gray-200 text-gray-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <span className="text-4xl">🕳️</span>
              <h1 className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-white to-orange-400' 
                  : 'from-gray-900 to-orange-600'
              }`}>
                Pothole Mapper
              </h1>
            </Link>
            
            <nav className="flex space-x-4 items-center">
              {isAuthenticated ? (
                <>
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
                        : isDarkMode
                          ? 'bg-white/10 border border-white/20 hover:bg-white/20 text-white'
                          : 'bg-gray-200 border border-gray-300 hover:bg-gray-300 text-gray-900'
                    }`}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/map"
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm ${
                      isActivePage('/map') 
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' 
                        : isDarkMode
                          ? 'bg-white/10 border border-white/20 hover:bg-white/20 text-white'
                          : 'bg-gray-200 border border-gray-300 hover:bg-gray-300 text-gray-900'
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
                          : isDarkMode
                            ? 'bg-white/10 border border-white/20 hover:bg-white/20 text-white'
                            : 'bg-gray-200 border border-gray-300 hover:bg-gray-300 text-gray-900'
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
                        : isDarkMode
                          ? 'bg-white/10 border border-white/20 hover:bg-white/20 text-white'
                          : 'bg-gray-200 border border-gray-300 hover:bg-gray-300 text-gray-900'
                    }`}
                  >
                    Profile
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm ${
                      isDarkMode
                        ? 'bg-white/10 border border-white/20 hover:bg-white/20 text-white'
                        : 'bg-gray-200 border border-gray-300 hover:bg-gray-300 text-gray-900'
                    }`}
                  >
                    Logout
                  </button>
                  
                  <button 
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-all duration-300 backdrop-blur-sm hover:scale-110 ${
                      isDarkMode
                        ? 'bg-white/10 border border-white/20 hover:bg-white/20'
                        : 'bg-gray-200 border border-gray-300 hover:bg-gray-300'
                    }`}
                    title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {isDarkMode ? (
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM18.894 17.834a.75.75 0 00-1.06 1.06l-1.591-1.59a.75.75 0 111.06-1.061l1.591 1.59zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                      </svg>
                    )}
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
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm ${
                      isDarkMode
                        ? 'bg-white/10 border border-white/20 hover:bg-white/20 text-white'
                        : 'bg-gray-200 border border-gray-300 hover:bg-gray-300 text-gray-900'
                    }`}
                  >
                    Sign In
                  </button>
                  
                  <button 
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-all duration-300 backdrop-blur-sm hover:scale-110 ${
                      isDarkMode
                        ? 'bg-white/10 border border-white/20 hover:bg-white/20'
                        : 'bg-gray-200 border border-gray-300 hover:bg-gray-300'
                    }`}
                    title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {isDarkMode ? (
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM18.894 17.834a.75.75 0 00-1.06 1.06l-1.591-1.59a.75.75 0 111.06-1.061l1.591 1.59zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                      </svg>
                    )}
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
      <footer className={`backdrop-blur-lg border-t py-8 mt-16 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-900/95 to-black/95 border-white/10 text-white' 
          : 'bg-gradient-to-r from-white/95 to-gray-100/95 border-gray-200 text-gray-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            &copy; 2025 Pothole Mapper. Making roads safer, one pothole at a time.
          </p>
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