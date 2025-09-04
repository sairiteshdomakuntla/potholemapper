import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Login from './Login';
import Signup from './Signup';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { theme } = useTheme();

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-black/80' : 'bg-gray-900/80'} backdrop-blur-sm flex items-center justify-center z-50 p-4`}>
      <div className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-gray-800/10 border-gray-600/20 text-gray-900 hover:bg-gray-800/20'} backdrop-blur-md border rounded-full p-2 shadow-lg transition-all duration-300 transform hover:scale-110`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isLoginMode ? (
          <Login
            onSwitchToSignup={() => setIsLoginMode(false)}
            onSuccess={handleSuccess}
          />
        ) : (
          <Signup
            onSwitchToLogin={() => setIsLoginMode(true)}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;