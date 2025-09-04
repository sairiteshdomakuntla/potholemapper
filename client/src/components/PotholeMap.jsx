import React from 'react';
import { useTheme } from '../context/ThemeContext';

const PotholeMap = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'} py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-800/5 border-gray-300/20'} backdrop-blur-lg border rounded-xl shadow-lg p-8`}>
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-white to-orange-400' : 'from-gray-900 to-orange-600'} bg-clip-text text-transparent`}>
              Pothole Map View
            </h1>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-2`}>Interactive map showing all reported potholes</p>
          </div>

          <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-200/50 border-gray-300/30'} backdrop-blur-sm border rounded-lg h-96 flex items-center justify-center`}>
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>Map Integration Coming Soon</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                This will integrate with Google Maps or similar service to show pothole locations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className={`${theme === 'dark' ? 'bg-red-500/20 border-red-500/30' : 'bg-red-100 border-red-300'} border backdrop-blur-sm p-4 rounded-lg`}>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className={`font-medium ${theme === 'dark' ? 'text-red-300' : 'text-red-800'}`}>High Severity</span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-red-200' : 'text-red-700'}`}>Immediate attention required</p>
            </div>
            <div className={`${theme === 'dark' ? 'bg-yellow-500/20 border-yellow-500/30' : 'bg-yellow-100 border-yellow-300'} border backdrop-blur-sm p-4 rounded-lg`}>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className={`font-medium ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'}`}>Medium Severity</span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-yellow-200' : 'text-yellow-700'}`}>Should be addressed soon</p>
            </div>
            <div className={`${theme === 'dark' ? 'bg-green-500/20 border-green-500/30' : 'bg-green-100 border-green-300'} border backdrop-blur-sm p-4 rounded-lg`}>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className={`font-medium ${theme === 'dark' ? 'text-green-300' : 'text-green-800'}`}>Low Severity</span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-green-200' : 'text-green-700'}`}>Minor issue, low priority</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PotholeMap;