import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Eye, MessageSquare, Share2, BookOpen, ChevronRight, Bookmark, Tag, Coffee, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import TableOfContents from '../components/TableOfContents';
import EnhancedCommentSystemV2 from '../components/EnhancedCommentSystemV2';
import SEOStructuredData from '../components/SEOStructuredData';
import AdvancedSEO from '../components/AdvancedSEO';
import CodeSnippet from '../components/CodeSnippet';

const EnhancedBlogPostPageWithLinks = () => {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [estimatedReadTime, setEstimatedReadTime] = useState(0);

  // Enhanced blog post with comprehensive content and internal links
  const blogPost = {
    id: '1',
    slug: '2024-cybersecurity-threat-landscape',
    title: "Advanced Persistent Threats: The Silent Digital Assassins",
    excerpt: "APTs represent the most sophisticated category of cyber attacks, employing stealth, persistence, and advanced techniques to infiltrate high-value targets. Learn how to detect and defend against these evolving threats.",
    content: `
# Advanced Persistent Threats: The Silent Digital Assassins

## Introduction

Advanced Persistent Threats (APTs) represent the pinnacle of cybersecurity challenges in 2024. These sophisticated, multi-stage attacks are designed to maintain long-term access to target networks while remaining undetected. Unlike opportunistic attacks, APTs are typically state-sponsored or conducted by well-funded criminal organizations with specific strategic objectives.

In our comprehensive [cybersecurity tutorial series](/tutorials), we explore various attack methodologies, but APTs stand out for their complexity and persistence. This article will guide you through understanding, detecting, and defending against these advanced threats.

## Understanding APT Methodology

### Initial Access Vectors

APT groups employ various sophisticated techniques to gain initial access to target environments. These methods have evolved significantly since our previous analysis of [network security fundamentals](/tutorials/network-security).

**Spear Phishing Campaigns**
- Highly targeted emails with malicious attachments or links
- Social engineering based on extensive reconnaissance
- Use of zero-day exploits in email clients or browsers

Example detection code:

\`\`\`python
# Email analysis for spear phishing detection
import re
import hashlib

def analyze_email_headers(email_headers):
    """Analyze email headers for suspicious patterns"""
    suspicious_indicators = []
    
    # Check for spoofed sender domains
    sender = email_headers.get('From', '')
    if re.search(r'[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+', sender):
        suspicious_indicators.append('IP address in sender field')
    
    # Check for suspicious reply-to addresses
    reply_to = email_headers.get('Reply-To', '')
    if reply_to and reply_to != sender:
        suspicious_indicators.append('Different reply-to address')
    
    # Check for known malicious domains
    malicious_domains = ['evil-domain.com', 'phishing-site.net']
    for domain in malicious_domains:
        if domain in sender.lower():
            suspicious_indicators.append(f'Known malicious domain: {domain}')
    
    return suspicious_indicators

# Usage example
headers = {
    'From': 'admin@suspicious-bank.com',
    'Reply-To': 'attacker@evil-domain.com',
    'Subject': 'Urgent: Account Verification Required'
}

indicators = analyze_email_headers(headers)
if indicators:
    print("Suspicious email detected:")
    for indicator in indicators:
        print(f"  - {indicator}")
\`\`\`

**Supply Chain Compromises**
Supply chain attacks have become increasingly common, as demonstrated in our [malware analysis tutorials](/tutorials/malware-analysis). These attacks target:

- Software vendors and their distribution channels
- Development tools and CI/CD pipelines
- Third-party libraries and dependencies

**Watering Hole Attacks**
These strategic attacks compromise websites frequently visited by target organizations. Our [web security guide](/tutorials/web-security) covers detection methods for such compromises.

### Persistence and Lateral Movement

Once inside a network, APT actors focus on establishing persistence and expanding their foothold. This phase is critical and often determines the success of the entire operation.

**Living off the Land Techniques**
Modern APTs increasingly use legitimate system tools to avoid detection:

\`\`\`bash
#!/bin/bash
# Example of legitimate tools used maliciously

# PowerShell for credential harvesting
powershell.exe -NoProfile -WindowStyle Hidden -Command "
  Get-WmiObject -Class Win32_Process | 
  Where-Object {$_.Name -like '*chrome*' -or $_.Name -like '*firefox*'} |
  ForEach-Object {
    Write-Host 'Browser process detected:' $_.ProcessId
  }"

# WMI for persistence
wmic /node:target-host process call create "cmd.exe /c echo 'Backdoor installed' > c:\\temp\\log.txt"

# Registry manipulation for persistence
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run" /v "SecurityUpdate" /t REG_SZ /d "c:\\windows\\system32\\backdoor.exe" /f
\`\`\`

**Advanced Credential Harvesting**
APTs employ sophisticated credential harvesting techniques beyond basic keyloggers:

\`\`\`python
# Simulated credential extraction (for educational purposes)
import base64
import json

def extract_browser_credentials():
    """Educational example of credential extraction methods"""
    
    # Common browser credential storage locations (read-only analysis)
    credential_paths = {
        'chrome': '%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\Login Data',
        'firefox': '%APPDATA%\\Mozilla\\Firefox\\Profiles\\*.default\\logins.json',
        'edge': '%LOCALAPPDATA%\\Microsoft\\Edge\\User Data\\Default\\Login Data'
    }
    
    # This is for educational analysis only
    print("Browser credential storage locations:")
    for browser, path in credential_paths.items():
        print(f"  {browser}: {path}")
    
    # In real scenarios, this data would be encrypted
    # Modern browsers use OS-level encryption (DPAPI on Windows)
    return credential_paths

# Example usage for forensic analysis
paths = extract_browser_credentials()
\`\`\`

For more detailed information on credential security, refer to our [penetration testing course](/tutorials/penetration-testing).

## Detection and Mitigation Strategies

### Behavioral Analytics

Modern APT detection relies heavily on behavioral analysis rather than signature-based detection. This approach is covered extensively in our [threat hunting tutorials](/tutorials/threat-hunting).

**User and Entity Behavior Analytics (UEBA)**
UEBA systems establish baseline behavior patterns for users and entities, then detect anomalies:

\`\`\`python
# Simplified UEBA implementation example
import numpy as np
from datetime import datetime, timedelta

class UEBADetector:
    def __init__(self):
        self.user_baselines = {}
        self.anomaly_threshold = 2.0  # Standard deviations
    
    def establish_baseline(self, user_id, login_times, access_patterns):
        """Establish normal behavior baseline for a user"""
        self.user_baselines[user_id] = {
            'avg_login_hour': np.mean(login_times),
            'std_login_hour': np.std(login_times),
            'common_resources': set(access_patterns),
            'last_updated': datetime.now()
        }
    
    def detect_anomaly(self, user_id, login_hour, accessed_resources):
        """Detect behavioral anomalies"""
        if user_id not in self.user_baselines:
            return False, "No baseline established"
        
        baseline = self.user_baselines[user_id]
        
        # Check login time anomaly
        time_deviation = abs(login_hour - baseline['avg_login_hour']) / baseline['std_login_hour']
        
        # Check resource access anomaly
        unusual_resources = set(accessed_resources) - baseline['common_resources']
        
        anomalies = []
        if time_deviation > self.anomaly_threshold:
            anomalies.append(f"Unusual login time (deviation: {time_deviation:.2f})")
        
        if unusual_resources:
            anomalies.append(f"Accessing unusual resources: {unusual_resources}")
        
        return len(anomalies) > 0, anomalies

# Usage example
detector = UEBADetector()

# Establish baseline for user
normal_logins = [9, 9.5, 8.5, 9.2, 8.8]  # Normal login hours
normal_resources = ['email', 'shared_drive', 'crm_system']
detector.establish_baseline('user123', normal_logins, normal_resources)

# Check for anomalies
is_anomaly, details = detector.detect_anomaly('user123', 2.0, ['email', 'finance_server', 'admin_panel'])
if is_anomaly:
    print("Anomaly detected:")
    for detail in details:
        print(f"  - {detail}")
\`\`\`

### Network Traffic Analysis

Deep packet inspection and network flow analysis are crucial for APT detection. Our [network security monitoring guide](/tutorials/network-security-monitoring) provides comprehensive coverage of these techniques.

**Command and Control Detection**
APTs often use encrypted channels for C2 communication:

\`\`\`python
# Network traffic analysis for C2 detection
import socket
import struct
from collections import defaultdict

class C2Detector:
    def __init__(self):
        self.connection_patterns = defaultdict(list)
        self.suspicious_indicators = {
            'beacon_intervals': [60, 300, 900],  # Common beacon intervals in seconds
            'suspicious_ports': [8080, 443, 53, 80],
            'data_sizes': range(100, 1500)  # Typical C2 packet sizes
        }
    
    def analyze_connection(self, src_ip, dst_ip, dst_port, packet_size, timestamp):
        """Analyze network connections for C2 patterns"""
        connection_key = f"{src_ip}->{dst_ip}:{dst_port}"
        self.connection_patterns[connection_key].append({
            'timestamp': timestamp,
            'size': packet_size
        })
        
        # Check for beacon patterns
        if len(self.connection_patterns[connection_key]) >= 3:
            intervals = self._calculate_intervals(connection_key)
            if self._is_beacon_pattern(intervals):
                return True, f"Beacon pattern detected: {connection_key}"
        
        return False, None
    
    def _calculate_intervals(self, connection_key):
        """Calculate time intervals between connections"""
        connections = sorted(self.connection_patterns[connection_key], 
                           key=lambda x: x['timestamp'])
        intervals = []
        for i in range(1, len(connections)):
            interval = connections[i]['timestamp'] - connections[i-1]['timestamp']
            intervals.append(interval)
        return intervals
    
    def _is_beacon_pattern(self, intervals):
        """Check if intervals match beacon patterns"""
        if not intervals:
            return False
        
        # Check for consistent intervals (potential beaconing)
        avg_interval = sum(intervals) / len(intervals)
        variance = sum((x - avg_interval)**2 for x in intervals) / len(intervals)
        
        # Low variance indicates regular beaconing
        return variance < (avg_interval * 0.1)

# Example usage
detector = C2Detector()

# Simulate network connections
connections = [
    ('192.168.1.100', '203.0.113.10', 443, 234, 1000),
    ('192.168.1.100', '203.0.113.10', 443, 241, 1300),
    ('192.168.1.100', '203.0.113.10', 443, 238, 1600),
    ('192.168.1.100', '203.0.113.10', 443, 235, 1900),
]

for src, dst, port, size, time in connections:
    is_suspicious, reason = detector.analyze_connection(src, dst, port, size, time)
    if is_suspicious:
        print(f"Suspicious activity: {reason}")
\`\`\`

## Real-World Case Studies

### Case Study 1: The Shadow Network Campaign

In our detailed analysis available in the [incident response playbook](/tutorials/incident-response), we examined a sophisticated APT campaign targeting financial institutions.

**Attack Timeline:**
1. **Initial Compromise** - Supply chain attack through compromised software update
2. **Establishment of Persistence** - Custom backdoors with encrypted communication
3. **Lateral Movement** - Living off the land techniques using PowerShell and WMI
4. **Data Exfiltration** - Staged data collection over encrypted channels

**Key Lessons:**
- Importance of supply chain security assessments
- Need for comprehensive network segmentation
- Value of behavioral monitoring and threat hunting

For hands-on practice with similar scenarios, check our [Capture The Flag challenges](/ctf).

### Case Study 2: Operation Digital Eclipse

This campaign, detailed in our [digital forensics course](/tutorials/digital-forensics), demonstrated advanced persistence techniques.

**Advanced Techniques Observed:**
- Use of legitimate cloud services for C2
- Custom malware with anti-analysis capabilities
- Sophisticated social engineering campaigns

**Detection Methods:**
- Anomalous network traffic patterns
- Unusual PowerShell execution patterns
- Behavioral analysis of user activities

## Advanced Defense Strategies

### Zero Trust Architecture Implementation

Zero Trust has become essential for APT defense. Our [enterprise security guide](/tutorials/enterprise-security) covers implementation in detail.

\`\`\`python
# Zero Trust policy engine example
class ZeroTrustPolicy:
    def __init__(self):
        self.trust_scores = {}
        self.access_policies = {}
    
    def calculate_trust_score(self, user_id, device_id, location, time_of_access):
        """Calculate dynamic trust score"""
        score = 100  # Start with full trust
        
        # Location-based risk
        if self._is_unusual_location(user_id, location):
            score -= 30
        
        # Time-based risk
        if self._is_unusual_time(user_id, time_of_access):
            score -= 20
        
        # Device risk
        if not self._is_managed_device(device_id):
            score -= 40
        
        # Behavioral risk
        if self._has_recent_anomalies(user_id):
            score -= 25
        
        return max(0, score)
    
    def evaluate_access_request(self, user_id, resource, trust_score):
        """Evaluate access request based on Zero Trust principles"""
        resource_sensitivity = self._get_resource_sensitivity(resource)
        required_score = self._get_required_trust_score(resource_sensitivity)
        
        if trust_score >= required_score:
            return True, "Access granted"
        else:
            return False, f"Access denied - Trust score {trust_score} below required {required_score}"
    
    def _is_unusual_location(self, user_id, location):
        # Implementation would check against user's typical locations
        return False
    
    def _is_unusual_time(self, user_id, time_of_access):
        # Implementation would check against user's typical work hours
        return False
    
    def _is_managed_device(self, device_id):
        # Implementation would check device management status
        return True
    
    def _has_recent_anomalies(self, user_id):
        # Implementation would check recent behavioral anomalies
        return False
    
    def _get_resource_sensitivity(self, resource):
        sensitivity_map = {
            'public_docs': 'low',
            'internal_systems': 'medium',
            'financial_data': 'high',
            'executive_files': 'critical'
        }
        return sensitivity_map.get(resource, 'medium')
    
    def _get_required_trust_score(self, sensitivity):
        score_requirements = {
            'low': 50,
            'medium': 70,
            'high': 85,
            'critical': 95
        }
        return score_requirements.get(sensitivity, 70)

# Example usage
zt_policy = ZeroTrustPolicy()
trust_score = zt_policy.calculate_trust_score('user123', 'device456', 'Office Building A', '09:30')
can_access, message = zt_policy.evaluate_access_request('user123', 'financial_data', trust_score)
print(f"Access result: {message}")
\`\`\`

### Threat Intelligence Integration

Effective APT defense requires comprehensive threat intelligence. Our [threat intelligence course](/tutorials/threat-intelligence) covers collection and analysis techniques.

**Strategic Intelligence Integration:**
- Understanding threat actor motivations and capabilities
- Geopolitical context and targeting patterns
- Long-term trend analysis and predictions

For practical implementation, explore our [security operations center setup guide](/tutorials/soc-setup).

## Emerging Trends and Future Challenges

### AI-Enhanced APTs

The integration of artificial intelligence in APT operations presents new challenges covered in our [AI security course](/tutorials/ai-security).

**Machine Learning Evasion Techniques:**
- Adversarial attacks against detection systems
- Automated evasion technique generation
- Dynamic malware adaptation

### Cloud-Native APT Evolution

As organizations migrate to cloud environments, APT actors adapt their techniques. Our [cloud security tutorials](/tutorials/cloud-security) address these evolving threats.

## Conclusion

Advanced Persistent Threats continue to evolve in sophistication and impact. Organizations must adopt a comprehensive, multi-layered defense strategy that includes:

1. **Advanced Detection Capabilities** - Behavioral analytics and machine learning
2. **Threat Hunting Programs** - Proactive threat identification
3. **Zero Trust Architecture** - Never trust, always verify
4. **Continuous Security Improvement** - Regular assessment and updates

For hands-on practice with APT scenarios, visit our [virtual labs](/labs) or join our [cybersecurity community](/community) for peer learning and discussion.

**Related Resources:**
- [Complete APT Defense Checklist](/tutorials/apt-defense-checklist)
- [Enterprise Incident Response Planning](/tutorials/enterprise-incident-response)
- [Advanced Threat Hunting Techniques](/tutorials/advanced-threat-hunting)
- [Security Architecture Best Practices](/tutorials/security-architecture)

Success against APTs requires combining technology, processes, and people in a coordinated defense strategy. As threat actors continue to evolve their techniques, so must our defensive capabilities and organizational security maturity.`,
    author: "Sarah Chen",
    authorRole: "Senior Threat Intelligence Analyst",
    authorBio: "Sarah Chen is a cybersecurity expert with over 15 years of experience in threat intelligence and incident response. She has led security teams at Fortune 500 companies and government agencies.",
    authorAvatar: "https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    date: "2024-12-15",
    publishedAt: "2024-12-15T10:30:00Z",
    updatedAt: "2024-12-15T10:30:00Z",
    category: "Threat Intelligence",
    tags: ["APT", "Cyber Warfare", "Defense Strategies", "Threat Hunting", "Zero Trust"],
    readTime: "12 min read",
    views: 15420,
    comments: 67,
    likes: 234,
    shares: 89,
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    difficulty: "Advanced",
    series: "APT Analysis 2024",
    relatedPosts: [
      {
        id: '2',
        title: "Buffer Overflow Exploitation in Modern Applications",
        slug: 'zero-day-vulnerability-cms',
        image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
      },
      {
        id: '3',
        title: "Building a Career in Cybersecurity: 2024 Complete Guide",
        slug: 'cybersecurity-career-guide-2024',
        image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
      }
    ]
  };

  useEffect(() => {
    // Calculate reading time based on content length
    const wordsPerMinute = 200;
    const words = blogPost.content.split(/\s+/).length;
    setEstimatedReadTime(Math.ceil(words / wordsPerMinute));

    // Track reading progress
    const handleScroll = () => {
      const article = document.querySelector('.blog-content');
      if (article) {
        const articleTop = (article as HTMLElement).offsetTop;
        const articleHeight = (article as HTMLElement).offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        
        const progress = Math.min(
          Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
          1
        );
        setReadingProgress(progress * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [blogPost.content]);

  // Process content to render code snippets and internal links
  const processContent = (content: string) => {
    // Convert markdown-style code blocks to CodeSnippet components
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/g;
    let processedContent = content;
    
    // Replace code blocks with CodeSnippet components
    processedContent = processedContent.replace(codeBlockRegex, (match, language, code) => {
      return `<div class="code-snippet" data-language="${language || 'bash'}" data-code="${btoa(code.trim())}"></div>`;
    });

    // Convert internal links
    const linkRegex = /\[([^\]]+)\]\(\/([^)]+)\)/g;
    processedContent = processedContent.replace(linkRegex, (match, text, url) => {
      return `<a href="/${url}" class="internal-link">${text} <svg class="inline-link-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>`;
    });

    return processedContent;
  };

  const structuredData = {
    headline: blogPost.title,
    description: blogPost.excerpt,
    author: {
      name: blogPost.author,
      type: "Person"
    },
    publisher: {
      name: "HackTheShell",
      logo: "/logo.png"
    },
    datePublished: blogPost.publishedAt,
    dateModified: blogPost.updatedAt,
    image: blogPost.image,
    url: `https://hacktheshell.com/blog/${blogPost.slug}`,
    mainEntityOfPage: `https://hacktheshell.com/blog/${blogPost.slug}`,
    articleSection: blogPost.category,
    wordCount: blogPost.content.split(/\s+/).length,
    keywords: blogPost.tags
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-500/20';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-500/20';
      case 'Advanced': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-500/20';
      case 'Expert': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-500/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-500/20';
    }
  };

  return (
    <>
      <AdvancedSEO
        title={`${blogPost.title} | HackTheShell`}
        description={blogPost.excerpt}
        keywords={blogPost.tags.join(', ')}
        canonicalUrl={`https://hacktheshell.com/blog/${blogPost.slug}`}
        ogImage={blogPost.image}
        ogType="article"
        articleData={{
          author: blogPost.author,
          publishedTime: blogPost.publishedAt,
          modifiedTime: blogPost.updatedAt,
          section: blogPost.category,
          tags: blogPost.tags
        }}
      />
      
      <SEOStructuredData type="article" data={structuredData} />

      {/* Custom styles for internal links and code snippets */}
      <style>{`
        .internal-link {
          color: #10b981;
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid #10b981;
          transition: all 0.2s ease;
        }
        .internal-link:hover {
          color: #047857;
          border-bottom-color: #047857;
        }
        .dark .internal-link {
          color: #34d399;
          border-bottom-color: #34d399;
        }
        .dark .internal-link:hover {
          color: #10b981;
          border-bottom-color: #10b981;
        }
        .inline-link-icon {
          display: inline;
          width: 14px;
          height: 14px;
          margin-left: 4px;
        }
      `}</style>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
          style={{ width: `${readingProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pt-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <Link
                  href="/blog"
                  className={`inline-flex items-center space-x-2 ${
                    isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500'
                  } transition-colors mb-6 group`}
                >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Blog</span>
                </Link>

                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm mb-6">
                  <Link href="/" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                    Home
                  </Link>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <Link href="/blog" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                    Blog
                  </Link>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <span className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {blogPost.category}
                  </span>
                </nav>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {blogPost.category}
                  </span>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(blogPost.difficulty)}`}>
                    {blogPost.difficulty}
                  </span>
                  {blogPost.series && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                    }`}>
                      Series: {blogPost.series}
                    </span>
                  )}
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900 dark:text-white">{blogPost.title}</h1>
                
                <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-8`}>
                  {blogPost.excerpt}
                </p>

                {/* Author & Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                  <div className="flex items-center space-x-4">
                    <img
                      src={blogPost.authorAvatar}
                      alt={blogPost.author}
                      className="w-14 h-14 rounded-full"
                    />
                    <div>
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {blogPost.author}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {blogPost.authorRole}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(blogPost.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{estimatedReadTime} min read</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{blogPost.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <img
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
              </motion.div>

              {/* Article Content with Code Snippets */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`blog-content prose prose-lg max-w-none ${
                  isDark ? 'prose-invert' : ''
                }`}
                dangerouslySetInnerHTML={{ 
                  __html: processContent(blogPost.content)
                    .replace(/\n/g, '<br/>')
                    .replace(/#{1} /g, '<h1 class="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white">')
                    .replace(/#{2} /g, '<h2 class="text-2xl lg:text-3xl font-bold mb-4 text-gray-900 dark:text-white">')
                    .replace(/#{3} /g, '<h3 class="text-xl lg:text-2xl font-semibold mb-3 text-gray-900 dark:text-white">')
                }}
              />

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
              >
                <Tag className="h-5 w-5 text-gray-500 mr-2" />
                {blogPost.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } transition-colors cursor-pointer`}
                  >
                    #{tag}
                  </span>
                ))}
              </motion.div>

              {/* Related Posts */}
              {blogPost.relatedPosts && blogPost.relatedPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="mt-12"
                >
                  <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-gray-900 dark:text-white">Related Articles</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {blogPost.relatedPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className={`card-elevated p-6 group block`}
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        <h4 className={`font-semibold ${isDark ? 'text-white group-hover:text-emerald-400' : 'text-gray-900 group-hover:text-emerald-600'} transition-colors`}>
                          {post.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Comments Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-16"
              >
                <EnhancedCommentSystemV2
                  postId={parseInt(blogPost.id)}
                  postType="blog"
                />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                <TableOfContents
                  content={blogPost.content}
                  showOnMobile={true}
                />

                {/* Quick Links */}
                <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Related Tutorials
                  </h4>
                  <div className="space-y-3">
                    <Link href="/tutorials/penetration-testing" className={`block text-sm ${
                      isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500'
                    } transition-colors flex items-center space-x-2`}>
                      <ExternalLink className="h-3 w-3" />
                      <span>Penetration Testing Course</span>
                    </Link>
                    <Link href="/tutorials/threat-hunting" className={`block text-sm ${
                      isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500'
                    } transition-colors flex items-center space-x-2`}>
                      <ExternalLink className="h-3 w-3" />
                      <span>Threat Hunting Guide</span>
                    </Link>
                    <Link href="/tutorials/incident-response" className={`block text-sm ${
                      isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500'
                    } transition-colors flex items-center space-x-2`}>
                      <ExternalLink className="h-3 w-3" />
                      <span>Incident Response</span>
                    </Link>
                  </div>
                </div>

                {/* Reading Stats */}
                <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 border ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Article Stats
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Reading Progress</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {Math.round(readingProgress)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Est. Reading Time</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {estimatedReadTime} min
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Word Count</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {blogPost.content.split(/\s+/).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnhancedBlogPostPageWithLinks;