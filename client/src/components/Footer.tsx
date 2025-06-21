import React, { useState } from 'react';
import { Link } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';
import { Github, Twitter, Linkedin, Youtube, Send, ChevronRight, Shield } from 'lucide-react';

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
            isDark ? 'bg-gradient-to-r from-emerald-900/50 via-gray-800/50 to-cyan-900/50 border-emerald-500/20' : 'bg-gradient-to-r from-emerald-50 via-gray-50 to-cyan-50 border-emerald-300'
          } border-2 shadow-2xl`}>
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full -translate-y-48 translate-x-48"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-400/15 to-cyan-400/15 rounded-full translate-y-40 -translate-x-40"></div>
            </div>
            
            <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Content Section */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                    <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl ${
                      isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'
                    } flex items-center justify-center`}>
                      <Shield className={`h-8 w-8 lg:h-10 lg:w-10 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                    </div>
                    <div className="text-left">
                      <h3 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} leading-tight`}>
                        Join 10,000+
                      </h3>
                      <p className={`text-xl sm:text-2xl lg:text-3xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'} leading-tight`}>
                        Security Professionals
                      </p>
                    </div>
                  </div>
                  <p className={`text-lg sm:text-xl lg:text-2xl ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-8`}>
                    Get exclusive threat intelligence, cutting-edge tutorials, and real-time security alerts delivered directly to your inbox.
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
                        <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your professional email"
                            className={`w-full px-4 py-3 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl border-2 text-base lg:text-lg ${
                              isDark 
                                ? 'bg-gray-800/80 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-400' 
                                : 'bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-600'
                            } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 backdrop-blur-sm transition-all duration-200 shadow-lg`}
                            required
                          />
                          <button
                            type="submit"
                            className="w-full lg:w-auto px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-xl lg:rounded-2xl font-bold text-base lg:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 shadow-lg lg:min-w-[220px]"
                          >
                            <Send className="h-5 w-5 lg:h-6 lg:w-6" />
                            <span>Subscribe Free</span>
                          </button>
                        </div>
                      </form>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>No spam</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
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