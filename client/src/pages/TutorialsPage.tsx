import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Star, Filter, Search, Play, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const TutorialsPage = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Security', 'Network Security', 'Malware Analysis', 'Digital Forensics', 'Social Engineering', 'Cryptography'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const tutorials = [
    {
      id: '1',
      title: 'Complete Web Application Security Testing',
      description: 'Master web application penetration testing with hands-on labs covering OWASP Top 10, SQL injection, XSS, and more advanced attack vectors.',
      level: 'Intermediate',
      category: 'Web Security',
      duration: '6 hours',
      students: '15.2K',
      rating: 4.9,
      lessons: 24,
      image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      instructor: 'Sarah Chen',
      price: 'Free',
      featured: true
    },
    {
      id: '2',
      title: 'Network Penetration Testing Fundamentals',
      description: 'Learn network security assessment techniques, vulnerability scanning, and exploitation methods used by professional penetration testers.',
      level: 'Advanced',
      category: 'Network Security',
      duration: '8 hours',
      students: '12.8K',
      rating: 4.8,
      lessons: 32,
      image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      instructor: 'Marcus Rodriguez',
      price: 'Premium'
    },
    {
      id: '3',
      title: 'Linux Security & System Hardening',
      description: 'Comprehensive guide to securing Linux systems, from basic hardening techniques to advanced monitoring and incident response.',
      level: 'Beginner',
      category: 'Network Security',
      duration: '5 hours',
      students: '18.5K',
      rating: 4.9,
      lessons: 20,
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      instructor: 'Alex Thompson',
      price: 'Free'
    },
    {
      id: '4',
      title: 'Malware Analysis & Reverse Engineering',
      description: 'Deep dive into malware analysis techniques, reverse engineering tools, and dynamic analysis in controlled environments.',
      level: 'Advanced',
      category: 'Malware Analysis',
      duration: '10 hours',
      students: '8.9K',
      rating: 4.7,
      lessons: 40,
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      instructor: 'Jennifer Liu',
      price: 'Premium'
    },
    {
      id: '5',
      title: 'Digital Forensics Investigation',
      description: 'Learn digital forensics methodologies, evidence collection, and analysis techniques used in cybercrime investigations.',
      level: 'Intermediate',
      category: 'Digital Forensics',
      duration: '7 hours',
      students: '11.3K',
      rating: 4.8,
      lessons: 28,
      image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      instructor: 'Michael Park',
      price: 'Premium'
    },
    {
      id: '6',
      title: 'Social Engineering & OSINT Techniques',
      description: 'Understand human psychology in security, open source intelligence gathering, and defense against social engineering attacks.',
      level: 'Intermediate',
      category: 'Social Engineering',
      duration: '4 hours',
      students: '13.7K',
      rating: 4.6,
      lessons: 16,
      image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      instructor: 'Rachel Kim',
      price: 'Free'
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || tutorial.level === selectedLevel;
    const matchesCategory = selectedCategory === 'All' || tutorial.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300';
      case 'Intermediate': return isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Advanced': return isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300';
      default: return isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'} pt-20`}
    >
      {/* Hero Section */}
      <section className={`py-20 ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'} relative overflow-hidden`}>
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-500/20'} rounded-full blur-3xl animate-pulse`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${isDark ? 'bg-teal-500/10' : 'bg-teal-500/20'} rounded-full blur-3xl animate-pulse delay-1000`}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-5xl lg:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
              Master <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Cybersecurity</span>
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-8`}>
              Comprehensive tutorials designed by industry experts to take you from beginner to advanced cybersecurity professional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-emerald-500/25 flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Start Learning Now</span>
              </button>
              <button className={`border-2 ${isDark ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : 'border-emerald-600/30 text-emerald-600 hover:bg-emerald-50'} px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2`}>
                <BookOpen className="h-5 w-5" />
                <span>Browse Catalog</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className={`py-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200`}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-4 py-3 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700 text-white focus:border-emerald-500' : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200`}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className={`px-4 py-3 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700 text-white focus:border-emerald-500' : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200`}
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className={`py-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group ${isDark ? 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-900/80 hover:border-emerald-500/30' : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-emerald-300'} border rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${isDark ? 'hover:shadow-emerald-500/10' : 'hover:shadow-emerald-500/20'}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={tutorial.image}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    {tutorial.featured && (
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        FEATURED
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(tutorial.level)}`}>
                      {tutorial.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tutorial.price === 'Free' ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700') : (isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700')}`}>
                      {tutorial.price}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3">
                    <span className={`text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-600'} font-medium`}>
                      {tutorial.category}
                    </span>
                  </div>
                  
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white group-hover:text-emerald-300' : 'text-gray-900 group-hover:text-emerald-600'} mb-3 transition-colors duration-300 line-clamp-2`}>
                    {tutorial.title}
                  </h3>
                  
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-3 text-sm leading-relaxed`}>
                    {tutorial.description}
                  </p>

                  <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-4`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{tutorial.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{tutorial.lessons} lessons</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{tutorial.rating}</span>
                    </div>
                  </div>

                  <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-6 pb-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{tutorial.students} students</span>
                    </div>
                    <span>by {tutorial.instructor}</span>
                  </div>

                  <Link
                    to={`/tutorials/${tutorial.id}`}
                    className={`group/btn w-full ${isDark ? 'bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-gray-300 hover:text-white' : 'bg-gray-200 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-gray-700 hover:text-white'} px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2`}
                  >
                    <Play className="h-4 w-4" />
                    <span>Start Tutorial</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTutorials.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className={`h-16 w-16 ${isDark ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
              <h3 className={`text-xl font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                No tutorials found
              </h3>
              <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default TutorialsPage;