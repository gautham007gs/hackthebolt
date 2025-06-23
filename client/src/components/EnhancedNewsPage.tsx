import { useState, useEffect } from 'react';
import { Clock, TrendingUp, Eye, Share2, Bookmark, AlertTriangle, Shield, Search, Filter, User, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'breach' | 'vulnerability' | 'threat' | 'policy' | 'research' | 'tools';
  severity: 'critical' | 'high' | 'medium' | 'low';
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
  image: string;
  tags: string[];
  trending: boolean;
  breaking: boolean;
  featured: boolean;
}

const sampleNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Critical Zero-Day Vulnerability Found in Enterprise Systems',
    excerpt: 'Security researchers discover actively exploited vulnerability affecting millions of enterprise systems worldwide.',
    content: `A critical zero-day vulnerability has been discovered in widely-used enterprise software, affecting millions of systems globally. The vulnerability, tracked as CVE-2024-0001, allows remote code execution and has been actively exploited by threat actors.

## Impact and Scope

The vulnerability affects multiple versions of the enterprise software and has been present for over two years. Security researchers estimate that over 50 million systems worldwide are potentially vulnerable.

Key impacts include:
- Remote code execution capabilities
- Data exfiltration risks  
- Privilege escalation attacks
- Network lateral movement

## Mitigation Steps

Organizations should immediately:
1. Apply the emergency patch released today
2. Monitor network traffic for suspicious activity
3. Review access logs for potential compromise
4. Implement additional network segmentation

The vendor has released patches for all affected versions and recommends immediate deployment.`,
    category: 'vulnerability',
    severity: 'critical',
    author: 'Alex Chen',
    publishedAt: '2024-01-21T10:30:00Z',
    readTime: 4,
    views: 15420,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    tags: ['zero-day', 'enterprise', 'exploit'],
    trending: true,
    breaking: true,
    featured: true
  },
  {
    id: '2',
    title: 'Nation-State APT Targets Healthcare Infrastructure',
    excerpt: 'Advanced persistent threat campaign discovered targeting critical healthcare systems across multiple countries.',
    content: `Cybersecurity firms have identified a sophisticated nation-state campaign targeting healthcare infrastructure across North America and Europe. The campaign, attributed to APT-29, has been active for several months.

## Attack Methodology

The threat actors employ multiple attack vectors:
- Spear-phishing emails targeting medical staff
- Supply chain compromises of medical devices
- Exploitation of unpatched VPN servers
- Living-off-the-land techniques

## Affected Systems

Healthcare organizations report compromises in:
- Electronic Health Record (EHR) systems
- Medical imaging equipment
- Patient monitoring devices
- Administrative networks

Organizations are advised to implement enhanced monitoring and update all systems immediately.`,
    category: 'threat',
    severity: 'high',
    author: 'Sarah Martinez',
    publishedAt: '2024-01-21T08:15:00Z',
    readTime: 6,
    views: 12350,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
    tags: ['apt', 'healthcare', 'nation-state'],
    trending: true,
    breaking: false,
    featured: true
  },
  {
    id: '3',
    title: 'AI-Powered Threat Detection Tool Released',
    excerpt: 'Revolutionary machine learning algorithm promises 99.8% accuracy in detecting advanced malware variants.',
    content: `Researchers at leading cybersecurity firm have developed breakthrough AI technology that can detect previously unknown malware variants with unprecedented accuracy.

## Technology Overview

The new system uses:
- Deep neural networks for pattern recognition
- Behavioral analysis of suspicious processes
- Real-time threat intelligence integration
- Automated response capabilities

Early testing shows remarkable results against advanced persistent threats and zero-day exploits.`,
    category: 'tools',
    severity: 'medium',
    author: 'Dr. Michael Roberts',
    publishedAt: '2024-01-21T06:45:00Z',
    readTime: 5,
    views: 8760,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    tags: ['ai', 'detection', 'machine-learning'],
    trending: false,
    breaking: false,
    featured: false
  },
  {
    id: '4',
    title: 'Global Ransomware Campaign Hits Major Corporations',
    excerpt: 'Coordinated attack affects multiple Fortune 500 companies worldwide, demanding millions in cryptocurrency.',
    content: `A sophisticated ransomware operation has struck multiple Fortune 500 companies simultaneously, marking one of the largest coordinated cyberattacks in recent history.

## Attack Details

The ransomware, dubbed "CryptoStorm," features:
- Advanced evasion techniques
- Multi-stage deployment
- Data exfiltration capabilities
- Cryptocurrency payment demands

Companies across finance, manufacturing, and technology sectors have been affected, with operations severely disrupted.`,
    category: 'breach',
    severity: 'critical',
    author: 'Jessica Wong',
    publishedAt: '2024-01-20T22:20:00Z',
    readTime: 7,
    views: 23450,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    tags: ['ransomware', 'cryptocurrency', 'corporate'],
    trending: true,
    breaking: false,
    featured: true
  }
];

const categoryColors = {
  breach: 'bg-red-600 text-white',
  vulnerability: 'bg-orange-600 text-white',
  threat: 'bg-purple-600 text-white',
  policy: 'bg-blue-600 text-white',
  research: 'bg-green-600 text-white',
  tools: 'bg-indigo-600 text-white'
};

const severityColors = {
  critical: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
  high: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700',
  low: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700'
};

export function EnhancedNewsPage() {
  const { isDark } = useTheme();
  const [articles, setArticles] = useState<NewsArticle[]>(sampleNews);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>(sampleNews);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(new Set());

  // Filter articles
  useEffect(() => {
    let filtered = articles;

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(article => article.severity === selectedSeverity);
    }

    setFilteredArticles(filtered);
  }, [articles, searchTerm, selectedCategory, selectedSeverity]);

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date().getTime();
    const articleTime = new Date(timestamp).getTime();
    const diffInMinutes = Math.floor((now - articleTime) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const breakingNews = filteredArticles.filter(article => article.breaking);
  const regularArticles = filteredArticles.filter(article => !article.featured && !article.breaking);

  if (selectedArticle) {
    return (
      <div className={`min-h-screen pt-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            onClick={() => setSelectedArticle(null)}
            variant="ghost"
            className="mb-6 flex items-center space-x-2"
          >
            ← Back to News
          </Button>
          
          <article className={`${isDark ? 'bg-gray-800/95 border border-gray-700/50' : 'bg-white border border-gray-200'} rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto`}>
            <img 
              src={selectedArticle.image} 
              alt={selectedArticle.title}
              className="w-full h-48 sm:h-64 object-cover"
            />
            
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex items-center space-x-3 mb-4">
                <Badge className={`${categoryColors[selectedArticle.category]} font-semibold px-3 py-1`}>
                  {selectedArticle.category.toUpperCase()}
                </Badge>
                <Badge className={`${severityColors[selectedArticle.severity]} border font-semibold px-3 py-1`}>
                  {selectedArticle.severity.toUpperCase()}
                </Badge>
              </div>
              
              <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-4 leading-tight ${isDark ? 'text-gray-50' : 'text-gray-900'}`}>
                {selectedArticle.title}
              </h1>
              
              <div className={`flex flex-wrap items-center gap-4 text-sm mb-6 pb-4 border-b ${isDark ? 'text-gray-300 border-gray-700' : 'text-gray-600 border-gray-200'}`}>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{selectedArticle.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatTimeAgo(selectedArticle.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{selectedArticle.readTime} min read</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>{selectedArticle.views.toLocaleString()} views</span>
                </div>
              </div>
              
              <div className="prose prose-base max-w-none">
                {selectedArticle.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className={`text-lg sm:text-xl font-bold mt-8 mb-4 ${isDark ? 'text-blue-300' : 'text-blue-700'} border-l-4 ${isDark ? 'border-blue-400' : 'border-blue-600'} pl-4`}>
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <div key={index} className={`ml-6 mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'} relative`}>
                        <span className={`absolute -left-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                        {paragraph.replace('- ', '')}
                      </div>
                    );
                  }
                  if (paragraph.match(/^\d+\. /)) {
                    return (
                      <div key={index} className={`ml-6 mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'} relative`}>
                        <span className={`absolute -left-6 font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                          {paragraph.match(/^\d+/)?.[0]}.
                        </span>
                        {paragraph.replace(/^\d+\. /, '')}
                      </div>
                    );
                  }
                  if (paragraph.trim()) {
                    return (
                      <p key={index} className={`mb-4 leading-relaxed text-base ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        {paragraph}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
              
              <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} gap-4`}>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedArticle.tags.map(tag => (
                    <Badge key={tag} variant="outline" className={`text-xs px-2 py-1 ${isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-600'}`}>
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" className={`${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => toggleBookmark(selectedArticle.id)}
                  >
                    <Bookmark className={`h-4 w-4 mr-2 ${bookmarkedArticles.has(selectedArticle.id) ? 'fill-current' : ''}`} />
                    {bookmarkedArticles.has(selectedArticle.id) ? 'Saved' : 'Save'}
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-xl sticky top-16 z-10 transition-all duration-300`}>
        <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${isDark ? 'from-transparent via-gray-600/30 to-transparent' : 'from-transparent via-gray-300/30 to-transparent'}`}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
              <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Cybersecurity News
              </h1>
            </div>
            <Badge variant="outline" className={`text-xs ${isDark ? 'border-green-500 text-green-400' : 'border-green-600 text-green-600'}`}>
              Live Updates
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breaking News */}
        {breakingNews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 animate-pulse" />
                <span className="font-semibold text-sm uppercase tracking-wide">Breaking</span>
              </div>
              <h3 className="font-bold text-lg mb-1">{breakingNews[0].title}</h3>
              <p className="text-red-100 text-sm">{formatTimeAgo(breakingNews[0].publishedAt)}</p>
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <Input
                  placeholder="Search cybersecurity news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className={`w-36 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="breach">Breaches</SelectItem>
                  <SelectItem value="vulnerability">Vulnerabilities</SelectItem>
                  <SelectItem value="threat">Threats</SelectItem>
                  <SelectItem value="policy">Policy</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className={`w-28 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Articles */}
            {featuredArticles.length > 0 && (
              <div>
                <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Featured Stories
                </h2>
                <div className="space-y-4">
                  {featuredArticles.slice(0, 2).map((article) => (
                    <Card 
                      key={article.id} 
                      className={`cursor-pointer group overflow-hidden ${isDark ? 'bg-gray-800/80 border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800' : 'bg-white/90 border-gray-200 hover:border-blue-300 hover:bg-white'} hover:shadow-xl transition-all duration-300`}
                      onClick={() => setSelectedArticle(article)}
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full sm:w-40 h-28 sm:h-32 object-cover"
                          />
                          <div className="p-3 sm:p-4 flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={`${categoryColors[article.category]} text-xs px-2 py-0.5 font-medium`}>
                                {article.category}
                              </Badge>
                              <Badge className={`${severityColors[article.severity]} text-xs px-2 py-0.5 border font-medium`}>
                                {article.severity}
                              </Badge>
                              {article.trending && (
                                <Badge variant="outline" className={`text-xs px-2 py-0.5 ${isDark ? 'border-orange-400 text-orange-300' : 'border-orange-500 text-orange-600'}`}>
                                  <TrendingUp className="h-2.5 w-2.5 mr-1" />
                                  Hot
                                </Badge>
                              )}
                            </div>
                            <h3 className={`font-bold text-base sm:text-lg mb-2 line-clamp-2 leading-tight ${isDark ? 'text-gray-100 group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>
                              {article.title}
                            </h3>
                            <p className={`text-sm mb-3 line-clamp-2 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              {article.excerpt}
                            </p>
                            <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{article.author}</span>
                                <span>•</span>
                                <span>{formatTimeAgo(article.publishedAt)}</span>
                                <span className="hidden sm:inline">•</span>
                                <span className="hidden sm:inline">{article.readTime} min</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{article.views.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Articles */}
            <div>
              <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                Latest News
              </h2>
              <div className="space-y-3">
                {regularArticles.map((article) => (
                  <Card 
                    key={article.id} 
                    className={`cursor-pointer group ${isDark ? 'bg-gray-800/60 border-gray-700/40 hover:border-blue-500/40 hover:bg-gray-800/80' : 'bg-white/80 border-gray-200 hover:border-blue-300 hover:bg-white'} hover:shadow-lg transition-all duration-300`}
                    onClick={() => setSelectedArticle(article)}
                  >
                    <CardContent className="p-3">
                      <div className="flex space-x-3">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1.5">
                            <Badge className={`${categoryColors[article.category]} text-xs px-1.5 py-0.5 font-medium`}>
                              {article.category}
                            </Badge>
                            <Badge className={`${severityColors[article.severity]} text-xs px-1.5 py-0.5 border font-medium`}>
                              {article.severity}
                            </Badge>
                          </div>
                          <h3 className={`font-semibold text-sm mb-1 line-clamp-2 leading-tight ${isDark ? 'text-gray-100 group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>
                            {article.title}
                          </h3>
                          <p className={`text-xs mb-2 line-clamp-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {article.excerpt}
                          </p>
                          <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <div className="flex items-center space-x-1.5">
                              <span className="font-medium">{article.author}</span>
                              <span>•</span>
                              <span>{formatTimeAgo(article.publishedAt)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{article.views.toLocaleString()}</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className={`h-5 w-5 p-0 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleBookmark(article.id);
                                }}
                              >
                                <Bookmark className={`h-2.5 w-2.5 ${bookmarkedArticles.has(article.id) ? 'fill-current' : ''} ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Trending Topics */}
            <Card className={`${isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/90 border-gray-200'}`}>
              <CardContent className="p-4">
                <h3 className={`font-semibold text-sm mb-3 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                  Trending Topics
                </h3>
                <div className="space-y-2">
                  {['Zero-day exploits', 'Ransomware attacks', 'APT campaigns', 'Cloud security'].map((topic, index) => (
                    <div key={topic} className={`flex items-center justify-between text-xs p-2 rounded ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} cursor-pointer transition-colors`}>
                      <span className={`${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{topic}</span>
                      <Badge variant="outline" className={`text-xs px-1.5 py-0.5 ${isDark ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'}`}>
                        {12 - index * 3}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Threat Level */}
            <Card className={`${isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/90 border-gray-200'}`}>
              <CardContent className="p-4">
                <h3 className={`font-semibold text-sm mb-3 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                  Global Threat Level
                </h3>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xs">HIGH</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Multiple critical vulnerabilities actively exploited
                  </p>
                  <div className={`mt-3 p-2 rounded text-xs ${isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-700'}`}>
                    <span className="font-medium">Latest:</span> CVE-2024-0001
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white overflow-hidden">
              <CardContent className="p-4 relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                <Shield className="h-5 w-5 mb-2 text-blue-200" />
                <h3 className="font-semibold text-sm mb-2">Security Alerts</h3>
                <p className="text-xs mb-3 text-blue-100 leading-relaxed">
                  Get instant notifications about critical threats and vulnerabilities.
                </p>
                <Input 
                  placeholder="Enter email address" 
                  className="bg-white/10 border-white/20 text-white placeholder-white/60 mb-2 text-xs h-8"
                />
                <Button variant="secondary" className="w-full text-blue-600 text-xs h-8 font-medium">
                  Subscribe Now
                </Button>
                <p className="text-xs mt-2 text-blue-200/80">
                  Join 50,000+ professionals
                </p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className={`${isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/90 border-gray-200'}`}>
              <CardContent className="p-4">
                <h3 className={`font-semibold text-sm mb-3 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                  Today's Stats
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>New Threats</span>
                    <span className={`text-xs font-semibold ${isDark ? 'text-red-400' : 'text-red-600'}`}>+7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Updates</span>
                    <span className={`text-xs font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Advisories</span>
                    <span className={`text-xs font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}