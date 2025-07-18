import React from 'react';
import { BookOpen, Users, Award, Clock, Shield, Target, Zap, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Features = () => {
  const { isDark } = useTheme();

  const features = [
    {
      icon: BookOpen,
      title: "Expert Tutorials",
      description: "Learn from industry professionals with step-by-step guides covering everything from basics to advanced techniques."
    },
    {
      icon: Target,
      title: "Hands-on Labs",
      description: "Practice in safe, controlled environments with real-world scenarios and vulnerable applications."
    },
    {
      icon: Shield,
      title: "Ethical Approach",
      description: "All content focuses on defensive security and ethical hacking practices to protect and secure systems."
    },
    {
      icon: Users,
      title: "Active Community",
      description: "Join thousands of security professionals sharing knowledge, tips, and career opportunities."
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Earn recognized certificates to validate your cybersecurity skills and advance your career."
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Learn at your own pace with unlimited access to all tutorials, labs, and community resources."
    },
    {
      icon: Zap,
      title: "Latest Updates",
      description: "Stay current with the latest threats, tools, and techniques in the rapidly evolving security landscape."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with security professionals worldwide and participate in collaborative research projects."
    }
  ];

  return (
    <section className={`py-28 ${isDark ? 'bg-gray-800' : 'bg-gradient-to-br from-white via-slate-50 to-blue-50'} relative overflow-hidden`}>
      {/* Subtle Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 left-1/3 w-64 h-64 ${isDark ? 'bg-emerald-500/3' : 'bg-emerald-500/5'} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-0 right-1/3 w-64 h-64 ${isDark ? 'bg-teal-500/3' : 'bg-teal-500/5'} rounded-full blur-3xl`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
            Why Choose <span className={`${isDark ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-slate-600 to-blue-600'} bg-clip-text text-transparent`}>HackTheShell</span>?
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            We provide comprehensive cybersecurity education with practical, hands-on experience 
            that prepares you for real-world security challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group ${isDark ? 'bg-gray-900 border-gray-700 hover:bg-gray-800 hover:border-emerald-500/30' : 'bg-white border-blue-100 hover:bg-blue-50/50 hover:border-blue-200'} border rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${isDark ? 'hover:shadow-emerald-500/10' : 'hover:shadow-blue-500/20'}`}
              >
                <div className="mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${isDark ? 'bg-emerald-500/20 group-hover:bg-emerald-500/30' : 'bg-emerald-100 group-hover:bg-emerald-200'} rounded-lg transition-all duration-300`}>
                    <Icon className={`h-6 w-6 ${isDark ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-emerald-600 group-hover:text-emerald-700'} transition-colors duration-300`} />
                  </div>
                </div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white group-hover:text-emerald-300' : 'text-slate-800 group-hover:text-blue-700'} mb-3 transition-colors duration-300`}>
                  {feature.title}
                </h3>
                <p className={`${isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-slate-600 group-hover:text-slate-700'} transition-colors duration-300`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;