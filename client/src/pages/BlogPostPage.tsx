import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Eye, MessageSquare, Share2, BookOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const BlogPostPage = () => {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState('');
  const [tocExpanded, setTocExpanded] = useState(false);

  // Mock blog post data - in real app, fetch based on slug
  const blogPost = {
    id: '1',
    slug: '2024-cybersecurity-threat-landscape',
    title: "2024 Cybersecurity Threat Landscape: What You Need to Know",
    excerpt: "Explore the latest cyber threats dominating 2024, from AI-powered attacks to supply chain vulnerabilities, and learn how to defend against them.",
    content: `
# Introduction

The cybersecurity landscape in 2024 has evolved dramatically, with threat actors leveraging artificial intelligence and machine learning to create more sophisticated attacks. This comprehensive analysis covers the top threats organizations face today and provides actionable defense strategies.

## Key Threats in 2024

### 1. AI-Powered Attacks

Cybercriminals are increasingly using artificial intelligence to automate and enhance their attack capabilities:

- **Automated Phishing Campaigns**: AI generates highly personalized phishing emails that are difficult to detect
- **Deepfake Technology**: Creating convincing fake audio and video content for social engineering
- **Polymorphic Malware**: Self-modifying code that evades traditional signature-based detection
- **Intelligent Reconnaissance**: AI-driven tools that automatically identify vulnerabilities and attack vectors

**Real-World Example**: In early 2024, a major financial institution fell victim to an AI-generated voice deepfake attack, resulting in a $35 million fraud. The attackers used publicly available audio samples to create a convincing replica of the CEO's voice.

### 2. Supply Chain Vulnerabilities

The SolarWinds attack highlighted the devastating impact of supply chain compromises. In 2024, we've seen a 300% increase in supply chain attacks:

- **Software Supply Chain**: Targeting development tools, CI/CD pipelines, and package repositories
- **Hardware Supply Chain**: Compromising firmware and embedded systems
- **Third-Party Services**: Exploiting managed service providers and cloud platforms
- **Open Source Dependencies**: Malicious packages in npm, PyPI, and other repositories

**Case Study**: The recent compromise of a popular JavaScript library affected over 100,000 websites worldwide, demonstrating the cascading impact of supply chain attacks.

### 3. Ransomware-as-a-Service (RaaS)

The commoditization of ransomware has lowered the barrier to entry for cybercriminals:

- **User-Friendly Interfaces**: RaaS platforms now offer intuitive dashboards and customer support
- **Affiliate Programs**: Revenue-sharing models that incentivize distribution
- **Specialized Roles**: Division of labor between malware developers, access brokers, and negotiators
- **Double and Triple Extortion**: Combining encryption with data theft and DDoS attacks

**Statistics**: RaaS attacks increased by 87% in 2024, with average ransom demands reaching $2.3 million.

### 4. Cloud Security Misconfigurations

As organizations accelerate cloud adoption, misconfigurations remain a leading cause of data breaches:

- **Exposed Databases**: Publicly accessible cloud storage buckets and databases
- **Overprivileged Access**: Excessive permissions granted to users and applications
- **Inadequate Encryption**: Unencrypted data at rest and in transit
- **Weak Identity Management**: Poor implementation of multi-factor authentication

## Defense Strategies

### Implement Zero Trust Architecture

Zero Trust is no longer optional—it's essential for modern cybersecurity:

\`\`\`yaml
# Example Zero Trust Policy
apiVersion: security.io/v1
kind: ZeroTrustPolicy
metadata:
  name: corporate-access
spec:
  rules:
    - effect: Allow
      subjects:
        - user: "authenticated"
      resources:
        - resource: "corporate-network"
      conditions:
        - device: "managed"
        - location: "trusted"
        - mfa: "required"
\`\`\`

### Regular Security Awareness Training

Human error remains the weakest link in cybersecurity:

- **Phishing Simulations**: Regular testing with realistic scenarios
- **Security Champions**: Embedding security advocates in each department
- **Incident Response Drills**: Practicing response procedures
- **Continuous Education**: Keeping teams updated on latest threats

### Continuous Vulnerability Management

Proactive vulnerability management is crucial:

1. **Asset Discovery**: Maintain an accurate inventory of all systems
2. **Risk-Based Prioritization**: Focus on vulnerabilities that pose the highest risk
3. **Automated Patching**: Implement automated patch management where possible
4. **Threat Intelligence**: Leverage threat feeds to prioritize emerging threats

### Incident Response Planning and Testing

Preparation is key to effective incident response:

- **Playbooks**: Detailed procedures for common incident types
- **Communication Plans**: Clear escalation and notification procedures
- **Regular Testing**: Tabletop exercises and simulated attacks
- **Lessons Learned**: Post-incident reviews and process improvements

## Emerging Technologies and Threats

### Quantum Computing Implications

While still years away from practical implementation, quantum computing poses long-term cryptographic risks:

- **Current Encryption Vulnerabilities**: RSA and ECC algorithms will become obsolete
- **Post-Quantum Cryptography**: Organizations must begin planning migration strategies
- **Timeline Considerations**: NIST estimates quantum computers capable of breaking current encryption will emerge by 2030-2035

### IoT and Edge Computing Security

The proliferation of IoT devices creates new attack surfaces:

- **Device Management**: Challenges in patching and updating IoT devices
- **Network Segmentation**: Isolating IoT devices from critical systems
- **Data Privacy**: Protecting sensitive data collected by IoT sensors
- **Supply Chain Security**: Ensuring IoT device integrity from manufacturing to deployment

## Industry-Specific Considerations

### Healthcare

Healthcare organizations face unique cybersecurity challenges:

- **Medical Device Security**: Legacy systems with limited security controls
- **Patient Data Protection**: HIPAA compliance and privacy requirements
- **Operational Continuity**: Ensuring patient care isn't disrupted during incidents
- **Ransomware Targeting**: Healthcare is a prime target due to critical nature of services

### Financial Services

Financial institutions must address sophisticated threats:

- **Regulatory Compliance**: Meeting stringent regulatory requirements
- **Real-Time Fraud Detection**: Implementing AI-powered fraud prevention
- **API Security**: Protecting open banking and fintech integrations
- **Insider Threats**: Monitoring for malicious or negligent insider activities

### Critical Infrastructure

Power grids, water systems, and transportation networks face nation-state threats:

- **OT/IT Convergence**: Securing operational technology environments
- **Nation-State Actors**: Defending against advanced persistent threats
- **Physical Security**: Protecting against cyber-physical attacks
- **Resilience Planning**: Ensuring continuity during extended outages

## Conclusion

The cybersecurity threat landscape in 2024 is more complex and dangerous than ever before. Organizations must adopt a proactive, multi-layered approach to security that includes:

1. **Technology Solutions**: Implementing advanced security tools and platforms
2. **Process Improvements**: Establishing robust security procedures and governance
3. **People Development**: Training and empowering security teams and end users
4. **Continuous Adaptation**: Staying informed about emerging threats and adjusting defenses accordingly

The key to staying ahead of these threats is maintaining a proactive security posture, investing in continuous education and training, and fostering a culture of security awareness throughout the organization.

Remember: cybersecurity is not a destination but a journey. The threat landscape will continue to evolve, and our defenses must evolve with it.
    `,
    author: "Sarah Chen",
    authorBio: "Sarah is a Senior Cybersecurity Consultant with over 10 years of experience in threat intelligence and incident response. She holds CISSP and GCIH certifications and regularly speaks at security conferences.",
    authorAvatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    date: "Dec 15, 2024",
    readTime: "12 min read",
    views: "12.5K",
    comments: 45,
    category: "Threat Intelligence",
    tags: ["AI Security", "Threat Landscape", "Ransomware", "Supply Chain", "Zero Trust"],
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    tableOfContents: [
      { id: 'introduction', title: 'Introduction', level: 1 },
      { id: 'key-threats-in-2024', title: 'Key Threats in 2024', level: 1 },
      { id: '1-ai-powered-attacks', title: '1. AI-Powered Attacks', level: 2 },
      { id: '2-supply-chain-vulnerabilities', title: '2. Supply Chain Vulnerabilities', level: 2 },
      { id: '3-ransomware-as-a-service-raas', title: '3. Ransomware-as-a-Service (RaaS)', level: 2 },
      { id: '4-cloud-security-misconfigurations', title: '4. Cloud Security Misconfigurations', level: 2 },
      { id: 'defense-strategies', title: 'Defense Strategies', level: 1 },
      { id: 'implement-zero-trust-architecture', title: 'Implement Zero Trust Architecture', level: 2 },
      { id: 'regular-security-awareness-training', title: 'Regular Security Awareness Training', level: 2 },
      { id: 'continuous-vulnerability-management', title: 'Continuous Vulnerability Management', level: 2 },
      { id: 'incident-response-planning-and-testing', title: 'Incident Response Planning and Testing', level: 2 },
      { id: 'emerging-technologies-and-threats', title: 'Emerging Technologies and Threats', level: 1 },
      { id: 'quantum-computing-implications', title: 'Quantum Computing Implications', level: 2 },
      { id: 'iot-and-edge-computing-security', title: 'IoT and Edge Computing Security', level: 2 },
      { id: 'industry-specific-considerations', title: 'Industry-Specific Considerations', level: 1 },
      { id: 'healthcare', title: 'Healthcare', level: 2 },
      { id: 'financial-services', title: 'Financial Services', level: 2 },
      { id: 'critical-infrastructure', title: 'Critical Infrastructure', level: 2 },
      { id: 'conclusion', title: 'Conclusion', level: 1 }
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = blogPost.tableOfContents.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [blogPost.tableOfContents]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Threat Intelligence': isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300',
      'Breaking News': isDark ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-300',
      'Career': isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300',
      'Technology': isDark ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-300',
    };
    return colors[category as keyof typeof colors] || (isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-300');
  };

  // Convert markdown-like content to JSX
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentId = '';

    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        currentId = line.substring(2).toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h1 key={index} id={currentId} className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-12 mb-6 first:mt-0`}>
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        currentId = line.substring(3).toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h2 key={index} id={currentId} className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-10 mb-5`}>
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        currentId = line.substring(4).toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h3 key={index} id={currentId} className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mt-8 mb-4`}>
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            {line.substring(2)}
          </li>
        );
      } else if (line.startsWith('```')) {
        // Handle code blocks
        const nextIndex = lines.findIndex((l, i) => i > index && l.startsWith('```'));
        if (nextIndex > -1) {
          const codeContent = lines.slice(index + 1, nextIndex).join('\n');
          elements.push(
            <pre key={index} className={`${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'} p-4 rounded-lg overflow-x-auto my-4`}>
              <code>{codeContent}</code>
            </pre>
          );
        }
      } else if (line.trim() && !line.startsWith('```')) {
        elements.push(
          <p key={index} className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 leading-relaxed`}>
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} pt-20`}
    >
      {/* Breadcrumb */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} py-4`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              to="/"
              className={`${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors duration-200`}
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link
              to="/blog"
              className={`${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors duration-200`}
            >
              Blog
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              {blogPost.title}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8">
          {/* Mobile Table of Contents - Sticky at top */}
          <div className="lg:hidden order-1 sticky top-16 z-30 mb-6">
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-lg backdrop-blur-sm`}>
              <button
                onClick={() => setTocExpanded(!tocExpanded)}
                className={`w-full flex items-center justify-between p-4 ${isDark ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-50'} transition-colors rounded-xl`}
              >
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-emerald-500" />
                  <span className="font-semibold">Table of Contents</span>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${tocExpanded ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {tocExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <nav className="px-4 pb-4 max-h-64 overflow-y-auto">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {blogPost.tableOfContents.map((item, index) => (
                          <motion.button
                            key={index}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.03 }}
                            onClick={() => {
                              scrollToSection(item.id);
                              setTocExpanded(false);
                            }}
                            className={`text-left text-sm transition-colors duration-200 p-2 rounded-lg relative ${
                              item.level === 1 ? 'font-medium' : 'pl-3 text-xs'
                            } ${
                              activeSection === item.id
                                ? isDark ? 'text-emerald-400 bg-emerald-500/10 border-l-2 border-emerald-400' : 'text-emerald-600 bg-emerald-50 border-l-2 border-emerald-600'
                                : isDark ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <span className="block truncate">{item.title}</span>
                          </motion.button>
                        ))}
                      </div>
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Table of Contents - Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1 order-2 lg:order-1">
            <div className={`sticky top-24 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-xl p-6`}>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center space-x-2`}>
                <BookOpen className="h-5 w-5" />
                <span>Table of Contents</span>
              </h3>
              <nav className="space-y-2 max-h-96 overflow-y-auto">
                {blogPost.tableOfContents.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left text-sm transition-colors duration-200 p-2 rounded-lg ${
                      item.level === 1 ? 'font-medium' : 'ml-4'
                    } ${
                      activeSection === item.id
                        ? isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-50'
                        : isDark ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-2 lg:order-2">
            {/* Article Header */}
            <article className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden mb-8`}>
              <div className="relative">
                <img
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="w-full h-64 lg:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getCategoryColor(blogPost.category)}`}>
                    {blogPost.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h1 className={`text-4xl lg:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6 leading-tight`}>
                  {blogPost.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={blogPost.authorAvatar}
                      alt={blogPost.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {blogPost.author}
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{blogPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{blogPost.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{blogPost.views}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {blogPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-lg text-sm ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Article Content */}
                <div className={`prose max-w-none ${isDark ? 'prose-invert' : 'prose-gray'}`}>
                  {renderContent(blogPost.content)}
                </div>

                {/* Author Bio */}
                <div className={`mt-12 pt-8 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-start space-x-4">
                    <img
                      src={blogPost.authorAvatar}
                      alt={blogPost.author}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                        About {blogPost.author}
                      </h4>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                        {blogPost.authorBio}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Actions */}
                <div className={`mt-8 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
                  <div className="flex items-center space-x-4">
                    <button className={`flex items-center space-x-2 ${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors duration-200`}>
                      <MessageSquare className="h-5 w-5" />
                      <span>{blogPost.comments} Comments</span>
                    </button>
                    <button className={`flex items-center space-x-2 ${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors duration-200`}>
                      <Share2 className="h-5 w-5" />
                      <span>Share</span>
                    </button>
                  </div>
                  <Link
                    to="/blog"
                    className={`inline-flex items-center space-x-2 ${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500'} transition-colors duration-200`}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Blog</span>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPostPage;