import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ReportPothole = () => {
  const { user } = useAuth();
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Report a Pothole</h1>
            <p className="text-gray-600 mt-2">Help improve road safety by reporting potholes in your area</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Main Street & 5th Ave, near City Hall"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity Level *
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low - Minor inconvenience</option>
                <option value="medium">Medium - Noticeable damage</option>
                <option value="high">High - Safety hazard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the pothole size, depth, and any additional details..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo (Optional)
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-gray-500 mt-2">Upload a photo to help identify the pothole</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Report Information</h3>
              <p className="text-sm text-blue-700">
                Reported by: <span className="font-medium">{user?.name}</span>
              </p>
              <p className="text-sm text-blue-700">
                Date: <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
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