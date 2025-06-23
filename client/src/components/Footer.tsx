import React, { useState } from 'react';
import { Link } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';
import { Github, Twitter, Linkedin, Youtube, Send, ChevronRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const footerLinks = {
    learn: [
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Labs', href: '/labs' },
      { name: 'CTF Challenges', href: '/ctf' },
      { name: 'Certifications', href: '/certifications' }
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Tools', href: '/github-tools' },
      { name: 'Community', href: '/community' },
      { name: 'Documentation', href: '/docs' }
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Privacy Policy', href: '/privacy' }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/hacktheshell' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/hacktheshell' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/hacktheshell' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/hacktheshell' }
  ];

  return (
    <footer className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section - Full Width Professional Design */}
        <div className="mb-16">
          <div className={`relative overflow-hidden rounded-3xl ${
            isDark ? 'bg-gradient-to-br from-emerald-900/50 via-gray-800/30 to-cyan-900/50' : 'bg-gradient-to-br from-emerald-50 via-white to-cyan-50'
          } shadow-2xl border-0`}>
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full -translate-y-40 translate-x-40 filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-400/10 to-purple-400/10 rounded-full translate-y-48 -translate-x-48 filter blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/5 to-cyan-400/5 rounded-full filter blur-2xl"></div>
            </div>
            
            <div className="relative z-10 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center max-w-5xl mx-auto">
                {/* Content Section */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                    <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl ${
                      isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'
                    } flex items-center justify-center`}>
                      <Shield className={`h-8 w-8 lg:h-10 lg:w-10 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                    </div>
                    <div className="text-left">
                      <h3 className={`text-lg sm:text-xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} leading-tight`}>
                        Join 3,000+
                      </h3>
                      <p className={`text-base sm:text-lg lg:text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'} leading-tight`}>
                        Security Experts
                      </p>
                    </div>
                  </div>
                  <p className={`text-sm sm:text-base lg:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-6`}>
                    Get weekly insights, threat alerts, and expert tutorials delivered to your inbox.
                  </p>
                </div>

                {/* Form Section */}
                <div className="w-full">
                  {subscribed ? (
                    <div className="flex items-center justify-center space-x-3 text-emerald-500 text-base lg:text-xl font-medium py-6 lg:py-8 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl">
                      <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-center">Successfully subscribed! Welcome to the community.</span>
                    </div>
                  ) : (
                    <div className="space-y-4 lg:space-y-6">
                      <form onSubmit={handleSubscribe} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                          <div className="flex-1 relative group">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your professional email"
                              className={`w-full px-4 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5 rounded-2xl border-0 text-sm sm:text-base lg:text-lg font-medium ${
                                isDark 
                                  ? 'bg-white/10 text-white placeholder-gray-300 focus:bg-white/15' 
                                  : 'bg-white/80 text-gray-900 placeholder-gray-500 focus:bg-white'
                              } focus:outline-none focus:ring-3 focus:ring-emerald-400/30 backdrop-blur-lg transition-all duration-300 shadow-xl group-hover:shadow-2xl`}
                              required
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 text-white rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-emerald-500/25 border border-white/20 backdrop-blur-sm whitespace-nowrap"
                          >
                            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span>Get Alerts</span>
                          </motion.button>
                        </div>
                      </form>
                      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-400 mt-3">
                        <span className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>No spam, ever</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                          <span>Unsubscribe anytime</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Weekly insights</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className={`w-6 h-4 ${
                isDark ? 'bg-gray-900 border-emerald-400' : 'bg-gray-50 border-emerald-600'
              } border border-l-2 border-b-2 rounded-bl-md flex items-center justify-start pl-1 font-mono text-xs`}>
                <span className={`select-none ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>$</span>
              </div>
              <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                HackTheShell
              </span>
            </div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>
              Empowering the next generation of cybersecurity professionals through hands-on learning and real-world scenarios.
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
            <div>
              <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Learn
              </h4>
              <ul className="space-y-3">
                {footerLinks.learn.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors text-sm flex items-center group`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors text-sm flex items-center group`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors text-sm flex items-center group`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 mt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} flex flex-col md:flex-row md:items-center md:justify-between`}>
          <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4 md:mb-0`}>
            © 2024 HackTheShell. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors`}
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;