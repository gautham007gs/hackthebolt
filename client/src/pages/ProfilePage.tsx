import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Camera, 
  Save, 
  Award, 
  Target, 
  Code, 
  Trophy, 
  Star, 
  MapPin, 
  Calendar, 
  Globe, 
  Github, 
  Linkedin, 
  Twitter,
  Shield,
  BookOpen,
  Zap,
  TrendingUp,
  Edit3,
  Settings,
  Lock,
  Eye,
  EyeOff,
  Upload,
  X,
  CheckCircle,
  Clock,
  Users,
  Activity,
  Briefcase,
  GraduationCap,
  Flag,
  Flame,
  Crown,
  BadgeCheck
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import SEOHead from '../components/SEOHead';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  earned: boolean;
  earnedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

interface Skill {
  name: string;
  level: number;
  category: 'penetration-testing' | 'network-security' | 'web-security' | 'cryptography' | 'forensics' | 'malware-analysis';
  experience: number;
  certifications: string[];
}

interface CyberChallenge {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  completedAt: Date;
  score: number;
  rank: number;
  timeSpent: number;
}

const ProfilePage: React.FC = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'achievements' | 'challenges' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    bio: user?.bio || 'Passionate about cybersecurity and ethical hacking. Always learning new techniques and staying updated with the latest threats.',
    location: 'San Francisco, CA',
    website: '',
    github: '',
    linkedin: '',
    twitter: '',
    specialization: 'Penetration Testing',
    yearsExperience: 3,
    currentGoal: 'CISSP Certification',
    privacy: {
      showEmail: false,
      showProgress: true,
      showAchievements: true,
      showChallenges: true
    }
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data for demonstration
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Blood',
      description: 'Complete your first CTF challenge',
      icon: Flag,
      earned: true,
      earnedAt: new Date('2024-01-15'),
      rarity: 'common',
      points: 10
    },
    {
      id: '2',
      title: 'Code Breaker',
      description: 'Solve 10 cryptography challenges',
      icon: Lock,
      earned: true,
      earnedAt: new Date('2024-02-20'),
      rarity: 'rare',
      points: 50
    },
    {
      id: '3',
      title: 'Elite Hacker',
      description: 'Reach top 1% in monthly leaderboard',
      icon: Crown,
      earned: false,
      rarity: 'legendary',
      points: 500
    },
    {
      id: '4',
      title: 'Mentor',
      description: 'Help 25 community members',
      icon: Users,
      earned: true,
      earnedAt: new Date('2024-03-10'),
      rarity: 'epic',
      points: 100
    }
  ];

  const skills: Skill[] = [
    {
      name: 'Penetration Testing',
      level: 85,
      category: 'penetration-testing',
      experience: 1200,
      certifications: ['CEH', 'OSCP']
    },
    {
      name: 'Network Security',
      level: 78,
      category: 'network-security',
      experience: 950,
      certifications: ['CCNA Security']
    },
    {
      name: 'Web Application Security',
      level: 92,
      category: 'web-security',
      experience: 1500,
      certifications: ['GWEB', 'OSWE']
    },
    {
      name: 'Digital Forensics',
      level: 65,
      category: 'forensics',
      experience: 720,
      certifications: ['GCFE']
    }
  ];

  const recentChallenges: CyberChallenge[] = [
    {
      id: '1',
      title: 'SQL Injection Master',
      difficulty: 'advanced',
      category: 'Web Security',
      completedAt: new Date('2024-06-20'),
      score: 950,
      rank: 12,
      timeSpent: 45
    },
    {
      id: '2',
      title: 'Buffer Overflow Expert',
      difficulty: 'expert',
      category: 'Binary Exploitation',
      completedAt: new Date('2024-06-18'),
      score: 1200,
      rank: 5,
      timeSpent: 120
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle image upload logic here
      console.log('Image uploaded:', file);
    }
  };

  const handleSave = () => {
    // Save profile data logic here
    setIsEditing(false);
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return isDark ? 'text-gray-400' : 'text-gray-600';
      case 'rare': return isDark ? 'text-blue-400' : 'text-blue-600';
      case 'epic': return isDark ? 'text-purple-400' : 'text-purple-600';
      case 'legendary': return isDark ? 'text-yellow-400' : 'text-yellow-600';
      default: return isDark ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: CyberChallenge['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return isDark ? 'text-green-400' : 'text-green-600';
      case 'intermediate': return isDark ? 'text-yellow-400' : 'text-yellow-600';
      case 'advanced': return isDark ? 'text-orange-400' : 'text-orange-600';
      case 'expert': return isDark ? 'text-red-400' : 'text-red-600';
      default: return isDark ? 'text-gray-400' : 'text-gray-600';
    }
  };

  return (
    <>
      <SEOHead 
        title="My Profile - HackTheShell"
        description="Manage your cybersecurity learning profile, track progress, and showcase achievements on HackTheShell"
        keywords="cybersecurity profile, hacking skills, achievements, progress tracking"
      />
      
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pt-16`}>
        {/* Profile Header */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Profile Picture */}
                <div className="relative">
                  <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center overflow-hidden border-4 ${isEditing ? 'border-emerald-500' : 'border-transparent'} transition-all duration-200`}>
                    {user?.profileImageUrl ? (
                      <img src={user.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className={`w-10 h-10 sm:w-14 sm:h-14 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                  </div>
                  {isEditing && (
                    <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-lg"
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* Profile Info */}
                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {profileData.firstName} {profileData.lastName}
                    </h1>
                    <div className="flex items-center justify-center sm:justify-start space-x-1">
                      <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                      <span className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Verified</span>
                    </div>
                  </div>
                  <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>@{profileData.username}</p>
                  <div className={`flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{profileData.specialization}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{profileData.yearsExperience} years experience</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 lg:mt-0 flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  {user?.level || 12}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Level</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {user?.points || 2847}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Points</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  {achievements.filter(a => a.earned).length}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Achievements</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  {recentChallenges.length + 23}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Challenges</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  #127
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Global Rank</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'skills', label: 'Skills', icon: Code },
                { id: 'achievements', label: 'Achievements', icon: Trophy },
                { id: 'challenges', label: 'Challenges', icon: Target },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? `border-emerald-500 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`
                      : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8 overflow-x-hidden">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Bio Section */}
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>About</h3>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    placeholder="Tell us about yourself, your cybersecurity journey, and your goals..."
                    className={`w-full h-32 p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  />
                ) : (
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    {profileData.bio || "No bio provided yet. Click 'Edit Profile' to add your story!"}
                  </p>
                )}
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Current Streak */}
                <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Current Streak</h4>
                    <Flame className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className={`text-2xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>15</span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>days</span>
                  </div>
                  <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    Keep going! Your longest streak was 23 days.
                  </p>
                </div>

                {/* Weekly Activity */}
                <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>This Week</h4>
                    <Activity className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>8</span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>challenges</span>
                  </div>
                  <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    +2 more than last week
                  </p>
                </div>

                {/* Next Goal */}
                <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Next Goal</h4>
                    <Target className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                      {profileData.currentGoal}
                    </p>
                    <div className={`w-full bg-gray-200 ${isDark ? 'bg-gray-700' : ''} rounded-full h-2`}>
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>65% complete</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h3>
                <div className="space-y-4">
                  {recentChallenges.slice(0, 3).map((challenge, index) => (
                    <div key={challenge.id} className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Completed {challenge.title}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {challenge.category} • Rank #{challenge.rank} • {challenge.timeSpent}min
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {new Date(challenge.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{skill.name}</h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {skill.experience}+ hours experience
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`text-lg font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                    <div className={`w-full bg-gray-200 ${isDark ? 'bg-gray-700' : ''} rounded-full h-3 mb-4`}>
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{width: `${skill.level}%`}}
                      ></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.certifications.map((cert, certIndex) => (
                        <span
                          key={certIndex}
                          className={`px-2 py-1 text-xs rounded-full ${
                            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 sm:p-6 rounded-xl border ${
                      achievement.earned
                        ? `${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`
                        : `${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-300'} opacity-60`
                    }`}
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`p-2 sm:p-3 rounded-full ${
                        achievement.earned
                          ? `${isDark ? 'bg-emerald-600' : 'bg-emerald-100'}`
                          : `${isDark ? 'bg-gray-700' : 'bg-gray-200'}`
                      }`}>
                        <achievement.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          achievement.earned
                            ? `${isDark ? 'text-white' : 'text-emerald-600'}`
                            : `${isDark ? 'text-gray-400' : 'text-gray-500'}`
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2">
                          <h4 className={`font-semibold text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                            {achievement.title}
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(achievement.rarity)} bg-opacity-20 self-start sm:self-auto mt-1 sm:mt-0`}>
                            {achievement.rarity}
                          </span>
                        </div>
                        <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3 leading-relaxed`}>
                          {achievement.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            +{achievement.points} pts
                          </span>
                          {achievement.earned && achievement.earnedAt && (
                            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                              {achievement.earnedAt.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {recentChallenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                          <Trophy className="w-6 h-6 text-yellow-500" />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {challenge.title}
                          </h4>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {challenge.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-lg font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            {challenge.score}
                          </span>
                          <span className={`text-sm ${getDifficultyColor(challenge.difficulty)} font-medium`}>
                            {challenge.difficulty}
                          </span>
                        </div>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          Rank #{challenge.rank} • {challenge.timeSpent}min
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {challenge.completedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Profile Settings */}
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Profile Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        First Name
                      </label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Social Links
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Github className="w-5 h-5 text-gray-500" />
                        <input
                          type="url"
                          placeholder="GitHub profile URL"
                          value={profileData.github}
                          onChange={(e) => setProfileData({...profileData, github: e.target.value})}
                          className={`flex-1 p-3 rounded-lg border ${
                            isDark 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Linkedin className="w-5 h-5 text-gray-500" />
                        <input
                          type="url"
                          placeholder="LinkedIn profile URL"
                          value={profileData.linkedin}
                          onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                          className={`flex-1 p-3 rounded-lg border ${
                            isDark 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Privacy Settings</h3>
                <div className="space-y-4">
                  {[
                    { key: 'showEmail', label: 'Show email address', description: 'Make your email visible to other users' },
                    { key: 'showProgress', label: 'Show learning progress', description: 'Display your progress and statistics' },
                    { key: 'showAchievements', label: 'Show achievements', description: 'Display your earned achievements' },
                    { key: 'showChallenges', label: 'Show completed challenges', description: 'Display your challenge history' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {setting.label}
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {setting.description}
                        </p>
                      </div>
                      <button
                        onClick={() => setProfileData({
                          ...profileData,
                          privacy: {
                            ...profileData.privacy,
                            [setting.key]: !profileData.privacy[setting.key as keyof typeof profileData.privacy]
                          }
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          profileData.privacy[setting.key as keyof typeof profileData.privacy]
                            ? 'bg-emerald-600'
                            : isDark ? 'bg-gray-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            profileData.privacy[setting.key as keyof typeof profileData.privacy]
                              ? 'translate-x-6'
                              : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;