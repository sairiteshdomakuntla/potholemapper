import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE, getAuthHeaders } from '../../config/api';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'commuter', 'municipality'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department: ''
  });

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAllUsers();
    }
  }, [user]);

  useEffect(() => {
    filterUsers();
  }, [allUsers, activeFilter]);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/auth/admin/all-users`, {
        headers: getAuthHeaders(token)
      });

      if (response.ok) {
        const data = await response.json();
        setAllUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };

  const filterUsers = () => {
    if (activeFilter === 'all') {
      setFilteredUsers(allUsers);
    } else {
      setFilteredUsers(allUsers.filter(u => u.role === activeFilter));
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/admin/create-municipality-user`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Municipality user created successfully!');
        setFormData({ name: '', email: '', password: '', phone: '', department: '' });
        setShowCreateForm(false);
        fetchAllUsers();
      } else {
        alert(data.error || 'Failed to create user');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const response = await fetch(`${API_BASE}/auth/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ isActive: !currentStatus })
      });

      if (response.ok) {
        fetchAllUsers();
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'municipality': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'commuter': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getUserStats = () => {
    const commuters = allUsers.filter(u => u.role === 'commuter').length;
    const municipality = allUsers.filter(u => u.role === 'municipality').length;
    const total = allUsers.length;
    return { commuters, municipality, total };
  };

  const stats = getUserStats();

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-orange-500/25"
          >
            {showCreateForm ? 'Cancel' : 'Add Municipality User'}
          </button>
        </div>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300">Commuters</p>
                <p className="text-3xl font-bold text-white">{stats.commuters}</p>
              </div>
              <div className="text-4xl opacity-80">👥</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300">Municipality Staff</p>
                <p className="text-3xl font-bold text-white">{stats.municipality}</p>
              </div>
              <div className="text-4xl opacity-80">🏛️</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300">Total Users</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </div>
        </div>

        {/* Create User Form */}
        {showCreateForm && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Create Municipality User</h3>
            <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Password (min 6 characters)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Phone number"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm"
                  placeholder="e.g., Road Maintenance, Public Works"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-green-500/50 disabled:to-green-600/50 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 disabled:transform-none shadow-lg hover:shadow-green-500/25"
                >
                  {loading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex space-x-1 mb-6 bg-white/5 backdrop-blur-sm p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
              activeFilter === 'all'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            All Users ({stats.total})
          </button>
          <button
            onClick={() => setActiveFilter('commuter')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
              activeFilter === 'commuter'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Commuters ({stats.commuters})
          </button>
          <button
            onClick={() => setActiveFilter('municipality')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
              activeFilter === 'municipality'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Municipality ({stats.municipality})
          </button>
        </div>

        {/* Users List */}
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white/5 divide-y divide-white/10">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-white/5 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.department || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.phone || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${
                        user.isActive 
                          ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                          : 'bg-red-500/20 text-red-300 border-red-500/30'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => toggleUserStatus(user._id, user.isActive)}
                          className={`transition-colors duration-300 ${
                            user.isActive 
                              ? 'text-red-400 hover:text-red-300' 
                              : 'text-green-400 hover:text-green-300'
                          }`}
                        >
                          {user.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No users found for the selected filter.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;