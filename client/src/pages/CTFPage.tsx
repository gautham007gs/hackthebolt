import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Clock, Users, Star, Shield, Trophy, Flag, AlertTriangle, Eye, Play, Award, Terminal, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const CTFPage = () => {
  const { isDark } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Web Security', 'Cryptography', 'Reverse Engineering', 'Forensics', 'Network Security', 'Pwn', 'OSINT'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const ctfChallenges = [
    {
      id: 'ctf1',
      title: 'Corporate Breach Investigation',
      description: 'A Fortune 500 company has been breached. Investigate the attack chain, identify the threat actor, and determine the scope of the breach using advanced forensics and threat hunting techniques.',
      difficulty: 'Expert',
      category: 'Forensics',
      duration: '4-6 hours',
      participants: '3.2K',
      rating: 4.9,
      points: 800,
      completionRate: 23,
      flag: 'HTS{advanced_persistent_threat_detected}',
      hints: 3,
      tools: ['SIEM Tools', 'Volatility', 'Wireshark', 'YARA Rules', 'Timeline Analysis'],
      scenario: 'real-world',
      teamBased: true,
      premium: true,
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      solvers: 127,
      firstBlood: 'CyberNinja42',
      released: '2025-06-15'
    },
    {
      id: 'ctf2',
      title: 'Zero-Day Buffer Overflow',
      description: 'Discover and exploit a buffer overflow vulnerability in a custom binary. Develop a working ROP chain to bypass modern security mitigations including ASLR and DEP.',
      difficulty: 'Expert',
      category: 'Pwn',
      duration: '6-8 hours',
      participants: '1.8K',
      rating: 4.8,
      points: 1000,
      completionRate: 12,
      flag: 'HTS{rop_chain_mastery_achieved}',
      hints: 2,
      tools: ['GDB', 'Ghidra', 'ROPgadget', 'Python', 'Assembly'],
      scenario: 'research-level',
      teamBased: false,
      premium: true,
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      solvers: 89,
      firstBlood: 'StackSmasher',
      released: '2025-06-10'
    },
    {
      id: 'ctf3',
      title: 'Advanced Cryptographic Protocol',
      description: 'Break a custom implementation of an elliptic curve cryptographic protocol with subtle mathematical flaws. Requires deep understanding of number theory.',
      difficulty: 'Expert',
      category: 'Cryptography',
      duration: '5-7 hours',
      participants: '2.1K',
      rating: 4.7,
      points: 900,
      completionRate: 18,
      flag: 'HTS{elliptic_curve_broken}',
      hints: 4,
      tools: ['SageMath', 'Python', 'OpenSSL', 'Mathematical Analysis'],
      scenario: 'theoretical',
      teamBased: false,
      premium: true,
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      solvers: 156,
      firstBlood: 'MathWizard',
      released: '2025-06-08'
    },
    {
      id: 'ctf4',
      title: 'SQL Injection Chain',
      description: 'Navigate through multiple layers of SQL injection vulnerabilities to extract sensitive data from a complex database schema with advanced WAF bypasses.',
      difficulty: 'Advanced',
      category: 'Web Security',
      duration: '3-4 hours',
      participants: '5.7K',
      rating: 4.6,
      points: 600,
      completionRate: 34,
      flag: 'HTS{database_secrets_extracted}',
      hints: 5,
      tools: ['SQLMap', 'Burp Suite', 'Python Scripts', 'Database Tools'],
      scenario: 'enterprise',
      teamBased: false,
      premium: false,
      image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      solvers: 423,
      firstBlood: 'WebHacker',
      released: '2025-06-12'
    },
    {
      id: 'ctf5',
      title: 'Steganography Mystery',
      description: 'Uncover hidden messages embedded across multiple media files using advanced steganographic techniques and custom encoding schemes.',
      difficulty: 'Intermediate',
      category: 'Forensics',
      duration: '2-3 hours',
      participants: '8.3K',
      rating: 4.5,
      points: 400,
      completionRate: 42,
      flag: 'HTS{hidden_in_plain_sight}',
      hints: 6,
      tools: ['Steghide', 'Binwalk', 'Hex Editors', 'Image Analysis'],
      scenario: 'investigation',
      teamBased: false,
      premium: false,
      image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      solvers: 672,
      firstBlood: 'StegoMaster',
      released: '2025-06-14'
    },
    {
      id: 'ctf6',
      title: 'Network Intrusion Analysis',
      description: 'Analyze network traffic captures to identify attack vectors, lateral movement patterns, and data exfiltration in a simulated APT campaign.',
      difficulty: 'Advanced',
      category: 'Network Security',
      duration: '4-5 hours',
      participants: '4.1K',
      rating: 4.8,
      points: 750,
      completionRate: 28,
      flag: 'HTS{apt_campaign_decoded}',
      hints: 3,
      tools: ['Wireshark', 'NetworkMiner', 'Suricata', 'Python'],
      scenario: 'real-world',
      teamBased: true,
      premium: true,
      image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      solvers: 234,
      firstBlood: 'NetDetective',
      released: '2025-06-11'
    }
  ];

  const filteredChallenges = ctfChallenges.filter(ctf => {
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

  const renderCTFCard = (ctf: any) => (
    <motion.div
      key={ctf.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer`}
    >
      <div className="relative">
        <img 
          src={ctf.image} 
          alt={ctf.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* CTF Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {ctf.teamBased && (
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
              <Users className="h-3 w-3 mr-1" />
              Team
            </span>
          )}
          {ctf.premium && (
            <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              Premium
            </span>
          )}
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
            <Target className="h-3 w-3 mr-1" />
            CTF
          </span>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(ctf.difficulty)}`}>
            {ctf.difficulty}
          </span>
        </div>

        {/* Bottom Stats */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-center text-white mb-2">
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
          <div className="text-xs text-gray-300">
            First Blood: <span className="text-yellow-400 font-medium">{ctf.firstBlood}</span> • 
            <span className="ml-1">{ctf.solvers} solvers</span>
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

        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-3`}>
          {ctf.description}
        </p>

        {/* Success Rate */}
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

        {/* Challenge Info */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Category</span>
            <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{ctf.category}</p>
          </div>
          <div>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Hints Available</span>
            <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{ctf.hints}</p>
          </div>
        </div>

        {/* Tools */}
        <div className="mb-4">
          <h4 className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Required Tools</h4>
          <div className="flex flex-wrap gap-1">
            {ctf.tools?.slice(0, 3).map((tool: string, index: number) => (
              <span 
                key={index}
                className={`px-2 py-1 text-xs rounded-md ${
                  isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {tool}
              </span>
            ))}
            {ctf.tools?.length > 3 && (
              <span className={`px-2 py-1 text-xs rounded-md ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                +{ctf.tools.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            ctf.premium && !user?.role?.includes('premium')
              ? isDark
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 active:scale-95'
          }`}>
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className={`w-16 h-16 rounded-2xl ${isDark ? 'bg-red-500/20' : 'bg-red-100'} flex items-center justify-center`}>
                <Target className={`h-8 w-8 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
              </div>
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Capture The Flag Challenges
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Test your cybersecurity skills with realistic CTF challenges designed by industry experts. From beginner-friendly puzzles to advanced exploitation scenarios.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className={`text-center p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                {filteredChallenges.length}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Active Challenges
              </div>
            </div>
            <div className={`text-center p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {user?.level || 1}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Your Level
              </div>
            </div>
            <div className={`text-center p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                {user?.points || 0}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Points
              </div>
            </div>
            <div className={`text-center p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                {user?.achievements?.length || 0}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Solved CTFs
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <input
                  type="text"
                  placeholder="Search CTF challenges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full py-3 px-4 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full py-3 px-4 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:border-transparent ${
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

              {/* Difficulty Filter */}
              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className={`w-full py-3 px-4 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:border-transparent ${
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
            </div>
          </motion.div>
        </div>

        {/* CTF Challenges Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredChallenges.map(renderCTFCard)}
        </motion.div>

        {/* No Results */}
        {filteredChallenges.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className={`text-6xl mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              🎯
            </div>
            <h3 className={`text-xl font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              No CTF challenges found
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

export default CTFPage;