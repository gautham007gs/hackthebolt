import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Shield, BookOpen, Newspaper, Users, Target, Sun, Moon, Github, Search, User, LogOut, Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';
import TerminalLogo from './TerminalLogo';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: Target },
    { name: 'Tutorials', href: '/tutorials', icon: BookOpen },
    { name: 'Labs', href: '/labs', icon: Target },
    { name: 'Blog', href: '/blog', icon: Newspaper },
    { name: 'Community', href: '/community', icon: Users }
  ];

  const isActivePath = (path: string) => {
    if (path === '/') return location === '/';
    return location.startsWith(path);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? `${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md shadow-lg ${isDark ? 'border-emerald-500/20' : 'border-emerald-500/30'} border-b`
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Shield className={`h-8 w-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'} transition-all duration-300 group-hover:scale-110`} />
              <div className={`absolute inset-0 ${isDark ? 'bg-emerald-400/20' : 'bg-emerald-600/20'} blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
            <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
              Hack<span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>The</span>Shell
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                to={href}
                className={`${
                  isActivePath(href)
                    ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                    : isDark ? 'text-gray-300 hover:text-emerald-400' : 'text-gray-700 hover:text-emerald-600'
                } transition-all duration-200 flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-emerald-500/10 group relative`}
              >
                <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{name}</span>
                {isActivePath(href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                onKeyDown={(e) => e.key === 'Enter' && setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-emerald-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-emerald-600'} transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
                aria-label="Open search"
                aria-expanded={isSearchOpen}
              >
                <Search className="h-5 w-5" />
              </button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute top-full right-0 mt-2 z-50"
                  >
                    <SearchBar onClose={() => setIsSearchOpen(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              onKeyDown={(e) => e.key === 'Enter' && toggleTheme()}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User Menu or Auth Buttons */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-200`}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>
                    {user.name}
                  </span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className={`absolute top-full right-0 mt-2 w-48 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-xl py-2 z-50`}
                    >
                      <Link
                        to="/dashboard"
                        className={`flex items-center space-x-2 px-4 py-2 ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'} transition-colors duration-200`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        className={`w-full flex items-center space-x-2 px-4 py-2 ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'} transition-colors duration-200`}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </button>
                      <hr className={`my-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-2 px-4 py-2 ${isDark ? 'text-red-400 hover:text-red-300 hover:bg-gray-700' : 'text-red-600 hover:text-red-700 hover:bg-gray-50'} transition-colors duration-200`}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button className={`${isDark ? 'text-gray-300 hover:text-emerald-400' : 'text-gray-700 hover:text-emerald-600'} px-4 py-2 rounded-lg font-medium transition-all duration-200`}>
                  Sign In
                </button>
                <button className={`${isDark ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'} text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25`}>
                  Start Learning
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} transition-all duration-200`}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-all duration-200`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleMenu}
              className={`${isDark ? 'text-gray-300 hover:text-emerald-400' : 'text-gray-700 hover:text-emerald-600'} transition-colors duration-200 p-2`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-4"
            >
              <SearchBar onClose={() => setIsSearchOpen(false)} isExpanded />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden"
            >
              <div className={`${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md rounded-2xl mt-4 mb-4 border ${isDark ? 'border-gray-800' : 'border-gray-200'} shadow-xl overflow-hidden`}>
                <div className="px-4 py-6 space-y-2">
                  {navigation.map(({ name, href, icon: Icon }) => (
                    <Link
                      key={name}
                      to={href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${
                        isActivePath(href)
                          ? isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-50'
                          : isDark ? 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50' : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                      } transition-all duration-200 group`}
                    >
                      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium">{name}</span>
                    </Link>
                  ))}
                  
                  {isAuthenticated && user ? (
                    <>
                      <hr className={`my-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
                      <Link
                        to="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${isDark ? 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50' : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'} transition-all duration-200 group`}
                      >
                        <User className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${isDark ? 'text-red-400 hover:text-red-300 hover:bg-gray-800/50' : 'text-red-600 hover:text-red-700 hover:bg-red-50'} transition-all duration-200 group`}
                      >
                        <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <div className="pt-4 border-t border-gray-700/50 space-y-2">
                      <button className={`w-full ${isDark ? 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50' : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'} px-4 py-3 rounded-xl font-medium transition-all duration-200`}>
                        Sign In
                      </button>
                      <button className={`w-full ${isDark ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105`}>
                        Start Learning
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;