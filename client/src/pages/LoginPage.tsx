import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Lock, Mail, Github, Chrome, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation } from 'wouter';

const LoginPage = () => {
  const { isDark } = useTheme();
  const { login, register } = useAuth();
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Simulate login
        const success = await login(formData.email, formData.password);
        if (success) {
          setLocation('/dashboard');
        } else {
          setError('Login failed. Please check your credentials.');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        // Use register function for new users
        const { register } = useAuth();
        const success = await register(formData.name, formData.email, formData.password);
        if (success) {
          setLocation('/dashboard');
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'user' | 'creator' | 'admin') => {
    const success = await login(`demo-${role}@hacktheshell.com`, 'demo');
    if (success) {
      setLocation(role === 'admin' ? '/admin' : role === 'creator' ? '/creator' : '/dashboard');
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} flex items-center justify-center px-4 py-20 relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${isDark ? 'bg-emerald-500/5' : 'bg-emerald-500/10'} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${isDark ? 'bg-purple-500/5' : 'bg-purple-500/10'} rounded-full blur-3xl`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${isDark ? 'bg-cyan-500/3' : 'bg-cyan-500/5'} rounded-full blur-3xl`}></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-8">
              <div className="relative">
                <Shield className={`h-12 w-12 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <div className={`absolute inset-0 ${isDark ? 'bg-emerald-400/20' : 'bg-emerald-600/20'} blur-xl rounded-full`}></div>
              </div>
              <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Hack<span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">The</span>Shell
              </span>
            </div>

            <h1 className={`text-4xl lg:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Join the Elite
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Cyber Force
              </span>
            </h1>

            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-lg`}>
              Access exclusive cybersecurity content, advanced tutorials, and join a community of elite security professionals.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm rounded-xl p-4 border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                <Zap className={`h-8 w-8 ${isDark ? 'text-yellow-400' : 'text-yellow-500'} mb-2`} />
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Expert Content</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Premium tutorials</p>
              </div>
              <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm rounded-xl p-4 border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                <Shield className={`h-8 w-8 ${isDark ? 'text-emerald-400' : 'text-emerald-500'} mb-2`} />
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Secure Learning</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Safe environment</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/80'} backdrop-blur-xl rounded-3xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} p-8 shadow-2xl`}>
              {/* Toggle Tabs */}
              <div className={`flex rounded-2xl p-1 mb-8 ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-4 text-center font-semibold rounded-xl transition-all duration-300 ${
                    isLogin
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                      : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 px-4 text-center font-semibold rounded-xl transition-all duration-300 ${
                    !isLogin
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                      : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200`}
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className={`w-full pl-10 pr-12 py-3 rounded-xl border ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200`}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200`}
                      placeholder="Confirm your password"
                      required={!isLogin}
                    />
                  </div>
                )}

                {error && (
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-600'} text-sm`}>
                    {error}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/25"
                >
                  {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                </motion.button>
              </form>

              {/* Demo Login Options */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center mb-4`}>
                  Quick Demo Access
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleDemoLogin('user')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg transition-all duration-200 ${isDark ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                  >
                    User
                  </button>
                  <button
                    onClick={() => handleDemoLogin('creator')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg transition-all duration-200 ${isDark ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'}`}
                  >
                    Creator
                  </button>
                  <button
                    onClick={() => handleDemoLogin('admin')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg transition-all duration-200 ${isDark ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/"
                  className={`text-sm ${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'} transition-colors duration-200`}
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;