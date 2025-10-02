'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from './types';

type Command = {
  id: string;
  name: string;
  description: string;
  icon: string;
  action: () => void;
  category: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setActiveSection: (section: Section) => void;
  setTerminalCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentTheme: (theme: string) => void;
};

export default function CommandPalette({
  isOpen,
  onClose,
  setActiveSection,
  setTerminalCollapsed,
  setSidebarCollapsed,
  setCurrentTheme,
}: Props) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: Command[] = [
    // Navigation
    { id: 'nav-about', name: 'Go to About', description: 'View about section', icon: '📄', action: () => setActiveSection('about'), category: 'Navigation' },
    { id: 'nav-timeline', name: 'Go to Timeline', description: 'View career timeline', icon: '📅', action: () => setActiveSection('timeline'), category: 'Navigation' },
    { id: 'nav-experience', name: 'Go to Experience', description: 'View detailed experience', icon: '💼', action: () => setActiveSection('experience'), category: 'Navigation' },
    { id: 'nav-projects', name: 'Go to Projects', description: 'View projects', icon: '🚀', action: () => setActiveSection('projects'), category: 'Navigation' },
    { id: 'nav-skills', name: 'Go to Skills', description: 'View technical skills', icon: '⚡', action: () => setActiveSection('skills'), category: 'Navigation' },
    { id: 'nav-education', name: 'Go to Education', description: 'View education', icon: '🎓', action: () => setActiveSection('education'), category: 'Navigation' },
    { id: 'nav-contact', name: 'Go to Contact', description: 'View contact info', icon: '📧', action: () => setActiveSection('contact'), category: 'Navigation' },
    
    // Actions
    { id: 'action-resume', name: 'View Resume', description: 'Open resume in new tab', icon: '👁️', action: () => window.open('/Shubham_Singh_Resume.pdf', '_blank'), category: 'Actions' },
    { id: 'action-email', name: 'Send Email', description: 'Compose email to Shubham', icon: '✉️', action: () => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=shubhamsingh1840@gmail.com', '_blank'), category: 'Actions' },
    { id: 'action-linkedin', name: 'Open LinkedIn', description: 'Visit LinkedIn profile', icon: '💼', action: () => window.open('https://linkedin.com/in/shubh-singh', '_blank'), category: 'Actions' },
    { id: 'action-github', name: 'Open GitHub', description: 'Visit GitHub profile', icon: '💻', action: () => window.open('https://github.com/shubhsting', '_blank'), category: 'Actions' },
    
    // UI Controls
    { id: 'ui-terminal', name: 'Toggle Terminal', description: 'Show/hide terminal', icon: '💻', action: () => setTerminalCollapsed(prev => !prev), category: 'UI' },
    { id: 'ui-sidebar', name: 'Toggle Sidebar', description: 'Show/hide sidebar', icon: '📂', action: () => setSidebarCollapsed(prev => !prev), category: 'UI' },
    { id: 'ui-print', name: 'Print Portfolio', description: 'Print current page', icon: '🖨️', action: () => window.print(), category: 'UI' },
    
    // Themes
    { id: 'theme-vscode', name: 'VS Code Theme', description: 'Switch to VS Code Dark theme', icon: '🎨', action: () => setCurrentTheme('vscode'), category: 'Themes' },
    { id: 'theme-dracula', name: 'Dracula Theme', description: 'Switch to Dracula theme', icon: '🧛', action: () => setCurrentTheme('dracula'), category: 'Themes' },
    { id: 'theme-monokai', name: 'Monokai Theme', description: 'Switch to Monokai theme', icon: '🌙', action: () => setCurrentTheme('monokai'), category: 'Themes' },
    { id: 'theme-nord', name: 'Nord Theme', description: 'Switch to Nord theme', icon: '❄️', action: () => setCurrentTheme('nord'), category: 'Themes' },
    
    // AI
    { id: 'ai-analyzer', name: 'AI Job Fit Analyzer', description: 'Open AI-powered job matching tool', icon: '🤖', action: () => window.dispatchEvent(new Event('openJobAnalyzer')), category: 'AI Tools' },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
      onClose();
      setSearch('');
    }
  };

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Group commands by category
  const groupedCommands: Record<string, Command[]> = {};
  filteredCommands.forEach(cmd => {
    if (!groupedCommands[cmd.category]) {
      groupedCommands[cmd.category] = [];
    }
    groupedCommands[cmd.category].push(cmd);
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1002]"
          />
          
          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-2xl z-[1003] overflow-hidden mx-4"
          >
            {/* Search Input */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-white outline-none text-lg placeholder-gray-500"
                  autoFocus
                />
                <kbd className="px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded border border-gray-700">
                  ESC
                </kbd>
              </div>
            </div>

            {/* Commands List */}
            <div className="max-h-96 overflow-y-auto p-2">
              {Object.keys(groupedCommands).length > 0 ? (
                Object.entries(groupedCommands).map(([category, cmds]) => (
                  <div key={category} className="mb-4">
                    <div className="px-3 py-1 text-xs text-gray-500 uppercase tracking-wider">
                      {category}
                    </div>
                    {cmds.map((cmd, idx) => {
                      const globalIndex = filteredCommands.indexOf(cmd);
                      return (
                        <motion.button
                          key={cmd.id}
                          onClick={() => {
                            cmd.action();
                            onClose();
                            setSearch('');
                          }}
                          className={`w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 transition-all ${
                            globalIndex === selectedIndex
                              ? 'bg-cyan-500/20 border border-cyan-500/50'
                              : 'hover:bg-gray-800/50'
                          }`}
                          whileHover={{ x: 2 }}
                        >
                          <span className="text-2xl">{cmd.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-medium">{cmd.name}</div>
                            <div className="text-xs text-gray-400 truncate">{cmd.description}</div>
                          </div>
                          {globalIndex === selectedIndex && (
                            <kbd className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded border border-gray-600">
                              ↵
                            </kbd>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-2">🔍</div>
                  <div className="text-sm">No commands found</div>
                  <div className="text-xs mt-1">Try different keywords</div>
                </div>
              )}
            </div>

            {/* Footer Tips */}
            <div className="p-3 border-t border-gray-700 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">↵</kbd>
                  Select
                </span>
              </div>
              <span className="text-gray-600">⌘K to open</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

