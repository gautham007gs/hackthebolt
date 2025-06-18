import React from 'react';
import { motion } from 'framer-motion';
import Blog from '../components/Blog';

const BlogPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <Blog />
    </motion.div>
  );
};

export default BlogPage;