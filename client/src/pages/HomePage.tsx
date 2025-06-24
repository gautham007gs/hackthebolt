import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import SEOHead from '../components/SEOHead';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProfessionalTrendingSection from '../components/ProfessionalTrendingSection';
import Tutorials from '../components/Tutorials';
import ParallaxSection from '../components/ParallaxSection';
import FAQ from '../components/FAQ';
import PsychologicalCTA from '../components/PsychologicalCTA';

const HomePage = () => {
  const { isDark } = useTheme();

  return (
    <>
      <SEOHead 
        title="HackTheShell - Master Cybersecurity Skills | Learn Ethical Hacking"
        description="Master cybersecurity through hands-on tutorials, labs, and expert courses. Learn penetration testing, network security, ethical hacking, and advance your cybersecurity career."
        keywords="cybersecurity training, ethical hacking course, penetration testing, network security, cyber education, infosec certification, security tutorials"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-0"
      >
        <Hero />
        
        {/* AI Assistant CTA Section */}
        <section className={`py-24 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`rounded-3xl ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200'} p-8 lg:p-16 text-center shadow-2xl relative overflow-hidden`}>
              {/* Background effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full translate-y-32 -translate-x-32"></div>
              
              <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h2 className={`text-4xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Meet <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">CyberAce</span>
                  </h2>
                  <p className={`text-xl lg:text-2xl ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                    Your AI-powered cybersecurity assistant
                  </p>
                  <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto mb-12 leading-relaxed`}>
                    Get instant help with security issues, code analysis, vulnerability assessments, and expert guidance. Available 24/7 to boost your cybersecurity skills and solve complex problems.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Link href="/cyberace">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 inline-flex items-center space-x-4"
                    >
                      <Sparkles className="w-6 h-6" />
                      <span>Chat with CyberAce</span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <Features />
        <ProfessionalTrendingSection />
        
        {/* Better spacing */}
        <div className="py-12"></div>
        
        <ParallaxSection />
        <Tutorials />
        
        {/* Better spacing */}
        <div className="py-16"></div>
        
        <PsychologicalCTA />
        <FAQ />
      </motion.div>
    </>
  );
};

export default HomePage;