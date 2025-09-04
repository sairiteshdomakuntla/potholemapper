import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Profile = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getRoleBadgeColor = (role) => {
    const baseColors = {
      admin: theme === 'dark' 
        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
        : 'bg-purple-100 text-purple-800 border border-purple-300',
      municipality: theme === 'dark' 
        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
        : 'bg-blue-100 text-blue-800 border border-blue-300',
      commuter: theme === 'dark' 
        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
        : 'bg-green-100 text-green-800 border border-green-300',
      default: theme === 'dark' 
        ? 'bg-gray-500/20 text-gray-300 border border-gray-500/30' 
        : 'bg-gray-100 text-gray-800 border border-gray-300'
    };
    return baseColors[role] || baseColors.default;
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'} py-12`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-800/5 border-gray-300/20'} backdrop-blur-lg border rounded-2xl shadow-lg p-8`}>
          <div className="text-center mb-8">
            <div className={`w-24 h-24 ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white' : 'bg-gray-800/10 border-gray-300/20 text-gray-900'} backdrop-blur-lg border rounded-full mx-auto mb-4 flex items-center justify-center text-3xl`}>
              👤
            </div>
            <h1 className={`text-3xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-white to-orange-400' : 'from-gray-900 to-orange-600'} bg-clip-text text-transparent`}>
              {user?.name}
            </h1>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 backdrop-blur-sm ${getRoleBadgeColor(user?.role)}`}>
              {user?.role}
            </span>
          </div>

          {!isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Name</label>
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>{user?.name}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Email</label>
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>{user?.email}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Role</label>
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium capitalize`}>{user?.role}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                    user?.isActive 
                      ? theme === 'dark' 
                        ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                        : 'bg-green-100 text-green-800 border-green-300'
                      : theme === 'dark' 
                        ? 'bg-red-500/20 text-red-300 border-red-500/30' 
                        : 'bg-red-100 text-red-800 border-red-300'
                  }`}>
                    {user?.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                {user?.phone && (
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Phone</label>
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>{user?.phone}</p>
                  </div>
                )}
                {user?.department && (
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Department</label>
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>{user?.department}</p>
                  </div>
                )}
              </div>

              <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'} backdrop-blur-sm border rounded-lg p-4`}>
                <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>Account Information</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Member since: {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-orange-500/25"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm`}
                  />
                </div>
                {user?.role !== 'commuter' && (
                  <>
                    <div>
                      <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm`}
                      />
                    </div>
                    {user?.role === 'municipality' && (
                      <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Department</label>
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm`}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-green-500/25"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={`flex-1 ${theme === 'dark' ? 'bg-white/10 border-white/20 hover:bg-white/20 text-gray-300' : 'bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-700'} border font-medium py-3 px-4 rounded-lg transition-all duration-300 backdrop-blur-sm`}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;