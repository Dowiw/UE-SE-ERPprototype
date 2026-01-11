import { useState } from 'react';
import { User } from '../App';
import { Users, FileText, Settings, ClipboardList, Plus, Edit2, Trash2, Eye, Shield, AlertCircle } from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  ipAddress: string;
}

interface AdminDashboardProps {
  user: User;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'logs' | 'audit'>('overview');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showLogsModal, setShowLogsModal] = useState(false);

  const [users, setUsers] = useState<AdminUser[]>([
    { id: '1', name: 'John Admin', email: 'admin@amgroup.com', role: 'Admin', status: 'Active', lastLogin: '2026-01-11 10:30' },
    { id: '2', name: 'Sarah Manager', email: 'manager@amgroup.com', role: 'Manager', status: 'Active', lastLogin: '2026-01-11 09:15' },
    { id: '3', name: 'Mike Agent', email: 'agent@amgroup.com', role: 'Agent', status: 'Active', lastLogin: '2026-01-11 08:45' },
    { id: '4', name: 'Lisa Accountant', email: 'accountant@amgroup.com', role: 'Accountant', status: 'Inactive', lastLogin: '2026-01-05 14:20' },
  ]);

  const [auditLogs] = useState<AuditLog[]>([
    { id: '1', timestamp: '2026-01-11 10:30:22', user: 'admin', action: 'USER_LOGIN', details: 'Successful login', ipAddress: '192.168.1.100' },
    { id: '2', timestamp: '2026-01-11 09:25:15', user: 'manager', action: 'USER_LOGIN', details: 'Successful login', ipAddress: '192.168.1.101' },
    { id: '3', timestamp: '2026-01-11 08:20:08', user: 'agent', action: 'USER_LOGIN', details: 'Successful login', ipAddress: '192.168.1.102' },
    { id: '4', timestamp: '2026-01-11 07:15:33', user: 'admin', action: 'USER_UPDATED', details: 'Updated role for Lisa Accountant', ipAddress: '192.168.1.100' },
    { id: '5', timestamp: '2026-01-11 06:10:45', user: 'admin', action: 'SYSTEM_CONFIG', details: 'Modified session timeout settings', ipAddress: '192.168.1.100' },
    { id: '6', timestamp: '2026-01-10 23:05:12', user: 'unknown', action: 'LOGIN_FAILED', details: 'Failed login attempt - invalid credentials', ipAddress: '203.45.67.89' },
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Agent'
  });

  const handleAddUser = () => {
    const user: AdminUser = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'Active',
      lastLogin: 'Never'
    };
    setUsers([...users, user]);
    setShowAddUserModal(false);
    setNewUser({ name: '', email: '', role: 'Agent' });
  };

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
    setShowEditUserModal(false);
  };

  const activeUsers = users.filter(u => u.status === 'Active').length;
  const failedLogins = auditLogs.filter(log => log.action === 'LOGIN_FAILED').length;
  const todayLogins = auditLogs.filter(log => log.action === 'USER_LOGIN' && log.timestamp.startsWith('2026-01-11')).length;

  return (
    <div>
      {/* RBAC Notice */}
      <div className="mb-6 p-4 bg-[#232323] border-l-4 border-gold-500 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-gold-300">Administrator Access - System Administration Only</p>
            <p className="text-sm text-gold-200 mt-1">
              Your access is limited to User Management, System Logs, Audit Trail, and Configuration.
              Property, Financial, and Analytics modules are restricted per SRS UC0001/UC0002.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gold-400">System Administration Dashboard</h1>
        <p className="text-gold-200 mt-2">Welcome back, {user.username}</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gold-700 mb-6">
        <nav className="flex gap-4" aria-label="Admin sections">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-gold-400 text-gold-400'
                : 'border-transparent text-gold-200 hover:text-gold-300'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'users'
                ? 'border-gold-400 text-gold-400'
                : 'border-transparent text-gold-200 hover:text-gold-300'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            User Management
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'logs'
                ? 'border-gold-400 text-gold-400'
                : 'border-transparent text-gold-200 hover:text-gold-300'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            System Logs
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'audit'
                ? 'border-gold-400 text-gold-400'
                : 'border-transparent text-gold-200 hover:text-gold-300'
            }`}
          >
            <ClipboardList className="w-4 h-4 inline mr-2" />
            Audit Trail
          </button>
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* System Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-[#232323] to-[#181818] rounded-lg p-6 text-gold-400 border border-gold-700">
              <Users className="w-8 h-8 mb-2 text-gold-300" />
              <p className="text-gold-200">Total Users</p>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>

            <div className="bg-gradient-to-br from-[#232323] to-[#181818] rounded-lg p-6 text-gold-400 border border-gold-700">
              <Users className="w-8 h-8 mb-2 text-gold-300" />
              <p className="text-gold-200">Active Users</p>
              <p className="text-3xl font-bold">{activeUsers}</p>
            </div>

            <div className="bg-gradient-to-br from-[#232323] to-[#181818] rounded-lg p-6 text-gold-400 border border-gold-700">
              <ClipboardList className="w-8 h-8 mb-2 text-gold-300" />
              <p className="text-gold-200">Today's Logins</p>
              <p className="text-3xl font-bold">{todayLogins}</p>
            </div>

            <div className="bg-gradient-to-br from-[#232323] to-[#181818] rounded-lg p-6 text-gold-400 border border-gold-700">
              <AlertCircle className="w-8 h-8 mb-2 text-gold-300" />
              <p className="text-gold-200">Failed Attempts</p>
              <p className="text-3xl font-bold">{failedLogins}</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent System Activity</h2>
            <div className="space-y-3">
              {auditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        log.action === 'LOGIN_FAILED' ? 'bg-red-100 text-red-800' :
                        log.action === 'USER_LOGIN' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {log.action}
                      </span>
                      <span className="font-medium">{log.user}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>{log.timestamp}</p>
                    <p className="text-xs">{log.ipAddress}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveTab('audit')}
              className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All Audit Logs →
            </button>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">System Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">System Health</p>
                  <p className="text-sm text-gray-600">All systems operational</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Database Connection</p>
                  <p className="text-sm text-gray-600">Connected to primary database</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Backup Status</p>
                  <p className="text-sm text-gray-600">Last backup: 2 hours ago</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Security Status</p>
                  <p className="text-sm text-gray-600">HTTPS/TLS enabled, GDPR compliant</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Management Tab */}
      {activeTab === 'users' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">User Management</h2>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-800 mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                        aria-label={`Edit ${user.name}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                        aria-label={`Delete ${user.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* System Logs Tab */}
      {activeTab === 'logs' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">System Logs</h2>
            <button
              onClick={() => setShowLogsModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Detailed Logs
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">System Status</p>
                  <p className="text-sm text-gray-600">All systems operational</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600">Active Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600">API Calls Today</p>
                  <p className="text-2xl font-bold text-gray-900">8,742</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600">Error Rate</p>
                  <p className="text-2xl font-bold text-green-600">0.01%</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Login Activity (Last 24 Hours)</h3>
                <div className="space-y-2">
                  {auditLogs.filter(log => log.action === 'USER_LOGIN' || log.action === 'LOGIN_FAILED').map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">{log.user}</span>
                        <span className="text-sm text-gray-600 ml-2">- {log.details}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {log.timestamp} | {log.ipAddress}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audit Trail Tab */}
      {activeTab === 'audit' && (
        <div>
          <h2 className="text-xl font-semibold mb-6">Audit Trail</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">{log.timestamp}</td>
                    <td className="px-6 py-4">{log.user}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        log.action === 'LOGIN_FAILED' ? 'bg-red-100 text-red-800' :
                        log.action === 'USER_LOGIN' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{log.details}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New User</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Agent">Agent</option>
                  <option value="Accountant">Accountant</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddUserModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit User</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Agent">Agent</option>
                  <option value="Accountant">Accountant</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedUser.status}
                  onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value as 'Active' | 'Inactive' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditUserModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
                  setShowEditUserModal(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logs Modal */}
      {showLogsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed System Logs</h2>

            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{log.action}</p>
                      <p className="text-sm text-gray-600">{log.details}</p>
                      <p className="text-xs text-gray-500 mt-1">IP: {log.ipAddress}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{log.user}</p>
                      <p>{log.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowLogsModal(false)}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
