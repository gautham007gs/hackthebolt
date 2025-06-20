import React, { useState } from 'react';
import { Github, Star, GitFork, Download, ExternalLink, Search, Filter, Code, Shield, Zap, Terminal, Eye, Users, BookOpen, X, AlertTriangle, CheckCircle, Copy, Play, ArrowRight, Lightbulb, Wrench, HelpCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const GitHubTools = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [showLearnMore, setShowLearnMore] = useState(false);

  const categories = ['All', 'Reconnaissance', 'Exploitation', 'Post-Exploitation', 'Forensics', 'Web Security', 'Network Security'];

  const tools = [
    {
      name: "Nmap",
      description: "Network discovery and security auditing tool. Nmap uses raw IP packets to determine what hosts are available on the network, what services they offer, what operating systems they run, and more.",
      category: "Reconnaissance",
      stars: "9.2k",
      forks: "2.1k",
      language: "C++",
      lastUpdate: "2 days ago",
      githubUrl: "https://github.com/nmap/nmap",
      features: ["Port Scanning", "OS Detection", "Service Detection", "Script Engine"],
      difficulty: "Intermediate",
      image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      guide: {
        whatIsIt: "Nmap (Network Mapper) is like a special detective tool for computers! It helps you discover what devices are connected to a network and what services they're running. Think of it as a friendly robot that knocks on doors (ports) to see who's home.",
        whyUseIt: [
          "🔍 Find all devices on your network (like computers, phones, printers)",
          "🚪 Check which services are running (like websites, email servers)",
          "🛡️ Test your network security to find weak spots",
          "📊 Create maps of your network structure"
        ],
        installation: {
          windows: [
            "1️⃣ Go to https://nmap.org/download.html",
            "2️⃣ Click 'Latest stable release self-installer'",
            "3️⃣ Download the .exe file",
            "4️⃣ Right-click and 'Run as administrator'",
            "5️⃣ Follow the installation wizard",
            "6️⃣ Open Command Prompt and type 'nmap --version'"
          ],
          mac: [
            "1️⃣ Install Homebrew first: /bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"",
            "2️⃣ Open Terminal",
            "3️⃣ Type: brew install nmap",
            "4️⃣ Wait for installation to complete",
            "5️⃣ Test with: nmap --version"
          ],
          linux: [
            "1️⃣ Open Terminal",
            "2️⃣ Ubuntu/Debian: sudo apt-get install nmap",
            "3️⃣ CentOS/RHEL: sudo yum install nmap",
            "4️⃣ Arch Linux: sudo pacman -S nmap",
            "5️⃣ Test with: nmap --version"
          ]
        },
        basicCommands: [
          {
            command: "nmap google.com",
            explanation: "Scan Google's website to see what ports are open",
            example: "This will show you which services Google is running"
          },
          {
            command: "nmap -sP 192.168.1.0/24",
            explanation: "Find all devices on your home network",
            example: "Shows all phones, computers, smart TVs connected to your WiFi"
          },
          {
            command: "nmap -O target",
            explanation: "Try to guess what operating system the target is running",
            example: "Is it Windows? Linux? macOS?"
          },
          {
            command: "nmap -sV target",
            explanation: "Find out what versions of services are running",
            example: "What version of Apache web server is running?"
          }
        ],
        commonErrors: [
          {
            error: "Permission denied",
            solution: "Run as administrator/sudo. Some scans need special permissions.",
            tip: "On Windows: Right-click Command Prompt → 'Run as administrator'"
          },
          {
            error: "Host seems down",
            solution: "The target might have a firewall blocking pings. Try: nmap -Pn target",
            tip: "Some computers hide from ping but still have open ports"
          },
          {
            error: "No route to host",
            solution: "Check your internet connection and make sure the target address is correct",
            tip: "Can you ping the target first? Try: ping google.com"
          }
        ],
        alternatives: [
          {
            name: "Angry IP Scanner",
            description: "Simple GUI tool for network scanning",
            pros: "Easy to use, visual interface",
            cons: "Less powerful than Nmap"
          },
          {
            name: "Masscan",
            description: "Very fast port scanner",
            pros: "Extremely fast for large networks",
            cons: "Less detailed information"
          },
          {
            name: "Zenmap",
            description: "Official Nmap GUI",
            pros: "Visual interface for Nmap",
            cons: "Still requires Nmap knowledge"
          }
        ],
        realWorldUse: [
          "🏢 IT administrators checking network security",
          "🔒 Security professionals finding vulnerabilities",
          "🏠 Home users mapping their network devices",
          "🎓 Students learning network concepts"
        ]
      }
    },
    {
      name: "Metasploit Framework",
      description: "Advanced open-source platform for developing, testing, and executing exploit code. Provides information about security vulnerabilities and aids in penetration testing.",
      category: "Exploitation",
      stars: "33.8k",
      forks: "13.9k",
      language: "Ruby",
      lastUpdate: "1 day ago",
      githubUrl: "https://github.com/rapid7/metasploit-framework",
      features: ["Exploit Development", "Payload Generation", "Post-Exploitation", "Vulnerability Assessment"],
      difficulty: "Advanced",
      image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      guide: {
        whatIsIt: "Metasploit is like a Swiss Army knife for ethical hackers! It's a powerful framework that helps security professionals find and test vulnerabilities in computer systems. Think of it as a toolbox full of specialized tools for testing how secure systems really are.",
        whyUseIt: [
          "🎯 Test if systems are vulnerable to known attacks",
          "🛠️ Generate custom payloads for penetration testing",
          "📊 Assess security posture of networks and applications",
          "🎓 Learn about exploitation techniques safely",
          "🔬 Research and develop new security exploits"
        ],
        installation: {
          windows: [
            "1️⃣ Download Metasploit Community Edition from rapid7.com",
            "2️⃣ Create a free account",
            "3️⃣ Download the Windows installer",
            "4️⃣ Run installer as administrator",
            "5️⃣ Follow setup wizard",
            "6️⃣ Launch from Start Menu"
          ],
          mac: [
            "1️⃣ Install with Homebrew: brew install metasploit",
            "2️⃣ Or download from rapid7.com",
            "3️⃣ Install required dependencies",
            "4️⃣ Run: msfconsole to start"
          ],
          linux: [
            "1️⃣ Comes pre-installed on Kali Linux",
            "2️⃣ Ubuntu/Debian: curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && chmod 755 msfinstall && ./msfinstall",
            "3️⃣ Or: apt-get install metasploit-framework",
            "4️⃣ Start with: msfconsole"
          ]
        },
        basicCommands: [
          {
            command: "search ms17-010",
            explanation: "Search for exploits related to MS17-010 (EternalBlue)",
            example: "Find exploits for the famous Windows SMB vulnerability"
          },
          {
            command: "use exploit/windows/smb/ms17_010_eternalblue",
            explanation: "Select a specific exploit to use",
            example: "Load the EternalBlue exploit module"
          },
          {
            command: "show options",
            explanation: "Display required and optional parameters for the current module",
            example: "See what settings you need to configure"
          },
          {
            command: "set RHOSTS 192.168.1.100",
            explanation: "Set the target IP address",
            example: "Tell Metasploit which computer to test"
          }
        ],
        stepByStepGuide: [
          {
            step: "1. Starting Metasploit",
            details: [
              "Open terminal and type 'msfconsole'",
              "Wait for the framework to load (shows ASCII art)",
              "You'll see the msf6 > prompt when ready",
              "Type 'help' to see available commands"
            ]
          },
          {
            step: "2. Finding an Exploit",
            details: [
              "Use 'search' to find exploits: search windows smb",
              "Look at the results and note the exploit paths",
              "Choose one that matches your target system",
              "Use 'info' command to learn more about an exploit"
            ]
          },
          {
            step: "3. Configuring the Exploit",
            details: [
              "Use 'use' command to select an exploit",
              "Run 'show options' to see required settings",
              "Set RHOSTS (target) and LHOST (your IP) at minimum",
              "Use 'check' to verify if target is vulnerable"
            ]
          }
        ],
        commonErrors: [
          {
            error: "No such file or directory - ruby",
            solution: "Install Ruby runtime environment first",
            tip: "Metasploit requires Ruby 2.7 or higher to function"
          },
          {
            error: "Database not connected",
            solution: "Start PostgreSQL service and run 'msfdb init'",
            tip: "Database improves performance and stores scan results"
          },
          {
            error: "Exploit failed - target not vulnerable",
            solution: "Verify target OS/version matches exploit requirements",
            tip: "Use 'check' command before running exploit to verify compatibility"
          },
          {
            error: "Payload delivery failed",
            solution: "Check firewall settings and network connectivity",
            tip: "Ensure your LHOST setting matches your actual IP address"
          }
        ],
        alternatives: [
          {
            name: "Cobalt Strike",
            description: "Commercial penetration testing platform",
            pros: "Professional features, excellent team collaboration",
            cons: "Expensive license, often used by malicious actors"
          },
          {
            name: "Core Impact",
            description: "Commercial exploitation framework",
            pros: "User-friendly GUI, comprehensive reporting",
            cons: "Very expensive, less community support"
          },
          {
            name: "Canvas",
            description: "Commercial vulnerability assessment platform",
            pros: "Good exploit development tools",
            cons: "Costly, smaller exploit database"
          }
        ],
        realWorldUse: [
          "🛡️ Penetration testers validating security defenses",
          "🎓 Security researchers developing new exploits",
          "💼 Red team exercises simulating real attacks",
          "🔍 Vulnerability researchers testing patches"
        ],
        proTips: [
          "Always use Metasploit in authorized environments only",
          "Practice on vulnerable VMs like Metasploitable first",
          "Keep the framework updated with 'msfupdate'",
          "Learn to write custom modules for unique scenarios"
        ]
      }
    },
    {
      name: "Burp Suite Community",
      description: "Integrated platform for performing security testing of web applications. Combines manual and automated techniques to enumerate, analyze, attack and exploit web apps.",
      category: "Web Security",
      stars: "1.2k",
      forks: "456",
      language: "Java",
      lastUpdate: "5 days ago",
      githubUrl: "https://github.com/PortSwigger/burp-extensions-montoya-api",
      features: ["Web App Scanning", "Proxy Interception", "Vulnerability Detection", "Manual Testing"],
      difficulty: "Intermediate",
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      guide: {
        whatIsIt: "Burp Suite is like having a security expert sitting between your browser and websites, watching everything that happens! It intercepts, modifies, and analyzes web traffic to help find security vulnerabilities in web applications.",
        whyUseIt: [
          "🔍 Intercept and modify web requests in real-time",
          "🕷️ Automatically crawl websites to map all functionality",
          "🛡️ Scan for common web vulnerabilities",
          "🎯 Perform manual security testing with powerful tools",
          "📊 Generate detailed security reports"
        ],
        installation: {
          windows: [
            "1️⃣ Download from https://portswigger.net/burp/communitydownload",
            "2️⃣ Install Java 11+ if not already installed",
            "3️⃣ Run the downloaded installer",
            "4️⃣ Follow installation wizard",
            "5️⃣ Launch Burp Suite Community Edition"
          ],
          mac: [
            "1️⃣ Download from PortSwigger website",
            "2️⃣ Install Java if needed",
            "3️⃣ Open the downloaded DMG file",
            "4️⃣ Drag Burp Suite to Applications",
            "5️⃣ Launch and configure proxy settings"
          ],
          linux: [
            "1️⃣ Download the Linux version",
            "2️⃣ Install Java: sudo apt install default-jre",
            "3️⃣ Make executable: chmod +x burpsuite_community_linux_*.sh",
            "4️⃣ Run installer: ./burpsuite_community_linux_*.sh",
            "5️⃣ Launch from applications menu"
          ]
        },
        basicCommands: [
          {
            command: "Configure Browser Proxy",
            explanation: "Set browser to use Burp as proxy (localhost:8080)",
            example: "This lets Burp see all your web traffic"
          },
          {
            command: "Install CA Certificate",
            explanation: "Download and install Burp's certificate for HTTPS",
            example: "Visit http://burpsuite in browser and download certificate"
          },
          {
            command: "Target Scope",
            explanation: "Define which websites Burp should focus on",
            example: "Add target domain to scope to avoid testing other sites"
          },
          {
            command: "Spider/Crawler",
            explanation: "Automatically discover all pages and functionality",
            example: "Right-click target and select 'Spider this host'"
          }
        ],
        stepByStepGuide: [
          {
            step: "1. Setup Browser Proxy",
            details: [
              "Configure your browser to use proxy 127.0.0.1:8080",
              "Firefox: Settings → Network Settings → Manual proxy",
              "Chrome: Use extension like FoxyProxy",
              "Test by visiting any website - traffic should appear in Burp"
            ]
          },
          {
            step: "2. Install Certificate",
            details: [
              "Visit http://burpsuite in your browser",
              "Click 'CA Certificate' to download",
              "Install in browser's certificate store",
              "This allows Burp to intercept HTTPS traffic"
            ]
          },
          {
            step: "3. Define Target Scope",
            details: [
              "Go to Target → Site map",
              "Right-click your target domain",
              "Select 'Add to scope'",
              "This focuses testing on your target only"
            ]
          }
        ],
        commonErrors: [
          {
            error: "Browser can't connect to websites",
            solution: "Check proxy settings are correct (127.0.0.1:8080) and Burp is running",
            tip: "Make sure Intercept is OFF when browsing normally"
          },
          {
            error: "Certificate errors on HTTPS sites",
            solution: "Install Burp's CA certificate in your browser",
            tip: "Each browser has different certificate installation process"
          },
          {
            error: "Burp running slowly",
            solution: "Increase Java heap size in startup options",
            tip: "Use -Xmx2g flag to allocate 2GB of RAM"
          }
        ],
        alternatives: [
          {
            name: "OWASP ZAP",
            description: "Free alternative to Burp Suite",
            pros: "Completely free, good automation",
            cons: "Less polished interface, fewer advanced features"
          },
          {
            name: "Burp Suite Professional",
            description: "Commercial version with more features",
            pros: "Advanced scanner, better reporting, extensions",
            cons: "Expensive annual license"
          }
        ],
        realWorldUse: [
          "🔒 Security consultants testing client applications",
          "💼 Developers finding security issues before release",
          "🎓 Security students learning web application testing",
          "🛡️ Bug bounty hunters finding vulnerabilities"
        ]
      }
    },
    {
      name: "Wireshark",
      description: "World's foremost and widely-used network protocol analyzer. Lets you see what's happening on your network at a microscopic level and is the de facto standard.",
      category: "Network Security",
      stars: "7.1k",
      forks: "1.8k",
      language: "C",
      lastUpdate: "3 days ago",
      githubUrl: "https://github.com/wireshark/wireshark",
      features: ["Packet Analysis", "Protocol Decoding", "Network Troubleshooting", "Live Capture"],
      difficulty: "Intermediate",
      image: "https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      guide: {
        whatIsIt: "Wireshark is like a super-powered magnifying glass for computer networks! It captures and shows you all the data packets traveling through your network. Think of it as being able to see every letter and package being delivered in your digital neighborhood.",
        whyUseIt: [
          "🔍 See exactly what data is traveling on your network",
          "🐛 Find network problems and bottlenecks",
          "🛡️ Detect suspicious or malicious network activity",
          "📊 Analyze network performance and usage",
          "🎓 Learn how network protocols actually work"
        ],
        installation: {
          windows: [
            "1️⃣ Visit https://www.wireshark.org/download.html",
            "2️⃣ Click 'Windows Installer (64-bit)'",
            "3️⃣ Download the .exe file",
            "4️⃣ Run installer as administrator",
            "5️⃣ Follow installation wizard (install WinPcap when prompted)",
            "6️⃣ Launch Wireshark from Start Menu"
          ],
          mac: [
            "1️⃣ Download from https://www.wireshark.org/download.html",
            "2️⃣ Choose 'macOS Intel 64-bit DMG'",
            "3️⃣ Open downloaded .dmg file",
            "4️⃣ Drag Wireshark to Applications",
            "5️⃣ Install ChmodBPF (for packet capture permissions)",
            "6️⃣ Launch Wireshark from Applications"
          ],
          linux: [
            "1️⃣ Ubuntu/Debian: sudo apt-get install wireshark",
            "2️⃣ CentOS/RHEL: sudo yum install wireshark",
            "3️⃣ Add user to wireshark group: sudo usermod -a -G wireshark $USER",
            "4️⃣ Log out and log back in",
            "5️⃣ Launch with: wireshark"
          ]
        },
        basicCommands: [
          {
            command: "Start Capture",
            explanation: "Click on your network interface (like WiFi or Ethernet) to start capturing packets",
            example: "Choose 'Wi-Fi' to see all wireless traffic on your computer"
          },
          {
            command: "http filter",
            explanation: "Type 'http' in the filter bar to see only web traffic",
            example: "Perfect for seeing which websites you're visiting"
          },
          {
            command: "ip.addr == 192.168.1.1",
            explanation: "Show only traffic to/from a specific IP address",
            example: "See all communication with your router"
          },
          {
            command: "tcp.port == 80",
            explanation: "Show only traffic on port 80 (web traffic)",
            example: "Focus on HTTP web requests and responses"
          }
        ],
        stepByStepGuide: [
          {
            step: "1. First Capture",
            details: [
              "Open Wireshark and you'll see a list of network interfaces",
              "Click on your active network (usually WiFi or Ethernet)",
              "Click the blue shark fin icon to start capturing",
              "You'll immediately see packets flowing - this is normal!"
            ]
          },
          {
            step: "2. Understanding the Interface",
            details: [
              "Top panel: List of captured packets (each row is one packet)",
              "Middle panel: Details of selected packet (headers and data)",
              "Bottom panel: Raw data in hexadecimal and ASCII",
              "Colors help identify traffic types (green=TCP, blue=UDP, etc.)"
            ]
          },
          {
            step: "3. Your First Filter",
            details: [
              "Type 'http' in the filter bar at the top",
              "Press Enter to apply the filter",
              "Now you only see web traffic",
              "Try visiting a website to see new packets appear"
            ]
          }
        ],
        commonErrors: [
          {
            error: "No interfaces available for capture",
            solution: "Run Wireshark as administrator/sudo or install proper capture drivers",
            tip: "On Windows, make sure WinPcap or Npcap is installed"
          },
          {
            error: "Permission denied on Linux",
            solution: "Add your user to the wireshark group: sudo usermod -a -G wireshark $USER",
            tip: "You need to log out and log back in for group changes to take effect"
          },
          {
            error: "Too many packets, can't keep up",
            solution: "Use capture filters to reduce traffic: Capture → Capture Filters",
            tip: "Start with simple filters like 'host google.com' to limit what you capture"
          },
          {
            error: "Can't understand the data",
            solution: "Start with high-level protocols like HTTP, then work down to lower levels",
            tip: "Use Follow → TCP Stream to see human-readable conversations"
          }
        ],
        alternatives: [
          {
            name: "tcpdump",
            description: "Command-line packet analyzer",
            pros: "Lightweight, available on most Unix systems",
            cons: "No GUI, steeper learning curve"
          },
          {
            name: "NetworkMiner",
            description: "Network forensic analysis tool",
            pros: "Great for forensics, easy file extraction",
            cons: "Windows only, less real-time analysis"
          },
          {
            name: "Ettercap",
            description: "Network security tool with packet capture",
            pros: "Includes active attacks, MITM capabilities",
            cons: "More complex, security-focused rather than analysis"
          }
        ],
        realWorldUse: [
          "🔧 Network administrators troubleshooting connectivity issues",
          "🛡️ Security analysts investigating network breaches",
          "📚 Students learning how internet protocols work",
          "🐛 Developers debugging application network problems"
        ],
        proTips: [
          "Always get permission before capturing network traffic in corporate environments",
          "Use display filters (not capture filters) when learning - they're more forgiving",
          "Right-click packets for context menus with useful analysis options",
          "Save interesting captures as .pcap files for later analysis"
        ]
      }
    },
    {
      name: "OWASP ZAP",
      description: "One of the world's most popular free security tools actively maintained by volunteers. Helps find security vulnerabilities in web applications automatically.",
      category: "Web Security",
      stars: "12.5k",
      forks: "2.2k",
      language: "Java",
      lastUpdate: "1 day ago",
      githubUrl: "https://github.com/zaproxy/zaproxy",
      features: ["Automated Scanning", "Manual Testing", "API Security", "CI/CD Integration"],
      difficulty: "Beginner",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      guide: {
        whatIsIt: "OWASP ZAP (Zed Attack Proxy) is like a security guard for websites! It sits between your browser and the website you're testing, watching all the traffic and looking for security problems. It's perfect for beginners because it has a user-friendly interface.",
        whyUseIt: [
          "🕷️ Automatically crawl websites to find all pages",
          "🔍 Scan for common security vulnerabilities",
          "🛡️ Test if hackers could break into websites",
          "📱 Works with any web application",
          "🆓 Completely free and open source"
        ],
        installation: {
          windows: [
            "1️⃣ Go to https://www.zaproxy.org/download/",
            "2️⃣ Click 'Download ZAP 2.x.x'",
            "3️⃣ Choose 'Windows (64) Installer'",
            "4️⃣ Run the downloaded .exe file",
            "5️⃣ Follow the installation wizard",
            "6️⃣ Launch ZAP from Start Menu"
          ],
          mac: [
            "1️⃣ Visit https://www.zaproxy.org/download/",
            "2️⃣ Download 'MacOS DMG Package'",
            "3️⃣ Open the downloaded .dmg file",
            "4️⃣ Drag ZAP to Applications folder",
            "5️⃣ Right-click ZAP → Open (first time only)",
            "6️⃣ Click 'Open' when warned about unidentified developer"
          ],
          linux: [
            "1️⃣ Download from https://www.zaproxy.org/download/",
            "2️⃣ Choose 'Linux Package'",
            "3️⃣ Extract: tar -xzf ZAP_2.x.x_Linux.tar.gz",
            "4️⃣ Navigate to ZAP folder",
            "5️⃣ Run: ./zap.sh",
            "6️⃣ Or install via package manager: sudo apt install zaproxy"
          ]
        },
        basicCommands: [
          {
            command: "Quick Start - Automated Scan",
            explanation: "Enter a website URL and let ZAP find vulnerabilities automatically",
            example: "Perfect for your first scan! Just type 'http://testphp.vulnweb.com/' and click 'Attack'"
          },
          {
            command: "Manual Explore",
            explanation: "Use ZAP's browser to manually explore a website",
            example: "ZAP records everything you click and builds a map of the website"
          },
          {
            command: "Spider Scan",
            explanation: "Automatically discover all pages on a website",
            example: "Like having a robot click every link to map the entire site"
          },
          {
            command: "Active Scan",
            explanation: "Test for vulnerabilities by sending attack patterns",
            example: "ZAP tries different hacking techniques to find weak spots"
          }
        ],
        stepByStepGuide: [
          {
            step: "1. First Launch",
            details: [
              "When you open ZAP, choose 'No, I do not want to persist this session'",
              "This is perfect for learning - no need to save anything yet",
              "You'll see the main interface with tabs and panels"
            ]
          },
          {
            step: "2. Your First Scan",
            details: [
              "Click 'Automated Scan' in the Quick Start tab",
              "Enter a test website: http://testphp.vulnweb.com/",
              "Check 'Use traditional spider' and 'Use Ajax spider'",
              "Click 'Attack' and watch ZAP work!"
            ]
          },
          {
            step: "3. Understanding Results",
            details: [
              "Red alerts = High risk vulnerabilities (fix immediately!)",
              "Orange alerts = Medium risk (fix when possible)",
              "Yellow alerts = Low risk (good to fix)",
              "Blue alerts = Informational (just FYI)"
            ]
          }
        ],
        commonErrors: [
          {
            error: "ZAP won't start - Java error",
            solution: "Install Java 11 or higher from https://adoptium.net/",
            tip: "ZAP needs Java to run. Download the LTS version for best compatibility"
          },
          {
            error: "Can't access websites through ZAP",
            solution: "Configure your browser to use ZAP as proxy (localhost:8080)",
            tip: "ZAP acts as a 'man in the middle' - your browser must be configured to use it"
          },
          {
            error: "SSL/HTTPS errors",
            solution: "Install ZAP's root certificate in your browser",
            tip: "Go to ZAP → Tools → Options → Dynamic SSL Certificates → Save certificate"
          },
          {
            error: "Scans taking too long",
            solution: "Reduce scan scope or use faster scan policies",
            tip: "Start with small websites and increase scope as you learn"
          }
        ],
        alternatives: [
          {
            name: "Burp Suite Community",
            description: "Professional web security testing platform",
            pros: "Very powerful, industry standard",
            cons: "Steeper learning curve, limited free version"
          },
          {
            name: "Nikto",
            description: "Command-line web vulnerability scanner",
            pros: "Fast, lightweight, good for automation",
            cons: "No GUI, requires command-line knowledge"
          },
          {
            name: "W3af",
            description: "Web application attack and audit framework",
            pros: "Good automation features",
            cons: "Less user-friendly, development less active"
          }
        ],
        realWorldUse: [
          "🎓 Students learning web security basics",
          "💼 Developers testing their own applications",
          "🔒 Security professionals doing penetration tests",
          "🏢 Companies checking website security before launch"
        ],
        proTips: [
          "Always get permission before scanning any website",
          "Start with intentionally vulnerable sites like DVWA or WebGoat",
          "Use ZAP's HUD (Heads Up Display) for easier manual testing",
          "Save interesting findings as ZAP sessions for later review"
        ]
      }
    },
    {
      name: "Volatility",
      description: "Advanced memory forensics framework. Provides a cross-platform, modular, and extensible platform to comprehensively analyze memory dumps.",
      category: "Forensics",
      stars: "7.0k",
      forks: "1.4k",
      language: "Python",
      lastUpdate: "1 week ago",
      githubUrl: "https://github.com/volatilityfoundation/volatility3",
      features: ["Memory Analysis", "Malware Detection", "Incident Response", "Digital Forensics"],
      difficulty: "Advanced",
      image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      guide: {
        whatIsIt: "Volatility is like a digital detective that can examine computer memory to solve cyber crimes! When a computer is compromised, Volatility can analyze the memory dump to find evidence of what happened, like finding fingerprints at a crime scene.",
        whyUseIt: [
          "🔍 Find hidden malware that doesn't show up in normal scans",
          "🕵️ Investigate security breaches and cyber attacks",
          "💾 Recover deleted files and hidden data from memory",
          "🔐 Extract passwords and encryption keys",
          "📊 Analyze system behavior during incidents"
        ],
        installation: {
          windows: [
            "1️⃣ Install Python 3.6+ from python.org",
            "2️⃣ Open Command Prompt as administrator",
            "3️⃣ Run: pip install volatility3",
            "4️⃣ Test with: vol -h",
            "5️⃣ Download symbol files for Windows analysis"
          ],
          mac: [
            "1️⃣ Install Python 3.6+ (use Homebrew: brew install python)",
            "2️⃣ Install pip: python -m ensurepip --upgrade",
            "3️⃣ Install Volatility: pip3 install volatility3",
            "4️⃣ Test installation: vol -h"
          ],
          linux: [
            "1️⃣ Ubuntu/Debian: sudo apt install python3-pip",
            "2️⃣ Install Volatility: pip3 install volatility3",
            "3️⃣ Or use package manager: sudo apt install volatility3",
            "4️⃣ Test with: vol -h"
          ]
        },
        basicCommands: [
          {
            command: "vol -f memory.dump windows.info",
            explanation: "Get basic information about a Windows memory dump",
            example: "Shows OS version, architecture, and dump creation time"
          },
          {
            command: "vol -f memory.dump windows.pslist",
            explanation: "List all running processes",
            example: "See what programs were running when memory was captured"
          },
          {
            command: "vol -f memory.dump windows.netscan",
            explanation: "Show network connections",
            example: "Find suspicious network activity or connections"
          },
          {
            command: "vol -f memory.dump windows.malfind",
            explanation: "Find hidden or suspicious code",
            example: "Detect malware hiding in memory"
          }
        ],
        commonErrors: [
          {
            error: "Unable to determine profile",
            solution: "Use windows.info plugin first to identify correct profile",
            tip: "Different Windows versions need different analysis approaches"
          },
          {
            error: "No suitable address space mapping found",
            solution: "Memory dump may be corrupted or incomplete",
            tip: "Try different dump formats or re-acquire memory"
          },
          {
            error: "ImportError: No module named volatility",
            solution: "Install Volatility properly using pip",
            tip: "Make sure you're using the correct Python version"
          }
        ],
        alternatives: [
          {
            name: "Rekall",
            description: "Memory analysis framework (discontinued)",
            pros: "Good performance, nice interface",
            cons: "No longer maintained"
          },
          {
            name: "YARA",
            description: "Pattern matching for malware research",
            pros: "Great for specific pattern detection",
            cons: "Not a complete memory analysis solution"
          }
        ],
        realWorldUse: [
          "🚔 Law enforcement investigating cybercrime",
          "🛡️ Incident response teams analyzing breaches",
          "🔬 Malware researchers studying new threats",
          "🎓 Digital forensics students learning memory analysis"
        ]
      }
    },
    {
      name: "Nikto",
      description: "Open source web server scanner which performs comprehensive tests against web servers for multiple items including dangerous files/programs and outdated versions.",
      category: "Web Security",
      stars: "8.1k",
      forks: "1.2k",
      language: "Perl",
      lastUpdate: "2 weeks ago",
      githubUrl: "https://github.com/sullo/nikto",
      features: ["Web Server Scanning", "Vulnerability Detection", "SSL Testing", "CGI Scanning"],
      difficulty: "Beginner",
      image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      guide: {
        whatIsIt: "Nikto is like a security health checkup for websites! It's a command-line tool that automatically tests web servers for thousands of known security problems, outdated software, and dangerous files. Think of it as a robot doctor that checks websites for common illnesses.",
        whyUseIt: [
          "🔍 Automatically find common web server vulnerabilities",
          "📝 Generate detailed reports of security issues",
          "⚡ Quick and easy to use - just point it at a website",
          "🆓 Completely free and regularly updated",
          "📊 Test multiple servers quickly"
        ],
        installation: {
          windows: [
            "1️⃣ Install Perl from https://strawberryperl.com/",
            "2️⃣ Download Nikto from https://github.com/sullo/nikto",
            "3️⃣ Extract the ZIP file",
            "4️⃣ Open Command Prompt in the nikto/program folder",
            "5️⃣ Run: perl nikto.pl -h"
          ],
          mac: [
            "1️⃣ Install Homebrew if not installed",
            "2️⃣ Run: brew install nikto",
            "3️⃣ Or download manually from GitHub",
            "4️⃣ Test with: nikto -h"
          ],
          linux: [
            "1️⃣ Ubuntu/Debian: sudo apt-get install nikto",
            "2️⃣ CentOS/RHEL: sudo yum install nikto",
            "3️⃣ Or download from GitHub: git clone https://github.com/sullo/nikto.git",
            "4️⃣ Test with: nikto -h"
          ]
        },
        basicCommands: [
          {
            command: "nikto -h http://example.com",
            explanation: "Basic scan of a website",
            example: "Scans example.com for common vulnerabilities"
          },
          {
            command: "nikto -h http://example.com -p 80,443",
            explanation: "Scan specific ports",
            example: "Check both HTTP (80) and HTTPS (443) ports"
          },
          {
            command: "nikto -h http://example.com -o report.html -Format html",
            explanation: "Save results to HTML report",
            example: "Creates a nice HTML report you can open in a browser"
          },
          {
            command: "nikto -h http://example.com -Tuning 1,2,3",
            explanation: "Run specific test categories only",
            example: "Focus on interesting files, misconfiguration, and information disclosure"
          }
        ],
        commonErrors: [
          {
            error: "Perl not found",
            solution: "Install Perl on your system first",
            tip: "Windows users can use Strawberry Perl, which includes everything needed"
          },
          {
            error: "Connection timeout",
            solution: "The target server might be blocking scans or is slow",
            tip: "Try adding -timeout 30 to increase the timeout"
          },
          {
            error: "403 Forbidden errors",
            solution: "Server is blocking the scan - this is normal for protected sites",
            tip: "Some servers detect and block security scanners automatically"
          }
        ],
        alternatives: [
          {
            name: "OWASP ZAP",
            description: "GUI-based web application security scanner",
            pros: "User-friendly interface, more comprehensive testing",
            cons: "Heavier, requires more setup"
          },
          {
            name: "Nessus",
            description: "Professional vulnerability scanner",
            pros: "Very comprehensive, great reporting",
            cons: "Expensive, overkill for simple web scanning"
          }
        ],
        realWorldUse: [
          "🔒 Quick security assessment of new websites",
          "📋 Regular security audits for web servers",
          "🎓 Learning about common web vulnerabilities",
          "🛡️ Pre-deployment security checks"
        ]
      }
    },
    {
      name: "Aircrack-ng",
      description: "Complete suite of tools to assess WiFi network security. Focuses on different areas of WiFi security: monitoring, attacking, testing, and cracking.",
      category: "Network Security",
      stars: "5.2k",
      forks: "1.1k",
      language: "C",
      lastUpdate: "4 days ago",
      githubUrl: "https://github.com/aircrack-ng/aircrack-ng",
      features: ["WiFi Monitoring", "WEP/WPA Cracking", "Packet Injection", "Network Analysis"],
      difficulty: "Intermediate",
      image: "https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      guide: {
        whatIsIt: "Aircrack-ng is like a Swiss Army knife for WiFi security testing! It's a collection of tools that help security professionals test how secure wireless networks really are. Think of it as a toolkit for checking if your WiFi locks are strong enough.",
        whyUseIt: [
          "🔐 Test the strength of WiFi passwords",
          "📡 Monitor wireless network traffic",
          "🛡️ Check if your network is vulnerable to attacks",
          "📊 Analyze WiFi signal strength and coverage",
          "🎓 Learn how wireless security works"
        ],
        installation: {
          windows: [
            "1️⃣ Download from https://www.aircrack-ng.org/downloads.html",
            "2️⃣ Install compatible USB WiFi adapter",
            "3️⃣ Install driver for monitor mode support",
            "4️⃣ Run installer as administrator",
            "5️⃣ Test with: aircrack-ng --help"
          ],
          mac: [
            "1️⃣ Install Homebrew if needed",
            "2️⃣ Run: brew install aircrack-ng",
            "3️⃣ Ensure compatible WiFi adapter",
            "4️⃣ May need to disable SIP for some features",
            "5️⃣ Test installation: aircrack-ng --help"
          ],
          linux: [
            "1️⃣ Ubuntu/Debian: sudo apt install aircrack-ng",
            "2️⃣ Install wireless drivers if needed",
            "3️⃣ Ensure WiFi adapter supports monitor mode",
            "4️⃣ Test with: aircrack-ng --help",
            "5️⃣ Check adapter compatibility: airmon-ng"
          ]
        },
        basicCommands: [
          {
            command: "airmon-ng start wlan0",
            explanation: "Put WiFi adapter into monitor mode",
            example: "Enables capturing all wireless traffic, not just your own"
          },
          {
            command: "airodump-ng wlan0mon",
            explanation: "Scan for nearby WiFi networks",
            example: "Shows all wireless networks in range with details"
          },
          {
            command: "airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon",
            explanation: "Capture traffic from specific network",
            example: "Records data packets for later analysis"
          },
          {
            command: "aircrack-ng -w wordlist.txt capture-01.cap",
            explanation: "Attempt to crack captured password",
            example: "Uses dictionary attack to find WiFi password"
          }
        ],
        commonErrors: [
          {
            error: "No wireless interfaces found",
            solution: "Install compatible USB WiFi adapter that supports monitor mode",
            tip: "Not all WiFi adapters work - check compatibility list first"
          },
          {
            error: "Monitor mode not supported",
            solution: "Install proper drivers or use different WiFi adapter",
            tip: "Built-in laptop WiFi often doesn't support monitor mode"
          },
          {
            error: "Permission denied",
            solution: "Run commands with sudo privileges",
            tip: "Wireless monitoring requires administrator/root access"
          }
        ],
        alternatives: [
          {
            name: "Kismet",
            description: "Wireless network detector and IDS",
            pros: "Great for monitoring, works with many adapters",
            cons: "More complex setup, different focus"
          },
          {
            name: "Wifite",
            description: "Automated wireless auditing tool",
            pros: "Very easy to use, automates many tasks",
            cons: "Less control over individual steps"
          }
        ],
        realWorldUse: [
          "🛡️ Security professionals testing corporate WiFi",
          "🏠 Home users checking their network security",
          "🎓 Students learning wireless security concepts",
          "🔍 Researchers studying WiFi vulnerabilities"
        ]
      }
    }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300';
      case 'Intermediate': return isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Advanced': return isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300';
      default: return isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const openLearnMore = (tool: any) => {
    
    // If tool doesn't have a guide, create a basic one
    if (!tool.guide) {
      tool.guide = {
        whatIsIt: `${tool.name} is a powerful cybersecurity tool used for ${tool.description}`,
        whyUseIt: [
          "🔍 Professional security testing capabilities",
          "🛡️ Helps identify vulnerabilities and security issues", 
          "📊 Provides detailed analysis and reporting",
          "🎓 Essential for learning cybersecurity concepts"
        ],
        installation: {
          windows: [
            "1️⃣ Visit the official GitHub repository",
            "2️⃣ Download the latest release for Windows",
            "3️⃣ Follow the installation instructions",
            "4️⃣ Test the installation"
          ],
          mac: [
            "1️⃣ Install using Homebrew or download from GitHub",
            "2️⃣ Follow macOS-specific installation steps",
            "3️⃣ Configure any required permissions",
            "4️⃣ Verify the installation"
          ],
          linux: [
            "1️⃣ Install via package manager or compile from source",
            "2️⃣ Install any required dependencies",
            "3️⃣ Configure the tool for your system",
            "4️⃣ Test functionality"
          ]
        },
        basicCommands: [
          {
            command: `${tool.name.toLowerCase()} --help`,
            explanation: "Display help and available options",
            example: "Learn about all available commands and parameters"
          },
          {
            command: `${tool.name.toLowerCase()} --version`,
            explanation: "Check the installed version",
            example: "Verify you have the latest version installed"
          }
        ],
        commonErrors: [
          {
            error: "Command not found",
            solution: "Ensure the tool is properly installed and in your PATH",
            tip: "Try reinstalling or checking installation documentation"
          },
          {
            error: "Permission denied",
            solution: "Run with appropriate privileges (sudo on Linux/Mac, Administrator on Windows)",
            tip: "Security tools often require elevated permissions"
          }
        ],
        alternatives: [
          {
            name: "Commercial alternatives",
            description: "Professional security tools with similar functionality",
            pros: "Often have better support and user interfaces",
            cons: "Usually expensive and may have licensing restrictions"
          }
        ],
        realWorldUse: [
          "🛡️ Security professionals conducting assessments",
          "🎓 Students learning cybersecurity fundamentals",
          "💼 IT teams validating system security",
          "🔍 Researchers investigating vulnerabilities"
        ]
      };
    }
    
    setSelectedTool(tool);
    setShowLearnMore(true);
  };

  const closeLearnMore = () => {
    setShowLearnMore(false);
    setSelectedTool(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const LearnMoreModal = () => {
    if (!selectedTool) {
      return null;
    }

    // Ensure guide exists or create comprehensive default
    const guide = selectedTool.guide || {
      whatIsIt: `${selectedTool.name} is a powerful cybersecurity tool that helps security professionals and ethical hackers test and secure computer systems. It's designed to identify vulnerabilities and strengthen security defenses.`,
      whyUseIt: [
        "Professional security testing capabilities",
        "Identify vulnerabilities before attackers do", 
        "Learn cybersecurity fundamentals hands-on",
        "Industry-standard tool used by experts worldwide"
      ],
      installation: {
        windows: [
          "Download the latest release from the official repository",
          "Run the installer as administrator",
          "Follow the setup wizard instructions",
          "Verify installation by opening command prompt",
          "Type the tool name to confirm it's working"
        ],
        mac: [
          "Install using Homebrew package manager",
          "Or download the macOS version directly",
          "Grant necessary permissions when prompted",
          "Open Terminal to test the installation",
          "Follow any additional setup instructions"
        ],
        linux: [
          "Install via your distribution's package manager",
          "Or compile from source code",
          "Install any required dependencies",
          "Configure environment variables if needed",
          "Test the installation in terminal"
        ]
      },
      basicCommands: [
        {
          command: `${selectedTool.name.toLowerCase()} --help`,
          explanation: "Display help information and available options",
          example: "Shows all commands and how to use them"
        },
        {
          command: `${selectedTool.name.toLowerCase()} --version`,
          explanation: "Check the installed version",
          example: "Confirms you have the latest version"
        }
      ],
      commonErrors: [
        {
          error: "Command not found",
          solution: "Make sure the tool is properly installed and added to your system PATH",
          tip: "Try reinstalling or checking the installation documentation"
        },
        {
          error: "Permission denied",
          solution: "Run with administrator privileges (sudo on Linux/Mac, Run as Admin on Windows)",
          tip: "Security tools often require elevated permissions to function properly"
        }
      ],
      alternatives: [
        {
          name: "Commercial Security Tools",
          description: "Professional paid alternatives with support",
          pros: "Better user interface, professional support, regular updates",
          cons: "Expensive licensing, may have usage restrictions"
        }
      ],
      realWorldUse: [
        "Security professionals conducting penetration tests",
        "Students learning cybersecurity fundamentals",
        "IT teams validating system security",
        "Researchers investigating new vulnerabilities"
      ]
    };

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeLearnMore}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl ${
              isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            } border shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                  <BookOpen className={`h-6 w-6 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedTool.name} Complete Guide
                  </h2>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Everything you need to know to get started
                  </p>
                </div>
              </div>
              <button
                onClick={closeLearnMore}
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                } transition-colors`}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="p-6 space-y-8">
                {/* What is it */}
                <section>
                  <div className="flex items-center space-x-3 mb-4">
                    <HelpCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      What is {selectedTool.name}?
                    </h3>
                  </div>
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {guide.whatIsIt}
                  </p>
                </section>

                {/* Why use it */}
                <section>
                  <div className="flex items-center space-x-3 mb-4">
                    <Lightbulb className={`h-5 w-5 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Why Use {selectedTool.name}?
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {guide.whyUseIt.map((reason: string, index: number) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${
                          isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                        } border`}
                      >
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{reason}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Installation */}
                <section>
                  <div className="flex items-center space-x-3 mb-4">
                    <Download className={`h-5 w-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Installation Guide
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Windows */}
                    <div className={`p-4 rounded-lg ${
                      isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'
                    } border`}>
                      <h4 className={`font-semibold mb-3 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                        🪟 Windows
                      </h4>
                      <ol className="space-y-2">
                        {guide.installation.windows.map((step: string, index: number) => (
                          <li key={index} className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* macOS */}
                    <div className={`p-4 rounded-lg ${
                      isDark ? 'bg-gray-500/10 border-gray-500/20' : 'bg-gray-50 border-gray-200'
                    } border`}>
                      <h4 className={`font-semibold mb-3 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                        🍎 macOS
                      </h4>
                      <ol className="space-y-2">
                        {guide.installation.mac.map((step: string, index: number) => (
                          <li key={index} className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Linux */}
                    <div className={`p-4 rounded-lg ${
                      isDark ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-50 border-orange-200'
                    } border`}>
                      <h4 className={`font-semibold mb-3 ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
                        🐧 Linux
                      </h4>
                      <ol className="space-y-2">
                        {guide.installation.linux.map((step: string, index: number) => (
                          <li key={index} className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </section>

                {/* Basic Commands */}
                <section>
                  <div className="flex items-center space-x-3 mb-4">
                    <Terminal className={`h-5 w-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Basic Commands & Usage
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {guide.basicCommands.map((cmd: any, index: number) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${
                          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        } border`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <code className={`px-3 py-1 rounded text-sm font-mono ${
                            isDark ? 'bg-gray-700 text-emerald-400' : 'bg-gray-100 text-emerald-600'
                          }`}>
                            {cmd.command}
                          </code>
                          <button
                            onClick={() => copyToClipboard(cmd.command)}
                            className={`p-1 rounded ${
                              isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                            } transition-colors`}
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                        <p className={`text-sm mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {cmd.explanation}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          💡 {cmd.example}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Step by Step Guide (if available) */}
                {guide.stepByStepGuide && (
                  <section>
                    <div className="flex items-center space-x-3 mb-4">
                      <Play className={`h-5 w-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Step-by-Step Tutorial
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {guide.stepByStepGuide.map((step: any, index: number) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg ${
                            isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'
                          } border`}
                        >
                          <h4 className={`font-semibold mb-2 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                            {step.step}
                          </h4>
                          <ul className="space-y-1">
                            {step.details.map((detail: string, idx: number) => (
                              <li key={idx} className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                • {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Common Errors */}
                <section>
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className={`h-5 w-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Common Problems & Solutions
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {guide.commonErrors.map((error: any, index: number) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${
                          isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'
                        } border`}
                      >
                        <h4 className={`font-semibold mb-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                          ❌ {error.error}
                        </h4>
                        <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          <strong>Solution:</strong> {error.solution}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          💡 <strong>Tip:</strong> {error.tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Alternatives */}
                <section>
                  <div className="flex items-center space-x-3 mb-4">
                    <Wrench className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Alternative Tools
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {guide.alternatives.map((alt: any, index: number) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${
                          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        } border`}
                      >
                        <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {alt.name}
                        </h4>
                        <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {alt.description}
                        </p>
                        <div className="space-y-1">
                          <p className={`text-xs ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                            ✅ <strong>Pros:</strong> {alt.pros}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                            ❌ <strong>Cons:</strong> {alt.cons}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Real World Use */}
                <section>
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className={`h-5 w-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Real-World Applications
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {guide.realWorldUse.map((use: string, index: number) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg ${
                          isDark ? 'bg-purple-500/10 border-purple-500/20' : 'bg-purple-50 border-purple-200'
                        } border`}
                      >
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{use}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Pro Tips (if available) */}
                {guide.proTips && (
                  <section>
                    <div className="flex items-center space-x-3 mb-4">
                      <Star className={`h-5 w-5 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                      <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Pro Tips
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {guide.proTips.map((tip: string, index: number) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            isDark ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200'
                          } border`}
                        >
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            💡 {tip}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <section id="tools" className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 left-1/4 w-96 h-96 ${isDark ? 'bg-emerald-500/5' : 'bg-emerald-500/10'} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 ${isDark ? 'bg-teal-500/5' : 'bg-teal-500/10'} rounded-full blur-3xl`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center space-x-3 ${isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-100 border-emerald-300'} border rounded-full px-6 py-3 mb-6`}>
            <Github className={`h-5 w-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span className={`${isDark ? 'text-emerald-400' : 'text-emerald-700'} font-semibold`}>Open Source Security Tools</span>
          </div>
          <h2 className={`text-4xl lg:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
            GitHub <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Security Tools</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-8`}>
            Discover and master the most powerful open-source cybersecurity tools. Each tool includes detailed guides, 
            installation instructions, and real-world usage examples.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200`}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-3 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700 text-white focus:border-emerald-500' : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool, index) => (
            <div
              key={index}
              className={`group ${isDark ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/80 hover:border-emerald-500/30' : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-emerald-300'} border rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${isDark ? 'hover:shadow-emerald-500/10' : 'hover:shadow-emerald-500/20'}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(tool.difficulty)}`}>
                    {tool.difficulty}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-gray-800/80 text-gray-300 border-gray-600' : 'bg-white/80 text-gray-700 border-gray-300'} border backdrop-blur-sm`}>
                    {tool.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white group-hover:text-emerald-300' : 'text-gray-900 group-hover:text-emerald-600'} transition-colors duration-300`}>
                    {tool.name}
                  </h3>
                  <Github className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'} group-hover:text-emerald-500 transition-colors duration-300`} />
                </div>

                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-3 text-sm leading-relaxed`}>
                  {tool.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {tool.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded-lg text-xs ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}
                      >
                        {feature}
                      </span>
                    ))}
                    {tool.features.length > 3 && (
                      <span className={`px-2 py-1 rounded-lg text-xs ${isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                        +{tool.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-4 pb-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{tool.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="h-4 w-4" />
                      <span>{tool.forks}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${tool.language === 'Python' ? 'bg-blue-500' : tool.language === 'Java' ? 'bg-orange-500' : tool.language === 'C++' ? 'bg-purple-500' : tool.language === 'Ruby' ? 'bg-red-500' : tool.language === 'C' ? 'bg-gray-500' : 'bg-green-500'}`}></div>
                    <span className="text-xs">{tool.language}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                    Updated {tool.lastUpdate}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => openLearnMore(tool)}
                      className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-emerald-600 text-gray-400 hover:text-white' : 'bg-gray-100 hover:bg-emerald-600 text-gray-600 hover:text-white'} transition-all duration-200 hover:scale-110`}
                      title="Learn More"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => openLearnMore(tool)}
                      className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-blue-600 text-gray-400 hover:text-white' : 'bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white'} transition-all duration-200 hover:scale-110`}
                      title="Installation Guide"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <a
                      href={tool.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transition-all duration-200 hover:scale-110`}
                      title="View on GitHub"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <Github className={`h-16 w-16 ${isDark ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
            <h3 className={`text-xl font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
              No tools found
            </h3>
            <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className={`mt-16 ${isDark ? 'bg-gradient-to-r from-gray-800/80 to-gray-700/80 border-emerald-500/20' : 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'} border rounded-2xl p-8 lg:p-12 text-center`}>
          <div className="max-w-3xl mx-auto">
            <Github className={`h-16 w-16 ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mx-auto mb-6`} />
            <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Contribute to Open Source Security
            </h3>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
              Help improve these tools, report bugs, or contribute new features. 
              Join the global community of security researchers and developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                <Github className="h-5 w-5" />
                <span>View on GitHub</span>
              </button>
              <button className={`${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-700'} border ${isDark ? 'border-gray-700' : 'border-gray-300'} px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2`}>
                <Users className="h-5 w-5" />
                <span>Join Community</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More Modal */}
      {showLearnMore && <LearnMoreModal />}
    </section>
  );
};

export default GitHubTools;