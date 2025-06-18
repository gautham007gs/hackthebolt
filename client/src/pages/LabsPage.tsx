import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Users, Star, Filter, Search, Play, ArrowRight, Shield, Zap, Lock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const LabsPage = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Security', 'Network Security', 'Cryptography', 'Forensics', 'Reverse Engineering', 'OSINT'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const labs = [
    {
      id: '1',
      title: 'SQL Injection Playground',
      description: 'Practice SQL injection techniques in a safe environment with multiple vulnerability types and difficulty levels.',
      difficulty: 'Beginner',
      category: 'Web Security',
      duration: '45 min',
      participants: '25.3K',
      rating: 4.8,
      points: 100,
      image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tools: ['Burp Suite', 'SQLMap', 'Browser'],
      objectives: ['Find SQL injection vulnerabilities', 'Extract database information', 'Bypass authentication'],
      featured: true,
      premium: false
    },
    {
      id: '2',
      title: 'Network Penetration Testing Lab',
      description: 'Comprehensive network security assessment lab with multiple target machines and realistic network topology.',
      difficulty: 'Advanced',
      category: 'Network Security',
      duration: '2 hours',
      participants: '18.7K',
      rating: 4.9,
      points: 250,
      image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tools: ['Nmap', 'Metasploit', 'Wireshark', 'Nessus'],
      objectives: ['Perform network reconnaissance', 'Identify vulnerabilities', 'Exploit target systems'],
      premium: true
    },
    {
      id: '3',
      title: 'Cross-Site Scripting (XSS) Challenge',
      description: 'Master XSS attacks with progressive challenges covering reflected, stored, and DOM-based XSS vulnerabilities.',
      difficulty: 'Intermediate',
      category: 'Web Security',
      duration: '1 hour',
      participants: '22.1K',
      rating: 4.7,
      points: 150,
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tools: ['Browser', 'Burp Suite', 'XSS Hunter'],
      objectives: ['Identify XSS vulnerabilities', 'Craft malicious payloads', 'Bypass XSS filters'],
      premium: false
    },
    {
      id: '4',
      title: 'Cryptography Breaking Lab',
      description: 'Analyze and break various cryptographic implementations including weak ciphers and poor key management.',
      difficulty: 'Expert',
      category: 'Cryptography',
      duration: '3 hours',
      participants: '8.9K',
      rating: 4.9,
      points: 400,
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tools: ['Python', 'OpenSSL', 'John the Ripper', 'Hashcat'],
      objectives: ['Analyze cryptographic algorithms', 'Identify implementation flaws', 'Recover encrypted data'],
      premium: true
    },
    {
      id: '5',
      title: 'Digital Forensics Investigation',
      description: 'Investigate a simulated cyber incident with disk images, network captures, and memory dumps.',
      difficulty: 'Advanced',
      category: 'Forensics',
      duration: '2.5 hours',
      participants: '12.4K',
      rating: 4.8,
      points: 300,
      image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tools: ['Autopsy', 'Volatility', 'Wireshark', 'Sleuth Kit'],
      objectives: ['Analyze digital evidence', 'Reconstruct attack timeline', 'Identify threat actors'],
      premium: true
    },
    {
      id: '6',
      title: 'OSINT Investigation Challenge',
      description: 'Use open source intelligence techniques to gather information about targets and solve investigation puzzles.',
      difficulty: 'Intermediate',
      category: 'OSINT',
      duration: '1.5 hours',
      participants: '16.8K',
      rating: 4.6,
      points: 200,
      image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tools: ['Google Dorking', 'Shodan', 'Maltego', 'Social Media'],
      objectives: ['Gather intelligence from public sources', 'Correlate information', 'Build target profiles'],
      premium: false
    }
  ];

  const filteredLabs = labs.filter(lab => {
    const matchesSearch = lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lab.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || lab.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'All' || lab.category === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300';
      case 'Intermediate': return isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Advanced': return isDark ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Expert': return isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300';
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
            <div className={`inline-flex items-center space-x-3 ${isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-100 border-emerald-300'} border rounded-full px-6 py-3 mb-6`}>
              <Target className={`h-5 w-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <span className={`${isDark ? 'text-emerald-400' : 'text-emerald-700'} font-semibold`}>Hands-on Security Labs</span>
            </div>
            
            <h1 className={`text-5xl lg:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
              Practice <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Real-World</span> Scenarios
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-8`}>
              Sharpen your cybersecurity skills with interactive labs designed to simulate real-world attack scenarios and defense strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-emerald-500/25 flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Start Lab Now</span>
              </button>
              <button className={`border-2 ${isDark ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : 'border-emerald-600/30 text-emerald-600 hover:bg-emerald-50'} px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2`}>
                <Shield className="h-5 w-5" />
                <span>Browse All Labs</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Active Labs', value: '50+', icon: Target },
              { label: 'Students Trained', value: '100K+', icon: Users },
              { label: 'Success Rate', value: '94%', icon: Star },
              { label: 'Avg Completion', value: '85%', icon: Zap }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${isDark ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20' : 'bg-gradient-to-br from-emerald-100 to-teal-100'} rounded-full mb-4`}>
                    <Icon className={`h-8 w-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{stat.value}</div>
                  <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className={`py-12 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            {/* Search */}
            <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search labs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200`}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-center lg:justify-start">
              <div className="flex items-center space-x-2">
                <Filter className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Filter by:</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`flex-1 sm:w-48 px-4 py-3 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700 text-white focus:border-emerald-500' : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200`}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className={`flex-1 sm:w-40 px-4 py-3 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700 text-white focus:border-emerald-500' : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200`}
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Labs Grid */}
      <section className={`py-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLabs.map((lab, index) => (
              <motion.div
                key={lab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group ${isDark ? 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-900/80 hover:border-emerald-500/30' : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-emerald-300'} border rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${isDark ? 'hover:shadow-emerald-500/10' : 'hover:shadow-emerald-500/20'}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={lab.image}
                    alt={lab.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    {lab.featured && (
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        FEATURED
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(lab.difficulty)}`}>
                      {lab.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    {lab.premium && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'} flex items-center space-x-1`}>
                        <Lock className="h-3 w-3" />
                        <span>Premium</span>
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                      {lab.points} pts
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3">
                    <span className={`text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-600'} font-medium`}>
                      {lab.category}
                    </span>
                  </div>
                  
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white group-hover:text-emerald-300' : 'text-gray-900 group-hover:text-emerald-600'} mb-3 transition-colors duration-300 line-clamp-2`}>
                    {lab.title}
                  </h3>
                  
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-3 text-sm leading-relaxed`}>
                    {lab.description}
                  </p>

                  {/* Tools */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {lab.tools.slice(0, 3).map((tool, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-1 rounded-lg text-xs ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                        >
                          {tool}
                        </span>
                      ))}
                      {lab.tools.length > 3 && (
                        <span className={`px-2 py-1 rounded-lg text-xs ${isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                          +{lab.tools.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-4`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{lab.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{lab.participants}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{lab.rating}</span>
                    </div>
                  </div>

                  <button className={`group/btn w-full ${isDark ? 'bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-gray-300 hover:text-white' : 'bg-gray-200 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-gray-700 hover:text-white'} px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2`}>
                    <Target className="h-4 w-4" />
                    <span>Start Lab</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredLabs.length === 0 && (
            <div className="text-center py-16">
              <Target className={`h-16 w-16 ${isDark ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
              <h3 className={`text-xl font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                No labs found
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

export default LabsPage;