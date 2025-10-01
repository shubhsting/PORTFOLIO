'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

type TimelineItem = {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  organizationUrl: string;
  logo: string;
  startDate: string;
  endDate: string | null;
  period: string;
  location: string;
  workflow: string;
  status: string;
  achievements: string[];
};

export default function InteractiveTimeline() {
  const [filter, setFilter] = useState<'all' | 'work' | 'education'>('all');
  const [isHovering, setIsHovering] = useState(false);
  const [cursorIcon, setCursorIcon] = useState('');

  const calculateDuration = (startDate: string, endDate: string | null): string => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    
    if (years > 0) {
      if (months > 0) {
        return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
      }
      return `${years} year${years > 1 ? 's' : ''}`;
    }
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  const timelineData: TimelineItem[] = [
    {
      id: '1',
      type: 'work',
      title: 'Software Engineer',
      organization: 'The Algorithm',
      organizationUrl: 'https://www.linkedin.com/company/the-algorithm/',
      logo: '/the_algorithm_logo.jpeg',
      startDate: '2025-01-01',
      endDate: null,
      period: 'Jan 2025 - Present',
      location: 'New Delhi, India',
      workflow: 'build-and-deploy.yml',
      status: 'success',
      achievements: [
        'Pioneered scalable backend architectures for Quantafi, ProAssurance, and SSEC',
        'Decreased error rate by 15% with resilient data models',
        'Reduced release time by 50% with CI/CD automation',
      ],
    },
    {
      id: '2',
      type: 'education',
      title: 'B.Tech Computer Science',
      organization: 'MAHARSHI DAYANAND UNIVERSITY',
      organizationUrl: '#',
      logo: '/profile.jpg',
      startDate: '2020-08-01',
      endDate: '2024-08-01',
      period: 'Aug 2020 - Aug 2024',
      location: 'New Delhi, India',
      workflow: 'education-journey.yml',
      status: 'success',
      achievements: [
        'CGPA: 8.1/10',
        'Major: Computer Science',
        'Focus: Algorithms, Data Structures, Web Development'
      ],
    },
    {
      id: '3',
      type: 'work',
      title: 'Software Developer Engineer (Intern)',
      organization: 'MathonGo',
      organizationUrl: 'https://www.linkedin.com/company/mathongo/',
      logo: '/mathongo_logo.jpeg',
      startDate: '2024-06-01',
      endDate: '2024-12-31',
      period: 'June 2024 - Dec 2024',
      location: 'Bangalore, India',
      workflow: 'optimize-and-scale.yml',
      status: 'success',
      achievements: [
        'Reduced query times by 40% for millions of users',
        'Boosted retrieval speed by 30%, achieved 98% test coverage',
        'Improved system resilience by 50% with AWS monitoring',
      ],
    },
    {
      id: '4',
      type: 'work',
      title: 'Software Developer Engineer (Intern)',
      organization: 'ARENESS',
      organizationUrl: 'https://www.linkedin.com/company/areness/mycompany/',
      logo: '/areness_logo.jpeg',
      startDate: '2023-11-01',
      endDate: '2024-02-01',
      period: 'Nov 2023 - Feb 2024',
      location: 'Gurugram, Haryana',
      workflow: 'automate-and-improve.yml',
      status: 'success',
      achievements: [
        'Increased email engagement by 40% with automation',
        'Reduced manual effort by 80%, saving 15 hours/week',
        'Achieved 50% lower costs, 30% performance boost',
      ],
    },
    {
      id: '5',
      type: 'work',
      title: 'Frontend Developer',
      organization: 'Freelance Projects',
      organizationUrl: 'https://github.com/divyanshu2003singh',
      logo: '/profile.jpg',
      startDate: '2023-01-01',
      endDate: '2023-10-01',
      period: 'Jan 2023 - Oct 2023',
      location: 'Remote',
      workflow: 'ui-ux-development.yml',
      status: 'success',
      achievements: [
        'Built responsive web applications using React and Next.js',
        'Implemented modern UI/UX with Tailwind CSS and Framer Motion',
        'Delivered 10+ client projects with 100% satisfaction rate',
      ],
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

      {/* Timeline Items with Experience Card Styling */}
      <div className="relative space-y-8 md:pl-20 pt-12 pb-12">
        {/* Vertical Timeline Line */}
        <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 hidden sm:block"></div>

        {/* Timeline Start Marker */}
        <div className="absolute left-3 -top-2 hidden sm:flex items-center gap-3">
          <motion.div 
            className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50"
            animate={{ 
              rotate: 360,
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-xl">🚀</span>
          </motion.div>
          <div className="text-cyan-400 font-bold text-sm">Present</div>
        </div>

        {/* Timeline End Marker */}
        <div className="absolute left-3 -bottom-2 hidden sm:flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/50">
            <span className="text-xl">🌱</span>
          </div>
          <div className="text-pink-400 font-bold text-sm">Journey Begins</div>
        </div>

        {filteredData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline Dot on the Line */}
            <motion.div
              className="absolute left-[12px] top-8 w-8 h-8 rounded-full border-4 z-20 hidden sm:flex items-center justify-center cursor-pointer"
              style={{ 
                backgroundColor: item.endDate === null ? '#fbbf24' : '#10b981',
                borderColor: '#1e1e1e'
              }}
              whileHover={{ scale: 1.3 }}
              animate={{
                boxShadow: item.endDate === null 
                  ? [
                      '0 0 0px rgba(251, 191, 36, 0.5)',
                      '0 0 20px rgba(251, 191, 36, 0.8)',
                      '0 0 0px rgba(251, 191, 36, 0.5)'
                    ]
                  : '0 0 10px rgba(16, 185, 129, 0.5)'
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              {/* Icon inside dot */}
              <span className="text-xs z-10">
                {item.type === 'work' ? '💼' : '🎓'}
              </span>
              
              {/* Pulsing effect for current item */}
              {item.endDate === null && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-yellow-400"
                  animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.6, 0, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
              )}
            </motion.div>

            {/* Year Label on Timeline */}
            <div className="absolute -left-[70px] top-6 text-xs font-bold text-cyan-400 hidden md:block w-16 text-right">
              {item.startDate.split('-')[0]}
            </div>

            {/* Connecting Line from Dot to Card */}
            <div className="absolute left-[44px] top-[50px] w-12 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent hidden sm:block z-10"></div>

            {/* Card with hover effect */}
            <motion.div
              whileHover={{ y: -5, scale: 1.01 }}
              className="relative group sm:ml-24"
            >
            {/* Holographic Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-cyan-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-100 blur transition-all duration-500 bg-[length:200%_200%] animate-[holographic_3s_ease_infinite]"></div>
            
            {/* Glassmorphism Card */}
            <div className="relative bg-gray-900/70 backdrop-blur-xl border border-gray-700/50 rounded-lg p-4 sm:p-6 font-mono shadow-2xl overflow-hidden">
              {/* Shine Effect on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>

              {/* Workflow Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Logo with Status Effects */}
                  <div className="relative flex-shrink-0 z-10">
                    {item.endDate === null ? (
                      // In Progress - Logo with Rotating Ring & Glow
                      <div className="relative">
                        {/* Floating Glow Effect */}
                        <motion.div 
                          className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-yellow-400/30 rounded-full blur-lg sm:blur-xl"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        
                        {/* Holographic Rotating Ring */}
                        <motion.div 
                          className="absolute -inset-0.5 sm:-inset-1 rounded-full"
                          style={{
                            background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #f97316, #fbbf24)',
                            backgroundSize: '200% 200%',
                          }}
                          animate={{ 
                            rotate: 360,
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                          }}
                          transition={{ 
                            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                            backgroundPosition: { duration: 2, repeat: Infinity }
                          }}
                        />
                        
                        {/* Logo Container with Glassmorphism */}
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-gray-600/50 bg-gray-800/80 backdrop-blur-sm p-0.5 shadow-2xl">
                          <Image 
                            src={item.logo} 
                            alt={`${item.organization} logo`}
                            width={56}
                            height={56}
                            unoptimized
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        
                        {/* Premium Pulsing Badge */}
                        <motion.div 
                          className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-gray-900 flex items-center justify-center shadow-lg"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              '0 0 10px rgba(251, 191, 36, 0.5)',
                              '0 0 20px rgba(251, 191, 36, 0.8)',
                              '0 0 10px rgba(251, 191, 36, 0.5)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <motion.div 
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-100 rounded-full"
                            animate={{ scale: [0.8, 1.2, 0.8] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </motion.div>
                        
                        {/* Sparkle Effects */}
                        <motion.div
                          className="absolute -top-1 -right-1 text-yellow-400 text-xs sm:text-sm"
                          animate={{ 
                            scale: [0, 1, 0],
                            rotate: [0, 180, 360]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        >
                          ✨
                        </motion.div>
                      </div>
                    ) : (
                      // Completed - Logo with Premium Success Badge
                      <div className="relative">
                        {/* Subtle Success Glow */}
                        <div className="absolute -inset-2 bg-green-400/20 rounded-full blur-lg"></div>
                        
                        {/* Logo Container with Glassmorphism */}
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-green-500/30 bg-gray-800/80 backdrop-blur-sm p-0.5 shadow-xl">
                          <Image 
                            src={item.logo} 
                            alt={`${item.organization} logo`}
                            width={56}
                            height={56}
                            unoptimized
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        
                        {/* Premium Success Badge */}
                        <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-gray-900 flex items-center justify-center shadow-lg shadow-green-500/50">
                          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <a 
                      href={item.organizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => { setIsHovering(true); setCursorIcon('🏢'); }}
                      onMouseLeave={() => { setIsHovering(false); setCursorIcon(''); }}
                      className="text-cyan-400 font-bold text-base sm:text-lg hover:underline truncate block"
                    >
                      {item.organization}
                    </a>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 text-xs text-gray-500">
                      {item.endDate === null ? (
                        <motion.span 
                          className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded border border-yellow-500/30 flex items-center gap-1 flex-shrink-0"
                          animate={{ opacity: [1, 0.6, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
                          Running
                        </motion.span>
                      ) : (
                        <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30 flex-shrink-0">✓ Success</span>
                      )}
                      <span className="hidden sm:inline">•</span>
                      <span className="truncate max-w-[150px] sm:max-w-none" title={item.workflow}>
                        {item.workflow}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500 flex-shrink-0">
                  <div className="font-semibold text-cyan-400">{calculateDuration(item.startDate, item.endDate)}</div>
                  <div className="text-gray-600 text-[10px] sm:text-xs">{item.period}</div>
                </div>
              </div>

              {/* Job/Education Title */}
              <div className="mb-3 pb-3 border-b border-gray-700">
                <div className="text-white font-semibold text-xs sm:text-sm md:text-base leading-tight">{item.title}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {item.location}
                </div>
              </div>

              {/* Achievements as Build Steps */}
              <div className="space-y-2">
                <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item.type === 'work' ? 'Build Steps' : 'Highlights'}
                </div>
                {item.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-2 text-[11px] sm:text-xs md:text-sm"
                  >
                    <span className="text-green-400 flex-shrink-0 mt-0.5 text-sm sm:text-base">✓</span>
                    <span className="text-gray-400 leading-relaxed">{achievement}</span>
                  </motion.div>
                ))}
              </div>

              {/* Footer like GitHub Actions */}
              <div className="mt-4 pt-3 border-t border-gray-700 flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-600">
                {item.endDate === null ? (
                  <>
                    <span className="flex items-center gap-1.5 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20">
                      <motion.div 
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      ></motion.div>
                      <span className="text-yellow-400 font-semibold">Build in progress</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-yellow-500/70">Currently running...</span>
                  </>
                ) : (
                  <>
                    <span className="flex items-center gap-1.5 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
                      <span className="text-green-400 font-semibold">Build passing</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-gray-500">All checks passed</span>
                  </>
                )}
              </div>
            </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
