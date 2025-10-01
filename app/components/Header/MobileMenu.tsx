'use client';

import { motion } from 'framer-motion';
import { Section } from '../types';
import { fileTree } from '../fileTree';
import { themes } from '../themes';

type Props = {
  showMobileMenu: boolean;
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  setShowMobileMenu: (show: boolean) => void;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
};

export default function MobileMenu({ 
  showMobileMenu, 
  activeSection, 
  setActiveSection, 
  setShowMobileMenu,
  currentTheme,
  setCurrentTheme
}: Props) {
  if (!showMobileMenu) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sm:hidden bg-[#252526] border-b border-gray-800 p-4 space-y-4"
    >
      {/* Navigation */}
      <div className="space-y-2">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Navigation</div>
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
      </div>

      {/* Theme Selector */}
      <div className="space-y-2 border-t border-gray-700 pt-4">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
          <span>🎨</span> Themes
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => {
                setCurrentTheme(key);
              }}
              className={`px-3 py-2 rounded text-xs transition-all flex items-center gap-2 ${
                currentTheme === key
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-600'
              }`}
            >
              <div 
                className="w-3 h-3 rounded border border-gray-600" 
                style={{ backgroundColor: theme.accent }}
              ></div>
              <span className="truncate">{theme.name.split(' ')[0]}</span>
              {currentTheme === key && <span className="ml-auto">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

