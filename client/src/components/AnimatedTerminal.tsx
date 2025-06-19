import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface TerminalCommand {
  command: string;
  output?: string;
  delay?: number;
}

interface AnimatedTerminalProps {
  commands?: TerminalCommand[];
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
}

const defaultCommands: TerminalCommand[] = [
  { command: 'nmap -sS target.com', delay: 1000 },
  { command: 'Starting Nmap scan...', output: '22/tcp open ssh', delay: 2000 },
  { command: 'sqlmap -u "http://target.com/login"', delay: 1500 },
  { command: 'Testing for SQL injection...', output: '[INFO] vulnerable parameter found', delay: 2500 },
  { command: 'msfconsole', delay: 1000 },
  { command: 'use exploit/multi/handler', delay: 1500 },
  { command: 'set payload windows/meterpreter/reverse_tcp', delay: 1800 },
  { command: 'exploit', output: 'Meterpreter session opened', delay: 2000 },
];

const hackerQuotes = [
  '"The best way to learn is to break things and fix them."',
  '"Security is not a product, but a process."',
  '"Knowledge is power, but sharing knowledge is empowerment."',
  '"In cybersecurity, paranoia is a feature, not a bug."',
  '"Every expert was once a beginner."',
  '"Hack the planet, but do it ethically."'
];

const AnimatedTerminal: React.FC<AnimatedTerminalProps> = ({
  commands = defaultCommands,
  className = '',
  autoPlay = true,
  loop = true
}) => {
  const { isDark } = useTheme();
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const typeWriter = async () => {
      const currentCommand = commands[currentCommandIndex];
      if (!currentCommand) return;

      setIsTyping(true);
      setDisplayedText('');

      // Type command
      const commandText = `$ ${currentCommand.command}`;
      for (let i = 0; i <= commandText.length; i++) {
        setDisplayedText(commandText.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 50));
      }

      // Show output if exists
      if (currentCommand.output) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setDisplayedText(prev => prev + '\n' + currentCommand.output);
      }

      setIsTyping(false);
      
      // Wait before next command
      await new Promise(resolve => setTimeout(resolve, currentCommand.delay || 2000));

      if (loop) {
        setCurrentCommandIndex((prev) => (prev + 1) % commands.length);
      } else if (currentCommandIndex < commands.length - 1) {
        setCurrentCommandIndex(prev => prev + 1);
      }
    };

    typeWriter();
  }, [currentCommandIndex, autoPlay, loop, commands]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % hackerQuotes.length);
    }, 8000);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <div className={`${className}`}>
      {/* Terminal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${
          isDark ? 'bg-gray-900/90 border-gray-700' : 'bg-gray-900 border-gray-600'
        } border rounded-xl shadow-2xl backdrop-blur-sm`}
      >
        {/* Terminal Header */}
        <div className={`flex items-center justify-between px-4 py-3 ${
          isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-800 border-gray-600'
        } border-b rounded-t-xl`}>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <Terminal className="h-4 w-4 text-gray-400 ml-3" />
            <span className="text-gray-400 text-sm font-mono">hack@theshell:~</span>
          </div>
          <div className="text-gray-500 text-xs font-mono">Terminal</div>
        </div>

        {/* Terminal Content */}
        <div className="p-4 h-48 overflow-hidden">
          <div className="font-mono text-sm space-y-1">
            <pre className="text-green-400 whitespace-pre-wrap">
              {displayedText}
              <span className={`${showCursor && isTyping ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                █
              </span>
            </pre>
          </div>
        </div>
      </motion.div>

      {/* Animated Quotes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-center"
        >
          <p className={`${
            isDark ? 'text-gray-300' : 'text-gray-600'
          } text-sm italic font-medium`}>
            {hackerQuotes[currentQuote]}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedTerminal;