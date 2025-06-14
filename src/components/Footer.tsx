import React from 'react';
import { Shield, Github, Twitter, Linkedin, Mail, BookOpen, Users, Newspaper, Target } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Learn': [
      { name: 'Tutorials', href: '#tutorials', icon: BookOpen },
      { name: 'GitHub Tools', href: '#tools', icon: Github },
      { name: 'Beginner Guides', href: '#', icon: Target },
      { name: 'Advanced Courses', href: '#', icon: Shield }
    ],
    'Community': [
      { name: 'Discord Server', href: '#', icon: Users },
      { name: 'Forums', href: '#', icon: Users },
      { name: 'Contributors', href: '#', icon: Users },
      { name: 'Events', href: '#', icon: Users }
    ],
    'Resources': [
      { name: 'Blog & News', href: '#blog', icon: Newspaper },
      { name: 'Tools & Scripts', href: '#', icon: Target },
      { name: 'Vulnerability DB', href: '#', icon: Shield },
      { name: 'CTF Challenges', href: '#', icon: Target }
    ],
    'Company': [
      { name: 'About Us', href: '#', icon: Users },
      { name: 'Careers', href: '#', icon: Users },
      { name: 'Privacy Policy', href: '#', icon: Shield },
      { name: 'Terms of Service', href: '#', icon: Shield }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@hacktheshell.com' }
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith('#')) {
      const element = document.getElementById(sectionId.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} border-t relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 left-1/4 w-96 h-96 ${isDark ? 'bg-emerald-500/5' : 'bg-emerald-500/10'} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 ${isDark ? 'bg-teal-500/5' : 'bg-teal-500/10'} rounded-full blur-3xl`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Shield className={`h-8 w-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <div className={`absolute inset-0 ${isDark ? 'bg-emerald-400/20' : 'bg-emerald-600/20'} blur-xl rounded-full`}></div>
              </div>
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Hack<span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>The</span>Shell
              </span>
            </div>
            
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 max-w-md`}>
              Empowering the next generation of cybersecurity professionals with hands-on training, 
              expert insights, and a supportive community focused on ethical hacking and defense.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`${isDark ? 'bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-gray-400 hover:text-white' : 'bg-gray-200 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-gray-600 hover:text-white'} p-3 rounded-lg transition-all duration-200 transform hover:scale-110`}
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold mb-4`}>{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className={`group ${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors duration-200 flex items-center space-x-2`}
                      >
                        <Icon className={`h-4 w-4 ${isDark ? 'group-hover:text-emerald-400' : 'group-hover:text-emerald-600'} transition-colors duration-200`} />
                        <span>{link.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className={`${isDark ? 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-emerald-500/20' : 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'} border rounded-xl p-6`}>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold mb-2`}>Stay Updated</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                  Get the latest cybersecurity news and tutorials delivered to your inbox.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'} border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500`}
                />
                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`mt-12 pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} flex flex-col md:flex-row justify-between items-center`}>
          <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4 md:mb-0`}>
            © {currentYear} HackTheShell. All rights reserved. Built with ❤️ for the cybersecurity community.
          </div>
          <div className={`flex items-center space-x-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <a href="#" className={`${isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'} transition-colors duration-200`}>
              Privacy Policy
            </a>
            <a href="#" className={`${isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'} transition-colors duration-200`}>
              Terms of Service
            </a>
            <a href="#" className={`${isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'} transition-colors duration-200`}>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;