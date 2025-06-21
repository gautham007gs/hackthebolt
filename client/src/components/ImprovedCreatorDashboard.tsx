import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, FileText, Plus, BarChart3, Users, DollarSign, Settings,
  Eye, Heart, MessageCircle, TrendingUp, Edit3, Trash2, Upload,
  Calendar, Clock, Star, Award
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import ProfessionalDashboardLayout from './ProfessionalDashboardLayout';

const ImprovedCreatorDashboard = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCreating, setIsCreating] = useState(false);

  // Creator stats
  const [stats] = useState({
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

  // Posts data
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

  // Notifications
  const notifications = [
    { id: 1, message: "Your post 'SQL Injection Guide' received 50 new likes", time: "2 min ago", type: "like" },
    { id: 2, message: "New comment on 'Network Security Basics'", time: "1 hour ago", type: "comment" },
    { id: 3, message: "You've gained 25 new followers this week", time: "1 day ago", type: "follower" },
    { id: 4, message: "Monthly analytics report is ready", time: "2 days ago", type: "report" }
  ];

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
        thumbnail: null,
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
        thumbnail: null,
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

      {/* Recent Posts & Quick Actions */}
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          My Posts
        </h2>
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
        {posts.map((post) => (
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
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditPost(post.id)}
                  className={`p-1 rounded ${
                    isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="p-1 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {post.title}
            </h3>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500">
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
              <span>{post.readTime}</span>
            </div>

            {post.status === 'draft' && (
              <button
                onClick={() => handlePublishPost(post.id)}
                className="w-full mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Publish Post
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Render create post form
  const renderCreatePost = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {isCreating ? 'Edit Post' : 'Create New Post'}
        </h2>
        <button
          onClick={() => {
            setIsCreating(false);
            setActiveTab('posts');
          }}
          className={`px-4 py-2 rounded-lg ${
            isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
          } transition-colors`}
        >
          Cancel
        </button>
      </div>

      <div className={`p-6 rounded-xl ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border shadow-sm`}>
        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Title
            </label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200`}
              placeholder="Enter post title..."
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Content
            </label>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              rows={12}
              className={`w-full px-4 py-2 rounded-lg ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200`}
              placeholder="Write your content here..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Category
              </label>
              <input
                type="text"
                value={newPost.category}
                onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200`}
                placeholder="e.g., Web Security"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Tags
              </label>
              <input
                type="text"
                value={newPost.tags}
                onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200`}
                placeholder="SQL, Security, Web"
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Excerpt
            </label>
            <textarea
              value={newPost.excerpt}
              onChange={(e) => setNewPost(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={3}
              className={`w-full px-4 py-2 rounded-lg ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200`}
              placeholder="Brief description of your post..."
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Status
              </label>
              <select
                value={newPost.status}
                onChange={(e) => setNewPost(prev => ({ ...prev, status: e.target.value }))}
                className={`px-4 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none`}
              >
                <option value="draft">Draft</option>
                <option value="published">Publish</option>
                <option value="under_review">Submit for Review</option>
              </select>
            </div>

            <button
              onClick={handleCreatePost}
              className="btn-primary"
            >
              {isCreating ? 'Update Post' : 'Create Post'}
            </button>
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
      case 'posts':
      case 'posts-all':
      case 'posts-published':
      case 'posts-drafts':
        return renderPosts();
      case 'create':
        return renderCreatePost();
      case 'analytics':
        return (
          <div className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border shadow-sm`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Analytics Dashboard
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Detailed analytics and performance metrics will be available here.
            </p>
          </div>
        );
      case 'audience':
        return (
          <div className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border shadow-sm`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Audience Insights
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Audience analytics and engagement metrics will be implemented here.
            </p>
          </div>
        );
      case 'monetization':
        return (
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
        );
      case 'settings':
        return (
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
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <ProfessionalDashboardLayout
      userRole="creator"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      notifications={notifications}
    >
      {renderContent()}
    </ProfessionalDashboardLayout>
  );
};

export default ImprovedCreatorDashboard;