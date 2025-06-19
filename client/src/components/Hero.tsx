import React from 'react';
import { ArrowRight, Play, Shield, Code, Lock, Terminal } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import AnimatedTerminal from './AnimatedTerminal';

const Hero = () => {
  const { isDark } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} relative overflow-hidden pt-20`}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 left-1/4 w-72 h-72 ${isDark ? 'bg-emerald-500/5' : 'bg-emerald-500/8'} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-72 h-72 ${isDark ? 'bg-teal-500/5' : 'bg-teal-500/8'} rounded-full blur-3xl`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${isDark ? 'bg-cyan-500/3' : 'bg-cyan-500/5'} rounded-full blur-3xl`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className={`inline-flex items-center space-x-3 ${isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'} border rounded-full px-6 py-3`}>
                <Shield className={`h-5 w-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <span className={`${isDark ? 'text-emerald-400' : 'text-emerald-700'} font-semibold`}>Ethical Hacking Academy</span>
              </div>
              
              <h1 className={`text-5xl lg:text-7xl font-bold leading-tight`}>
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Unleash</span>
                <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}> Your</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">Cyber Genius</span>
              </h1>
              
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed max-w-2xl`}>
                From zero to cybersecurity hero in record time. Master elite hacking techniques, 
                build bulletproof defenses, and dominate the digital battlefield with cutting-edge skills 
                that make you unstoppable.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('tutorials')}
                className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <span>Start Free Course</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button className={`group border-2 ${isDark ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : 'border-emerald-600/30 text-emerald-600 hover:bg-emerald-50'} px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 hover:scale-105 hover:-translate-y-1 transform`}>
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Enhanced Stats */}
            <div className={`grid grid-cols-3 gap-8 pt-8 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200'}`}>
              {[
                { value: '50K+', label: 'Students' },
                { value: '200+', label: 'Tutorials' },
                { value: '98%', label: 'Success Rate' }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-emerald-500 transition-colors duration-300`}>
                    {stat.value}
                  </div>
                  <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Animated Terminal */}
          <div className="relative">
            <AnimatedTerminal className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;