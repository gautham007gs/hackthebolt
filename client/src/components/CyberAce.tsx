import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle,
  Send,
  Bot,
  User,
  Shield,
  Code2,
  Minimize2,
  Maximize2,
  Copy,
  Check,
  Sparkles,
  X,
  Menu
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import CyberAceMobile from './CyberAceMobile';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isCode?: boolean;
  language?: string;
}

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);
  const { isDark } = useTheme();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative mt-3 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-100'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className={`flex items-center justify-between px-4 py-2 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} rounded-t-lg`}>
        <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'} transition-colors`}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className={`p-4 text-sm overflow-x-auto ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

interface CyberAceProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const CyberAce: React.FC<CyberAceProps> = ({ isOpen: propIsOpen, onToggle }) => {
  const { isDark } = useTheme();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hey there! I\'m CyberAce, your cybersecurity companion. I\'m here to help you learn, explore, and master the world of ethical hacking and security. What\'s on your mind today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;
  const toggleOpen = onToggle || (() => setInternalIsOpen(!internalIsOpen));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateSmartResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Conversational responses with personality
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      const greetings = [
        "Hey! Great to see you here. What cybersecurity challenge can I help you tackle today?",
        "Hello! Ready to dive into some security topics? I'm all ears!",
        "Hi there! Whether it's pentesting, secure coding, or just curious about security - I'm here to help!"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    if (message.includes('sql injection') || message.includes('sqli')) {
      return `SQL injection is one of the most critical web vulnerabilities. Here's what you need to know:

**What is it?**
Attackers inject malicious SQL code into application queries, potentially accessing or manipulating your database.

**Common attack vectors:**
- Login forms with poor input validation
- Search boxes that directly query databases
- URL parameters passed to SQL queries

**Prevention strategies:**
1. **Parameterized queries** - Always use prepared statements
2. **Input validation** - Sanitize and validate all user inputs
3. **Least privilege** - Database users should have minimal necessary permissions
4. **Web Application Firewalls** - Add an extra layer of protection

Want me to show you some code examples of secure vs vulnerable implementations?`;
    }
    
    if (message.includes('xss') || message.includes('cross-site scripting')) {
      return `Cross-Site Scripting (XSS) is a client-side injection attack. Let me break it down:

**Types of XSS:**
- **Reflected XSS** - Malicious script reflects off web application
- **Stored XSS** - Script permanently stored on target server
- **DOM-based XSS** - Vulnerability in client-side code

**Real-world impact:**
- Session hijacking
- Credential theft  
- Defacement
- Malware distribution

**Defense mechanisms:**
1. **Output encoding** - Encode data before displaying
2. **Content Security Policy (CSP)** - Restrict resource loading
3. **Input validation** - Filter dangerous characters
4. **HttpOnly cookies** - Prevent JavaScript access to session cookies

Need some practical examples or want to see how to implement CSP headers?`;
    }
    
    if (message.includes('penetration test') || message.includes('pentest')) {
      return `Penetration testing is like being a "legal hacker" - you're finding vulnerabilities before the bad guys do!

**Methodology (OWASP Testing Guide):**
1. **Information Gathering** - Reconnaissance phase
2. **Vulnerability Assessment** - Identify potential weaknesses  
3. **Exploitation** - Attempt to exploit findings
4. **Post-Exploitation** - Assess impact and persistence
5. **Reporting** - Document findings and remediation steps

**Essential tools:**
- **Nmap** - Network discovery and port scanning
- **Burp Suite** - Web application security testing
- **Metasploit** - Exploitation framework
- **Wireshark** - Network protocol analyzer
- **OWASP ZAP** - Web app vulnerability scanner

**Legal reminder:** Only test systems you own or have explicit permission to test!

Want to learn about a specific phase or tool?`;
    }
    
    if (message.includes('password') || message.includes('authentication')) {
      return `Password security is fundamental! Here's the modern approach:

**Strong password practices:**
- **Length over complexity** - Passphrases beat complex short passwords
- **Unique passwords** - Never reuse across sites
- **Password managers** - Let tools handle the complexity

**Multi-Factor Authentication (MFA) types:**
1. **Something you know** - Password/PIN
2. **Something you have** - Phone/token
3. **Something you are** - Biometrics

**Implementation best practices:**
- **Bcrypt/Argon2** for password hashing
- **Salt** every password hash
- **Rate limiting** on login attempts
- **Account lockout** policies
- **Password breach monitoring**

**Pro tip:** Consider passwordless authentication with WebAuthn/FIDO2 for the ultimate security!

Curious about implementing any of these in your applications?`;
    }

    if (message.includes('code') || message.includes('example') || message.includes('show me')) {
      return `I'd love to show you some code! Here are examples of secure coding practices:

**Secure SQL Query (Node.js):**
\`\`\`javascript
// ❌ Vulnerable to SQL injection
const query = \`SELECT * FROM users WHERE email = '\${userEmail}'\`;

// ✅ Safe with parameterized query
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [userEmail], (err, results) => {
  // Handle results safely
});
\`\`\`

**XSS Prevention (React):**
\`\`\`jsx
// ✅ React automatically escapes content
function UserProfile({ userName }) {
  return <h1>Welcome {userName}</h1>; // Safe!
}

// ❌ Dangerous - direct HTML insertion
function UnsafeComponent({ userContent }) {
  return <div dangerouslySetInnerHTML={{__html: userContent}} />;
}
\`\`\`

Want to see more examples for specific vulnerabilities or languages?`;
    }
    
    // Default conversational response
    const defaultResponses = [
      `That's an interesting question! While I can help with many cybersecurity topics, I'd love to know more about what specifically interests you. Are you looking at:

- **Web application security** (XSS, SQL injection, CSRF)
- **Network security** (firewalls, intrusion detection)
- **Pentesting methodologies** (reconnaissance, exploitation)
- **Secure coding practices** (input validation, authentication)
- **Incident response** (forensics, malware analysis)

What catches your attention?`,
      
      `I'm here to help you explore cybersecurity! Whether you're just starting out or looking to deepen your knowledge, I can assist with:

**Learning paths:**
- Ethical hacking fundamentals
- Web security testing
- Network penetration testing
- Secure development practices

**Practical skills:**
- Tool recommendations and usage
- Vulnerability analysis
- Security best practices
- Real-world scenarios

What would you like to dive into first?`,
      
      `Great question! I'm designed to be your cybersecurity learning companion. I can help explain complex topics in simple terms, show practical examples, and guide you through security concepts.

**I'm particularly good at:**
- Breaking down technical concepts
- Providing code examples
- Explaining attack vectors and defenses
- Recommending learning resources
- Discussing real-world applications

What specific area of cybersecurity interests you most right now?`
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const formatMessageContent = (content: string) => {
    // Check if content contains code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        });
      }
      
      // Add code block
      parts.push({
        type: 'code',
        content: match[2],
        language: match[1] || 'text'
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex)
      });
    }
    
    return parts.length > 0 ? parts : [{ type: 'text', content }];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay for more natural conversation
    setTimeout(() => {
      const response = generateSmartResponse(inputMessage);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickSuggestions = [
    "How to prevent SQL injection?",
    "Explain XSS vulnerabilities",
    "Best pentesting tools",
    "Secure coding practices"
  ];

  // Mobile-friendly chat window
  if (isOpen) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-4 sm:p-0"
      >
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          className={`w-full sm:w-96 sm:h-[600px] h-[80vh] ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-t-2xl sm:rounded-2xl shadow-2xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} flex flex-col`}
        >
          {/* Header */}
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between rounded-t-2xl`}>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center`}>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  CyberAce
                </h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Your cybersecurity companion
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'} transition-colors`}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleOpen}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'} transition-colors`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatContainerRef}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex space-x-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                          : 'bg-gradient-to-br from-cyan-500 to-blue-600'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Sparkles className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? `${isDark ? 'bg-green-600' : 'bg-green-500'} text-white`
                          : `${isDark ? 'bg-gray-700' : 'bg-gray-100'} ${isDark ? 'text-white' : 'text-gray-900'}`
                      }`}>
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">
                          {formatMessageContent(message.content).map((part, index) => (
                            <div key={index}>
                              {part.type === 'text' ? (
                                <span>{part.content}</span>
                              ) : (
                                <CodeBlock code={part.content} language={part.language} />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className={`text-xs mt-2 ${
                          message.type === 'user' 
                            ? 'text-green-100' 
                            : `${isDark ? 'text-gray-400' : 'text-gray-500'}`
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex space-x-2 max-w-[85%]">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className={`rounded-2xl px-4 py-3 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className="flex space-x-1">
                          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`}></div>
                          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions */}
              {messages.length === 1 && (
                <div className="px-4 pb-2">
                  <div className="flex flex-wrap gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setInputMessage(suggestion)}
                        className={`px-3 py-1 text-xs rounded-full border ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'} transition-colors`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about cybersecurity..."
                    className={`flex-1 px-4 py-3 rounded-2xl border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl flex items-center justify-center text-white transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    );
  }

  // Floating button (only show if not controlled externally)
  if (propIsOpen === undefined) {
    return (
      <motion.button
        onClick={toggleOpen}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>
    );
  }

  return null;
};

export default CyberAce;