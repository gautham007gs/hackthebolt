import React, { createContext, useContext, useState, useEffect } from 'react';

interface CourseProgress {
  courseId: string;
  progress: number;
  completedLessons: string[];
  lastAccessed: string;
  timeSpent: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  points: number;
}

interface ProgressContextType {
  courseProgress: CourseProgress[];
  achievements: Achievement[];
  totalPoints: number;
  updateCourseProgress: (courseId: string, progress: number, lessonId?: string) => void;
  unlockAchievement: (achievement: Achievement) => void;
  getCourseProgress: (courseId: string) => CourseProgress | undefined;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const savedProgress = localStorage.getItem('hacktheshell_progress');
    const savedAchievements = localStorage.getItem('hacktheshell_achievements');
    
    if (savedProgress) {
      setCourseProgress(JSON.parse(savedProgress));
    }
    
    if (savedAchievements) {
      const achievementData = JSON.parse(savedAchievements);
      setAchievements(achievementData);
      setTotalPoints(achievementData.reduce((total: number, achievement: Achievement) => total + achievement.points, 0));
    }
  }, []);

  const updateCourseProgress = (courseId: string, progress: number, lessonId?: string) => {
    setCourseProgress(prev => {
      const existingIndex = prev.findIndex(cp => cp.courseId === courseId);
      const now = new Date().toISOString();
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          progress,
          lastAccessed: now,
          timeSpent: updated[existingIndex].timeSpent + 1,
          completedLessons: lessonId && !updated[existingIndex].completedLessons.includes(lessonId)
            ? [...updated[existingIndex].completedLessons, lessonId]
            : updated[existingIndex].completedLessons
        };
        localStorage.setItem('hacktheshell_progress', JSON.stringify(updated));
        return updated;
      } else {
        const newProgress: CourseProgress = {
          courseId,
          progress,
          completedLessons: lessonId ? [lessonId] : [],
          lastAccessed: now,
          timeSpent: 1
        };
        const updated = [...prev, newProgress];
        localStorage.setItem('hacktheshell_progress', JSON.stringify(updated));
        return updated;
      }
    });
  };

  const unlockAchievement = (achievement: Achievement) => {
    setAchievements(prev => {
      if (prev.find(a => a.id === achievement.id)) return prev;
      
      const updated = [...prev, { ...achievement, unlockedAt: new Date().toISOString() }];
      setTotalPoints(prevPoints => prevPoints + achievement.points);
      localStorage.setItem('hacktheshell_achievements', JSON.stringify(updated));
      return updated;
    });
  };

  const getCourseProgress = (courseId: string): CourseProgress | undefined => {
    return courseProgress.find(cp => cp.courseId === courseId);
  };

  return (
    <ProgressContext.Provider value={{
      courseProgress,
      achievements,
      totalPoints,
      updateCourseProgress,
      unlockAchievement,
      getCourseProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};