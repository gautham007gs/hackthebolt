import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, CheckCircle, Github, Chrome, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginPage = () => {
  const { isDark } = useTheme();
  const { login, register, socialLogin, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    resetEmail: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setLocation('/');
    }
  }, [isAuthenticated, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          setSuccess('Successfully logged in! Redirecting...');
          setTimeout(() => {
            setLocation('/');
          }, 1500);
        } else {
          setError('Invalid email or password');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (formData.password.length < 8) {
          setError('Password must be at least 8 characters long');
          setLoading(false);
          return;
        }
        const success = await register(formData.name, formData.email, formData.password);
        if (success) {
          setSuccess('Account created successfully! Welcome to HackTheShell!');
          setTimeout(() => {
            setLocation('/');
          }, 2000);
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate password reset email
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setResetEmailSent(true);
    setLoading(false);
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate social login data
      const userData = {
        id: Date.now().toString(),
        name: provider === 'google' ? 'Google User' : 'GitHub User',
        email: `user@${provider}.com`,
      };

      const success = await socialLogin(provider, userData);
      if (success) {
        setSuccess(`Successfully logged in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}! Redirecting...`);
        setTimeout(() => {
          setLocation('/');
        }, 1500);
      } else {
        setError('Social login failed. Please try again.');
      }
    } catch (err) {
      setError('Social login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      resetEmail: ''
    });
    setError('');
    setSuccess('');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (showForgotPassword) {
    return (
      <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-md w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className={`w-10 h-8 ${
                isDark ? 'bg-gray-900 border-emerald-400' : 'bg-white border-emerald-600'
              } border border-l-2 border-b-2 rounded-bl-lg flex items-center justify-start pl-2 font-mono text-sm shadow-lg`}>
                <span className={`select-none ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>$</span>
              </div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                HackTheShell
              </h1>
            </div>
            <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Reset Password
            </h2>
            <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Enter your email to receive a password reset link
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl border shadow-xl p-8`}
          >
            {resetEmailSent ? (
              <div className="text-center space-y-4">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Check your email
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  We've sent a password reset link to {formData.resetEmail}
                </p>
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmailSent(false);
                    resetForm();
                  }}
                  className={`mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium transition-all duration-200 ${
                    isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="email"
                      name="resetEmail"
                      value={formData.resetEmail}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm transition-all duration-200 ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20'
                      } focus:outline-none focus:ring-4`}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    'Send reset link'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className={`w-full flex justify-center py-3 px-4 border rounded-xl text-sm font-medium transition-all duration-200 ${
                    isDark 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to login
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className={`w-10 h-8 ${
              isDark ? 'bg-gray-900 border-emerald-400' : 'bg-white border-emerald-600'
            } border border-l-2 border-b-2 rounded-bl-lg flex items-center justify-start pl-2 font-mono text-sm shadow-lg`}>
              <span className={`select-none ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>$</span>
            </div>
            <div className="text-left">
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                HackTheShell
              </h1>
            </div>
          </div>
          <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {isLogin 
              ? 'Enter your credentials to access your account' 
              : 'Join thousands learning cybersecurity'
            }
          </p>
        </motion.div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {(success || error) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-xl border ${
                success 
                  ? isDark 
                    ? 'bg-green-900/20 border-green-700/50 text-green-400' 
                    : 'bg-green-50 border-green-200 text-green-700'
                  : isDark 
                    ? 'bg-red-900/20 border-red-700/50 text-red-400' 
                    : 'bg-red-50 border-red-200 text-red-700'
              }`}
            >
              <div className="flex items-center">
                {success ? (
                  <CheckCircle className="h-5 w-5 mr-3" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-3" />
                )}
                <span className="text-sm font-medium">{success || error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl border shadow-xl p-8`}
        >
          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              className={`w-full flex items-center justify-center py-3 px-4 border rounded-xl text-sm font-medium transition-all duration-200 ${
                isDark 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700 focus:ring-gray-500/20' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500/20'
              } focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Chrome className="h-5 w-5 mr-3" />
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              disabled={loading}
              className={`w-full flex items-center justify-center py-3 px-4 border rounded-xl text-sm font-medium transition-all duration-200 ${
                isDark 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700 focus:ring-gray-500/20' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500/20'
              } focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Github className="h-5 w-5 mr-3" />
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className={`absolute inset-0 flex items-center ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              <div className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20'
                    } focus:outline-none focus:ring-4`}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm transition-all duration-200 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20'
                  } focus:outline-none focus:ring-4`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl text-sm transition-all duration-200 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20'
                  } focus:outline-none focus:ring-4`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                  ) : (
                    <Eye className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Confirm password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl text-sm transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20'
                    } focus:outline-none focus:ring-4`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                    ) : (
                      <Eye className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <span className={`ml-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-emerald-600 hover:text-emerald-500 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <div className="flex items-center">
                  <span>{isLogin ? 'Sign in' : 'Create account'}</span>
                  <ArrowRight className="ml-2 h-3 w-3" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={switchMode}
              className="text-xs text-emerald-600 hover:text-emerald-500 font-medium transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </motion.div>

        {/* Back to home link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-4"
        >
          <Link
            href="/"
            className={`text-xs ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'} transition-colors flex items-center justify-center space-x-1`}
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Back to homepage</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;