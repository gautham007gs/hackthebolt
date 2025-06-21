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
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand & Newsletter - Expanded to take more space on desktop */}
          <div className="lg:col-span-2">
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
            
            {/* Big Responsive Newsletter CTA - Fixed Desktop Sizing */}
            <div className={`p-6 sm:p-8 md:p-10 xl:p-12 rounded-3xl relative overflow-hidden ${
              isDark ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-emerald-500/30' : 'bg-gradient-to-br from-emerald-50 to-cyan-50 border-emerald-200'
            } border-2`}>
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 md:gap-6 mb-6">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl ${
                    isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'
                  } flex items-center justify-center flex-shrink-0`}>
                    <Shield className={`h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={`text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2 leading-tight`}>
                      Join 10,000+ Security Professionals
                    </h3>
                    <p className={`text-base sm:text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                      Get exclusive threat intelligence, tutorials, and security alerts
                    </p>
                  </div>
                </div>
                
                {subscribed ? (
                  <div className="flex items-center justify-center space-x-3 text-emerald-500 text-lg font-medium py-4">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span>Successfully subscribed! Welcome to the community.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your professional email"
                        className={`flex-1 px-6 py-4 rounded-2xl border-2 text-base lg:text-lg ${
                          isDark 
                            ? 'bg-gray-800/80 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-400' 
                            : 'bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-600'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 backdrop-blur-sm transition-all duration-200`}
                        required
                      />
                      <button
                        type="submit"
                        className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-2xl font-bold text-base lg:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2 shadow-lg whitespace-nowrap min-w-[200px]"
                      >
                        <Send className="h-5 w-5" />
                        <span>Subscribe Free</span>
                      </button>
                    </div>
                    <div className="flex items-center justify-center space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <span>✓ No spam</span>
                      <span>✓ Unsubscribe anytime</span>
                      <span>✓ Weekly insights</span>
                    </div>
                  </form>
                )}
              </div>
              
              {/* Enhanced background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tr from-emerald-400/15 to-cyan-400/15 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full -translate-x-8 -translate-y-8"></div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2 grid md:grid-cols-3 gap-8">
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