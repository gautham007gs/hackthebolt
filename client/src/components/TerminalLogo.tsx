import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface TerminalLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const TerminalLogo: React.FC<TerminalLogoProps> = ({ 
  size = 'md', 
  animated = true,
  className = '' 
}) => {
  const { isDark } = useTheme();
  
  const sizeMap = {
    sm: { width: 24, height: 24, fontSize: '8px' },
    md: { width: 32, height: 32, fontSize: '10px' },
    lg: { width: 48, height: 48, fontSize: '14px' },
    xl: { width: 64, height: 64, fontSize: '18px' }
  };

  const { width, height, fontSize } = sizeMap[size];

  const terminalVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const cursorVariants = {
    blink: {
      opacity: [1, 0, 1],
      transition: { 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      variants={animated ? terminalVariants : {}}
      initial={animated ? "initial" : undefined}
      animate={animated ? "animate" : undefined}
      whileHover={animated ? "hover" : undefined}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Terminal Window */}
        <rect
          x="4"
          y="8"
          width="56"
          height="48"
          rx="6"
          ry="6"
          fill={isDark ? '#1f2937' : '#f9fafb'}
          stroke={isDark ? '#3b82f6' : '#2563eb'}
          strokeWidth="2"
        />
        
        {/* Terminal Header */}
        <rect
          x="4"
          y="8"
          width="56"
          height="12"
          rx="6"
          ry="6"
          fill={isDark ? '#374151' : '#e5e7eb'}
        />
        <rect
          x="4"
          y="14"
          width="56"
          height="6"
          fill={isDark ? '#374151' : '#e5e7eb'}
        />
        
        {/* Traffic Light Buttons */}
        <circle cx="12" cy="14" r="2" fill="#ef4444" />
        <circle cx="20" cy="14" r="2" fill="#f59e0b" />
        <circle cx="28" cy="14" r="2" fill="#10b981" />
        
        {/* Terminal Content Area */}
        <rect
          x="6"
          y="22"
          width="52"
          height="32"
          fill={isDark ? '#111827' : '#ffffff'}
          rx="2"
        />
        
        {/* Command Prompt */}
        <text
          x="10"
          y="32"
          fontSize={fontSize}
          fill={isDark ? '#10b981' : '#059669'}
          fontFamily="monospace"
          fontWeight="bold"
        >
          $
        </text>
        
        {/* Command Text */}
        <text
          x="18"
          y="32"
          fontSize={fontSize}
          fill={isDark ? '#3b82f6' : '#2563eb'}
          fontFamily="monospace"
          fontWeight="bold"
        >
          HTS
        </text>
        
        {/* Blinking Cursor */}
        {animated && (
          <motion.rect
            x="38"
            y="28"
            width="1.5"
            height="6"
            fill={isDark ? '#10b981' : '#059669'}
            variants={cursorVariants}
            animate="blink"
          />
        )}
        
        {/* Additional Terminal Lines */}
        <text
          x="10"
          y="42"
          fontSize={fontSize}
          fill={isDark ? '#6b7280' : '#9ca3af'}
          fontFamily="monospace"
        >
          &gt; shell_
        </text>
        
        {/* Subtle Glow Effect */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Apply glow to the terminal border */}
        <rect
          x="4"
          y="8"
          width="56"
          height="48"
          rx="6"
          ry="6"
          fill="none"
          stroke={isDark ? '#10b981' : '#059669'}
          strokeWidth="1"
          opacity="0.5"
          filter="url(#glow)"
        />
      </svg>
    </motion.div>
  );
};

export default TerminalLogo;