import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PenTool, 
  FileText, 
  Settings, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageSquare,
  Plus,
  Save,
  Send,
  Image,
  Tag,
  Globe,
  Search
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import AdvancedSEO from '../components/AdvancedSEO';
import LoadingSpinner from '../components/LoadingSpinner';
import CodeTerminal from '../components/CodeTerminal';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: string;
  views: number;
  likes: number;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  featuredImage: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const CreatorPage = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [newPost, setNewPost] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Web Security',
    tags: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    featuredImage: ''
  });

  useEffect(() => {
    if (user && (user.role === 'creator' || user.role === 'admin')) {
      fetchUserPosts();
    }
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch('/api/posts/my-posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setNewPost(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      seoTitle: title.length > 60 ? title.substring(0, 57) + '...' : title
    }));
  };

  const handleSavePost = async (status = 'draft') => {
    setIsLoading(true);
    try {
      const postData = {
        ...newPost,
        status,
        tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        const savedPost = await response.json();
        setPosts(prev => [savedPost, ...prev]);
        if (status === 'pending') {
          alert('Post submitted for review!');
        } else {
          alert('Post saved as draft!');
        }
        setNewPost({
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          category: 'Web Security',
          tags: '',
          seoTitle: '',
          seoDescription: '',
          seoKeywords: '',
          featuredImage: ''
        });
      }
    } catch (error) {
      console.error('Failed to save post:', error);
    }
    setIsLoading(false);
  };

  // Temporarily allow all users to access creator panel
  // if (!user || (user.role !== 'creator' && user.role !== 'admin')) {
  //   return (
  //     <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center`}>
  //       <div className="text-center">
  //         <PenTool className={`h-16 w-16 ${isDark ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
  //         <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
  //           Creator Access Required
  //         </h2>
  //         <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
  //           Apply for creator status to write content
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  const creatorTabs = [
    { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
    { id: 'write', name: 'Write Post', icon: PenTool },
    { id: 'posts', name: 'My Posts', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const categories = [
    'Web Security', 'Network Security', 'Malware Analysis', 
    'Digital Forensics', 'Cryptography', 'Social Engineering',
    'GitHub Tools', 'DevSecOps', 'Compliance', 'Incident Response'
  ];

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <FileText className={`h-8 w-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {posts.length}
          </span>
        </div>
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>Total Posts</h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>All time</p>
      </div>

      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <Eye className={`h-8 w-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
          <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {posts.reduce((total, post) => total + (post.views || 0), 0)}
          </span>
        </div>
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>Total Views</h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>This month</p>
      </div>

      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <Heart className={`h-8 w-8 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
          <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {posts.reduce((total, post) => total + (post.likes || 0), 0)}
          </span>
        </div>
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>Total Likes</h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Engagement</p>
      </div>
    </div>
  );

  const renderWritePost = () => (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
        Create New Post
      </h3>
      
      <div className="space-y-6">
        {/* Title and Slug */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Title *
            </label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter compelling title..."
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              URL Slug
            </label>
            <input
              type="text"
              value={newPost.slug}
              onChange={(e) => setNewPost(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="auto-generated-from-title"
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
            />
          </div>
        </div>

        {/* Category and Tags */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Category *
            </label>
            <select
              value={newPost.category}
              onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
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
              onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="penetration testing, web security, tutorial"
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            Excerpt *
          </label>
          <textarea
            value={newPost.excerpt}
            onChange={(e) => setNewPost(prev => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Brief description that appears in search results and social media..."
            rows={3}
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
          />
        </div>

        {/* Content */}
        <div>
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            Content * (Markdown & Code Blocks supported)
          </label>
          <div className="space-y-4">
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Write your comprehensive cybersecurity content here using Markdown..."
              rows={12}
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono text-sm`}
            />
            
            {/* Code Terminal Preview */}
            <div className="mt-4">
              <h4 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Code Terminal Preview
              </h4>
              <CodeTerminal
                code={`# Example: SQL Injection Detection
$ sqlmap -u "http://target.com/page?id=1" --dbs
$ nmap -sV -sC target.com
$ hydra -l admin -P passwords.txt ssh://target.com

# Python Security Script
import requests
import hashlib

def check_vulnerability(url):
    payload = "' OR '1'='1"
    response = requests.get(f"{url}?id={payload}")
    return "error" in response.text.lower()`}
                language="bash"
                title="Cybersecurity Commands"
                showLineNumbers={true}
                className="mb-4"
              />
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Use this format in your content to create interactive code blocks for readers.
              </p>
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className={`border-t ${isDark ? 'border-gray-600' : 'border-gray-200'} pt-6`}>
          <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
            <Globe className="h-5 w-5 mr-2" />
            SEO Optimization
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                SEO Title (50-60 chars)
              </label>
              <input
                type="text"
                value={newPost.seoTitle}
                onChange={(e) => setNewPost(prev => ({ ...prev, seoTitle: e.target.value }))}
                placeholder="Optimized title for search engines..."
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
              />
              <p className={`text-xs mt-1 ${newPost.seoTitle.length > 60 ? 'text-red-500' : isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {newPost.seoTitle.length}/60 characters
              </p>
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Meta Description (150-160 chars)
              </label>
              <textarea
                value={newPost.seoDescription}
                onChange={(e) => setNewPost(prev => ({ ...prev, seoDescription: e.target.value }))}
                placeholder="Compelling description that appears in search results..."
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
              />
              <p className={`text-xs mt-1 ${newPost.seoDescription.length > 160 ? 'text-red-500' : isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {newPost.seoDescription.length}/160 characters
              </p>
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Focus Keywords
              </label>
              <input
                type="text"
                value={newPost.seoKeywords}
                onChange={(e) => setNewPost(prev => ({ ...prev, seoKeywords: e.target.value }))}
                placeholder="cybersecurity tutorial, penetration testing, ethical hacking"
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            onClick={() => handleSavePost('draft')}
            disabled={isLoading || !newPost.title || !newPost.content}
            className={`px-6 py-3 rounded-lg border ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors flex items-center space-x-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Save className="h-4 w-4" />
            <span>Save Draft</span>
          </button>
          
          <button
            onClick={() => handleSavePost('pending')}
            disabled={isLoading || !newPost.title || !newPost.content || !newPost.excerpt}
            className={`px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transition-colors flex items-center space-x-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? <LoadingSpinner size="sm" /> : <Send className="h-4 w-4" />}
            <span>Submit for Review</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <AdvancedSEO
        title="Creator Studio - HackTheShell"
        description="Write and manage cybersecurity content with advanced SEO optimization tools"
        keywords="content creation, cybersecurity writing, SEO optimization, creator platform"
        noIndex={true}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pt-20`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Creator Studio
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Share your cybersecurity expertise with the world
            </p>
          </div>

          {/* Tab Navigation */}
          <div className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} mb-8`}>
            <nav className="flex space-x-8">
              {creatorTabs.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === id
                      ? isDark 
                        ? 'border-emerald-500 text-emerald-400' 
                        : 'border-emerald-600 text-emerald-600'
                      : isDark
                        ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-96">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'write' && renderWritePost()}
            {activeTab === 'posts' && (
              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6`}>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                  My Posts
                </h3>
                {posts.length === 0 ? (
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    No posts yet. Start writing your first cybersecurity article!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div key={post.id} className={`border ${isDark ? 'border-gray-600' : 'border-gray-200'} rounded-lg p-4`}>
                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.title}</h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                          Status: {post.status} • Views: {post.views || 0} • Likes: {post.likes || 0}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'settings' && (
              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6`}>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                  Creator Settings
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={user?.name || ''}
                        className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Email Notifications
                      </label>
                      <select className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}>
                        <option>All notifications</option>
                        <option>Important only</option>
                        <option>None</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your expertise and background..."
                      className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none`}
                    />
                  </div>
                  <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200">
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CreatorPage;