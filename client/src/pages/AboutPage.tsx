import React from 'react';
import { Shield, Users, Target, Award, Globe, Zap, Heart, Code } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const AboutPage = () => {
  const { isDark } = useTheme();

  const stats = [
    { icon: Users, label: 'Active Learners', value: '50,000+', color: 'text-blue-500' },
    { icon: Code, label: 'Tutorials Created', value: '500+', color: 'text-emerald-500' },
    { icon: Globe, label: 'Countries Reached', value: '120+', color: 'text-purple-500' },
    { icon: Award, label: 'Certified Professionals', value: '15,000+', color: 'text-orange-500' }
  ];

  const team = [
    {
      name: 'Dr. Alex Chen',
      role: 'Founder & Lead Security Researcher',
      bio: 'Former CISO with 15+ years in cybersecurity. PhD in Computer Science, published author of "Advanced Penetration Testing".',
      image: 'https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      expertise: ['Penetration Testing', 'Malware Analysis', 'Incident Response']
    },
    {
      name: 'Sarah Rodriguez',
      role: 'Head of Education',
      bio: 'Cybersecurity educator and trainer. CISSP certified with expertise in developing comprehensive security curricula.',
      image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      expertise: ['Security Training', 'Curriculum Development', 'Risk Management']
    },
    {
      name: 'Marcus Thompson',
      role: 'Principal Threat Hunter',
      bio: 'Former government cybersecurity specialist. Expert in advanced persistent threats and digital forensics.',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      expertise: ['Threat Hunting', 'Digital Forensics', 'Security Architecture']
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Ethical Security',
      description: 'We promote responsible disclosure and ethical hacking practices to make the digital world safer for everyone.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a supportive community where security professionals can learn, share knowledge, and grow together.'
    },
    {
      icon: Target,
      title: 'Practical Learning',
      description: 'Hands-on, real-world scenarios that prepare you for actual cybersecurity challenges in the field.'
    },
    {
      icon: Zap,
      title: 'Cutting-Edge Content',
      description: 'Stay ahead with the latest security techniques, tools, and threat intelligence from industry experts.'
    }
  ];

  const milestones = [
    { year: '2020', event: 'HackTheShell Founded', description: 'Started with a mission to democratize cybersecurity education' },
    { year: '2021', event: 'First 10K Students', description: 'Reached our first major milestone with comprehensive tutorials' },
    { year: '2022', event: 'Global Expansion', description: 'Expanded content to multiple languages and regions' },
    { year: '2023', event: 'Enterprise Program', description: 'Launched corporate training and certification programs' },
    { year: '2024', event: 'AI-Powered Learning', description: 'Integrated AI-powered personalized learning paths' }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pt-16`}>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-blue-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900 dark:text-white">
              Empowering the Next Generation of 
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Cyber Defenders</span>
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-4xl mx-auto leading-relaxed mb-8`}>
              At HackTheShell, we believe cybersecurity knowledge should be accessible to everyone. Our mission is to bridge the gap between theory and practice, 
              providing hands-on experience that prepares you for real-world security challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutorials" className="btn-primary px-8 py-3">
                Start Learning
              </Link>
              <Link href="/community" className="btn-secondary px-8 py-3">
                Join Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 text-center border ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <stat.icon className={`h-8 w-8 mx-auto mb-4 ${stat.color}`} />
                <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Mission & Values
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              We're committed to creating a more secure digital world through education, community, and ethical practices.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 border ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                } shadow-lg hover:shadow-xl transition-all duration-300 group`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {value.title}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Meet Our Expert Team
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Industry veterans and security researchers dedicated to advancing cybersecurity education.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl overflow-hidden border ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                } shadow-lg hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h3>
                  <p className="text-emerald-500 font-semibold mb-4">{member.role}</p>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 leading-relaxed`}>
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Journey
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              From a small idea to a global cybersecurity education platform.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-500 to-cyan-500 hidden lg:block"></div>
            
            <div className="space-y-12 lg:space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8`}
                >
                  <div className="flex-1">
                    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 border ${
                      isDark ? 'border-gray-700' : 'border-gray-200'
                    } shadow-lg`}>
                      <div className="text-emerald-500 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {milestone.event}
                      </h3>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden lg:block">
                    <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full relative z-10"></div>
                  </div>
                  
                  <div className="flex-1 lg:block hidden"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-white'} border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="h-12 w-12 text-emerald-500 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Ready to Start Your Cybersecurity Journey?
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-8`}>
              Join thousands of security professionals who trust HackTheShell for their cybersecurity education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutorials" className="btn-primary px-8 py-3">
                Browse Tutorials
              </Link>
              <Link href="/contact" className="btn-secondary px-8 py-3">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;