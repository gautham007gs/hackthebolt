import React, { useState } from 'react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Clock, Users, Star, BookOpen, CheckCircle, Lock, Download, Share2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';

const TutorialDetailPage = () => {
  const { id } = useParams();
  const { isDark } = useTheme();
  const { getCourseProgress, updateCourseProgress } = useProgress();
  const [activeLesson, setActiveLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock tutorial data - in real app, fetch based on id
  const tutorial = {
    id: '1',
    title: 'Complete Web Application Security Testing',
    description: 'Master web application penetration testing with hands-on labs covering OWASP Top 10, SQL injection, XSS, and more advanced attack vectors.',
    level: 'Intermediate',
    category: 'Web Security',
    duration: '6 hours',
    students: '15.2K',
    rating: 4.9,
    reviews: 1247,
    instructor: {
      name: 'Sarah Chen',
      title: 'Senior Security Consultant',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Sarah is a certified ethical hacker with over 10 years of experience in cybersecurity consulting.'
    },
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
    price: 'Free',
    whatYouLearn: [
      'Identify and exploit common web vulnerabilities',
      'Perform comprehensive security assessments',
      'Use professional penetration testing tools',
      'Write detailed security reports',
      'Understand OWASP Top 10 vulnerabilities',
      'Implement security best practices'
    ],
    requirements: [
      'Basic understanding of web technologies (HTML, HTTP)',
      'Familiarity with command line interface',
      'No prior security experience required'
    ],
    lessons: [
      {
        id: '1',
        title: 'Introduction to Web Application Security',
        duration: '15 min',
        type: 'video',
        free: true,
        completed: false
      },
      {
        id: '2',
        title: 'Setting Up Your Testing Environment',
        duration: '20 min',
        type: 'video',
        free: true,
        completed: false
      },
      {
        id: '3',
        title: 'Understanding the OWASP Top 10',
        duration: '25 min',
        type: 'video',
        free: false,
        completed: false
      },
      {
        id: '4',
        title: 'SQL Injection Fundamentals',
        duration: '30 min',
        type: 'video',
        free: false,
        completed: false
      },
      {
        id: '5',
        title: 'Hands-on SQL Injection Lab',
        duration: '45 min',
        type: 'lab',
        free: false,
        completed: false
      },
      {
        id: '6',
        title: 'Cross-Site Scripting (XSS) Attacks',
        duration: '35 min',
        type: 'video',
        free: false,
        completed: false
      },
      {
        id: '7',
        title: 'XSS Lab Exercise',
        duration: '40 min',
        type: 'lab',
        free: false,
        completed: false
      },
      {
        id: '8',
        title: 'Authentication and Session Management',
        duration: '30 min',
        type: 'video',
        free: false,
        completed: false
      }
    ]
  };

  const progress = getCourseProgress(tutorial.id);
  const completionPercentage = progress ? progress.progress : 0;

  const handleLessonClick = (index: number, lesson: any) => {
    if (lesson.free || progress) {
      setActiveLesson(index);
      updateCourseProgress(tutorial.id, Math.max(completionPercentage, (index + 1) / tutorial.lessons.length * 100), lesson.id);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300';
      case 'Intermediate': return isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Advanced': return isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300';
      default: return isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'} pt-20`}
    >
      {/* Breadcrumb */}
      <div className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-4`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/tutorials"
            className={`inline-flex items-center space-x-2 ${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500'} transition-colors duration-200`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Tutorials</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="relative mb-8">
              <div className={`aspect-video ${isDark ? 'bg-gray-900' : 'bg-gray-100'} rounded-xl overflow-hidden relative`}>
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-6 rounded-full transition-all duration-200 transform hover:scale-110"
                  >
                    <Play className="h-12 w-12 ml-1" />
                  </button>
                </div>
              </div>
              
              {/* Progress Bar */}
              {completionPercentage > 0 && (
                <div className={`mt-4 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-full h-2`}>
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              )}
            </div>

            {/* Tutorial Info */}
            <div className={`${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-6 mb-8`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getLevelColor(tutorial.level)}`}>
                      {tutorial.level}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-600'} font-medium`}>
                      {tutorial.category}
                    </span>
                  </div>
                  <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {tutorial.title}
                  </h1>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
                    {tutorial.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-600'} transition-colors duration-200`}>
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-600'} transition-colors duration-200`}>
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{tutorial.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{tutorial.students} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{tutorial.rating} ({tutorial.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className={`${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-6 mb-8`}>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                What You'll Learn
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {tutorial.whatYouLearn.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className={`${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-6 mb-8`}>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Requirements
              </h2>
              <ul className="space-y-2">
                {tutorial.requirements.map((requirement, index) => (
                  <li key={index} className={`flex items-start space-x-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="text-emerald-500 mt-2">•</span>
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructor */}
            <div className={`${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-6`}>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Instructor
              </h2>
              <div className="flex items-start space-x-4">
                <img
                  src={tutorial.instructor.avatar}
                  alt={tutorial.instructor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                    {tutorial.instructor.name}
                  </h3>
                  <p className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'} font-medium mb-2`}>
                    {tutorial.instructor.title}
                  </p>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {tutorial.instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Course Content */}
            <div className={`${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-6 sticky top-24`}>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Course Content
              </h3>
              <div className="space-y-2">
                {tutorial.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonClick(index, lesson)}
                    disabled={!lesson.free && !progress}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      activeLesson === index
                        ? isDark ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-emerald-100 border-emerald-300'
                        : isDark ? 'bg-gray-800/50 hover:bg-gray-800 border-gray-700/50' : 'bg-white hover:bg-gray-50 border-gray-200'
                    } border ${!lesson.free && !progress ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          lesson.completed
                            ? 'bg-emerald-500 text-white'
                            : activeLesson === index
                            ? isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                            : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : lesson.type === 'video' ? (
                            <Play className="h-4 w-4" />
                          ) : (
                            <BookOpen className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'} text-sm`}>
                            {lesson.title}
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {lesson.duration}
                          </div>
                        </div>
                      </div>
                      {!lesson.free && !progress && (
                        <Lock className={`h-4 w-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              {!progress && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                    Enroll Now - {tutorial.price}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorialDetailPage;