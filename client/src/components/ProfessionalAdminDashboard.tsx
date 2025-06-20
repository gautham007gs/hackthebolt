import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Eye, 
  TrendingUp, 
  Settings, 
  Shield, 
  BarChart3, 
  Calendar,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Menu,
  X,
  Home,
  MessageSquare,
  UserCheck,
  AlertTriangle,
  DollarSign,
  Activity,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Globe,
  Database,
  Server,
  Lock,
  Unlock,
  Ban,
  UserPlus,
  FileCheck,
  FilePlus,
  Zap,
  Target,
  Award,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Mail,
  Phone,
  MapPin,
  Calendar as CalendarIcon,
  Briefcase,
  UserX
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const ProfessionalAdminDashboard = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Dashboard stats
  const [dashboardStats, setDashboardStats] = useState({
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
      avatar: null,
      location: 'San Francisco, CA',
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
      avatar: null,
      location: 'New York, NY',
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
      avatar: null,
      location: 'Austin, TX',
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
      title: 'Inappropriate Content Example',
      author: 'Mike Rodriguez',
      type: 'blog',
      status: 'flagged',
      views: 45,
      likes: 2,
      comments: 8,
      createdAt: '2024-01-18',
      flagged: true,
      category: 'General'
    }
  ]);

  // Recent activities
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'user_registration',
      description: 'New user registered: alex.chen@email.com',
      timestamp: '2 minutes ago',
      status: 'info',
      actionRequired: false
    },
    {
      id: 2,
      type: 'content_flagged',
      description: 'Content flagged for review: "Security Tutorial #3"',
      timestamp: '15 minutes ago',
      status: 'warning',
      actionRequired: true
    },
    {
      id: 3,
      type: 'system_update',
      description: 'Security patch applied successfully',
      timestamp: '1 hour ago',
      status: 'success',
      actionRequired: false
    },
    {
      id: 4,
      type: 'user_report',
      description: 'User content reported for policy violation',
      timestamp: '2 hours ago',
      status: 'danger',
      actionRequired: true
    }
  ]);

  // Navigation items
  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'content', name: 'Content Management', icon: FileText },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'moderation', name: 'Moderation', icon: Shield },
    { id: 'system', name: 'System Health', icon: Activity },
    { id: 'settings', name: 'System Settings', icon: Settings }
  ];

  // Notifications
  const [notifications] = useState([
    { id: 1, message: "5 new user registrations pending approval", time: "5 min ago", type: "user", priority: "high" },
    { id: 2, message: "System backup completed successfully", time: "1 hour ago", type: "system", priority: "low" },
    { id: 3, message: "Content flagged for review in Moderation queue", time: "2 hours ago", type: "content", priority: "medium" },
    { id: 4, message: "Monthly analytics report is ready", time: "1 day ago", type: "report", priority: "low" }
  ]);

  const closeSidebar = () => setSidebarOpen(false);

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
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h3>
            <button className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    activity.status === 'danger' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {activity.description}
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
                {activity.actionRequired && (
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
              { name: 'Review Pending Posts', count: 12, action: () => setActiveTab('content'), icon: FileCheck },
              { name: 'Moderate Reports', count: 5, action: () => setActiveTab('moderation'), icon: Flag },
              { name: 'User Verification', count: 8, action: () => setActiveTab('users'), icon: UserCheck },
              { name: 'System Backup', count: 0, action: () => setActiveTab('system'), icon: Database }
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
      {/* Users Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 w-64 rounded-lg text-sm ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200`}
            />
          </div>
          <select className={`px-3 py-2 rounded-lg text-sm ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-gray-50 border-gray-200 text-gray-900'
          } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none`}>
            <option value="">All Roles</option>
            <option value="user">Users</option>
            <option value="creator">Creators</option>
            <option value="admin">Admins</option>
          </select>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <UserPlus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className={`rounded-xl ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border shadow-sm overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
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
                  Activity
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`${isDark ? 'bg-gray-800' : 'bg-white'} divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {users.filter(user => 
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((user) => (
                <tr key={user.id} className={`hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center`}>
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} flex items-center`}>
                          {user.name}
                          {user.verified && <CheckCircle className="h-4 w-4 text-blue-500 ml-2" />}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'creator' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Last active: {user.lastActive}</div>
                    <div>Posts: {user.posts} | Followers: {user.followers}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {user.status === 'active' ? (
                        <button
                          onClick={() => handleUserAction(user.id, 'suspend')}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Suspend User"
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUserAction(user.id, 'activate')}
                          className="text-green-600 hover:text-green-900 transition-colors"
                          title="Activate User"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      {!user.verified && (
                        <button
                          onClick={() => handleUserAction(user.id, 'verify')}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Verify User"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleUserAction(user.id, 'promote')}
                        className="text-purple-600 hover:text-purple-900 transition-colors"
                        title="Promote User"
                      >
                        <Award className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Delete User"
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
  );

  // Render content management
  const renderContent = () => (
    <div className="space-y-6">
      {/* Content Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 w-64 rounded-lg text-sm ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200`}
            />
          </div>
          <select className={`px-3 py-2 rounded-lg text-sm ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-gray-50 border-gray-200 text-gray-900'
          } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none`}>
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="flagged">Flagged</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <FilePlus className="h-4 w-4" />
          <span>Create Content</span>
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.filter(item => 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.author.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border shadow-sm hover:shadow-md transition-all duration-200`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  item.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                  item.status === 'flagged' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                }`}>
                  {item.status}
                </span>
                {item.flagged && (
                  <Flag className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="relative">
                <button className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                }`}>
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {item.title}
            </h3>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              By {item.author} • {item.category}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {item.views}
                </span>
                <span className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  {item.likes}
                </span>
                <span className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {item.comments}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {item.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleContentAction(item.id, 'approve')}
                    className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleContentAction(item.id, 'reject')}
                    className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                </>
              )}
              {item.status === 'flagged' && (
                <button
                  onClick={() => handleContentAction(item.id, 'unflag')}
                  className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  Unflag
                </button>
              )}
              {item.status === 'published' && !item.flagged && (
                <button
                  onClick={() => handleContentAction(item.id, 'flag')}
                  className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                >
                  Flag
                </button>
              )}
              <button
                onClick={() => handleDeleteContent(item.id)}
                className="px-3 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Render analytics
  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: `$${dashboardStats.totalRevenue.toLocaleString()}`, change: '+15.3%' },
          { label: 'Conversion Rate', value: `${dashboardStats.conversionRate}%`, change: '+2.1%' },
          { label: 'Monthly Growth', value: `${dashboardStats.monthlyGrowth}%`, change: '+8.7%' },
          { label: 'Premium Users', value: dashboardStats.premiumUsers.toLocaleString(), change: '+12.5%' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border shadow-sm`}
          >
            <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {stat.label}
            </h4>
            <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}
            </p>
            <p className="text-sm text-green-500 mt-1">{stat.change} from last month</p>
          </motion.div>
        ))}
      </div>

      <div className={`p-6 rounded-xl ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border shadow-sm`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Analytics Dashboard
        </h3>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Comprehensive analytics charts and insights will be available here. Track platform performance, user behavior, and business metrics.
        </p>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -320 }}
        className={`lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-r shadow-xl lg:shadow-none`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Admin Panel
            </h2>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Welcome back, {user?.name}
            </p>
          </div>
          <button
            onClick={closeSidebar}
            className={`lg:hidden p-2 rounded-lg ${
              isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  closeSidebar();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? `${isDark ? 'bg-emerald-500/15 text-emerald-400 shadow-md' : 'bg-emerald-50 text-emerald-600 shadow-md'}`
                    : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Admin Stats in Sidebar */}
        <div className="p-6 border-t border-gray-700">
          <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            System Status
          </h4>
          <div className="space-y-3">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {dashboardStats.systemHealth}%
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                System Health
              </div>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {dashboardStats.pendingBlogs}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Pending Reviews
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:ml-80">
        {/* Top Header - Fixed with mobile padding fix */}
        <header className={`sticky top-0 z-40 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-b px-4 sm:px-6 py-4 backdrop-blur-sm bg-opacity-95`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {sidebarItems.find(item => item.id === activeTab)?.name || 'Dashboard'}
                </h1>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'} hidden sm:block`}>
                  Manage your platform efficiently
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-lg relative ${
                  isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <button className={`p-2 rounded-lg ${
                isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}>
                <Filter className="h-5 w-5" />
              </button>
              <button className={`p-2 rounded-lg ${
                isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}>
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`absolute right-4 sm:right-6 top-16 w-80 ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border rounded-xl shadow-lg z-50`}
              >
                <div className="p-4">
                  <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Admin Notifications
                  </h3>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.priority === 'high' ? 'bg-red-500' :
                          notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <div className="flex-1">
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {notification.message}
                          </p>
                          <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Content Area - Fixed mobile padding */}
        <main className="p-4 sm:p-6 pb-20 sm:pb-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'content' && renderContent()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'moderation' && (
              <div className={`p-6 rounded-xl ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border shadow-sm`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Content Moderation
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Advanced moderation tools and automated content filtering will be available here.
                </p>
              </div>
            )}
            {activeTab === 'system' && (
              <div className={`p-6 rounded-xl ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border shadow-sm`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  System Health
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  System monitoring, performance metrics, and health status will be displayed here.
                </p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className={`p-6 rounded-xl ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border shadow-sm`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  System Settings
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Platform configuration and administrative settings will be implemented here.
                </p>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ProfessionalAdminDashboard;