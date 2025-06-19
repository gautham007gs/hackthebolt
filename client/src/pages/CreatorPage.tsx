import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'wouter';
import { 
  FileText, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  BarChart3, 
  Users, 
  Heart, 
  MessageSquare,
  TrendingUp,
  Calendar,
  Upload,
  Save,
  Send,
  Star,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const CreatorPage = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [posts, setPosts] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    followers: 0
  });
  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    excerpt: '',
    image: ''
  });

  useEffect(() => {
    loadCreatorData();
  }, []);

  const loadCreatorData = () => {
    // Mock data - replace with actual API calls
    setStats({
      totalPosts: 15,
      totalViews: 12450,
      totalLikes: 892,
      followers: 234
    });

    setPosts([
      {
        id: 1,
        title: 'Advanced SQL Injection Techniques',
        status: 'published',
        views: 1250,
        likes: 89,
        comments: 23,
        publishDate: '2024-12-10',
        category: 'Web Security',
        excerpt: 'Comprehensive guide to advanced SQL injection methods and prevention strategies.'
      },
      {
        id: 2,
        title: 'Network Penetration Testing Guide',
        status: 'draft',
        views: 0,
        likes: 0,
        comments: 0,
        publishDate: '',
        category: 'Network Security',
        excerpt: 'Step-by-step guide to conducting network penetration tests.'
      },
      {
        id: 3,
        title: 'XSS Prevention Best Practices',
        status: 'pending',
        views: 0,
        likes: 0,
        comments: 0,
        publishDate: '2024-12-15',
        category: 'Web Security',
        excerpt: 'Complete guide to preventing cross-site scripting attacks.'
      }
    ]);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'posts', label: 'My Posts', icon: FileText },
    { id: 'create', label: 'Create Post', icon: Plus },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'profile', label: 'Creator Profile', icon: Users }
  ];

  const handleCreatePost = () => {
    const post = {
      id: Date.now(),
      ...newPost,
      status: 'draft',
      views: 0,
      likes: 0,
      comments: 0,
      publishDate: '',
      tags: newPost.tags.split(',').map(tag => tag.trim())
    };
    
    setPosts(prev => [post, ...prev]);
    setNewPost({
      title: '',
      content: '',
      category: '',
      tags: '',
      excerpt: '',
      image: ''
    });
    setIsCreating(false);
    setActiveTab('posts');
  };

  const publishPost = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, status: 'pending', publishDate: new Date().toISOString().split('T')[0] }
        : post
    ));
  };

  const deletePost = (postId: number) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'draft': return <Edit className="h-4 w-4 text-gray-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'draft': return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-600 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  // Temporarily removed access restrictions for testing - anyone can access creator features

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
                Creator Dashboard
              </h1>
              <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage your content and track your impact
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setIsCreating(true);
                  setActiveTab('create');
                }}
                className="btn-primary"
              >
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
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'blue' },
            { label: 'Total Views', value: stats.totalViews, icon: Eye, color: 'green' },
            { label: 'Total Likes', value: stats.totalLikes, icon: Heart, color: 'red' },
            { label: 'Followers', value: stats.followers, icon: Users, color: 'purple' }
          ].map((stat, index) => (
            <div key={index} className="card-elevated p-6">
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
              {/* Recent Posts */}
              <div className="card-elevated p-6">
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Recent Posts
                </h3>
                <div className="space-y-4">
                  {posts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(post.status)}
                          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {post.title}
                          </h4>
                        </div>
                        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {post.category} • {post.views} views • {post.likes} likes
                        </p>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Chart Placeholder */}
              <div className="card-elevated p-6">
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Performance Overview
                </h3>
                <div className={`h-64 flex items-center justify-center border-2 border-dashed rounded-lg ${
                  isDark ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'
                }`}>
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                    <p>Analytics chart will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-6">
              {/* Posts Table */}
              <div className="card-elevated overflow-hidden">
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
                          Engagement
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
                            <div>
                              <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {post.title}
                              </div>
                              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {post.category}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(post.status)}`}>
                              {post.status}
                            </span>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                            {post.views.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="flex items-center">
                                <Heart className="h-4 w-4 mr-1 text-red-500" />
                                {post.likes}
                              </span>
                              <span className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1 text-blue-500" />
                                {post.comments}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-emerald-600 hover:text-emerald-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            {post.status === 'draft' && (
                              <button
                                onClick={() => publishPost(post.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                <Send className="h-4 w-4" />
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

          {activeTab === 'create' && (
            <div className="space-y-6">
              {/* Post Creation Form */}
              <div className="card-elevated p-6">
                <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Create New Post
                </h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Title
                      </label>
                      <input
                        type="text"
                        value={newPost.title}
                        onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        className={`w-full px-3 py-2 border rounded-lg ${
                          isDark 
                            ? 'border-gray-600 bg-gray-700 text-white' 
                            : 'border-gray-300 bg-white text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                        placeholder="Enter post title..."
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Category
                      </label>
                      <select
                        value={newPost.category}
                        onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                        className={`w-full px-3 py-2 border rounded-lg ${
                          isDark 
                            ? 'border-gray-600 bg-gray-700 text-white' 
                            : 'border-gray-300 bg-white text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      >
                        <option value="">Select category...</option>
                        <option value="Web Security">Web Security</option>
                        <option value="Network Security">Network Security</option>
                        <option value="Malware Analysis">Malware Analysis</option>
                        <option value="Penetration Testing">Penetration Testing</option>
                        <option value="Forensics">Digital Forensics</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Excerpt
                    </label>
                    <textarea
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost(prev => ({ ...prev, excerpt: e.target.value }))}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isDark 
                          ? 'border-gray-600 bg-gray-700 text-white' 
                          : 'border-gray-300 bg-white text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      placeholder="Brief description of your post..."
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Content
                    </label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                      rows={12}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isDark 
                          ? 'border-gray-600 bg-gray-700 text-white' 
                          : 'border-gray-300 bg-white text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      placeholder="Write your post content here..."
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={newPost.tags}
                      onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isDark 
                          ? 'border-gray-600 bg-gray-700 text-white' 
                          : 'border-gray-300 bg-white text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      placeholder="security, hacking, tutorial..."
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreating(false);
                        setActiveTab('posts');
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
            </div>
          )}

          {/* Add other tab contents as needed */}
        </motion.div>
      </div>
    </div>
  );
};

export default CreatorPage;