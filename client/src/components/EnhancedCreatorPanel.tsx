import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Edit3, 
  Eye, 
  Heart, 
  MessageCircle, 
  TrendingUp, 
  Calendar,
  Search,
  Filter,
  Plus,
  Save,
  Trash2,
  CheckCircle,
  Clock,
  BarChart3,
  Users,
  Star,
  Award,
  Target,
  Zap,
  BookOpen,
  Image,
  Tag,
  Send,
  DollarSign,
  Activity,
  Upload,
  Link,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Copy,
  Download,
  ExternalLink,
  RefreshCw,
  Bell,
  User,
  Globe,
  Settings,
  FileText
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import ProfessionalDashboardLayout from './ProfessionalDashboardLayout';

interface Content {
  id: string;
  title: string;
  type: 'tutorial' | 'blog' | 'course';
  status: 'published' | 'draft' | 'review';
  views: number;
  likes: number;
  comments: number;
  publishDate: string;
  lastEdited: string;
}

interface Analytics {
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
}

const EnhancedCreatorPanel: React.FC = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'engagement', label: 'Engagement', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const analytics: Analytics[] = [
    { name: 'Total Views', value: '25,678', change: '+12%', trend: 'up', icon: Eye },
    { name: 'Content Published', value: '34', change: '+3', trend: 'up', icon: FileText },
    { name: 'Avg. Engagement', value: '4.8%', change: '+0.3%', trend: 'up', icon: Heart },
    { name: 'Monthly Revenue', value: '$2,450', change: '+18%', trend: 'up', icon: DollarSign },
    { name: 'Followers', value: '1,234', change: '+45', trend: 'up', icon: Users },
    { name: 'Comments', value: '456', change: '+23', trend: 'up', icon: MessageCircle }
  ];

  const recentContent: Content[] = [
    {
      id: '1',
      title: 'Advanced SQL Injection Techniques',
      type: 'tutorial',
      status: 'published',
      views: 1234,
      likes: 89,
      comments: 23,
      publishDate: '2024-06-20',
      lastEdited: '2024-06-20'
    },
    {
      id: '2',
      title: 'Network Security Best Practices',
      type: 'blog',
      status: 'draft',
      views: 0,
      likes: 0,
      comments: 0,
      publishDate: '',
      lastEdited: '2024-06-21'
    },
    {
      id: '3',
      title: 'Cybersecurity Fundamentals Course',
      type: 'course',
      status: 'review',
      views: 567,
      likes: 34,
      comments: 12,
      publishDate: '2024-06-19',
      lastEdited: '2024-06-21'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analytics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                <metric.icon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
              }`}>
                <TrendingUp className={`w-4 h-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                <span>{metric.change}</span>
              </div>
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {metric.value}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {metric.name}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Content */}
      <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Recent Content
          </h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create New</span>
          </button>
        </div>
        <div className="space-y-4">
          {recentContent.slice(0, 3).map((content) => (
            <div key={content.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  content.type === 'tutorial' 
                    ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400'
                    : content.type === 'blog'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                    : 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
                }`}>
                  {content.type === 'tutorial' ? (
                    <BookOpen className="w-4 h-4" />
                  ) : content.type === 'blog' ? (
                    <Edit3 className="w-4 h-4" />
                  ) : (
                    <Award className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {content.title}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{content.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{content.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{content.comments}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  content.status === 'published' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400'
                    : content.status === 'draft'
                    ? 'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400'
                }`}>
                  {content.status}
                </span>
                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-lg border ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <button className={`px-4 py-2 rounded-lg border ${
            isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'
          } transition-colors`}>
            <Filter className="w-4 h-4" />
          </button>
        </div>
        
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Content</span>
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentContent.map((content) => (
          <div key={content.id} className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${
                content.type === 'tutorial' 
                  ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400'
                  : content.type === 'blog'
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                  : 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
              }`}>
                {content.type === 'tutorial' ? (
                  <BookOpen className="w-5 h-5" />
                ) : content.type === 'blog' ? (
                  <Edit3 className="w-5 h-5" />
                ) : (
                  <Award className="w-5 h-5" />
                )}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                content.status === 'published' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400'
                  : content.status === 'draft'
                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400'
              }`}>
                {content.status}
              </span>
            </div>
            
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {content.title}
            </h3>
            
            <div className="flex justify-between items-center text-sm mb-4">
              <div className="flex space-x-4">
                <span className={`flex items-center space-x-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Eye className="w-4 h-4" />
                  <span>{content.views}</span>
                </span>
                <span className={`flex items-center space-x-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Heart className="w-4 h-4" />
                  <span>{content.likes}</span>
                </span>
                <span className={`flex items-center space-x-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <MessageCircle className="w-4 h-4" />
                  <span>{content.comments}</span>
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Last edited: {content.lastEdited}
              </span>
              <div className="flex space-x-2">
                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                  <Eye className="w-4 h-4" />
                </button>
                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors text-red-500`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'content':
        return renderContent();
      case 'analytics':
        return (
          <div className="text-center py-12">
            <BarChart3 className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Advanced Analytics
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Detailed analytics and insights coming soon.
            </p>
          </div>
        );
      case 'engagement':
        return (
          <div className="text-center py-12">
            <Heart className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Engagement Tools
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Community engagement and interaction tools coming soon.
            </p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <Settings className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Creator Settings
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Profile and content management settings coming soon.
            </p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <ProfessionalDashboardLayout title="Creator Dashboard">
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </ProfessionalDashboardLayout>
  );
};

export default EnhancedCreatorPanel;