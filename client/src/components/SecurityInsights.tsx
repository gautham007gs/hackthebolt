import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Users, Globe, Eye, Clock, Star, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const SecurityInsights = () => {
  const { isDark } = useTheme();

  const insights = [
    {
      icon: Shield,
      title: "Active Security Threats",
      value: "2,847",
      change: "+12%",
      description: "New vulnerabilities detected this month"
    },
    {
      icon: Users,
      title: "Community Members",
      value: "45,000+",
      change: "+23%",
      description: "Cybersecurity professionals learning daily"
    },
    {
      icon: Globe,
      title: "Labs Completed",
      value: "128,492",
      change: "+18%",
      description: "Hands-on practice sessions this week"
    },
    {
      icon: Star,
      title: "Success Rate",
      value: "94.7%",
      change: "+2.1%",
      description: "Students passing certification exams"
    }
  ];

  const recentUpdates = [
    {
      title: "New OWASP Top 10 2024 Course",
      description: "Comprehensive guide to the latest web application security risks",
      time: "2 hours ago",
      category: "Course"
    },
    {
      title: "Advanced Penetration Testing Lab",
      description: "Real-world scenarios for enterprise security testing",
      time: "5 hours ago",
      category: "Lab"
    },
    {
      title: "Zero-Day Vulnerability Alert",
      description: "Critical security advisory for Apache Log4j",
      time: "1 day ago",
      category: "Alert"
    }
  ];

  return (
    <section className={`py-20 ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <TrendingUp className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                Security Intelligence Hub
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Real-time cybersecurity metrics, threat intelligence, and community insights to keep you ahead of emerging threats
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Stats Grid */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 sm:p-6 rounded-xl border ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  } shadow-sm hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${
                        isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'
                      }`}>
                        <insight.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={`font-semibold text-sm sm:text-base ${
                          isDark ? 'text-gray-200' : 'text-gray-800'
                        } break-words leading-tight`}>
                          {insight.title}
                        </h3>
                      </div>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded ${
                      insight.change.startsWith('+') 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {insight.change}
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                    {insight.value}
                  </div>
                  <p className={`text-xs sm:text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  } break-words leading-relaxed`}>
                    {insight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-4 sm:p-6 rounded-xl border ${
                isDark 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              } shadow-sm h-fit`}
            >
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className={`font-semibold text-lg ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  Recent Updates
                </h3>
              </div>
              
              <div className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className={`p-4 rounded-lg border ${
                      isDark 
                        ? 'border-gray-700 hover:border-gray-600 hover:bg-gray-750' 
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    } transition-all duration-200`}>
                      <div className="flex items-start justify-between mb-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          update.category === 'Course' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                            : update.category === 'Lab'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {update.category}
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{update.time}</span>
                        </div>
                      </div>
                      <h4 className={`font-medium mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-sm sm:text-base ${
                        isDark ? 'text-gray-200' : 'text-gray-800'
                      } break-words leading-tight`}>
                        {update.title}
                      </h4>
                      <p className={`text-xs sm:text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      } break-words leading-relaxed`}>
                        {update.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityInsights;