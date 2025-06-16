import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Tutorials from '../components/Tutorials';
import GitHubTools from '../components/GitHubTools';
import Blog from '../components/Blog';
import Community from '../components/Community';
import ParallaxSection from '../components/ParallaxSection';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      <ParallaxSection speed={0.3}>
        <Features />
      </ParallaxSection>
      
      <ParallaxSection speed={0.4} direction="down">
        <Tutorials />
      </ParallaxSection>
      
      <ParallaxSection speed={0.2}>
        <GitHubTools />
      </ParallaxSection>
      
      <ParallaxSection speed={0.5} direction="down">
        <Blog />
      </ParallaxSection>
      
      <ParallaxSection speed={0.3}>
        <Community />
      </ParallaxSection>
    </motion.div>
  );
};

export default HomePage;