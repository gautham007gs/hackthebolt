import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle,
  Send,
  Bot,
  User,
  Shield,
  Zap,
  Brain,
  Code,
  AlertTriangle,
  CheckCircle,
  Book,
  Target,
  Lightbulb,
  Clock,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface SecurityTip {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  category: 'beginner' | 'intermediate' | 'advanced';
}

const AI_SecurityAssistant: React.FC = () => {
  const { isDark } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI Security Assistant. I can help you with cybersecurity questions, analyze vulnerabilities, explain attack vectors, and provide learning guidance. What would you like to learn about today?",
      timestamp: new Date(),
      suggestions: [
        "Explain SQL injection",
        "How to secure a web application?",
        "What is a zero-day vulnerability?",
        "Best practices for password security"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const securityTips: SecurityTip[] = [
    {
      icon: Shield,
      title: "Enable 2FA Everywhere",
      description: "Two-factor authentication adds an extra layer of security to your accounts",
      category: 'beginner'
    },
    {
      icon: Code,
      title: "Input Validation",
      description: "Always validate and sanitize user inputs to prevent injection attacks",
      category: 'intermediate'
    },
    {
      icon: Brain,
      title: "Threat Modeling",
      description: "Systematically identify and analyze potential security threats in your system",
      category: 'advanced'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string): { content: string; suggestions?: string[] } => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('sql injection')) {
      return {
        content: "SQL injection is a code injection technique where malicious SQL statements are inserted into application entry points. Here's how it works:\n\n1. **Attack Vector**: Attackers exploit vulnerable input fields that directly concatenate user input into SQL queries\n2. **Impact**: Can lead to unauthorized data access, data manipulation, or complete database compromise\n3. **Prevention**: Use parameterized queries, input validation, and least privilege principles\n\nWould you like me to show you specific examples or prevention techniques?",
        suggestions: [
          "Show SQL injection examples",
          "How to use parameterized queries?",
          "SQL injection testing tools",
          "Advanced SQL injection techniques"
        ]
      };
    }
    
    if (lowerInput.includes('web application') && lowerInput.includes('secure')) {
      return {
        content: "Securing web applications requires a multi-layered approach:\n\n🛡️ **Input Validation**: Validate all user inputs on both client and server sides\n🔒 **Authentication**: Implement strong authentication mechanisms (2FA, password policies)\n🔐 **Authorization**: Use role-based access control (RBAC)\n🌐 **HTTPS**: Encrypt all data in transit\n🍪 **Session Management**: Secure session handling and timeout policies\n📝 **Logging**: Comprehensive security logging and monitoring\n\nWhich aspect would you like to dive deeper into?",
        suggestions: [
          "Authentication best practices",
          "Session security",
          "OWASP Top 10",
          "Security headers"
        ]
      };
    }
    
    if (lowerInput.includes('zero-day')) {
      return {
        content: "A zero-day vulnerability is a security flaw that is unknown to security vendors and has no available patch:\n\n⚡ **Discovery**: Found by researchers or attackers before vendors know about it\n🎯 **Exploitation**: Can be used in attacks with no defense available\n⏰ **Timeline**: 'Zero days' refers to the time developers have had to patch it\n🛡️ **Defense**: Use defense-in-depth strategies, behavioral analysis, and threat hunting\n\nZero-days are particularly dangerous because traditional signature-based defenses can't detect them.",
        suggestions: [
          "How are zero-days discovered?",
          "Zero-day defense strategies",
          "Famous zero-day attacks",
          "Bug bounty programs"
        ]
      };
    }
    
    // Default response
    return {
      content: "That's an interesting question! I'd be happy to help you understand that better. Could you provide more specific details about what you'd like to learn? I can assist with:\n\n• Vulnerability analysis and exploitation\n• Secure coding practices\n• Network security concepts\n• Incident response procedures\n• Compliance frameworks\n• Threat hunting techniques\n\nWhat specific area interests you most?",
      suggestions: [
        "Network security basics",
        "Penetration testing process",
        "Incident response plan",
        "Security compliance (SOC2, ISO27001)"
      ]
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <div className={`h-full flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* Header */}
      <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center space-x-3`}>
        <div className={`p-2 rounded-lg ${isDark ? 'bg-emerald-600' : 'bg-emerald-100'}`}>
          <Brain className={`w-5 h-5 ${isDark ? 'text-white' : 'text-emerald-600'}`} />
        </div>
        <div>
          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            AI Security Assistant
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Your personal cybersecurity mentor
          </p>
        </div>
        <div className="ml-auto flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? (isDark ? 'bg-blue-600' : 'bg-blue-100')
                    : (isDark ? 'bg-emerald-600' : 'bg-emerald-100')
                }`}>
                  {message.type === 'user' ? (
                    <User className={`w-4 h-4 ${isDark ? 'text-white' : 'text-blue-600'}`} />
                  ) : (
                    <Bot className={`w-4 h-4 ${isDark ? 'text-white' : 'text-emerald-600'}`} />
                  )}
                </div>

                {/* Message Content */}
                <div className={`p-3 rounded-lg ${
                  message.type === 'user'
                    ? (isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                    : (isDark ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900')
                }`}>
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  <div className={`text-xs mt-2 opacity-70`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-emerald-600' : 'bg-emerald-100'}`}>
                <Bot className={`w-4 h-4 ${isDark ? 'text-white' : 'text-emerald-600'}`} />
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Suggestions */}
        {messages.length > 0 && messages[messages.length - 1]?.suggestions && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2"
          >
            {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`px-3 py-2 text-sm rounded-full border transition-colors ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about cybersecurity..."
            className={`flex-1 p-3 rounded-lg border ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className={`px-4 py-3 rounded-lg font-medium transition-colors ${
              !inputMessage.trim() || isTyping
                ? `${isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-500'} cursor-not-allowed`
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Tips */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {securityTips.map((tip, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(`Tell me about ${tip.title.toLowerCase()}`)}
              className={`p-2 text-left rounded-lg border transition-colors ${
                isDark 
                  ? 'border-gray-600 hover:bg-gray-700' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <tip.icon className="w-3 h-3 text-emerald-500" />
                <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {tip.title}
                </span>
              </div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {tip.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AI_SecurityAssistant;