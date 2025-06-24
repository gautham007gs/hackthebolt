import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  MessageCircle, 
  X, 
  Send, 
  Shield, 
  AlertTriangle, 
  Code, 
  Terminal,
  Brain,
  Zap,
  Lock,
  Eye,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tools?: string[];
}

const ETHICAL_DISCLAIMER = `
⚠️ ETHICAL HACKING DISCLAIMER ⚠️

CyberMentor is designed for EDUCATIONAL and AUTHORIZED security testing purposes ONLY. By using this AI assistant:

✅ You AGREE to use all information for legitimate security research, authorized penetration testing, and educational purposes only
✅ You WILL NOT use this knowledge for illegal activities, unauthorized access, or malicious purposes
✅ You understand that unauthorized hacking is ILLEGAL and can result in severe legal consequences
✅ You will obtain proper authorization before testing any systems you do not own

CyberMentor promotes ETHICAL hacking practices and WHITE HAT security research. Always follow responsible disclosure principles and respect others' digital property.

🛡️ Remember: With great power comes great responsibility!
`;

const SAMPLE_QUERIES = [
  "Help me understand SQL injection vulnerabilities",
  "Write a Python script for port scanning (ethical)",
  "Explain buffer overflow prevention techniques",
  "Create a secure authentication system",
  "Analyze this code for security vulnerabilities",
  "Best practices for penetration testing methodology"
];

export default function CyberMentor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isDark } = useTheme();
  const { isAuthenticated, user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const playNotificationSound = () => {
    if (soundEnabled) {
      // Create a subtle notification sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate AI response - In production, this would call your AI API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateEthicalResponse(userMessage.content),
        timestamp: new Date(),
        tools: detectTools(userMessage.content),
      };

      setMessages(prev => [...prev, aiResponse]);
      playNotificationSound();
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I apologize, but I'm experiencing technical difficulties. Please try again later or contact support if the issue persists.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateEthicalResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('sql injection') || lowerQuery.includes('sqli')) {
      return `🛡️ **SQL Injection Education**

SQL injection is a critical web application vulnerability. Here's an ethical overview:

**What it is:**
- Inserting malicious SQL code into application queries
- Occurs when user input isn't properly sanitized

**Prevention (White Hat Approach):**
\`\`\`sql
-- Use parameterized queries
SELECT * FROM users WHERE id = ?
-- Instead of: "SELECT * FROM users WHERE id = " + userInput
\`\`\`

**Testing (Authorized Only):**
1. Test on your own applications
2. Use tools like SQLMap in controlled environments
3. Practice on platforms like DVWA or PortSwigger Labs

**Legal Reminder:** Only test applications you own or have explicit permission to test. Unauthorized testing is illegal.

Would you like specific prevention techniques or authorized testing methodologies?`;
    }

    if (lowerQuery.includes('port scan') || lowerQuery.includes('nmap')) {
      return `🔍 **Ethical Port Scanning**

Port scanning is a reconnaissance technique used in authorized security assessments:

**Python Example (Educational):**
\`\`\`python
import socket
import sys

def scan_port(target, port):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((target, port))
        sock.close()
        return result == 0
    except:
        return False

# Only scan authorized targets!
target = "127.0.0.1"  # localhost example
for port in [21, 22, 23, 25, 53, 80, 110, 443]:
    if scan_port(target, port):
        print(f"Port {port} is open")
\`\`\`

**Legal Framework:**
- ✅ Scan your own systems
- ✅ Authorized penetration testing
- ❌ NEVER scan systems without permission

**Professional Tools:**
- Nmap for comprehensive scanning
- Masscan for high-speed scanning
- Always document authorized scope

Need help with authorized testing methodology?`;
    }

    // Default educational response
    return `🤖 **CyberMentor Response**

I understand you're interested in "${query}". As an ethical hacking educator, I'm here to help you learn cybersecurity concepts responsibly.

**I can help with:**
- 🛡️ Vulnerability assessment techniques
- 💻 Secure coding practices  
- 🔒 Penetration testing methodologies
- 📚 Security research approaches
- 🏗️ Building security tools
- 🎯 CTF challenge strategies

**Important Reminder:**
All knowledge shared is for educational and authorized testing purposes only. Always ensure you have proper permission before testing any systems.

Could you provide more specific details about what aspect of cybersecurity you'd like to explore? I can offer:
- Code examples with security focus
- Step-by-step methodologies
- Best practice recommendations
- Tool explanations and usage

What would be most helpful for your learning journey?`;
  };

  const detectTools = (query: string): string[] => {
    const tools = [];
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('nmap') || lowerQuery.includes('port scan')) tools.push('Nmap');
    if (lowerQuery.includes('sql') || lowerQuery.includes('database')) tools.push('SQLMap');
    if (lowerQuery.includes('python') || lowerQuery.includes('script')) tools.push('Python');
    if (lowerQuery.includes('burp') || lowerQuery.includes('proxy')) tools.push('Burp Suite');
    if (lowerQuery.includes('metasploit') || lowerQuery.includes('exploit')) tools.push('Metasploit');
    
    return tools;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const acceptDisclaimer = () => {
    setHasAcceptedDisclaimer(true);
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'assistant',
      content: `🤖 **Welcome to CyberMentor!**

I'm your ethical hacking AI assistant, ready to help you learn cybersecurity responsibly. 

**What I can do:**
- 📚 Explain security concepts and vulnerabilities
- 💻 Help write security-focused scripts and tools
- 🔍 Guide you through ethical testing methodologies  
- 🛡️ Provide defense and prevention strategies
- 🎯 Assist with CTF challenges and learning paths

**Popular topics:**
- Web application security (XSS, SQLi, CSRF)
- Network penetration testing
- Reverse engineering basics
- Secure coding practices
- Incident response procedures

${isAuthenticated ? `Hello ${user?.firstName || user?.email || 'Security Researcher'}! ` : ''}How can I help advance your cybersecurity knowledge today?`,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`relative p-4 rounded-full shadow-2xl transition-all duration-300 ${
            isDark 
              ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500' 
              : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600'
          }`}
        >
          <Bot className="h-6 w-6 text-white" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          />
        </motion.button>
        
        {/* Tooltip */}
        <div className={`absolute bottom-full right-0 mb-2 px-3 py-1 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${
          isDark ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'
        }`}>
          CyberMentor - AI Hacking Assistant
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 100, y: 100 }}
      animate={{ 
        opacity: 1, 
        scale: isMinimized ? 0.8 : 1,
        x: 0, 
        y: 0,
        height: isMinimized ? 60 : 600
      }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className={`w-96 rounded-xl shadow-2xl overflow-hidden ${
        isDark ? 'bg-gray-900/95 border border-gray-700' : 'bg-white/95 border border-gray-200'
      } backdrop-blur-xl`}>
        
        {/* Header */}
        <div className={`p-4 border-b ${isDark ? 'border-gray-700 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20' : 'border-gray-200 bg-gradient-to-r from-emerald-50 to-cyan-50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-emerald-600/20' : 'bg-emerald-100'}`}>
                <Brain className={`h-4 w-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              </div>
              <div>
                <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  CyberMentor
                </h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Ethical Hacking AI Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                {soundEnabled ? (
                  <Volume2 className={`h-3 w-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                ) : (
                  <VolumeX className={`h-3 w-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                )}
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                {isMinimized ? (
                  <Maximize2 className={`h-3 w-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                ) : (
                  <Minimize2 className={`h-3 w-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {!hasAcceptedDisclaimer ? (
              // Disclaimer Screen
              <div className="p-4 h-[500px] overflow-y-auto">
                <div className={`text-center mb-4 p-4 rounded-lg ${
                  isDark ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'
                }`}>
                  <AlertTriangle className={`h-8 w-8 mx-auto mb-2 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                  <h3 className={`font-bold text-lg ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    Important Legal Notice
                  </h3>
                </div>
                
                <div className={`text-sm leading-relaxed whitespace-pre-line ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {ETHICAL_DISCLAIMER}
                </div>
                
                <div className="flex space-x-2 mt-6">
                  <button
                    onClick={acceptDisclaimer}
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                  >
                    I Accept - Use Ethically
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Chat Messages */}
                <div className="h-[400px] overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 && (
                    <div className="text-center py-8">
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                        Try asking about:
                      </div>
                      <div className="space-y-2">
                        {SAMPLE_QUERIES.slice(0, 3).map((query, index) => (
                          <button
                            key={index}
                            onClick={() => setInputValue(query)}
                            className={`block w-full text-left text-xs p-2 rounded transition-colors ${
                              isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
                            }`}
                          >
                            {query}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? isDark ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
                          : isDark ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'
                      }`}>
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        {message.tools && message.tools.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {message.tools.map((tool, index) => (
                              <span
                                key={index}
                                className={`px-2 py-1 text-xs rounded ${
                                  isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                                }`}
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className={`text-xs mt-1 opacity-70`}>
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-600'}`}
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-600'}`}
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-600'}`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about ethical hacking, security, or CTF challenges..."
                      className={`flex-1 px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}