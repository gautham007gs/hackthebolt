import React, { useState } from 'react';
import { Link } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';
import { Github, Twitter, Linkedin, Youtube, Send, ChevronRight } from 'lucide-react';

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
            <div className="flex items-center space-x-2 mb-6">
              <div className={`w-8 h-8 ${isDark ? 'bg-gray-800 border-emerald-400' : 'bg-gray-100 border-emerald-600'} border-2 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                _$
              </div>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                HackTheShell
              </span>
            </div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>
              Empowering the next generation of cybersecurity professionals through hands-on learning and real-world scenarios.
            </p>
            
            {/* Newsletter Signup */}
            <div>
              <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                Stay Updated
              </h4>
              {subscribed ? (
                <div className="text-emerald-500 text-sm font-medium">
                  ✓ Successfully subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`flex-1 px-3 py-2 rounded-l-lg border ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm`}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-r-lg transition-colors"
                  >
                    <Send className="h-4 w-4" />
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