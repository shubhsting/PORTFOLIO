'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type TimelineItem = {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  startDate: string;
  endDate: string | null;
  location: string;
  description: string[];
  icon: string;
  color: string;
};

export default function InteractiveTimeline() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'work' | 'education'>('all');

  const timelineData: TimelineItem[] = [
    {
      id: '1',
      type: 'work',
      title: 'Software Engineer',
      organization: 'The Algorithm',
      startDate: '2025-01',
      endDate: null,
      location: 'New Delhi, India',
      description: [
        'Pioneered scalable backend architectures',
        'Decreased error rate by 15%',
        'Reduced release time by 50% with CI/CD'
      ],
      icon: '💼',
      color: '#10b981'
    },
    {
      id: '2',
      type: 'education',
      title: 'B.Tech Computer Science',
      organization: 'MAHARSHI DAYANAND UNIVERSITY',
      startDate: '2020-08',
      endDate: '2024-08',
      location: 'New Delhi, India',
      description: [
        'CGPA: 8.1/10',
        'Major: Computer Science',
        'Focus: Algorithms, Data Structures, Web Development'
      ],
      icon: '🎓',
      color: '#8b5cf6'
    },
    {
      id: '3',
      type: 'work',
      title: 'Software Developer Engineer (Intern)',
      organization: 'MathonGo',
      startDate: '2024-06',
      endDate: '2024-12',
      location: 'Bangalore, India',
      description: [
        'Reduced query times by 40%',
        'Boosted retrieval speed by 30%',
        'Improved system resilience by 50%'
      ],
      icon: '💻',
      color: '#06b6d4'
    },
    {
      id: '4',
      type: 'work',
      title: 'Software Developer Engineer (Intern)',
      organization: 'ARENESS',
      startDate: '2023-11',
      endDate: '2024-02',
      location: 'Gurugram, Haryana',
      description: [
        'Increased email engagement by 40%',
        'Reduced manual effort by 80%',
        'Achieved 50% lower costs'
      ],
      icon: '⚡',
      color: '#f59e0b'
    },
    {
      id: '5',
      type: 'work',
      title: 'Frontend Developer',
      organization: 'Freelance Projects',
      startDate: '2023-01',
      endDate: '2023-10',
      location: 'Remote',
      description: [
        'Built responsive web applications',
        'Implemented modern UI/UX',
        'Delivered 10+ client projects'
      ],
      icon: '🎨',
      color: '#ec4899'
    },
  ];

  const filteredData = filter === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.type === filter);

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { value: 'all', label: 'All', icon: '📅' },
          { value: 'work', label: 'Experience', icon: '💼' },
          { value: 'education', label: 'Education', icon: '🎓' },
        ].map((tab) => (
          <motion.button
            key={tab.value}
            onClick={() => setFilter(tab.value as any)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
              filter === tab.value
                ? 'bg-cyan-500/20 text-cyan-400 border-2 border-cyan-500'
                : 'bg-gray-800/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500"></div>

        {/* Timeline Items */}
        <div className="space-y-8">
          {filteredData.map((item, index) => {
            const isSelected = selectedItem === item.id;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-20"
              >
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-6 top-4 w-5 h-5 rounded-full border-4 border-[#1e1e1e] cursor-pointer"
                  style={{ backgroundColor: item.color }}
                  whileHover={{ scale: 1.3 }}
                  animate={{
                    scale: isSelected ? 1.3 : 1,
                    boxShadow: isSelected 
                      ? `0 0 20px ${item.color}`
                      : `0 0 0px ${item.color}`
                  }}
                  onClick={() => setSelectedItem(isSelected ? null : item.id)}
                >
                  {/* Pulsing effect for current */}
                  {!item.endDate && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: item.color }}
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  )}
                </motion.div>

                {/* Content Card */}
                <motion.div
                  onClick={() => setSelectedItem(isSelected ? null : item.id)}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className={`bg-gray-900/50 border rounded-lg p-4 sm:p-6 cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-cyan-500 shadow-xl shadow-cyan-500/20' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  style={{
                    borderColor: isSelected ? item.color : undefined
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-3xl">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-base sm:text-lg truncate">
                          {item.title}
                        </h3>
                        <p className="text-cyan-400 text-sm truncate">{item.organization}</p>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    {!item.endDate ? (
                      <motion.span
                        className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30 flex items-center gap-1 flex-shrink-0"
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                        Current
                      </motion.span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full flex-shrink-0">
                        {item.endDate}
                      </span>
                    )}
                  </div>

                  {/* Date & Location */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {item.startDate} - {item.endDate || 'Present'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {item.location}
                    </span>
                  </div>

                  {/* Description - Expandable */}
                  <AnimatePresence>
                    {(isSelected || index === 0) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-2 overflow-hidden"
                      >
                        {item.description.map((desc, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2 text-gray-400 text-sm"
                          >
                            <span className="text-green-400 mt-1">✓</span>
                            <span>{desc}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Click to expand hint */}
                  {!isSelected && index !== 0 && (
                    <div className="text-xs text-gray-600 mt-3">
                      Click to expand details...
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

