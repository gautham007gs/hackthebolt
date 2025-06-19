import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Moon, Sun, User, ChevronDown, Shield, Zap, LogOut, Settings, BookOpen, Code, Users, Home, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const ImprovedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { 
      name: 'Learn', 
      href: '/tutorials',
      icon: BookOpen,
      subItems: [
        { name: 'Tutorials', href: '/tutorials', desc: 'Step by step guides' },
        { name: 'Labs', href: '/labs', desc: 'Hands-on practice' },
        { name: 'CTF', href: '/ctf', desc: 'Challenges' },
        { name: 'Certifications', href: '/certifications', desc: 'Get certified' }
      ]
    },
    { name: 'Blog', href: '/blog', icon: MessageCircle },
    { name: 'Tools', href: '/github-tools', icon: Code },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'About', href: '/about' }
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
        ? `${isDark ? 'bg-gray-900/98 border-gray-800' : 'bg-white/98 border-gray-200'} backdrop-blur-xl border-b shadow-xl` 
        : `${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg`
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3 group shrink-0" onClick={closeMenu}>
            <div className={`relative w-10 h-7 ${
              isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-emerald-400' : 'bg-gradient-to-br from-gray-50 to-white border-emerald-600'
            } border-2 border-l-[3px] border-b-[3px] rounded-lg flex items-center justify-center font-mono text-sm group-hover:border-emerald-500 transition-all duration-200 group-hover:shadow-lg shadow-emerald-500/20 group-hover:scale-105`}>
              <span className={`select-none ${isDark ? 'text-emerald-400' : 'text-emerald-600'} font-bold text-lg`}>$</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              } group-hover:text-emerald-500 transition-all duration-300 tracking-tight`}>
                HackTheShell
              </span>
              <div className={`h-0.5 w-0 group-hover:w-full ${
                isDark ? 'bg-emerald-400' : 'bg-emerald-600'
              } transition-all duration-500 ease-out rounded-full`} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.name} className="relative group">
                  {item.subItems ? (
                    <div className="relative">
                      <button className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActivePath(item.href)
                          ? `${isDark ? 'text-emerald-400 bg-emerald-500/15 shadow-md' : 'text-emerald-600 bg-emerald-50 shadow-md'}`
                          : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/60' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/60'}`
                      }`}>
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        <span>{item.name}</span>
                        <ChevronDown className="h-3 w-3 group-hover:rotate-180 transition-transform duration-200" />
                      </button>
                      
                      {/* Enhanced Dropdown */}
                      <div className={`absolute top-full left-0 mt-3 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 ${
                        isDark ? 'bg-gray-800/98 border-gray-700' : 'bg-white/98 border-gray-200'
                      } border rounded-xl shadow-2xl backdrop-blur-xl`}>
                        <div className="p-4">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`flex flex-col p-3 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                                isActivePath(subItem.href)
                                  ? `${isDark ? 'text-emerald-400 bg-emerald-500/15' : 'text-emerald-600 bg-emerald-50'}`
                                  : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`
                              }`}
                            >
                              <span className="font-medium">{subItem.name}</span>
                              <span className={`text-xs mt-1 ${
                                isDark ? 'text-gray-400' : 'text-gray-500'
                              }`}>{subItem.desc}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActivePath(item.href)
                          ? `${isDark ? 'text-emerald-400 bg-emerald-500/15 shadow-md' : 'text-emerald-600 bg-emerald-50 shadow-md'}`
                          : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/60' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/60'}`
                      }`}
                    >
                      {IconComponent && <IconComponent className="h-4 w-4" />}
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="hidden md:block">
              {!isSearchOpen ? (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className={`p-2.5 rounded-xl transition-all duration-200 ${
                    isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800/60' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
                  }`}
                  title="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => setIsSearchOpen(false)}
                    autoFocus
                    className={`w-40 sm:w-60 px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                      isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                    } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none`}
                  />
                  <Search className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800/60' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
              }`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                  isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/60' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/60'
                }`}>
                  <div className="w-7 h-7 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
                  <ChevronDown className="h-3 w-3 hidden sm:block" />
                </button>
                
                <div className={`absolute top-full right-0 mt-3 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 ${
                  isDark ? 'bg-gray-800/98 border-gray-700' : 'bg-white/98 border-gray-200'
                } border rounded-xl shadow-2xl backdrop-blur-xl`}>
                  <div className="p-2">
                    <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {user?.name}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user?.email}
                      </p>
                    </div>
                    <div className="py-2">
                      <Link href="/dashboard" className={`flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                        isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}>
                        <User className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                      {(user?.role === 'admin' || user?.role === 'creator') && (
                        <Link href="/admin" className={`flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                          isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        }`}>
                          <Shield className="h-4 w-4" />
                          <span>{user?.role === 'admin' ? 'Admin Panel' : 'Creator Panel'}</span>
                        </Link>
                      )}
                      <Link href="/settings" className={`flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                        isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}>
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      <hr className={`my-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
                      <button
                        onClick={logout}
                        className={`flex items-center space-x-3 w-full text-left px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                          isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button with improved contrast */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 border-2 ${
                isDark 
                  ? 'text-white bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-500' 
                  : 'text-gray-900 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              } shadow-sm`}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className={`lg:hidden mt-4 pb-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="pt-6 space-y-3">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.name}>
                    {item.subItems ? (
                      <div className="space-y-2">
                        <button
                          onClick={() => toggleSection(item.name)}
                          className={`flex items-center justify-between w-full px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                            expandedSection === item.name
                              ? `${isDark ? 'text-emerald-400 bg-emerald-500/15' : 'text-emerald-600 bg-emerald-50'}`
                              : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/60' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/60'}`
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {IconComponent && <IconComponent className="h-5 w-5" />}
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                            expandedSection === item.name ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        {expandedSection === item.name && (
                          <div className="ml-6 space-y-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`flex flex-col px-4 py-3 rounded-lg transition-all duration-200 ${
                                  isActivePath(subItem.href)
                                    ? `${isDark ? 'text-emerald-400 bg-emerald-500/15' : 'text-emerald-600 bg-emerald-50'}`
                                    : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'}`
                                }`}
                                onClick={closeMenu}
                              >
                                <span className="font-medium">{subItem.name}</span>
                                <span className={`text-sm mt-1 ${
                                  isDark ? 'text-gray-400' : 'text-gray-500'
                                }`}>{subItem.desc}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActivePath(item.href)
                            ? `${isDark ? 'text-emerald-400 bg-emerald-500/15' : 'text-emerald-600 bg-emerald-50'}`
                            : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/60' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/60'}`
                        }`}
                        onClick={closeMenu}
                      >
                        {IconComponent && <IconComponent className="h-5 w-5" />}
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    )}
                  </div>
                );
              })}

              {/* Mobile Search */}
              <div className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full px-4 py-3 pl-11 rounded-xl text-sm transition-all duration-200 ${
                      isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                    } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none`}
                  />
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
              </div>

              {/* Mobile User Actions */}
              {!isAuthenticated && (
                <div className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                  <Link
                    href="/login"
                    className="block w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-center px-5 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg"
                    onClick={closeMenu}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Search Overlay for Mobile */}
      {isSearchOpen && (
        <div className="md:hidden fixed inset-0 z-60 bg-black/50 backdrop-blur-sm">
          <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} p-4`}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-3 pl-11 rounded-xl text-sm ${
                  isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none`}
                autoFocus
              />
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <button
                onClick={() => setIsSearchOpen(false)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default ImprovedHeader;