import React, { useState } from 'react';
import { Copy, Check, Play, Download, Code2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  allowCopy?: boolean;
  allowDownload?: boolean;
  executable?: boolean;
  fileName?: string;
  className?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = 'bash',
  title,
  showLineNumbers = true,
  allowCopy = true,
  allowDownload = false,
  executable = false,
  fileName,
  className = ''
}) => {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || `code.${getFileExtension(language)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    // Simulate execution
    setTimeout(() => {
      setIsExecuting(false);
      // You can implement actual code execution here
    }, 2000);
  };

  const getFileExtension = (lang: string) => {
    const extensions: { [key: string]: string } = {
      bash: 'sh',
      shell: 'sh',
      python: 'py',
      javascript: 'js',
      typescript: 'ts',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      go: 'go',
      rust: 'rs',
      php: 'php',
      ruby: 'rb',
      sql: 'sql',
      html: 'html',
      css: 'css',
      json: 'json',
      yaml: 'yml',
      xml: 'xml'
    };
    return extensions[lang.toLowerCase()] || 'txt';
  };

  const getLanguageColor = (lang: string) => {
    const colors: { [key: string]: string } = {
      bash: 'text-green-400',
      shell: 'text-green-400',
      python: 'text-blue-400',
      javascript: 'text-yellow-400',
      typescript: 'text-blue-500',
      java: 'text-red-400',
      cpp: 'text-purple-400',
      c: 'text-purple-400',
      go: 'text-cyan-400',
      rust: 'text-orange-400',
      php: 'text-purple-500',
      ruby: 'text-red-500',
      sql: 'text-orange-500',
      html: 'text-orange-400',
      css: 'text-blue-400',
      json: 'text-yellow-500'
    };
    return colors[lang.toLowerCase()] || 'text-gray-400';
  };

  const lines = code.split('\n');

  return (
    <div className={`${className} rounded-xl overflow-hidden border ${
      isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
    } shadow-lg`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          
          {title && (
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {title}
            </span>
          )}
          
          <div className="flex items-center space-x-2">
            <Code2 className={`h-4 w-4 ${getLanguageColor(language)}`} />
            <span className={`text-xs font-mono uppercase ${getLanguageColor(language)}`}>
              {language}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {executable && (
            <button
              onClick={handleExecute}
              disabled={isExecuting}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDark 
                  ? 'text-gray-400 hover:text-green-400 hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-200'
              } disabled:opacity-50`}
              title="Execute code"
            >
              <Play className={`h-4 w-4 ${isExecuting ? 'animate-spin' : ''}`} />
            </button>
          )}
          
          {allowDownload && (
            <button
              onClick={handleDownload}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDark 
                  ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-200'
              }`}
              title="Download code"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
          
          {allowCopy && (
            <button
              onClick={handleCopy}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                copied
                  ? 'text-green-500 bg-green-500/10'
                  : isDark 
                    ? 'text-gray-400 hover:text-emerald-400 hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-200'
              }`}
              title={copied ? 'Copied!' : 'Copy code'}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Code Content */}
      <div className={`relative overflow-x-auto ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        <pre className="p-4">
          <code className="text-sm font-mono">
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className={`inline-block w-8 text-right mr-4 select-none ${
                    isDark ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {index + 1}
                  </span>
                )}
                <span className={`flex-1 ${
                  isDark ? 'text-gray-300' : 'text-gray-800'
                }`}>
                  {line || '\u00A0'}
                </span>
              </div>
            ))}
          </code>
        </pre>
        
        {/* Execution Output */}
        {isExecuting && (
          <div className={`border-t p-4 ${
            isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Executing...
              </span>
            </div>
            <div className={`text-sm font-mono ${isDark ? 'text-green-400' : 'text-green-600'}`}>
              $ {lines[0]}
            </div>
          </div>
        )}
      </div>

      {/* Footer with additional info */}
      {(fileName || lines.length > 10) && (
        <div className={`px-4 py-2 border-t text-xs ${
          isDark ? 'bg-gray-800 border-gray-700 text-gray-500' : 'bg-gray-100 border-gray-200 text-gray-600'
        }`}>
          <div className="flex justify-between items-center">
            <span>{fileName && `File: ${fileName}`}</span>
            <span>{lines.length} lines</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeSnippet;