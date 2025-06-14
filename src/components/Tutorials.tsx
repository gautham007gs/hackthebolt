import React from 'react';
import { BookOpen, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Tutorials = () => {
  const { isDark } = useTheme();

  const tutorials = [
    {
      title: "Web Application Penetration Testing",
      description: "Complete guide to identifying and exploiting web vulnerabilities using industry-standard tools and techniques.",
      level: "Intermediate",
      duration: "4 hours",
      students: "12.5K",
      rating: 4.9,
      image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
    },
    {
      title: "Network Security & Vulnerability Assessment",
      description: "Learn to secure networks, perform security audits, and implement robust defense mechanisms.",
      level: "Advanced",
      duration: "6 hours",
      students: "8.2K",
      rating: 4.8,
      image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
    },
    {
      title: "Linux System Administration for Security",
      description: "Master Linux security fundamentals, from basic hardening to advanced monitoring and incident response.",
      level: "Beginner",
      duration: "5 hours",
      students: "15.3K",
      rating: 4.9,
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
    },
    {
      title: "Wireless Security & WiFi Hacking",
      description: "Understand wireless protocols, attack vectors, and defense strategies for securing wireless networks.",
      level: "Intermediate",
      duration: "3 hours",
      students: "9.7K",
      rating: 4.7,
      image: "https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
    },
    {
      title: "Digital Forensics & Incident Response",
      description: "Learn to investigate cyber incidents, collect digital evidence, and perform forensic analysis.",
      level: "Advanced",
      duration: "7 hours",
      students: "6.8K",
      rating: 4.8,
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
    },
    {
      title: "Social Engineering & OSINT",
      description: "Understand human psychology in security, OSINT techniques, and how to defend against social attacks.",
      level: "Intermediate",
      duration: "4 hours",
      students: "11.2K",
      rating: 4.6,
      image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300';
      case 'Intermediate': return isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Advanced': return isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300';
      default: return isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <section id="tutorials" className={`py-20 ${isDark ? 'bg-black' : 'bg-white'} relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 right-0 w-96 h-96 ${isDark ? 'bg-emerald-500/5' : 'bg-emerald-500/10'} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-1/4 left-0 w-96 h-96 ${isDark ? 'bg-teal-500/5' : 'bg-teal-500/10'} rounded-full blur-3xl`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
            Featured <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Tutorials</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-8`}>
            Master cybersecurity with our comprehensive, hands-on tutorials designed by industry experts.
          </p>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105">
            View All Tutorials
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial, index) => (
            <div
              key={index}
              className={`group ${isDark ? 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-900/80 hover:border-emerald-500/30' : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-emerald-300'} border rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${isDark ? 'hover:shadow-emerald-500/10' : 'hover:shadow-emerald-500/20'}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(tutorial.level)}`}>
                    {tutorial.level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white group-hover:text-emerald-300' : 'text-gray-900 group-hover:text-emerald-600'} mb-3 transition-colors duration-300`}>
                  {tutorial.title}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-3`}>
                  {tutorial.description}
                </p>

                <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-4`}>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{tutorial.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{tutorial.students}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{tutorial.rating}</span>
                  </div>
                </div>

                <button className={`group/btn w-full ${isDark ? 'bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-gray-300 hover:text-white' : 'bg-gray-200 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-gray-700 hover:text-white'} px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2`}>
                  <BookOpen className="h-4 w-4" />
                  <span>Start Tutorial</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tutorials;