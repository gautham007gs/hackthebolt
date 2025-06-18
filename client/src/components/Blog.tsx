import React, { useState } from 'react';
import { Calendar, User, ArrowRight, TrendingUp, Shield, AlertTriangle, Clock, Eye, MessageSquare, Share2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'wouter';

const Blog = () => {
  const { isDark } = useTheme();

  const blogPosts = [
    {
      id: '1',
      slug: '2024-cybersecurity-threat-landscape',
      title: "Advanced Persistent Threats: The Silent Digital Assassins",
      excerpt: "APTs represent the most sophisticated category of cyber attacks, employing stealth, persistence, and advanced techniques to infiltrate high-value targets.",
      author: "Sarah Chen",
      date: "Dec 15, 2024",
      category: "Threat Intelligence",
      readTime: "8 min read",
      views: "12.5K",
      comments: 45,
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: '2',
      slug: 'zero-day-vulnerability-cms',
      title: "Buffer Overflow Exploitation in Modern Applications",
      excerpt: "Understanding memory corruption vulnerabilities and how attackers leverage them to achieve code execution in contemporary software systems.",
      author: "Marcus Rodriguez",
      date: "Dec 14, 2024",
      category: "Vulnerability Research",
      readTime: "5 min read",
      views: "25.8K",
      comments: 78,
      image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      urgent: true
    },
    {
      id: '3',
      slug: 'cybersecurity-career-guide-2024',
      title: "Building a Career in Cybersecurity: 2024 Complete Guide",
      excerpt: "Complete roadmap for aspiring cybersecurity professionals, including essential skills, certifications, and career paths.",
      author: "Dr. Alex Thompson",
      date: "Dec 12, 2024",
      category: "Career",
      readTime: "12 min read",
      views: "18.2K",
      comments: 92,
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      id: '4',
      slug: 'ai-cybersecurity-friend-or-foe',
      title: "AI in Cybersecurity: Friend or Foe?",
      excerpt: "Examining how artificial intelligence is reshaping both cyber attacks and defense strategies in the modern threat landscape.",
      author: "Jennifer Liu",
      date: "Dec 10, 2024",
      category: "Technology",
      readTime: "10 min read",
      views: "15.7K",
      comments: 63,
      image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      id: '5',
      slug: 'ransomware-evolution-defense-strategies',
      title: "Ransomware Evolution: New Tactics and Defense Strategies",
      excerpt: "Analysis of the latest ransomware techniques and comprehensive strategies to protect your organization from attacks.",
      author: "Michael Park",
      date: "Dec 8, 2024",
      category: "Malware Analysis",
      readTime: "15 min read",
      views: "22.1K",
      comments: 87,
      image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      id: '6',
      slug: 'cloud-security-best-practices-2024',
      title: "Cloud Security Best Practices for 2024",
      excerpt: "Essential security measures for cloud infrastructure, covering AWS, Azure, and Google Cloud Platform security configurations.",
      author: "Rachel Kim",
      date: "Dec 5, 2024",
      category: "Cloud Security",
      readTime: "7 min read",
      views: "19.3K",
      comments: 56,
      image: "https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Threat Intelligence': isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300',
      'Breaking News': isDark ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-300',
      'Career': isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300',
      'Technology': isDark ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-300',
      'Malware Analysis': isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Cloud Security': isDark ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-cyan-100 text-cyan-700 border-cyan-300'
    };
    return colors[category as keyof typeof colors] || (isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-300');
  };

  return (
    <section id="blog" className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} relative overflow-hidden`}>
      {/* Subtle Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 left-1/4 w-72 h-72 ${isDark ? 'bg-emerald-500/3' : 'bg-emerald-500/5'} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-0 right-1/4 w-72 h-72 ${isDark ? 'bg-teal-500/3' : 'bg-teal-500/5'} rounded-full blur-3xl`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6`}>
            <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>Latest </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">Intelligence</span>
            <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}> & </span>
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Insights</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-8`}>
            Cutting-edge cybersecurity intelligence, threat analysis, and expert insights delivered by elite security professionals.
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts[0] && (
          <div className="mb-16">
            <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl p-8 lg:p-12`}>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      FEATURED
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(blogPosts[0].category)}`}>
                      {blogPosts[0].category}
                    </span>
                  </div>
                  <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                    {blogPosts[0].title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 text-lg`}>
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex items-center space-x-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{blogPosts[0].author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{blogPosts[0].date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{blogPosts[0].views}</span>
                      </div>
                    </div>
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{blogPosts[0].readTime}</span>
                  </div>
                  <Link 
                    to={`/blog/${blogPosts[0].slug}`}
                    className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 flex items-center space-x-2 w-fit"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
                <div className="relative">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-64 lg:h-80 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <Link
              key={index}
              to={`/blog/${post.slug}`}
              className={`group ${isDark ? 'bg-gray-900 border-gray-700 hover:bg-gray-800 hover:border-emerald-500/30' : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-emerald-300'} border rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${isDark ? 'hover:shadow-emerald-500/10' : 'hover:shadow-emerald-500/20'} block`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  {post.urgent && (
                    <span className="flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      <AlertTriangle className="h-3 w-3" />
                      <span>URGENT</span>
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white group-hover:text-emerald-300' : 'text-gray-900 group-hover:text-emerald-600'} transition-colors duration-300 line-clamp-2 mb-3`}>
                  {post.title}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-3`}>
                  {post.excerpt}
                </p>

                <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-4`}>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{post.date}</span>
                  <div className={`${isDark ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-emerald-600 group-hover:text-emerald-500'} transition-colors duration-200 flex items-center space-x-1`}>
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/blog"
            className={`${isDark ? 'bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-gray-300 hover:text-white' : 'bg-gray-200 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-gray-700 hover:text-white'} px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 mx-auto w-fit`}
          >
            <TrendingUp className="h-5 w-5" />
            <span>View All Articles</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;