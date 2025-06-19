import React, { useState } from 'react';
import { BookOpen, Clock, Users, Star, ArrowRight, Filter, Search, Play, Code, Shield, Terminal, Globe, Lock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import CodeSnippet from './CodeSnippet';

const Tutorials = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All', 'Web Security', 'Network Security', 'Penetration Testing', 'Malware Analysis', 'Digital Forensics', 'Cryptography'
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const tutorials = [
    {
      id: '1',
      slug: 'sql-injection-fundamentals',
      title: "SQL Injection: From Basics to Advanced Exploitation",
      description: "Master SQL injection techniques, from basic enumeration to advanced bypass methods and prevention strategies.",
      category: "Web Security",
      difficulty: "Intermediate",
      duration: "45 min",
      students: "12.5K",
      rating: 4.8,
      reviews: 342,
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      tags: ["SQL", "Web Apps", "OWASP"],
      prerequisites: ["Basic SQL knowledge", "HTTP understanding"],
      codeExample: `# Basic SQL injection test
import requests

# Test for SQL injection vulnerability
url = "http://target.com/login"
payload = {"username": "admin' OR '1'='1", "password": "test"}

response = requests.post(url, data=payload)
if "Welcome" in response.text:
    print("SQL injection vulnerability detected!")
else:
    print("No vulnerability found")`,
      learningObjectives: [
        "Understand SQL injection attack vectors",
        "Learn manual and automated testing techniques",
        "Master WAF bypass methods",
        "Implement effective countermeasures"
      ]
    },
    {
      id: '2',
      slug: 'network-reconnaissance',
      title: "Network Reconnaissance and Information Gathering",
      description: "Learn comprehensive network reconnaissance techniques using various tools and methodologies for ethical hacking.",
      category: "Network Security",
      difficulty: "Beginner",
      duration: "30 min",
      students: "8.7K",
      rating: 4.9,
      reviews: 289,
      image: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      tags: ["Reconnaissance", "Nmap", "OSINT"],
      prerequisites: ["Basic networking knowledge"],
      codeExample: `#!/bin/bash
# Network reconnaissance script

target="192.168.1.0/24"

echo "Starting network reconnaissance..."
echo "Target: $target"

# Network discovery
echo "1. Network Discovery:"
nmap -sn $target

# Port scanning
echo "2. Port Scanning:"
nmap -sS -O $target

# Service enumeration
echo "3. Service Enumeration:"
nmap -sV -sC $target

echo "Reconnaissance completed!"`,
      learningObjectives: [
        "Master network discovery techniques",
        "Learn port scanning methodologies",
        "Understand service enumeration",
        "Practice OSINT gathering"
      ]
    },
    {
      id: '3',
      slug: 'buffer-overflow-exploitation',
      title: "Buffer Overflow Exploitation Fundamentals",
      description: "Deep dive into memory corruption vulnerabilities and learn how to exploit buffer overflows in real-world scenarios.",
      category: "Penetration Testing",
      difficulty: "Advanced",
      duration: "60 min",
      students: "5.2K",
      rating: 4.7,
      reviews: 156,
      image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      tags: ["Buffer Overflow", "Assembly", "Exploitation"],
      prerequisites: ["C programming", "Assembly basics", "Linux knowledge"],
      codeExample: `#include <stdio.h>
#include <string.h>

// Vulnerable function
void vulnerable_function(char *input) {
    char buffer[64];
    strcpy(buffer, input);  // Vulnerable to buffer overflow
    printf("Input: %s\\n", buffer);
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <input>\\n", argv[0]);
        return 1;
    }
    
    vulnerable_function(argv[1]);
    return 0;
}

// Exploit payload generation
// python -c "print('A' * 72 + 'BBBB')" | ./vulnerable`,
      learningObjectives: [
        "Understand memory layout and stack structure",
        "Learn to identify buffer overflow vulnerabilities",
        "Master exploit development techniques",
        "Implement protection bypass methods"
      ]
    },
    {
      id: '4',
      slug: 'malware-analysis-basics',
      title: "Malware Analysis: Static and Dynamic Techniques",
      description: "Learn to analyze malware samples using both static and dynamic analysis techniques in a safe environment.",
      category: "Malware Analysis",
      difficulty: "Intermediate",
      duration: "50 min",
      students: "6.8K",
      rating: 4.6,
      reviews: 203,
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      tags: ["Malware", "Reverse Engineering", "Analysis"],
      prerequisites: ["Virtual machines", "Basic programming"],
      codeExample: `#!/usr/bin/env python3
# Basic malware analysis script

import hashlib
import pefile
import sys

def analyze_pe(file_path):
    """Analyze PE file structure"""
    try:
        pe = pefile.PE(file_path)
        
        # Basic file info
        print(f"File: {file_path}")
        print(f"MD5: {get_md5(file_path)}")
        print(f"Architecture: {pe.FILE_HEADER.Machine}")
        
        # Sections analysis
        print("\\nSections:")
        for section in pe.sections:
            print(f"  {section.Name.decode().strip()}: {hex(section.VirtualAddress)}")
        
        # Imports analysis
        print("\\nImports:")
        for entry in pe.DIRECTORY_ENTRY_IMPORT:
            print(f"  {entry.dll.decode()}")
            
    except Exception as e:
        print(f"Error: {e}")

def get_md5(file_path):
    """Calculate MD5 hash"""
    with open(file_path, 'rb') as f:
        return hashlib.md5(f.read()).hexdigest()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python analyze.py <file>")
        sys.exit(1)
    
    analyze_pe(sys.argv[1])`,
      learningObjectives: [
        "Set up safe analysis environment",
        "Perform static malware analysis",
        "Conduct dynamic behavior analysis",
        "Generate comprehensive reports"
      ]
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = selectedCategory === 'All' || tutorial.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || tutorial.difficulty === selectedDifficulty;
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-500/20';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-500/20';
      case 'Advanced': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-500/20';
      case 'Expert': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-500/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-500/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Security': return <Globe className="h-5 w-5" />;
      case 'Network Security': return <Shield className="h-5 w-5" />;
      case 'Penetration Testing': return <Terminal className="h-5 w-5" />;
      case 'Malware Analysis': return <Code className="h-5 w-5" />;
      case 'Digital Forensics': return <Search className="h-5 w-5" />;
      case 'Cryptography': return <Lock className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight text-gray-900 dark:text-white">
              Hands-On Cybersecurity Tutorials
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed`}>
              Learn cybersecurity through practical, real-world scenarios with step-by-step guidance and hands-on labs.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 mb-12 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                } focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200`}
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-emerald-500' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-emerald-500'
                } focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-emerald-500' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-emerald-500'
                } focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200`}
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tutorials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredTutorials.map((tutorial, index) => (
            <motion.article
              key={tutorial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-elevated overflow-hidden group"
            >
              {/* Tutorial Header */}
              <div className="relative overflow-hidden">
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${
                    isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {getCategoryIcon(tutorial.category)}
                    <span>{tutorial.category}</span>
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                    {tutorial.difficulty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-500 transition-colors duration-300 text-gray-900 dark:text-white">
                  {tutorial.title}
                </h3>
                
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 leading-relaxed`}>
                  {tutorial.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutorial.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`px-2 py-1 rounded-lg text-xs ${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Prerequisites */}
                <div className="mb-4">
                  <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Prerequisites:
                  </h4>
                  <ul className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
                    {tutorial.prerequisites.map((prereq, preqIndex) => (
                      <li key={preqIndex} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Preview */}
                <div className="mb-6">
                  <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Code Preview:
                  </h4>
                  <CodeSnippet
                    code={tutorial.codeExample}
                    language="python"
                    showLineNumbers={false}
                    allowDownload={false}
                    className="text-xs"
                  />
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{tutorial.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{tutorial.students}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{tutorial.rating}</span>
                      <span>({tutorial.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  href={`/tutorials/${tutorial.slug}`}
                  className="btn-primary w-full group flex items-center justify-center space-x-2"
                >
                  <Play className="h-4 w-4" />
                  <span>Start Tutorial</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredTutorials.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className={`h-12 w-12 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              No tutorials found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/tutorials"
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>View All Tutorials</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Tutorials;