import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'wouter';
import { 
  BookOpen, 
  Target, 
  Award, 
  TrendingUp, 
  Shield, 
  Users, 
  Clock,
  Star,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';

const DashboardPage = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();

  const recentActivity = [
    { type: 'completed', title: 'SQL Injection Fundamentals', time: '2 hours ago', points: 50 },
    { type: 'started', title: 'Advanced Penetration Testing', time: '1 day ago', points: 0 },
    { type: 'achievement', title: 'Security Expert Badge', time: '3 days ago', points: 100 }
  ];

  const recommendedCourses = [
    {
      title: 'Network Security Fundamentals',
      progress: 0,
      duration: '6 hours',
      difficulty: 'Beginner',
      image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Web Application Security',
      progress: 0,
      duration: '8 hours',
      difficulty: 'Intermediate',
      image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pt-20`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
            Welcome back, {user?.name}!
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Ready to continue your cybersecurity journey?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`${isDark ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20' : 'bg-gradient-to-br from-emerald-50 to-teal-50'} rounded-xl border ${isDark ? 'border-emerald-500/30' : 'border-emerald-200'} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>Points Earned</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>1,247</p>
              </div>
              <Award className={`h-8 w-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            </div>
          </div>

          <div className={`${isDark ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' : 'bg-gradient-to-br from-purple-50 to-pink-50'} rounded-xl border ${isDark ? 'border-purple-500/30' : 'border-purple-200'} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>Courses Completed</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>8</p>
              </div>
              <BookOpen className={`h-8 w-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
          </div>

          <div className={`${isDark ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20' : 'bg-gradient-to-br from-blue-50 to-cyan-50'} rounded-xl border ${isDark ? 'border-blue-500/30' : 'border-blue-200'} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Current Level</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Expert</p>
              </div>
              <Shield className={`h-8 w-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </div>

          <div className={`${isDark ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20' : 'bg-gradient-to-br from-yellow-50 to-orange-50'} rounded-xl border ${isDark ? 'border-yellow-500/30' : 'border-yellow-200'} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>Streak Days</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>12</p>
              </div>
              <TrendingUp className={`h-8 w-8 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6`}>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : activity.type === 'started'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {activity.type === 'completed' ? <CheckCircle className="h-5 w-5" /> : 
                       activity.type === 'started' ? <Play className="h-5 w-5" /> :
                       <Star className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {activity.title}
                      </p>
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {activity.time}
                        </span>
                        {activity.points > 0 && (
                          <span className="text-sm bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                            +{activity.points} points
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Courses */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6 mt-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Recommended for You
                </h3>
                <Link 
                  to="/tutorials"
                  className={`text-sm ${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} transition-colors duration-200`}
                >
                  View all
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {recommendedCourses.map((course, index) => (
                  <div key={index} className={`${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg p-4`}>
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                      {course.title}
                    </h4>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {course.duration}
                      </span>
                      <span className={`px-2 py-1 rounded-full ${
                        course.difficulty === 'Beginner' 
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {course.difficulty}
                      </span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 px-4 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 flex items-center justify-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span>Start Course</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6`}>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/tutorials"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Browse Tutorials</span>
                </Link>
                <Link
                  to="/labs"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Target className="h-5 w-5" />
                  <span>Practice Labs</span>
                </Link>
                <Link
                  to="/community"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Users className="h-5 w-5" />
                  <span>Join Community</span>
                </Link>
              </div>
            </div>

            {/* Progress Overview */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6`}>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Learning Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Web Security</span>
                    <span className={`text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>75%</span>
                  </div>
                  <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Network Security</span>
                    <span className={`text-sm font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>45%</span>
                  </div>
                  <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Cryptography</span>
                    <span className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>20%</span>
                  </div>
                  <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;