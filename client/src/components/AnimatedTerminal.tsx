import React, { useState, useEffect } from 'react';
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

const AnimatedTerminal: React.FC<AnimatedTerminalProps> = ({
  commands = [],
  className = '',
  autoPlay = true,
  loop = true
}) => {
  const { isDark } = useTheme();
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [showOutput, setShowOutput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const defaultCommands: TerminalCommand[] = [
    {
      command: 'nmap -sS 192.168.1.100',
      output: 'Starting Nmap scan...\n22/tcp  open  ssh\n80/tcp  open  http\n443/tcp open  https\nScan completed.',
      delay: 3000
    },
    {
      command: 'sqlmap -u "target.com/login" --dbs',
      output: 'Testing connection...\nDatabase: webapp_db\nTables: users, admin, sessions\nVulnerability detected!',
      delay: 3500
    },
    {
      command: 'john --wordlist=rockyou.txt hash.txt',
      output: 'Loading hash file...\nCracking passwords...\npassword123 (admin)\n1 password cracked.',
      delay: 2500
    },
    {
      command: 'ls -la /home/user/',
      output: 'drwxr-xr-x  user user  4096 Dec 15 10:30 .\ndrwxr-xr-x  root root  4096 Dec 15 10:25 ..\n-rw-------  user user   256 Dec 15 10:30 .ssh',
      delay: 2000
    }
  ];

  const commandsToUse = commands.length > 0 ? commands : defaultCommands;

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600);

    return () => clearInterval(cursorInterval);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || commandsToUse.length === 0) return;

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const startSequence = () => {
      setIsRunning(true);
      setIsTyping(true);
      setShowOutput(false);
      setCurrentText('');

      const currentCommand = commandsToUse[currentCommandIndex];
      let charIndex = 0;

      // Consistent typing speed
      intervalId = setInterval(() => {
        if (charIndex < currentCommand.command.length) {
          setCurrentText(currentCommand.command.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
          
          // Show output after typing is complete
          if (currentCommand.output) {
            setTimeout(() => {
              setShowOutput(true);
            }, 300);
          }

          // Move to next command
          timeoutId = setTimeout(() => {
            setCurrentCommandIndex(prev => {
              const nextIndex = prev + 1;
              if (nextIndex >= commandsToUse.length) {
                setIsRunning(false);
                return loop ? 0 : prev;
              }
              return nextIndex;
            });
          }, currentCommand.delay || 2500);
        }
      }, 80); // Consistent 80ms typing speed
    };

    // Initial delay before starting
    timeoutId = setTimeout(startSequence, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [currentCommandIndex, autoPlay, loop, commandsToUse]);

  const currentCommand = commandsToUse[currentCommandIndex];

  return (
    <div className={`${className} max-w-2xl mx-auto`}>
      <div className={`rounded-xl overflow-hidden shadow-2xl ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-900 border-gray-600'
      } border-2`}>
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer"></div>
          </div>
          <div className="text-gray-300 text-sm font-mono font-semibold">hacktheshell@terminal</div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-xs text-gray-400">{isRunning ? 'Running' : 'Ready'}</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm bg-gray-900 min-h-[320px] max-h-[400px] overflow-y-auto">
          {/* Welcome Message */}
          <div className="text-emerald-400 mb-4 border-b border-gray-800 pb-3">
            <div className="font-bold">HackTheShell Terminal v2.1.0</div>
            <div className="text-xs text-gray-400 mt-1">Cybersecurity Training Environment</div>
          </div>
          
          {/* Command History */}
          <div className="space-y-3">
            {/* Current Command Line */}
            <div className="flex items-start">
              <span className="text-emerald-400 mr-2 font-bold">root@hacktheshell:~$</span>
              <div className="flex-1">
                <span className="text-white">
                  {currentText}
                </span>
                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-emerald-400 font-bold text-lg`}>
                  |
                </span>
              </div>
            </div>

            {/* Command Output */}
            {showOutput && currentCommand?.output && (
              <div className="text-gray-300 whitespace-pre-line pl-6 border-l-2 border-emerald-500/50 ml-4 bg-gray-800/30 p-3 rounded-r-lg">
                {currentCommand.output.split('\n').map((line, index) => (
                  <div key={index} className="leading-relaxed">
                    {line.includes('open') && <span className="text-green-400">{line}</span>}
                    {line.includes('Vulnerability') && <span className="text-red-400">{line}</span>}
                    {line.includes('cracked') && <span className="text-yellow-400">{line}</span>}
                    {line.includes('completed') && <span className="text-blue-400">{line}</span>}
                    {!line.includes('open') && !line.includes('Vulnerability') && !line.includes('cracked') && !line.includes('completed') && line}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status Bar */}
          <div className="mt-6 pt-3 border-t border-gray-800 text-gray-500 text-xs">
            <div className="flex justify-between items-center">
              <div>Session: {currentCommandIndex + 1}/{commandsToUse.length}</div>
              <div className="flex items-center space-x-4">
                <span>Status: {isTyping ? 'Executing...' : showOutput ? 'Complete' : 'Ready'}</span>
                <span className="text-emerald-400">●</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTerminal;