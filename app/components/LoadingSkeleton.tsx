'use client';

import { motion } from 'framer-motion';

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4 p-6">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4">
        <motion.div
          className="w-24 h-24 rounded-full bg-gray-800"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="flex-1 space-y-2">
          <motion.div
            className="h-8 bg-gray-800 rounded w-3/4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          />
          <motion.div
            className="h-4 bg-gray-800 rounded w-1/2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Content Skeleton */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 space-y-3"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
        >
          <div className="h-4 bg-gray-800 rounded w-1/3" />
          <div className="h-4 bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-800 rounded w-5/6" />
        </motion.div>
      ))}
    </div>
  );
}

