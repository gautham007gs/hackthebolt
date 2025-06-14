import React from 'react';
import { ArrowRight, Play, Shield, Code, Lock, Terminal } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Hero = () => {
  const { isDark } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'} relative overflow-hidden pt-20`}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-500/20'} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${isDark ? 'bg-teal-500/10' : 'bg-teal-500/20'} rounded-full blur-3xl animate-pulse delay-1000`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/15'} rounded-full blur-3xl animate-pulse delay-500`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className={`inline-flex items-center space-x-3 ${isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-100 border-emerald-300'} border rounded-full px-6 py-3 backdrop-blur-sm`}>
                <Shield className={`h-5 w-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <span className={`${isDark ? 'text-emerald-400' : 'text-emerald-700'} font-semibold`}>Ethical Hacking Academy</span>
              </div>
              
              <h1 className={`text-5xl lg:text-7xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} leading-tight`}>
                Master
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"> Cyber</span>
                <br />
                Security
              </h1>
              
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed max-w-2xl`}>
                Learn ethical hacking, penetration testing, and cybersecurity with hands-on tutorials, 
                expert insights, and real-world scenarios. Join thousands of security professionals 
                building a safer digital world.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('tutorials')}
                className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-emerald-500/25 flex items-center justify-center space-x-3"
              >
                <span>Start Free Course</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button className={`group border-2 ${isDark ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : 'border-emerald-600/30 text-emerald-600 hover:bg-emerald-50'} px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3`}>
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

          {/* Enhanced Terminal Visual */}
          <div className="relative">
            <div className={`relative ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-emerald-500/20' : 'bg-gradient-to-br from-white to-gray-50 border-emerald-300'} rounded-2xl p-8 border shadow-2xl backdrop-blur-sm`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm font-mono`}>
                    terminal@hacktheshell:~$
                  </span>
                </div>
                
                <div className="space-y-3 font-mono text-sm">
                  <div className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'} flex items-center space-x-2`}>
                    <Terminal className="h-4 w-4" />
                    <span>$ nmap -sV target_host</span>
                  </div>
                  <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'} pl-6`}>Starting Nmap scan...</div>
                  <div className={`${isDark ? 'text-cyan-400' : 'text-cyan-600'} pl-6`}>PORT    STATE SERVICE VERSION</div>
                  <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'} pl-6`}>22/tcp  open  ssh     OpenSSH 8.2</div>
                  <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'} pl-6`}>80/tcp  open  http    Apache 2.4.41</div>
                  <div className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'} flex items-center space-x-2`}>
                    <Terminal className="h-4 w-4" />
                    <span>$ gobuster dir -u http://target</span>
                  </div>
                  <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'} pl-6`}>Scanning directories...</div>
                  <div className={`${isDark ? 'text-yellow-400' : 'text-yellow-600'} pl-6`}>/admin (Status: 200)</div>
                  <div className={`${isDark ? 'text-yellow-400' : 'text-yellow-600'} pl-6`}>/login (Status: 302)</div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-3 shadow-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-3 shadow-lg">
                <Lock className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;