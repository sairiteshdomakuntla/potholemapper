import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './auth/AuthModal';

function HomePage() {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [stats, setStats] = useState({
    reported: 3,
    underRepair: 2,
    finished: 3
  });

  return (
    <div className="min-h-screen bg-black">
      {!isAuthenticated ? (
        <>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-lg text-white py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/5"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="text-8xl mb-8">🕳️</div>
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
                Pothole Mapper
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                Smart road infrastructure management for safer communities
              </p>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
                Report, track, and resolve pothole issues efficiently with our comprehensive dashboard
              </p>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-orange-500/25"
              >
                Get Started Today
              </button>
            </div>
          </section>

          {/* Stats Overview */}
          <section className="py-16 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent mb-4">
                  Real-Time Dashboard
                </h3>
                <p className="text-gray-300 text-lg">Monitor pothole reports and repairs across your municipality</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300 border-l-4 border-l-orange-400">
                  <div className="text-5xl mb-4">📍</div>
                  <div className="text-4xl font-bold text-white mb-2">{stats.reported}</div>
                  <div className="text-lg text-gray-300 font-medium">Active Reports</div>
                  <div className="text-sm text-gray-400 mt-2">Awaiting attention</div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300 border-l-4 border-l-orange-400">
                  <div className="text-5xl mb-4">🚧</div>
                  <div className="text-4xl font-bold text-white mb-2">{stats.underRepair}</div>
                  <div className="text-lg text-gray-300 font-medium">Under Repair</div>
                  <div className="text-sm text-gray-400 mt-2">Work in progress</div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300 border-l-4 border-l-orange-400">
                  <div className="text-5xl mb-4">✅</div>
                  <div className="text-4xl font-bold text-white mb-2">{stats.finished}</div>
                  <div className="text-lg text-gray-300 font-medium">Completed</div>
                  <div className="text-sm text-gray-400 mt-2">Successfully resolved</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-gradient-to-b from-black to-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent mb-4">
                  Why Choose Pothole Mapper?
                </h3>
                <p className="text-gray-300 text-lg">Comprehensive tools for efficient road maintenance</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 text-center">
                  <div className="text-5xl mb-4">🗺️</div>
                  <h4 className="text-xl font-bold text-white mb-3">Interactive Maps</h4>
                  <p className="text-gray-300">Visualize all pothole locations on an interactive map with real-time updates</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 text-center">
                  <div className="text-5xl mb-4">📱</div>
                  <h4 className="text-xl font-bold text-white mb-3">Easy Reporting</h4>
                  <p className="text-gray-300">Citizens can quickly report potholes with photos and GPS coordinates</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 text-center">
                  <div className="text-5xl mb-4">📊</div>
                  <h4 className="text-xl font-bold text-white mb-3">Analytics Dashboard</h4>
                  <p className="text-gray-300">Track progress, analyze trends, and manage municipal resources effectively</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 text-center">
                  <div className="text-5xl mb-4">👥</div>
                  <h4 className="text-xl font-bold text-white mb-3">Multi-User Support</h4>
                  <p className="text-gray-300">Different access levels for citizens, municipality staff, and administrators</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 text-center">
                  <div className="text-5xl mb-4">🔔</div>
                  <h4 className="text-xl font-bold text-white mb-3">Real-time Updates</h4>
                  <p className="text-gray-300">Get instant notifications on report status and repair progress</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 text-center">
                  <div className="text-5xl mb-4">🛡️</div>
                  <h4 className="text-xl font-bold text-white mb-3">Secure & Reliable</h4>
                  <p className="text-gray-300">Built with security best practices and reliable cloud infrastructure</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 bg-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-12">
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
                <p className="text-gray-300 mb-8 text-lg">Join municipalities and citizens working together for safer roads</p>
                <div className="space-y-4">
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-orange-500/25 mx-2"
                  >
                    Sign Up Now
                  </button>
                  <div className="text-sm text-gray-400 mt-4">
                    Already have an account? 
                    <button 
                      onClick={() => setShowAuthModal(true)}
                      className="text-orange-400 hover:text-orange-300 font-medium ml-1"
                    >
                      Sign in here
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        // If authenticated, show welcome section
        <section className="py-24 bg-gradient-to-b from-black to-gray-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-8">👋</div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent mb-8">
              Welcome Back to Pothole Mapper!
            </h2>
            <p className="text-xl text-gray-300 mb-12">Choose what you'd like to do today</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                to="/dashboard" 
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 shadow-lg group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📊</div>
                <h3 className="text-xl font-bold text-white mb-2">Dashboard</h3>
                <p className="text-gray-300">View reports and track progress</p>
              </Link>
              
              <Link 
                to="/report" 
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 shadow-lg group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📍</div>
                <h3 className="text-xl font-bold text-white mb-2">Report Issue</h3>
                <p className="text-gray-300">Report a new pothole</p>
              </Link>
              
              <Link 
                to="/map" 
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 shadow-lg group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🗺️</div>
                <h3 className="text-xl font-bold text-white mb-2">Map View</h3>
                <p className="text-gray-300">Explore interactive map</p>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}

export default HomePage;