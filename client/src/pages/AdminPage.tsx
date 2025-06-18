import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Users, 
  FileText, 
  BarChart3, 
  Shield, 
  Database, 
  Globe, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Trash2,
  Edit,
  Eye,
  Ban,
  UserCheck
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import AdvancedSEO from '../components/AdvancedSEO';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminPage = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [siteStatus, setSiteStatus] = useState({
    isMaintenanceMode: false,
    totalUsers: 0,
    activePosts: 0,
    pendingReviews: 0,
    systemHealth: 'healthy'
  });

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      window.location.href = '/';
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center`}>
        <div className="text-center">
          <Shield className={`h-16 w-16 ${isDark ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
            Access Denied
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Administrator privileges required
          </p>
        </div>
      </div>
    );
  }

  const adminTabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'content', name: 'Content', icon: FileText },
    { id: 'seo', name: 'SEO & Analytics', icon: Globe },
    { id: 'system', name: 'System', icon: Settings },
  ];

  const handleMaintenanceToggle = async () => {
    setIsLoading(true);
    try {
      // API call to toggle maintenance mode
      const response = await fetch('/api/admin/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !siteStatus.isMaintenanceMode })
      });
      
      if (response.ok) {
        setSiteStatus(prev => ({ ...prev, isMaintenanceMode: !prev.isMaintenanceMode }));
      }
    } catch (error) {
      console.error('Failed to toggle maintenance mode:', error);
    }
    setIsLoading(false);
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <Users className={`h-8 w-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {siteStatus.totalUsers}
          </span>
        </div>
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>Total Users</h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>+12% this month</p>
      </div>

      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <FileText className={`h-8 w-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
          <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {siteStatus.activePosts}
          </span>
        </div>
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>Published Posts</h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Active content</p>
      </div>

      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <AlertTriangle className={`h-8 w-8 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
          <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {siteStatus.pendingReviews}
          </span>
        </div>
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>Pending Reviews</h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Needs attention</p>
      </div>

      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <CheckCircle className={`h-8 w-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
          <span className={`text-sm font-semibold ${isDark ? 'text-green-400' : 'text-green-600'} uppercase`}>
            {siteStatus.systemHealth}
          </span>
        </div>
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>System Status</h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>All systems operational</p>
      </div>
    </div>
  );

  const renderSystemControls = () => (
    <div className="space-y-6">
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
          Site Control
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Maintenance Mode
            </h4>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Temporarily disable site for updates
            </p>
          </div>
          <button
            onClick={handleMaintenanceToggle}
            disabled={isLoading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              siteStatus.isMaintenanceMode 
                ? 'bg-red-600' 
                : isDark ? 'bg-gray-600' : 'bg-gray-300'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading && <LoadingSpinner size="sm" className="absolute inset-0" />}
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                siteStatus.isMaintenanceMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
            <RefreshCw className={`h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'} mx-auto mb-2`} />
            <span className={`block font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Clear Cache</span>
          </button>
          
          <button className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
            <Database className={`h-6 w-6 ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mx-auto mb-2`} />
            <span className={`block font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Backup DB</span>
          </button>
          
          <button className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
            <BarChart3 className={`h-6 w-6 ${isDark ? 'text-purple-400' : 'text-purple-600'} mx-auto mb-2`} />
            <span className={`block font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Generate Report</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <AdvancedSEO
        title="Admin Control Panel - HackTheShell"
        description="Administrative control panel for managing users, content, and system settings"
        keywords="admin panel, content management, user management, system administration"
        noIndex={true}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pt-20`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Admin Control Panel
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage your cybersecurity platform
            </p>
          </div>

          {/* Tab Navigation */}
          <div className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} mb-8`}>
            <nav className="flex space-x-8">
              {adminTabs.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === id
                      ? isDark 
                        ? 'border-emerald-500 text-emerald-400' 
                        : 'border-emerald-600 text-emerald-600'
                      : isDark
                        ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-96">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'system' && renderSystemControls()}
            {activeTab === 'users' && (
              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6`}>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                  User Management
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  User management interface coming soon...
                </p>
              </div>
            )}
            {activeTab === 'content' && (
              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6`}>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                  Content Moderation
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Content moderation dashboard coming soon...
                </p>
              </div>
            )}
            {activeTab === 'seo' && (
              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6`}>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                  SEO & Analytics
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  SEO analytics dashboard coming soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdminPage;