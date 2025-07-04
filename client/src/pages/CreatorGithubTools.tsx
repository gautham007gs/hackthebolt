import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Plus, Search, Filter, Eye, Edit, Trash2, Github, 
  ExternalLink, Star, Calendar, Users, BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function CreatorGithubTools() {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for now - will be replaced with actual API
  const mockTools = [
    {
      id: 1,
      name: 'Nmap Network Scanner',
      slug: 'nmap-network-scanner',
      description: 'Network exploration tool and security scanner',
      category: 'network-analysis',
      status: 'published',
      views: 1250,
      stars: 45,
      createdAt: '2024-01-15',
      githubUrl: 'https://github.com/nmap/nmap',
      featured: true
    },
    {
      id: 2,
      name: 'Metasploit Framework',
      slug: 'metasploit-framework',
      description: 'Penetration testing framework',
      category: 'exploitation',
      status: 'draft',
      views: 0,
      stars: 0,
      createdAt: '2024-01-20',
      githubUrl: 'https://github.com/rapid7/metasploit-framework',
      featured: false
    }
  ];

  const filteredTools = mockTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || tool.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalTools: mockTools.length,
    publishedTools: mockTools.filter(t => t.status === 'published').length,
    draftTools: mockTools.filter(t => t.status === 'draft').length,
    totalViews: mockTools.reduce((sum, t) => sum + t.views, 0),
    totalStars: mockTools.reduce((sum, t) => sum + t.stars, 0)
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>GitHub Tools</h1>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage your cybersecurity tools and share them with the community
            </p>
          </div>
          <Button
            onClick={() => window.location.href = '/creator/github-tools/create'}
            className="self-start md:self-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Tool
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Tools</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.totalTools}</p>
              </div>
              <Github className={`h-8 w-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </CardContent>
        </Card>

        <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Published</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>{stats.publishedTools}</p>
              </div>
              <Eye className={`h-8 w-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </CardContent>
        </Card>

        <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Drafts</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>{stats.draftTools}</p>
              </div>
              <Edit className={`h-8 w-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </CardContent>
        </Card>

        <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Views</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.totalViews}</p>
              </div>
              <BarChart className={`h-8 w-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </CardContent>
        </Card>

        <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Stars</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.totalStars}</p>
              </div>
              <Star className={`h-8 w-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filterStatus === 'published' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('published')}
            size="sm"
          >
            Published
          </Button>
          <Button
            variant={filterStatus === 'draft' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('draft')}
            size="sm"
          >
            Drafts
          </Button>
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`h-full hover:shadow-lg transition-shadow ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className={`text-lg line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{tool.name}</CardTitle>
                      <CardDescription className={`mt-1 line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {tool.description}
                      </CardDescription>
                    </div>
                    {tool.featured && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Status and Category */}
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={tool.status === 'published' ? 'default' : 'secondary'}
                        className={tool.status === 'published' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {tool.status}
                      </Badge>
                      <Badge variant="outline">
                        {tool.category.replace('-', ' ')}
                      </Badge>
                    </div>

                    {/* Stats */}
                    <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {tool.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {tool.stars}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(tool.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        {tool.status === 'published' && (
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="p-1">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-1 text-red-500 hover:text-red-700">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <CardContent className="p-12 text-center">
            <Github className={`h-12 w-12 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>No tools found</h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {searchTerm || filterStatus !== 'all' 
                ? 'No tools match your current filters.' 
                : 'Start by creating your first GitHub tool.'}
            </p>
            {(!searchTerm && filterStatus === 'all') && (
              <Button onClick={() => window.location.href = '/creator/github-tools/create'}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Tool
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}