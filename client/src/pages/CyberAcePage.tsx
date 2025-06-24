import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send,
  User,
  Copy,
  Check,
  Sparkles,
  Code,
  Terminal,
  Shield,
  Zap,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Brain
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ProfessionalHeader from '../components/ProfessionalHeader';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  hasCode?: boolean;
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
    <div className={`relative mt-4 rounded-xl overflow-hidden ${isDark ? 'bg-gray-900 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
      <div className={`flex items-center justify-between px-4 py-3 ${isDark ? 'bg-gray-800 border-b border-gray-700' : 'bg-gray-100 border-b border-gray-200'}`}>
        <div className="flex items-center space-x-2">
          <Terminal className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'} transition-colors`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className={`p-4 text-sm overflow-x-auto ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

const CyberAcePage: React.FC = () => {
  const { isDark } = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Welcome to CyberAce! I\'m your advanced cybersecurity AI assistant. I can help you with:\n\n• **Code Analysis & Generation** - Debug security issues, write secure code\n• **Vulnerability Assessment** - Analyze and fix security flaws\n• **Real-time Error Solving** - Paste your errors and get instant solutions\n• **Penetration Testing** - Guidance on ethical hacking techniques\n• **Security Best Practices** - Learn industry-standard security measures\n\nWhat can I help you with today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const generateAdvancedResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Error handling and debugging
    if (message.includes('error') || message.includes('exception') || message.includes('bug') || message.includes('debug')) {
      return `I can help you debug that issue! Here's my systematic approach:

**Error Analysis Process:**
1. **Error Classification** - Let's identify the error type
2. **Root Cause Analysis** - Find the underlying issue
3. **Solution Implementation** - Fix it properly
4. **Prevention Strategies** - Avoid similar issues

**Common Error Patterns I can solve:**
- **SQL Injection vulnerabilities** in database queries
- **XSS flaws** in web applications
- **Authentication bypasses** in login systems
- **Buffer overflow** vulnerabilities
- **API security** misconfigurations

**Please share your specific error message or code snippet**, and I'll provide:
- Detailed explanation of the issue
- Step-by-step fix
- Secure code example
- Best practices to prevent recurrence

What error are you encountering?`;
    }

    // Code generation requests
    if (message.includes('generate') || message.includes('write code') || message.includes('script') || message.includes('create')) {
      return `I'll help you generate secure, production-ready code! Here's what I can create:

**Security-Focused Code Generation:**

**Web Security Scripts:**
\`\`\`python
# SQL Injection Prevention Example
import sqlite3
from contextlib import contextmanager

@contextmanager
def get_db_connection():
    conn = sqlite3.connect('database.db')
    try:
        yield conn
    finally:
        conn.close()

def secure_user_login(username, password):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        # ✅ Using parameterized queries (secure)
        cursor.execute(
            "SELECT id, password_hash FROM users WHERE username = ?", 
            (username,)
        )
        user = cursor.fetchone()
        if user and verify_password(password, user[1]):
            return user[0]
    return None
\`\`\`

**Network Security Scanner:**
\`\`\`bash
#!/bin/bash
# Port Scanner with Service Detection
target=$1
echo "Scanning $target..."

nmap -sS -sV -O -A -T4 $target | tee scan_results.txt
echo "Scan complete. Results saved to scan_results.txt"
\`\`\`

**What specific code do you need?** Just tell me:
- Programming language
- Security domain (web, network, etc.)
- Specific functionality
- Use case scenario`;
    }

    // SQL Injection detailed response
    if (message.includes('sql injection') || message.includes('sqli')) {
      return `**SQL Injection Prevention - Complete Guide**

**Understanding SQL Injection:**
Attackers manipulate SQL queries by injecting malicious code through user inputs.

**Vulnerable Code Example:**
\`\`\`python
# ❌ DANGEROUS - Direct string concatenation
def login(username, password):
    query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
    cursor.execute(query)  # Vulnerable to injection!
\`\`\`

**Secure Implementation:**
\`\`\`python
# ✅ SAFE - Parameterized queries
def secure_login(username, password):
    query = "SELECT * FROM users WHERE username=%s AND password=%s"
    cursor.execute(query, (username, hash_password(password)))
\`\`\`

**Advanced Protection Layers:**
1. **Input Validation:**
\`\`\`python
import re

def validate_input(user_input):
    # Allow only alphanumeric and safe characters
    if re.match("^[a-zA-Z0-9_@.-]+$", user_input):
        return True
    raise ValueError("Invalid characters detected")
\`\`\`

2. **Database Permissions:**
\`\`\`sql
-- Create limited user for application
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT SELECT, INSERT, UPDATE ON app_db.* TO 'app_user'@'localhost';
-- Never grant DROP, ALTER, or admin privileges
\`\`\`

Want me to show you testing techniques or specific language implementations?`;
    }

    // XSS Prevention
    if (message.includes('xss') || message.includes('cross-site scripting')) {
      return `**Cross-Site Scripting (XSS) Prevention Guide**

**XSS Attack Types:**
- **Reflected XSS** - Script in URL/form data
- **Stored XSS** - Script saved in database
- **DOM XSS** - Client-side script manipulation

**Prevention Strategies:**

**1. Output Encoding:**
\`\`\`javascript
// Safe HTML encoding
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Usage in templates
document.getElementById('output').textContent = userInput; // Safe
\`\`\`

**2. Content Security Policy (CSP):**
\`\`\`html
<!-- Strict CSP header -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdn.trusted.com;
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;">
\`\`\`

**3. React/Framework Protection:**
\`\`\`jsx
// React automatically escapes content
function UserProfile({ userName }) {
    return <h1>Welcome {userName}</h1>; // Safe by default
}

// ❌ Dangerous - direct HTML insertion
function UnsafeComponent({ userContent }) {
    return <div dangerouslySetInnerHTML={{__html: userContent}} />; // Avoid!
}
\`\`\`

**4. Input Validation:**
\`\`\`python
import html
from urllib.parse import quote

def sanitize_input(user_input):
    # HTML escape for display
    safe_html = html.escape(user_input)
    # URL encode for URLs
    safe_url = quote(user_input)
    return safe_html, safe_url
\`\`\`

Need help implementing XSS protection for a specific framework?`;
    }

    // Penetration testing
    if (message.includes('penetration test') || message.includes('pentest') || message.includes('ethical hacking')) {
      return `**Penetration Testing Methodology & Tools**

**Professional Pentest Process:**

**Phase 1: Reconnaissance**
\`\`\`bash
# Information gathering
nmap -sn 192.168.1.0/24          # Network discovery
nmap -sS -sV -A target.com       # Port & service scan
dig target.com ANY               # DNS enumeration
whois target.com                 # Domain information
\`\`\`

**Phase 2: Vulnerability Assessment**
\`\`\`bash
# Web application scanning
nikto -h https://target.com
dirb https://target.com /usr/share/wordlists/dirb/common.txt

# Network vulnerability scanning
nessus_cli --scan target.com
openvas-cli --target target.com
\`\`\`

**Phase 3: Exploitation Framework**
\`\`\`bash
# Metasploit usage
msfconsole
use exploit/multi/handler
set payload windows/meterpreter/reverse_tcp
set LHOST your_ip
set LPORT 4444
exploit
\`\`\`

**Phase 4: Post-Exploitation**
\`\`\`bash
# System enumeration after access
whoami /all                    # Windows privileges
cat /etc/passwd               # Linux users
netstat -an                   # Network connections
ps aux                        # Running processes
\`\`\`

**Essential Tools:**
- **Nmap** - Network discovery & port scanning
- **Burp Suite** - Web application testing
- **OWASP ZAP** - Free web security scanner
- **Metasploit** - Exploitation framework
- **Wireshark** - Network packet analysis
- **John the Ripper** - Password cracking
- **Hashcat** - Advanced password recovery

**Legal Reminder:** Only test systems you own or have explicit written permission to test!

What specific aspect of penetration testing would you like to explore?`;
    }

    // General cybersecurity best practices
    if (message.includes('security') || message.includes('best practices') || message.includes('secure')) {
      return `**Cybersecurity Best Practices - Complete Checklist**

**Authentication & Access Control:**
- Multi-Factor Authentication (MFA) everywhere
- Strong password policies (12+ characters, complexity)
- Regular password rotation for privileged accounts
- Principle of least privilege access
- Session timeout and proper logout

**Code Security:**
\`\`\`python
# Secure password hashing
import bcrypt

def hash_password(password):
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode('utf-8'), salt)

def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed)
\`\`\`

**Network Security:**
- Firewall configuration with deny-by-default
- Network segmentation and VLANs
- Regular security updates and patches
- SSL/TLS encryption (TLS 1.2+ only)
- VPN for remote access

**Monitoring & Logging:**
\`\`\`bash
# Log analysis for security events
tail -f /var/log/auth.log | grep "Failed password"
grep "404" /var/log/apache2/access.log | head -20
journalctl -u ssh -f  # SSH connection monitoring
\`\`\`

**Security Testing:**
- Regular vulnerability scans
- Penetration testing (annual minimum)
- Code reviews for security issues
- Dependency vulnerability checking

**Application Security:**
- Input validation and sanitization
- Output encoding to prevent XSS
- SQL injection prevention
- CSRF token implementation
- Secure session management

What specific security area needs your immediate attention?`;
    }

    // Default intelligent response
    return `I'm here to help with your cybersecurity needs! I can assist with:

**Code & Development:**
- Debug security vulnerabilities in your code
- Generate secure scripts and applications
- Review code for security flaws
- Implement security best practices

**Security Analysis:**
- Analyze error messages and security logs
- Identify potential attack vectors
- Recommend security improvements
- Create security testing strategies

**Learning & Training:**
- Explain complex security concepts
- Guide through hands-on exercises
- Provide real-world examples
- Share industry best practices

**Incident Response:**
- Help diagnose security issues
- Provide step-by-step remediation
- Create prevention strategies
- Document security procedures

**Just paste your code, error message, or describe what you need help with** - I'll provide detailed, actionable solutions!

What specific challenge are you facing today?`;
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
      timestamp: new Date(),
      hasCode: inputMessage.includes('```') || inputMessage.includes('error') || inputMessage.includes('exception')
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setTimeout(() => {
      const response = generateAdvancedResponse(inputMessage);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        hasCode: response.includes('```')
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = [
    { icon: Code, text: "Debug my security code", prompt: "I have a security vulnerability in my code. Can you help me identify and fix it?" },
    { icon: Shield, text: "Analyze error message", prompt: "I'm getting a security-related error. Can you help me understand and solve it?" },
    { icon: Terminal, text: "Generate secure script", prompt: "Can you generate a secure script for penetration testing?" },
    { icon: Zap, text: "Security best practices", prompt: "What are the current cybersecurity best practices I should implement?" }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ProfessionalHeader />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  CyberAce AI
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Advanced Cybersecurity Assistant
                </p>
              </div>
            </div>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto`}>
              Get expert help with code analysis, vulnerability assessment, and real-time security solutions
            </p>
          </div>

          {/* Chat Container */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-2xl overflow-hidden`}>
            {/* Messages */}
            <div className="h-[600px] overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-4 max-w-4xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-br from-cyan-500 to-blue-600'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Brain className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-6 py-4 ${
                      message.type === 'user'
                        ? `${isDark ? 'bg-green-600' : 'bg-green-500'} text-white`
                        : `${isDark ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'} ${isDark ? 'text-white' : 'text-gray-900'}`
                    }`}>
                      <div className="prose prose-sm max-w-none leading-relaxed whitespace-pre-wrap">
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
                      <div className={`text-xs mt-3 ${
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
                  className="flex justify-start"
                >
                  <div className="flex space-x-4 max-w-4xl">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div className={`rounded-2xl px-6 py-4 ${isDark ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
                      <div className="flex space-x-1">
                        <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'} animate-bounce`}></div>
                        <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'} animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                        <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'} animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(prompt.prompt)}
                      className={`p-4 rounded-xl border text-left transition-all hover:scale-105 ${
                        isDark 
                          ? 'border-gray-600 hover:bg-gray-700 hover:border-cyan-500' 
                          : 'border-gray-200 hover:bg-gray-50 hover:border-cyan-400'
                      }`}
                    >
                      <prompt.icon className={`w-5 h-5 mb-2 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {prompt.text}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className={`px-6 py-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex space-x-4">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                    adjustTextareaHeight();
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about security vulnerabilities, paste error messages, or request code generation..."
                  className={`flex-1 px-4 py-3 rounded-xl border resize-none ${
                    isDark 
                      ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-cyan-500' 
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-cyan-500'
                  } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                  rows={1}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-6 py-3 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center text-white transition-all hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberAcePage;