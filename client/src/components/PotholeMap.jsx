import React from 'react';

const PotholeMap = () => {
  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
              Pothole Map View
            </h1>
            <p className="text-gray-300 mt-2">Interactive map showing all reported potholes</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Map Integration Coming Soon</h3>
              <p className="text-gray-300">
                This will integrate with Google Maps or similar service to show pothole locations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-red-500/20 border border-red-500/30 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="font-medium text-red-300">High Severity</span>
              </div>
              <p className="text-sm text-red-200">Immediate attention required</p>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-500/30 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="font-medium text-yellow-300">Medium Severity</span>
              </div>
              <p className="text-sm text-yellow-200">Should be addressed soon</p>
            </div>
            <div className="bg-green-500/20 border border-green-500/30 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-300">Low Severity</span>
              </div>
              <p className="text-sm text-green-200">Minor issue, low priority</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PotholeMap;