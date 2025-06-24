import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send,
  User,
  Copy,
  Check,
  Sparkles,
  Plus,
  MessageSquare,
  Trash2,
  Edit3,
  Menu,
  X
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ProfessionalHeader from '../components/ProfessionalHeader';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
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
    <div className={`relative mt-3 rounded-lg overflow-hidden ${isDark ? 'bg-gray-800 border border-gray-600' : 'bg-gray-100 border border-gray-300'}`}>
      <div className={`flex items-center justify-between px-3 py-2 text-xs ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-1 px-2 py-1 rounded ${isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-300'} transition-colors`}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className={`p-3 text-sm overflow-x-auto ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

const CyberAcePageV2: React.FC = () => {
  const { isDark } = useTheme();
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Welcome Chat',
      messages: [
        {
          id: '1',
          type: 'assistant',
          content: 'Hey! I\'m CyberAce, your cybersecurity buddy.\n\nI can help with security bugs, write code, analyze vulnerabilities, or chat about cyber threats. What\'s up?',
          timestamp: new Date()
        }
      ],
      createdAt: new Date()
    }
  ]);
  const [currentSessionId, setCurrentSessionId] = useState('1');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession.messages]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = window.innerWidth >= 1024 ? 120 : 100;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: 'cybersecurity'
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Chat API error:', error);
      // Fallback to shorter, more human responses
      const message = userMessage.toLowerCase();
      
      if (message.includes('error') || message.includes('bug')) {
        return `Ah, the classic "it's not working" situation!\n\nQuick debug checklist:\n• Check the error logs\n• Verify inputs/permissions\n• Test with minimal example\n\nPaste the actual error message and I'll help you fix it properly.`;
      }
      
      if (message.includes('sql injection')) {
        return `SQL injection - the classic web vulnerability!\n\nQuick fix: Use parameterized queries\n\n\`\`\`python\n# Bad: f"SELECT * FROM users WHERE id={user_id}"\n# Good: cursor.execute("SELECT * FROM users WHERE id=%s", [user_id])\n\`\`\`\n\nWant me to show you more prevention techniques?`;
      }
      
      if (message.includes('xss')) {
        return `XSS - when websites trust user input too much!\n\nBasic defense:\n• Escape user input: \`htmlspecialchars()\`\n• Use CSP headers\n• Validate everything\n\nNeed help implementing specific protection?`;
      }
      
      if (message.includes('hello') || message.includes('hi')) {
        const greetings = [
          "Hey there! Ready to hack some security into your code?",
          "Hello! What cybersecurity puzzle are we solving today?",
          "Hi! Got any interesting security challenges for me?"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
      }
      
      return `Interesting question! I'm here to help with cybersecurity stuff - from debugging weird errors to explaining attack vectors.\n\nWhat specific challenge are you facing? The more details, the better I can help!`;
    }
  };

  const formatMessageContent = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        });
      }
      
      parts.push({
        type: 'code',
        content: match[2],
        language: match[1] || 'text'
      });
      
      lastIndex = match.index + match[0].length;
    }
    
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

    // Update current session with user message
    setSessions(prev => prev.map(session => 
      session.id === currentSessionId
        ? { ...session, messages: [...session.messages, userMessage] }
        : session
    ));

    setInputMessage('');
    setIsTyping(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const response = await generateAIResponse(inputMessage);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setSessions(prev => prev.map(session => 
        session.id === currentSessionId
          ? { ...session, messages: [...session.messages, assistantMessage] }
          : session
      ));
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Oops! Something went wrong. Try asking again, or check if the API is configured properly.',
        timestamp: new Date()
      };

      setSessions(prev => prev.map(session => 
        session.id === currentSessionId
          ? { ...session, messages: [...session.messages, errorMessage] }
          : session
      ));
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSendMessage();
    }
  };

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [
        {
          id: '1',
          type: 'assistant',
          content: 'Hey! I\'m back and ready to tackle your cybersecurity questions. What\'s on your mind?',
          timestamp: new Date()
        }
      ],
      createdAt: new Date()
    };

    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setSidebarOpen(false);
  };

  const deleteSession = (sessionId: string) => {
    if (sessions.length === 1) return; // Don't delete the last session
    
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(sessions.find(s => s.id !== sessionId)?.id || sessions[0].id);
    }
  };

  const generateTitle = (messages: ChatMessage[]) => {
    const firstUserMessage = messages.find(m => m.type === 'user');
    if (firstUserMessage) {
      return firstUserMessage.content.slice(0, 30) + (firstUserMessage.content.length > 30 ? '...' : '');
    }
    return 'New Chat';
  };

  // Show signup prompt after 10 messages
  const totalMessages = currentSession.messages.filter(m => m.type === 'user').length;
  const showSignupPrompt = totalMessages >= 10 && totalMessages % 10 === 0;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ProfessionalHeader />
      
      <div className="pt-16 flex h-screen max-h-screen overflow-hidden relative">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-30 w-72 lg:w-80 h-full ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border-r transition-all duration-300`}>
          <div className="p-4 lg:p-6 h-full flex flex-col">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>CyberAce</h2>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>AI Security Assistant</p>
                </div>
              </div>

              <button
                onClick={createNewChat}
                className={`w-full flex items-center space-x-3 p-4 rounded-2xl ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700' : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-300'} transition-all duration-200 font-medium shadow-lg hover:shadow-xl`}
              >
                <Plus className="w-5 h-5" />
                <span>New Chat</span>
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto">
              <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3 px-2`}>
                Recent Chats
              </h3>
              <div className="space-y-2">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      currentSessionId === session.id
                        ? `${isDark ? 'bg-gray-800 border border-cyan-500/50 shadow-lg' : 'bg-white border border-cyan-300 shadow-md'}`
                        : `${isDark ? 'hover:bg-gray-800 border border-transparent' : 'hover:bg-white border border-transparent hover:shadow-sm'}`
                    }`}
                    onClick={() => {
                      setCurrentSessionId(session.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <MessageSquare className={`w-4 h-4 flex-shrink-0 ${
                        currentSessionId === session.id 
                          ? 'text-cyan-500' 
                          : `${isDark ? 'text-gray-500' : 'text-gray-400'}`
                      }`} />
                      <span className={`text-sm truncate ${
                        currentSessionId === session.id
                          ? `${isDark ? 'text-white' : 'text-gray-900'} font-medium`
                          : `${isDark ? 'text-gray-300' : 'text-gray-700'}`
                      }`}>
                        {session.messages.length > 1 ? generateTitle(session.messages) : session.title}
                      </span>
                    </div>
                    {sessions.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                        className={`opacity-0 group-hover:opacity-100 p-2 rounded-lg ${
                          isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-600'
                        } transition-all`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className={`pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} text-center`}>
                AI responses may contain errors. Verify important information.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full">
          {/* Mobile header */}
          <div className={`lg:hidden flex items-center justify-between p-3 ${isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'} border-b backdrop-blur-sm sticky top-0 z-30`}>
            <button
              onClick={() => setSidebarOpen(true)}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'} transition-colors`}
            >
              <Menu className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className={`font-semibold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>CyberAce</span>
            </div>
            <div className="w-9" /> {/* Spacer */}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 lg:space-y-4">
            <div className="max-w-4xl mx-auto">
              {currentSession.messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} ${
                    index > 0 ? 'mt-4' : ''
                  }`}
                >
                  <div className={`flex space-x-2 lg:space-x-3 max-w-[85%] lg:max-w-[75%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-br from-cyan-500 to-blue-600'
                    } shadow-sm mt-0.5`}>
                      {message.type === 'user' ? (
                        <User className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-lg lg:rounded-xl px-3 lg:px-4 py-2 lg:py-2.5 ${
                      message.type === 'user'
                        ? `${isDark ? 'bg-green-600' : 'bg-green-500'} text-white shadow-sm max-w-xs lg:max-w-md`
                        : `${isDark ? 'bg-gray-800 text-gray-100 border border-gray-700' : 'bg-white text-gray-900 border border-gray-200'} shadow-sm flex-1`
                    }`}>
                      <div className={`text-sm lg:text-sm leading-relaxed whitespace-pre-wrap ${message.type === 'user' ? 'font-normal' : 'font-normal'}`}>
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
                      <div className={`text-xs mt-1.5 ${
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mt-4"
                >
                  <div className="flex space-x-3 max-w-[75%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className={`rounded-xl px-4 py-3 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
                      <div className="flex space-x-1">
                        <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'} animate-bounce`}></div>
                        <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'} animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                        <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'} animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {/* Signup Prompt */}
              {showSignupPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-sm mx-auto p-4 rounded-xl ${isDark ? 'bg-gradient-to-br from-blue-900 to-purple-900 border border-blue-700' : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200'} text-center shadow-lg mt-4`}
                >
                  <Sparkles className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Enjoying CyberAce?
                  </h3>
                  <p className={`text-xs mb-3 ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>
                    Sign up to save your chat history!
                  </p>
                  <button className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all text-sm">
                    Sign Up Free
                  </button>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className={`p-4 lg:p-5 border-t ${isDark ? 'border-gray-700 bg-gray-900/80' : 'border-gray-200 bg-white/80'} backdrop-blur-sm`}>
            <div className="max-w-4xl mx-auto">
              <div className={`flex items-end space-x-3 p-2 lg:p-3 rounded-xl lg:rounded-2xl ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
              } shadow-sm`}>
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                    adjustTextareaHeight();
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={`flex-1 px-3 py-2.5 lg:py-3 bg-transparent border-0 resize-none text-sm lg:text-base leading-tight ${
                    isDark 
                      ? 'text-white placeholder-gray-400' 
                      : 'text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-0 font-normal`}
                  rows={1}
                  disabled={isTyping}
                  style={{ minHeight: '20px', maxHeight: '120px' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className={`p-2.5 lg:p-3 rounded-full flex items-center justify-center transition-all ${
                    !inputMessage.trim() || isTyping
                      ? `${isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`
                      : 'bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  <Send className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberAcePageV2;