import React, { useState } from 'react';
import { Github, Star, GitFork, Download, ExternalLink, Search, Filter, Code, Shield, Zap, Terminal, Eye, Users } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const GitHubTools = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Reconnaissance', 'Exploitation', 'Post-Exploitation', 'Forensics', 'Web Security', 'Network Security'];

  const tools = [
    {
      name: "Nmap",
      description: "Network discovery and security auditing tool. Nmap uses raw IP packets to determine what hosts are available on the network, what services they offer, what operating systems they run, and more.",
      category: "Reconnaissance",
      stars: "9.2k",
      forks: "2.1k",
      language: "C++",
      lastUpdate: "2 days ago",
      githubUrl: "https://github.com/nmap/nmap",
      features: ["Port Scanning", "OS Detection", "Service Detection", "Script Engine"],
      difficulty: "Intermediate",
      image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      name: "Metasploit Framework",
      description: "Advanced open-source platform for developing, testing, and executing exploit code. Provides information about security vulnerabilities and aids in penetration testing.",
      category: "Exploitation",
      stars: "33.8k",
      forks: "13.9k",
      language: "Ruby",
      lastUpdate: "1 day ago",
      githubUrl: "https://github.com/rapid7/metasploit-framework",
      features: ["Exploit Development", "Payload Generation", "Post-Exploitation", "Vulnerability Assessment"],
      difficulty: "Advanced",
      image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      name: "Burp Suite Community",
      description: "Integrated platform for performing security testing of web applications. Combines manual and automated techniques to enumerate, analyze, attack and exploit web apps.",
      category: "Web Security",
      stars: "1.2k",
      forks: "456",
      language: "Java",
      lastUpdate: "5 days ago",
      githubUrl: "https://github.com/PortSwigger/burp-extensions-montoya-api",
      features: ["Web App Scanning", "Proxy Interception", "Vulnerability Detection", "Manual Testing"],
      difficulty: "Intermediate",
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      name: "Wireshark",
      description: "World's foremost and widely-used network protocol analyzer. Lets you see what's happening on your network at a microscopic level and is the de facto standard.",
      category: "Network Security",
      stars: "7.1k",
      forks: "1.8k",
      language: "C",
      lastUpdate: "3 days ago",
      githubUrl: "https://github.com/wireshark/wireshark",
      features: ["Packet Analysis", "Protocol Decoding", "Network Troubleshooting", "Live Capture"],
      difficulty: "Intermediate",
      image: "https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      name: "OWASP ZAP",
      description: "One of the world's most popular free security tools actively maintained by volunteers. Helps find security vulnerabilities in web applications automatically.",
      category: "Web Security",
      stars: "12.5k",
      forks: "2.2k",
      language: "Java",
      lastUpdate: "1 day ago",
      githubUrl: "https://github.com/zaproxy/zaproxy",
      features: ["Automated Scanning", "Manual Testing", "API Security", "CI/CD Integration"],
      difficulty: "Beginner",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      name: "Volatility",
      description: "Advanced memory forensics framework. Provides a cross-platform, modular, and extensible platform to comprehensively analyze memory dumps.",
      category: "Forensics",
      stars: "7.0k",
      forks: "1.4k",
      language: "Python",
      lastUpdate: "1 week ago",
      githubUrl: "https://github.com/volatilityfoundation/volatility3",
      features: ["Memory Analysis", "Malware Detection", "Incident Response", "Digital Forensics"],
      difficulty: "Advanced",
      image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      name: "Nikto",
      description: "Open source web server scanner which performs comprehensive tests against web servers for multiple items including dangerous files/programs and outdated versions.",
      category: "Web Security",
      stars: "8.1k",
      forks: "1.2k",
      language: "Perl",
      lastUpdate: "2 weeks ago",
      githubUrl: "https://github.com/sullo/nikto",
      features: ["Web Server Scanning", "Vulnerability Detection", "SSL Testing", "CGI Scanning"],
      difficulty: "Beginner",
      image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      name: "Aircrack-ng",
      description: "Complete suite of tools to assess WiFi network security. Focuses on different areas of WiFi security: monitoring, attacking, testing, and cracking.",
      category: "Network Security",
      stars: "5.2k",
      forks: "1.1k",
      language: "C",
      lastUpdate: "4 days ago",
      githubUrl: "https://github.com/aircrack-ng/aircrack-ng",
      features: ["WiFi Monitoring", "WEP/WPA Cracking", "Packet Injection", "Network Analysis"],
      difficulty: "Intermediate",
      image: "https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300';
      case 'Intermediate': return isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Advanced': return isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300';
      default: return isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <section id="tools" className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 left-1/4 w-96 h-96 ${isDark ? 'bg-emerald-500/5' : 'bg-emerald-500/10'} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 ${isDark ? 'bg-teal-500/5' : 'bg-teal-500/10'} rounded-full blur-3xl`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center space-x-3 ${isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-100 border-emerald-300'} border rounded-full px-6 py-3 mb-6`}>
            <Github className={`h-5 w-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span className={`${isDark ? 'text-emerald-400' : 'text-emerald-700'} font-semibold`}>Open Source Security Tools</span>
          </div>
          <h2 className={`text-4xl lg:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
            GitHub <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Security Tools</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-8`}>
            Discover and master the most powerful open-source cybersecurity tools. Each tool includes detailed guides, 
            installation instructions, and real-world usage examples.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200`}
              />
            </div>
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
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool, index) => (
            <div
              key={index}
              className={`group ${isDark ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/80 hover:border-emerald-500/30' : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-emerald-300'} border rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${isDark ? 'hover:shadow-emerald-500/10' : 'hover:shadow-emerald-500/20'}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(tool.difficulty)}`}>
                    {tool.difficulty}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-gray-800/80 text-gray-300 border-gray-600' : 'bg-white/80 text-gray-700 border-gray-300'} border backdrop-blur-sm`}>
                    {tool.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white group-hover:text-emerald-300' : 'text-gray-900 group-hover:text-emerald-600'} transition-colors duration-300`}>
                    {tool.name}
                  </h3>
                  <Github className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'} group-hover:text-emerald-500 transition-colors duration-300`} />
                </div>

                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-3 text-sm leading-relaxed`}>
                  {tool.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {tool.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded-lg text-xs ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}
                      >
                        {feature}
                      </span>
                    ))}
                    {tool.features.length > 3 && (
                      <span className={`px-2 py-1 rounded-lg text-xs ${isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                        +{tool.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-4 pb-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{tool.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="h-4 w-4" />
                      <span>{tool.forks}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${tool.language === 'Python' ? 'bg-blue-500' : tool.language === 'Java' ? 'bg-orange-500' : tool.language === 'C++' ? 'bg-purple-500' : tool.language === 'Ruby' ? 'bg-red-500' : tool.language === 'C' ? 'bg-gray-500' : 'bg-green-500'}`}></div>
                    <span className="text-xs">{tool.language}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                    Updated {tool.lastUpdate}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-emerald-600 text-gray-400 hover:text-white' : 'bg-gray-100 hover:bg-emerald-600 text-gray-600 hover:text-white'} transition-all duration-200 hover:scale-110`}>
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-emerald-600 text-gray-400 hover:text-white' : 'bg-gray-100 hover:bg-emerald-600 text-gray-600 hover:text-white'} transition-all duration-200 hover:scale-110`}>
                      <Download className="h-4 w-4" />
                    </button>
                    <a
                      href={tool.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transition-all duration-200 hover:scale-110`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <Github className={`h-16 w-16 ${isDark ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
            <h3 className={`text-xl font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
              No tools found
            </h3>
            <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className={`mt-16 ${isDark ? 'bg-gradient-to-r from-gray-800/80 to-gray-700/80 border-emerald-500/20' : 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'} border rounded-2xl p-8 lg:p-12 text-center`}>
          <div className="max-w-3xl mx-auto">
            <Github className={`h-16 w-16 ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mx-auto mb-6`} />
            <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Contribute to Open Source Security
            </h3>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
              Help improve these tools, report bugs, or contribute new features. 
              Join the global community of security researchers and developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                <Github className="h-5 w-5" />
                <span>View on GitHub</span>
              </button>
              <button className={`${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-700'} border ${isDark ? 'border-gray-700' : 'border-gray-300'} px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2`}>
                <Users className="h-5 w-5" />
                <span>Join Community</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubTools;