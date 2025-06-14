import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Tutorials from './components/Tutorials';
import GitHubTools from './components/GitHubTools';
import Blog from './components/Blog';
import Community from './components/Community';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300 dark:bg-black bg-white">
        <Header />
        <Hero />
        <Features />
        <Tutorials />
        <GitHubTools />
        <Blog />
        <Community />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;