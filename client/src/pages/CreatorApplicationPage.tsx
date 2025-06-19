import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Award, FileText, User, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const CreatorApplicationPage = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    experience: '',
    expertise: '',
    sampleWork: '',
    motivation: '',
    socialLinks: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <Award className={`h-16 w-16 mx-auto mb-4 ${
            isDark ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <h1 className={`text-2xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Please Sign In
          </h1>
          <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            You need to be logged in to apply for creator status.
          </p>
          <Link href="/login" className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
          <h1 className={`text-2xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Application Submitted!
          </h1>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Thank you for applying to become a creator. We'll review your application and get back to you within 5-7 business days.
          </p>
          <Link href="/dashboard" className="btn-primary">
            Back to Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href="/dashboard"
            className={`inline-flex items-center space-x-2 text-sm ${
              isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-500'
            } transition-colors mb-4`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          
          <div className="text-center">
            <Award className={`h-12 w-12 mx-auto mb-4 ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`} />
            <h1 className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Apply for Creator Status
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Share your expertise and help others learn cybersecurity
            </p>
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-2xl shadow-xl border p-8`}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Experience Section */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 flex items-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <User className="h-5 w-5 mr-2" />
                Professional Experience
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Years of Experience in Cybersecurity
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'border-gray-600 bg-gray-700 text-white' 
                        : 'border-gray-300 bg-white text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  >
                    <option value="">Select experience level</option>
                    <option value="1-2">1-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Areas of Expertise (select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Web Application Security',
                      'Network Security',
                      'Malware Analysis',
                      'Penetration Testing',
                      'Digital Forensics',
                      'Cloud Security',
                      'Mobile Security',
                      'Cryptography'
                    ].map((area) => (
                      <label key={area} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2 text-emerald-500 focus:ring-emerald-500"
                        />
                        <span className={`text-sm ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {area}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 flex items-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <FileText className="h-5 w-5 mr-2" />
                Content Creation
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Sample Work or Portfolio (URLs or descriptions)
                  </label>
                  <textarea
                    name="sampleWork"
                    value={formData.sampleWork}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Share links to your blog posts, GitHub projects, research papers, or describe your previous work..."
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Why do you want to become a creator?
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    placeholder="Tell us about your passion for cybersecurity education and what you hope to contribute..."
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Social Links (optional)
                  </label>
                  <input
                    type="text"
                    name="socialLinks"
                    value={formData.socialLinks}
                    onChange={handleInputChange}
                    placeholder="LinkedIn, Twitter, personal website..."
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link href="/dashboard" className="btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mt-8 p-6 rounded-xl border ${
            isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'
          }`}
        >
          <h4 className={`font-semibold mb-2 ${
            isDark ? 'text-emerald-400' : 'text-emerald-800'
          }`}>
            What happens next?
          </h4>
          <ul className={`space-y-2 text-sm ${
            isDark ? 'text-emerald-300' : 'text-emerald-700'
          }`}>
            <li>• Our team will review your application within 5-7 business days</li>
            <li>• We may reach out for additional information or a brief interview</li>
            <li>• Once approved, you'll get access to the creator dashboard</li>
            <li>• You can start publishing tutorials and earning recognition</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatorApplicationPage;