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
    <div>
      {!isAuthenticated ? (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold mb-4">Road Infrastructure Management Dashboard</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Track, manage, and resolve pothole reports efficiently across your municipality
              </p>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="mt-8 bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Started
              </button>
            </div>
          </section>

          {/* Stats Overview */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform border-l-4 border-orange-400">
                  <div className="text-4xl font-bold text-gray-800 mb-2">{stats.reported}</div>
                  <div className="text-lg text-gray-600 font-medium">Reported</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform border-l-4 border-blue-400">
                  <div className="text-4xl font-bold text-gray-800 mb-2">{stats.underRepair}</div>
                  <div className="text-lg text-gray-600 font-medium">Under Repair</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform border-l-4 border-green-400">
                  <div className="text-4xl font-bold text-gray-800 mb-2">{stats.finished}</div>
                  <div className="text-lg text-gray-600 font-medium">Completed</div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-white rounded-xl shadow-lg p-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Sign in to view detailed reports</h3>
                <p className="text-gray-600 mb-8">Access the full dashboard with pothole tracking, reporting, and management features.</p>
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Sign In / Sign Up
                </button>
              </div>
            </div>
          </section>
        </>
      ) : (
        // If authenticated, redirect to dashboard
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Welcome to Pothole Mapper!</h2>
            <div className="space-y-4">
              <Link 
                to="/dashboard" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors mr-4"
              >
                Go to Dashboard
              </Link>
              <Link 
                to="/report" 
                className="inline-block bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors mr-4"
              >
                Report a Pothole
              </Link>
              <Link 
                to="/map" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View Map
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