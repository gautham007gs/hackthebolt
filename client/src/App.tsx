import React from 'react';
import { Router, Route, Switch, useLocation } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { queryClient } from './lib/queryClient';
import ProfessionalHeader from './components/ProfessionalHeader';
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
import { NewsPage } from './pages/NewsPage';
import AdminPage from './pages/AdminPage';
import CreatorPage from './pages/CreatorPage';
import ProfessionalAdminPage from './pages/ProfessionalAdminPage';
import ProfessionalCreatorPage from './pages/ProfessionalCreatorPage';
import ImprovedAdminPage from './pages/ImprovedAdminPage';
import ImprovedCreatorPageWithEditor from './pages/ImprovedCreatorPageWithEditor';
import CompactLoginPage from './pages/CompactLoginPage';
import ProfilePage from './pages/ProfilePage';
import AdvancedDashboard from './pages/AdvancedDashboard';
import GitHubToolsPage from './pages/GitHubToolsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CreatorApplicationPage from './pages/CreatorApplicationPage';
import CyberAcePageV2 from './pages/CyberAcePageV2';
import CreatorGithubTools from './pages/CreatorGithubTools';
import CreateGithubTool from './pages/CreateGithubTool';
import { motion, AnimatePresence } from 'framer-motion';

function AppContent() {
  useScrollToTop();
  const [location] = useLocation();
  
  // Hide footer on admin, creator dashboard, and auth pages
  const isDashboardPage = location === '/admin' || location === '/creator';
  const isAuthPage = location === '/login';
  
  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-white">
      {!isDashboardPage && !isAuthPage && <ProfessionalHeader />}
      <main className={!isDashboardPage && !isAuthPage ? 'pt-16' : ''}>
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
          <Route path="/news" component={NewsPage} />
          <Route path="/admin" component={ImprovedAdminPage} />
          <Route path="/creator" component={CreatorPage} />
          <Route path="/login" component={CompactLoginPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/advanced-dashboard" component={AdvancedDashboard} />
          <Route path="/github-tools" component={GitHubToolsPage} />
          <Route path="/tools" component={GitHubToolsPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/apply-creator" component={CreatorApplicationPage} />
          <Route path="/cyberace" component={CyberAcePageV2} />
          <Route path="/creator/github-tools" component={CreatorGithubTools} />
          <Route path="/creator/github-tools/create" component={CreateGithubTool} />
          </Switch>
        </AnimatePresence>
      </main>
      {!isDashboardPage && !isAuthPage && !location.includes('/cyberace') && <Footer />}
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <ProgressProvider>
              <Router>
                <AppContent />
              </Router>
            </ProgressProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;