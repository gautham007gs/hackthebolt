import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  Minimize2, 
  X, 
  Volume2,
  Shield,
  AlertTriangle,
  Lock,
  Code,
  Lightbulb,
  Users
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const CyberMentor: React.FC = () => {
  const { isDark } = useTheme();
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m CyberMentor, your ethical hacking AI assistant. I can help you with cybersecurity questions, vulnerability analysis, and educational guidance. Remember, all our discussions are for educational purposes only!',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const toggleChat = () => {
    setIsMinimized(!isMinimized);
  };

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getEthicalHackingResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      playNotificationSound();
    }, 1000);
  };

  const getEthicalHackingResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('sql injection') || input.includes('sqli')) {
      return '🛡️ SQL Injection is a critical vulnerability. For ethical learning:\n\n• Use prepared statements and parameterized queries\n• Validate and sanitize all user inputs\n• Practice on legal platforms like DVWA, HackTheBox, or TryHackMe\n• Never test on systems you don\'t own\n\n⚖️ Legal Reminder: Only practice on authorized systems!';
    }
    
    if (input.includes('xss') || input.includes('cross-site scripting')) {
      return '🔒 Cross-Site Scripting (XSS) Prevention:\n\n• Encode output data properly\n• Use Content Security Policy (CSP)\n• Validate input on client AND server\n• Practice on legal labs like PortSwigger Web Security Academy\n\n📚 Educational platforms: OWASP WebGoat, bWAPP';
    }
    
    if (input.includes('penetration testing') || input.includes('pentest')) {
      return '🎯 Ethical Penetration Testing Guide:\n\n• Always get written authorization first\n• Follow a methodology (OWASP, NIST, PTES)\n• Document everything thoroughly\n• Provide actionable remediation advice\n\n🏆 Certifications: CEH, OSCP, GPEN\n⚖️ Remember: Authorization is mandatory!';
    }
    
    if (input.includes('password') || input.includes('brute force')) {
      return '🔐 Password Security Best Practices:\n\n• Use strong, unique passwords (12+ characters)\n• Enable 2FA/MFA everywhere\n• Use password managers\n• Implement account lockout policies\n\n🛠️ Tools for authorized testing: Hydra, John the Ripper, Hashcat\n⚖️ Only test with permission!';
    }
    
    if (input.includes('social engineering')) {
      return '🎭 Social Engineering Awareness:\n\n• Educate users about phishing\n• Implement security awareness training\n• Verify identities through multiple channels\n• Report suspicious activities\n\n📖 Educational use only - never manipulate people without consent!';
    }
    
    if (input.includes('wireless') || input.includes('wifi') || input.includes('wpa')) {
      return '📡 Wireless Security Guidelines:\n\n• Use WPA3 or WPA2 with strong passwords\n• Disable WPS if not needed\n• Use enterprise authentication when possible\n• Monitor for rogue access points\n\n🔧 Tools: Aircrack-ng, Kismet (authorized use only)\n⚖️ Testing wireless networks requires explicit permission!';
    }
    
    if (input.includes('metasploit') || input.includes('exploit')) {
      return '💻 Metasploit Framework (Educational Use):\n\n• Powerful penetration testing tool\n• Practice in controlled environments\n• Always update and patch after testing\n• Use only on authorized systems\n\n🏠 Safe practice environments: VulnHub, HackTheBox, TryHackMe\n⚖️ Unauthorized use is illegal!';
    }
    
    if (input.includes('nmap') || input.includes('port scan')) {
      return '🔍 Network Scanning with Nmap:\n\n• Start with basic scans (-sS, -sV, -O)\n• Use stealth techniques when authorized\n• Always scan responsibly\n• Document findings properly\n\n📝 Common commands:\n• nmap -sS target (SYN scan)\n• nmap -sV target (version detection)\n⚖️ Only scan networks you own or have permission to test!';
    }
    
    if (input.includes('help') || input.includes('commands')) {
      return '🤖 CyberMentor Commands & Topics:\n\n• SQL Injection prevention & testing\n• XSS (Cross-Site Scripting) defense\n• Penetration testing methodologies\n• Password security & brute force protection\n• Social engineering awareness\n• Wireless security (WiFi/WPA)\n• Network scanning (Nmap)\n• Exploit frameworks (Metasploit)\n\n💡 Ask me about any cybersecurity topic!\n⚖️ Remember: All guidance is for ethical, educational purposes only!';
    }
    
    return '🤖 I\'m here to help with ethical cybersecurity education! I can assist with:\n\n• Vulnerability assessment techniques\n• Secure coding practices\n• Penetration testing methodologies\n• Security tool usage\n• Defense strategies\n\n⚖️ Important: All advice is for educational purposes on authorized systems only. Always follow responsible disclosure and legal guidelines.\n\nWhat specific cybersecurity topic would you like to explore?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestionTopics = [
    { icon: Shield, text: "SQL Injection Prevention", topic: "sql injection" },
    { icon: Lock, text: "XSS Protection", topic: "xss protection" },
    { icon: Code, text: "Penetration Testing", topic: "penetration testing" },
    { icon: Users, text: "Social Engineering", topic: "social engineering awareness" }
  ];

  return (
    <div className="fixed z-50">
      {/* Floating Bot Icon - Mobile Optimized */}
      <motion.button
        onClick={toggleChat}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 z-50 ${
          isMinimized ? 'scale-100' : 'scale-90'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
      </motion.button>

      {/* Chat Window - Mobile Responsive */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-16 right-2 left-2 sm:bottom-24 sm:right-6 sm:left-auto w-auto sm:w-96 h-[70vh] sm:h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-40"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-500 to-green-600 rounded-t-lg">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-white">CyberMentor</h3>
                  <p className="text-xs text-white/80">Ethical Hacking AI Assistant</p>
                </div>
              </div>
              <div className="flex space-x-1 sm:space-x-2">
                <button
                  onClick={playNotificationSound}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                  title="Test sound"
                >
                  <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 text-white/80" />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4 text-white/80" />
                </button>
              </div>
            </div>

            {/* Ethical Disclaimer */}
            <div className="p-2 sm:p-3 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  <strong>Educational Use Only:</strong> All guidance is for authorized, ethical cybersecurity learning.
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4">
              {messages.length === 1 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {suggestionTopics.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(suggestion.topic)}
                      className="flex items-center space-x-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
                    >
                      <suggestion.icon className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                      <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {suggestion.text}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-xs sm:text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-green-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-2 sm:p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about ethical hacking..."
                  className="flex-1 px-2 py-2 sm:px-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
                <button 
                  onClick={handleSendMessage}
                  className="px-3 py-2 sm:px-4 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors"
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CyberMentor;