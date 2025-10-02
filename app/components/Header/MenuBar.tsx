'use client';

import { motion } from 'framer-motion';
import { Section, Theme } from '../types';
import { themes } from '../themes';
import { fileTree } from '../fileTree';

type Props = {
  showMenu: string | null;
  setShowMenu: (menu: string | null) => void;
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  terminalCollapsed: boolean;
  setTerminalCollapsed: (collapsed: boolean) => void;
  setTerminalHeight: (height: number) => void;
  setTerminalTab: (tab: 'terminal' | 'problems' | 'output') => void;
  setTerminalHistory: (history: string[] | ((prev: string[]) => string[])) => void;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  handleViewResume: () => void;
  handleCopyEmail: () => void;
  handleCopyPhone: () => void;
};

export default function MenuBar({
  showMenu,
  setShowMenu,
  activeSection,
  setActiveSection,
  terminalCollapsed,
  setTerminalCollapsed,
  setTerminalHeight,
  setTerminalTab,
  setTerminalHistory,
  currentTheme,
  setCurrentTheme,
  handleViewResume,
  handleCopyEmail,
  handleCopyPhone,
}: Props) {
  return (
    <div className="hidden sm:flex bg-[#2d2d30] border-b border-gray-800 px-4 py-1 gap-6 text-sm relative">
      {/* File Menu */}
      <div className="relative">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(showMenu === 'file' ? null : 'file');
          }}
          className="text-gray-400 hover:text-white transition-colors hover:bg-gray-700 px-2 py-1 rounded"
        >
          File
        </button>
        {showMenu === 'file' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 mt-1 bg-[#252526] border border-gray-700 rounded shadow-2xl min-w-[200px] z-50"
          >
            <button onClick={handleViewResume} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-[#2d2d30] hover:text-white transition-colors">
              👁️ View Resume
            </button>
            <a href="/Shubham_Singh_Resume.pdf" download className="w-full text-left px-4 py-2 text-gray-300 hover:bg-[#2d2d30] hover:text-white transition-colors block">
              📥 Download Resume
            </a>
            <button onClick={() => window.print()} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-[#2d2d30] hover:text-white transition-colors">
              🖨️ Print Portfolio
            </button>
            <div className="border-t border-gray-700"></div>
            <button onClick={() => setShowMenu(null)} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-[#2d2d30] hover:text-white transition-colors">
              ❌ Close
            </button>
          </motion.div>
        )}
      </div>

      {/* Edit Menu */}
      <div className="relative">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(showMenu === 'edit' ? null : 'edit');
          }}
          className="text-gray-400 hover:text-white transition-colors hover:bg-gray-700 px-2 py-1 rounded"
        >
          Edit
        </button>
        {showMenu === 'edit' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 mt-1 bg-[#252526] border border-gray-700 rounded shadow-2xl min-w-[200px] z-50"
          >
            <button onClick={handleCopyEmail} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-[#2d2d30] hover:text-white transition-colors">
              📋 Copy Email
            </button>
            <button onClick={handleCopyPhone} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-[#2d2d30] hover:text-white transition-colors">
              📋 Copy Phone
            </button>
            <div className="border-t border-gray-700"></div>
            <button onClick={() => setShowMenu(null)} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-[#2d2d30] hover:text-white transition-colors">
              ❌ Close
            </button>
          </motion.div>
        )}
      </div>

      {/* View Menu */}
      <div className="relative">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(showMenu === 'view' ? null : 'view');
          }}
          className="text-gray-400 hover:text-white transition-colors hover:bg-gray-700 px-2 py-1 rounded"
        >
          View
        </button>
        {showMenu === 'view' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 mt-1 bg-[#252526] border border-gray-700 rounded shadow-2xl min-w-[200px] z-50"
          >
            {fileTree.map((file) => (
              <button
                key={file.section}
                onClick={() => {
                  setActiveSection(file.section);
                  setShowMenu(null);
                }}
                className={`w-full text-left px-4 py-2 transition-colors ${
                  activeSection === file.section 
                    ? 'bg-[#37373d] text-white' 
                    : 'text-gray-300 hover:bg-[#2d2d30] hover:text-white'
                }`}
              >
                {file.name}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Terminal Menu */}
      <div className="relative">
        <button 
          onClick={() => {
            setTerminalCollapsed(!terminalCollapsed);
            
            if (terminalCollapsed) {
              setTerminalHeight(250);
              setTerminalTab('terminal');
              setTerminalHistory(prev => [...prev, '> Terminal activated! Type "help" for commands 💻']);
              
              setTimeout(() => {
                const terminal = document.querySelector('input[type="text"]') as HTMLInputElement;
                terminal?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                terminal?.focus();
              }, 300);
            }
            
            setShowMenu(null);
          }}
          className="text-gray-400 hover:text-white transition-colors hover:bg-gray-700 px-2 py-1 rounded"
        >
          Terminal
        </button>
      </div>

      {/* Help Menu */}
      <div className="relative">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(showMenu === 'help' ? null : 'help');
          }}
          className="text-gray-400 hover:text-white transition-colors hover:bg-gray-700 px-2 py-1 rounded"
        >
          Help
        </button>
        {showMenu === 'help' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 mt-1 bg-[#252526] border border-gray-700 rounded shadow-2xl min-w-[280px] p-4 z-50"
          >
            <h3 className="text-white font-semibold mb-3">🎯 Quick Help</h3>
            <div className="space-y-2 text-gray-300 text-xs">
              <p><span className="text-cyan-400">Click files</span> in sidebar to navigate</p>
              <p><span className="text-cyan-400">Type commands</span> in terminal below</p>
              <p><span className="text-purple-400">Commands:</span> about, experience, projects, skills, education, contact, help, clear</p>
              <p><span className="text-green-400">File menu:</span> Download resume & print</p>
              <p><span className="text-green-400">Edit menu:</span> Copy contact details</p>
            </div>
            <button onClick={() => setShowMenu(null)} className="mt-3 w-full bg-cyan-500/20 text-cyan-400 px-3 py-2 rounded hover:bg-cyan-500/30 transition-colors">
              Got it! ✓
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Theme Selector */}
      <div className="relative ml-auto">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(showMenu === 'theme' ? null : 'theme');
          }}
          className="text-gray-400 hover:text-white transition-colors hover:bg-gray-700 px-2 py-1 rounded flex items-center gap-1"
        >
          🎨 <span className="hidden sm:inline">Theme</span>
        </button>
        {showMenu === 'theme' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full right-0 mt-1 bg-[#252526] border border-gray-700 rounded shadow-2xl min-w-[200px] z-50"
          >
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => {
                  setCurrentTheme(key);
                  setShowMenu(null);
                  setTerminalHistory(prev => [...prev, `✓ Theme changed to ${theme.name}! 🎨`]);
                }}
                className={`w-full text-left px-4 py-2 transition-colors flex items-center gap-2 ${
                  currentTheme === key 
                    ? 'bg-[#37373d] text-white' 
                    : 'text-gray-300 hover:bg-[#2d2d30] hover:text-white'
                }`}
              >
                <div 
                  className="w-4 h-4 rounded border border-gray-600" 
                  style={{ backgroundColor: theme.accent }}
                ></div>
                {theme.name}
                {currentTheme === key && <span className="ml-auto">✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

