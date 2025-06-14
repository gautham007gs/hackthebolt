import React, { useState } from 'react';
import { Users, MessageSquare, Award, Mail, ArrowRight, Star, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Community = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const communityStats = [
    { icon: Users, label: 'Active Members', value: '50,000+' },
    { icon: MessageSquare, label: 'Daily Discussions', value: '2,500+' },
    { icon: Award, label: 'Certifications Earned', value: '15,000+' },
    { icon: Star, label: 'Success Stories', value: '8,500+' }
  ];

  const benefits = [
    {
      icon: MessageSquare,
      title: 'Expert Discussions',
      description: 'Engage with industry professionals and get answers to your toughest security questions.'
    },
    {
      icon: Zap,
      title: 'Instant Updates',
      description: 'Be the first to know about new vulnerabilities, tools, and security developments.'
    },
    {
      icon: Award,
      title: 'Career Opportunities',
      description: 'Access exclusive job postings and connect with hiring managers in cybersecurity.'
    },
    {
      icon: Users,
      title: 'Networking',
      description: 'Build professional relationships with peers and mentors in the security community.'
    }
  ];

  return (
    <section id="community" className={`py-20 ${isDark ? 'bg-black' : 'bg-white'} relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/3 left-0 w-96 h-96 ${isDark ? 'bg-emerald-500/5' : 'bg-emerald-500/10'} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-1/3 right-0 w-96 h-96 ${isDark ? 'bg-teal-500/5' : 'bg-teal-500/10'} rounded-full blur-3xl`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Community Stats */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
            Join Our <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Community</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-12`}>
            Connect with thousands of cybersecurity professionals, share knowledge, and advance your career together.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {communityStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${isDark ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20' : 'bg-gradient-to-br from-emerald-100 to-teal-100'} rounded-full mb-4`}>
                    <Icon className={`h-8 w-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{stat.value}</div>
                  <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`${isDark ? 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-900/80 hover:border-emerald-500/30' : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-emerald-300'} border rounded-xl p-6 text-center transition-all duration-300`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${isDark ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20' : 'bg-gradient-to-br from-emerald-100 to-teal-100'} rounded-lg mb-4`}>
                  <Icon className={`h-6 w-6 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>{benefit.title}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Newsletter Signup */}
        <div className={`${isDark ? 'bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-emerald-500/20' : 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'} border rounded-2xl p-8 lg:p-12 text-center`}>
          <div className="max-w-3xl mx-auto">
            <div className={`inline-flex items-center justify-center w-16 h-16 ${isDark ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20' : 'bg-gradient-to-br from-emerald-100 to-teal-100'} rounded-full mb-6`}>
              <Mail className={`h-8 w-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            </div>
            
            <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Stay Ahead of Cyber Threats
            </h3>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
              Get weekly cybersecurity insights, latest vulnerability reports, and exclusive tutorials 
              delivered straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`flex-1 ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'} border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-emerald-500`}
              />
              <button
                type="submit"
                className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </form>

            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              Join 25,000+ security professionals. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Community Actions */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className={`${isDark ? 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-900/80 hover:border-emerald-500/30' : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-emerald-300'} border rounded-xl p-8 text-center transition-all duration-300`}>
            <MessageSquare className={`h-12 w-12 ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mx-auto mb-4`} />
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Join Discord</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Connect with the community in real-time, participate in discussions, and get instant help.
            </p>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105">
              Join Discord Server
            </button>
          </div>

          <div className={`${isDark ? 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-900/80 hover:border-emerald-500/30' : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-emerald-300'} border rounded-xl p-8 text-center transition-all duration-300`}>
            <Award className={`h-12 w-12 ${isDark ? 'text-teal-400' : 'text-teal-600'} mx-auto mb-4`} />
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Contribute</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Share your knowledge by writing tutorials, reporting bugs, or contributing to open-source projects.
            </p>
            <button className={`${isDark ? 'bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-gray-300 hover:text-white' : 'bg-gray-200 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-gray-700 hover:text-white'} px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105`}>
              Start Contributing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;