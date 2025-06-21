import { useState, useEffect } from 'react';
import { Clock, TrendingUp, Eye, Share2, Bookmark, AlertTriangle, Shield, Zap, Target, Globe, Users, ChevronRight, Filter, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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
  breach: 'bg-red-500',
  vulnerability: 'bg-orange-500',
  threat: 'bg-purple-500',
  policy: 'bg-blue-500',
  research: 'bg-green-500',
  tools: 'bg-indigo-500'
};

const severityColors = {
  critical: 'text-red-600 bg-red-50 border-red-200',
  high: 'text-orange-600 bg-orange-50 border-orange-200',
  medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  low: 'text-green-600 bg-green-50 border-green-200'
};

export function ProfessionalCyberNews() {
  const [articles, setArticles] = useState<NewsArticle[]>(sampleNews);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>(sampleNews);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with live indicator */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">LIVE</span>
              </div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                CyberSec News
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{currentTime.toLocaleTimeString()}</span>
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
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Featured Stories</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredArticles.slice(0, 2).map(article => (
                    <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="relative">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className={`${categoryColors[article.category]} text-white`}>
                            {article.category.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge className={severityColors[article.severity]}>
                            {article.severity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span>{article.author}</span>
                            <span>{formatTimeAgo(article.publishedAt)}</span>
                            <span>{article.readTime} min read</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye className="h-3 w-3" />
                            <span>{article.views.toLocaleString()}</span>
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
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Latest News</h2>
                </div>
                <span className="text-sm text-gray-500">
                  {filteredArticles.length} articles
                </span>
              </div>
              <div className="space-y-4">
                {regularArticles.map(article => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full sm:w-32 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={`${categoryColors[article.category]} text-white text-xs`}>
                                {article.category}
                              </Badge>
                              <Badge className={`${severityColors[article.severity]} text-xs`}>
                                {article.severity}
                              </Badge>
                              {article.trending && (
                                <Badge variant="outline" className="text-xs">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                            </div>
                          </div>
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-4">
                              <span>{article.author}</span>
                              <span>{formatTimeAgo(article.publishedAt)}</span>
                              <span>{article.readTime} min read</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{article.views.toLocaleString()}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Share2 className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Bookmark className="h-3 w-3" />
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
          <div className="space-y-6">
            {/* Trending Now */}
            {trendingArticles.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    <span>Trending Now</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trendingArticles.slice(0, 5).map((article, index) => (
                      <div key={article.id} className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
                        <span className="text-lg font-bold text-orange-500 flex-shrink-0">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-sm line-clamp-2 mb-1">{article.title}</h4>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{formatTimeAgo(article.publishedAt)}</span>
                            <Eye className="h-3 w-3" />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Threat Level Indicator */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Shield className="h-5 w-5 text-red-500" />
                  <span>Global Threat Level</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-red-500 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">HIGH</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Current threat level based on recent attacks and vulnerabilities
                  </p>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg p-3">
                    <p className="text-xs text-red-700 dark:text-red-300">
                      ⚠️ Multiple critical vulnerabilities actively exploited
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Report Incident
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Join Discussion
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Alert
                </Button>
              </CardContent>
            </Card>

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