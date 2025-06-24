import React, { useState } from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface CyberAceMobileProps {
  onOpen: () => void;
}

const CyberAceMobile: React.FC<CyberAceMobileProps> = ({ onOpen }) => {
  const { isDark } = useTheme();

  return (
    <button
      onClick={onOpen}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        isDark 
          ? 'text-cyan-400 hover:bg-cyan-500/10' 
          : 'text-cyan-600 hover:bg-cyan-50'
      }`}
    >
      <div className="w-5 h-5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
        <Sparkles className="w-3 h-3 text-white" />
      </div>
      <span className="font-medium">CyberAce AI</span>
    </button>
  );
};

export default CyberAceMobile;