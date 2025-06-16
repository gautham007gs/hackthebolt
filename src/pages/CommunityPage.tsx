import React from 'react';
import { motion } from 'framer-motion';
import Community from '../components/Community';

const CommunityPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <Community />
    </motion.div>
  );
};

export default CommunityPage;