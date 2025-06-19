import React from 'react';
import { Router, Route, Switch } from 'wouter';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import ImprovedHeader from './components/ImprovedHeader';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import useScrollToTop from './components/useScrollToTop';
import HomePage from './pages/HomePage';
import TutorialsPage from './pages/TutorialsPage';
import TutorialDetailPage from './pages/TutorialDetailPage';
import LabsPage from './pages/LabsPage';
import DashboardPage from './pages/DashboardPage';
import CTFPage from './pages/CTFPage';
import CertificationsPage from './pages/CertificationsPage';
import CommunityPage from './pages/CommunityPage';
import BlogPage from './pages/BlogPage';
import EnhancedBlogPostPage from './pages/EnhancedBlogPostPage';
import AdminPage from './pages/AdminPage';
import CreatorPage from './pages/CreatorPage';
import ProfessionalAdminPage from './pages/ProfessionalAdminPage';
import ProfessionalCreatorPage from './pages/ProfessionalCreatorPage';
import LoginPage from './pages/LoginPage';
import GitHubToolsPage from './pages/GitHubToolsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CreatorApplicationPage from './pages/CreatorApplicationPage';
import { motion, AnimatePresence } from 'framer-motion';

function AppContent() {
  useScrollToTop();
  
  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-white">
      <ImprovedHeader />
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
          <Route path="/blog/:slug" component={EnhancedBlogPostPage} />
          <Route path="/admin" component={ProfessionalAdminPage} />
          <Route path="/creator" component={ProfessionalCreatorPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/github-tools" component={GitHubToolsPage} />
          <Route path="/tools" component={GitHubToolsPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/apply-creator" component={CreatorApplicationPage} />
        </Switch>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ProgressProvider>
            <Router>
              <AppContent />
            </Router>
          </ProgressProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;