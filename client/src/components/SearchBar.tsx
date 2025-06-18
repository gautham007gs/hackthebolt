import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Target, Newspaper, Users } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  title: string;
  type: 'tutorial' | 'lab' | 'blog' | 'tool';
  description: string;
  url: string;
  category?: string;
}

interface SearchBarProps {
  onClose?: () => void;
  isExpanded?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose, isExpanded = false }) => {
  const { isDark } = useTheme();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock search data
  const searchData: SearchResult[] = [
    {
      id: '1',
      title: 'Web Application Penetration Testing',
      type: 'tutorial',
      description: 'Complete guide to web app security testing',
      url: '/tutorials/web-pentest',
      category: 'Web Security'
    },
    {
      id: '2',
      title: 'SQL Injection Lab',
      type: 'lab',
      description: 'Hands-on SQL injection practice environment',
      url: '/labs/sql-injection',
      category: 'Web Security'
    },
    {
      id: '3',
      title: 'Latest Cybersecurity Threats 2024',
      type: 'blog',
      description: 'Analysis of current threat landscape',
      url: '/blog/threats-2024',
      category: 'Threat Intelligence'
    },
    {
      id: '4',
      title: 'Nmap Network Scanner',
      type: 'tool',
      description: 'Network discovery and security auditing',
      url: '/tools/nmap',
      category: 'Reconnaissance'
    }
  ];

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsLoading(false);
      setSelectedIndex(-1);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      // Navigate to selected result
      console.log('Navigate to:', results[selectedIndex].url);
    } else if (e.key === 'Escape') {
      onClose?.();
    }
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'tutorial': return BookOpen;
      case 'lab': return Target;
      case 'blog': return Newspaper;
      case 'tool': return Users;
      default: return Search;
    }
  };

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'tutorial': return isDark ? 'text-blue-400' : 'text-blue-600';
      case 'lab': return isDark ? 'text-green-400' : 'text-green-600';
      case 'blog': return isDark ? 'text-purple-400' : 'text-purple-600';
      case 'tool': return isDark ? 'text-orange-400' : 'text-orange-600';
      default: return isDark ? 'text-gray-400' : 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`relative ${isExpanded ? 'w-full max-w-2xl' : 'w-80'}`}
    >
      <div className={`relative ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded-xl shadow-xl`}>
        <div className="flex items-center px-4 py-3">
          <Search className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'} mr-3`} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search tutorials, labs, tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-1 ${isDark ? 'bg-transparent text-white placeholder-gray-400' : 'bg-transparent text-gray-900 placeholder-gray-500'} focus:outline-none`}
          />
          {(query || isExpanded) && (
            <button
              onClick={() => {
                setQuery('');
                onClose?.();
              }}
              className={`ml-2 p-1 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'} transition-colors duration-200`}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {(query && (results.length > 0 || isLoading)) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} max-h-80 overflow-y-auto`}
            >
              {isLoading ? (
                <div className="p-4 text-center">
                  <div className={`inline-block animate-spin rounded-full h-6 w-6 border-b-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`}></div>
                </div>
              ) : (
                <div className="py-2">
                  {results.map((result, index) => {
                    const Icon = getTypeIcon(result.type);
                    return (
                      <motion.button
                        key={result.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-start space-x-3 ${
                          selectedIndex === index ? (isDark ? 'bg-gray-700' : 'bg-gray-50') : ''
                        }`}
                        onClick={() => console.log('Navigate to:', result.url)}
                      >
                        <Icon className={`h-5 w-5 mt-0.5 ${getTypeColor(result.type)}`} />
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                            {result.title}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                            {result.description}
                          </div>
                          {result.category && (
                            <div className={`text-xs ${getTypeColor(result.type)} mt-1`}>
                              {result.category}
                            </div>
                          )}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} capitalize`}>
                          {result.type}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {query && !isLoading && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} p-4 text-center`}
          >
            <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              No results found for "{query}"
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;