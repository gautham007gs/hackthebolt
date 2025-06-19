import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, List, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface TOCItem {
  id: string;
  title: string;
  level: number;
  element: HTMLElement;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
  sticky?: boolean;
  collapsible?: boolean;
  showOnMobile?: boolean;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  content,
  className = '',
  sticky = true,
  collapsible = true,
  showOnMobile = false
}) => {
  const { isDark } = useTheme();
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Generate TOC from content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    const items: TOCItem[] = Array.from(headings).map((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const title = heading.textContent || '';
      const id = heading.id || `heading-${index}`;
      
      // Create a virtual element for the TOC
      const element = document.createElement(heading.tagName);
      element.id = id;
      element.textContent = title;
      
      return {
        id,
        title: title.replace(/[*#]/g, '').trim(), // Remove markdown symbols
        level,
        element
      };
    });

    setTocItems(items);
  }, [content]);

  useEffect(() => {
    // Observe headings in the actual DOM
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    // Find actual headings in the DOM
    const actualHeadings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
    actualHeadings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileOpen(false);
  };

  const getIndentClass = (level: number) => {
    switch (level) {
      case 1: return '';
      case 2: return 'ml-4';
      case 3: return 'ml-8';
      case 4: return 'ml-12';
      case 5: return 'ml-16';
      case 6: return 'ml-20';
      default: return '';
    }
  };

  if (tocItems.length === 0) return null;

  const TOCContent = () => (
    <div className={`toc-container ${className} ${sticky ? 'sticky top-24' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="toc-title flex items-center space-x-2">
          <List className="h-5 w-5 text-emerald-500" />
          <span>Table of Contents</span>
        </h3>
        {collapsible && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-1 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="toc-list overflow-hidden"
          >
            {tocItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => scrollToHeading(item.id)}
                className={`toc-item ${getIndentClass(item.level)} ${
                  activeId === item.id ? 'active' : ''
                } w-full text-left`}
              >
                <span className={`block truncate ${
                  item.level === 1 ? 'font-semibold' : ''
                }`}>
                  {item.title}
                </span>
                {activeId === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* Desktop TOC */}
      <div className={`hidden lg:block ${showOnMobile ? 'lg:hidden' : ''}`}>
        <TOCContent />
      </div>

      {/* Mobile TOC */}
      {showOnMobile && (
        <>
          {/* Mobile TOC Toggle Button */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className={`lg:hidden fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg transition-all duration-300 ${
              isDark 
                ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                : 'bg-emerald-500 text-white hover:bg-emerald-600'
            }`}
          >
            <List className="h-5 w-5" />
          </button>

          {/* Mobile TOC Modal */}
          <AnimatePresence>
            {isMobileOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="lg:hidden fixed inset-0 bg-black/50 z-50"
                  onClick={() => setIsMobileOpen(false)}
                />
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 max-h-[70vh] overflow-y-auto ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  } rounded-t-2xl shadow-2xl`}
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                      <List className="h-5 w-5 text-emerald-500" />
                      <span>Table of Contents</span>
                    </h3>
                    <button
                      onClick={() => setIsMobileOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <nav className="space-y-2">
                      {tocItems.map((item, index) => (
                        <motion.button
                          key={item.id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => scrollToHeading(item.id)}
                          className={`toc-item ${getIndentClass(item.level)} ${
                            activeId === item.id ? 'active' : ''
                          } w-full text-left relative`}
                        >
                          <span className={`block truncate ${
                            item.level === 1 ? 'font-semibold' : ''
                          }`}>
                            {item.title}
                          </span>
                          {activeId === item.id && (
                            <motion.div
                              layoutId="mobileActiveIndicator"
                              className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </nav>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default TableOfContents;