import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  className = '', 
  showPercentage = false 
}) => {
  const { isDark } = useTheme();

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
        <motion.div
          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {showPercentage && (
        <div className={`text-right text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;