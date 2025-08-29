import React from 'react';

const PotholeMap = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Pothole Map View</h1>
            <p className="text-gray-600 mt-2">Interactive map showing all reported potholes</p>
          </div>

          <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Map Integration Coming Soon</h3>
              <p className="text-gray-500">
                This will integrate with Google Maps or similar service to show pothole locations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="font-medium text-red-800">High Severity</span>
              </div>
              <p className="text-sm text-red-700">Immediate attention required</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="font-medium text-yellow-800">Medium Severity</span>
              </div>
              <p className="text-sm text-yellow-700">Should be addressed soon</p>
            </div>
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-800">Low Severity</span>
              </div>
              <p className="text-sm text-green-700">Minor issue, low priority</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PotholeMap;