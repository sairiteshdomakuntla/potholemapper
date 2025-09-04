import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [potholes, setPotholes] = useState({
    reported: [],
    underRepair: [],
    finished: []
  });

  // Mock data for demonstration - replace with actual API calls
  useEffect(() => {
    const mockData = {
      reported: [
        { id: 1, location: "Main Street & 5th Ave", severity: "High", reportedDate: "2025-08-15", reporter: "John Doe" },
        { id: 2, location: "Oak Road near Park", severity: "Medium", reportedDate: "2025-08-14", reporter: "Jane Smith" },
        { id: 3, location: "Highway 101 Exit 15", severity: "Low", reportedDate: "2025-08-13", reporter: "Mike Johnson" }
      ],
      underRepair: [
        { id: 4, location: "First Street Plaza", severity: "High", startDate: "2025-08-10", estimatedCompletion: "2025-08-20", progress: 60 },
        { id: 5, location: "Downtown Bridge", severity: "Medium", startDate: "2025-08-12", estimatedCompletion: "2025-08-18", progress: 35 }
      ],
      finished: [
        { id: 6, location: "Park Avenue", severity: "Medium", completedDate: "2025-08-08", duration: "3 days" },
        { id: 7, location: "School Zone Road", severity: "High", completedDate: "2025-08-05", duration: "5 days" },
        { id: 8, location: "Market Street", severity: "Low", completedDate: "2025-08-03", duration: "2 days" }
      ]
    };
    setPotholes(mockData);
  }, []);

  const getSeverityColor = (severity) => {
    if (theme === 'dark') {
      switch(severity.toLowerCase()) {
        case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
        case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
        case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
        default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      }
    } else {
      switch(severity.toLowerCase()) {
        case 'high': return 'bg-red-100 text-red-800 border-red-300';
        case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'low': return 'bg-green-100 text-green-800 border-green-300';
        default: return 'bg-gray-100 text-gray-800 border-gray-300';
      }
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Stats Overview */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className={`text-3xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-white to-orange-400' : 'from-gray-900 to-orange-600'} bg-clip-text text-transparent`}>
              Dashboard
            </h1>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-2`}>Track and manage pothole reports in your area</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-300/30'} backdrop-blur-lg border rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300 border-l-4 border-l-orange-400`}>
              <div className="text-5xl mb-4">📍</div>
              <div className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>{potholes.reported.length}</div>
              <div className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-medium`}>Reported</div>
            </div>
            <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-300/30'} backdrop-blur-lg border rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300 border-l-4 border-l-blue-400`}>
              <div className="text-5xl mb-4">🚧</div>
              <div className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>{potholes.underRepair.length}</div>
              <div className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-medium`}>Under Repair</div>
            </div>
            <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-300/30'} backdrop-blur-lg border rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300 border-l-4 border-l-green-400`}>
              <div className="text-5xl mb-4">✅</div>
              <div className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>{potholes.finished.length}</div>
              <div className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-medium`}>Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Potholes Reported Section */}
          <section>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📍</span>
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Potholes Reported</h3>
              </div>
              <span className={`${theme === 'dark' ? 'bg-white/10 border-white/20 text-gray-300' : 'bg-gray-200 border-gray-300 text-gray-700'} px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm`}>
                {potholes.reported.length} items
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {potholes.reported.map(pothole => (
                <div key={pothole.id} className={`${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:bg-gray-50'} backdrop-blur-lg border rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-400`}>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} flex-1`}>{pothole.location}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(pothole.severity)}`}>
                      {pothole.severity}
                    </span>
                  </div>
                  <div className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <p><span className="font-medium">Reported:</span> {pothole.reportedDate}</p>
                    <p><span className="font-medium">Reporter:</span> {pothole.reporter}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className={`flex-1 ${theme === 'dark' ? 'bg-white/10 border-white/20 hover:bg-white/20 text-gray-300' : 'bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-700'} border py-2 px-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm`}>
                      View Details
                    </button>
                    {(user?.role === 'municipality' || user?.role === 'admin') && (
                      <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                        Start Repair
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Under Repair Section */}
          <section>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🚧</span>
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Under Repair</h3>
              </div>
              <span className={`${theme === 'dark' ? 'bg-white/10 border-white/20 text-gray-300' : 'bg-gray-200 border-gray-300 text-gray-700'} px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm`}>
                {potholes.underRepair.length} items
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {potholes.underRepair.map(pothole => (
                <div key={pothole.id} className={`${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:bg-gray-50'} backdrop-blur-lg border rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-400`}>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} flex-1`}>{pothole.location}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(pothole.severity)}`}>
                      {pothole.severity}
                    </span>
                  </div>
                  <div className={`space-y-2 mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <p><span className="font-medium">Started:</span> {pothole.startDate}</p>
                    <p><span className="font-medium">Est. Completion:</span> {pothole.estimatedCompletion}</p>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Progress</span>
                      <span className="text-sm font-medium text-blue-400">{pothole.progress}%</span>
                    </div>
                    <div className={`w-full ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2 backdrop-blur-sm`}>
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-300 shadow-sm" 
                        style={{width: `${pothole.progress}%`}}
                      ></div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {(user?.role === 'municipality' || user?.role === 'admin') && (
                      <>
                        <button className={`flex-1 ${theme === 'dark' ? 'bg-white/10 border-white/20 hover:bg-white/20 text-gray-300' : 'bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-700'} border py-2 px-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm`}>
                          Update Progress
                        </button>
                        <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                          Mark Complete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Completed Section */}
          <section>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">✅</span>
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Completed Repairs</h3>
              </div>
              <span className={`${theme === 'dark' ? 'bg-white/10 border-white/20 text-gray-300' : 'bg-gray-200 border-gray-300 text-gray-700'} px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm`}>
                {potholes.finished.length} items
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {potholes.finished.map(pothole => (
                <div key={pothole.id} className={`${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:bg-gray-50'} backdrop-blur-lg border rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-400`}>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} flex-1`}>{pothole.location}</h4>
                    <span className="bg-green-500/20 text-green-300 border border-green-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                      Completed
                    </span>
                  </div>
                  <div className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <p><span className="font-medium">Completed:</span> {pothole.completedDate}</p>
                    <p><span className="font-medium">Duration:</span> {pothole.duration}</p>
                    <p><span className="font-medium">Original Severity:</span> {pothole.severity}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className={`flex-1 ${theme === 'dark' ? 'bg-white/10 border-white/20 hover:bg-white/20 text-gray-300' : 'bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-700'} border py-2 px-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm`}>
                      View Report
                    </button>
                    {(user?.role === 'admin') && (
                      <button className={`flex-1 ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-400' : 'bg-gray-200 border-gray-300 hover:bg-gray-300 text-gray-600'} border py-2 px-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm`}>
                        Archive
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;