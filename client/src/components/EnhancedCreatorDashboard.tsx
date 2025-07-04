import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit3, Eye, Heart, MessageCircle, Share2, TrendingUp, 
  DollarSign, Award, Users, BarChart3, Settings, Save, Upload,
  Star, Trophy, Target, Zap, Calendar, Clock, Tag, Filter,
  Search, Download, ExternalLink, Copy, CheckCircle, AlertCircle,
  Bookmark, Flag, MoreHorizontal, ThumbsUp, Trash2, Archive
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import ProfessionalDashboardLayout from './ProfessionalDashboardLayout';
import RichTextEditor from './RichTextEditor';

interface Post {
  id: number;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  likes: number;
  comments: number;
  points: number;
  publishedAt: string;
  category: string;
  tags: string[];
  readTime: string;
  engagement: number;
  thumbnail?: string;
  excerpt: string;
  featured: boolean;
  trending: boolean;
}

const EnhancedCreatorDashboard = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);

  // Creator stats with points system
  const [stats] = useState({
    totalPosts: 24,
    totalViews: 45670,
    totalLikes: 2340,
    totalComments: 892,
    totalPoints: 8450,
    level: 'Expert Creator',
    rank: 12,
    followers: 1250,
    avgEngagement: 8.4,
    monthlyViews: 12450,
    publishedThisMonth: 6,
    draftPosts: 3,
    revenue: 2840,
    nextLevelPoints: 1550,
    achievements: [
      { id: 1, name: 'First Post', icon: '🎉', earned: true },
      { id: 2, name: 'Viral Content', icon: '🔥', earned: true },
      { id: 3, name: '1K Followers', icon: '👥', earned: true },
      { id: 4, name: 'Top Creator', icon: '🏆', earned: false }
    ]
  });

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Advanced SQL Injection Techniques",
      content: "Learn advanced SQL injection techniques...",
      status: "published",
      views: 3420,
      likes: 156,
      comments: 23,
      points: 450,
      publishedAt: "2024-01-15",
      category: "Web Security",
      tags: ["SQL", "Security", "Web"],
      readTime: "8 min read",
      engagement: 9.2,
      excerpt: "Learn advanced SQL injection techniques and how to prevent them.",
      featured: true,
      trending: true
    },
    {
      id: 2,
      title: "Network Penetration Testing Guide",
      content: "Comprehensive guide to network penetration testing...",
      status: "draft",
      views: 0,
      likes: 0,
      comments: 0,
      points: 0,
      publishedAt: "",
      category: "Network Security",
      tags: ["Network", "Pentesting", "Security"],
      readTime: "12 min read",
      engagement: 0,
      excerpt: "Comprehensive guide to network penetration testing methodologies.",
      featured: false,
      trending: false
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    excerpt: '',
    thumbnail: ''
  });

  const mockNotifications = [
    { id: 1, message: "New comment on your post", time: "2 hours ago", type: "comment", priority: "high" },
    { id: 2, message: "Your post was featured", time: "1 day ago", type: "feature", priority: "normal" },
    { id: 3, message: "You earned 50 points!", time: "3 hours ago", type: "points", priority: "high" }
  ];

  const handleCreatePost = () => {
    const post: Post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      status: 'draft',
      views: 0,
      likes: 0,
      comments: 0,
      points: 0,
      publishedAt: '',
      category: newPost.category,
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      readTime: `${Math.ceil(newPost.content.length / 200)} min read`,
      engagement: 0,
      excerpt: newPost.excerpt,
      featured: false,
      trending: false
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: '', tags: '', excerpt: '', thumbnail: '' });
    setIsCreating(false);
    setActiveTab('posts');
  };

  const handlePublishPost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, status: 'published' as const, publishedAt: new Date().toISOString().split('T')[0] }
        : post
    ));
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterStatus === 'all' || post.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className={`${isDark ? 'bg-gradient-to-br from-emerald-800/20 to-blue-800/20 border-emerald-700/30' : 'bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200'} p-4 md:p-6 rounded-xl border backdrop-blur-sm`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h2 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Welcome back, {user?.name || 'Creator'}! 
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className={`flex items-center space-x-2 ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                <Award className="h-4 w-4" />
                <span className="font-medium">{stats.level}</span>
              </div>
              <div className={`flex items-center space-x-2 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                <Trophy className="h-4 w-4" />
                <span className="font-medium">Rank #{stats.rank}</span>
              </div>
              <div className={`flex items-center space-x-2 ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                <Star className="h-4 w-4" />
                <span className="font-medium">{stats.totalPoints} points</span>
              </div>
            </div>
            <div className="mt-3">
              <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
                Progress to next level
              </div>
              <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2`}>
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min((stats.totalPoints % 1000) / 10, 100)}%` }}
                />
              </div>
              <div className={`text-xs ${isDark ? 'text-emerald-300' : 'text-emerald-600'} mt-1`}>
                {stats.nextLevelPoints} points to next level
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                setIsCreating(true);
                setActiveTab('create');
              }}
              className="w-full lg:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              <span>Create Post</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Total Posts', value: stats.totalPosts, icon: Edit3, color: 'emerald', change: '+2 this week' },
          { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'blue', change: '+12% this month' },
          { label: 'Total Likes', value: stats.totalLikes.toLocaleString(), icon: Heart, color: 'rose', change: '+8% this month' },
          { label: 'Creator Points', value: stats.totalPoints.toLocaleString(), icon: Star, color: 'amber', change: '+150 this week' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 md:p-6 rounded-xl border hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</p>
                <p className={`text-xl md:text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                <p className={`text-xs mt-2 font-medium ${
                  stat.color === 'emerald' ? (isDark ? 'text-emerald-400' : 'text-emerald-600') :
                  stat.color === 'blue' ? (isDark ? 'text-blue-400' : 'text-blue-600') :
                  stat.color === 'rose' ? (isDark ? 'text-rose-400' : 'text-rose-600') :
                  stat.color === 'amber' ? (isDark ? 'text-amber-400' : 'text-amber-600') : 
                  (isDark ? 'text-gray-400' : 'text-gray-600')
                }`}>{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.color === 'emerald' ? (isDark ? 'bg-emerald-500/20' : 'bg-emerald-100') :
                stat.color === 'blue' ? (isDark ? 'bg-blue-500/20' : 'bg-blue-100') :
                stat.color === 'rose' ? (isDark ? 'bg-rose-500/20' : 'bg-rose-100') :
                stat.color === 'amber' ? (isDark ? 'bg-amber-500/20' : 'bg-amber-100') : 
                (isDark ? 'bg-gray-500/20' : 'bg-gray-100')
              }`}>
                <stat.icon className={`h-5 w-5 md:h-6 md:w-6 ${
                  stat.color === 'emerald' ? (isDark ? 'text-emerald-400' : 'text-emerald-600') :
                  stat.color === 'blue' ? (isDark ? 'text-blue-400' : 'text-blue-600') :
                  stat.color === 'rose' ? (isDark ? 'text-rose-400' : 'text-rose-600') :
                  stat.color === 'amber' ? (isDark ? 'text-amber-400' : 'text-amber-600') : 
                  (isDark ? 'text-gray-400' : 'text-gray-600')
                }`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 md:p-6 rounded-xl border`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Achievements</h3>
          <Trophy className={`h-5 w-5 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg text-center transition-all hover:scale-105 ${
                achievement.earned
                  ? isDark ? 'bg-emerald-500/20 border border-emerald-600/30' : 'bg-emerald-50 border border-emerald-200'
                  : isDark ? 'bg-gray-700/50 border border-gray-600/50 opacity-60' : 'bg-gray-50 border border-gray-200 opacity-60'
              }`}
            >
              <div className="text-xl md:text-2xl mb-1">{achievement.icon}</div>
              <p className={`text-xs md:text-sm font-medium ${
                achievement.earned 
                  ? isDark ? 'text-emerald-300' : 'text-emerald-800'
                  : isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>{achievement.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 md:p-6 rounded-xl border`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Posts</h3>
          <button
            onClick={() => setActiveTab('posts')}
            className={`text-sm font-medium ${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} transition-colors`}
          >
            View all
          </button>
        </div>
        <div className="space-y-3">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className={`p-4 rounded-lg border transition-all hover:shadow-sm ${isDark ? 'border-gray-600/50 bg-gray-700/20' : 'border-gray-200 bg-gray-50/50'}`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.title}</h4>
                    {post.featured && <Star className="h-4 w-4 text-amber-500" />}
                    {post.trending && <TrendingUp className="h-4 w-4 text-rose-500" />}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      post.status === 'published' 
                        ? isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                        : post.status === 'draft'
                        ? isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700'
                        : isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>{post.status}</span>
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{post.views} views</span>
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{post.likes} likes</span>
                    <span className={`font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>+{post.points} pts</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}>
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}>
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCreatePost = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {editingPost ? 'Edit Post' : 'Create New Post'}
        </h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setIsCreating(false);
              setEditingPost(null);
              setActiveTab('dashboard');
            }}
            className={`px-4 py-2 rounded-lg ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePost}
            disabled={!newPost.title || !newPost.content}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Draft</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Title
            </label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              placeholder="Enter your post title..."
              className={`w-full p-3 rounded-lg border ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Content
            </label>
            <RichTextEditor
              content={newPost.content}
              onChange={(content) => setNewPost({ ...newPost, content })}
              placeholder="Start writing your amazing content..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Post Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className={`w-full p-2 rounded border ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select Category</option>
                  <option value="Web Security">Web Security</option>
                  <option value="Network Security">Network Security</option>
                  <option value="Mobile Security">Mobile Security</option>
                  <option value="Career">Career</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tags
                </label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  placeholder="security, web, tutorial"
                  className={`w-full p-2 rounded border ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Separate tags with commas
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Excerpt
                </label>
                <textarea
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                  placeholder="Brief description of your post..."
                  rows={3}
                  className={`w-full p-2 rounded border resize-none ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Points System Info */}
          <div className={`${isDark ? 'bg-gradient-to-r from-emerald-900/30 to-blue-900/30' : 'bg-gradient-to-r from-emerald-50 to-blue-50'} p-4 rounded-lg border ${isDark ? 'border-emerald-700/50' : 'border-emerald-200'}`}>
            <div className="flex items-center space-x-2 mb-2">
              <Star className="h-5 w-5 text-emerald-500" />
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Earn Points</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Publishing post:</span>
                <span className="text-emerald-500 font-medium">+50 points</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Per 100 views:</span>
                <span className="text-emerald-500 font-medium">+10 points</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Per like:</span>
                <span className="text-emerald-500 font-medium">+5 points</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Per comment:</span>
                <span className="text-emerald-500 font-medium">+15 points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPosts = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>My Posts</h2>
        <button
          onClick={() => {
            setIsCreating(true);
            setActiveTab('create');
          }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 w-fit"
        >
          <Plus className="h-4 w-4" />
          <span>New Post</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 w-full rounded-lg border ${
              isDark 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={`px-4 py-2 rounded-lg border ${
            isDark 
              ? 'bg-gray-800 border-gray-700 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
        >
          <option value="all">All Posts</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 md:p-6 rounded-xl border hover:shadow-lg transition-all`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.title}</h3>
                  {post.featured && <Star className="h-4 w-4 text-amber-500" />}
                  {post.trending && <TrendingUp className="h-4 w-4 text-rose-500" />}
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-3 leading-relaxed`}>{post.excerpt}</p>
                
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    post.status === 'published' 
                      ? isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                      : post.status === 'draft'
                      ? isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700'
                      : isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {post.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                    {post.category}
                  </span>
                  <span className={`text-xs font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>+{post.points} pts</span>
                </div>

                <div className="flex items-center space-x-4 text-sm">
                  <div className={`flex items-center space-x-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Eye className="h-4 w-4" />
                    <span>{post.views}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
                <button
                  onClick={() => setEditingPost(post)}
                  className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                  title="Edit"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                </button>
                {post.status === 'draft' && (
                  <button
                    onClick={() => handlePublishPost(post.id)}
                    className="px-3 py-1.5 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600 transition-colors font-medium"
                  >
                    Publish
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No posts found matching your criteria</p>
        </div>
      )}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'This Month Views', value: stats.monthlyViews.toLocaleString(), change: '+15%', color: 'blue' },
          { label: 'Engagement Rate', value: `${stats.avgEngagement}%`, change: '+2.3%', color: 'emerald' },
          { label: 'Followers Growth', value: '+' + (stats.followers * 0.1).toFixed(0), change: '+12%', color: 'purple' },
          { label: 'Revenue', value: `$${stats.revenue}`, change: '+8%', color: 'green' }
        ].map((metric, index) => (
          <div key={index} className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 md:p-6 rounded-xl border hover:shadow-lg transition-shadow`}>
            <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{metric.label}</h3>
            <p className={`text-xl md:text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{metric.value}</p>
            <p className={`text-sm mt-2 font-medium ${
              metric.color === 'blue' ? (isDark ? 'text-blue-400' : 'text-blue-600') :
              metric.color === 'emerald' ? (isDark ? 'text-emerald-400' : 'text-emerald-600') :
              metric.color === 'purple' ? (isDark ? 'text-purple-400' : 'text-purple-600') :
              metric.color === 'green' ? (isDark ? 'text-green-400' : 'text-green-600') :
              (isDark ? 'text-gray-400' : 'text-gray-600')
            }`}>{metric.change} from last month</p>
          </div>
        ))}
      </div>

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Top Performing Posts</h3>
        <div className="space-y-4">
          {posts
            .filter(post => post.status === 'published')
            .sort((a, b) => b.views - a.views)
            .slice(0, 5)
            .map((post, index) => (
              <div key={post.id} className={`flex items-center justify-between p-4 rounded-lg transition-colors ${isDark ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-50 hover:bg-gray-100'}`}>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-bold w-6 text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    #{index + 1}
                  </span>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.title}</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{post.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.views.toLocaleString()} views</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>+{post.points} points</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderGithubTools = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>GitHub Tools</h2>
          <button
            onClick={() => window.location.href = '/creator/github-tools/create'}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Tool</span>
          </button>
        </div>
        
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border`}>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-center py-8`}>
            GitHub tools management system is ready. Click "Create Tool" to start sharing cybersecurity tools with the community.
          </p>
          <div className="text-center">
            <button
              onClick={() => window.location.href = '/creator/github-tools'}
              className={`${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-500 hover:text-emerald-600'} font-medium`}
            >
              View All Tools →
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'create':
        return renderCreatePost();
      case 'posts':
      case 'posts-all':
      case 'posts-published':
      case 'posts-drafts':
        return renderPosts();
      case 'github-tools':
      case 'github-tools-all':
      case 'github-tools-create':
        return renderGithubTools();
      case 'analytics':
        return renderAnalytics();
      default:
        return renderDashboard();
    }
  };

  return (
    <ProfessionalDashboardLayout
      userRole="creator"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      notifications={mockNotifications}
    >
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6"
      >
        {renderContent()}
      </motion.div>
    </ProfessionalDashboardLayout>
  );
};

export default EnhancedCreatorDashboard;