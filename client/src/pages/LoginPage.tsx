import React, { useState } from 'react';
import { Link } from 'wouter';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const { isDark } = useTheme();
  const { login, register } = useAuth();
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (!success) {
          setError('Invalid email or password');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        const success = await register(formData.name, formData.email, formData.password);
        if (!success) {
          setError('Registration failed. Please try again.');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
              isDark ? 'bg-gray-900 border-emerald-400' : 'bg-gray-50 border-emerald-600'
            } border border-l-2 border-b-2 rounded-bl-lg flex items-center justify-start pl-2 font-mono text-sm shadow-lg`}>
              <span className={`select-none ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>$</span>
            </div>
            <div className="text-left">
              <h1 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
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

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`${
            isDark ? 'bg-gray-800/80 border-gray-700/50 backdrop-blur-lg' : 'bg-white/80 border-gray-200/50 backdrop-blur-lg'
          } rounded-3xl shadow-2xl border p-8`}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className={`block text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } mb-2`}>
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      isDark 
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-2`}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    isDark 
                      ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-2`}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-10 py-3 border ${
                    isDark 
                      ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
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
                <label htmlFor="confirmPassword" className={`block text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } mb-2`}>
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      isDark 
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-semibold rounded-2xl text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Role Application Notice */}
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`mt-6 p-4 rounded-xl border ${
                isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Shield className={`h-5 w-5 mt-0.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <div>
                  <h4 className={`font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>
                    Creator Application
                  </h4>
                  <p className={`text-sm mt-1 ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    After registration, you can apply to become a creator to publish tutorials and content.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Toggle */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
              }}
              className={`text-sm ${
                isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500'
              } transition-colors`}
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>

          {isLogin && (
            <div className="text-center">
              <Link 
                href="/forgot-password"
                className={`text-sm ${
                  isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-500'
                } transition-colors`}
              >
                Forgot your password?
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;