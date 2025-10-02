'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          setSubmitted(false);
        }, 3000);
      } else {
        alert(`Error: ${result.error || 'Failed to send message'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try emailing directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-500/10 border border-green-500/30 rounded-lg p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-6xl mb-4"
        >
          ✅
        </motion.div>
        <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
        <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon!</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-4 text-sm text-gray-500">contact-form.tsx</span>
      </div>

      <div className="space-y-4 font-mono text-sm">
        {/* Name Field */}
        <div>
          <label className="block text-cyan-400 mb-2">
            <span className="text-purple-400">const</span> <span className="text-yellow-400">name</span> = 
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-[#2d2d30] text-gray-300 border border-gray-600 rounded px-4 py-2 focus:border-cyan-500 focus:outline-none"
            placeholder='"Your Name"'
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-cyan-400 mb-2">
            <span className="text-purple-400">const</span> <span className="text-yellow-400">email</span> = 
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-[#2d2d30] text-gray-300 border border-gray-600 rounded px-4 py-2 focus:border-cyan-500 focus:outline-none"
            placeholder='"your.email@example.com"'
          />
        </div>

        {/* Subject Field */}
        <div>
          <label className="block text-cyan-400 mb-2">
            <span className="text-purple-400">const</span> <span className="text-yellow-400">subject</span> = 
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full bg-[#2d2d30] text-gray-300 border border-gray-600 rounded px-4 py-2 focus:border-cyan-500 focus:outline-none"
            placeholder="Job Opportunity or Let's Connect"
          />
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-cyan-400 mb-2">
            <span className="text-purple-400">const</span> <span className="text-yellow-400">message</span> = 
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full bg-[#2d2d30] text-gray-300 border border-gray-600 rounded px-4 py-2 focus:border-cyan-500 focus:outline-none resize-none"
            placeholder='"Hi Shubham, I would like to..."'
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              Sending...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Message
            </>
          )}
        </motion.button>

        <div className="text-xs text-gray-500 text-center">
          <span className="text-cyan-400">// </span>
          Messages are sent directly to shubhamsingh1840@gmail.com
        </div>
      </div>
    </motion.form>
  );
}

