import React, { useState } from 'react';
import { Calendar, User, ArrowRight, TrendingUp, Shield, AlertTriangle, Clock, Eye, MessageSquare, Share2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Blog = () => {
  const { isDark } = useTheme();
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const blogPosts = [
    {
      title: "2024 Cybersecurity Threat Landscape: What You Need to Know",
      excerpt: "Explore the latest cyber threats dominating 2024, from AI-powered attacks to supply chain vulnerabilities, and learn how to defend against them.",
      content: `The cybersecurity landscape in 2024 has evolved dramatically, with threat actors leveraging artificial intelligence and machine learning to create more sophisticated attacks. This comprehensive analysis covers the top threats organizations face today.

**Key Threats in 2024:**

1. **AI-Powered Attacks**: Cybercriminals are using AI to automate phishing campaigns, create deepfake content for social engineering, and develop polymorphic malware that evades traditional detection methods.

2. **Supply Chain Vulnerabilities**: The SolarWinds attack highlighted the devastating impact of supply chain compromises. In 2024, we've seen a 300% increase in supply chain attacks targeting software vendors and third-party services.

3. **Ransomware-as-a-Service (RaaS)**: The commoditization of ransomware has lowered the barrier to entry for cybercriminals. New RaaS platforms offer user-friendly interfaces and customer support, making ransomware attacks more accessible.

4. **Cloud Security Misconfigurations**: As organizations accelerate cloud adoption, misconfigurations remain a leading cause of data breaches. Common issues include exposed databases, overprivileged access, and inadequate encryption.

**Defense Strategies:**

- Implement Zero Trust Architecture
- Regular security awareness training
- Continuous vulnerability management
- Incident response planning and testing
- Multi-factor authentication across all systems

The key to staying ahead of these threats is maintaining a proactive security posture and staying informed about emerging attack vectors.`,
      author: "Sarah Chen",
      date: "Dec 15, 2024",
      category: "Threat Intelligence",
      readTime: "8 min read",
      views: "12.5K",
      comments: 45,
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      featured: true
    },
    {
      title: "Zero-Day Vulnerability Discovered in Popular CMS Platform",
      excerpt: "Critical security flaw affects millions of websites worldwide. Learn about the vulnerability, its impact, and immediate mitigation steps.",
      content: `A critical zero-day vulnerability has been discovered in one of the world's most popular Content Management Systems, affecting over 40% of all websites globally. This remote code execution vulnerability allows attackers to gain complete control over affected systems.

**Vulnerability Details:**

- **CVE ID**: CVE-2024-12345
- **CVSS Score**: 9.8 (Critical)
- **Affected Versions**: All versions prior to 6.4.2
- **Attack Vector**: Remote, unauthenticated
- **Impact**: Complete system compromise

**Technical Analysis:**

The vulnerability exists in the file upload functionality where insufficient input validation allows attackers to upload malicious PHP files. The flaw bypasses existing security measures through a technique called "double extension bypass."

**Proof of Concept:**

\`\`\`bash
# Example exploit (for educational purposes only)
curl -X POST "http://target.com/wp-admin/admin-ajax.php" \\
  -F "action=upload_file" \\
  -F "file=@malicious.php.jpg;type=image/jpeg"
\`\`\`

**Immediate Actions Required:**

1. **Update Immediately**: Upgrade to version 6.4.2 or later
2. **Web Application Firewall**: Implement WAF rules to block malicious uploads
3. **File Upload Restrictions**: Disable file uploads if not required
4. **Monitor Logs**: Check for suspicious upload activities
5. **Backup Verification**: Ensure recent backups are clean and accessible

**Long-term Recommendations:**

- Implement Content Security Policy (CSP)
- Regular security audits and penetration testing
- Employee security awareness training
- Incident response plan activation

Organizations should treat this as a critical security incident and prioritize patching immediately.`,
      author: "Marcus Rodriguez",
      date: "Dec 14, 2024",
      category: "Breaking News",
      readTime: "5 min read",
      views: "25.8K",
      comments: 78,
      image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      urgent: true
    },
    {
      title: "Building a Career in Cybersecurity: 2024 Complete Guide",
      excerpt: "Complete roadmap for aspiring cybersecurity professionals, including essential skills, certifications, and career paths.",
      content: `The cybersecurity industry continues to face a massive talent shortage, with over 3.5 million unfilled positions globally. This presents an incredible opportunity for those looking to enter this exciting and rewarding field.

**Why Choose Cybersecurity?**

- **High Demand**: Job growth rate of 31% through 2029
- **Excellent Compensation**: Average salary ranges from $75K-$200K+
- **Job Security**: Essential role in every organization
- **Continuous Learning**: Ever-evolving field with new challenges
- **Making a Difference**: Protecting organizations and individuals

**Essential Skills for 2024:**

**Technical Skills:**
- Network security fundamentals
- Cloud security (AWS, Azure, GCP)
- Programming (Python, PowerShell, Bash)
- Incident response and forensics
- Vulnerability assessment and penetration testing
- Security frameworks (NIST, ISO 27001)

**Soft Skills:**
- Communication and presentation
- Problem-solving and critical thinking
- Project management
- Risk assessment
- Business acumen

**Career Paths:**

1. **Security Analyst**: Entry-level position monitoring security events
2. **Penetration Tester**: Ethical hacker finding vulnerabilities
3. **Security Architect**: Designing secure systems and infrastructure
4. **Incident Response Specialist**: Managing security breaches
5. **Compliance Officer**: Ensuring regulatory compliance
6. **CISO**: Chief Information Security Officer (executive level)

**Recommended Certifications:**

**Entry Level:**
- CompTIA Security+
- CompTIA Network+
- (ISC)² Systems Security Certified Practitioner (SSCP)

**Intermediate:**
- Certified Ethical Hacker (CEH)
- CompTIA CySA+
- GIAC Security Essentials (GSEC)

**Advanced:**
- Certified Information Systems Security Professional (CISSP)
- Certified Information Security Manager (CISM)
- GIAC certifications (GCIH, GPEN, GCFA)

**Getting Started:**

1. **Build a Home Lab**: Practice with virtual machines and security tools
2. **Join Communities**: Participate in forums, Discord servers, and local meetups
3. **Contribute to Open Source**: Contribute to security projects on GitHub
4. **Attend Conferences**: DEF CON, BSides, RSA Conference
5. **Practice CTFs**: Capture The Flag competitions for hands-on experience

**Salary Expectations (US Market):**

- Entry Level: $55,000 - $75,000
- Mid-Level: $75,000 - $120,000
- Senior Level: $120,000 - $180,000
- Executive Level: $180,000 - $300,000+

The cybersecurity field offers incredible opportunities for growth, learning, and making a real impact. Start your journey today!`,
      author: "Dr. Alex Thompson",
      date: "Dec 12, 2024",
      category: "Career",
      readTime: "12 min read",
      views: "18.2K",
      comments: 92,
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      title: "AI in Cybersecurity: Friend or Foe?",
      excerpt: "Examining how artificial intelligence is reshaping both cyber attacks and defense strategies in the modern threat landscape.",
      content: `Artificial Intelligence is revolutionizing cybersecurity, serving as both a powerful defensive tool and a sophisticated weapon in the hands of cybercriminals. Understanding this dual nature is crucial for security professionals in 2024.

**AI in Cyber Defense:**

**Threat Detection and Response:**
- Machine learning algorithms can identify anomalous behavior patterns
- AI-powered SIEM systems reduce false positives by 85%
- Automated incident response reduces response time from hours to minutes
- Behavioral analytics detect insider threats and advanced persistent threats

**Vulnerability Management:**
- AI scans code repositories for security flaws
- Automated patch management prioritizes critical vulnerabilities
- Predictive analytics forecast potential attack vectors
- Risk scoring helps prioritize remediation efforts

**Security Operations:**
- Chatbots handle routine security queries
- Automated compliance reporting and monitoring
- Intelligent threat hunting identifies hidden threats
- Security orchestration automates repetitive tasks

**AI in Cyber Attacks:**

**Sophisticated Phishing:**
- AI generates personalized phishing emails at scale
- Deepfake technology creates convincing video/audio for social engineering
- Natural language processing crafts believable pretexts
- Machine learning adapts attacks based on victim responses

**Malware Evolution:**
- Polymorphic malware changes its signature to evade detection
- AI-powered botnets coordinate distributed attacks
- Adversarial machine learning attacks fool AI security systems
- Automated vulnerability discovery finds zero-day exploits

**The Arms Race:**

The cybersecurity landscape has become an AI arms race, with both attackers and defenders leveraging increasingly sophisticated AI technologies. Key considerations:

**For Defenders:**
- Invest in AI-powered security tools
- Train security teams on AI technologies
- Implement explainable AI for transparency
- Maintain human oversight of AI decisions

**Challenges:**
- AI bias can lead to discriminatory security policies
- Adversarial attacks can fool AI systems
- High computational costs for advanced AI
- Shortage of AI security expertise

**Future Outlook:**

The integration of AI in cybersecurity will continue to accelerate. Organizations must:

1. Develop AI governance frameworks
2. Invest in AI security research and development
3. Foster collaboration between AI and security teams
4. Prepare for AI-powered attacks
5. Maintain ethical AI practices

The question isn't whether AI will transform cybersecurity—it already has. The question is how quickly organizations can adapt to this new reality.`,
      author: "Jennifer Liu",
      date: "Dec 10, 2024",
      category: "Technology",
      readTime: "10 min read",
      views: "15.7K",
      comments: 63,
      image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      title: "Ransomware Evolution: New Tactics and Defense Strategies",
      excerpt: "Analysis of the latest ransomware techniques and comprehensive strategies to protect your organization from attacks.",
      content: `Ransomware continues to evolve at an alarming pace, with cybercriminals developing new tactics to maximize damage and profits. Understanding these evolving threats is essential for building effective defenses.

**Evolution of Ransomware:**

**Traditional Ransomware (2010-2018):**
- Simple file encryption
- Mass distribution via email
- Basic ransom demands
- Limited targeting

**Modern Ransomware (2019-Present):**
- Double and triple extortion
- Targeted attacks on high-value organizations
- Living-off-the-land techniques
- Ransomware-as-a-Service (RaaS) models

**Current Ransomware Trends:**

**1. Double Extortion:**
Attackers not only encrypt data but also steal it, threatening to publish sensitive information if ransom isn't paid.

**2. Supply Chain Attacks:**
Targeting managed service providers (MSPs) to reach multiple victims simultaneously.

**3. Cloud Infrastructure Targeting:**
Ransomware groups increasingly target cloud environments and SaaS applications.

**4. Industrial Control Systems:**
Attacks on operational technology (OT) and industrial control systems (ICS).

**Major Ransomware Families in 2024:**

**LockBit 3.0:**
- Most active ransomware group
- Sophisticated encryption algorithms
- Extensive affiliate network
- Targets critical infrastructure

**BlackCat (ALPHV):**
- Written in Rust programming language
- Cross-platform capabilities
- Advanced evasion techniques
- High-profile victim targeting

**Cl0p:**
- Specializes in zero-day exploitation
- Mass exploitation campaigns
- File transfer application targeting
- Data theft focus

**Defense Strategies:**

**1. Backup and Recovery:**
- Implement 3-2-1 backup strategy
- Regular backup testing and validation
- Air-gapped backup storage
- Immutable backup solutions

**2. Network Segmentation:**
- Micro-segmentation of critical assets
- Zero Trust network architecture
- Lateral movement prevention
- Critical system isolation

**3. Endpoint Protection:**
- Next-generation antivirus (NGAV)
- Endpoint detection and response (EDR)
- Application whitelisting
- Behavioral analysis

**4. Email Security:**
- Advanced threat protection
- User awareness training
- Email authentication (SPF, DKIM, DMARC)
- Attachment sandboxing

**5. Vulnerability Management:**
- Regular vulnerability assessments
- Prioritized patch management
- Zero-day protection
- Asset inventory management

**Incident Response Plan:**

**Preparation:**
- Develop comprehensive IR plan
- Regular tabletop exercises
- Incident response team training
- Communication templates

**Detection and Analysis:**
- 24/7 security monitoring
- Threat hunting capabilities
- Forensic analysis procedures
- Evidence preservation

**Containment and Eradication:**
- Network isolation procedures
- Malware removal processes
- System rebuilding protocols
- Threat actor eviction

**Recovery:**
- Business continuity planning
- System restoration procedures
- Data recovery validation
- Lessons learned documentation

**Regulatory Considerations:**

Organizations must also consider regulatory requirements:
- GDPR breach notification (72 hours)
- SEC cybersecurity disclosure rules
- Industry-specific compliance requirements
- Cyber insurance policy compliance

**The Human Factor:**

Remember that 95% of successful ransomware attacks involve human error. Invest in:
- Regular security awareness training
- Phishing simulation exercises
- Incident reporting procedures
- Security culture development

Ransomware remains one of the most significant cybersecurity threats. A comprehensive, layered defense strategy combined with regular testing and updates is essential for protection.`,
      author: "Michael Park",
      date: "Dec 8, 2024",
      category: "Malware Analysis",
      readTime: "15 min read",
      views: "22.1K",
      comments: 87,
      image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      title: "Cloud Security Best Practices for 2024",
      excerpt: "Essential security measures for cloud infrastructure, covering AWS, Azure, and Google Cloud Platform security configurations.",
      content: `As organizations continue their digital transformation journey, cloud security has become more critical than ever. With 94% of enterprises using cloud services, understanding cloud security best practices is essential for protecting your organization's data and infrastructure.

**Cloud Security Fundamentals:**

**Shared Responsibility Model:**
Understanding the division of security responsibilities between cloud providers and customers is crucial:

- **Cloud Provider**: Physical security, infrastructure, hypervisor
- **Customer**: Data, applications, operating systems, network configuration

**Identity and Access Management (IAM):**

**AWS IAM Best Practices:**
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::my-bucket/*",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": "203.0.113.0/24"
        }
      }
    }
  ]
}
\`\`\`

**Azure Active Directory:**
- Implement Conditional Access policies
- Enable Multi-Factor Authentication (MFA)
- Use Privileged Identity Management (PIM)
- Regular access reviews and certifications

**Google Cloud IAM:**
- Principle of least privilege
- Service account key rotation
- Organization policy constraints
- Cloud Asset Inventory monitoring

**Network Security:**

**Virtual Private Clouds (VPCs):**
- Proper subnet segmentation
- Network Access Control Lists (NACLs)
- Security group configuration
- VPC Flow Logs monitoring

**Example AWS Security Group:**
\`\`\`bash
aws ec2 create-security-group \\
  --group-name web-servers \\
  --description "Security group for web servers"

aws ec2 authorize-security-group-ingress \\
  --group-name web-servers \\
  --protocol tcp \\
  --port 443 \\
  --cidr 0.0.0.0/0
\`\`\`

**Data Protection:**

**Encryption:**
- Encryption at rest and in transit
- Key management best practices
- Hardware Security Modules (HSMs)
- Certificate lifecycle management

**Data Classification:**
- Sensitive data identification
- Data loss prevention (DLP)
- Data retention policies
- Privacy compliance (GDPR, CCPA)

**Monitoring and Logging:**

**AWS CloudTrail Configuration:**
\`\`\`json
{
  "Trail": {
    "Name": "security-audit-trail",
    "S3BucketName": "security-logs-bucket",
    "IncludeGlobalServiceEvents": true,
    "IsMultiRegionTrail": true,
    "EnableLogFileValidation": true,
    "EventSelectors": [
      {
        "ReadWriteType": "All",
        "IncludeManagementEvents": true,
        "DataResources": [
          {
            "Type": "AWS::S3::Object",
            "Values": ["arn:aws:s3:::sensitive-data-bucket/*"]
          }
        ]
      }
    ]
  }
}
\`\`\`

**Security Monitoring Tools:**
- AWS GuardDuty / Azure Sentinel / Google Security Command Center
- Cloud Security Posture Management (CSPM)
- Cloud Workload Protection Platforms (CWPP)
- Security Information and Event Management (SIEM)

**Container Security:**

**Docker Security:**
\`\`\`dockerfile
# Use minimal base images
FROM alpine:3.18

# Create non-root user
RUN addgroup -g 1001 appgroup && \\
    adduser -u 1001 -G appgroup -s /bin/sh -D appuser

# Set user
USER appuser

# Use COPY instead of ADD
COPY --chown=appuser:appgroup app.py /app/

# Set read-only filesystem
RUN chmod -R 555 /app
\`\`\`

**Kubernetes Security:**
- Pod Security Standards
- Network policies
- RBAC configuration
- Admission controllers

**Compliance and Governance:**

**Compliance Frameworks:**
- SOC 2 Type II
- ISO 27001
- PCI DSS
- HIPAA
- FedRAMP

**Cloud Governance:**
- Resource tagging strategies
- Cost optimization
- Policy enforcement
- Automated compliance checking

**Incident Response in the Cloud:**

**Cloud-Specific IR Considerations:**
- Forensic data collection in ephemeral environments
- Log aggregation and analysis
- Snapshot and image preservation
- Cross-region incident coordination

**Automation and Infrastructure as Code:**

**Terraform Security Example:**
\`\`\`hcl
resource "aws_s3_bucket" "secure_bucket" {
  bucket = "my-secure-bucket"
}

resource "aws_s3_bucket_encryption" "secure_bucket_encryption" {
  bucket = aws_s3_bucket.secure_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "secure_bucket_pab" {
  bucket = aws_s3_bucket.secure_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
\`\`\`

**Emerging Cloud Security Trends:**

1. **Zero Trust Architecture**: Never trust, always verify
2. **Cloud-Native Security**: Security built into cloud services
3. **DevSecOps Integration**: Security in CI/CD pipelines
4. **AI-Powered Security**: Machine learning for threat detection
5. **Multi-Cloud Security**: Consistent security across providers

**Action Items for 2024:**

1. Conduct cloud security assessment
2. Implement cloud security posture management
3. Enhance monitoring and logging
4. Develop cloud incident response procedures
5. Train teams on cloud security best practices

Cloud security is not a destination but a continuous journey. Stay informed, stay vigilant, and always follow the principle of least privilege.`,
      author: "Rachel Kim",
      date: "Dec 5, 2024",
      category: "Cloud Security",
      readTime: "7 min read",
      views: "19.3K",
      comments: 56,
      image: "https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Threat Intelligence': isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300',
      'Breaking News': isDark ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-300',
      'Career': isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300',
      'Technology': isDark ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-300',
      'Malware Analysis': isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Cloud Security': isDark ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-cyan-100 text-cyan-700 border-cyan-300'
    };
    return colors[category as keyof typeof colors] || (isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-300');
  };

  const handleReadMore = (index: number) => {
    setSelectedPost(selectedPost === index ? null : index);
  };

  return (
    <section id="blog" className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 left-1/4 w-96 h-96 ${isDark ? 'bg-emerald-500/5' : 'bg-emerald-500/10'} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 ${isDark ? 'bg-teal-500/5' : 'bg-teal-500/10'} rounded-full blur-3xl`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
            Latest <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Blog & News</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-8`}>
            Stay updated with the latest cybersecurity trends, threats, and insights from our expert community.
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts[0] && (
          <div className="mb-16">
            <div className={`${isDark ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20' : 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'} border rounded-2xl p-8 lg:p-12`}>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      FEATURED
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(blogPosts[0].category)}`}>
                      {blogPosts[0].category}
                    </span>
                  </div>
                  <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                    {blogPosts[0].title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 text-lg`}>
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex items-center space-x-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{blogPosts[0].author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{blogPosts[0].date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{blogPosts[0].views}</span>
                      </div>
                    </div>
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{blogPosts[0].readTime}</span>
                  </div>
                  <button 
                    onClick={() => handleReadMore(0)}
                    className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 flex items-center space-x-2"
                  >
                    <span>{selectedPost === 0 ? 'Show Less' : 'Read Full Article'}</span>
                    <ArrowRight className={`h-4 w-4 group-hover:translate-x-1 transition-transform duration-200 ${selectedPost === 0 ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                <div className="relative">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-64 lg:h-80 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-xl"></div>
                </div>
              </div>
              
              {/* Full Article Content */}
              {selectedPost === 0 && (
                <div className={`mt-8 pt-8 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className={`prose max-w-none ${isDark ? 'prose-invert' : 'prose-gray'}`}>
                    <div className="whitespace-pre-line">
                      {blogPosts[0].content}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700/50">
                    <div className="flex items-center space-x-4">
                      <button className={`flex items-center space-x-2 ${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors duration-200`}>
                        <MessageSquare className="h-5 w-5" />
                        <span>{blogPosts[0].comments} Comments</span>
                      </button>
                      <button className={`flex items-center space-x-2 ${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors duration-200`}>
                        <Share2 className="h-5 w-5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <div key={index}>
              <article
                className={`group ${isDark ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/80 hover:border-emerald-500/30' : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-emerald-300'} border rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${isDark ? 'hover:shadow-emerald-500/10' : 'hover:shadow-emerald-500/20'}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    {post.urgent && (
                      <span className="flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        <AlertTriangle className="h-3 w-3" />
                        <span>URGENT</span>
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-white group-hover:text-emerald-300' : 'text-gray-900 group-hover:text-emerald-600'} transition-colors duration-300 line-clamp-2 mb-3`}>
                    {post.title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-3`}>
                    {post.excerpt}
                  </p>

                  <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-4`}>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{post.date}</span>
                    <button 
                      onClick={() => handleReadMore(index + 1)}
                      className={`group/btn ${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500'} transition-colors duration-200 flex items-center space-x-1`}
                    >
                      <span>{selectedPost === index + 1 ? 'Show Less' : 'Read More'}</span>
                      <ArrowRight className={`h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200 ${selectedPost === index + 1 ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </article>

              {/* Full Article Content */}
              {selectedPost === index + 1 && (
                <div className={`mt-6 ${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
                  <div className={`prose max-w-none ${isDark ? 'prose-invert' : 'prose-gray'}`}>
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {post.content}
                    </div>
                  </div>
                  <div className={`flex items-center justify-between mt-6 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center space-x-4">
                      <button className={`flex items-center space-x-2 ${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors duration-200`}>
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments} Comments</span>
                      </button>
                      <button className={`flex items-center space-x-2 ${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors duration-200`}>
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className={`${isDark ? 'bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-gray-300 hover:text-white' : 'bg-gray-200 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-gray-700 hover:text-white'} px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 mx-auto`}>
            <TrendingUp className="h-5 w-5" />
            <span>View All Articles</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;