import React, { useState } from 'react';
import { Calendar, User, Clock, Eye, MessageSquare, ArrowRight, Tag, TrendingUp, BookOpen, Shield, Code, Target, Brain, Lock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

const EnhancedBlog = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Threat Intelligence', 'Web Security', 'Network Security', 'Malware Analysis', 'Incident Response'];

  const blogPosts = [
    {
      id: '1',
      slug: '2024-cybersecurity-threat-landscape',
      title: "🔍 Advanced Persistent Threats: The Silent Digital Assassins",
      excerpt: "Discover how APTs operate in 2024, their sophisticated techniques, and proven defense strategies that actually work in enterprise environments.",
      content: "APTs represent the most sophisticated category of cyber attacks...",
      author: "Sarah Chen",
      authorRole: "Senior Threat Analyst",
      authorAvatar: "https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      date: "2024-12-15",
      category: "Threat Intelligence",
      tags: ["APT", "Cyber Warfare", "Defense Strategies"],
      readTime: "8 min read",
      views: 15420,
      comments: 67,
      trending: true,
      featured: true,
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      id: '2',
      slug: 'zero-day-vulnerability-cms',
      title: "⚠️ Zero-Day Alert: Critical CMS Vulnerability Affects 50M+ Sites",
      excerpt: "Breaking analysis of the newly discovered RCE vulnerability in popular CMS platforms. Immediate action required for web administrators.",
      content: "A critical zero-day vulnerability has been discovered...",
      author: "Marcus Johnson",
      authorRole: "Vulnerability Researcher",
      authorAvatar: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      date: "2024-12-12",
      category: "Web Security",
      tags: ["Zero-Day", "CMS", "RCE", "Patch"],
      readTime: "6 min read",
      views: 23150,
      comments: 89,
      trending: true,
      featured: false,
      image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      id: '3',
      slug: 'cybersecurity-career-guide-2024',
      title: "🚀 Building a Career in Cybersecurity: 2024 Complete Roadmap",
      excerpt: "From entry-level to CISO: A comprehensive guide covering certifications, skills, salary expectations, and insider tips from industry leaders.",
      content: "The cybersecurity field offers unprecedented opportunities...",
      author: "Dr. Elena Rodriguez",
      authorRole: "CISO & Career Mentor",
      authorAvatar: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      date: "2024-12-10",
      category: "Career",
      tags: ["Career", "Certifications", "Skills", "Salary"],
      readTime: "12 min read",
      views: 18730,
      comments: 156,
      trending: false,
      featured: true,
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      id: '4',
      slug: 'ai-powered-threat-hunting-2024',
      title: "🤖 AI-Powered Threat Hunting: The Future is Now",
      excerpt: "How machine learning algorithms are revolutionizing threat detection. Real-world case studies and implementation strategies for SOC teams.",
      content: "Artificial Intelligence is transforming cybersecurity...",
      author: "James Park",
      authorRole: "AI Security Researcher",
      authorAvatar: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      date: "2024-12-08",
      category: "Threat Intelligence",
      tags: ["AI", "Machine Learning", "SOC", "Automation"],
      readTime: "10 min read",
      views: 12890,
      comments: 43,
      trending: true,
      featured: false,
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      id: '5',
      slug: 'ransomware-incident-response-playbook',
      title: "🛡️ Ransomware Incident Response: When Every Second Counts",
      excerpt: "Step-by-step playbook for handling ransomware attacks. Proven strategies from recent high-profile incidents and recovery best practices.",
      content: "Ransomware continues to be a major threat...",
      author: "Alex Thompson",
      authorRole: "Incident Response Lead",
      authorAvatar: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      date: "2024-12-05",
      category: "Incident Response",
      tags: ["Ransomware", "Incident Response", "Recovery"],
      readTime: "9 min read",
      views: 16420,
      comments: 78,
      trending: false,
      featured: false,
      image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      id: '6',
      slug: 'cloud-security-architecture-guide',
      title: "☁️ Cloud Security Architecture: Building Fortress in the Sky",
      excerpt: "Comprehensive guide to securing cloud infrastructure. AWS, Azure, and GCP security best practices with real-world implementation examples.",
      content: "Cloud security requires a fundamentally different approach...",
      author: "Priya Sharma",
      authorRole: "Cloud Security Architect",
      authorAvatar: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      date: "2024-12-03",
      category: "Cloud Security",
      tags: ["Cloud", "AWS", "Azure", "GCP", "Architecture"],
      readTime: "11 min read",
      views: 14200,
      comments: 52,
      trending: false,
      featured: false,
      image: "https://images.pexels.com/photos/4218883/pexels-photo-4218883.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    }
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const trendingPosts = blogPosts.filter(post => post.trending).slice(0, 3);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Threat Intelligence': return <Brain className="h-4 w-4" />;
      case 'Web Security': return <Shield className="h-4 w-4" />;
      case 'Network Security': return <Target className="h-4 w-4" />;
      case 'Malware Analysis': return <Code className="h-4 w-4" />;
      case 'Incident Response': return <TrendingUp className="h-4 w-4" />;
      case 'Cloud Security': return <Lock className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Threat Intelligence': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-500/20';
      case 'Web Security': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-500/20';
      case 'Network Security': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-500/20';
      case 'Malware Analysis': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-500/20';
      case 'Incident Response': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-500/20';
      case 'Cloud Security': return 'text-cyan-600 bg-cyan-100 dark:text-cyan-400 dark:bg-cyan-500/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-500/20';
    }
  };

  return (
    <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className={`text-2xl lg:text-4xl font-bold leading-tight tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Latest Security Intelligence 📚
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed`}>
              Stay ahead of emerging threats with expert analysis and actionable insights.
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                selectedCategory === category
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-blue-100 shadow-sm'
              }`}
            >
              {getCategoryIcon(category)}
              <span>{category}</span>
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-4">
            {/* Featured Post */}
            {featuredPost && selectedCategory === 'All' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  <span className={`text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    Featured Article
                  </span>
                </div>
                <Link href={`/blog/${featuredPost.slug}`} className="block group">
                  <div className={`card-elevated overflow-hidden group-hover:shadow-2xl transition-all duration-500`}>
                    <div className="relative overflow-hidden">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getCategoryColor(featuredPost.category)}`}>
                          {getCategoryIcon(featuredPost.category)}
                          <span>{featuredPost.category}</span>
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className={`text-2xl lg:text-3xl font-bold mb-4 group-hover:text-emerald-500 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {featuredPost.title}
                      </h3>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed text-lg`}>
                        {featuredPost.excerpt}
                      </p>
                      
                      {/* Author & Meta */}
                      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div className="flex items-center space-x-3">
                          <img
                            src={featuredPost.authorAvatar}
                            alt={featuredPost.author}
                            className="w-10 h-10 rounded-full flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className={`font-semibold whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {featuredPost.author}
                            </p>
                            <p className={`text-sm whitespace-nowrap ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {featuredPost.authorRole}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 flex-shrink-0">
                          <div className="flex items-center space-x-1 whitespace-nowrap">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1 whitespace-nowrap">
                            <Clock className="h-4 w-4" />
                            <span>{featuredPost.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Compact Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.filter(post => !post.featured || selectedCategory !== 'All').map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-elevated overflow-hidden group"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 ${getCategoryColor(post.category)}`}>
                          {getCategoryIcon(post.category)}
                          <span>{post.category}</span>
                        </span>
                        {post.trending && (
                          <span className="px-2 py-1 bg-red-500 text-white rounded-lg text-xs font-medium">
                            🔥 Trending
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className={`text-lg font-bold mb-2 group-hover:text-emerald-500 transition-colors duration-300 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {post.title}
                      </h3>
                      
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-3 leading-relaxed line-clamp-2 text-sm`}>
                        {post.excerpt}
                      </p>

                      {/* Compact Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`px-2 py-1 rounded-md text-xs ${
                              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Author & Stats */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <img
                            src={post.authorAvatar}
                            alt={post.author}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {post.author}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{(post.views / 1000).toFixed(1)}K</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Compact Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Trending Posts */}
              {selectedCategory === 'All' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      🔥 Trending Now
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {trendingPosts.map((post, index) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="block group"
                      >
                        <div className="flex space-x-3">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="flex-1">
                            <h5 className={`font-medium text-sm group-hover:text-emerald-500 transition-colors line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {post.title}
                            </h5>
                            <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                              <Eye className="h-3 w-3" />
                              <span>{(post.views / 1000).toFixed(1)}K views</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`${isDark ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-emerald-500/30' : 'bg-gradient-to-br from-emerald-50 to-cyan-50 border-emerald-200'} rounded-xl p-6 border`}
              >
                <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  📧 Security Alerts
                </h4>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Get instant notifications about critical vulnerabilities and threat intelligence updates.
                </p>
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Subscribe Now
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/blog"
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>Read All Articles</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedBlog;