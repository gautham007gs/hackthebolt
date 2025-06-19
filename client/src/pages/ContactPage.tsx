import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Shield, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        category: 'general'
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get in touch with our team',
      value: 'contact@hacktheshell.com',
      color: 'text-blue-500'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: '24/7 community support',
      value: 'Start Chat',
      color: 'text-green-500'
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Join our Discord server',
      value: 'Join Now',
      color: 'text-purple-500'
    },
    {
      icon: Shield,
      title: 'Security Issues',
      description: 'Report vulnerabilities',
      value: 'security@hacktheshell.com',
      color: 'text-red-500'
    }
  ];

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '123 Cyber Street, Tech Valley',
      timezone: 'PST (UTC-8)',
      hours: '9:00 AM - 6:00 PM'
    },
    {
      city: 'London',
      address: '456 Security Lane, Canary Wharf',
      timezone: 'GMT (UTC+0)',
      hours: '9:00 AM - 5:30 PM'
    },
    {
      city: 'Singapore',
      address: '789 Innovation Hub, Marina Bay',
      timezone: 'SGT (UTC+8)',
      hours: '9:00 AM - 6:00 PM'
    }
  ];

  const faqs = [
    {
      question: 'How do I get started with cybersecurity?',
      answer: 'Begin with our beginner-friendly tutorials on network security basics and work your way up to advanced penetration testing techniques.'
    },
    {
      question: 'Are the tutorials suitable for beginners?',
      answer: 'Yes! We have content for all skill levels, from complete beginners to advanced security professionals. Each tutorial is clearly marked with difficulty levels.'
    },
    {
      question: 'Do you offer corporate training?',
      answer: 'Absolutely! We provide customized cybersecurity training programs for organizations of all sizes. Contact our enterprise team for more details.'
    },
    {
      question: 'How can I contribute to the platform?',
      answer: 'We welcome contributions from the community! You can submit tutorials, report bugs, or help improve our content through our GitHub repository.'
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pt-16`}>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-blue-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900 dark:text-white">
              Get in 
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Touch</span>
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed`}>
              Have questions about cybersecurity? Need help with our platform? Want to collaborate? 
              We're here to help you on your security journey.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 border ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              } shadow-lg`}
            >
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Send us a Message
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Message Sent Successfully!
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl border ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                        } focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200`}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl border ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                        } focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                        } focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200`}
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-emerald-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-emerald-500'
                        } focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200`}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="enterprise">Enterprise Training</option>
                        <option value="security">Security Issue</option>
                        <option value="media">Media Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                      } focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200`}
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                      } focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200 resize-none`}
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 border ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              } shadow-lg`}
            >
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Contact Methods
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={method.title} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <method.icon className={`h-5 w-5 ${method.color}`} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {method.title}
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                        {method.description}
                      </p>
                      <p className={`text-sm font-medium ${method.color}`}>
                        {method.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 border ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              } shadow-lg`}
            >
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Global Offices
              </h3>
              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <div key={office.city} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-emerald-500" />
                      <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {office.city}
                      </h4>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} ml-6`}>
                      {office.address}
                    </p>
                    <div className="ml-6 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-3 w-3 text-cyan-500" />
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {office.timezone}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3 text-blue-500" />
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {office.hours}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 border ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              } shadow-lg`}
            >
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quick Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className={`cursor-pointer font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} hover:text-emerald-500 transition-colors`}>
                      {faq.question}
                    </summary>
                    <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;