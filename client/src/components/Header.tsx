import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Moon, Sun, User, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? `${isDark ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-200'} backdrop-blur-xl border-b shadow-lg` 
        : `${isDark ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-sm`
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Terminal Box Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`w-10 h-10 ${
              isDark ? 'bg-gray-800 border-emerald-400' : 'bg-gray-100 border-emerald-600'
            } border-2 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            } group-hover:scale-105 transition-transform duration-200 shadow-lg`}>
              _$
            </div>
            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              HackTheShell
            </span>
          </Link>

          {/* Desktop Navigation - Better Spaced */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.subItems ? (
                  <div className="relative">
                    <button className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActivePath(item.href)
                        ? `${isDark ? 'text-emerald-400 bg-emerald-500/15' : 'text-emerald-600 bg-emerald-50'}`
                        : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'}`
                    }`}>
                      <span>{item.name}</span>
                      <ChevronDown className="h-3 w-3 group-hover:rotate-180 transition-transform duration-200" />
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
                                ? `${isDark ? 'text-emerald-400 bg-emerald-500/15' : 'text-emerald-600 bg-emerald-50'}`
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
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActivePath(item.href)
                        ? `${isDark ? 'text-emerald-400 bg-emerald-500/15' : 'text-emerald-600 bg-emerald-50'}`
                        : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'}`
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions - Properly Spaced */}
          <div className="flex items-center space-x-2">
            {/* Search - Better Positioning */}
            <div className="relative">
              {isSearchOpen ? (
                <div className={`absolute right-0 top-0 flex items-center space-x-2 ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } rounded-xl border p-2 shadow-xl min-w-[300px] z-10`}>
                  <Search className="h-4 w-4 text-gray-400 ml-1" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tutorials, blogs, tools..."
                    className={`flex-1 px-2 py-1 text-sm bg-transparent outline-none ${
                      isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                    }`}
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className={`p-1 rounded-lg transition-colors duration-200 ${
                      isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className={`p-2.5 rounded-xl transition-colors duration-200 ${
                    isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
                  title="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-colors duration-200 ${
                isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-colors duration-200 ${
                  isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'
                }`}>
                  <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
                </button>
                
                <div className={`absolute top-full right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 ${
                  isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
                } border rounded-xl shadow-xl backdrop-blur-xl`}>
                  <div className="py-2">
                    <Link href="/dashboard" className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                      isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}>
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                        isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-colors duration-200 ${
                isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`lg:hidden mt-4 pb-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="pt-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.name === 'Learn' ? (
                    <div className="space-y-1">
                      <div className={`px-3 py-2 text-sm font-medium ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.name}
                      </div>
                      <Link
                        href="/tutorials"
                        className={`block px-6 py-2 text-sm transition-colors duration-200 ${
                          isActivePath('/tutorials')
                            ? `${isDark ? 'text-emerald-400 bg-emerald-500/15' : 'text-emerald-600 bg-emerald-50'}`
                            : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'}`
                        } rounded-xl mx-3`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Browse Tutorials
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActivePath(item.href)
                          ? `${isDark ? 'text-emerald-400 bg-emerald-500/15' : 'text-emerald-600 bg-emerald-50'}`
                          : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'}`
                      } rounded-xl`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;