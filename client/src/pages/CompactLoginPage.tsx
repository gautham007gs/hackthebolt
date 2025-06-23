import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, Chrome, Github, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const CompactLoginPage = () => {
  const { isDark } = useTheme();
  const { login, register, socialLogin, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      setLocation('/');
    }
  }, [isAuthenticated, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          setLocation('/');
        } else {
          setError('Invalid credentials');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        const success = await register(formData.email, formData.password, formData.name);
        if (success) {
          setLocation('/');
        } else {
          setError('Registration failed');
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    try {
      const userData = {
        id: Date.now().toString(),
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: `user@${provider}.com`,
      };

      const success = await socialLogin(provider, userData);
      if (success) {
        setLocation('/');
      } else {
        setError('Social login failed');
      }
    } catch (err) {
      setError('Social login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center p-4`}>
      <div className="w-full max-w-sm">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <Link href="/" className="inline-flex items-center space-x-2 mb-3">
            <Shield className="h-5 w-5 text-emerald-500" />
            <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              HackTheShell
            </span>
          </Link>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {isLogin ? 'Sign in to continue' : 'Join the community'}
          </p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-lg shadow-lg p-5`}
        >
          {/* Error Message */}
          {error && (
            <div className="mb-3 p-2 bg-red-100 border border-red-300 text-red-700 rounded text-xs">
              {error}
            </div>
          )}

          {/* Social Login */}
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSocialLogin('google')}
                disabled={loading}
                className={`flex items-center justify-center py-2 px-3 border rounded text-xs font-medium transition-colors ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                } disabled:opacity-50`}
              >
                <Chrome className="h-3 w-3 mr-1" />
                Google
              </button>
              <button
                onClick={() => handleSocialLogin('github')}
                disabled={loading}
                className={`flex items-center justify-center py-2 px-3 border rounded text-xs font-medium transition-colors ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                } disabled:opacity-50`}
              >
                <Github className="h-3 w-3 mr-1" />
                GitHub
              </button>
            </div>
            
            <div className="relative my-3">
              <div className={`absolute inset-0 flex items-center`}>
                <div className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`} />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className={`px-2 ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                  or
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {!isLogin && (
              <div>
                <div className="relative">
                  <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`pl-8 w-full px-3 py-2 border text-xs ${
                      isDark 
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-emerald-500' 
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                    } rounded focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors`}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <div className="relative">
                <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`pl-8 w-full px-3 py-2 border text-xs ${
                    isDark 
                      ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-emerald-500' 
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                  } rounded focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors`}
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`pl-8 pr-8 w-full px-3 py-2 border text-xs ${
                    isDark 
                      ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-emerald-500' 
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                  } rounded focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`pl-8 w-full px-3 py-2 border text-xs ${
                      isDark 
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-emerald-500' 
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                    } rounded focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors`}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>{isLogin ? 'Sign in' : 'Create account'}</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </>
              )}
            </button>
          </form>

          <div className="mt-3 text-center">
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs text-emerald-600 hover:text-emerald-500 font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </motion.div>

        {/* Back to home link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-3"
        >
          <Link
            href="/"
            className={`text-xs ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'} transition-colors flex items-center justify-center space-x-1`}
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Back to home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CompactLoginPage;