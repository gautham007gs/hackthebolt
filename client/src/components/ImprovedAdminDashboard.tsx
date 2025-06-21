import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, FileText, BarChart3, Settings, Shield, Activity,
  Eye, Heart, MessageCircle, TrendingUp, UserCheck, AlertTriangle,
  Edit3, Trash2, CheckCircle, XCircle, Clock, Flag, Ban, UserPlus
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import ProfessionalDashboardLayout from './ProfessionalDashboardLayout';

const ImprovedAdminDashboard = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dashboard stats
  const [dashboardStats] = useState({
    totalUsers: 15420,
    activeUsers: 8932,
    pendingBlogs: 47,
    publishedBlogs: 324,
    totalRevenue: 89450,
    conversionRate: 12.4,
    monthlyGrowth: 23.5,
    systemHealth: 98.2,
    totalComments: 2456,
    flaggedContent: 12,
    newRegistrations: 234,
    premiumUsers: 1247
  });

  // Users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Alex Chen',
      email: 'alex.chen@email.com',
      role: 'creator',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      posts: 12,
      followers: 450,
      verified: true
    },
    {
      id: 2,
      name: 'Sarah Johnson', 
      email: 'sarah.j@email.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-02-10',
      lastActive: '1 day ago',
      posts: 0,
      followers: 23,
      verified: false
    },
    {
      id: 3,
      name: 'Mike Rodriguez',
      email: 'mike.r@email.com',
      role: 'creator',
      status: 'suspended',
      joinDate: '2023-11-20',
      lastActive: '1 week ago',
      posts: 8,
      followers: 320,
      verified: true
    }
  ]);

  // Content data
  const [content, setContent] = useState([
    {
      id: 1,
      title: 'Advanced SQL Injection Techniques',
      author: 'Alex Chen',
      type: 'blog',
      status: 'published',
      views: 3420,
      likes: 156,
      comments: 23,
      createdAt: '2024-01-15',
      flagged: false,
      category: 'Web Security'
    },
    {
      id: 2,
      title: 'Network Security Fundamentals',
      author: 'Sarah Johnson',
      type: 'tutorial', 
      status: 'pending',
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: '2024-01-20',
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

  // Notifications
  const notifications = [
    { id: 1, message: "5 new user registrations pending approval", time: "5 min ago", type: "user", priority: "high" },
    { id: 2, message: "System backup completed successfully", time: "1 hour ago", type: "system", priority: "low" },
    { id: 3, message: "Content flagged for review in Moderation queue", time: "2 hours ago", type: "content", priority: "medium" },
    { id: 4, message: "Monthly analytics report is ready", time: "1 day ago", type: "report", priority: "low" }
  ];

  // Handle user actions
  const handleUserAction = (userId: number, action: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        switch (action) {
          case 'activate':
            return { ...user, status: 'active' };
          case 'suspend':
            return { ...user, status: 'suspended' };
          case 'verify':
            return { ...user, verified: true };
          case 'promote':
            return { ...user, role: user.role === 'user' ? 'creator' : 'admin' };
          default:
            return user;
        }
      }
      return user;
    }));
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  // Handle content actions
  const handleContentAction = (contentId: number, action: string) => {
    setContent(prev => prev.map(item => {
      if (item.id === contentId) {
        switch (action) {
          case 'approve':
            return { ...item, status: 'published', flagged: false };
          case 'reject':
            return { ...item, status: 'rejected' };
          case 'flag':
            return { ...item, flagged: true, status: 'flagged' };
          case 'unflag':
            return { ...item, flagged: false, status: 'published' };
          default:
            return item;
        }
      }
      return item;
    }));
  };

  const handleDeleteContent = (contentId: number) => {
    setContent(prev => prev.filter(item => item.id !== contentId));
  };

  // Render dashboard overview
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: dashboardStats.totalUsers.toLocaleString(), icon: Users, change: '+12.5%', trend: 'up' },
          { label: 'Active Users', value: dashboardStats.activeUsers.toLocaleString(), icon: UserCheck, change: '+8.2%', trend: 'up' },
          { label: 'Pending Reviews', value: dashboardStats.pendingBlogs, icon: AlertTriangle, change: '-5.1%', trend: 'down' },
          { label: 'System Health', value: `${dashboardStats.systemHealth}%`, icon: Activity, change: '+0.3%', trend: 'up' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border shadow-sm hover:shadow-md transition-all duration-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                  <span className={`text-sm ml-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    vs last month
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <stat.icon className={`h-6 w-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className={`lg:col-span-2 p-6 rounded-xl ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Recent Activity
          </h3>
          <div className="space-y-4">
            {notifications.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.priority === 'high' ? 'bg-red-500' :
                    activity.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {activity.message}
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {activity.time}
                    </p>
                  </div>
                </div>
                {activity.priority === 'high' && (
                  <button className="px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                    Action Required
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`p-6 rounded-xl ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Quick Actions
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Review Pending Posts', count: 12, action: () => setActiveTab('content'), icon: FileText },
              { name: 'Moderate Reports', count: 5, action: () => setActiveTab('moderation'), icon: Flag },
              { name: 'User Verification', count: 8, action: () => setActiveTab('users'), icon: UserCheck },
              { name: 'System Backup', count: 0, action: () => setActiveTab('system'), icon: Activity }
            ].map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  isDark ? 'hover:bg-gray-700 text-gray-300 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {item.count > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render user management
  const renderUsers = () => (
    <div className="space-y-6">
      <div className={`rounded-xl ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border shadow-sm overflow-hidden`}>
        <div className="p-6">
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            User Management
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className={`${isDark ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                  <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    User
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Role
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Status
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Activity
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className={`${isDark ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center`}>
                          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {user.name}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                        user.role === 'creator' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {user.lastActive}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                          className={`p-1 rounded ${
                            user.status === 'active'
                              ? 'text-red-600 hover:bg-red-100 dark:hover:bg-red-900'
                              : 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900'
                          }`}
                        >
                          {user.status === 'active' ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
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
    </div>
  );

  // Render content management
  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className={`rounded-xl ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border shadow-sm overflow-hidden`}>
        <div className="p-6">
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Content Management
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className={`${isDark ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                  <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Content
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Author
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Status
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Engagement
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {content.map((item) => (
                  <tr key={item.id} className={`${isDark ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                    <td className="py-4 px-4">
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.category} • {item.type}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.author}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {item.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {item.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {item.comments}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {item.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleContentAction(item.id, 'approve')}
                              className="p-1 rounded text-green-600 hover:bg-green-100 dark:hover:bg-green-900"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleContentAction(item.id, 'reject')}
                              className="p-1 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleContentAction(item.id, item.flagged ? 'unflag' : 'flag')}
                          className={`p-1 rounded ${
                            item.flagged
                              ? 'text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900'
                              : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <Flag className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteContent(item.id)}
                          className="p-1 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
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
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
      case 'users-all':
      case 'users-pending':
      case 'users-creators':
        return renderUsers();
      case 'content':
      case 'content-all':
      case 'content-pending':
      case 'content-flagged':
        return renderContentManagement();
      case 'analytics':
        return (
          <div className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border shadow-sm`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Analytics Dashboard
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Comprehensive analytics and reporting features will be available here.
            </p>
          </div>
        );
      case 'moderation':
        return (
          <div className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border shadow-sm`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Content Moderation
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Advanced moderation tools and reporting features will be implemented here.
            </p>
          </div>
        );
      case 'system':
        return (
          <div className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border shadow-sm`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              System Health
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              System monitoring, health checks, and maintenance tools will be available here.
            </p>
          </div>
        );
      case 'settings':
        return (
          <div className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border shadow-sm`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              System Settings
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Platform configuration and system settings will be managed here.
            </p>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <ProfessionalDashboardLayout
      userRole="admin"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      notifications={notifications}
    >
      {renderContent()}
    </ProfessionalDashboardLayout>
  );
};

export default ImprovedAdminDashboard;