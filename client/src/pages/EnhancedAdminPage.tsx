import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  UserX,
  Eye,
  MessageSquare,
  TrendingUp,
  Crown,
  Star,
  AlertTriangle,
  Send,
  Download,
  Upload,
  Calendar,
  Activity,
  Award,
  Zap,
  Menu,
  X,
  Plus
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const EnhancedAdminPage = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Mock data with proper structure
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 15420,
    activeUsers: 8932,
    pendingBlogs: 47,
    publishedBlogs: 324,
    totalRevenue: 89450,
    conversionRate: 12.4
  });

  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "Advanced SQL Injection Techniques",
      author: "John Doe",
      status: "pending",
      submittedAt: "2024-01-15",
      category: "Web Security",
      views: 0,
      likes: 0
    },
    {
      id: 2,
      title: "Network Penetration Testing Guide",
      author: "Jane Smith",
      status: "approved",
      submittedAt: "2024-01-14",
      category: "Network Security",
      views: 1234,
      likes: 89
    },
    {
      id: 3,
      title: "Malware Analysis Fundamentals",
      author: "Mike Johnson",
      status: "rejected",
      submittedAt: "2024-01-13",
      category: "Malware",
      views: 0,
      likes: 0
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "creator",
      status: "active",
      joinedAt: "2023-12-01",
      posts: 15,
      reputation: 892
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "active",
      joinedAt: "2023-11-15",
      posts: 3,
      reputation: 234
    }
  ]);

  // Navigation items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'blog-management', label: 'Blog Management', icon: FileText },
    { id: 'user-management', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'site-settings', label: 'Site Settings', icon: Settings },
    { id: 'content-moderation', label: 'Content Moderation', icon: Shield },
    { id: 'reports', label: 'Reports', icon: Activity }
  ];

  // Blog management functions
  const approveBlog = (id: number) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id ? { ...post, status: 'approved' } : post
    ));
  };

  const rejectBlog = (id: number) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id ? { ...post, status: 'rejected' } : post
    ));
  };

  const requestRevision = (id: number) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id ? { ...post, status: 'revision_requested' } : post
    ));
  };

  // User management functions
  const promoteToCreator = (id: number) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, role: 'creator' } : user
    ));
  };

  const promoteToAdmin = (id: number) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, role: 'admin' } : user
    ));
  };

  const suspendUser = (id: number) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status: 'suspended' } : user
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': case 'active': return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'rejected': case 'suspended': return 'bg-red-500/20 text-red-600 border-red-500/30';
      case 'revision_requested': return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-purple-500/20 text-purple-600 border-purple-500/30';
      case 'admin': return 'bg-red-500/20 text-red-600 border-red-500/30';
      case 'creator': return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  // Temporarily removed access restrictions for testing - anyone can access admin features

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex`}>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 lg:w-64 xl:w-72 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-r transform lg:transform-none transition-transform duration-200 ease-in-out lg:translate-x-0 overflow-y-auto`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-inherit">
          <div className="flex items-center space-x-3">
            <Crown className={`h-8 w-8 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Super Admin
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 mb-2 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? isDark
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : isDark
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Stats in Sidebar */}
        <div className="mt-8 px-6">
          <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Quick Stats
          </h4>
          <div className="space-y-3">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {dashboardStats.pendingBlogs}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Pending Reviews
              </div>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {dashboardStats.activeUsers.toLocaleString()}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Active Users
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className={`h-16 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b flex items-center justify-between px-4 lg:px-6`}>
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className={`text-lg lg:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
              {navigationItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="relative hidden md:block">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 w-48 xl:w-64 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
              />
            </div>
            <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 w-full"
              >
                {/* Dashboard Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 w-full">
                  {[
                    { label: 'Total Users', value: dashboardStats.totalUsers.toLocaleString(), icon: Users, color: 'emerald' },
                    { label: 'Active Users', value: dashboardStats.activeUsers.toLocaleString(), icon: Activity, color: 'blue' },
                    { label: 'Pending Blogs', value: dashboardStats.pendingBlogs, icon: Clock, color: 'yellow' },
                    { label: 'Published Blogs', value: dashboardStats.publishedBlogs, icon: FileText, color: 'green' }
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-lg transition-shadow`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {stat.label}
                            </p>
                            <p className={`text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {stat.value}
                            </p>
                          </div>
                          <Icon className={`h-12 w-12 text-${stat.color}-500`} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Recent Activity */}
                <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {[
                      { action: 'New blog submitted', user: 'John Doe', time: '2 minutes ago', type: 'blog' },
                      { action: 'User registered', user: 'Jane Smith', time: '5 minutes ago', type: 'user' },
                      { action: 'Blog approved', user: 'Mike Johnson', time: '1 hour ago', type: 'approval' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'blog' ? 'bg-blue-500/20' :
                          activity.type === 'user' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                        }`}>
                          {activity.type === 'blog' && <FileText className="h-4 w-4 text-blue-500" />}
                          {activity.type === 'user' && <Users className="h-4 w-4 text-green-500" />}
                          {activity.type === 'approval' && <CheckCircle className="h-4 w-4 text-yellow-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {activity.action}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            by {activity.user}
                          </p>
                        </div>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'blog-management' && (
              <motion.div
                key="blog-management"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Blog Management
                  </h2>
                  <div className="flex items-center space-x-3">
                    <select className={`px-4 py-2 rounded-lg border ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}>
                      <option>All Status</option>
                      <option>Pending</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </select>
                    <button className="btn-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Blog
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {blogPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-lg transition-shadow`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                              {post.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ml-4 ${getStatusColor(post.status)}`}>
                              {post.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span>By {post.author}</span>
                            <span>•</span>
                            <span>{post.category}</span>
                            <span>•</span>
                            <span>Submitted {post.submittedAt}</span>
                            <span>•</span>
                            <span>{post.views} views, {post.likes} likes</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => approveBlog(post.id)}
                            className={`p-2 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-500/20 transition-colors ${
                              post.status === 'approved' ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={post.status === 'approved'}
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => requestRevision(post.id)}
                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/20 transition-colors"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => rejectBlog(post.id)}
                            className={`p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20 transition-colors ${
                              post.status === 'rejected' ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={post.status === 'rejected'}
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Eye className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'user-management' && (
              <motion.div
                key="user-management"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    User Management
                  </h2>
                  <div className="flex items-center space-x-3">
                    <select className={`px-4 py-2 rounded-lg border ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}>
                      <option>All Roles</option>
                      <option>Super Admin</option>
                      <option>Admin</option>
                      <option>Creator</option>
                      <option>User</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto min-w-0">
                  <table className={`w-full rounded-xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} min-w-[600px]`}>
                    <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <tr>
                        <th className="px-4 lg:px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-4 lg:px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-4 lg:px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 lg:px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Posts</th>
                        <th className="px-4 lg:px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Reputation</th>
                        <th className="px-4 lg:px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {user.name}
                              </div>
                              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {user.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                              {user.role.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                              {user.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                            {user.posts}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                            {user.reputation}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-1">
                              {user.role === 'user' && (
                                <button
                                  onClick={() => promoteToCreator(user.id)}
                                  className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                  title="Promote to Creator"
                                >
                                  <Star className="h-4 w-4" />
                                </button>
                              )}
                              {user.role === 'creator' && (
                                <button
                                  onClick={() => promoteToAdmin(user.id)}
                                  className="text-purple-600 hover:text-purple-900 p-1 rounded"
                                  title="Promote to Admin"
                                >
                                  <Crown className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={() => suspendUser(user.id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded"
                                title="Suspend User"
                              >
                                <UserX className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default EnhancedAdminPage;