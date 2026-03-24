import { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, Mail, Shield, ShieldOff, MoreVertical } from 'lucide-react';
import api from '../../services/api';

const placeholderUsers = [
  { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'user', status: 'active', createdAt: new Date(Date.now() - 86400000 * 30).toISOString() },
  { _id: '2', firstName: 'Sarah', lastName: 'Smith', email: 'sarah@example.com', role: 'user', status: 'active', createdAt: new Date(Date.now() - 86400000 * 60).toISOString() },
  { _id: '3', firstName: 'Mike', lastName: 'Johnson', email: 'mike@example.com', role: 'admin', status: 'active', createdAt: new Date(Date.now() - 86400000 * 90).toISOString() },
  { _id: '4', firstName: 'Emma', lastName: 'Wilson', email: 'emma@example.com', role: 'user', status: 'suspended', createdAt: new Date(Date.now() - 86400000 * 15).toISOString() },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users');
      setUsers(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setUsers(placeholderUsers);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
      await api.put(`/admin/users/${userId}/status`, { status: newStatus });
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, status: newStatus } : u));
    } catch (err) {
      console.error('Failed to update user status:', err);
    }
  };

  const handleToggleRole = async (userId, currentRole) => {
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      console.error('Failed to update user role:', err);
    }
  };

  const displayUsers = (users.length > 0 ? users : placeholderUsers)
    .filter(u => {
      const matchesSearch = u.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Users</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">All Roles</option>
          <option value="user">Users</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">User</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Email</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Role</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Joined</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {displayUsers.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-700 font-medium">
                          {user.firstName?.[0]}{user.lastName?.[0]}
                        </span>
                      </div>
                      <span className="font-medium text-slate-900">
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleRole(user._id, user.role)}
                        className={`p-2 rounded-lg ${
                          user.role === 'admin' 
                            ? 'text-purple-600 hover:bg-purple-50' 
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                        title={user.role === 'admin' ? 'Remove admin' : 'Make admin'}
                      >
                        {user.role === 'admin' ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user._id, user.status)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                          user.status === 'active'
                            ? 'text-red-600 hover:bg-red-50'
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                      >
                        {user.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
