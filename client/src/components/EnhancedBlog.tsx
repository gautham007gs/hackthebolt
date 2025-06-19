import React, { useState } from 'react';
import { Calendar, User, ArrowRight, TrendingUp, Shield, AlertTriangle, Clock, Eye, MessageSquare, Share2, Tag, Bookmark } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

const EnhancedBlog = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All', 'Threat Intelligence', 'Vulnerability Research', 'Career', 'Web Security', 'Network Security', 'Penetration Testing'
  ];

  const blogPosts = [
    {
      id: '1',
      slug: '2024-cybersecurity-threat-landscape',
      title: "Advanced Persistent Threats: The Silent Digital Assassins",
      excerpt: "APTs represent the most sophisticated category of cyber attacks, employing stealth, persistence, and advanced techniques to infiltrate high-value targets. Learn how to detect and defend against these evolving threats.",
      author: "Sarah Chen",
      authorRole: "Senior Threat Analyst",
      date: "Dec 15, 2024",
      category: "Threat Intelligence",
      tags: ["APT", "Cyber Warfare", "Defense Strategies"],
      readTime: "8 min read",
      views: "12.5K",
      comments: 45,
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      featured: true,
      difficulty: "Advanced"
    },
    {
      id: '2',
      slug: 'zero-day-vulnerability-cms',
      title: "Buffer Overflow Exploitation in Modern Applications",
      excerpt: "Understanding memory corruption vulnerabilities and how attackers leverage them to achieve code execution in contemporary software systems. Includes practical examples and mitigation strategies.",
      author: "Marcus Rodriguez",
      authorRole: "Vulnerability Researcher",
      date: "Dec 14, 2024",
      category: "Vulnerability Research",
      tags: ["Buffer Overflow", "Memory Corruption", "Exploitation"],
      readTime: "5 min read",
      views: "25.8K",
      comments: 78,
      image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      urgent: true,
      difficulty: "Expert"
    },
    {
      id: '3',
      slug: 'cybersecurity-career-guide-2024',
      title: "Building a Career in Cybersecurity: 2024 Complete Guide",
      excerpt: "Complete roadmap for aspiring cybersecurity professionals, including essential skills, certifications, and career paths. From entry-level to executive positions.",
      author: "Dr. Alex Thompson",
      authorRole: "CISO & Career Mentor",
      date: "Dec 12, 2024",
      category: "Career",
      tags: ["Career Development", "Certifications", "Skills"],
      readTime: "12 min read",
      views: "18.2K",
      comments: 92,
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      difficulty: "Beginner"
    },
    {
      id: '4',
      slug: 'web-application-security-testing',
      title: "Modern Web Application Security Testing Methodologies",
      excerpt: "Comprehensive guide to testing web applications for security vulnerabilities using both automated tools and manual techniques.",
      author: "Emma Wilson",
      authorRole: "Senior Penetration Tester",
      date: "Dec 10, 2024",
      category: "Web Security",
      tags: ["OWASP", "Web Testing", "Security Assessment"],
      readTime: "10 min read",
      views: "15.3K",
      comments: 67,
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      difficulty: "Intermediate"
    }
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-500/20';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-500/20';
      case 'Advanced': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-500/20';
      case 'Expert': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-500/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-500/20';
    }
  };

  return (
    <section id="blog" className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="seo-heading-h2">
              Latest Cybersecurity Insights
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed`}>
              Stay ahead of emerging threats with expert analysis, detailed tutorials, and industry insights from leading cybersecurity professionals.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : `${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'} border border-gray-200 dark:border-gray-700`
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Blog Grid */}
        <div className="grid gap-8 lg:gap-12">
          {/* Featured Post */}
          {filteredPosts.find(post => post.featured) && (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card-elevated overflow-hidden group"
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="relative overflow-hidden">
                  <img
                    src={filteredPosts.find(post => post.featured)?.image}
                    alt={filteredPosts.find(post => post.featured)?.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                  {filteredPosts.find(post => post.featured)?.urgent && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Urgent</span>
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {filteredPosts.find(post => post.featured)?.category}
                      </span>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        getDifficultyColor(filteredPosts.find(post => post.featured)?.difficulty || '')
                      }`}>
                        {filteredPosts.find(post => post.featured)?.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="seo-heading-h3 mb-4 group-hover:text-emerald-500 transition-colors duration-300">
                      {filteredPosts.find(post => post.featured)?.title}
                    </h3>
                    
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed`}>
                      {filteredPosts.find(post => post.featured)?.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {filteredPosts.find(post => post.featured)?.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-lg text-sm ${
                            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-emerald-500" />
                          <div>
                            <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {filteredPosts.find(post => post.featured)?.author}
                            </span>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {filteredPosts.find(post => post.featured)?.authorRole}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{filteredPosts.find(post => post.featured)?.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{filteredPosts.find(post => post.featured)?.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{filteredPosts.find(post => post.featured)?.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{filteredPosts.find(post => post.featured)?.comments}</span>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${filteredPosts.find(post => post.featured)?.slug}`}
                        className="btn-primary group"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-elevated overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(post.difficulty)}`}>
                      {post.difficulty}
                    </span>
                  </div>
                  {post.urgent && (
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Urgent</span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="seo-heading-h4 mb-3 group-hover:text-emerald-500 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 leading-relaxed line-clamp-3`}>
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-2 py-1 rounded-lg text-xs ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className={`px-2 py-1 rounded-lg text-xs ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        +{post.tags.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-emerald-500" />
                      <div>
                        <span className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {post.author}
                        </span>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {post.authorRole}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{post.comments}</span>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="btn-secondary text-sm px-4 py-2"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Enhanced CTA */}
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
            <span>Explore All Articles</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedBlog;