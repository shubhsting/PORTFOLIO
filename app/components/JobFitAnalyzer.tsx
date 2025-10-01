'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FitResult = {
  overallMatch: number;
  matchingSkills: string[];
  missingSkills: string[];
  relevantExperience: string[];
  recommendation: string;
  strengths: string[];
  suggestions: string[];
};

export default function JobFitAnalyzer() {
  const [isOpen, setIsOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<FitResult | null>(null);
  
  // Listen for custom event from terminal
  useEffect(() => {
    const handleOpenAnalyzer = () => setIsOpen(true);
    window.addEventListener('openJobAnalyzer', handleOpenAnalyzer);
    return () => window.removeEventListener('openJobAnalyzer', handleOpenAnalyzer);
  }, []);

  // Portfolio data
  const portfolioData = {
    skills: [
      'Java', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express.js',
      'MongoDB', 'PostgreSQL', 'Redis', 'AWS', 'EC2', 'S3', 'SES', 'SNS', 'SQS',
      'Next.js', 'Tailwind CSS', 'Framer Motion', 'REST APIs', 'Microservices',
      'Git', 'CI/CD', 'Docker', 'Algorithms', 'Data Structures'
    ],
    experience: [
      {
        title: 'Software Engineer',
        company: 'The Algorithm',
        duration: '6+ months',
        achievements: [
          'Pioneered scalable backend architectures',
          'Decreased error rate by 15%',
          'Reduced release time by 50% with CI/CD'
        ]
      },
      {
        title: 'Software Developer Engineer (Intern)',
        company: 'MathonGo',
        duration: '7 months',
        achievements: [
          'Reduced query times by 40%',
          'Boosted retrieval speed by 30%',
          'Improved system resilience by 50%'
        ]
      },
      {
        title: 'Software Developer Engineer (Intern)',
        company: 'ARENESS',
        duration: '4 months',
        achievements: [
          'Increased email engagement by 40%',
          'Reduced manual effort by 80%',
          'Achieved 50% lower costs'
        ]
      }
    ],
    education: {
      degree: 'B.Tech Computer Science',
      cgpa: 8.1,
      university: 'MAHARSHI DAYANAND UNIVERSITY'
    },
    projects: [
      {
        name: 'Trip-Tide',
        tech: ['MongoDB', 'Express', 'React', 'Node.js'],
        description: 'Full-stack ride-sharing application'
      },
      {
        name: 'SUDOKU-SOLVER',
        tech: ['Java', 'Algorithms', 'DSA'],
        description: 'Java-based puzzle solver'
      }
    ]
  };

  const analyzeJobFit = async () => {
    setIsAnalyzing(true);
    
    try {
      // Call AI API
      const response = await fetch('/api/analyze-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription,
          candidateData: portfolioData
        }),
      });

      const analysis = await response.json();
      
      // Check if there's an error in the response
      if (analysis.error) {
        console.error('API Error:', analysis.error);
        throw new Error(analysis.error);
      }

      setResult(analysis);
    } catch (error) {
      console.error('Error analyzing job fit:', error);
      
      // Show error message but continue with fallback
      console.log('Using fallback analysis due to error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      {/* Floating Button - Left Side */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-8 z-[998] group"
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-purple-500/50 transition-all border-2 border-purple-500/30 hover:border-purple-500">
            <span className="text-2xl">🤖</span>
          </div>
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 flex items-center justify-center"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
        <div className="absolute bottom-full mb-3 left-0 px-3 py-1.5 bg-[#1e1e1e] border border-purple-500/50 rounded-lg text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          AI Job Fit Analyzer
          <span className="text-purple-400 ml-2 font-bold">🤖</span>
        </div>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000]"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-3xl sm:max-h-[90vh] bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-2xl z-[1001] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <span>🤖</span>
                    AI Job Fit Analyzer
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Paste a job description to see if Divyanshu is a good fit
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {!result ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Job Description
                      </label>
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the full job description here...&#10;&#10;Example:&#10;- Required: React, Node.js, TypeScript&#10;- 2+ years experience&#10;- Bachelor's degree in CS"
                        className="w-full h-64 bg-[#2d2d30] text-gray-300 border border-gray-600 rounded-lg p-4 focus:border-cyan-500 focus:outline-none resize-none font-mono text-sm"
                      />
                    </div>
                    
                    <button
                      onClick={analyzeJobFit}
                      disabled={!jobDescription.trim() || isAnalyzing}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Analyzing with AI...
                        </>
                      ) : (
                        <>
                          <span>🤖</span>
                          Analyze with AI
                        </>
                      )}
                    </button>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-xs text-blue-400">
                      <div className="font-semibold mb-1">💡 Pro Tip:</div>
                      <div className="text-gray-400">
                        Paste the complete job description including requirements, responsibilities, and qualifications for best results.
                      </div>
                    </div>
                    
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="text-purple-400">🔒</span>
                        <div className="text-gray-400">
                          <strong className="text-purple-400">Privacy:</strong> Job descriptions are analyzed securely and not stored.
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Overall Match */}
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6 text-center">
                      <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {result.overallMatch}%
                      </div>
                      <div className="text-gray-300 mt-2">Overall Match Score</div>
                      <div className="text-sm text-gray-400 mt-3">{result.recommendation}</div>
                    </div>

                    {/* Matching Skills */}
                    <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                        <span>✅</span>
                        Matching Skills ({result.matchingSkills.length})
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.matchingSkills.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                        <span>💪</span>
                        Key Strengths
                      </h3>
                      <ul className="space-y-2">
                        {result.strengths.map((strength, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">▸</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Missing Skills (if any) */}
                    {result.missingSkills.length > 0 && (
                      <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                          <span>📚</span>
                          Growth Areas
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {result.missingSkills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm border border-yellow-500/30">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                        <span>💡</span>
                        Recommendations
                      </h3>
                      <ul className="space-y-2">
                        {result.suggestions.map((suggestion, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-purple-400 mt-1">▸</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setResult(null);
                          setJobDescription('');
                        }}
                        className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Try Another
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="flex-1 bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600 transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

