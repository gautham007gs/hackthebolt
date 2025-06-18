import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Zap, 
  Shield, 
  Target, 
  Award,
  TrendingUp,
  CheckCircle,
  Lock,
  Flame
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

interface GamificationSystemProps {
  userId: string;
  currentLevel: number;
  currentXP: number;
  totalXP: number;
  streak: number;
  achievements: Achievement[];
  onAchievementClick?: (achievement: Achievement) => void;
}

const GamificationSystem: React.FC<GamificationSystemProps> = ({
  userId,
  currentLevel,
  currentXP,
  totalXP,
  streak,
  achievements,
  onAchievementClick
}) => {
  const { isDark } = useTheme();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  const xpToNextLevel = 1000 * currentLevel;
  const progressPercent = (currentXP / xpToNextLevel) * 100;

  const getRarityColor = (rarity: Achievement['rarity']) => {
    const colors = {
      common: isDark ? 'from-gray-600 to-gray-500' : 'from-gray-400 to-gray-300',
      rare: isDark ? 'from-blue-600 to-blue-500' : 'from-blue-500 to-blue-400',
      epic: isDark ? 'from-purple-600 to-purple-500' : 'from-purple-500 to-purple-400',
      legendary: isDark ? 'from-yellow-600 to-yellow-500' : 'from-yellow-500 to-yellow-400'
    };
    return colors[rarity];
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '🔥🔥🔥';
    if (streak >= 14) return '🔥🔥';
    if (streak >= 7) return '🔥';
    return '⚡';
  };

  useEffect(() => {
    // Check for new achievements
    const unlockedToday = achievements.filter(a => 
      a.unlockedAt && new Date(a.unlockedAt).toDateString() === new Date().toDateString()
    );
    setNewAchievements(unlockedToday);
  }, [achievements]);

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-full bg-gradient-to-r ${isDark ? 'from-emerald-500 to-teal-500' : 'from-emerald-600 to-teal-600'}`}>
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Level {currentLevel}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentXP.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              {totalXP.toLocaleString()}
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Total XP
            </p>
          </div>
        </div>

        <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3 mb-2`}>
          <motion.div
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} text-right`}>
          {Math.round(progressPercent)}% to next level
        </p>
      </div>

      {/* Streak Counter */}
      <div className={`${isDark ? 'bg-gradient-to-r from-orange-900/50 to-red-900/50 border-orange-500/30' : 'bg-gradient-to-r from-orange-100 to-red-100 border-orange-300'} border rounded-xl p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Flame className={`h-8 w-8 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {streak} Day Streak {getStreakEmoji(streak)}
              </h3>
              <p className={`text-sm ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
                Keep learning to maintain your streak!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
          <Trophy className="h-6 w-6 mr-2" />
          Recent Achievements
        </h3>
        
        {newAchievements.length === 0 ? (
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Complete tutorials and labs to unlock achievements!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {newAchievements.slice(0, 4).map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-105 bg-gradient-to-r ${getRarityColor(achievement.rarity)} border-transparent`}
                onClick={() => onAchievementClick?.(achievement)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{achievement.title}</h4>
                    <p className="text-sm text-white/80">{achievement.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="h-3 w-3 text-yellow-300" />
                      <span className="text-xs text-white/90">{achievement.points} XP</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Completed', 
            value: achievements.filter(a => a.unlockedAt).length,
            icon: CheckCircle,
            color: 'emerald'
          },
          { 
            label: 'In Progress', 
            value: achievements.filter(a => !a.unlockedAt && a.progress).length,
            icon: TrendingUp,
            color: 'blue'
          },
          { 
            label: 'Locked', 
            value: achievements.filter(a => !a.unlockedAt && !a.progress).length,
            icon: Lock,
            color: 'gray'
          },
          { 
            label: 'Legendary', 
            value: achievements.filter(a => a.rarity === 'legendary' && a.unlockedAt).length,
            icon: Award,
            color: 'yellow'
          }
        ].map((stat, index) => (
          <div key={index} className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4 text-center`}>
            <stat.icon className={`h-6 w-6 mx-auto mb-2 ${
              stat.color === 'emerald' ? (isDark ? 'text-emerald-400' : 'text-emerald-600') :
              stat.color === 'blue' ? (isDark ? 'text-blue-400' : 'text-blue-600') :
              stat.color === 'yellow' ? (isDark ? 'text-yellow-400' : 'text-yellow-600') :
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setShowLevelUp(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-md mx-4 text-center`}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-4"
              >
                <Trophy className="h-16 w-16 text-yellow-500" />
              </motion.div>
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                Level Up!
              </h2>
              <p className={`text-xl ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mb-4`}>
                You've reached Level {currentLevel}!
              </p>
              <button
                onClick={() => setShowLevelUp(false)}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Learning
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamificationSystem;