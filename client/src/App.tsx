import React from 'react';
import { Router, Route, Switch } from 'wouter';
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
import BlogPostPage from './pages/BlogPostPage';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <Router>
            <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-white">
              <Header />
              <AnimatePresence mode="wait">
                <Switch>
                  <Route path="/" component={HomePage} />
                  <Route path="/tutorials" component={TutorialsPage} />
                  <Route path="/tutorials/:id" component={TutorialDetailPage} />
                  <Route path="/labs" component={LabsPage} />
                  <Route path="/dashboard" component={DashboardPage} />
                  <Route path="/ctf" component={CTFPage} />
                  <Route path="/certifications" component={CertificationsPage} />
                  <Route path="/community" component={CommunityPage} />
                  <Route path="/blog" component={BlogPage} />
                  <Route path="/blog/:slug" component={BlogPostPage} />
                </Switch>
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