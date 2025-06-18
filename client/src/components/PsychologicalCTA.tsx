import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Trophy } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'wouter';

interface PsychologicalCTAProps {
  variant?: 'primary' | 'secondary' | 'urgency' | 'social-proof';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  badge?: string;
}

const PsychologicalCTA: React.FC<PsychologicalCTAProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  href,
  onClick,
  className = '',
  icon,
  badge
}) => {
  const { isDark } = useTheme();

  const variantStyles = {
    primary: {
      bg: isDark 
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
      text: 'text-white',
      shadow: 'shadow-lg hover:shadow-xl',
      border: 'border-0'
    },
    secondary: {
      bg: isDark 
        ? 'bg-gray-800 hover:bg-gray-700 border-gray-600' 
        : 'bg-white hover:bg-gray-50 border-gray-300',
      text: isDark ? 'text-white' : 'text-gray-900',
      shadow: 'shadow-md hover:shadow-lg',
      border: 'border'
    },
    urgency: {
      bg: isDark 
        ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700' 
        : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600',
      text: 'text-white',
      shadow: 'shadow-lg hover:shadow-xl',
      border: 'border-0'
    },
    'social-proof': {
      bg: isDark 
        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700' 
        : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600',
      text: 'text-white',
      shadow: 'shadow-lg hover:shadow-xl',
      border: 'border-0'
    }
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  const buttonClasses = `
    ${currentVariant.bg} ${currentVariant.text} ${currentVariant.shadow} ${currentVariant.border}
    ${currentSize} rounded-lg font-semibold transition-all duration-200 
    transform hover:scale-105 active:scale-95 
    inline-flex items-center justify-center space-x-2 
    relative overflow-hidden group
    ${className}
  `;

  const buttonContent = (
    <>
      {badge && (
        <span className="absolute -top-2 -right-2 bg-yellow-500 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold">
          {badge}
        </span>
      )}
      <span className="relative z-10 flex items-center space-x-2">
        {icon}
        <span>{children}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </>
  );

  if (href) {
    return (
      <Link href={href}>
        <motion.button
          className={buttonClasses}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {buttonContent}
        </motion.button>
      </Link>
    );
  }

  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {buttonContent}
    </motion.button>
  );
};

export default PsychologicalCTA;