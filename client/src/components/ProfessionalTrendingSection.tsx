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
  Zap
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
    <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-all duration-500`}>
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
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
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
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={trendingPosts[activeIndex].authorAvatar}
                        alt={trendingPosts[activeIndex].author}
                        className="w-12 h-12 rounded-full border-2 border-orange-500/50"
                      />
                      <div>
                        <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {trendingPosts[activeIndex].author}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {trendingPosts[activeIndex].authorRole}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm">
                      <div className={`flex items-center space-x-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Eye className="h-4 w-4" />
                        <span>{(trendingPosts[activeIndex].views / 1000).toFixed(1)}K</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Heart className="h-4 w-4" />
                        <span>{trendingPosts[activeIndex].likes}</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
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

          {/* Trending List */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border`}>
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="h-5 w-5 text-yellow-500" />
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Top Trending
                </h3>
              </div>

              <div className="space-y-4">
                {trendingPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                      index === activeIndex
                        ? isDark ? 'bg-gray-700 border-orange-500/50' : 'bg-white border-orange-300'
                        : isDark ? 'hover:bg-gray-700' : 'hover:bg-white'
                    } border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                        index === 1 ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white' :
                        'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold text-sm mb-1 line-clamp-2 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {post.title}
                        </h4>
                        
                        <div className="flex items-center space-x-3 text-xs">
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            {post.author}
                          </span>
                          <div className={`flex items-center space-x-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Eye className="h-3 w-3" />
                            <span>{(post.views / 1000).toFixed(1)}K</span>
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
                  className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>View All Trending</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalTrendingSection;