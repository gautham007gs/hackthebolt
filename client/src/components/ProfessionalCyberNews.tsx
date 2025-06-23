import { useState, useEffect } from 'react';
import { Clock, TrendingUp, Eye, Share2, Bookmark, AlertTriangle, Shield, Zap, Target, Globe, Users, ChevronRight, Filter, Search, Star, ThumbsUp, MessageCircle, ExternalLink, Calendar, User, Tag } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

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
    title: 'Critical Zero-Day Exploited in Major Enterprise Software',
    excerpt: 'Security researchers discover actively exploited vulnerability affecting millions of enterprise systems worldwide.',
    content: 'A critical zero-day vulnerability has been discovered in widely-used enterprise software...',
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
    title: 'Nation-State APT Group Targets Healthcare Infrastructure',
    excerpt: 'Advanced persistent threat campaign discovered targeting critical healthcare systems across multiple countries.',
    content: 'Cybersecurity firms have identified a sophisticated nation-state campaign...',
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
    title: 'New AI-Powered Threat Detection Tool Unveiled',
    excerpt: 'Revolutionary machine learning algorithm promises 99.8% accuracy in detecting advanced malware variants.',
    content: 'Researchers at leading cybersecurity firm have developed breakthrough AI technology...',
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
    title: 'Global Ransomware Campaign Hits Fortune 500 Companies',
    excerpt: 'Coordinated attack affects major corporations worldwide, demanding millions in cryptocurrency.',
    content: 'A sophisticated ransomware operation has struck multiple Fortune 500 companies...',
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
  },
  {
    id: '5',
    title: 'EU Introduces Stricter Cybersecurity Regulations',
    excerpt: 'New legislation requires enhanced security measures for critical infrastructure and digital services.',
    content: 'The European Union has announced comprehensive cybersecurity regulations...',
    category: 'policy',
    severity: 'medium',
    author: 'Hans Mueller',
    publishedAt: '2024-01-20T15:10:00Z',
    readTime: 8,
    views: 5420,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    tags: ['eu', 'regulation', 'compliance'],
    trending: false,
    breaking: false,
    featured: false
  }
];

const categoryColors = {
  breach: 'bg-red-600 hover:bg-red-700 text-white',
  vulnerability: 'bg-orange-600 hover:bg-orange-700 text-white',
  threat: 'bg-purple-600 hover:bg-purple-700 text-white',
  policy: 'bg-blue-600 hover:bg-blue-700 text-white',
  research: 'bg-green-600 hover:bg-green-700 text-white',
  tools: 'bg-indigo-600 hover:bg-indigo-700 text-white'
};

const severityColors = {
  critical: 'text-red-700 bg-red-100 border-red-300 dark:text-red-300 dark:bg-red-900/30 dark:border-red-700',
  high: 'text-orange-700 bg-orange-100 border-orange-300 dark:text-orange-300 dark:bg-orange-900/30 dark:border-orange-700',
  medium: 'text-yellow-700 bg-yellow-100 border-yellow-300 dark:text-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700',
  low: 'text-green-700 bg-green-100 border-green-300 dark:text-green-300 dark:bg-green-900/30 dark:border-green-700'
};

export function ProfessionalCyberNews() {
  const { isDark } = useTheme();
  const [articles, setArticles] = useState<NewsArticle[]>(sampleNews);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>(sampleNews);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(new Set());
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  // Update time every minute for real-time feel
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter articles based on search and filters
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
    const now = currentTime.getTime();
    const articleTime = new Date(timestamp).getTime();
    const diffInMinutes = Math.floor((now - articleTime) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const breakingNews = filteredArticles.filter(article => article.breaking);
  const trendingArticles = filteredArticles.filter(article => article.trending);
  const regularArticles = filteredArticles.filter(article => !article.featured && !article.breaking);

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

  const toggleArticleExpansion = (articleId: string) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId);
  };

  return (
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Clean Header */}
      <div className={`${isDark ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-lg border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} sticky top-16 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className={`text-xs font-semibold uppercase tracking-wide ${isDark ? 'text-red-400' : 'text-red-600'}`}>Live</span>
              </div>
              <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Cybersecurity News
              </h1>
            </div>
            <div className={`flex items-center space-x-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <Clock className="h-4 w-4" />
              <span className="font-mono hidden sm:inline">{currentTime.toLocaleTimeString()}</span>
              <Badge variant="outline" className={`text-xs ${isDark ? 'border-green-500 text-green-400' : 'border-green-600 text-green-600'}`}>
                Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breaking News Banner */}
        {breakingNews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="h-5 w-5 animate-pulse flex-shrink-0" />
                <span className="font-bold text-lg sm:text-xl">Breaking News</span>
              </div>
              <div className="space-y-3">
                {breakingNews.slice(0, 1).map(article => (
                  <div key={article.id} className="cursor-pointer hover:bg-red-500/20 p-2 rounded-lg transition-colors">
                    <h3 className="font-semibold text-base sm:text-lg mb-1">{article.title}</h3>
                    <p className="text-red-100 text-sm">{formatTimeAgo(article.publishedAt)}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 border border-gray-200'} backdrop-blur-sm`}>
            {/* Mobile-first responsive layout */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                  <Input
                    placeholder="Search cybersecurity news..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 h-10 sm:h-11 text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500'} transition-colors`}
                  />
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex space-x-2 sm:space-x-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className={`w-full sm:w-36 h-10 sm:h-11 text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'} transition-colors`}>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
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
                  <SelectTrigger className={`w-full sm:w-28 h-10 sm:h-11 text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'} transition-colors`}>
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-xs">
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {filteredArticles.length} articles found
                </span>
                {(searchTerm || selectedCategory !== 'all' || selectedSeverity !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSelectedSeverity('all');
                    }}
                    className={`text-xs hover:underline ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-8">
            {/* Featured Stories */}
            {featuredArticles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="mb-6">
                  <h2 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Featured Stories
                  </h2>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Critical updates and trending cybersecurity news
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredArticles.slice(0, 2).map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <Card className={`group cursor-pointer overflow-hidden ${
                        isDark ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
                      } hover:shadow-xl transition-all duration-300`}>
                        <div className="relative">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                            <Badge className={`${categoryColors[article.category]} text-xs`}>
                              {article.category.toUpperCase()}
                            </Badge>
                            <Badge className={`${severityColors[article.severity]} text-xs border`}>
                              {article.severity.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4 sm:p-6">
                          <h3 className={`font-bold text-lg sm:text-xl mb-3 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 transition-colors`}>
                            {article.title}
                          </h3>
                          <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className={`flex items-center space-x-3 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              <span className="font-medium">{article.author}</span>
                              <span>•</span>
                              <span>{formatTimeAgo(article.publishedAt)}</span>
                              <span>•</span>
                              <span>{article.readTime} min</span>
                            </div>
                            <div className={`flex items-center space-x-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              <Eye className="h-3 w-3" />
                              <span>{article.views.toLocaleString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Latest News */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Latest News
                  </h2>
                  <Badge variant="outline" className={`text-xs ${isDark ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-600'}`}>
                    {filteredArticles.length} articles
                  </Badge>
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Real-time cybersecurity updates and analysis
                </p>
              </div>
              <div className="space-y-4">
                {regularArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  >
                    <Card className={`group cursor-pointer ${
                      isDark ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
                    } hover:shadow-lg transition-all duration-300`}>
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="w-full sm:w-32 md:w-40 flex-shrink-0">
                            <img 
                              src={article.image} 
                              alt={article.title}
                              className="w-full h-24 sm:h-28 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center flex-wrap gap-2 mb-3">
                              <Badge className={`${categoryColors[article.category]} text-xs px-2 py-1`}>
                                {article.category}
                              </Badge>
                              <Badge className={`${severityColors[article.severity]} text-xs px-2 py-1 border`}>
                                {article.severity}
                              </Badge>
                              {article.trending && (
                                <Badge variant="outline" className={`text-xs ${isDark ? 'text-orange-400 border-orange-400' : 'text-orange-600 border-orange-600'}`}>
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                            </div>
                            <h3 className={`font-bold text-lg mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 transition-colors`}>
                              {article.title}
                            </h3>
                            <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              {article.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className={`flex items-center space-x-3 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                <span className="font-medium">{article.author}</span>
                                <span>•</span>
                                <span>{formatTimeAgo(article.publishedAt)}</span>
                                <span className="hidden sm:inline">•</span>
                                <span className="hidden sm:inline">{article.readTime} min</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className={`flex items-center space-x-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  <Eye className="h-3 w-3" />
                                  <span className="hidden sm:inline">{article.views.toLocaleString()}</span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className={`h-8 w-8 p-0 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleBookmark(article.id);
                                  }}
                                >
                                  <Bookmark className={`h-3 w-3 ${bookmarkedArticles.has(article.id) ? 'fill-current' : ''}`} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Trending Now */}
            {trendingArticles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className={`flex items-center space-x-2 text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <TrendingUp className="h-5 w-5 text-orange-500" />
                      <span>Trending Now</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {trendingArticles.slice(0, 5).map((article, index) => (
                        <div key={article.id} className={`flex items-start space-x-3 cursor-pointer p-3 rounded-lg transition-all duration-200 ${
                          isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                        }`}>
                          <span className="text-lg font-bold text-orange-500 flex-shrink-0 w-6">
                            {index + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h4 className={`font-semibold text-sm line-clamp-2 mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {article.title}
                            </h4>
                            <div className={`flex items-center space-x-3 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              <span>{formatTimeAgo(article.publishedAt)}</span>
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{article.views.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Threat Level Indicator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <CardHeader className="pb-3">
                  <CardTitle className={`flex items-center space-x-2 text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <Shield className="h-5 w-5 text-red-500" />
                    <span>Global Threat Level</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">HIGH</span>
                    </div>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Current threat level based on recent attacks and vulnerabilities
                    </p>
                    <div className={`${isDark ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'} border rounded-lg p-3`}>
                      <p className={`text-xs font-medium ${isDark ? 'text-red-300' : 'text-red-700'}`}>
                        ⚠️ Multiple critical vulnerabilities actively exploited
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <CardHeader className="pb-3">
                  <CardTitle className={`flex items-center space-x-2 text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <Zap className="h-5 w-5 text-blue-500" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className={`w-full justify-start ${
                    isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Report Incident
                  </Button>
                  <Button variant="outline" className={`w-full justify-start ${
                    isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}>
                    <Users className="h-4 w-4 mr-2" />
                    Join Discussion
                  </Button>
                  <Button variant="outline" className={`w-full justify-start ${
                    isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Alert
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <Shield className="h-8 w-8 mb-3 text-blue-200" />
                  <h3 className="font-bold text-lg mb-2">Security Alerts</h3>
                  <p className="text-sm mb-4 text-blue-100">
                    Get instant notifications about critical threats and vulnerabilities.
                  </p>
                  <div className="space-y-3">
                    <Input 
                      placeholder="Enter your email" 
                      className="bg-white/10 border-white/20 text-white placeholder-white/60 h-10"
                    />
                    <Button variant="secondary" className="w-full h-10 bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                      Subscribe Now
                    </Button>
                  </div>
                  <p className="text-xs mt-3 text-blue-200">
                    Join 50,000+ cybersecurity professionals
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}