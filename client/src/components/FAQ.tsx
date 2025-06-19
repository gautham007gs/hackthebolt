import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  className?: string;
}

const FAQ: React.FC<FAQProps> = ({ 
  title = "Frequently Asked Questions", 
  subtitle = "Everything you need to know about HackTheShell",
  faqs,
  className = ""
}) => {
  const { isDark } = useTheme();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className={`h-8 w-8 mr-3 ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`} />
            <h2 className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {title}
            </h2>
          </div>
          <p className={`text-lg ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {subtitle}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl border transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600' 
                  : 'bg-white/80 border-gray-200/80 hover:border-gray-300'
              } backdrop-blur-sm hover:shadow-lg`}
            >
              <button
                onClick={() => toggleItem(index)}
                className={`w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-2xl transition-all duration-200 ${
                  isDark ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'
                }`}
              >
                <span className={`text-lg font-semibold pr-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 p-1 rounded-full transition-all duration-300 ${
                  openItems.includes(index)
                    ? isDark 
                      ? 'bg-emerald-400/20 text-emerald-400' 
                      : 'bg-emerald-600/20 text-emerald-600'
                    : isDark 
                      ? 'text-gray-400 hover:text-gray-300' 
                      : 'text-gray-600 hover:text-gray-700'
                }`}>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 transform transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="h-5 w-5 transform transition-transform duration-300" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className={`px-6 pb-5 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    } leading-relaxed`}>
                      <div className={`pt-2 border-t ${
                        isDark ? 'border-gray-700/50' : 'border-gray-200/50'
                      }`}>
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className={`mt-12 p-8 rounded-2xl text-center ${
            isDark 
              ? 'bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20' 
              : 'bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200'
          }`}
        >
          <h3 className={`text-xl font-semibold mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Still have questions?
          </h3>
          <p className={`mb-6 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Can't find the answer you're looking for? Please chat with our friendly team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Contact Support
            </button>
            <button className="btn-secondary">
              Join Community
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;