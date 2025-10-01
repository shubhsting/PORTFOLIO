'use client';

import { motion } from 'framer-motion';

type Props = {
  cursorPos: { x: number; y: number };
  isHovering: boolean;
  cursorIcon: string;
};

export default function CustomCursor({ cursorPos, isHovering, cursorIcon }: Props) {
  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] hidden lg:block"
      animate={{
        x: cursorPos.x - 30,
        y: cursorPos.y - 30,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
      }}
    >
      <div className={`w-16 h-16 rounded-full transition-all duration-200 flex items-center justify-center ${
        isHovering 
          ? 'scale-100 bg-gradient-to-br from-cyan-500 to-blue-500 shadow-2xl shadow-cyan-500/50' 
          : 'scale-50 border-2 border-cyan-400/30'
      }`}>
        {isHovering && cursorIcon && (
          <span className="text-3xl">{cursorIcon}</span>
        )}
        {!isHovering && (
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-ping"></div>
        )}
      </div>
    </motion.div>
  );
}

