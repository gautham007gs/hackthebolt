import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Terminal, Play, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface CodeTerminalProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  interactive?: boolean;
  onExecute?: (code: string) => void;
  className?: string;
}

const CodeTerminal: React.FC<CodeTerminalProps> = ({
  code,
  language = 'bash',
  title,
  showLineNumbers = true,
  interactive = false,
  onExecute,
  className = ''
}) => {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);
  const [executing, setExecuting] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleExecute = async () => {
    if (!onExecute) return;
    setExecuting(true);
    await onExecute(code);
    setExecuting(false);
  };

  const lines = code.split('\n');

  return (
    <div className={`${className} ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-lg overflow-hidden shadow-sm`}>
      {/* Terminal Header */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border-b px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center space-x-2">
            <Terminal className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {title || `${language} terminal`}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {interactive && onExecute && (
            <button
              onClick={handleExecute}
              disabled={executing}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-xs font-medium transition-colors ${
                isDark 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              } ${executing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Play className="h-3 w-3" />
              <span>{executing ? 'Running...' : 'Run'}</span>
            </button>
          )}
          
          <button
            onClick={handleCopy}
            className={`flex items-center space-x-1 px-3 py-1 rounded text-xs font-medium transition-colors ${
              isDark 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-green-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} p-0 relative`}>
        <pre
          ref={codeRef}
          className={`text-sm leading-relaxed overflow-x-auto ${isDark ? 'text-gray-300' : 'text-gray-800'} font-mono`}
        >
          {showLineNumbers ? (
            <div className="flex">
              <div className={`${isDark ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'} px-4 py-4 select-none border-r ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                {lines.map((_, index) => (
                  <div key={index} className="leading-relaxed">
                    {index + 1}
                  </div>
                ))}
              </div>
              <div className="flex-1 px-4 py-4">
                {lines.map((line, index) => (
                  <div key={index} className="leading-relaxed">
                    {language === 'bash' && line.startsWith('$') && (
                      <span className={`${isDark ? 'text-green-400' : 'text-green-600'} mr-2`}>
                        <ChevronRight className="h-4 w-4 inline" />
                      </span>
                    )}
                    <span className={getLanguageStyle(line, language, isDark)}>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="px-4 py-4">
              {lines.map((line, index) => (
                <div key={index} className="leading-relaxed">
                  {language === 'bash' && line.startsWith('$') && (
                    <span className={`${isDark ? 'text-green-400' : 'text-green-600'} mr-2`}>
                      <ChevronRight className="h-4 w-4 inline" />
                    </span>
                  )}
                  <span className={getLanguageStyle(line, language, isDark)}>{line}</span>
                </div>
              ))}
            </div>
          )}
        </pre>
      </div>
    </div>
  );
};

const getLanguageStyle = (line: string, language: string, isDark: boolean) => {
  if (language === 'bash') {
    if (line.startsWith('$')) {
      return isDark ? 'text-green-400' : 'text-green-600';
    }
    if (line.startsWith('#')) {
      return isDark ? 'text-gray-500' : 'text-gray-400';
    }
  }
  
  if (language === 'javascript' || language === 'js') {
    if (line.includes('const ') || line.includes('let ') || line.includes('var ')) {
      return isDark ? 'text-purple-400' : 'text-purple-600';
    }
    if (line.includes('function') || line.includes('=>')) {
      return isDark ? 'text-blue-400' : 'text-blue-600';
    }
  }
  
  if (language === 'python') {
    if (line.includes('def ') || line.includes('class ')) {
      return isDark ? 'text-yellow-400' : 'text-yellow-600';
    }
    if (line.includes('import ') || line.includes('from ')) {
      return isDark ? 'text-pink-400' : 'text-pink-600';
    }
  }
  
  return isDark ? 'text-gray-300' : 'text-gray-800';
};

export default CodeTerminal;