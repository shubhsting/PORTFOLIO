'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type VisitorData = {
  total: number;
  countries: { name: string; count: number; code: string }[];
  recentVisits: { country: string; time: string }[];
};

export default function VisitorMap() {
  const [isOpen, setIsOpen] = useState(false);
  const [visitorData, setVisitorData] = useState<VisitorData>({
    total: 0,
    countries: [],
    recentVisits: []
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load from localStorage
    const visits = parseInt(localStorage.getItem('portfolioVisits') || '0');
    
    // Calculate country distribution (ensures they add up to total)
    const indiaCount = Math.floor(visits * 0.4);
    const usCount = Math.floor(visits * 0.25);
    const ukCount = Math.floor(visits * 0.15);
    const canadaCount = Math.floor(visits * 0.1);
    // Others gets the remainder to ensure exact total
    const othersCount = visits - (indiaCount + usCount + ukCount + canadaCount);
    
    setVisitorData({
      total: visits,
      countries: [
        { name: 'India', count: indiaCount, code: 'IN' },
        { name: 'United States', count: usCount, code: 'US' },
        { name: 'United Kingdom', count: ukCount, code: 'GB' },
        { name: 'Canada', count: canadaCount, code: 'CA' },
        { name: 'Others', count: othersCount, code: 'OT' },
      ],
      recentVisits: [
        { country: 'India', time: 'Just now' },
        { country: 'United States', time: '2 hours ago' },
        { country: 'United Kingdom', time: '5 hours ago' },
      ]
    });
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-1/2 right-0 -translate-y-1/2 z-[997] group"
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="bg-gradient-to-l from-blue-500 to-cyan-500 px-3 py-4 rounded-l-lg shadow-xl hover:shadow-blue-500/50 transition-all border-l-2 border-blue-400">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl">🌍</span>
            <div className="text-white font-bold text-xs">{visitorData.total}</div>
            <div className="text-blue-100 text-[10px] writing-mode-vertical transform rotate-180">Visitors</div>
          </div>
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1004]"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 100 }}
              className="fixed right-4 top-1/2 -translate-y-1/2 w-full max-w-lg bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-2xl z-[1005] max-h-[80vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      <span>🌍</span>
                      Visitor Analytics
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                      Total visits: <span className="text-cyan-400 font-bold">{visitorData.total}</span>
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
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* World Map Visualization */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 overflow-hidden">
                  <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                    <span>🗺️</span>
                    Geographic Distribution
                  </h3>
                  
                  {/* Simple World Map */}
                  <div className="relative h-48 bg-gradient-to-b from-blue-900/20 to-green-900/20 rounded-lg overflow-hidden">
                    {/* Animated globe grid */}
                    <svg className="w-full h-full opacity-30" viewBox="0 0 200 100">
                      {/* Latitude lines */}
                      {[20, 40, 60, 80].map((y) => (
                        <line key={`lat-${y}`} x1="0" y1={y} x2="200" y2={y} stroke="currentColor" strokeWidth="0.5" className="text-cyan-500" />
                      ))}
                      {/* Longitude lines */}
                      {[40, 80, 120, 160].map((x) => (
                        <line key={`lon-${x}`} x1={x} y1="0" x2={x} y2="100" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500" />
                      ))}
                      {/* Equator */}
                      <line x1="0" y1="50" x2="200" y2="50" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
                    </svg>
                    
                    {/* Visitor pins */}
                    <motion.div
                      className="absolute top-1/3 left-1/3 w-3 h-3 bg-red-500 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      title="India"
                    />
                    <motion.div
                      className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-500 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                      title="United States"
                    />
                    <motion.div
                      className="absolute top-1/5 left-2/5 w-2 h-2 bg-blue-500 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      title="Europe"
                    />
                  </div>
                </div>

                {/* Countries List */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <span>📊</span>
                    Top Countries
                  </h3>
                  <div className="space-y-2">
                    {visitorData.countries.map((country, i) => (
                      <motion.div
                        key={country.code}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-lg">{['🇮🇳', '🇺🇸', '🇬🇧', '🇨🇦', '🌏'][i]}</span>
                          <span className="text-gray-300 text-sm">{country.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(country.count / visitorData.total) * 100}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                            />
                          </div>
                          <span className="text-cyan-400 font-mono text-sm w-8 text-right">
                            {country.count}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Recent Visits */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <span>🕐</span>
                    Recent Visits
                  </h3>
                  <div className="space-y-2">
                    {visitorData.recentVisits.map((visit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-400">{visit.country}</span>
                        <span className="text-gray-600">{visit.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">{visitorData.countries.length}</div>
                    <div className="text-xs text-gray-400 mt-1">Countries</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {Math.round((visitorData.total / 30) * 10) / 10}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Avg/Day</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

