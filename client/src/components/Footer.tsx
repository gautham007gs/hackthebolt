import React from 'react';
import { Link } from 'wouter';
import { Mail, MapPin, Phone, Github, Twitter, Linkedin, Shield, Terminal, Users, BookOpen } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Blog', href: '/blog' },
    { name: 'Tools', href: '/github-tools' },
    { name: 'Labs', href: '/labs' },
    { name: 'CTF', href: '/ctf' }
  ];

  const learningPaths = [
    { name: 'Penetration Testing', href: '/tutorials/pentesting' },
    { name: 'Web Security', href: '/tutorials/web-security' },
    { name: 'Network Security', href: '/tutorials/network-security' },
    { name: 'Malware Analysis', href: '/tutorials/malware-analysis' },
    { name: 'Digital Forensics', href: '/tutorials/forensics' },
    { name: 'Threat Hunting', href: '/tutorials/threat-hunting' }
  ];

  const resources = [
    { name: 'Certification Guide', href: '/certifications' },
    { name: 'Career Roadmap', href: '/career' },
    { name: 'Community Forum', href: '/community' },
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api' },
    { name: 'Security Tools', href: '/tools' }
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Security', href: '/security' }
  ];

  return (
    <footer className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} border-t transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className={`flex items-center space-x-1 text-xl font-mono font-bold ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                <span className="text-2xl">_</span>
                <span className="text-2xl">$</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                HackTheShell
              </span>
            </div>
            
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed max-w-md`}>
              Master the art of cybersecurity through hands-on tutorials, real-world scenarios, and expert guidance. 
              Join our community of ethical hackers and security professionals.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4 text-center`}>
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-emerald-500" />
                </div>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>50K+</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Active Learners</div>
              </div>
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4 text-center`}>
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-5 w-5 text-cyan-500" />
                </div>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>500+</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Tutorials</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/hacktheshell"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/hacktheshell"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/hacktheshell"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`transition-colors duration-200 ${
                      isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Paths */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Learning Paths
            </h3>
            <ul className="space-y-3">
              {learningPaths.map((path) => (
                <li key={path.name}>
                  <Link
                    href={path.href}
                    className={`transition-colors duration-200 ${
                      isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'
                    }`}
                  >
                    {path.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link
                    href={resource.href}
                    className={`transition-colors duration-200 ${
                      isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'
                    }`}
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl p-8 mb-12`}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Terminal className="h-8 w-8 text-emerald-500 mr-3" />
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Stay Updated with Latest Security Trends
              </h3>
            </div>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Get weekly cybersecurity insights, new tutorials, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-xl border text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                } focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200`}
              />
              <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className={`${isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'} rounded-2xl p-8 mb-12`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className={`p-3 rounded-xl ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'} mb-4`}>
                <Mail className="h-6 w-6 text-emerald-500" />
              </div>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Email Us</h4>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>contact@hacktheshell.com</p>
            </div>
            <div className="flex flex-col items-center">
              <div className={`p-3 rounded-xl ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-100'} mb-4`}>
                <Shield className="h-6 w-6 text-cyan-500" />
              </div>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Security</h4>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>security@hacktheshell.com</p>
            </div>
            <div className="flex flex-col items-center">
              <div className={`p-3 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'} mb-4`}>
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Community</h4>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Join Discord Server</p>
            </div>
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {company.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm transition-colors duration-200 ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} flex flex-col sm:flex-row justify-between items-center`}>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 sm:mb-0`}>
            © 2024 HackTheShell. All rights reserved. Built with security in mind.
          </div>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secured by SSL</span>
            </div>
            <div className={`flex items-center space-x-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <Terminal className="h-4 w-4 text-emerald-500" />
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;