import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Edit, 
  Plus, 
  BarChart3, 
  FileText, 
  Eye, 
  Heart, 
  MessageSquare, 
  TrendingUp,
  Save,
  Calendar,
  Clock,
  User,
  Settings,
  Upload,
  Image,
  Tag,
  Globe,
  Target,
  Zap,
  Star,
  Users,
  Activity,
  Menu,
  X,
  Search
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const EnhancedCreatorPage = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [stats, setStats] = useState({
    totalPosts: 24,
    totalViews: 45670,
    totalLikes: 2340,
    followers: 892,
    avgEngagement: 8.4,
    monthlyViews: 12450
  });

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
      readTime: "8 min read"
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
      readTime: "12 min read"
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
      readTime: "15 min read"
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    excerpt: '',
    featuredImage: '',
    seoTitle: '',
    seoDescription: ''
  });

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'my-posts', label: 'My Posts', icon: FileText },
    { id: 'create-post', label: 'Create Post', icon: Plus },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'audience', label: 'Audience', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) return;

    const post = {
      id: posts.length + 1,
      title: newPost.title,
      status: "draft",
      views: 0,
      likes: 0,
      comments: 0,
      publishedAt: null,
      category: newPost.category || "General",
      readTime: `${Math.ceil(newPost.content.length / 1000)} min read`
    };

    setPosts([post, ...posts]);
    setNewPost({
      title: '',
      content: '',
      category: '',
      tags: '',
      excerpt: '',
      featuredImage: '',
      seoTitle: '',
      seoDescription: ''
    });
    setIsCreating(false);
    setActiveTab('my-posts');
  };

  const publishPost = (id: number) => {
    setPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...post, status: 'under_review', publishedAt: new Date().toISOString().split('T')[0] }
        : post
    ));
  };

  const deletePost = (id: number) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'under_review': return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'draft': return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-600 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  // Temporarily removed access restrictions for testing - anyone can access creator features

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
            <Award className={`h-8 w-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Creator Hub
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
                  if (item.id === 'create-post') {
                    setIsCreating(true);
                  } else {
                    setIsCreating(false);
                  }
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 mb-2 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? isDark
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
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

        {/* Creator Stats in Sidebar */}
        <div className="mt-8 px-6">
          <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Your Performance
          </h4>
          <div className="space-y-3">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stats.totalViews.toLocaleString()}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Views
              </div>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stats.followers}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Followers
              </div>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
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
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 w-48 xl:w-64 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
            <button 
              onClick={() => {
                setActiveTab('create-post');
                setIsCreating(true);
              }}
              className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">New Post</span>
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
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {[
                    { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'blue', change: '+2 this month' },
                    { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'green', change: '+15.3%' },
                    { label: 'Total Likes', value: stats.totalLikes.toLocaleString(), icon: Heart, color: 'red', change: '+8.2%' },
                    { label: 'Followers', value: stats.followers, icon: Users, color: 'purple', change: '+23 this week' }
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
                        <div className="flex items-center justify-between mb-4">
                          <Icon className={`h-8 w-8 text-${stat.color}-500`} />
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                          }`}>
                            {stat.change}
                          </span>
                        </div>
                        <div>
                          <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {stat.value}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {stat.label}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Recent Posts Performance */}
                <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Recent Posts Performance
                  </h3>
                  <div className="space-y-4">
                    {posts.slice(0, 3).map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                            {post.title}
                          </h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span>{post.category}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                            <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(post.status)}`}>
                              {post.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 ml-4">
                          <div className="text-center">
                            <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {post.views.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">Views</div>
                          </div>
                          <div className="text-center">
                            <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {post.likes}
                            </div>
                            <div className="text-xs text-gray-500">Likes</div>
                          </div>
                          <div className="text-center">
                            <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {post.comments}
                            </div>
                            <div className="text-xs text-gray-500">Comments</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'my-posts' && (
              <motion.div
                key="my-posts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    My Posts ({posts.length})
                  </h2>
                  <div className="flex items-center space-x-3">
                    <select className={`px-4 py-2 rounded-lg border ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}>
                      <option>All Status</option>
                      <option>Published</option>
                      <option>Draft</option>
                      <option>Under Review</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4">
                  {posts.map((post) => (
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
                            <span>{post.category}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                            {post.publishedAt && (
                              <>
                                <span>•</span>
                                <span>Published {post.publishedAt}</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center space-x-6 mt-3">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-500">{post.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-500">{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-500">{post.comments}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/20 transition-colors">
                            <Edit className="h-5 w-5" />
                          </button>
                          {post.status === 'draft' && (
                            <button
                              onClick={() => publishPost(post.id)}
                              className="p-2 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-500/20 transition-colors"
                            >
                              <Upload className="h-5 w-5" />
                            </button>
                          )}
                          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => deletePost(post.id)}
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20 transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {(activeTab === 'create-post' || isCreating) && (
              <motion.div
                key="create-post"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Create New Post
                  </h2>
                </div>

                <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Post Title *
                        </label>
                        <input
                          type="text"
                          value={newPost.title}
                          onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            isDark 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          placeholder="Enter your post title..."
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Category
                        </label>
                        <select
                          value={newPost.category}
                          onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            isDark 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-gray-50 border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        >
                          <option value="">Select Category</option>
                          <option value="Web Security">Web Security</option>
                          <option value="Network Security">Network Security</option>
                          <option value="Malware Analysis">Malware Analysis</option>
                          <option value="Cryptography">Cryptography</option>
                          <option value="Social Engineering">Social Engineering</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Content *
                      </label>
                      <textarea
                        rows={12}
                        value={newPost.content}
                        onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical`}
                        placeholder="Write your post content here..."
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Tags
                        </label>
                        <input
                          type="text"
                          value={newPost.tags}
                          onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            isDark 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          placeholder="security, hacking, tutorial..."
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Featured Image URL
                        </label>
                        <input
                          type="url"
                          value={newPost.featuredImage}
                          onChange={(e) => setNewPost({...newPost, featuredImage: e.target.value})}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            isDark 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Excerpt
                      </label>
                      <textarea
                        rows={3}
                        value={newPost.excerpt}
                        onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical`}
                        placeholder="Brief description of your post..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreating(false);
                          setActiveTab('my-posts');
                        }}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleCreatePost}
                        className="btn-primary"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Draft
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default EnhancedCreatorPage;