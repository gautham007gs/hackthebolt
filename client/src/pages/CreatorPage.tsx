import React, { useState } from 'react';
import { PenTool, FileText, Image, Settings, BarChart3, Users, Eye, MessageSquare, Calendar, Plus, Edit3, Save, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const CreatorPage = () => {
  const { isDark } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isWriting, setIsWriting] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'Web Security',
    tags: '',
    status: 'draft'
  });

  const [myPosts, setMyPosts] = useState([
    {
      id: 1,
      title: "Advanced SQL Injection Techniques",
      excerpt: "Exploring modern SQL injection vectors and prevention methods",
      status: "published",
      publishDate: "2024-12-10",
      views: 8430,
      comments: 34,
      likes: 156
    },
    {
      id: 2,
      title: "Zero Trust Architecture Implementation",
      excerpt: "Step-by-step guide to implementing Zero Trust in enterprise environments",
      status: "draft",
      publishDate: null,
      views: 0,
      comments: 0,
      likes: 0
    },
    {
      id: 3,
      title: "AI-Powered Threat Detection",
      excerpt: "Using machine learning for advanced threat hunting and detection",
      status: "published",
      publishDate: "2024-12-05",
      views: 12340,
      comments: 67,
      likes: 234
    }
  ]);

  const stats = {
    totalPosts: myPosts.length,
    publishedPosts: myPosts.filter(p => p.status === 'published').length,
    totalViews: myPosts.reduce((sum, post) => sum + post.views, 0),
    totalComments: myPosts.reduce((sum, post) => sum + post.comments, 0),
    totalLikes: myPosts.reduce((sum, post) => sum + post.likes, 0),
    followers: 1247
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'posts', name: 'My Posts', icon: FileText },
    { id: 'write', name: 'Write', icon: PenTool },
    { id: 'media', name: 'Media', icon: Image },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const categories = [
    'Web Security', 'Network Security', 'Malware Analysis', 'Incident Response', 
    'Threat Intelligence', 'Cloud Security', 'Mobile Security', 'IoT Security'
  ];

  const handleSavePost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: myPosts.length + 1,
        title: newPost.title,
        excerpt: newPost.excerpt || newPost.content.substring(0, 150) + '...',
        status: newPost.status,
        publishDate: newPost.status === 'published' ? new Date().toISOString().split('T')[0] : null,
        views: 0,
        comments: 0,
        likes: 0
      };
      setMyPosts([...myPosts, post]);
      setNewPost({ title: '', content: '', excerpt: '', category: 'Web Security', tags: '', status: 'draft' });
      setIsWriting(false);
      setActiveTab('posts');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-500/20';
      case 'draft': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-500/20';
      case 'pending': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-500/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-500/20';
    }
  };

  if (!isAuthenticated || (user?.role !== 'creator' && user?.role !== 'admin')) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pt-16 flex items-center justify-center`}>
        <div className="text-center">
          <PenTool className={`h-16 w-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Creator Access Required
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
            You need creator privileges to access this page.
          </p>
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pt-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Creator Studio
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Create and manage your cybersecurity content
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id !== 'write') setIsWriting(false);
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-white'
                    : isDark
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Posts</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {stats.totalPosts}
                    </p>
                  </div>
                  <FileText className="h-8 w-8 text-emerald-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Views</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {stats.totalViews.toLocaleString()}
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Likes</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {stats.totalLikes}
                    </p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-purple-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Comments</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {stats.totalComments}
                    </p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-orange-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Followers</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {stats.followers.toLocaleString()}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-cyan-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Published</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {stats.publishedPosts}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-500" />
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <button 
                  onClick={() => {
                    setActiveTab('write');
                    setIsWriting(true);
                  }}
                  className="p-4 rounded-xl border-2 border-dashed border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                >
                  <Plus className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">Write New Post</div>
                </button>
                <button 
                  onClick={() => setActiveTab('posts')}
                  className={`p-4 rounded-xl border-2 border-dashed ${isDark ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <Edit3 className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">Edit Drafts</div>
                </button>
                <button 
                  onClick={() => setActiveTab('media')}
                  className={`p-4 rounded-xl border-2 border-dashed ${isDark ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <Image className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">Upload Media</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                My Posts
              </h2>
              <button 
                onClick={() => {
                  setActiveTab('write');
                  setIsWriting(true);
                }}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Post</span>
              </button>
            </div>

            <div className="grid gap-6">
              {myPosts.map((post) => (
                <div
                  key={post.id}
                  className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {post.title}
                      </h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                        {post.excerpt}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </div>
                      {post.publishDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button className={`${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500'} transition-colors`}>
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'write' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {isWriting ? 'Write New Post' : 'Posts'}
              </h2>
              {!isWriting && (
                <button 
                  onClick={() => setIsWriting(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Post</span>
                </button>
              )}
            </div>

            {isWriting && (
              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Title
                    </label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      placeholder="Enter your post title..."
                      className={`w-full px-4 py-3 rounded-xl border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Category
                      </label>
                      <select
                        value={newPost.category}
                        onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-gray-50 border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={newPost.tags}
                        onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                        placeholder="cybersecurity, tutorials, security"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Excerpt
                    </label>
                    <textarea
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                      placeholder="Brief description of your post..."
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Content
                    </label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      placeholder="Write your post content here..."
                      rows={12}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none`}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="status"
                          value="draft"
                          checked={newPost.status === 'draft'}
                          onChange={(e) => setNewPost({...newPost, status: e.target.value})}
                          className="text-emerald-500"
                        />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Save as Draft</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="status"
                          value="published"
                          checked={newPost.status === 'published'}
                          onChange={(e) => setNewPost({...newPost, status: e.target.value})}
                          className="text-emerald-500"
                        />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Publish Now</span>
                      </label>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => setIsWriting(false)}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                      <button
                        onClick={handleSavePost}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>{newPost.status === 'published' ? 'Publish' : 'Save Draft'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'media' && (
          <div className="space-y-6">
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Media Library
            </h2>
            
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 border ${isDark ? 'border-gray-700' : 'border-gray-200'} text-center`}>
              <Image className={`h-16 w-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Upload Media Files
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                Upload images, videos, and documents for your posts
              </p>
              <button className="btn-primary">
                Choose Files
              </button>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Creator Settings
            </h2>
            
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Profile Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Display Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about yourself..."
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <button className="btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorPage;