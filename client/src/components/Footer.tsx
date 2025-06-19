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
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-8 h-8 ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-emerald-400 text-emerald-400' 
                  : 'bg-gradient-to-br from-gray-100 to-gray-200 border-emerald-600 text-emerald-600'
              } border-2 rounded-lg flex items-center justify-center font-mono font-bold text-sm shadow-lg relative overflow-hidden`}>
                <div className={`absolute inset-0 ${
                  isDark ? 'bg-gradient-to-br from-gray-700/30 to-transparent' : 'bg-gradient-to-br from-white/50 to-transparent'
                } rounded-lg`} />
                <span className="relative z-10 select-none">_$</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  HackTheShell
                </span>
                <span className={`text-xs font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'} tracking-wider`}>
                  CYBER ACADEMY
                </span>
              </div>
            </div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>
              Empowering the next generation of cybersecurity professionals through hands-on learning and real-world scenarios.
            </p>
            
            {/* Enhanced Newsletter CTA */}
            <div className={`p-6 rounded-2xl border-2 border-dashed ${
              isDark ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-emerald-500/50 bg-emerald-50/50'
            }`}>
              <div className="flex items-center space-x-2 mb-3">
                <div className={`w-8 h-8 rounded-lg ${
                  isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'
                } flex items-center justify-center`}>
                  <Shield className={`h-4 w-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Security Alerts & Updates
                </h4>
              </div>
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Get instant notifications about critical vulnerabilities, new tutorials, and exclusive cybersecurity insights.
              </p>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-emerald-500 text-sm font-medium">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>Successfully subscribed!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm`}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-emerald-500/25"
                  >
                    <Send className="h-4 w-4" />
                    <span>Subscribe for Free</span>
                  </button>
                </form>
              )}
            </div>
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