import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Clock, 
  Calendar,
  ArrowRight,
  Flame,
  Star,
  Zap,
  Shield
} from 'lucide-react';
import { Link } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';

const ProfessionalTrendingSection = () => {
  const { isDark } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const trendingPosts = [
    {
      id: 1,
      title: "Advanced SQL Injection Techniques in 2024",
      excerpt: "Discover the latest SQL injection vectors and how to protect against them using modern defensive strategies.",
      author: "Sarah Chen",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b60d2d49?w=64&h=64&fit=crop&crop=face",
      authorRole: "Security Researcher",
      category: "Web Security",
      readTime: "8 min read",
      publishedAt: "2024-01-15",
      views: 15420,
      likes: 892,
      comments: 156,
      trending: true,
      trendingRank: 1,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
      tags: ["SQL Injection", "Web Security", "Pentesting"]
    },
    {
      id: 2,
      title: "Zero-Day Exploit Analysis: CVE-2024-1234",
      excerpt: "In-depth analysis of the latest zero-day vulnerability affecting millions of systems worldwide.",
      author: "Marcus Rodriguez",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      authorRole: "Threat Intelligence Lead",
      category: "Threat Intelligence",
      readTime: "12 min read",
      publishedAt: "2024-01-14",
      views: 23150,
      likes: 1245,
      comments: 203,
      trending: true,
      trendingRank: 2,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
      tags: ["Zero-Day", "CVE", "Vulnerability"]
    },
    {
      id: 3,
      title: "AI-Powered Malware Detection Breakthrough",
      excerpt: "Revolutionary machine learning approach achieves 99.7% accuracy in detecting previously unknown malware variants.",
      author: "Dr. Emily Watson",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      authorRole: "AI Security Specialist",
      category: "Malware Analysis",
      readTime: "10 min read",
      publishedAt: "2024-01-13",
      views: 18950,
      likes: 1156,
      comments: 184,
      trending: true,
      trendingRank: 3,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      tags: ["AI", "Machine Learning", "Malware"]
    }
  ];

  // Auto-rotate trending posts
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trendingPosts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [trendingPosts.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'} transition-all duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 mb-4">
            <div className="relative">
              <Flame className="h-6 w-6 text-orange-500" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </div>
            <span className={`text-sm font-semibold tracking-wider uppercase ${
              isDark ? 'text-orange-400' : 'text-orange-600'
            }`}>
              Trending Now
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className={`text-4xl lg:text-5xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            What's Hot in 
            <span className={`${isDark ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-slate-600 to-blue-600'} bg-clip-text text-transparent`}>
              {' '}Cybersecurity
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Stay ahead of the curve with the most discussed topics, breakthrough research, 
            and critical security insights from our community.
          </motion.p>
        </motion.div>

        {/* Main Trending Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Featured Trending Post */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`relative overflow-hidden rounded-2xl ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-100 shadow-blue-100/50'
                } border shadow-2xl group hover:shadow-3xl transition-all duration-500`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={trendingPosts[activeIndex].image}
                    alt={trendingPosts[activeIndex].title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Trending Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
                          <TrendingUp className="h-4 w-4" />
                          <span>#1 Trending</span>
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur opacity-30 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="absolute top-6 right-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isDark ? 'bg-gray-800/80 text-gray-200' : 'bg-white/80 text-gray-800'
                    } backdrop-blur-sm`}>
                      {trendingPosts[activeIndex].category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <Link href={`/blog/${trendingPosts[activeIndex].id}`}>
                    <h3 className={`text-2xl lg:text-3xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 transition-all duration-300 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {trendingPosts[activeIndex].title}
                    </h3>
                  </Link>
                  
                  <p className={`text-lg leading-relaxed mb-6 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {trendingPosts[activeIndex].excerpt}
                  </p>

                  {/* Author & Stats */}
                  <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                    <div className="flex items-center space-x-4">
                      <img
                        src={trendingPosts[activeIndex].authorAvatar}
                        alt={trendingPosts[activeIndex].author}
                        className="w-12 h-12 rounded-full border-2 border-orange-500/50 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className={`font-semibold whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {trendingPosts[activeIndex].author}
                        </p>
                        <p className={`text-sm whitespace-nowrap ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {trendingPosts[activeIndex].authorRole}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm flex-shrink-0">
                      <div className={`flex items-center space-x-1 whitespace-nowrap ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Eye className="h-4 w-4" />
                        <span>{(trendingPosts[activeIndex].views / 1000).toFixed(1)}K</span>
                      </div>
                      <div className={`flex items-center space-x-1 whitespace-nowrap ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Heart className="h-4 w-4" />
                        <span>{trendingPosts[activeIndex].likes}</span>
                      </div>
                      <div className={`flex items-center space-x-1 whitespace-nowrap ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <MessageCircle className="h-4 w-4" />
                        <span>{trendingPosts[activeIndex].comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {trendingPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 scale-125'
                      : isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Trending List & Security Alerts - Enhanced for Desktop */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Trending Now Box - Professional Desktop Design */}
            <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 border-blue-100 shadow-blue-50/50'} border shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
              {/* Header with enhanced styling */}
              <div className={`${isDark ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border-b border-gray-700' : 'bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100'} p-6 pb-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Flame className="h-6 w-6 text-orange-500" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    </div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      🔥 Trending Now
                    </h3>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-700'}`}>
                    Live
                  </div>
                </div>
              </div>

              {/* Enhanced content area */}
              <div className="p-6">
                <div className="space-y-5">
                  {trendingPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      whileHover={{ x: 8, scale: 1.02 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`p-5 rounded-xl transition-all duration-300 cursor-pointer group ${
                        index === activeIndex
                          ? isDark ? 'bg-gradient-to-r from-gray-700 to-gray-700/80 border-orange-500/50 shadow-lg' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-md'
                          : isDark ? 'hover:bg-gray-700/50 border-gray-600/50' : 'hover:bg-blue-50/30 border-blue-100/50'
                      } border backdrop-blur-sm`}
                      onClick={() => setActiveIndex(index)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${
                          index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                          index === 1 ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white' :
                          'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-bold text-base mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {post.title}
                          </h4>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm">
                              <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                {post.author}
                              </span>
                              <div className={`flex items-center space-x-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                <Eye className="h-4 w-4" />
                                <span>{(post.views / 1000).toFixed(1)}K</span>
                              </div>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                              {post.category}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Link href="/blog">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 px-6 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
                  >
                    <span>View All Trending</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Security Alerts Box - Professional Desktop Design */}
            <div className={`${isDark ? 'bg-gradient-to-br from-red-900/20 via-gray-800 to-orange-900/20 border-red-700/50' : 'bg-gradient-to-br from-red-50 via-white to-orange-50 border-red-200'} border shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
              {/* Header */}
              <div className={`${isDark ? 'bg-gradient-to-r from-red-500/10 to-orange-500/10 border-b border-red-700/50' : 'bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100'} p-6 pb-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Shield className="h-6 w-6 text-red-500" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                    </div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      🚨 Security Alerts
                    </h3>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'}`}>
                    Critical
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ x: 6 }}
                    className={`p-4 rounded-xl border transition-all duration-300 ${isDark ? 'bg-red-900/20 border-red-700/50 hover:bg-red-900/30' : 'bg-red-50 border-red-200 hover:bg-red-100'}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-2 animate-pulse"></div>
                      <div>
                        <h4 className={`font-bold text-sm mb-1 ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                          Critical CVE-2024-0001
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Remote code execution in Apache framework
                        </p>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          2 hours ago
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 6 }}
                    className={`p-4 rounded-xl border transition-all duration-300 ${isDark ? 'bg-orange-900/20 border-orange-700/50 hover:bg-orange-900/30' : 'bg-orange-50 border-orange-200 hover:bg-orange-100'}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 animate-pulse"></div>
                      <div>
                        <h4 className={`font-bold text-sm mb-1 ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
                          Ransomware Campaign
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          New variant targeting healthcare systems
                        </p>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          4 hours ago
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 6 }}
                    className={`p-4 rounded-xl border transition-all duration-300 ${isDark ? 'bg-yellow-900/20 border-yellow-700/50 hover:bg-yellow-900/30' : 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 animate-pulse"></div>
                      <div>
                        <h4 className={`font-bold text-sm mb-1 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
                          Phishing Surge
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          AI-generated phishing emails detected
                        </p>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          6 hours ago
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 px-6 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
                >
                  <span>View All Alerts</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalTrendingSection;