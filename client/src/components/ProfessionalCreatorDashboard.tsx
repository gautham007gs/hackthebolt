import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit3, 
  Eye, 
  Heart, 
  MessageCircle, 
  TrendingUp, 
  Calendar,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Save,
  Trash2,
  CheckCircle,
  Clock,
  Menu,
  X,
  Home,
  FileText,
  BarChart3,
  Settings,
  Users,
  Star,
  Award,
  Target,
  Zap,
  BookOpen,
  Image,
  Tag,
  Send,
  DollarSign,
  Activity,
  Upload,
  Link,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Copy,
  Download,
  ExternalLink,
  RefreshCw,
  Bell,
  User,
  Globe
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const ProfessionalCreatorDashboard = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Creator stats
  const [stats, setStats] = useState({
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
  });

  // Recent posts data
  const [posts, setPosts] = useState([
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
      publishedAt: null,
      category: "Network Security",
      readTime: "12 min read",
      engagement: 0,
      thumbnail: null,
      tags: ["Network", "Pentesting", "Security"],
      excerpt: "Complete guide to network penetration testing methodologies and tools."
    },
    {
      id: 3,
      title: "Malware Analysis Fundamentals",
      status: "under_review",
      views: 0,
      likes: 0,
      comments: 0,
      publishedAt: null,
      category: "Malware Analysis",
      readTime: "15 min read",
      engagement: 0,
      thumbnail: null,
      tags: ["Malware", "Analysis", "Reverse Engineering"],
      excerpt: "Understanding the basics of malware analysis and reverse engineering techniques."
    }
  ]);

  // New post form data
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    excerpt: '',
    thumbnail: null,
    seoTitle: '',
    seoDescription: '',
    status: 'draft'
  });

  // Navigation items
  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'posts', name: 'My Posts', icon: FileText },
    { id: 'create', name: 'Create Post', icon: Plus },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'audience', name: 'Audience', icon: Users },
    { id: 'monetization', name: 'Monetization', icon: DollarSign },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  // Notifications
  const [notifications] = useState([
    { id: 1, message: "Your post 'SQL Injection Guide' received 50 new likes", time: "2 min ago", type: "like" },
    { id: 2, message: "New comment on 'Network Security Basics'", time: "1 hour ago", type: "comment" },
    { id: 3, message: "You've gained 25 new followers this week", time: "1 day ago", type: "follower" },
    { id: 4, message: "Monthly analytics report is ready", time: "2 days ago", type: "report" }
  ]);

  const closeSidebar = () => setSidebarOpen(false);

  // Handle post actions
  const handlePublishPost = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, status: 'published', publishedAt: new Date().toISOString() }
        : post
    ));
  };

  const handleDeletePost = (postId: number) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  const handleEditPost = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setNewPost({
        title: post.title,
        content: post.excerpt,
        category: post.category,
        tags: post.tags.join(', '),
        excerpt: post.excerpt,
        thumbnail: post.thumbnail,
        seoTitle: post.title,
        seoDescription: post.excerpt,
        status: post.status
      });
      setActiveTab('create');
      setIsCreating(true);
    }
  };

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: Date.now(),
        title: newPost.title,
        status: newPost.status as any,
        views: 0,
        likes: 0,
        comments: 0,
        publishedAt: newPost.status === 'published' ? new Date().toISOString().split('T')[0] : null,
        category: newPost.category,
        readTime: "5 min read",
        engagement: 0,
        thumbnail: newPost.thumbnail,
        tags: newPost.tags.split(',').map(tag => tag.trim()),
        excerpt: newPost.excerpt
      };
      setPosts(prev => [post, ...prev]);
      setNewPost({
        title: '',
        content: '',
        category: '',
        tags: '',
        excerpt: '',
        thumbnail: null,
        seoTitle: '',
        seoDescription: '',
        status: 'draft'
      });
      setIsCreating(false);
      setActiveTab('posts');
    }
  };

  // Render dashboard overview
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: Eye, change: '+23.5%', trend: 'up' },
          { label: 'Followers', value: stats.followers.toLocaleString(), icon: Users, change: '+12.3%', trend: 'up' },
          { label: 'Engagement', value: `${stats.avgEngagement}%`, icon: Heart, change: '+5.2%', trend: 'up' },
          { label: 'Revenue', value: `$${stats.revenue}`, icon: DollarSign, change: '+18.7%', trend: 'up' }
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

      {/* Recent Posts & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <div className={`lg:col-span-2 p-6 rounded-xl ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border shadow-sm`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recent Posts
            </h3>
            <button 
              onClick={() => setActiveTab('posts')}
              className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {posts.slice(0, 3).map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex-1">
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {post.title}
                  </h4>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {post.views}
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.status === 'published' ? 'bg-green-100 text-green-800' :
                      post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {post.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleEditPost(post.id)}
                  className={`p-2 rounded-lg ${
                    isDark ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  <Edit3 className="h-4 w-4" />
                </button>
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
              { name: 'Create New Post', icon: Plus, action: () => { setActiveTab('create'); setIsCreating(true); } },
              { name: 'View Analytics', icon: BarChart3, action: () => setActiveTab('analytics') },
              { name: 'Check Comments', icon: MessageCircle, action: () => setActiveTab('posts') },
              { name: 'Upload Media', icon: Upload, action: () => {} }
            ].map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  isDark ? 'hover:bg-gray-700 text-gray-300 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render posts management
  const renderPosts = () => (
    <div className="space-y-6">
      {/* Posts Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search posts..."
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
            <option value="draft">Draft</option>
            <option value="under_review">Under Review</option>
          </select>
        </div>
        <button
          onClick={() => { setActiveTab('create'); setIsCreating(true); }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Post</span>
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.filter(post => 
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border shadow-sm hover:shadow-md transition-all duration-200`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                post.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                post.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
              }`}>
                {post.status.replace('_', ' ')}
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
              {post.title}
            </h3>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{post.category}</span>
              <span>{post.readTime}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {post.views}
                </span>
                <span className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  {post.likes}
                </span>
                <span className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {post.comments}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleEditPost(post.id)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Edit
              </button>
              {post.status === 'draft' && (
                <button
                  onClick={() => handlePublishPost(post.id)}
                  className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
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
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Render create post form
  const renderCreatePost = () => (
    <div className="max-w-4xl mx-auto">
      <div className={`p-6 rounded-xl ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border shadow-sm`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isCreating ? 'Edit Post' : 'Create New Post'}
          </h3>
          <button
            onClick={() => {
              setIsCreating(false);
              setActiveTab('posts');
            }}
            className={`p-2 rounded-lg ${
              isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Title
            </label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter post title..."
              className={`w-full px-4 py-3 rounded-lg text-sm ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200`}
            />
          </div>

          {/* Category and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Category
              </label>
              <select
                value={newPost.category}
                onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200`}
              >
                <option value="">Select Category</option>
                <option value="Web Security">Web Security</option>
                <option value="Network Security">Network Security</option>
                <option value="Malware Analysis">Malware Analysis</option>
                <option value="Penetration Testing">Penetration Testing</option>
                <option value="Cryptography">Cryptography</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={newPost.tags}
                onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="security, hacking, tutorial"
                className={`w-full px-4 py-3 rounded-lg text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200`}
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Excerpt
            </label>
            <textarea
              value={newPost.excerpt}
              onChange={(e) => setNewPost(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief description of your post..."
              rows={3}
              className={`w-full px-4 py-3 rounded-lg text-sm ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 resize-none`}
            />
          </div>

          {/* Content */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Content
            </label>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Write your post content here..."
              rows={12}
              className={`w-full px-4 py-3 rounded-lg text-sm ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 resize-none`}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <select
                value={newPost.status}
                onChange={(e) => setNewPost(prev => ({ ...prev, status: e.target.value }))}
                className={`px-3 py-2 rounded-lg text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none`}
              >
                <option value="draft">Save as Draft</option>
                <option value="published">Publish Now</option>
                <option value="under_review">Submit for Review</option>
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setActiveTab('posts');
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                disabled={!newPost.title || !newPost.content}
                className="px-6 py-2 rounded-lg text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {newPost.status === 'published' ? 'Publish' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render analytics
  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Monthly Views', value: stats.monthlyViews.toLocaleString(), change: '+15.3%' },
          { label: 'Avg. Engagement', value: `${stats.avgEngagement}%`, change: '+2.1%' },
          { label: 'New Followers', value: '125', change: '+8.7%' },
          { label: 'Post Performance', value: 'Excellent', change: '+12.5%' }
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
          Detailed analytics charts and insights will be available here. Track your content performance, audience engagement, and growth metrics.
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
              Creator Studio
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

        {/* Creator Stats in Sidebar */}
        <div className="p-6 border-t border-gray-700">
          <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Your Performance
          </h4>
          <div className="space-y-3">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stats.totalViews.toLocaleString()}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Views
              </div>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stats.followers}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Followers
              </div>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stats.avgEngagement}%
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Engagement
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
                  Create and manage your content
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
                    Notifications
                  </h3>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'like' ? 'bg-red-500' :
                          notification.type === 'comment' ? 'bg-blue-500' :
                          notification.type === 'follower' ? 'bg-green-500' : 'bg-yellow-500'
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
            {activeTab === 'posts' && renderPosts()}
            {activeTab === 'create' && renderCreatePost()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'audience' && (
              <div className={`p-6 rounded-xl ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border shadow-sm`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Audience Insights
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Audience analytics and demographics will be displayed here.
                </p>
              </div>
            )}
            {activeTab === 'monetization' && (
              <div className={`p-6 rounded-xl ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border shadow-sm`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Monetization
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Revenue tracking and monetization options will be available here.
                </p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className={`p-6 rounded-xl ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border shadow-sm`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Creator Settings
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Profile settings and preferences will be implemented here.
                </p>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ProfessionalCreatorDashboard;