import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, FileText, BarChart3, Settings, Shield, Activity,
  Eye, Heart, MessageCircle, TrendingUp, UserCheck, AlertTriangle,
  Edit3, Trash2, CheckCircle, XCircle, Clock, Flag, Ban, UserPlus,
  Search, Filter, MoreVertical, Plus
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import ProfessionalDashboardLayout from './ProfessionalDashboardLayout';

const FixedAdminDashboard = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock notifications for the layout
  const mockNotifications = [
    { id: 1, message: "5 new user registrations pending approval", time: "5 min ago", type: "user", priority: "high" },
    { id: 2, message: "System backup completed successfully", time: "1 hour ago", type: "system", priority: "low" },
    { id: 3, message: "Content flagged for review", time: "2 hours ago", type: "content", priority: "medium" }
  ];

  // Dashboard stats
  const dashboardStats = {
    totalUsers: 8432,
    activeUsers: 6891,
    totalPosts: 1247,
    pendingPosts: 23,
    totalViews: 892456,
    systemHealth: 98,
    pendingBlogs: 15,
    flaggedContent: 4
  };

  // Mock users data
  const [users] = useState([
    {
      id: 1,
      username: 'johndoe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2024-01-20',
      verified: true,
      posts: 12,
      followers: 45
    },
    {
      id: 2,
      username: 'sarahtech',
      email: 'sarah@techcorp.com',
      role: 'creator',
      status: 'active',
      joinDate: '2024-01-10',
      lastActive: '2024-01-21',
      verified: true,
      posts: 28,
      followers: 156
    },
    {
      id: 3,
      username: 'newuser123',
      email: 'newuser@email.com',
      role: 'user',
      status: 'pending',
      joinDate: '2024-01-21',
      lastActive: '2024-01-21',
      verified: false,
      posts: 0,
      followers: 0
    }
  ]);

  // Mock content data
  const [content] = useState([
    {
      id: 1,
      title: 'Advanced Penetration Testing',
      author: 'Sarah Chen',
      type: 'blog',
      status: 'published',
      views: 2340,
      likes: 89,
      comments: 23,
      createdAt: '2024-01-20',
      flagged: false,
      category: 'Security Testing'
    },
    {
      id: 2,
      title: 'Network Security Fundamentals',
      author: 'John Smith',
      type: 'tutorial',
      status: 'pending',
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: '2024-01-21',
      flagged: false,
      category: 'Network Security'
    },
    {
      id: 3,
      title: 'Malware Analysis Guide',
      author: 'Mike Rodriguez',
      type: 'blog',
      status: 'flagged',
      views: 45,
      likes: 2,
      comments: 8,
      createdAt: '2024-01-18',
      flagged: true,
      category: 'Malware Analysis'
    }
  ]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleUserAction = (userId: number, action: string) => {
    console.log(`User action: ${action} for user ${userId}`);
  };

  const handleContentAction = (contentId: number, action: string) => {
    console.log(`Content action: ${action} for content ${contentId}`);
  };

  // Render dashboard overview
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className={`p-4 lg:p-6 rounded-xl border shadow-sm ${
        isDark ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
      }`}>
        <h2 className={`text-xl lg:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Admin Dashboard
        </h2>
        <p className={`text-sm lg:text-base ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
          Monitor and manage your cybersecurity platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: dashboardStats.totalUsers.toLocaleString(), icon: Users, color: 'blue' },
          { label: 'Active Users', value: dashboardStats.activeUsers.toLocaleString(), icon: UserCheck, color: 'green' },
          { label: 'Total Posts', value: dashboardStats.totalPosts.toLocaleString(), icon: FileText, color: 'purple' },
          { label: 'Pending Review', value: dashboardStats.pendingPosts, icon: Clock, color: 'orange' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 ${
              isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
            } backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {stat.label}
                </p>
                <p className={`text-lg lg:text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-500/10' : 
                stat.color === 'green' ? 'bg-green-500/10' : 
                stat.color === 'purple' ? 'bg-purple-500/10' : 'bg-orange-500/10'
              }`}>
                <stat.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${
                  stat.color === 'blue' ? 'text-blue-500' : 
                  stat.color === 'green' ? 'text-green-500' : 
                  stat.color === 'purple' ? 'text-purple-500' : 'text-orange-500'
                }`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className={`p-4 lg:p-6 rounded-xl border shadow-sm ${
        isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
      } backdrop-blur-sm`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'User Management', icon: Users, action: () => setActiveTab('users'), color: 'blue' },
            { label: 'Content Review', icon: FileText, action: () => setActiveTab('content'), color: 'purple' },
            { label: 'System Health', icon: Activity, action: () => setActiveTab('system'), color: 'green' },
            { label: 'Settings', icon: Settings, action: () => setActiveTab('settings'), color: 'gray' }
          ].map((action, index) => (
            <button
              key={action.label}
              onClick={action.action}
              className={`p-3 rounded-lg text-center transition-all duration-200 border ${
                isDark 
                  ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-200 hover:text-white border-gray-600/50 hover:border-gray-600' 
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 border-gray-200 hover:border-gray-300'
              }`}
            >
              <action.icon className="h-5 w-5 mx-auto mb-2" />
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`p-4 lg:p-6 rounded-xl border shadow-sm ${
        isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
      } backdrop-blur-sm`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Recent Activity
        </h3>
        <div className="space-y-3">
          {[
            { type: 'user', message: 'New user registration: johndoe123', time: '5 min ago', icon: UserPlus },
            { type: 'content', message: 'Blog post flagged for review', time: '15 min ago', icon: Flag },
            { type: 'system', message: 'System backup completed', time: '1 hour ago', icon: CheckCircle }
          ].map((activity, index) => (
            <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
              isDark ? 'bg-gray-700/30' : 'bg-gray-50/50'
            }`}>
              <div className={`p-2 rounded-full ${
                activity.type === 'user' ? 'bg-blue-500/10' : 
                activity.type === 'content' ? 'bg-orange-500/10' : 'bg-green-500/10'
              }`}>
                <activity.icon className={`h-4 w-4 ${
                  activity.type === 'user' ? 'text-blue-500' : 
                  activity.type === 'content' ? 'text-orange-500' : 'text-green-500'
                }`} />
              </div>
              <div className="flex-1">
                <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {activity.message}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render user management
  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className={`text-xl lg:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          User Management
        </h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-8 pr-3 py-2 text-sm rounded-md border transition-colors ${
                isDark 
                  ? 'bg-gray-700/80 border-gray-600/60 text-white placeholder-gray-200 focus:bg-gray-700 focus:border-emerald-400' 
                  : 'bg-white border-gray-300/60 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-emerald-500'
              } focus:outline-none focus:ring-1 focus:ring-emerald-500/30`}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {users.map(user => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 lg:p-6 rounded-xl border shadow-sm ${
              isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
            } backdrop-blur-sm`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {user.username}
                  </h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : user.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {user.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                    user.role === 'creator' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {user.email}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs lg:text-sm">
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Joined: {user.joinDate}
                  </span>
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Posts: {user.posts}
                  </span>
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Followers: {user.followers}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                {user.status === 'pending' && (
                  <button
                    onClick={() => handleUserAction(user.id, 'activate')}
                    className="px-3 py-2 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleUserAction(user.id, 'edit')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark 
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleUserAction(user.id, 'suspend')}
                  className="px-3 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Suspend
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Content management
  const renderContent = () => (
    <div className={`p-4 lg:p-6 rounded-xl border shadow-sm ${
      isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
    } backdrop-blur-sm`}>
      <h3 className={`text-lg lg:text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Content Management
      </h3>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        Content moderation and management tools will be implemented here.
      </p>
    </div>
  );

  // System health
  const renderSystem = () => (
    <div className={`p-4 lg:p-6 rounded-xl border shadow-sm ${
      isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
    } backdrop-blur-sm`}>
      <h3 className={`text-lg lg:text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        System Health
      </h3>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        System monitoring, health checks, and maintenance tools will be available here.
      </p>
    </div>
  );

  // Settings
  const renderSettings = () => (
    <div className={`p-4 lg:p-6 rounded-xl border shadow-sm ${
      isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
    } backdrop-blur-sm`}>
      <h3 className={`text-lg lg:text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        System Settings
      </h3>
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Site Name
          </label>
          <input
            type="text"
            placeholder="CyberSec Platform"
            className={`w-full px-3 py-2 text-sm rounded-md border transition-colors ${
              isDark 
                ? 'bg-gray-700/80 border-gray-600/60 text-white placeholder-gray-200 focus:bg-gray-700 focus:border-emerald-400' 
                : 'bg-white border-gray-300/60 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-emerald-500'
            } focus:outline-none focus:ring-1 focus:ring-emerald-500/30`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Site Description
          </label>
          <textarea
            rows={3}
            placeholder="Your cybersecurity platform description..."
            className={`w-full px-3 py-2 text-sm rounded-md border transition-colors ${
              isDark 
                ? 'bg-gray-700/80 border-gray-600/60 text-white placeholder-gray-200 focus:bg-gray-700 focus:border-emerald-400' 
                : 'bg-white border-gray-300/60 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-emerald-500'
            } focus:outline-none focus:ring-1 focus:ring-emerald-500/30`}
          />
        </div>
        <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium">
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderContent2 = () => {
    switch (activeTab) {
      case 'users':
        return renderUsers();
      case 'content':
        return renderContent();
      case 'system':
        return renderSystem();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <ProfessionalDashboardLayout
      userRole="admin"
      activeTab={activeTab}
      onTabChange={handleTabChange}
      notifications={mockNotifications}
    >
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {renderContent2()}
      </motion.div>
    </ProfessionalDashboardLayout>
  );
};

export default FixedAdminDashboard;