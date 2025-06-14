import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, BookOpen, Newspaper, Users, Target, Sun, Moon, Github } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
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
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="relative group">
              <Shield className={`h-8 w-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'} transition-all duration-300 group-hover:scale-110`} />
              <div className={`absolute inset-0 ${isDark ? 'bg-emerald-400/20' : 'bg-emerald-600/20'} blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
            <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
              Hack<span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>The</span>Shell
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { id: 'home', label: 'Home', icon: Target },
              { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
              { id: 'tools', label: 'GitHub Tools', icon: Github },
              { id: 'blog', label: 'Blog & News', icon: Newspaper },
              { id: 'community', label: 'Community', icon: Users }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`${isDark ? 'text-gray-300 hover:text-emerald-400' : 'text-gray-700 hover:text-emerald-600'} transition-all duration-200 flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-emerald-500/10 group`}
              >
                <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>

          {/* Theme Toggle & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-all duration-200 hover:scale-110`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button className={`${isDark ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'} text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25`}>
              Start Learning
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
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

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className={`${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md rounded-2xl mt-4 mb-4 border ${isDark ? 'border-gray-800' : 'border-gray-200'} shadow-xl overflow-hidden`}>
              <div className="px-4 py-6 space-y-2">
                {[
                  { id: 'home', label: 'Home', icon: Target },
                  { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
                  { id: 'tools', label: 'GitHub Tools', icon: Github },
                  { id: 'blog', label: 'Blog & News', icon: Newspaper },
                  { id: 'community', label: 'Community', icon: Users }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${isDark ? 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50' : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'} transition-all duration-200 group`}
                  >
                    <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
                <div className="pt-4 border-t border-gray-700/50">
                  <button className={`w-full ${isDark ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105`}>
                    Start Learning
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;