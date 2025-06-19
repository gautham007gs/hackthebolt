import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  FileText, 
  Shield, 
  Settings, 
  BarChart3, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Crown,
  UserCheck,
  MessageSquare,
  Globe,
  Database,
  Activity,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Download,
  Upload
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminPage = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalViews: 0,
    activeUsers: 0,
    pendingApprovals: 0
  });

  useEffect(() => {
    // Load admin data
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Mock data - replace with actual API calls
    setStats({
      totalUsers: 1247,
      totalPosts: 89,
      totalViews: 45632,
      activeUsers: 342,
      pendingApprovals: 12
    });

    setUsers([
      {
        id: 1,
        name: 'Alex Chen',
        email: 'alex@example.com',
        role: 'user',
        joinDate: '2024-01-15',
        status: 'active',
        posts: 5,
        lastActive: '2024-12-15'
      },
      {
        id: 2,
        name: 'Sarah Kim',
        email: 'sarah@example.com',
        role: 'creator',
        joinDate: '2024-02-10',
        status: 'active',
        posts: 23,
        lastActive: '2024-12-14'
      }
    ]);

    setPosts([
      {
        id: 1,
        title: 'Advanced SQL Injection Techniques',
        author: 'Sarah Kim',
        status: 'published',
        views: 1250,
        likes: 89,
        publishDate: '2024-12-10',
        category: 'Web Security'
      },
      {
        id: 2,
        title: 'Network Penetration Testing Guide',
        author: 'Mike Rodriguez',
        status: 'pending',
        views: 0,
        likes: 0,
        publishDate: '2024-12-15',
        category: 'Network Security'
      }
    ]);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'content', label: 'Content Management', icon: FileText },
    { id: 'roles', label: 'Role Management', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Site Settings', icon: Settings }
  ];

  const promoteUser = (userId: number, newRole: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const toggleUserStatus = (userId: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    ));
  };

  const approvePost = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, status: 'published' } : post
    ));
  };

  const deletePost = (postId: number) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-600 border-red-500/30';
      case 'creator': return 'bg-purple-500/20 text-purple-600 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'suspended': return 'bg-red-500/20 text-red-600 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <Shield className={`h-16 w-16 mx-auto mb-4 ${
            isDark ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <h1 className={`text-2xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Access Denied
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            You need admin privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Admin Dashboard
              </h1>
              <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage users, content, and site settings
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </button>
              <button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8"
        >
          {[
            { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'blue' },
            { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'green' },
            { label: 'Total Views', value: stats.totalViews, icon: Eye, color: 'purple' },
            { label: 'Active Users', value: stats.activeUsers, icon: Activity, color: 'emerald' },
            { label: 'Pending Approvals', value: stats.pendingApprovals, icon: Calendar, color: 'orange' }
          ].map((stat, index) => (
            <div key={index} className={`card-elevated p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value.toLocaleString()}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-500/20`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? `border-emerald-500 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`
                      : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300`
                  } transition-colors`}
                >
                  <tab.icon className={`mr-2 h-5 w-5 ${
                    activeTab === tab.id
                      ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                      : isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Recent Activity */}
              <div className="card-elevated p-6">
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[
                    { action: 'New user registered', user: 'john@example.com', time: '2 hours ago' },
                    { action: 'Post published', user: 'Advanced XSS Prevention', time: '4 hours ago' },
                    { action: 'Creator application', user: 'jane@example.com', time: '6 hours ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {activity.action}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {activity.user}
                        </p>
                      </div>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                        isDark 
                          ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                          : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    />
                  </div>
                </div>
                <button className={`px-4 py-2 border rounded-lg flex items-center space-x-2 ${
                  isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'
                }`}>
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>

              {/* Users Table */}
              <div className="card-elevated overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                      <tr>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          User
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Role
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Status
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Posts
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {user.name}
                              </div>
                              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {user.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRoleColor(user.role)}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                            {user.posts}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => promoteUser(user.id, user.role === 'user' ? 'creator' : 'admin')}
                              className="text-emerald-600 hover:text-emerald-900"
                            >
                              <Crown className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => toggleUserStatus(user.id)}
                              className="text-yellow-600 hover:text-yellow-900"
                            >
                              <UserCheck className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* Posts Table */}
              <div className="card-elevated overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Content Management
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                      <tr>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Title
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Author
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Status
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Views
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                      {posts.map((post) => (
                        <tr key={post.id}>
                          <td className="px-6 py-4">
                            <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {post.title}
                            </div>
                            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {post.category}
                            </div>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                            {post.author}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(post.status)}`}>
                              {post.status}
                            </span>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                            {post.views.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-emerald-600 hover:text-emerald-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            {post.status === 'pending' && (
                              <button
                                onClick={() => approvePost(post.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                <UserCheck className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deletePost(post.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Add other tab contents as needed */}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;