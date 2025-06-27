import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import SEOHead from '../components/SEOHead';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProfessionalTrendingSection from '../components/ProfessionalTrendingSection';
import SecurityInsights from '../components/SecurityInsights';
import Tutorials from '../components/Tutorials';
import ParallaxSection from '../components/ParallaxSection';
import FAQ from '../components/FAQ';
import PsychologicalCTA from '../components/PsychologicalCTA';

const HomePage = () => {
  const { isDark } = useTheme();

  return (
    <>
      {/* Very subtle line below navigation */}
      <div className={`w-full h-px ${isDark ? 'bg-gray-800/30' : 'bg-gray-200/40'}`}></div>
      <SEOHead 
        title="HackTheShell - Master Cybersecurity Skills | #1 Ethical Hacking Training Platform"
        description="Master cybersecurity through hands-on tutorials, labs, and expert courses. Learn penetration testing, network security, ethical hacking, and advance your cybersecurity career with industry-recognized certifications."
        keywords="cybersecurity training, ethical hacking course, penetration testing, network security, cyber education, infosec certification, security tutorials, hacktheshell, cybersecurity bootcamp, ethical hacker certification"
        canonical="https://hacktheshell.com"
        type="website"
        author="HackTheShell Expert Team"
        rating={4.9}
        reviewCount={15847}
        price="Free"
        courseProvider="HackTheShell Academy"
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
        <section className={`py-16 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`rounded-2xl ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200'} p-6 lg:p-10 text-center shadow-xl relative overflow-hidden`}>
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
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Meet <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">CyberAce</span>
                  </h2>
                  <p className={`text-lg lg:text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                    Your AI-powered cybersecurity assistant
                  </p>
                  <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto mb-8 leading-relaxed`}>
                    Get instant help with security issues, code analysis, vulnerability assessments, and expert guidance. Available 24/7 to boost your cybersecurity skills.
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
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-cyan-500/25 inline-flex items-center space-x-3"
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
        <SecurityInsights />
        <ParallaxSection>
          <div className="py-16"></div>
        </ParallaxSection>
        <Tutorials />
        
        {/* Better spacing */}
        <div className="py-16"></div>
        
        <FAQ />
      </motion.div>
    </>
  );
};

export default HomePage;