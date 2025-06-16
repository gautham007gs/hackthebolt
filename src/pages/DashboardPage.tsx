import React from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Target, Award, TrendingUp, Clock, Star, ArrowRight, Calendar, Activity } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import AnimatedCounter from '../components/AnimatedCounter';

const DashboardPage = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const { courseProgress, achievements, totalPoints } = useProgress();

  if (!user) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'} pt-20 flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Please sign in to view your dashboard
          </h2>
        </div>
      </div>
    );
  }

  const recentActivity = [
    { type: 'course', title: 'Completed SQL Injection Lab', time: '2 hours ago', points: 100 },
    { type: 'achievement', title: 'Earned "Web Security Expert" badge', time: '1 day ago', points: 50 },
    { type: 'course', title: 'Started Network Security Course', time: '3 days ago', points: 0 },
    { type: 'lab', title: 'Completed XSS Challenge', time: '5 days ago', points: 75 }
  ];

  const upcomingDeadlines = [
    { title: 'Complete Cryptography Assignment', date: '2024-12-20', priority: 'high' },
    { title: 'Submit Forensics Report', date: '2024-12-22', priority: 'medium' },
    { title: 'Attend Live Workshop', date: '2024-12-25', priority: 'low' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'} pt-20`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
            Welcome back, {user.name}!
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Continue your cybersecurity journey
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`${isDark ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30' : 'bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-300'} border rounded-xl p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-200'}`}>
                <TrendingUp className={`h-6 w-6 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              </div>
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <AnimatedCounter end={totalPoints} />
              </span>
            </div>
            <h3 className={`font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mb-1`}>Total Points</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>+150 this week</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-200'}`}>
                <BookOpen className={`h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <AnimatedCounter end={courseProgress.length} />
              </span>
            </div>
            <h3 className={`font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-1`}>Courses Enrolled</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>3 in progress</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-purple-500/20' : 'bg-purple-200'}`}>
                <Target className={`h-6 w-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <AnimatedCounter end={12} />
              </span>
            </div>
            <h3 className={`font-semibold ${isDark ? 'text-purple-400' : 'text-purple-600'} mb-1`}>Labs Completed</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>2 this week</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-yellow-500/20' : 'bg-yellow-200'}`}>
                <Award className={`h-6 w-6 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
              </div>
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <AnimatedCounter end={achievements.length} />
              </span>
            </div>
            <h3 className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-yellow-600'} mb-1`}>Achievements</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>1 new this week</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-6`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Continue Learning
                </h2>
                <button className={`${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500'} font-medium transition-colors duration-200`}>
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {courseProgress.slice(0, 3).map((course, index) => (
                  <div
                    key={course.courseId}
                    className={`${isDark ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-white hover:bg-gray-50'} rounded-lg p-4 transition-colors duration-200 cursor-pointer`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Web Application Security Testing
                      </h3>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {Math.round(course.progress)}% complete
                      </span>
                    </div>
                    <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2 mb-3`}>
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                      </span>
                      <button className={`${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500'} font-medium transition-colors duration-200 flex items-center space-x-1`}>
                        <span>Continue</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-6`}
            >
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
                Recent Activity
              </h2>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'course' ? (isDark ? 'bg-blue-500/20'  : 'bg-blue-100') :
                      activity.type === 'achievement' ? (isDark ? 'bg-yellow-500/20' : 'bg-yellow-100') :
                      (isDark ? 'bg-purple-500/20' : 'bg-purple-100')
                    }`}>
                      {activity.type === 'course' && <BookOpen className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />}
                      {activity.type === 'achievement' && <Award className={`h-4 w-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />}
                      {activity.type === 'lab' && <Target className={`h-4 w-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {activity.title}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {activity.time}
                      </p>
                    </div>
                    {activity.points > 0 && (
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                        +{activity.points} pts
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className={`${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-6`}
            >
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Recent Achievements
              </h3>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <div key={achievement.id} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'} text-sm`}>
                        {achievement.title}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        +{achievement.points} points
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Deadlines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className={`${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-6`}
            >
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Upcoming Deadlines
              </h3>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'} text-sm`}>
                        {deadline.title}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {deadline.date}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      deadline.priority === 'high' ? (isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700') :
                      deadline.priority === 'medium' ? (isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700') :
                      (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700')
                    }`}>
                      {deadline.priority}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className={`${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-6`}
            >
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                  Start New Lab
                </button>
                <button className={`w-full ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} px-4 py-3 rounded-lg font-semibold transition-all duration-200`}>
                  Browse Tutorials
                </button>
                <button className={`w-full ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} px-4 py-3 rounded-lg font-semibold transition-all duration-200`}>
                  Join Community
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;