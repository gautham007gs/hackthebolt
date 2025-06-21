import { storage } from "./storage";

export async function initializeSampleData() {
  console.log('Initializing sample data...');

  // Sample blog posts
  const samplePosts = [
    {
      title: "Advanced Web Application Security Testing",
      slug: "advanced-web-security-testing",
      excerpt: "Master the techniques for identifying and exploiting web application vulnerabilities using modern tools and methodologies.",
      content: "# Advanced Web Application Security Testing\n\nWeb application security is a critical aspect of modern cybersecurity. In this comprehensive guide, we'll explore advanced techniques for testing web applications for security vulnerabilities.\n\n## OWASP Top 10 Overview\n\nThe OWASP Top 10 represents the most critical web application security risks:\n\n1. **Injection Attacks** - SQL, NoSQL, OS, and LDAP injection\n2. **Broken Authentication** - Session management flaws\n3. **Sensitive Data Exposure** - Inadequate data protection\n4. **XML External Entities (XXE)** - XML processor vulnerabilities\n5. **Broken Access Control** - Authorization bypass\n\n## Testing Methodologies\n\n### Manual Testing Techniques\n\n- **Source code review** for identifying security flaws\n- **Business logic testing** to find application-specific vulnerabilities\n- **Session management analysis** for authentication bypass\n\n### Automated Testing Tools\n\n- **Burp Suite Professional** for comprehensive web app testing\n- **OWASP ZAP** as a free alternative\n- **Nessus** for vulnerability scanning\n\n## Best Practices\n\n1. Always test in authorized environments\n2. Document all findings with proof-of-concept\n3. Follow responsible disclosure practices\n4. Keep testing tools updated\n\nBy following these advanced techniques, security professionals can effectively identify and mitigate web application vulnerabilities.",
      featuredImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
      category: "Cybersecurity",
      tags: ["web-security", "penetration-testing", "owasp", "vulnerability-assessment"],
      status: "published",
      seoTitle: "Advanced Web Application Security Testing Guide | CyberSec Platform",
      seoDescription: "Learn advanced web application security testing techniques, tools, and methodologies. Master OWASP Top 10 vulnerabilities and testing best practices.",
      seoKeywords: "web application security, penetration testing, OWASP, vulnerability assessment",
      authorId: "user_1"
    },
    {
      title: "Mastering CTF Challenges: From Beginner to Expert",
      slug: "mastering-ctf-challenges",
      excerpt: "A comprehensive guide to Capture The Flag competitions, covering strategies, tools, and techniques for success.",
      content: "# Mastering CTF Challenges: From Beginner to Expert\n\nCapture The Flag (CTF) competitions are excellent ways to develop cybersecurity skills through hands-on challenges.\n\n## Types of CTF Challenges\n\n### Web Exploitation\n- SQL injection\n- Cross-site scripting (XSS)\n- Authentication bypass\n- Server-side request forgery (SSRF)\n\n### Cryptography\n- Classical ciphers\n- Modern encryption algorithms\n- Hash functions and collisions\n- Digital signatures\n\n### Binary Exploitation\n- Buffer overflows\n- Return-oriented programming (ROP)\n- Format string vulnerabilities\n- Heap exploitation\n\n### Forensics\n- Memory analysis\n- Network packet inspection\n- File system artifacts\n- Steganography\n\n## Essential Tools\n\n1. **Wireshark** - Network protocol analyzer\n2. **Ghidra** - Reverse engineering framework\n3. **Volatility** - Memory forensics framework\n4. **Binwalk** - Firmware analysis tool\n5. **John the Ripper** - Password cracking tool\n\n## Competition Strategies\n\n- Start with easier challenges to build momentum\n- Work in teams to cover different specialties\n- Document your methodology for future reference\n- Practice regularly on platforms like HackTheBox and TryHackMe\n\nSuccess in CTFs requires patience, persistence, and continuous learning.",
      featuredImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
      category: "CTF",
      tags: ["ctf", "competition", "hacking", "cybersecurity", "challenges"],
      status: "published",
      seoTitle: "Master CTF Challenges: Complete Guide to Capture The Flag Competitions",
      seoDescription: "Learn how to excel in CTF competitions with expert strategies, essential tools, and challenge-solving techniques.",
      seoKeywords: "CTF, capture the flag, cybersecurity competition, hacking challenges",
      authorId: "user_1"
    }
  ];

  for (const post of samplePosts) {
    await storage.createBlogPost(post);
  }

  // Sample labs
  const sampleLabs = [
    {
      title: "SQL Injection Fundamentals",
      slug: "sql-injection-fundamentals",
      description: "Learn the basics of SQL injection attacks and how to identify and exploit them in web applications.",
      category: "web-security",
      difficulty: "beginner",
      tags: ["sql-injection", "web-security", "database"],
      objectives: [
        "Understand different types of SQL injection vulnerabilities",
        "Learn to identify SQL injection entry points",
        "Practice basic SQL injection exploitation techniques",
        "Understand prevention and mitigation strategies"
      ],
      prerequisites: [
        "Basic understanding of SQL queries",
        "Familiarity with web applications",
        "Basic knowledge of HTTP requests"
      ],
      estimatedTime: 45,
      maxAttempts: 3,
      content: {
        introduction: "SQL injection is one of the most common web application vulnerabilities...",
        instructions: "In this lab, you will test a vulnerable web application for SQL injection flaws...",
        steps: [
          "Identify the login form on the target application",
          "Test for basic SQL injection using single quotes",
          "Bypass authentication using SQL injection",
          "Extract database information"
        ]
      },
      environment: {
        platform: "Web-based",
        tools: ["Browser", "Burp Suite"],
        networkAccess: false
      },
      solution: {
        walkthrough: "Step-by-step solution guide...",
        flags: ["FLAG{sql_injection_basic}"]
      },
      hints: [
        { content: "Try using a single quote to test for SQL injection", cost: 5 },
        { content: "The login form is vulnerable to authentication bypass", cost: 10 }
      ],
      resources: [
        {
          title: "OWASP SQL Injection Guide",
          description: "Comprehensive guide to SQL injection vulnerabilities",
          url: "https://owasp.org/www-community/attacks/SQL_Injection"
        }
      ],
      points: 100,
      authorId: "user_1"
    },
    {
      title: "Cross-Site Scripting (XSS) Exploitation",
      slug: "xss-exploitation",
      description: "Master the art of identifying and exploiting XSS vulnerabilities in modern web applications.",
      category: "web-security",
      difficulty: "intermediate",
      tags: ["xss", "javascript", "web-security"],
      objectives: [
        "Identify different types of XSS vulnerabilities",
        "Craft effective XSS payloads",
        "Bypass common XSS filters",
        "Understand the impact of XSS attacks"
      ],
      prerequisites: [
        "Basic HTML and JavaScript knowledge",
        "Understanding of web application architecture",
        "Familiarity with browser developer tools"
      ],
      estimatedTime: 60,
      maxAttempts: 3,
      content: {
        introduction: "Cross-Site Scripting (XSS) allows attackers to inject malicious scripts...",
        instructions: "You will exploit various XSS vulnerabilities in a test application...",
        scenarios: [
          "Reflected XSS in search functionality",
          "Stored XSS in comment system",
          "DOM-based XSS in client-side routing"
        ]
      },
      environment: {
        platform: "Web-based",
        tools: ["Browser", "Developer Tools"],
        networkAccess: false
      },
      solution: {
        payloads: ["<script>alert('XSS')</script>", "<img src=x onerror=alert('XSS')>"]
      },
      hints: [
        { content: "Check if the application reflects user input without sanitization", cost: 10 },
        { content: "Try different HTML tags and event handlers", cost: 15 }
      ],
      resources: [
        {
          title: "XSS Prevention Cheat Sheet",
          description: "OWASP guide to preventing XSS attacks",
          url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
        }
      ],
      points: 150,
      authorId: "user_1"
    },
    {
      title: "Advanced Network Penetration Testing",
      slug: "advanced-network-pentest",
      description: "Comprehensive network penetration testing techniques using industry-standard tools and methodologies.",
      category: "network",
      difficulty: "advanced",
      tags: ["network", "penetration-testing", "nmap", "metasploit"],
      objectives: [
        "Perform comprehensive network reconnaissance",
        "Identify and exploit network services",
        "Execute privilege escalation techniques",
        "Maintain persistent access"
      ],
      prerequisites: [
        "Strong understanding of networking protocols",
        "Experience with Linux command line",
        "Basic knowledge of exploit development"
      ],
      estimatedTime: 120,
      maxAttempts: 2,
      content: {
        phases: [
          "Reconnaissance and Information Gathering",
          "Vulnerability Assessment",
          "Exploitation",
          "Post-Exploitation"
        ]
      },
      environment: {
        platform: "Virtual Network",
        tools: ["Nmap", "Metasploit", "Wireshark", "Burp Suite"],
        networkAccess: true
      },
      solution: {
        methodology: "Follow standard penetration testing methodology...",
        techniques: ["Port scanning", "Service enumeration", "Exploit execution"]
      },
      hints: [
        { content: "Start with a comprehensive port scan", cost: 20 },
        { content: "Look for outdated services with known vulnerabilities", cost: 30 }
      ],
      resources: [
        {
          title: "NIST Penetration Testing Guide",
          description: "Comprehensive penetration testing methodology",
          url: "https://csrc.nist.gov/publications/detail/sp/800-115/final"
        }
      ],
      points: 300,
      authorId: "user_1"
    }
  ];

  for (const lab of sampleLabs) {
    await storage.createLab(lab);
  }

  // Sample CTF challenges
  const sampleChallenges = [
    {
      title: "Baby's First Buffer Overflow",
      slug: "baby-buffer-overflow",
      description: "A beginner-friendly buffer overflow challenge to learn the basics of binary exploitation.",
      category: "pwn",
      difficulty: "easy",
      tags: ["buffer-overflow", "binary-exploitation", "stack"],
      flag: "CTF{buff3r_0v3rfl0w_b4s1cs}",
      flagFormat: "CTF{...}",
      points: 100,
      files: [
        {
          name: "vuln.c",
          size: "2.1 KB",
          type: "Source Code"
        },
        {
          name: "vuln",
          size: "8.5 KB",
          type: "Binary"
        }
      ],
      hints: [
        { content: "The vulnerable function doesn't check input length", cost: 25 },
        { content: "Try overwriting the return address", cost: 50 }
      ],
      environment: {
        platform: "Linux",
        architecture: "x86_64",
        protections: ["NX disabled", "ASLR disabled"]
      },
      writeupRequired: false,
      authorId: "user_1"
    },
    {
      title: "Crypto Oracle",
      slug: "crypto-oracle",
      description: "Exploit a cryptographic oracle to decrypt secret messages using padding oracle attacks.",
      category: "crypto",
      difficulty: "medium",
      tags: ["cryptography", "padding-oracle", "aes"],
      flag: "CTF{p4dd1ng_0r4cl3_4tt4ck}",
      flagFormat: "CTF{...}",
      points: 200,
      files: [
        {
          name: "oracle.py",
          size: "3.2 KB",
          type: "Python Script"
        },
        {
          name: "encrypted.txt",
          size: "128 bytes",
          type: "Data"
        }
      ],
      hints: [
        { content: "The server reveals padding information", cost: 50 },
        { content: "Implement a padding oracle attack", cost: 100 }
      ],
      environment: {
        service: "nc crypto-oracle.ctf 1337",
        description: "Connect to the oracle service"
      },
      writeupRequired: true,
      authorId: "user_1"
    },
    {
      title: "Web Assembly Reverse Engineering",
      slug: "wasm-reverse",
      description: "Reverse engineer a WebAssembly module to find the hidden flag validation algorithm.",
      category: "reverse",
      difficulty: "hard",
      tags: ["webassembly", "reverse-engineering", "binary-analysis"],
      flag: "CTF{w3b_4ss3mbly_r3v3rs3d}",
      flagFormat: "CTF{...}",
      points: 350,
      files: [
        {
          name: "challenge.wasm",
          size: "12.8 KB",
          type: "WebAssembly"
        },
        {
          name: "index.html",
          size: "1.5 KB",
          type: "HTML"
        }
      ],
      hints: [
        { content: "Use a WASM disassembler to analyze the module", cost: 75 },
        { content: "Look for the flag validation function", cost: 150 }
      ],
      environment: {
        url: "https://wasm-challenge.ctf/",
        description: "Access the challenge in your browser"
      },
      writeupRequired: true,
      authorId: "user_1"
    },
    {
      title: "Network Forensics: The Heist",
      slug: "network-forensics-heist",
      description: "Analyze network traffic to investigate a cyber heist and identify the stolen data.",
      category: "forensics",
      difficulty: "medium",
      tags: ["network-forensics", "wireshark", "investigation"],
      flag: "CTF{n3tw0rk_f0r3ns1cs_m4st3r}",
      flagFormat: "CTF{...}",
      points: 250,
      files: [
        {
          name: "heist.pcap",
          size: "45.2 MB",
          type: "Network Capture"
        },
        {
          name: "timeline.txt",
          size: "2.1 KB",
          type: "Text"
        }
      ],
      hints: [
        { content: "Look for unusual network traffic patterns", cost: 60 },
        { content: "Check for data exfiltration attempts", cost: 120 }
      ],
      environment: {
        tools: ["Wireshark", "NetworkMiner", "tcpdump"],
        description: "Analyze the provided network capture"
      },
      writeupRequired: false,
      authorId: "user_1"
    }
  ];

  for (const challenge of sampleChallenges) {
    await storage.createCtfChallenge(challenge);
  }

  // Sample certificates
  const sampleCertificates = [
    {
      userId: "user_1",
      type: "course_completion",
      title: "Web Application Security Fundamentals",
      description: "Successfully completed the comprehensive web application security course covering OWASP Top 10 vulnerabilities.",
      category: "web-security",
      criteria: {
        coursesCompleted: 5,
        labsCompleted: 12,
        finalScore: 95,
        timeSpent: "40 hours"
      },
      certificateCode: "CERT-WEB-2024-001",
      verificationUrl: `${process.env.REPL_URL || 'http://localhost:5000'}/verify/CERT-WEB-2024-001`,
      metadata: {
        score: 95,
        rank: 15,
        issuer: "CyberSecurity Learning Platform"
      }
    },
    {
      userId: "user_1",
      type: "ctf_champion",
      title: "CTF Competition Winner",
      description: "First place winner in the Advanced Cybersecurity CTF Competition 2024.",
      category: "competition",
      criteria: {
        challengesSolved: 25,
        totalPoints: 2450,
        rank: 1,
        competitionName: "Advanced CyberSec CTF 2024"
      },
      certificateCode: "CERT-CTF-2024-WINNER",
      verificationUrl: `${process.env.REPL_URL || 'http://localhost:5000'}/verify/CERT-CTF-2024-WINNER`,
      metadata: {
        score: 2450,
        rank: 1,
        participants: 500,
        issuer: "CyberSecurity Learning Platform"
      }
    },
    {
      userId: "user_1",
      type: "lab_mastery",
      title: "Network Security Expert",
      description: "Demonstrated mastery in network security through completion of advanced penetration testing labs.",
      category: "network-security",
      criteria: {
        labsCompleted: 8,
        averageScore: 92,
        advancedLabsCompleted: 3,
        skillLevel: "Expert"
      },
      certificateCode: "CERT-NET-2024-EXPERT",
      verificationUrl: `${process.env.REPL_URL || 'http://localhost:5000'}/verify/CERT-NET-2024-EXPERT`,
      metadata: {
        score: 92,
        specialization: "Network Penetration Testing",
        issuer: "CyberSecurity Learning Platform"
      }
    }
  ];

  for (const cert of sampleCertificates) {
    await storage.createCertificate(cert);
  }

  console.log('Sample data initialization completed successfully!');
  console.log(`- Created ${samplePosts.length} blog posts`);
  console.log(`- Created ${sampleLabs.length} labs`);
  console.log(`- Created ${sampleChallenges.length} CTF challenges`);
  console.log(`- Created ${sampleCertificates.length} certificates`);
}