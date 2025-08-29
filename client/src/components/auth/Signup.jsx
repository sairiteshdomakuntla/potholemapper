import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const Signup = ({ onSwitchToLogin, onSuccess }) => {
  const { signup, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Clear error when component mounts only
  useEffect(() => {
    clearError();
  }, []); // Remove clearError from dependencies

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const { confirmPassword, ...submitData } = formData;
    // Add role field for backend validation
    submitData.role = 'commuter';
    
    const result = await signup(submitData);
    
    if (result.success && onSuccess) {
      onSuccess();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-gray-300 mt-2">Join Pothole Mapper as a Commuter</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm disabled:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm disabled:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm disabled:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Create a password (min. 6 characters)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm disabled:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Confirm your password"
          />
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-blue-300">
            <strong>Note:</strong> You'll be registered as a Commuter. Only administrators can create Municipality accounts.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-500/50 disabled:to-orange-600/50 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-0.5 disabled:transform-none"
        >
          {loading ? 'Creating Account...' : 'Create Commuter Account'}
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-400">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            disabled={loading}
            className="text-orange-400 hover:text-orange-300 font-medium disabled:text-orange-500 disabled:cursor-not-allowed transition-colors duration-300"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;