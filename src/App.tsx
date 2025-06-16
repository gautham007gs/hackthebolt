import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TutorialsPage from './pages/TutorialsPage';
import TutorialDetailPage from './pages/TutorialDetailPage';
import LabsPage from './pages/LabsPage';
import DashboardPage from './pages/DashboardPage';
import CTFPage from './pages/CTFPage';
import CertificationsPage from './pages/CertificationsPage';
import CommunityPage from './pages/CommunityPage';
import BlogPage from './pages/BlogPage';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <Router>
            <div className="min-h-screen transition-colors duration-300 dark:bg-black bg-white">
              <Header />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tutorials" element={<TutorialsPage />} />
                  <Route path="/tutorials/:id" element={<TutorialDetailPage />} />
                  <Route path="/labs" element={<LabsPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/ctf" element={<CTFPage />} />
                  <Route path="/certifications" element={<CertificationsPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                </Routes>
              </AnimatePresence>
              <Footer />
            </div>
          </Router>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;