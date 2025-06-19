import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Eye, MessageSquare, Share2, BookOpen, ChevronRight, Bookmark, Tag, Coffee } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import TableOfContents from '../components/TableOfContents';
import EnhancedCommentSystemV2 from '../components/EnhancedCommentSystemV2';
import SEOStructuredData from '../components/SEOStructuredData';
import AdvancedSEO from '../components/AdvancedSEO';
import BlogContentRenderer from '../components/BlogContentRenderer';

const EnhancedBlogPostPage = () => {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [estimatedReadTime, setEstimatedReadTime] = useState(0);

  // Enhanced blog post data with proper SEO structure
  const blogPost = {
    id: '1',
    slug: '2024-cybersecurity-threat-landscape',
    title: "Advanced Persistent Threats: The Silent Digital Assassins",
    excerpt: "APTs represent the most sophisticated category of cyber attacks, employing stealth, persistence, and advanced techniques to infiltrate high-value targets. Learn how to detect and defend against these evolving threats.",
    content: {
      title: "Advanced Persistent Threats: The Silent Digital Assassins",
      sections: [
        {
          heading: "Introduction",
          level: 2,
          content: "Advanced Persistent Threats (APTs) represent the pinnacle of cybersecurity challenges in 2024. These sophisticated, multi-stage attacks are designed to maintain long-term access to target networks while remaining undetected. Unlike opportunistic attacks, APTs are typically state-sponsored or conducted by well-funded criminal organizations with specific strategic objectives."
        },
        {
          heading: "Understanding APT Methodology",
          level: 2,
          content: "APT groups employ sophisticated techniques that evolve constantly to bypass traditional security measures. Their methodology follows a structured approach designed for maximum impact while maintaining stealth.",
          subsections: [
            {
              heading: "Initial Access Vectors",
              content: "APT groups employ various sophisticated techniques to gain initial access to target environments:",
              points: [
                "Spear Phishing Campaigns: Highly targeted emails with malicious attachments or links, social engineering based on extensive reconnaissance, and use of zero-day exploits in email clients or browsers",
                "Supply Chain Compromises: Infiltration of software vendors or service providers, compromising update mechanisms and distribution channels, and targeting development environments and build systems",
                "Watering Hole Attacks: Compromising websites frequently visited by target organizations, strategic placement of exploit kits on legitimate sites, and leveraging browser vulnerabilities for drive-by downloads"
              ]
            },
            {
              heading: "Persistence and Lateral Movement",
              content: "Once inside a network, APT actors focus on establishing persistence and expanding their foothold:",
              points: [
                "Living off the Land Techniques: Abuse of legitimate system tools and processes, PowerShell and WMI exploitation, and registry manipulation for persistence",
                "Credential Harvesting: Mimikatz and similar tools for credential extraction, Kerberoasting and ASREPRoasting attacks, and Golden ticket and silver ticket attacks",
                "Network Reconnaissance: Internal network mapping and enumeration, identification of high-value targets and assets, and understanding of security controls and monitoring"
              ]
            }
          ]
        },
        {
          heading: "Detection and Mitigation Strategies",
          level: 2,
          content: "Modern APT detection requires a multi-layered approach that combines advanced analytics with proactive threat hunting methodologies.",
          subsections: [
            {
              heading: "Behavioral Analytics",
              content: "Modern APT detection relies heavily on behavioral analysis rather than signature-based detection:",
              points: [
                "User and Entity Behavior Analytics (UEBA): Baseline normal behavior patterns, detect anomalous activities and access patterns, and machine learning algorithms for pattern recognition",
                "Network Traffic Analysis: Deep packet inspection for command and control traffic, detection of encrypted communication channels, and identification of data exfiltration patterns"
              ]
            },
            {
              heading: "Threat Hunting Methodologies",
              content: "Proactive threat hunting is essential for APT detection:",
              points: [
                "Hypothesis-Driven Hunting: Development of threat scenarios based on intelligence, structured hunting methodologies and frameworks, and continuous improvement of detection capabilities",
                "Indicators of Compromise (IoCs): Network indicators such as domains and IP addresses, host-based indicators including file hashes and registry keys, and behavioral indicators and TTPs"
              ]
            }
          ]
        },
        {
          heading: "Real-World Case Studies",
          level: 2,
          content: "Examining recent APT campaigns provides valuable insights into attack methodologies and effective defense strategies.",
          subsections: [
            {
              heading: "Case Study: The Shadow Broker Campaign",
              content: "In early 2024, security researchers identified a sophisticated APT campaign targeting financial institutions across North America. The attackers used a combination of supply chain compromise and social engineering to gain initial access. The attack timeline included initial compromise through a compromised software update, deployment of custom backdoors with encrypted communication, lateral movement using stolen credentials, and data exfiltration over encrypted channels. Key lessons learned include the importance of supply chain security assessments, need for comprehensive network segmentation, and value of behavioral monitoring and threat hunting."
            },
            {
              heading: "Case Study: Operation Digital Eclipse",
              content: "This campaign targeted government agencies and defense contractors, demonstrating advanced persistence techniques and sophisticated evasion methods. Key techniques included use of legitimate cloud services for command and control, living off the land techniques to avoid detection, and custom malware with anti-analysis capabilities. Detection methods involved monitoring anomalous network traffic patterns, unusual PowerShell execution patterns, and behavioral analysis of user activities."
            }
          ]
        },
        {
          heading: "Advanced Defense Strategies",
          level: 2,
          content: "Effective APT defense requires implementing comprehensive security architectures and integrating threat intelligence throughout the organization.",
          subsections: [
            {
              heading: "Zero Trust Architecture",
              content: "Implementing a zero trust security model is crucial for APT defense. Core principles include never trust, always verify, least privilege access controls, and continuous monitoring and validation. Implementation components involve identity and access management (IAM), network segmentation and microsegmentation, and endpoint detection and response (EDR)."
            },
            {
              heading: "Threat Intelligence Integration",
              content: "Effective APT defense requires comprehensive threat intelligence across multiple levels:",
              points: [
                "Strategic Intelligence: Understanding of threat actor motivations and capabilities, geopolitical context and targeting patterns, and long-term trend analysis and predictions",
                "Tactical Intelligence: Specific TTPs and attack methodologies, infrastructure and tooling information, and defensive countermeasures and best practices",
                "Operational Intelligence: Real-time threat feeds and indicators, attribution and campaign tracking, and incident response support"
              ]
            }
          ]
        },
        {
          heading: "Emerging Trends and Future Challenges",
          level: 2,
          content: "The threat landscape continues to evolve with new technologies presenting both opportunities and challenges for cybersecurity professionals.",
          subsections: [
            {
              heading: "AI-Enhanced APTs",
              content: "The integration of artificial intelligence in APT operations presents new challenges:",
              points: [
                "Machine Learning Evasion: Adversarial attacks against detection systems, automated evasion technique generation, and dynamic malware adaptation",
                "Social Engineering Enhancement: AI-generated phishing content, deepfake technology for impersonation, and automated social media reconnaissance"
              ]
            },
            {
              heading: "Cloud-Native APTs",
              content: "As organizations migrate to cloud environments, APT actors are adapting their techniques:",
              points: [
                "Cloud-Specific TTPs: Container and serverless exploitation, cloud API abuse and misconfiguration exploitation, and multi-cloud environment traversal",
                "Detection Challenges: Ephemeral infrastructure and dynamic environments, shared responsibility model complexities, and log aggregation and analysis challenges"
              ]
            }
          ]
        },
        {
          heading: "Conclusion",
          level: 2,
          content: "Advanced Persistent Threats continue to evolve in sophistication and impact. Organizations must adopt a comprehensive, multi-layered defense strategy that includes advanced detection capabilities, threat hunting programs, and continuous security improvement processes. The key to successful APT defense lies in understanding that these are not just technical challenges but strategic business risks that require executive-level attention and resource allocation. Success against APTs requires a combination of technology, processes, and people working together in a coordinated defense strategy. As threat actors continue to evolve their techniques, so must our defensive capabilities and organizational security maturity."
        }
      ]
    },
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
    const totalWords = blogPost.content.sections.reduce((total, section) => {
      let sectionWords = section.content ? section.content.split(/\s+/).length : 0;
      if (section.subsections) {
        sectionWords += section.subsections.reduce((subTotal, subsection) => {
          let subWords = subsection.content ? subsection.content.split(/\s+/).length : 0;
          if (subsection.points) {
            subWords += subsection.points.join(' ').split(/\s+/).length;
          }
          return subTotal + subWords;
        }, 0);
      }
      // Skip points calculation for now to avoid TypeScript errors
      return total + sectionWords;
    }, 0);
    setEstimatedReadTime(Math.ceil(totalWords / wordsPerMinute));

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
  }, []);

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
    wordCount: estimatedReadTime * 200,
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

      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pt-20 overflow-x-hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3 min-w-0 overflow-hidden">
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

                <h1 className="seo-heading-h1 mb-6">{blogPost.title}</h1>
                
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

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(blogPost.date).toLocaleDateString()}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span>By {blogPost.author}</span>
                  </div>
                </div>

                {/* Social Actions */}
                <div className="flex items-center justify-between py-4 border-t border-b border-gray-200 dark:border-gray-700 mb-8">
                  <div className="flex items-center space-x-6">
                    <button className={`flex items-center space-x-2 ${
                      isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-600'
                    } transition-colors`}>
                      <MessageSquare className="h-5 w-5" />
                      <span>{blogPost.likes}</span>
                    </button>
                    <button className={`flex items-center space-x-2 ${
                      isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                    } transition-colors`}>
                      <Share2 className="h-5 w-5" />
                      <span>{blogPost.shares}</span>
                    </button>
                    <button className={`flex items-center space-x-2 ${
                      isDark ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-600 hover:text-yellow-600'
                    } transition-colors`}>
                      <Bookmark className="h-5 w-5" />
                      <span>Save</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Coffee className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      Estimated reading time: {estimatedReadTime} minutes
                    </span>
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

              {/* Article Content */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`blog-content max-w-none mb-12 overflow-hidden`}
              >
                <BlogContentRenderer content={blogPost.content} />
              </motion.article>

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

              {/* Author Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 mt-12 border ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <h3 className="seo-heading-h3 mb-4">About the Author</h3>
                <div className="flex items-start space-x-6">
                  <img
                    src={blogPost.authorAvatar}
                    alt={blogPost.author}
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h4 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                      {blogPost.author}
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mb-3`}>
                      {blogPost.authorRole}
                    </p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                      {blogPost.authorBio}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Related Posts */}
              {blogPost.relatedPosts && blogPost.relatedPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="mt-12"
                >
                  <h3 className="seo-heading-h3 mb-8">Related Articles</h3>
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
                <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 border ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {blogPost.content.sections.map((section, index) => (
                      <div key={index}>
                        <a
                          href={`#${section.heading.toLowerCase().replace(/\s+/g, '-')}`}
                          className={`block py-2 px-3 rounded-lg transition-colors ${
                            isDark 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                        >
                          {section.heading}
                        </a>
                        {section.subsections && (
                          <div className="ml-4 mt-1 space-y-1">
                            {section.subsections.map((subsection, subIndex) => (
                              <a
                                key={subIndex}
                                href={`#${subsection.heading.toLowerCase().replace(/\s+/g, '-')}`}
                                className={`block py-1 px-3 text-sm rounded transition-colors ${
                                  isDark 
                                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {subsection.heading}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Quick Actions - Mini */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-400 rounded-full transition-all duration-200 hover:scale-105 shadow-sm">
                    <Bookmark className="h-3.5 w-3.5" />
                    <span>Save</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-50 hover:bg-green-100 text-green-600 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:text-green-400 rounded-full transition-all duration-200 hover:scale-105 shadow-sm">
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-purple-50 hover:bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 dark:text-purple-400 rounded-full transition-all duration-200 hover:scale-105 shadow-sm">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Discuss</span>
                  </button>
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
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Views</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {blogPost.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Likes</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {blogPost.likes}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Comments</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {blogPost.comments}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Reading Progress</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {Math.round(readingProgress)}%
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

export default EnhancedBlogPostPage;