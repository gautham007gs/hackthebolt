import React, { useState, useEffect } from 'react';
import { Plus, X, Search, Moon, Sun, User, LogOut, Shield, Zap } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const EnhancedHeader = () => {
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

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Learn', 
      href: '/tutorials',
      subItems: [
        { name: 'Tutorials', href: '/tutorials' },
        { name: 'Labs', href: '/labs' },
        { name: 'CTF', href: '/ctf' },
        { name: 'Certifications', href: '/certifications' }
      ]
    },
    { name: 'Blog', href: '/blog' },
    { name: 'Tools', href: '/github-tools' },
    { name: 'Community', href: '/community' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
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
        ? `${isDark ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-200'} backdrop-blur-xl border-b shadow-xl` 
        : `${isDark ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-md`
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Terminal Shell Logo */}
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <div className={`w-10 h-7 ${
              isDark ? 'bg-gray-900 border-emerald-400' : 'bg-gray-50 border-emerald-600'
            } border-4 rounded-2xl flex items-center justify-start pl-2 font-mono text-xs group-hover:border-emerald-500 transition-all duration-200 group-hover:shadow-xl shadow-emerald-500/20`}>
              <span className={`select-none ${isDark ? 'text-emerald-400' : 'text-emerald-600'} font-bold`}>$</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-lg sm:text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              } group-hover:text-emerald-500 transition-all duration-300 tracking-tight`}>
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
                    <button className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActivePath(item.href)
                        ? `${isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-50'}`
                        : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'}`
                    }`}>
                      <span>{item.name}</span>
                    </button>
                    
                    {/* Dropdown */}
                    <div className={`absolute top-full left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 ${
                      isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
                    } border rounded-xl shadow-xl backdrop-blur-xl`}>
                      <div className="py-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                              isActivePath(subItem.href)
                                ? `${isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-50'}`
                                : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActivePath(item.href)
                        ? `${isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-50'}`
                        : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'}`
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-2">
                {user?.role === 'admin' && (
                  <Link href="/admin" className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                    <Shield className="h-5 w-5" />
                  </Link>
                )}
                {(user?.role === 'creator' || user?.role === 'admin') && (
                  <Link href="/creator" className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">
                    <Zap className="h-5 w-5" />
                  </Link>
                )}
                <Link href="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <User className="h-5 w-5" />
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/login" className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Plus className="h-6 w-6" />
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
              className={`lg:hidden overflow-hidden ${
                isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
              } border-t backdrop-blur-xl mt-2 rounded-b-xl`}
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.subItems ? (
                      <div>
                        <button
                          onClick={() => toggleSection(item.name)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left font-medium transition-colors ${
                            expandedSection === item.name
                              ? `${isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-50'}`
                              : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`
                          }`}
                        >
                          <span>{item.name}</span>
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
                              className="overflow-hidden pl-4 mt-2 space-y-1"
                            >
                              {item.subItems.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={closeMenu}
                                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                    isActivePath(subItem.href)
                                      ? `${isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-50'}`
                                      : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                                  }`}
                                >
                                  {subItem.name}
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
                        className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                          isActivePath(item.href)
                            ? `${isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-50'}`
                            : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile User Actions */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  {isAuthenticated ? (
                    <>
                      {user?.role === 'admin' && (
                        <Link
                          href="/admin"
                          onClick={closeMenu}
                          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                        >
                          <Shield className="h-5 w-5" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      {(user?.role === 'creator' || user?.role === 'admin') && (
                        <Link
                          href="/creator"
                          onClick={closeMenu}
                          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                        >
                          <Zap className="h-5 w-5" />
                          <span>Creator Hub</span>
                        </Link>
                      )}
                      <Link
                        href="/dashboard"
                        onClick={closeMenu}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <User className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          closeMenu();
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={closeMenu}
                        className="block px-3 py-2 text-center rounded-lg border border-gray-300 dark:border-gray-600 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        href="/login"
                        onClick={closeMenu}
                        className="block px-3 py-2 text-center bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
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

export default EnhancedHeader;