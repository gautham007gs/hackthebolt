import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Users, FileText, BarChart3, Settings, Shield, Activity, 
  Plus, Search, Bell, Menu, X, ChevronDown, User, LogOut,
  Eye, Heart, MessageCircle, TrendingUp, DollarSign, Award,
  UserPlus, Flag, Database, AlertTriangle, UserCheck
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface SidebarItem {
  id: string;
  name: string;
  icon: any;
  badge?: number;
  subItems?: SidebarItem[];
}

interface ProfessionalDashboardLayoutProps {
  userRole: 'admin' | 'creator';
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  notifications?: Array<{
    id: number;
    message: string;
    time: string;
    type: string;
    priority?: string;
  }>;
}

const ProfessionalDashboardLayout: React.FC<ProfessionalDashboardLayoutProps> = ({
  userRole,
  children,
  activeTab,
  onTabChange,
  notifications = []
}) => {
  const { isDark } = useTheme();
  const { user, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Define sidebar items based on user role
  const getSidebarItems = (): SidebarItem[] => {
    if (userRole === 'admin') {
      return [
        { id: 'dashboard', name: 'Dashboard', icon: Home },
        { 
          id: 'users', 
          name: 'User Management', 
          icon: Users,
          badge: 5,
          subItems: [
            { id: 'users-all', name: 'All Users', icon: Users },
            { id: 'users-pending', name: 'Pending Approval', icon: UserCheck },
            { id: 'users-creators', name: 'Creators', icon: Award }
          ]
        },
        { 
          id: 'content', 
          name: 'Content Management', 
          icon: FileText,
          badge: 12,
          subItems: [
            { id: 'content-all', name: 'All Content', icon: FileText },
            { id: 'content-pending', name: 'Pending Review', icon: AlertTriangle },
            { id: 'content-flagged', name: 'Flagged Content', icon: Flag }
          ]
        },
        { id: 'analytics', name: 'Analytics', icon: BarChart3 },
        { id: 'moderation', name: 'Moderation', icon: Shield, badge: 3 },
        { id: 'system', name: 'System Health', icon: Activity },
        { id: 'settings', name: 'System Settings', icon: Settings }
      ];
    } else {
      return [
        { id: 'dashboard', name: 'Dashboard', icon: Home },
        { 
          id: 'posts', 
          name: 'My Posts', 
          icon: FileText,
          subItems: [
            { id: 'posts-all', name: 'All Posts', icon: FileText },
            { id: 'posts-published', name: 'Published', icon: Eye },
            { id: 'posts-drafts', name: 'Drafts', icon: Plus }
          ]
        },
        { id: 'create', name: 'Create Post', icon: Plus },
        { id: 'analytics', name: 'Analytics', icon: BarChart3 },
        { id: 'audience', name: 'Audience', icon: Users },
        { id: 'monetization', name: 'Monetization', icon: DollarSign },
        { id: 'settings', name: 'Settings', icon: Settings }
      ];
    }
  };

  const sidebarItems = getSidebarItems();
  const unreadNotifications = notifications.filter(n => n.priority === 'high').length;

  const handleSidebarItemClick = (itemId: string) => {
    onTabChange(itemId);
    setMobileMenuOpen(false); // Close mobile menu when item is clicked
  };

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        initial={false}
        animate={{
          x: mobileMenuOpen ? 0 : '-100%'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
          border-r flex flex-col fixed h-full z-50 lg:relative lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="p-3 lg:p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-lg ${isDark ? 'bg-emerald-600' : 'bg-emerald-600'} flex items-center justify-center`}>
                  <Shield className="h-3 w-3 lg:h-5 lg:w-5 text-white" />
                </div>
                <div>
                  <h2 className={`text-xs lg:text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    HackTheShell
                  </h2>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {userRole === 'admin' ? 'Admin Panel' : 'Creator Studio'}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-2">
              {/* Mobile close button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`p-1.5 rounded-lg lg:hidden ${
                  isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                } transition-colors`}
              >
                <X className="h-4 w-4" />
              </button>
              {/* Collapse button for desktop */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className={`p-1.5 rounded-lg hidden lg:block ${
                  isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                } transition-colors`}
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleSidebarItemClick(item.id)}
                className={`w-full flex items-center justify-between p-2 lg:p-3 rounded-lg transition-all duration-200 group ${
                  activeTab === item.id || activeTab.startsWith(item.id + '-')
                    ? isDark 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-emerald-500 text-white'
                    : isDark
                      ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                      : 'hover:bg-gray-100 text-gray-800 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <item.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${sidebarCollapsed ? 'mx-auto' : ''}`} />
                  {!sidebarCollapsed && (
                    <span className="text-xs lg:text-sm font-medium">{item.name}</span>
                  )}
                </div>
                
                {!sidebarCollapsed && (
                  <div className="flex items-center space-x-2">
                    {item.badge && item.badge > 0 && (
                      <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {item.badge}
                      </span>
                    )}
                    {item.subItems && (
                      <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
                    )}
                  </div>
                )}
              </button>

              {/* Sub-items */}
              {item.subItems && !sidebarCollapsed && (activeTab.startsWith(item.id)) && (
                <div className="ml-2 lg:ml-4 mt-1 lg:mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => handleSidebarItemClick(subItem.id)}
                      className={`w-full flex items-center space-x-2 lg:space-x-3 p-1.5 lg:p-2 rounded-lg text-xs lg:text-sm transition-all duration-200 ${
                        activeTab === subItem.id
                          ? isDark 
                            ? 'bg-emerald-600/50 text-emerald-300' 
                            : 'bg-emerald-100 text-emerald-700'
                          : isDark
                            ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <subItem.icon className="h-3 w-3 lg:h-4 lg:w-4" />
                      <span>{subItem.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Info */}
        {!sidebarCollapsed && (
          <div className="p-2 lg:p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`w-full flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg transition-all duration-200 ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center`}>
                  <User className="h-3 w-3 lg:h-4 lg:w-4" />
                </div>
                <div className="flex-1 text-left">
                  <p className={`text-xs lg:text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {user?.name || 'User'}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {user?.email ? (user.email.length > 20 ? user.email.substring(0, 20) + '...' : user.email) : 'user@example.com'}
                  </p>
                </div>
                <ChevronDown className={`h-3 w-3 lg:h-4 lg:w-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>

              {/* User Menu Dropdown */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute bottom-full left-0 right-0 mb-2 ${
                      isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                    } border rounded-lg shadow-lg overflow-hidden`}
                  >
                    <button
                      onClick={() => handleSidebarItemClick('profile')}
                      className={`w-full flex items-center space-x-2 px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm transition-colors ${
                        isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <User className="h-3 w-3 lg:h-4 lg:w-4" />
                      <span>Profile Settings</span>
                    </button>
                    <button
                      onClick={logout}
                      className={`w-full flex items-center space-x-2 px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm transition-colors ${
                        isDark ? 'hover:bg-gray-600 text-red-400' : 'hover:bg-gray-50 text-red-600'
                      }`}
                    >
                      <LogOut className="h-3 w-3 lg:h-4 lg:w-4" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} transition-all duration-300 min-h-screen flex flex-col w-full lg:w-auto`}>
        {/* Top Header */}
        <header className={`${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-b px-4 lg:px-6 py-3 lg:py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`p-2 rounded-lg lg:hidden ${
                  isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                } transition-colors`}
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div>
                <h1 className={`text-lg lg:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {userRole === 'admin' ? 'Admin Dashboard' : 'Creator Studio'}
                </h1>
                <p className={`text-xs lg:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} hidden sm:block`}>
                  {userRole === 'admin' 
                    ? 'Manage users, content, and system settings'
                    : 'Create, manage, and analyze your content'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Search - Hidden on small screens */}
              <div className="relative hidden md:block">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 w-32 lg:w-64 rounded-lg text-sm ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-lg relative ${
                    isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  } transition-colors`}
                >
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown - Mobile Optimized */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute right-0 top-full mt-2 w-72 lg:w-80 ${
                        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      } border rounded-lg shadow-xl overflow-hidden z-50`}
                    >
                      <div className="p-3 lg:p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className={`text-sm lg:text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Notifications
                        </h3>
                      </div>
                      <div className="max-h-64 lg:max-h-80 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 lg:p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
                                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                              } transition-colors cursor-pointer`}
                            >
                              <p className={`text-xs lg:text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {notification.message}
                              </p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                                {notification.time}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="p-6 text-center">
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              No notifications
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProfessionalDashboardLayout;