import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Tutorials from '../components/Tutorials';
import GitHubTools from '../components/GitHubTools';
import Blog from '../components/Blog';
import Community from '../components/Community';

const HomePage = () => {
  return (
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
  );
};

export default HomePage;