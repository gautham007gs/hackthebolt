import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
import ProfessionalDashboardLayout from './ProfessionalDashboardLayout';

const ProfessionalCreatorDashboard = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);

  // Mock notifications for the layout
  const mockNotifications = [
    { id: 1, message: "New comment on your post", time: "2 hours ago", type: "comment", priority: "high" },
    { id: 2, message: "Your post was featured", time: "1 day ago", type: "feature", priority: "normal" }
  ];

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
      title: "Securing Docker Containers",
      status: "published",
      views: 2890,
      likes: 98,
      comments: 15,
      publishedAt: "2024-01-10",
      category: "DevSecOps",
      readTime: "6 min read",
      engagement: 7.8,
      thumbnail: null,
      tags: ["Docker", "Containers", "DevSecOps"],
      excerpt: "Best practices for securing Docker containers in production environments."
    }
  ]);

  // New post form data
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'Web Security',
    tags: '',
    excerpt: '',
    readTime: '5 min read',
    status: 'draft'
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCreatePost = () => {
    setIsCreating(true);
    setActiveTab('create');
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
        readTime: post.readTime,
        status: post.status
      });
      setIsCreating(true);
      setActiveTab('create');
    }
  };

  const handlePublishPost = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, status: 'published' } : post
    ));
  };

  const handleDeletePost = (postId: number) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  const handleSavePost = () => {
    if (newPost.title.trim()) {
      const post = {
        id: Date.now(),
        title: newPost.title,
        status: newPost.status as 'draft' | 'published',
        views: 0,
        likes: 0,
        comments: 0,
        publishedAt: new Date().toISOString().split('T')[0],
        category: newPost.category,
        readTime: newPost.readTime,
        engagement: 0,
        thumbnail: null,
        tags: newPost.tags.split(',').map(tag => tag.trim()),
        excerpt: newPost.excerpt
      };
      
      setPosts(prev => [post, ...prev]);
      setNewPost({
        title: '',
        content: '',
        category: 'Web Security',
        tags: '',
        excerpt: '',
        readTime: '5 min read',
        status: 'draft'
      });
      setIsCreating(false);
      setActiveTab('posts');
    }
  };

  // Render dashboard overview
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[
          { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'emerald' },
          { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'blue' },
          { label: 'Total Likes', value: stats.totalLikes.toLocaleString(), icon: Heart, color: 'red' },
          { label: 'Followers', value: stats.followers, icon: Users, color: 'purple' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 lg:p-6 rounded-xl ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs lg:text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
                <p className={`text-lg lg:text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
              </div>
              <stat.icon className={`h-6 w-6 lg:h-8 lg:w-8 text-${stat.color}-500`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Posts */}
      <div className={`p-4 lg:p-6 rounded-xl ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border shadow-sm`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6">
          <h3 className={`text-lg lg:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Recent Posts
          </h3>
          <button
            onClick={handleCreatePost}
            className="mt-3 sm:mt-0 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
          >
            Create New Post
          </button>
        </div>
        <div className="space-y-3 lg:space-y-4">
          {posts.slice(0, 3).map(post => (
            <div
              key={post.id}
              className={`p-3 lg:p-4 rounded-lg ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              } border`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <h4 className={`font-medium text-sm lg:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {post.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs lg:text-sm">
                    <span className={`px-2 py-1 rounded ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status}
                    </span>
                    <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Eye className="h-3 w-3 mr-1" />
                      {post.views}
                    </span>
                    <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Heart className="h-3 w-3 mr-1" />
                      {post.likes}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                  <button
                    onClick={() => handleEditPost(post.id)}
                    className={`px-3 py-1.5 rounded text-xs font-medium ${
                      isDark 
                        ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } transition-colors`}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render posts management
  const renderPosts = () => (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className={`text-xl lg:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          My Posts
        </h2>
        <button
          onClick={handleCreatePost}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4 inline mr-2" />
          Create New Post
        </button>
      </div>

      <div className="grid gap-4 lg:gap-6">
        {posts.map(post => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 lg:p-6 rounded-xl ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border shadow-sm`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  }`}>
                    {post.status}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {post.category}
                  </span>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {post.title}
                </h3>
                <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs lg:text-sm">
                  <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Eye className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                    {post.views}
                  </span>
                  <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Heart className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                    {post.likes}
                  </span>
                  <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
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
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
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

  // Render create post form
  const renderCreatePost = () => (
    <div className="max-w-4xl">
      <div className={`p-4 lg:p-6 rounded-xl ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border shadow-sm`}>
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <h3 className={`text-lg lg:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
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
            ×
          </button>
        </div>

        <div className="space-y-4 lg:space-y-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                <option value="Web Security">Web Security</option>
                <option value="Network Security">Network Security</option>
                <option value="DevSecOps">DevSecOps</option>
                <option value="Cryptography">Cryptography</option>
                <option value="Incident Response">Incident Response</option>
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
                placeholder="security, tutorial, guide"
                className={`w-full px-4 py-3 rounded-lg text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200`}
              />
            </div>
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
              rows={8}
              className={`w-full px-4 py-3 rounded-lg text-sm ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 resize-vertical`}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={newPost.status === 'draft'}
                  onChange={(e) => setNewPost(prev => ({ ...prev, status: e.target.value }))}
                  className="mr-2"
                />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Save as Draft</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={newPost.status === 'published'}
                  onChange={(e) => setNewPost(prev => ({ ...prev, status: e.target.value }))}
                  className="mr-2"
                />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Publish Now</span>
              </label>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setActiveTab('posts');
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSavePost}
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
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
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
            className={`p-4 lg:p-6 rounded-xl ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border shadow-sm`}
          >
            <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {stat.label}
            </h4>
            <p className={`text-xl lg:text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}
            </p>
            <p className="text-sm text-green-500 mt-1">{stat.change} from last month</p>
          </motion.div>
        ))}
      </div>

      <div className={`p-4 lg:p-6 rounded-xl ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border shadow-sm`}>
        <h3 className={`text-lg lg:text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Analytics Dashboard
        </h3>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Detailed analytics charts and insights will be available here. Track your content performance, audience engagement, and growth metrics.
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'posts':
      case 'posts-published':
      case 'posts-all':
      case 'posts-drafts':
        return renderPosts();
      case 'create':
        return renderCreatePost();
      case 'analytics':
        return renderAnalytics();
      case 'audience':
        return (
          <div className={`p-4 lg:p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border shadow-sm`}>
            <h3 className={`text-lg lg:text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Audience Insights
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Audience analytics and demographics will be displayed here.
            </p>
          </div>
        );
      case 'monetization':
        return (
          <div className={`p-4 lg:p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border shadow-sm`}>
            <h3 className={`text-lg lg:text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Monetization
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Revenue tracking and monetization options will be available here.
            </p>
          </div>
        );
      case 'settings':
        return (
          <div className={`p-4 lg:p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border shadow-sm`}>
            <h3 className={`text-lg lg:text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
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

export default ProfessionalCreatorDashboard;