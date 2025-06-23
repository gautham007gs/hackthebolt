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
      {/* Enhanced Header with live indicator */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-16 z-10 backdrop-blur-lg bg-opacity-95`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-300 rounded-full animate-ping"></div>
                </div>
                <span className={`text-sm font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>LIVE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className={`h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <h1 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} tracking-tight`}>
                  CyberSec News
                </h1>
              </div>
            </div>
            <div className={`flex items-center space-x-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
              </div>
              <Badge variant="outline" className={`${isDark ? 'text-green-400 border-green-400' : 'text-green-600 border-green-600'}`}>
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breaking News Banner */}
        {breakingNews.length > 0 && (
          <div className="mb-6">
            <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3 mb-2">
                <AlertTriangle className="h-5 w-5 animate-pulse" />
                <span className="font-bold text-lg">BREAKING NEWS</span>
              </div>
              <div className="space-y-2">
                {breakingNews.map(article => (
                  <div key={article.id} className="cursor-pointer hover:underline">
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="text-red-100 text-sm">{formatTimeAgo(article.publishedAt)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search news, threats, vulnerabilities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="breach">Data Breaches</SelectItem>
                <SelectItem value="vulnerability">Vulnerabilities</SelectItem>
                <SelectItem value="threat">Threats</SelectItem>
                <SelectItem value="policy">Policy</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Featured Stories */}
            {featuredArticles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Star className={`h-6 w-6 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} tracking-tight`}>Featured Stories</h2>
                  <div className={`h-px flex-1 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredArticles.slice(0, 2).map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className={`overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
                        isDark ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="relative overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute top-4 left-4 flex gap-2">
                            <Badge className={`${categoryColors[article.category]} shadow-lg`}>
                              {article.category.toUpperCase()}
                            </Badge>
                            <Badge className={`${severityColors[article.severity]} shadow-lg border`}>
                              {article.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-white hover:bg-white/20 p-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(article.id);
                              }}
                            >
                              <Bookmark 
                                className={`h-4 w-4 ${bookmarkedArticles.has(article.id) ? 'fill-current' : ''}`} 
                              />
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className={`font-bold text-xl mb-3 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 transition-colors`}>
                            {article.title}
                          </h3>
                          <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className={`flex items-center space-x-4 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span className="font-medium">{article.author}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{formatTimeAgo(article.publishedAt)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{article.readTime} min read</span>
                              </div>
                            </div>
                            <div className={`flex items-center space-x-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
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

            {/* Regular Articles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Globe className={`h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} tracking-tight`}>Latest News</h2>
                  <div className={`h-px flex-1 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} ml-4`}></div>
                </div>
                <Badge variant="outline" className={`${isDark ? 'text-gray-300 border-gray-600' : 'text-gray-600 border-gray-300'}`}>
                  {filteredArticles.length} articles
                </Badge>
              </div>
              <div className="space-y-6">
                {regularArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card className={`hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                      isDark ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row gap-6">
                          <div className="relative sm:w-40 flex-shrink-0">
                            <img 
                              src={article.image} 
                              alt={article.title}
                              className="w-full sm:w-40 h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-white hover:bg-black/20 p-1.5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleBookmark(article.id);
                                }}
                              >
                                <Bookmark 
                                  className={`h-3 w-3 ${bookmarkedArticles.has(article.id) ? 'fill-current' : ''}`} 
                                />
                              </Button>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center flex-wrap gap-2 mb-3">
                              <Badge className={`${categoryColors[article.category]} text-xs font-medium px-2 py-1`}>
                                {article.category.toUpperCase()}
                              </Badge>
                              <Badge className={`${severityColors[article.severity]} text-xs font-medium px-2 py-1 border`}>
                                {article.severity.toUpperCase()}
                              </Badge>
                              {article.trending && (
                                <Badge variant="outline" className={`text-xs ${isDark ? 'text-green-400 border-green-400' : 'text-green-600 border-green-600'}`}>
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                            </div>
                            <h3 className={`font-bold text-xl mb-3 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 transition-colors leading-tight`}>
                              {article.title}
                            </h3>
                            <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              {article.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className={`flex items-center space-x-4 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                <div className="flex items-center space-x-1">
                                  <User className="h-3 w-3" />
                                  <span className="font-medium">{article.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{formatTimeAgo(article.publishedAt)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{article.readTime} min read</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className={`flex items-center space-x-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  <Eye className="h-3 w-3" />
                                  <span>{article.views.toLocaleString()}</span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className={`h-7 w-7 p-0 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                >
                                  <Share2 className="h-3 w-3" />
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
          <div className="space-y-6">
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
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Stay Ahead of Threats</h3>
                <p className="text-sm mb-4 opacity-90">
                  Get real-time security alerts and expert analysis delivered to your inbox.
                </p>
                <div className="space-y-2">
                  <Input 
                    placeholder="Enter your email" 
                    className="bg-white/10 border-white/20 text-white placeholder-white/70"
                  />
                  <Button variant="secondary" className="w-full">
                    Subscribe Now
                  </Button>
                </div>
                <p className="text-xs mt-2 opacity-70">
                  Join 50,000+ security professionals
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}