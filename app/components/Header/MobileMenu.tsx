'use client';

import { motion } from 'framer-motion';
import { Section } from '../types';
import { fileTree } from '../fileTree';

type Props = {
  showMobileMenu: boolean;
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  setShowMobileMenu: (show: boolean) => void;
};

export default function MobileMenu({ showMobileMenu, activeSection, setActiveSection, setShowMobileMenu }: Props) {
  if (!showMobileMenu) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sm:hidden bg-[#252526] border-b border-gray-800 p-4 space-y-2"
    >
      {fileTree.map((file) => (
        <button
          key={file.section}
          onClick={() => {
            setActiveSection(file.section);
            setShowMobileMenu(false);
          }}
          className={`w-full text-left px-4 py-3 rounded text-sm transition-all ${
            activeSection === file.section
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-gray-400 hover:bg-[#2a2d2e] hover:text-white'
          }`}
        >
          {file.name}
        </button>
      ))}
    </motion.div>
  );
}

