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
    { name: 'GitHub Tools', href: '/github-tools', icon: Github },
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
        ? `${isDark ? 'bg-gray-900/98' : 'bg-white/98'} backdrop-blur-xl shadow-2xl ${isDark ? 'border-emerald-400/30 shadow-emerald-500/10' : 'border-emerald-500/40 shadow-emerald-500/20'} border-b`
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 lg:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <TerminalLogo size="md" animated />
            <span className={`font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-emerald-500 transition-colors`}>
              HackTheShell
            </span>
          </Link>

          {/* Desktop Navigation - Improved spacing and design */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? `${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'} shadow-lg`
                      : `${isDark ? 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50' : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'}`
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                isDark 
                  ? 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50' 
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                isDark 
                  ? 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50' 
                  : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-200 ${
                    isDark 
                      ? 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50' 
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden sm:block font-medium">{user?.name}</span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className={`absolute right-0 mt-2 w-56 ${
                        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      } border rounded-xl shadow-xl z-50`}
                    >
                      <div className="p-2 space-y-1">
                        <Link href="/dashboard" className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                          isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                        }`}>
                          <User className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Link href="/settings" className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                          isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                        }`}>
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                        <hr className={`${isDark ? 'border-gray-700' : 'border-gray-200'} my-2`} />
                        <button
                          onClick={logout}
                          className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                            isDark ? 'hover:bg-red-500/10 text-red-400' : 'hover:bg-red-50 text-red-600'
                          }`}
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  isDark 
                    ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30' 
                    : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg hover:shadow-emerald-500/25'
                }`}
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 ${
                isDark 
                  ? 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50' 
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden overflow-hidden border-t ${
                isDark ? 'border-gray-700 bg-gray-800/95' : 'border-gray-200 bg-white/95'
              } backdrop-blur-xl`}
            >
              <div className="p-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 w-full p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? `${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`
                          : `${isDark ? 'text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50' : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'}`
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
                
                {!isAuthenticated && (
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-center w-full p-3 mt-4 rounded-xl font-medium transition-all duration-200 ${
                      isDark 
                        ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30' 
                        : 'bg-emerald-500 text-white hover:bg-emerald-600'
                    }`}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Modal */}
      <SearchBar isExpanded={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;