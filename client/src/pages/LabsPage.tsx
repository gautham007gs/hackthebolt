import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Clock, Users, Star, Search, Play, Shield, Lock, Terminal, Award, Eye, Brain } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const LabsPage = () => {
  const { isDark } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTab, setSelectedTab] = useState('labs');

  const categories = ['All', 'Web Security', 'Network Security', 'Cryptography', 'Forensics', 'Reverse Engineering', 'OSINT'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const labs = [
    {
      id: '1',
      title: 'SQL Injection Playground',
      description: 'Master SQL injection techniques in a comprehensive lab environment with real databases, multiple vulnerability types, and progressive challenges.',
      difficulty: 'Beginner',
      category: 'Web Security',
      duration: '45 min',
      participants: '25.3K',
      rating: 4.8,
      points: 100,
      completionRate: 87,
      image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tools: ['Burp Suite', 'SQLMap', 'Browser', 'Interactive Terminal'],
      objectives: ['Identify SQL injection entry points', 'Extract sensitive data from databases', 'Bypass authentication mechanisms'],
      featured: true,
      premium: false,
      hasTerminal: true
    },
    {
      id: '2',
      title: 'Network Penetration Testing Lab',
      description: 'Comprehensive network security assessment lab with multiple target machines, realistic network topology, and enterprise-grade security tools.',
      difficulty: 'Advanced',
      category: 'Network Security',
      duration: '2 hours',
      participants: '18.7K',
      rating: 4.9,
      points: 250,
      completionRate: 74,
      image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tools: ['Nmap', 'Metasploit', 'Wireshark', 'Nessus'],
      objectives: ['Perform network reconnaissance', 'Identify vulnerabilities', 'Execute exploitation attacks'],
      premium: true,
      hasTerminal: true
    },
    {
      id: '3',
      title: 'Advanced Cryptography Workshop',
      description: 'Deep dive into modern cryptographic systems with hands-on exercises in encryption, digital signatures, and cryptanalysis.',
      difficulty: 'Expert',
      category: 'Cryptography',
      duration: '3 hours',
      participants: '12.4K',
      rating: 4.9,
      points: 400,
      completionRate: 58,
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tools: ['Python', 'OpenSSL', 'SageMath', 'CyberChef'],
      objectives: ['Implement cryptographic algorithms', 'Break weak implementations', 'Analyze side-channel attacks'],
      premium: true,
      hasTerminal: true
    }
  ];

  const ctfChallenges = [
    {
      id: 'ctf1',
      title: 'Corporate Breach Investigation',
      description: 'A Fortune 500 company has been breached. Investigate the attack chain and identify the threat actor.',
      difficulty: 'Expert',
      category: 'Incident Response',
      duration: '4-6 hours',
      participants: '3.2K',
      rating: 4.9,
      points: 800,
      completionRate: 23,
      teamBased: true,
      premium: true,
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: 'ctf2',
      title: 'Zero-Day Exploit Development',
      description: 'Discover and exploit a previously unknown vulnerability in a custom application.',
      difficulty: 'Expert',
      category: 'Exploit Development',
      duration: '6-8 hours',
      participants: '1.8K',
      rating: 4.8,
      points: 1000,
      completionRate: 12,
      teamBased: false,
      premium: true,
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    }
  ];

  const learningPaths = [
    {
      id: 'path1',
      title: 'Penetration Testing Mastery',
      description: 'Complete certification-ready penetration testing curriculum from beginner to expert level.',
      duration: '3-6 months',
      courses: 12,
      labs: 25,
      ctfs: 8,
      certification: 'HTS Certified Penetration Tester',
      difficulty: 'Progressive',
      completionRate: 78,
      enrolled: '45.2K',
      image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    }
  ];

  const filteredLabs = labs.filter(lab => {
    const matchesSearch = lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lab.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || lab.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'All' || lab.category === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const filteredCtfChallenges = ctfChallenges.filter(ctf => {
    const matchesSearch = ctf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ctf.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || ctf.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'All' || ctf.category === selectedCategory;
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

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'labs': return Terminal;
      case 'ctf': return Target;
      case 'paths': return Brain;
      default: return Terminal;
    }
  };

  const renderTabButton = (tabKey: string, label: string, count: number) => {
    const Icon = getTabIcon(tabKey);
    const isActive = selectedTab === tabKey;
    
    return (
      <button
        key={tabKey}
        onClick={() => setSelectedTab(tabKey)}
        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
          isActive
            ? isDark 
              ? 'bg-emerald-600 text-white shadow-lg' 
              : 'bg-emerald-500 text-white shadow-lg'
            : isDark
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-gray-200'
        }`}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
          isActive
            ? 'bg-white/20 text-white'
            : isDark
              ? 'bg-gray-700 text-gray-300'
              : 'bg-gray-100 text-gray-600'
        }`}>
          {count}
        </span>
      </button>
    );
  };

  const renderLabCard = (lab: any) => (
    <motion.div
      key={lab.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
    >
      <div className="relative">
        <img 
          src={lab.image} 
          alt={lab.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {lab.featured && (
            <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
              Featured
            </span>
          )}
          {lab.premium && (
            <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              Premium
            </span>
          )}
          {lab.hasTerminal && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
              <Terminal className="h-3 w-3 mr-1" />
              Interactive
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(lab.difficulty)}`}>
            {lab.difficulty}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
          <div className="flex items-center space-x-4 text-sm">
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
            <span className="text-sm font-medium">{lab.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-emerald-500 transition-colors`}>
            {lab.title}
          </h3>
          <div className="flex items-center space-x-1 text-emerald-500">
            <Award className="h-4 w-4" />
            <span className="text-sm font-medium">{lab.points} pts</span>
          </div>
        </div>

        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-2`}>
          {lab.description}
        </p>

        {lab.completionRate && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completion Rate</span>
              <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{lab.completionRate}%</span>
            </div>
            <div className={`w-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300"
                style={{ width: `${lab.completionRate}%` }}
              />
            </div>
          </div>
        )}

        <div className="mb-4">
          <h4 className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Tools & Technologies</h4>
          <div className="flex flex-wrap gap-1">
            {lab.tools?.slice(0, 4).map((tool: string, index: number) => (
              <span 
                key={index}
                className={`px-2 py-1 text-xs rounded-md ${
                  isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {tool}
              </span>
            ))}
            {lab.tools?.length > 4 && (
              <span className={`px-2 py-1 text-xs rounded-md ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                +{lab.tools.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all duration-200">
            <Play className="h-4 w-4" />
            <span>Start Lab</span>
          </button>
          <button className={`p-3 rounded-lg transition-all duration-200 ${
            isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}>
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderCtfCard = (ctf: any) => (
    <motion.div
      key={ctf.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
    >
      <div className="relative">
        <img 
          src={ctf.image} 
          alt={ctf.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {ctf.teamBased && (
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
              <Users className="h-3 w-3 mr-1" />
              Team
            </span>
          )}
          {ctf.premium && (
            <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              Premium
            </span>
          )}
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
            <Target className="h-3 w-3 mr-1" />
            CTF
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(ctf.difficulty)}`}>
            {ctf.difficulty}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{ctf.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{ctf.participants}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{ctf.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-red-500 transition-colors`}>
            {ctf.title}
          </h3>
          <div className="flex items-center space-x-1 text-red-500">
            <Award className="h-4 w-4" />
            <span className="text-sm font-medium">{ctf.points} pts</span>
          </div>
        </div>

        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-2`}>
          {ctf.description}
        </p>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Success Rate</span>
            <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{ctf.completionRate}%</span>
          </div>
          <div className={`w-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300"
              style={{ width: `${ctf.completionRate}%` }}
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 hover:scale-105 active:scale-95 transition-all duration-200">
            <Target className="h-4 w-4" />
            <span>Start Challenge</span>
          </button>
          <button className={`p-3 rounded-lg transition-all duration-200 ${
            isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}>
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderLearningPathCard = (path: any) => (
    <motion.div
      key={path.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
    >
      <div className="relative">
        <img 
          src={path.image} 
          alt={path.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-4 left-4">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
            <Brain className="h-3 w-3 mr-1" />
            Learning Path
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(path.difficulty)}`}>
            {path.difficulty}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{path.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{path.enrolled}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-blue-500 transition-colors mb-3`}>
          {path.title}
        </h3>

        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-2`}>
          {path.description}
        </p>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completion Rate</span>
            <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{path.completionRate}%</span>
          </div>
          <div className={`w-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${path.completionRate}%` }}
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2 text-center">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{path.courses}</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Courses</p>
          </div>
          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{path.labs}</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Labs</p>
          </div>
          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{path.ctfs}</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>CTFs</p>
          </div>
        </div>

        <div className={`mb-4 p-3 rounded-lg ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'} border`}>
          <div className="flex items-center space-x-2">
            <Award className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
              {path.certification}
            </span>
          </div>
        </div>

        <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200">
          <Brain className="h-4 w-4" />
          <span>Start Learning Path</span>
        </button>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Cybersecurity Learning Center
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Master cybersecurity through hands-on labs, competitive CTF challenges, and structured learning paths designed by industry experts.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {renderTabButton('labs', 'Interactive Labs', filteredLabs.length)}
            {renderTabButton('ctf', 'CTF Challenges', filteredCtfChallenges.length)}
            {renderTabButton('paths', 'Learning Paths', learningPaths.length)}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    placeholder="Search labs, CTFs, and learning paths..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>

              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className={`w-full py-3 px-4 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty === 'All' ? 'All Difficulties' : difficulty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full py-3 px-4 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'All' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`text-center p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  {selectedTab === 'labs' ? filteredLabs.length : selectedTab === 'ctf' ? filteredCtfChallenges.length : learningPaths.length}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Available {selectedTab === 'labs' ? 'Labs' : selectedTab === 'ctf' ? 'CTFs' : 'Paths'}
                </div>
              </div>
              <div className={`text-center p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {user?.level || 1}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Your Level
                </div>
              </div>
              <div className={`text-center p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  {user?.points || 0}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Points
                </div>
              </div>
              <div className={`text-center p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className={`text-2xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  {user?.achievements?.length || 0}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Achievements
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {selectedTab === 'labs' && (
            <motion.div
              key="labs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredLabs.map(renderLabCard)}
            </motion.div>
          )}

          {selectedTab === 'ctf' && (
            <motion.div
              key="ctf"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredCtfChallenges.map(renderCtfCard)}
            </motion.div>
          )}

          {selectedTab === 'paths' && (
            <motion.div
              key="paths"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {learningPaths.map(renderLearningPathCard)}
            </motion.div>
          )}
        </AnimatePresence>

        {((selectedTab === 'labs' && filteredLabs.length === 0) ||
          (selectedTab === 'ctf' && filteredCtfChallenges.length === 0) ||
          (selectedTab === 'paths' && learningPaths.length === 0)) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className={`text-6xl mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              🔍
            </div>
            <h3 className={`text-xl font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              No {selectedTab === 'labs' ? 'labs' : selectedTab === 'ctf' ? 'CTF challenges' : 'learning paths'} found
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your search criteria or filters
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LabsPage;