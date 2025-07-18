import React, { useState, useEffect } from 'react';
import { Plus, X, Search, Moon, Sun, User, LogOut, Shield, Zap, ChevronDown, Menu, Home, BookOpen, MessageCircle, Github, Users, Info, Newspaper, Sparkles, Settings } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const ProfessionalHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [location] = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    setExpandedSection(null);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { 
      name: 'Learn', 
      href: '/tutorials',
      icon: BookOpen,
      subItems: [
        { name: 'Interactive Tutorials', href: '/tutorials', desc: 'Step-by-step cybersecurity lessons' },
        { name: 'Hands-on Labs', href: '/labs', desc: 'Practice in safe environments' },
        { name: 'CTF Challenges', href: '/ctf', desc: 'Capture The Flag competitions' },
        { name: 'Certifications', href: '/certifications', desc: 'Industry-recognized credentials' }
      ]
    },
    { name: 'News', href: '/news', icon: Newspaper },
    { name: 'Blog', href: '/blog', icon: MessageCircle },
    { name: 'GitHub Tools', href: '/github-tools', icon: Github },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'About', href: '/about', icon: Info }
  ];

  const isActivePath = (path: string) => {
    if (path === '/') return location === '/';
    return location.startsWith(path);
  };

  const toggleSection = (sectionName: string) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedSection(null);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? `${isDark ? 'bg-gray-900/95 border-gray-800/50' : 'bg-white/95 border-gray-200/50'} backdrop-blur-xl border-b` 
        : `${isDark ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-xl`
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Professional Terminal Shell Logo */}
          <Link href="/" className="flex items-center space-x-2 group shrink-0" onClick={closeMenu}>
            <div className={`relative w-8 h-6 ${
              isDark ? 'bg-gray-900 border-emerald-400' : 'bg-gray-50 border-emerald-600'
            } border-2 border-l-[3px] border-b-[3px] flex items-center justify-start pl-1 font-mono text-xs group-hover:border-emerald-500 transition-all duration-200 group-hover:shadow-lg shadow-emerald-500/10`} 
            style={{ 
              borderRadius: '0 4px 0 8px',
              transform: 'skewX(-5deg)'
            }}>
              <span className={`select-none ${isDark ? 'text-emerald-400' : 'text-emerald-600'} font-semibold transform skew-x-[5deg]`}>$</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-lg sm:text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              } group-hover:text-emerald-500 transition-all duration-300 tracking-tight font-sans`}>
                HackTheShell
              </span>
              <div className={`h-0.5 w-0 group-hover:w-full ${
                isDark ? 'bg-emerald-400' : 'bg-emerald-600'
              } transition-all duration-500 ease-out`} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.subItems ? (
                  <div className="relative">
                    <button className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActivePath(item.href)
                        ? `${isDark ? 'text-emerald-400 bg-emerald-500/10 shadow-md' : 'text-emerald-600 bg-emerald-50 shadow-md'}`
                        : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/60' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/60'}`
                    }`}>
                      <span>{item.name}</span>
                      <ChevronDown className="h-3 w-3 group-hover:rotate-180 transition-transform duration-200" />
                    </button>
                    
                    {/* Enhanced Dropdown */}
                    <div className={`absolute top-full left-0 mt-3 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 ${
                      isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
                    } border rounded-xl shadow-2xl backdrop-blur-xl`}>
                      <div className="p-3">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block p-3 rounded-lg transition-all duration-200 group/item ${
                              isActivePath(subItem.href)
                                ? `${isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-50'}`
                                : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`
                            }`}
                          >
                            <div className="font-medium text-sm">{subItem.name}</div>
                            <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {subItem.desc}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActivePath(item.href)
                        ? `${isDark ? 'text-emerald-400 bg-emerald-500/10 shadow-md' : 'text-emerald-600 bg-emerald-50 shadow-md'}`
                        : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/60' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/60'}`
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-1">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark ? 'hover:bg-gray-800/60 text-gray-300' : 'hover:bg-gray-100/60 text-gray-700'
              }`}
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-gray-700" />
              )}
            </button>

            {/* CyberAce AI - Desktop */}
            <Link 
              href="/cyberace"
              className={`hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                isDark 
                  ? 'text-cyan-400 hover:bg-cyan-500/10' 
                  : 'text-cyan-600 hover:bg-cyan-50'
              }`}
            >
              <div className="w-5 h-5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium">CyberAce AI</span>
            </Link>

            {/* User Menu - Desktop */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-0.5">
                {user?.role === 'admin' && (
                  <Link href="/admin" className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200">
                    <Shield className="h-4 w-4" />
                  </Link>
                )}
                {(user?.role === 'creator' || user?.role === 'admin') && (
                  <Link href="/creator" className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all duration-200">
                    <Zap className="h-4 w-4" />
                  </Link>
                )}
                <Link href="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                  <User className="h-4 w-4" />
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-1">
                <Link 
                  href="/login" 
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  href="/login" 
                  className="px-3 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${
                isDark ? 'hover:bg-gray-800/60' : 'hover:bg-gray-100/60'
              }`}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
              ) : (
                <Menu className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`lg:hidden overflow-hidden ${
                isDark ? 'bg-gray-800/98 border-gray-700' : 'bg-white/98 border-gray-200'
              } border-t backdrop-blur-xl mt-2 rounded-b-xl shadow-2xl`}
            >
              <div className="p-4 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
                {/* User Profile Section in Mobile */}
                {isAuthenticated && (
                  <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 mb-4">
                    <div className="flex items-center space-x-3">
                      {user?.profileImageUrl ? (
                        <img
                          src={user.profileImageUrl}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm border-2 border-white/20">
                          {user?.firstName ? user.firstName[0].toUpperCase() : user?.email ? user.email[0].toUpperCase() : 'U'}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{user?.firstName || user?.email?.split('@')[0] || 'User'}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.subItems ? (
                      <div>
                        <button
                          onClick={() => toggleSection(item.name)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${
                            expandedSection === item.name
                              ? `${isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-50'}`
                              : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'}`
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {item.icon && <item.icon className="h-5 w-5" />}
                            <span>{item.name}</span>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedSection === item.name ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Plus className="h-4 w-4" />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {expandedSection === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden ml-4 mt-2 space-y-1"
                            >
                              {item.subItems.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={closeMenu}
                                  className={`block p-3 rounded-lg transition-all duration-200 ${
                                    isActivePath(subItem.href)
                                      ? `${isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-50'}`
                                      : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'}`
                                  }`}
                                >
                                  <div className="font-medium text-sm">{subItem.name}</div>
                                  <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                    {subItem.desc}
                                  </div>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                          isActivePath(item.href)
                            ? `${isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-50'}`
                            : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'}`
                        }`}
                      >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </div>
                ))}

                {/* CyberAce AI Assistant - Mobile */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href="/cyberace"
                    onClick={closeMenu}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isDark 
                        ? 'text-cyan-400 hover:bg-cyan-500/10' 
                        : 'text-cyan-600 hover:bg-cyan-50'
                    }`}
                  >
                    <div className="w-5 h-5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium">CyberAce AI</span>
                  </Link>
                </div>

                {/* Mobile User Actions */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  {isAuthenticated ? (
                    <>
                      {user?.role === 'admin' && (
                        <Link
                          href="/admin"
                          onClick={closeMenu}
                          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                        >
                          <Shield className="h-5 w-5" />
                          <span className="font-medium">Admin Panel</span>
                        </Link>
                      )}
                      {(user?.role === 'creator' || user?.role === 'admin') && (
                        <Link
                          href="/creator"
                          onClick={closeMenu}
                          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all duration-200"
                        >
                          <Zap className="h-5 w-5" />
                          <span className="font-medium">Creator Hub</span>
                        </Link>
                      )}
                      <Link
                        href="/dashboard"
                        onClick={closeMenu}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <User className="h-5 w-5" />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      <Link
                        href="/profile"
                        onClick={closeMenu}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Settings className="h-5 w-5" />
                        <span className="font-medium">Edit Profile</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          closeMenu();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={closeMenu}
                        className={`block px-4 py-3 text-center rounded-lg border font-medium transition-all duration-200 ${
                          isDark 
                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        Login
                      </Link>
                      <Link
                        href="/login"
                        onClick={closeMenu}
                        className="block px-4 py-3 text-center bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg transform hover:scale-105"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default ProfessionalHeader;