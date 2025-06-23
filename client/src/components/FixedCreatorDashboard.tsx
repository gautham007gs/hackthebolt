import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Edit3, 
  Eye, 
  Heart, 
  MessageCircle, 
  Plus,
  Trash2,
  FileText,
  Users,
  BarChart3,
  Settings,
  ExternalLink,
  Search
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import ProfessionalDashboardLayout from './ProfessionalDashboardLayout';

const FixedCreatorDashboard = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock notifications for the layout
  const mockNotifications = [
    { id: 1, message: "New comment on your post", time: "2 hours ago", type: "comment", priority: "high" },
    { id: 2, message: "Your post was featured", time: "1 day ago", type: "feature", priority: "normal" }
  ];

  // Creator stats
  const stats = {
    totalPosts: 24,
    totalViews: 45670,
    totalLikes: 2340,
    totalComments: 892,
    followers: 1250,
    avgEngagement: 8.4,
    monthlyViews: 12450,
    publishedThisMonth: 6,
    draftPosts: 3,
    revenue: 2840,
    rankingPosition: 12
  };

  // Recent posts data
  const [posts] = useState([
    {
      id: 1,
      title: "Advanced SQL Injection Techniques",
      status: "published",
      views: 3420,
      likes: 156,
      comments: 23,
      publishedAt: "2024-01-15",
      category: "Web Security",
      readTime: "8 min read",
      engagement: 9.2,
      thumbnail: null,
      tags: ["SQL", "Security", "Web"],
      excerpt: "Learn advanced SQL injection techniques and how to prevent them in modern web applications."
    },
    {
      id: 2,
      title: "Network Penetration Testing Guide",
      status: "draft",
      views: 0,
      likes: 0,
      comments: 0,
      publishedAt: "",
      category: "Network Security",
      readTime: "12 min read",
      engagement: 0,
      thumbnail: null,
      tags: ["Network", "Pentesting", "Security"],
      excerpt: "Comprehensive guide to network penetration testing methodologies and tools."
    },
    {
      id: 3,
      title: "Cybersecurity Career Roadmap 2024",
      status: "published",
      views: 8750,
      likes: 442,
      comments: 89,
      publishedAt: "2024-01-10",
      category: "Career",
      readTime: "15 min read",
      engagement: 8.9,
      thumbnail: null,
      tags: ["Career", "Cybersecurity", "Guide"],
      excerpt: "Complete roadmap for starting and advancing your cybersecurity career in 2024."
    }
  ]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCreatePost = () => {
    setActiveTab('create');
  };

  const handleEditPost = (postId: number) => {
    console.log('Edit post:', postId);
  };

  const handleViewPost = (postId: number) => {
    console.log('View post:', postId);
  };

  const handleDeletePost = (postId: number) => {
    console.log('Delete post:', postId);
  };

  const handlePublishPost = (postId: number) => {
    console.log('Publish post:', postId);
  };

  // Render dashboard overview
  const renderDashboard = () => (
    <div className="space-y-4 lg:space-y-6">
      {/* Welcome Section */}
      <div className={`p-4 lg:p-6 rounded-xl border shadow-sm ${
        isDark ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
      }`}>
        <h2 className={`text-xl lg:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Welcome back, Creator!
        </h2>
        <p className={`text-sm lg:text-base mb-4 ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
          Ready to create amazing content today?
        </p>
        <button
          onClick={handleCreatePost}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors text-sm lg:text-base flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New Post
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {[
          { label: 'Posts', value: stats.totalPosts, icon: FileText, color: 'emerald' },
          { label: 'Views', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'blue' },
          { label: 'Likes', value: stats.totalLikes.toLocaleString(), icon: Heart, color: 'red' },
          { label: 'Followers', value: stats.followers, icon: Users, color: 'purple' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 lg:p-4 rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 ${
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
                stat.color === 'emerald' ? 'bg-emerald-500/10' : 
                stat.color === 'blue' ? 'bg-blue-500/10' : 
                stat.color === 'red' ? 'bg-red-500/10' : 'bg-purple-500/10'
              }`}>
                <stat.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${
                  stat.color === 'emerald' ? 'text-emerald-500' : 
                  stat.color === 'blue' ? 'text-blue-500' : 
                  stat.color === 'red' ? 'text-red-500' : 'text-purple-500'
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
            { label: 'New Post', icon: Plus, action: handleCreatePost, color: 'emerald' },
            { label: 'Draft Posts', icon: Edit3, action: () => setActiveTab('posts'), color: 'blue' },
            { label: 'Analytics', icon: BarChart3, action: () => setActiveTab('analytics'), color: 'purple' },
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

      {/* Recent Posts */}
      <div className={`p-4 lg:p-6 rounded-xl border shadow-sm ${
        isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
      } backdrop-blur-sm`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Recent Posts
          </h3>
          <button
            onClick={() => setActiveTab('posts')}
            className={`text-sm font-medium transition-colors ${
              isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {posts.slice(0, 3).map((post, index) => (
            <div key={post.id} className={`p-3 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-50/50 hover:bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    post.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {post.title}
                    </p>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={`px-2 py-0.5 rounded-full ${
                        post.status === 'published' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {post.status}
                      </span>
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {post.views} views
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  <button
                    onClick={() => handleEditPost(post.id)}
                    className={`p-1.5 rounded transition-colors ${
                      isDark ? 'hover:bg-gray-600 text-gray-300 hover:text-white' : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Edit3 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleViewPost(post.id)}
                    className={`p-1.5 rounded transition-colors ${
                      isDark ? 'hover:bg-gray-600 text-gray-300 hover:text-white' : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render posts management with fixed search functionality
  const renderPosts = () => (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className={`text-xl lg:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          My Posts
        </h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-8 pr-3 py-2 text-sm rounded-md border transition-colors ${
                isDark 
                  ? 'bg-gray-700/80 border-gray-600/60 text-white placeholder-gray-200 focus:bg-gray-700 focus:border-emerald-400' 
                  : 'bg-white border-gray-300/60 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-emerald-500'
              } focus:outline-none focus:ring-1 focus:ring-emerald-500/30`}
            />
          </div>
          <button
            onClick={handleCreatePost}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create New Post</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:gap-6">
        {posts.map(post => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 lg:p-6 rounded-xl border shadow-sm ${
              isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
            } backdrop-blur-sm`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  }`}>
                    {post.status}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {post.category}
                  </span>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {post.title}
                </h3>
                <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs lg:text-sm">
                  <span className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Eye className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                    {post.views}
                  </span>
                  <span className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Heart className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                    {post.likes}
                  </span>
                  <span className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                    {post.comments}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                <button
                  onClick={() => handleEditPost(post.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark 
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Edit
                </button>
                {post.status === 'draft' && (
                  <button
                    onClick={() => handlePublishPost(post.id)}
                    className="px-3 py-2 rounded-lg text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                  >
                    Publish
                  </button>
                )}
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="px-3 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Analytics section
  const renderAnalytics = () => (
    <div className={`p-4 lg:p-6 rounded-xl border shadow-sm ${
      isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
    } backdrop-blur-sm`}>
      <h3 className={`text-lg lg:text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Analytics Dashboard
      </h3>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        Detailed analytics and insights will be implemented here.
      </p>
    </div>
  );

  // Settings section
  const renderSettings = () => (
    <div className={`p-4 lg:p-6 rounded-xl border shadow-sm ${
      isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
    } backdrop-blur-sm`}>
      <h3 className={`text-lg lg:text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Creator Settings
      </h3>
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Display Name
          </label>
          <input
            type="text"
            placeholder="Your display name"
            className={`w-full px-3 py-2 text-sm rounded-md border transition-colors ${
              isDark 
                ? 'bg-gray-700/80 border-gray-600/60 text-white placeholder-gray-200 focus:bg-gray-700 focus:border-emerald-400' 
                : 'bg-white border-gray-300/60 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-emerald-500'
            } focus:outline-none focus:ring-1 focus:ring-emerald-500/30`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Bio
          </label>
          <textarea
            rows={3}
            placeholder="Tell readers about yourself..."
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

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return renderPosts();
      case 'analytics':
        return renderAnalytics();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <ProfessionalDashboardLayout
      userRole="creator"
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
        {renderContent()}
      </motion.div>
    </ProfessionalDashboardLayout>
  );
};

export default FixedCreatorDashboard;