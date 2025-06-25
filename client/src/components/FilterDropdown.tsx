import React, { useState, useRef, useEffect } from 'react';
import { Filter, X, Search } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  categories: FilterOption[];
  difficulties?: FilterOption[];
  severities?: FilterOption[];
  selectedCategory: string;
  selectedDifficulty?: string;
  selectedSeverity?: string;
  onCategoryChange: (value: string) => void;
  onDifficultyChange?: (value: string) => void;
  onSeverityChange?: (value: string) => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  placeholder?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  categories,
  difficulties,
  severities,
  selectedCategory,
  selectedDifficulty,
  selectedSeverity,
  onCategoryChange,
  onDifficultyChange,
  onSeverityChange,
  searchTerm = '',
  onSearchChange,
  placeholder = "Search..."
}) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'category' | 'difficulty' | 'severity'>('category');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasActiveFilters = selectedCategory !== 'all' || 
    (selectedDifficulty && selectedDifficulty !== 'all') || 
    (selectedSeverity && selectedSeverity !== 'all') ||
    searchTerm.length > 0;

  const clearAllFilters = () => {
    onCategoryChange('all');
    onDifficultyChange?.('all');
    onSeverityChange?.('all');
    onSearchChange?.('');
  };

  const renderFilterSection = (
    title: string,
    options: FilterOption[],
    selectedValue: string,
    onValueChange: (value: string) => void
  ) => (
    <div className="space-y-2">
      <h4 className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wide`}>
        {title}
      </h4>
      <div className="space-y-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              onValueChange(option.value);
              setIsOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
              selectedValue === option.value
                ? `${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'} font-medium`
                : `${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'}`
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
          isDark
            ? `border-gray-600 ${hasActiveFilters ? 'bg-blue-500/20 border-blue-500/50' : 'bg-gray-800 hover:bg-gray-700'} text-white`
            : `border-gray-300 ${hasActiveFilters ? 'bg-blue-50 border-blue-300' : 'bg-white hover:bg-gray-50'} text-gray-700`
        } ${isOpen ? 'ring-2 ring-blue-500/20' : ''}`}
      >
        <Filter className={`w-4 h-4 ${hasActiveFilters ? (isDark ? 'text-blue-400' : 'text-blue-600') : ''}`} />
        <span className="text-sm font-medium">
          {hasActiveFilters ? 'Filtered' : 'Filter'}
        </span>
        {hasActiveFilters && (
          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
        )}
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 mt-2 w-80 max-w-[90vw] ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border rounded-xl shadow-xl z-50 overflow-hidden`}>
          
          {/* Search Section */}
          {onSearchChange && (
            <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={placeholder}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
            </div>
          )}

          {/* Tabs */}
          {(difficulties || severities) && (
            <div className={`flex border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={() => setActiveTab('category')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'category'
                    ? `${isDark ? 'text-blue-400 bg-gray-700' : 'text-blue-600 bg-blue-50'} border-b-2 border-blue-500`
                    : `${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'}`
                }`}
              >
                Category
              </button>
              {difficulties && (
                <button
                  onClick={() => setActiveTab('difficulty')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'difficulty'
                      ? `${isDark ? 'text-blue-400 bg-gray-700' : 'text-blue-600 bg-blue-50'} border-b-2 border-blue-500`
                      : `${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'}`
                  }`}
                >
                  Difficulty
                </button>
              )}
              {severities && (
                <button
                  onClick={() => setActiveTab('severity')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'severity'
                      ? `${isDark ? 'text-blue-400 bg-gray-700' : 'text-blue-600 bg-blue-50'} border-b-2 border-blue-500`
                      : `${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'}`
                  }`}
                >
                  Severity
                </button>
              )}
            </div>
          )}

          {/* Filter Content */}
          <div className="p-4 max-h-64 overflow-y-auto">
            {activeTab === 'category' && renderFilterSection('Category', categories, selectedCategory, onCategoryChange)}
            {activeTab === 'difficulty' && difficulties && selectedDifficulty && onDifficultyChange && 
              renderFilterSection('Difficulty', difficulties, selectedDifficulty, onDifficultyChange)}
            {activeTab === 'severity' && severities && selectedSeverity && onSeverityChange && 
              renderFilterSection('Severity', severities, selectedSeverity, onSeverityChange)}
          </div>

          {/* Clear All */}
          {hasActiveFilters && (
            <div className={`p-3 border-t ${isDark ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'}`}>
              <button
                onClick={clearAllFilters}
                className={`w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDark
                    ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300'
                    : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                }`}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;