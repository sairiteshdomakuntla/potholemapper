import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const ReportPothole = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    severity: 'medium',
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement actual submission logic
    setTimeout(() => {
      alert('Pothole report submitted successfully!');
      setFormData({
        location: '',
        description: '',
        severity: 'medium',
        image: null
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'} py-12`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-800/5 border-gray-300/20'} backdrop-blur-lg border rounded-xl shadow-lg p-8`}>
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-white to-orange-400' : 'from-gray-900 to-orange-600'} bg-clip-text text-transparent`}>
              Report a Pothole
            </h1>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-2`}>Help improve road safety by reporting potholes in your area</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm"
                placeholder="e.g., Main Street & 5th Ave, near City Hall"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Severity Level *
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm"
              >
                <option value="low" className="bg-black text-white">Low - Minor inconvenience</option>
                <option value="medium" className="bg-black text-white">Medium - Noticeable damage</option>
                <option value="high" className="bg-black text-white">High - Safety hazard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm resize-none"
                placeholder="Describe the pothole size, depth, and any additional details..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Photo (Optional)
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white file:cursor-pointer hover:file:bg-orange-600 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm"
              />
              <p className="text-sm text-gray-400 mt-2">Upload a photo to help identify the pothole</p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-medium text-blue-300 mb-2">Report Information</h3>
              <p className="text-sm text-blue-200">
                Reported by: <span className="font-medium text-white">{user?.name}</span>
              </p>
              <p className="text-sm text-blue-200">
                Date: <span className="font-medium text-white">{new Date().toLocaleDateString()}</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-500/50 disabled:to-orange-600/50 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {isSubmitting ? 'Submitting Report...' : 'Submit Pothole Report'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportPothole;