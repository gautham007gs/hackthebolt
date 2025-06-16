import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Clock, Star, Target, Flag, Zap, Award } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const CTFPage = () => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'} pt-20`}
    >
      {/* Hero Section */}
      <section className={`py-20 ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'} relative overflow-hidden`}>
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-500/20'} rounded-full blur-3xl animate-pulse`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${isDark ? 'bg-teal-500/10' : 'bg-teal-500/20'} rounded-full blur-3xl animate-pulse delay-1000`}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={`inline-flex items-center space-x-3 ${isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-100 border-emerald-300'} border rounded-full px-6 py-3 mb-6`}>
              <Flag className={`h-5 w-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <span className={`${isDark ? 'text-emerald-400' : 'text-emerald-700'} font-semibold`}>Capture The Flag Competitions</span>
            </div>
            
            <h1 className={`text-5xl lg:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
              Compete & <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Conquer</span>
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-8`}>
              Test your cybersecurity skills against other professionals in exciting CTF competitions. 
              Solve challenges, earn points, and climb the leaderboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-emerald-500/25 flex items-center justify-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Join Competition</span>
              </button>
              <button className={`border-2 ${isDark ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : 'border-emerald-600/30 text-emerald-600 hover:bg-emerald-50'} px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2`}>
                <Target className="h-5 w-5" />
                <span>Practice Challenges</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl p-12`}>
              <Trophy className={`h-24 w-24 ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mx-auto mb-8`} />
              <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
                CTF Platform Coming Soon!
              </h2>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8 leading-relaxed`}>
                We're building an exciting Capture The Flag platform where you can compete with cybersecurity 
                professionals worldwide. Get ready for challenging puzzles, real-world scenarios, and epic competitions!
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'} rounded-full mb-4`}>
                    <Flag className={`h-8 w-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Weekly Competitions
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                    Regular CTF events with varying difficulty levels
                  </p>
                </div>
                
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'} rounded-full mb-4`}>
                    <Users className={`h-8 w-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Team Challenges
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                    Collaborate with teammates to solve complex puzzles
                  </p>
                </div>
                
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'} rounded-full mb-4`}>
                    <Award className={`h-8 w-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Prizes & Recognition
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                    Win prizes and earn recognition in the community
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
                  Get Notified When Ready
                </button>
                <button className={`${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} px-8 py-3 rounded-xl font-semibold transition-all duration-200`}>
                  Practice with Labs
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default CTFPage;