import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Tutorials from '../components/Tutorials';
import GitHubTools from '../components/GitHubTools';
import Blog from '../components/Blog';
import Community from '../components/Community';

const HomePage = () => {
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
      >
        <Hero />
        <Features />
        <Tutorials />
        <GitHubTools />
        <Blog />
        <Community />
      </motion.div>
    </>
  );
};

export default HomePage;