import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Search, 
  Filter, 
  Star, 
  GitBranch, 
  Terminal, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Code,
  Users,
  Download,
  Eye,
  ThumbsUp
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import AdvancedSEO from '../components/AdvancedSEO';
import { Link } from 'wouter';

const GitHubToolsPage = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = [
    'All', 'Version Control', 'CI/CD', 'Security Scanning', 'Code Analysis', 
    'Project Management', 'Documentation', 'Deployment', 'Monitoring', 'Testing'
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const githubTools = [
    {
      id: '1',
      name: 'Git',
      slug: 'git-version-control',
      description: 'Distributed version control system for tracking changes in source code during software development.',
      category: 'Version Control',
      difficulty: 'Beginner',
      officialUrl: 'https://git-scm.com/',
      githubUrl: 'https://github.com/git/git',
      views: 15420,
      likes: 2341,
      featured: true,
      useCases: [
        'Track code changes across multiple developers',
        'Maintain project history and rollback capabilities', 
        'Branch management for feature development',
        'Merge conflict resolution'
      ],
      alternatives: ['Mercurial', 'Subversion (SVN)', 'Perforce'],
      commonErrors: [
        {
          error: 'fatal: not a git repository',
          solution: 'Run `git init` to initialize a Git repository in the current directory'
        },
        {
          error: 'merge conflict',
          solution: 'Manually resolve conflicts in affected files, then run `git add` and `git commit`'
        }
      ],
      bestPractices: [
        'Write clear, descriptive commit messages',
        'Commit frequently with logical changes',
        'Use branching strategies like GitFlow',
        'Always pull before pushing to avoid conflicts'
      ]
    },
    {
      id: '2',
      name: 'GitHub Actions',
      slug: 'github-actions-ci-cd',
      description: 'Automation platform that enables CI/CD workflows directly in GitHub repositories.',
      category: 'CI/CD',
      difficulty: 'Intermediate',
      officialUrl: 'https://github.com/features/actions',
      githubUrl: 'https://github.com/actions',
      views: 8750,
      likes: 1205,
      featured: true,
      useCases: [
        'Automated testing on pull requests',
        'Continuous deployment to production',
        'Code quality checks and linting',
        'Security vulnerability scanning'
      ],
      alternatives: ['Jenkins', 'GitLab CI', 'CircleCI', 'Travis CI'],
      commonErrors: [
        {
          error: 'yaml syntax error in workflow',
          solution: 'Validate YAML syntax and check indentation. Use YAML validators online'
        },
        {
          error: 'permission denied errors',
          solution: 'Check repository secrets and workflow permissions in settings'
        }
      ],
      bestPractices: [
        'Use matrix builds for multiple environments',
        'Cache dependencies to speed up builds',
        'Use secrets for sensitive information',
        'Implement proper error handling in workflows'
      ]
    },
    {
      id: '3',
      name: 'CodeQL',
      slug: 'codeql-security-analysis',
      description: 'Semantic code analysis engine for discovering vulnerabilities across codebases.',
      category: 'Security Scanning',
      difficulty: 'Advanced',
      officialUrl: 'https://codeql.github.com/',
      githubUrl: 'https://github.com/github/codeql',
      views: 4230,
      likes: 892,
      featured: false,
      useCases: [
        'Static application security testing (SAST)',
        'Find SQL injection vulnerabilities',
        'Detect cross-site scripting (XSS) flaws',
        'Custom security rule creation'
      ],
      alternatives: ['SonarQube', 'Checkmarx', 'Veracode', 'Snyk Code'],
      commonErrors: [
        {
          error: 'database creation failed',
          solution: 'Ensure the codebase language is supported and dependencies are installed'
        },
        {
          error: 'query compilation errors',
          solution: 'Check CodeQL query syntax and library imports'
        }
      ],
      bestPractices: [
        'Run analysis on every pull request',
        'Create custom queries for specific vulnerabilities',
        'Review and triage all findings',
        'Integrate with IDE for real-time feedback'
      ]
    },
    {
      id: '4',
      name: 'Dependabot',
      slug: 'dependabot-dependency-management',
      description: 'Automated dependency updates and security vulnerability alerts for repositories.',
      category: 'Security Scanning',
      difficulty: 'Beginner',
      officialUrl: 'https://github.com/dependabot',
      githubUrl: 'https://github.com/dependabot',
      views: 6890,
      likes: 1456,
      featured: true,
      useCases: [
        'Automatic dependency updates',
        'Security vulnerability notifications',
        'Version compatibility checking',
        'License compliance monitoring'
      ],
      alternatives: ['Renovate', 'WhiteSource', 'Snyk', 'npm audit'],
      commonErrors: [
        {
          error: 'dependabot config not working',
          solution: 'Check .github/dependabot.yml syntax and file placement'
        },
        {
          error: 'too many pull requests',
          solution: 'Configure update schedules and grouping options'
        }
      ],
      bestPractices: [
        'Configure appropriate update schedules',
        'Group related dependency updates',
        'Set up automated testing for dependency updates',
        'Review security advisories promptly'
      ]
    },
    {
      id: '5',
      name: 'GitHub CLI',
      slug: 'github-cli-command-line',
      description: 'Official command-line tool for GitHub operations and workflow automation.',
      category: 'Project Management',
      difficulty: 'Intermediate',
      officialUrl: 'https://cli.github.com/',
      githubUrl: 'https://github.com/cli/cli',
      views: 3420,
      likes: 567,
      featured: false,
      useCases: [
        'Create and manage pull requests',
        'Issue tracking and management',
        'Repository cloning and forking',
        'Workflow and release management'
      ],
      alternatives: ['Hub', 'Git CLI', 'GitKraken', 'SourceTree'],
      commonErrors: [
        {
          error: 'authentication failed',
          solution: 'Run `gh auth login` to authenticate with GitHub'
        },
        {
          error: 'command not found',
          solution: 'Install GitHub CLI or add it to your PATH'
        }
      ],
      bestPractices: [
        'Use aliases for frequently used commands',
        'Leverage gh extensions for additional functionality',
        'Combine with shell scripts for automation',
        'Use templates for consistent issue/PR creation'
      ]
    }
  ];

  const filteredTools = githubTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || tool.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300',
      'Intermediate': isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Advanced': isDark ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-300',
      'Expert': isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300'
    };
    return colors[difficulty] || (isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-300');
  };

  return (
    <>
      <AdvancedSEO
        title="GitHub Tools & Security Guide - Master DevSecOps | HackTheShell"
        description="Comprehensive guide to GitHub tools for cybersecurity professionals. Learn Git, GitHub Actions, CodeQL, Dependabot, and security best practices for DevSecOps."
        keywords="github tools, git security, github actions, codeql, dependabot, devsecops, github security, version control security, ci cd security"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'GitHub Tools for Cybersecurity',
          description: 'Complete guide to GitHub tools and security practices',
          numberOfItems: githubTools.length,
          itemListElement: githubTools.map((tool, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'SoftwareApplication',
              name: tool.name,
              description: tool.description,
              applicationCategory: tool.category,
              url: `${window.location.origin}/github-tools/${tool.slug}`
            }
          }))
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'} pt-20`}
      >
        {/* Hero Section */}
        <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-blue-50'} relative overflow-hidden`}>
          <div className="absolute inset-0">
            <div className={`absolute top-1/4 left-1/4 w-72 h-72 ${isDark ? 'bg-blue-500/5' : 'bg-blue-400/10'} rounded-full blur-2xl`}></div>
            <div className={`absolute bottom-1/4 right-1/4 w-72 h-72 ${isDark ? 'bg-indigo-500/5' : 'bg-indigo-400/10'} rounded-full blur-2xl`}></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className={`inline-flex items-center space-x-3 ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-100 border-blue-300'} border rounded-full px-6 py-3 mb-6`}>
                <Github className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`${isDark ? 'text-blue-400' : 'text-blue-700'} font-semibold`}>GitHub Tools Mastery</span>
              </div>
              
              <h1 className={`text-4xl lg:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Master <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>GitHub</span> Tools
              </h1>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto mb-8`}>
                Complete guide to GitHub tools, security practices, and DevSecOps workflows. 
                Learn from common errors to expert-level implementations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className={`${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2`}>
                  <Terminal className="h-5 w-5" />
                  <span>Start Learning</span>
                </button>
                <button className={`border-2 ${isDark ? 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10' : 'border-blue-600/30 text-blue-600 hover:bg-blue-50'} px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2`}>
                  <BookOpen className="h-5 w-5" />
                  <span>Best Practices</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Tools Covered', value: '15+', icon: Github },
                { label: 'Use Cases', value: '50+', icon: Zap },
                { label: 'Common Errors', value: '100+', icon: AlertTriangle },
                { label: 'Best Practices', value: '200+', icon: CheckCircle }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${isDark ? 'bg-gradient-to-br from-purple-500/20 to-emerald-500/20' : 'bg-gradient-to-br from-purple-100 to-emerald-100'} rounded-full mb-4`}>
                      <Icon className={`h-8 w-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                    <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{stat.value}</div>
                    <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className={`py-12 ${isDark ? 'bg-black' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search GitHub tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'} focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200`}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-center lg:justify-start">
                <div className="flex items-center space-x-2">
                  <Filter className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Filter by:</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`flex-1 sm:w-48 px-4 py-3 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'} focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200`}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>

                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className={`flex-1 sm:w-40 px-4 py-3 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'} focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200`}
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className={`py-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group ${isDark ? 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-900/80 hover:border-purple-500/30' : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-purple-300'} border rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${isDark ? 'hover:shadow-purple-500/10' : 'hover:shadow-purple-500/20'}`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                          <Github className={`h-6 w-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-purple-500 transition-colors`}>
                            {tool.name}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(tool.difficulty)}`}>
                            {tool.difficulty}
                          </span>
                        </div>
                      </div>
                      {tool.featured && (
                        <Star className={`h-5 w-5 ${isDark ? 'text-yellow-400' : 'text-yellow-500'} fill-current`} />
                      )}
                    </div>

                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 leading-relaxed`}>
                      {tool.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Category:</span>
                        <span className={`${isDark ? 'text-purple-400' : 'text-purple-600'} font-medium`}>{tool.category}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{tool.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{tool.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Link
                        to={`/github-tools/${tool.slug}`}
                        className={`flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${isDark ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'} transition-colors duration-200 mr-2`}
                      >
                        <BookOpen className="h-4 w-4" />
                        <span>Learn More</span>
                      </Link>
                      
                      <a
                        href={tool.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
                Ready to Master GitHub Tools?
              </h2>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                Join thousands of cybersecurity professionals who have enhanced their DevSecOps skills with our comprehensive guides.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/tutorials"
                  className="bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-purple-500/25 inline-flex items-center justify-center space-x-2"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Start Learning</span>
                </Link>
                <Link
                  to="/labs"
                  className={`border-2 ${isDark ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10' : 'border-purple-600/30 text-purple-600 hover:bg-purple-50'} px-8 py-4 rounded-xl font-semibold transition-all duration-200 inline-flex items-center justify-center space-x-2`}
                >
                  <Terminal className="h-5 w-5" />
                  <span>Practice Labs</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default GitHubToolsPage;