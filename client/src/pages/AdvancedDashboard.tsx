import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3,
  TrendingUp,
  Shield,
  Target,
  Users,
  Calendar,
  Clock,
  Award,
  Zap,
  Activity,
  Globe,
  Lock,
  Eye,
  BookOpen,
  Code,
  Brain,
  Flame,
  Star,
  ChevronRight,
  Play,
  Download
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import SEOHead from '../components/SEOHead';
import VulnerabilityScanner from '../components/VulnerabilityScanner';
import AI_SecurityAssistant from '../components/AI_SecurityAssistant';
import RealTimeCollaboration from '../components/RealTimeCollaboration';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  category: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  earned: boolean;
  earnedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const AdvancedDashboard: React.FC = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'learning' | 'tools' | 'community'>('overview');

  const learningPaths: LearningPath[] = [
    {
      id: '1',
      title: 'Web Application Security',
      description: 'Master the art of securing web applications from common vulnerabilities',
      progress: 65,
      totalLessons: 12,
      completedLessons: 8,
      difficulty: 'intermediate',
      estimatedTime: '3 weeks',
      category: 'Web Security'
    },
    {
      id: '2',
      title: 'Network Penetration Testing',
      description: 'Learn to identify and exploit network vulnerabilities ethically',
      progress: 30,
      totalLessons: 15,
      completedLessons: 4,
      difficulty: 'advanced',
      estimatedTime: '6 weeks',
      category: 'Penetration Testing'
    },
    {
      id: '3',
      title: 'Digital Forensics Fundamentals',
      description: 'Understand the basics of digital forensics and incident response',
      progress: 90,
      totalLessons: 8,
      completedLessons: 7,
      difficulty: 'beginner',
      estimatedTime: '2 weeks',
      category: 'Forensics'
    }
  ];

  const recentAchievements: Achievement[] = [
    {
      id: '1',
      title: 'SQL Injection Master',
      description: 'Successfully completed all SQL injection challenges',
      icon: Shield,
      earned: true,
      earnedAt: new Date('2024-06-20'),
      rarity: 'rare'
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Maintained a 7-day learning streak',
      icon: Flame,
      earned: true,
      earnedAt: new Date('2024-06-18'),
      rarity: 'common'
    }
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Live CTF Competition',
      date: '2024-06-25',
      time: '14:00 UTC',
      participants: 156,
      prize: '$1000'
    },
    {
      id: '2',
      title: 'Web Security Workshop',
      date: '2024-06-27',
      time: '16:00 UTC',
      participants: 89,
      prize: 'Certificate'
    }
  ];

  const getDifficultyColor = (difficulty: LearningPath['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return isDark ? 'text-green-400' : 'text-green-600';
      case 'intermediate': return isDark ? 'text-yellow-400' : 'text-yellow-600';
      case 'advanced': return isDark ? 'text-red-400' : 'text-red-600';
      default: return isDark ? 'text-gray-400' : 'text-gray-600';
    }
  };

  return (
    <>
      <SEOHead 
        title="Advanced Dashboard - HackTheShell"
        description="Your personalized cybersecurity learning dashboard with progress tracking, tools, and AI assistance"
        keywords="cybersecurity dashboard, learning progress, security tools, AI assistant"
      />
      
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pt-16`}>
        {/* Header */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Welcome back, {user?.firstName || 'Cyber Warrior'}!
                </h1>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1 text-sm sm:text-base`}>
                  Continue your cybersecurity mastery journey
                </p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg ${isDark ? 'bg-emerald-600' : 'bg-emerald-100'}`}>
                  <Flame className={`w-3 h-3 sm:w-4 sm:h-4 ${isDark ? 'text-white' : 'text-emerald-600'}`} />
                  <span className={`font-semibold text-xs sm:text-sm ${isDark ? 'text-white' : 'text-emerald-600'}`}>
                    <span className="hidden sm:inline">15 Day Streak!</span>
                    <span className="sm:hidden">15 Days</span>
                  </span>
                </div>
                <div className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`} />
                  <span className={`font-semibold text-xs sm:text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Level {user?.level || 12}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="mt-4 sm:mt-6 flex space-x-4 sm:space-x-8 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'learning', label: 'Learning', icon: BookOpen },
                { id: 'tools', label: 'Tools', icon: Shield },
                { id: 'community', label: 'Community', icon: Users }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-1 sm:space-x-2 py-2 sm:py-3 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? `border-emerald-500 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`
                      : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                  }`}
                >
                  <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
              {/* Main Stats */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                  {[
                    { icon: Target, label: 'Challenges Completed', value: '47', color: 'text-emerald-500' },
                    { icon: Award, label: 'Achievements', value: '12', color: 'text-yellow-500' },
                    { icon: Clock, label: 'Hours Learned', value: '156', color: 'text-blue-500' },
                    { icon: TrendingUp, label: 'Global Rank', value: '#127', color: 'text-purple-500' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 sm:p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                        <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                        <div className="text-center sm:text-left">
                          <p className={`text-lg sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {stat.value}
                          </p>
                          <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Current Learning Progress */}
                <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Current Learning Progress
                  </h3>
                  <div className="space-y-4">
                    {learningPaths.slice(0, 2).map((path) => (
                      <div key={path.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {path.title}
                          </h4>
                          <span className={`text-sm ${getDifficultyColor(path.difficulty)}`}>
                            {path.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`flex-1 bg-gray-200 ${isDark ? 'bg-gray-700' : ''} rounded-full h-2`}>
                            <div 
                              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                              style={{width: `${path.progress}%`}}
                            ></div>
                          </div>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {path.completedLessons}/{path.totalLessons}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Achievements */}
                <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Recent Achievements
                  </h3>
                  <div className="space-y-3">
                    {recentAchievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-emerald-600' : 'bg-emerald-100'}`}>
                          <achievement.icon className={`w-5 h-5 ${isDark ? 'text-white' : 'text-emerald-600'}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {achievement.title}
                          </h4>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {achievement.description}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          achievement.rarity === 'rare' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {achievement.rarity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* AI Assistant Preview */}
                <div className={`p-6 rounded-xl ${isDark ? 'bg-gradient-to-br from-emerald-800 to-emerald-900' : 'bg-gradient-to-br from-emerald-50 to-emerald-100'} border ${isDark ? 'border-emerald-700' : 'border-emerald-200'}`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <Brain className={`w-6 h-6 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      AI Assistant
                    </h3>
                  </div>
                  <p className={`text-sm mb-4 ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    Get instant help with cybersecurity questions, vulnerability analysis, and learning guidance.
                  </p>
                  <button className="btn-primary w-full">
                    Start Conversation
                  </button>
                </div>

                {/* Upcoming Events */}
                <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Upcoming Events
                  </h3>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {event.title}
                        </h4>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
                          <p>{event.date} at {event.time}</p>
                          <p>{event.participants} participants • Prize: {event.prize}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    {[
                      { icon: Play, label: 'Start New Challenge', color: 'text-emerald-500' },
                      { icon: Book, label: 'Continue Learning', color: 'text-blue-500' },
                      { icon: Download, label: 'Get Certificates', color: 'text-purple-500' },
                      { icon: Users, label: 'Join Community', color: 'text-orange-500' }
                    ].map((action, index) => (
                      <button
                        key={index}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                        }`}
                      >
                        <action.icon className={`w-4 h-4 ${action.color}`} />
                        <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {action.label}
                        </span>
                        <ChevronRight className={`w-4 h-4 ml-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <VulnerabilityScanner />
                <div className="h-96">
                  <AI_SecurityAssistant />
                </div>
              </div>
              <div className="h-96">
                <RealTimeCollaboration />
              </div>
            </div>
          )}

          {/* Other tabs content would go here */}
          {activeTab === 'learning' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPaths.map((path, index) => (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(path.difficulty)} bg-opacity-20`}>
                      {path.difficulty}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {path.estimatedTime}
                    </span>
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {path.title}
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {path.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Progress</span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {path.completedLessons}/{path.totalLessons} lessons
                      </span>
                    </div>
                    <div className={`w-full bg-gray-200 ${isDark ? 'bg-gray-700' : ''} rounded-full h-2`}>
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{width: `${path.progress}%`}}
                      ></div>
                    </div>
                  </div>
                  <button className="btn-primary w-full">
                    {path.progress > 0 ? 'Continue Learning' : 'Start Path'}
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdvancedDashboard;