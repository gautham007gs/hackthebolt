import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Chrome, Github, ArrowLeft, Shield, CheckCircle, Home, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const CompactLoginPage = () => {
  const { isDark } = useTheme();
  const { login, register, socialLogin, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    <div className={`min-h-screen flex flex-col ${
      isDark 
        ? 'bg-black' 
        : 'bg-gray-100'
    }`}>
      {/* Terminal-style header with home button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`border-b p-4 ${
          isDark 
            ? 'bg-gray-900 border-gray-700' 
            : 'bg-white border-gray-300'
        }`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <Terminal className={`h-5 w-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span className={`font-mono text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              hacktheshell:~$ {isLogin ? 'login' : 'register'}
            </span>
          </div>
          
          <Link
            href="/"
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isDark 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            } shadow-sm hover:shadow-md`}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </div>
      </motion.div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-lg border ${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-300'
            } shadow-xl`}
          >
            {/* Terminal window controls */}
            <div className={`flex items-center justify-between px-4 py-3 border-b ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {isLogin ? 'login.sh' : 'register.sh'}
              </div>
              <div className="w-16"></div>
            </div>
            
            {/* Terminal content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className={`inline-flex items-center space-x-2 mb-4 ${
                  isDark ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  <Terminal className="h-6 w-6" />
                  <span className="font-mono text-lg font-bold">HackTheShell</span>
                </div>
                <h1 className={`text-xl font-mono mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {isLogin ? '> Authenticate user' : '> Create new user'}
                </h1>
                <p className={`text-sm font-mono ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {isLogin ? 'Enter credentials to access system' : 'Initialize new user account'}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`mb-6 p-3 border rounded-md text-sm font-mono ${
                    isDark 
                      ? 'bg-red-900/20 border-red-800 text-red-400' 
                      : 'bg-red-50 border-red-200 text-red-600'
                  }`}
                >
                  ERROR: {error}
                </motion.div>
              )}

              {/* Social Login */}
              <div className="mb-6 space-y-3">
                <button
                  onClick={() => handleSocialLogin('github')}
                  disabled={loading}
                  className={`w-full flex items-center justify-center py-3 px-4 border rounded-md font-mono text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDark 
                      ? 'border-gray-600 bg-gray-700 text-white hover:bg-gray-600' 
                      : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Github className="w-5 h-5 mr-3" />
                  $ auth --provider=github
                </button>
                
                <button
                  onClick={() => handleSocialLogin('google')}
                  disabled={loading}
                  className={`w-full flex items-center justify-center py-3 px-4 border rounded-md font-mono text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDark 
                      ? 'border-gray-600 bg-gray-700 text-white hover:bg-gray-600' 
                      : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Chrome className="w-5 h-5 mr-3" />
                  $ auth --provider=google
                </button>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`} />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className={`px-4 font-mono ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                      -- OR --
                    </span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className={`block text-xs font-mono mb-2 ${
                      isDark ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      $ username --full-name
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 border rounded-md font-mono text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className={`block text-xs font-mono mb-2 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    $ email --address
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="user@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 border rounded-md font-mono text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className={`block text-xs font-mono mb-2 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    $ password --secure
                  </label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full pl-10 pr-12 py-3 border rounded-md font-mono text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                      } transition-colors`}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className={`block text-xs font-mono mb-2 ${
                      isDark ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      $ password --confirm
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className={`w-full pl-10 pr-12 py-3 border rounded-md font-mono text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                          isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                        } transition-colors`}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center py-3 px-4 bg-emerald-600 hover:bg-emerald-700 focus:bg-emerald-700 text-white rounded-md font-mono text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <span>$ {isLogin ? 'authenticate' : 'create-user'} --execute</span>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <span className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {isLogin ? "# No account found? " : "# Already registered? "}
                </span>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs font-mono text-emerald-600 hover:text-emerald-500 transition-colors"
                >
                  {isLogin ? 'create-account' : 'login'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Back to home link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-6"
          >
            <Link
              href="/"
              className={`inline-flex items-center space-x-2 text-sm font-mono transition-colors group ${
                isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>$ cd ~/hacktheshell</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CompactLoginPage;