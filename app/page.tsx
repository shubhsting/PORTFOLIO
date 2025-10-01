'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import CopyButton from './components/CopyButton';
import JobFitAnalyzer from './components/JobFitAnalyzer';
import AnimatedBackground from './components/AnimatedBackground';
import CommandPalette from './components/CommandPalette';
import ContactForm from './components/ContactForm';

type Section = 'about' | 'experience' | 'projects' | 'skills' | 'education' | 'contact';

type Theme = {
  name: string;
  bg: string;
  bgSecondary: string;
  bgTertiary: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentSecondary: string;
  border: string;
};

const themes: Record<string, Theme> = {
  vscode: {
    name: 'VS Code Dark',
    bg: '#1e1e1e',
    bgSecondary: '#252526',
    bgTertiary: '#2d2d30',
    text: '#ffffff',
    textSecondary: '#9cdcfe',
    accent: '#06b6d4',
    accentSecondary: '#0ea5e9',
    border: '#3e3e42',
  },
  dracula: {
    name: 'Dracula',
    bg: '#282a36',
    bgSecondary: '#21222c',
    bgTertiary: '#191a21',
    text: '#f8f8f2',
    textSecondary: '#ff79c6',
    accent: '#bd93f9',
    accentSecondary: '#ff79c6',
    border: '#6272a4',
  },
  monokai: {
    name: 'Monokai',
    bg: '#272822',
    bgSecondary: '#1e1f1c',
    bgTertiary: '#1e1f1c',
    text: '#f8f8f2',
    textSecondary: '#a6e22e',
    accent: '#e6db74',
    accentSecondary: '#f92672',
    border: '#49483e',
  },
  nord: {
    name: 'Nord',
    bg: '#2e3440',
    bgSecondary: '#3b4252',
    bgTertiary: '#434c5e',
    text: '#eceff4',
    textSecondary: '#88c0d0',
    accent: '#81a1c1',
    accentSecondary: '#5e81ac',
    border: '#4c566a',
  },
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<Section>('about');
  const [currentTheme, setCurrentTheme] = useState<string>('vscode');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '🚀 Welcome to Divyanshu Singh\'s Portfolio Terminal v1.0',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '💡 Type "help" to see all available commands',
    '✨ Try commands like: whoami, tech, resume, email',
    '',
  ]);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [terminalTab, setTerminalTab] = useState<'terminal' | 'problems' | 'output'>('terminal');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorIcon, setCursorIcon] = useState('');
  const [terminalHeight, setTerminalHeight] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  const [terminalCollapsed, setTerminalCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [visitorCount, setVisitorCount] = useState(0);

  // Function to calculate duration between two dates
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

  // Tech icon mapping
  const getTechIcon = (tech: string): string => {
    const iconMap: Record<string, string> = {
      'MongoDB': '🍃',
      'Express': '⚡',
      'React': '⚛️',
      'Node.js': '💚',
      'JavaScript': '🟨',
      'Java': '☕',
      'TypeScript': '💙',
      'Python': '🐍',
      'AWS': '☁️',
      'Docker': '🐳',
      'PostgreSQL': '🐘',
      'Redis': '🔴',
      'Algorithms': '📊',
      'DSA': '🌳',
      'Next.js': '▲',
      'Tailwind': '💨',
    };
    return iconMap[tech] || '⚙️';
  };

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results: any[] = [];
    const lowerQuery = query.toLowerCase();

    // Search in file tree
    fileTree.forEach(file => {
      if (file.name.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'section',
          title: file.name,
          section: file.section,
          icon: file.name.split(' ')[0],
        });
      }
    });

    // Search in projects
    const projects = [
      { name: 'Trip-Tide', tech: ['MongoDB', 'Express', 'React', 'Node.js'], section: 'projects', icon: '🚗' },
      { name: 'SUDOKU-SOLVER', tech: ['Java', 'Algorithms', 'DSA'], section: 'projects', icon: '🎯' },
    ];
    projects.forEach(project => {
      if (project.name.toLowerCase().includes(lowerQuery) || 
          project.tech.some(t => t.toLowerCase().includes(lowerQuery))) {
        results.push({
          type: 'project',
          title: project.name,
          subtitle: project.tech.join(', '),
          section: 'projects',
          icon: project.icon,
        });
      }
    });

    // Search in experience
    const companies = [
      { name: 'The Algorithm', role: 'Software Engineer', section: 'experience', icon: '💼' },
      { name: 'MathonGo', role: 'Software Developer Engineer', section: 'experience', icon: '💼' },
      { name: 'ARENESS', role: 'Software Developer Engineer', section: 'experience', icon: '💼' },
    ];
    companies.forEach(company => {
      if (company.name.toLowerCase().includes(lowerQuery) || 
          company.role.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'experience',
          title: company.name,
          subtitle: company.role,
          section: 'experience',
          icon: company.icon,
        });
      }
    });

    // Search in skills
    const skills = ['Java', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB', 'AWS'];
    skills.forEach(skill => {
      if (skill.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'skill',
          title: skill,
          section: 'skills',
          icon: getTechIcon(skill),
        });
      }
    });

    setSearchResults(results);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // Handle terminal resize
      if (isResizing) {
        const newHeight = window.innerHeight - e.clientY;
        if (newHeight >= 150 && newHeight <= 600) {
          setTerminalHeight(newHeight);
        }
      }
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = '';
    };
    
    // Set cursor style when resizing
    if (isResizing) {
      document.body.style.cursor = 'ns-resize';
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    };
  }, [isResizing]);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    setLineCount(Math.floor(Math.random() * 500) + 200);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
    
    // Visitor counter
    const visits = parseInt(localStorage.getItem('portfolioVisits') || '0');
    const newVisits = visits + 1;
    localStorage.setItem('portfolioVisits', newVisits.toString());
    setVisitorCount(newVisits);
    
    return () => clearInterval(timer);
  }, []);
  
  // Save theme to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('portfolioTheme', currentTheme);
    }
  }, [currentTheme, mounted]);

  useEffect(() => {
    const handleClickOutside = () => {
      if (showMenu) setShowMenu(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenu]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command Palette (Ctrl+K / Cmd+K)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
        setCommandInput('');
      }
      // Close command palette on Escape
      if (e.key === 'Escape' && showCommandPalette) {
        setShowCommandPalette(false);
        setCommandInput('');
      }
      // Toggle sidebar (Ctrl+B / Cmd+B)
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarCollapsed(prev => !prev);
      }
      // Toggle terminal (Ctrl+J / Cmd+J)
      if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
        e.preventDefault();
        setTerminalCollapsed(prev => !prev);
        if (terminalCollapsed) {
          setTerminalHeight(250);
        }
      }
      // Focus search (/)
      if (e.key === '/' && !showCommandPalette && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        searchInput?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalCollapsed, showCommandPalette]);

  const handleDownloadResume = () => {
    // Open in new tab so user can view it
    window.open('/Divyanshu_Singh_Resume.pdf', '_blank');
  };

  const handleViewResume = () => {
    window.open('/Divyanshu_Singh_Resume.pdf', '_blank');
  };

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText('divyanshusingh.hire@gmail.com');
        alert('✓ Email copied to clipboard: divyanshusingh.hire@gmail.com');
      } else {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = 'divyanshusingh.hire@gmail.com';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('✓ Email copied to clipboard: divyanshusingh.hire@gmail.com');
      }
    } catch (err) {
      alert('Email: divyanshusingh.hire@gmail.com');
    }
  };

  const handleEmailClick = () => {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=divyanshusingh.hire@gmail.com&su=Hello%20Divyanshu&body=Hi%20Divyanshu,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect.%0D%0A%0D%0ABest%20regards', '_blank');
  };

  const handleCopyPhone = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText('+91 7906726655');
        alert('✓ Phone number copied to clipboard!');
      } else {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = '+91 7906726655';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('✓ Phone number copied to clipboard!');
      }
    } catch (err) {
      alert('Phone: +91 7906726655');
    }
  };

  const handleTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.toLowerCase().trim();
    const args = command.split(' ');
    const cmd = args[0];
    
    const newHistory = [...terminalHistory, `$ ${terminalInput}`];
    
    if (cmd === 'help') {
      newHistory.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      newHistory.push('📚 Available Commands:');
      newHistory.push('  Navigation: about, experience, projects, skills, education, contact');
      newHistory.push('  Actions: resume, email, phone, linkedin, github');
      newHistory.push('  System: clear, whoami, date, tech, theme');
      newHistory.push('  AI Tools: ai-analyze (🤖 Check job fit with AI)');
      newHistory.push('  Fun: matrix, joke, quote, coffee, ascii, sudo, hack, fortune');
      newHistory.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } else if (cmd === 'matrix') {
      newHistory.push('');
      newHistory.push('🟢 ░█▄░▄█ ░█▀█ ░▀█▀ ░█▀▀█ ░▀█▀ ░█░█');
      newHistory.push('🟢 ░█░█░█ ░█▀█ ░░█░ ░█▄▄▀ ░░█░ ░▄▄▄');
      newHistory.push('🟢 ░█░░░█ ░█░█ ░░█░ ░█░░█ ░▄█▄ ░█░█');
      newHistory.push('');
      newHistory.push('🟢 The Matrix has you... Follow the white rabbit 🐰');
      newHistory.push('🟢 Wake up, Neo...');
    } else if (cmd === 'joke') {
      const jokes = [
        'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
        'How many programmers does it take to change a light bulb? None, that\'s a hardware problem! 💡',
        'Why do Java developers wear glasses? Because they don\'t C#! 👓',
        'A SQL query walks into a bar, walks up to two tables and asks... "Can I JOIN you?" 🍻',
        'Why did the programmer quit his job? Because he didn\'t get arrays! 💸',
        'What\'s a programmer\'s favorite hangout place? Foo Bar! 🍺',
        'Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25! 🎃🎄',
        'There are only 10 types of people: those who understand binary and those who don\'t. 😄',
      ];
      newHistory.push('😂 ' + jokes[Math.floor(Math.random() * jokes.length)]);
    } else if (cmd === 'quote') {
      const quotes = [
        '"Code is like humor. When you have to explain it, it\'s bad." – Cory House',
        '"First, solve the problem. Then, write the code." – John Johnson',
        '"Experience is the name everyone gives to their mistakes." – Oscar Wilde',
        '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." – Martin Fowler',
        '"The best error message is the one that never shows up." – Thomas Fuchs',
        '"Simplicity is the soul of efficiency." – Austin Freeman',
        '"Make it work, make it right, make it fast." – Kent Beck',
        '"Talk is cheap. Show me the code." – Linus Torvalds',
      ];
      newHistory.push('✨ ' + quotes[Math.floor(Math.random() * quotes.length)]);
    } else if (cmd === 'coffee') {
      newHistory.push('');
      newHistory.push('      ☕');
      newHistory.push('     (  )');
      newHistory.push('  ╔═══════╗');
      newHistory.push('  ║ COFFEE║');
      newHistory.push('  ╚═══════╝');
      newHistory.push('');
      newHistory.push('☕ Brewing code fuel... Ah, much better!');
    } else if (cmd === 'ascii') {
      newHistory.push('');
      newHistory.push('  ____  _                            _           ');
      newHistory.push(' |  _ \\(_)_   ___   _  __ _ _ __  ___| |__  _   _ ');
      newHistory.push(' | | | | \\ \\ / / | | |/ _` | \'_ \\/ __| \'_ \\| | | |');
      newHistory.push(' | |_| | |\\ V /| |_| | (_| | | | \\__ \\ | | | |_| |');
      newHistory.push(' |____/|_| \\_/  \\__, |\\__,_|_| |_|___/_| |_|\\__,_|');
      newHistory.push('                |___/                              ');
      newHistory.push('');
    } else if (cmd === 'sudo') {
      if (args[1] === 'rm' && args[2] === '-rf' && args[3] === '/') {
        newHistory.push('');
        newHistory.push('🚨 PERMISSION DENIED! 🚨');
        newHistory.push('Nice try! 😏 But I\'m not falling for that one!');
        newHistory.push('This portfolio is sudo-proof! 🛡️');
      } else {
        newHistory.push('🔐 [sudo] password for visitor:');
        newHistory.push('Sorry, you don\'t have sudo privileges here! 😅');
      }
    } else if (cmd === 'hack') {
      newHistory.push('');
      newHistory.push('🔴 Initiating hack sequence...');
      newHistory.push('🟠 Bypassing firewall... [████████░░] 80%');
      newHistory.push('🟡 Accessing mainframe... [██████████] 100%');
      newHistory.push('🟢 HACK SUCCESSFUL! Just kidding! 😎');
      newHistory.push('');
      newHistory.push('Real hacking takes years of practice. Keep learning! 📚');
    } else if (cmd === 'fortune') {
      const fortunes = [
        '🔮 You will write bug-free code today. (Results may vary)',
        '🔮 A semicolon you forgot will appear when you need it most.',
        '🔮 Your pull request will be approved on the first try!',
        '🔮 Stack Overflow will have the exact answer you need.',
        '🔮 No merge conflicts in your future!',
        '🔮 Your code will compile on the first attempt.',
        '🔮 A recruiter with your dream job will contact you soon!',
      ];
      newHistory.push(fortunes[Math.floor(Math.random() * fortunes.length)]);
    } else if (cmd === 'theme') {
      if (args[1]) {
        const themeName = args[1].toLowerCase();
        if (themes[themeName]) {
          setCurrentTheme(themeName);
          newHistory.push(`✓ Theme changed to ${themes[themeName].name}! 🎨`);
        } else {
          newHistory.push(`❌ Theme "${args[1]}" not found.`);
          newHistory.push('Available themes: vscode, dracula, monokai, nord');
        }
      } else {
        newHistory.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        newHistory.push('🎨 Available Themes:');
        newHistory.push('  • vscode   - VS Code Dark (default)');
        newHistory.push('  • dracula  - Dracula Theme');
        newHistory.push('  • monokai  - Monokai Pro');
        newHistory.push('  • nord     - Nord Theme');
        newHistory.push('');
        newHistory.push(`Current theme: ${themes[currentTheme].name}`);
        newHistory.push('Usage: theme <name> (e.g., "theme dracula")');
        newHistory.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      }
    } else if (['about', 'experience', 'projects', 'skills', 'education', 'contact'].includes(cmd)) {
      setActiveSection(cmd as Section);
      newHistory.push(`✓ Navigating to ${cmd}...`);
    } else if (cmd === 'resume') {
      newHistory.push('✓ Opening resume in new tab...');
      setTimeout(() => window.open('/Divyanshu_Singh_Resume.pdf', '_blank'), 500);
    } else if (cmd === 'email') {
      newHistory.push('✓ Opening Gmail compose...');
      setTimeout(() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=divyanshusingh.hire@gmail.com&su=Hello%20Divyanshu&body=Hi%20Divyanshu,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect.%0D%0A%0D%0ABest%20regards', '_blank'), 500);
    } else if (cmd === 'phone') {
      newHistory.push('📞 Phone: +91 7906726655');
      navigator.clipboard?.writeText('+91 7906726655').catch(() => {});
      newHistory.push('✓ Phone number copied to clipboard!');
    } else if (cmd === 'linkedin') {
      newHistory.push('✓ Opening LinkedIn profile...');
      setTimeout(() => window.open('https://www.linkedin.com/in/divyanshu-singh-624700221', '_blank'), 500);
    } else if (cmd === 'github') {
      newHistory.push('✓ Opening GitHub profile...');
      setTimeout(() => window.open('https://github.com/divyanshu2003singh', '_blank'), 500);
    } else if (cmd === 'whoami') {
      newHistory.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      newHistory.push('👨‍💻 Divyanshu Singh');
      newHistory.push('💼 Software Engineer @ The Algorithm');
      newHistory.push('📍 New Delhi, India');
      newHistory.push('🎓 B.Tech Computer Science (CGPA: 8.1)');
      newHistory.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } else if (cmd === 'date') {
      newHistory.push(`📅 ${new Date().toLocaleString()}`);
    } else if (cmd === 'tech') {
      newHistory.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      newHistory.push('💻 Tech Stack:');
      newHistory.push('  Languages: Java, JavaScript, TypeScript');
      newHistory.push('  Frameworks: React, Node.js, Express.js');
      newHistory.push('  Cloud: AWS (EC2, S3, SES, SNS, SQS)');
      newHistory.push('  Databases: MongoDB, PostgreSQL, Redis');
      newHistory.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } else if (cmd === 'ai-analyze' || cmd === 'ai' || cmd === 'jobfit') {
      newHistory.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      newHistory.push('🤖 AI Job Fit Analyzer');
      newHistory.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      newHistory.push('');
      newHistory.push('Opening AI-powered job matching tool...');
      newHistory.push('');
      newHistory.push('📋 Recruiters can paste job descriptions to get:');
      newHistory.push('  • Match percentage analysis');
      newHistory.push('  • Skill gap identification');
      newHistory.push('  • Personalized recommendations');
      newHistory.push('  • Relevant experience highlights');
      newHistory.push('');
      newHistory.push('🚀 Click the purple 🤖 button at the bottom right!');
      newHistory.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      // Trigger the analyzer to open
      setTimeout(() => {
        window.dispatchEvent(new Event('openJobAnalyzer'));
      }, 500);
    } else if (cmd === 'clear') {
      setTerminalHistory(['> Terminal cleared. Type "help" for commands.']);
      setTerminalInput('');
      return;
    } else if (cmd === 'ls' || cmd === 'dir') {
      newHistory.push('📁 Portfolio files:');
      fileTree.forEach(file => newHistory.push(`  ${file.name}`));
    } else if (command) {
      newHistory.push(`❌ Command not found: ${command}`);
      newHistory.push('💡 Tip: Type "help" for available commands');
    }
    
    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  // Get current theme colors
  const theme = themes[currentTheme];

  const fileTree = [
    { name: '📄 about.js', section: 'about' as Section },
    { name: '💼 experience.tsx', section: 'experience' as Section },
    { name: '🚀 projects.jsx', section: 'projects' as Section },
    { name: '⚡ skills.ts', section: 'skills' as Section },
    { name: '🎓 education.json', section: 'education' as Section },
    { name: '📧 contact.md', section: 'contact' as Section },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-8">
              <div className="relative flex-shrink-0">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-75"
                />
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-2xl border-4 border-cyan-500/50">
                  <img 
                    src="/profile.jpg" 
                    alt="Divyanshu Singh" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] mb-2 break-words">
                  <span className="text-cyan-400">const</span>{' '}
                  <span className="text-yellow-400">developer</span>{' '}
                  <span className="text-white">=</span>{' '}
                  <span className="text-green-400">"Divyanshu Singh"</span>
                  <span className="text-gray-500">;</span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 font-[family-name:var(--font-space)]">
                  <span className="text-purple-400">// </span>Software Engineer
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 sm:p-6 border border-gray-700 font-mono overflow-x-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-xs sm:text-sm text-gray-500">about.js</span>
              </div>
              <pre className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                <span className="text-purple-400">export default</span> <span className="text-yellow-400">function</span> <span className="text-blue-400">AboutMe</span>() {'{'}{'\n'}
                {'  '}<span className="text-cyan-400">return</span> {'{'}{'\n'}
                {'    '}<span className="text-green-400">role</span>: <span className="text-orange-400">"Software Engineer"</span>,{'\n'}
                {'    '}<span className="text-green-400">location</span>: <span className="text-orange-400">"New Delhi, India"</span>,{'\n'}
                {'    '}<span className="text-green-400">email</span>: <span className="text-orange-400">"divyanshusingh.hire@gmail.com"</span>,{'\n'}
                {'    '}<span className="text-green-400">phone</span>: <span className="text-orange-400">"+91 7906726655"</span>,{'\n'}
                {'    '}<span className="text-green-400">passion</span>: <span className="text-orange-400">"Building scalable architectures"</span>,{'\n'}
                {'    '}<span className="text-green-400">expertise</span>: [<span className="text-orange-400">"Backend"</span>, <span className="text-orange-400">"Frontend"</span>, <span className="text-orange-400">"Node.js"</span>, <span className="text-orange-400">"AWS"</span>],{'\n'}
                {'  '}{'}'}{'\n'}
                {'}'}
              </pre>
            </div>

            <div className="bg-gray-950/50 border border-gray-700 rounded-lg p-4 sm:p-6 font-mono mb-6">
              <div className="space-y-2">
                {[
                  { cmd: 'call', icon: '📞', value: '+91 7906726655', href: 'tel:+917906726655', copyValue: '+91 7906726655' },
                  { cmd: 'email', icon: '✉️', value: 'divyanshusingh.hire@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=divyanshusingh.hire@gmail.com', copyValue: 'divyanshusingh.hire@gmail.com' },
                  { cmd: 'linkedin', icon: '💼', value: 'View Profile', href: 'https://www.linkedin.com/in/divyanshu-singh-624700221', copyValue: 'https://www.linkedin.com/in/divyanshu-singh-624700221' },
                  { cmd: 'github', icon: '💻', value: 'View Repositories', href: 'https://github.com/divyanshu2003singh', copyValue: 'https://github.com/divyanshu2003singh' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <motion.a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onMouseEnter={() => { setIsHovering(true); setCursorIcon(item.icon); }}
                      onMouseLeave={() => { setIsHovering(false); setCursorIcon(''); }}
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-2 sm:gap-3 hover:bg-gray-900/50 p-2 rounded transition-all group flex-1 min-w-0"
                    >
                      <span className="text-green-400 text-xs sm:text-sm flex-shrink-0">$</span>
                      <span className="text-purple-400 text-xs sm:text-sm flex-shrink-0">./{item.cmd}</span>
                      <span className="text-gray-600 text-xs sm:text-sm flex-shrink-0">{'-->'}</span>
                      <span className="text-lg sm:text-xl flex-shrink-0">{item.icon}</span>
                      <span className="text-gray-400 text-xs sm:text-sm flex-1 truncate group-hover:text-cyan-400 transition-colors">{item.value}</span>
                      <span className="text-gray-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">↗</span>
                    </motion.a>
                    <CopyButton text={item.copyValue} label={item.cmd} />
                  </div>
                ))}
              </div>
            </div>

            {/* Download Resume Button - More subtle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-3"
            >
              <motion.button
                onClick={handleDownloadResume}
                onMouseEnter={() => { setIsHovering(true); setCursorIcon('📄'); }}
                onMouseLeave={() => { setIsHovering(false); setCursorIcon(''); }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.6)' }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gray-900/50 border-2 border-gray-700 text-gray-300 px-4 py-2.5 rounded-lg font-medium text-sm hover:border-cyan-500 hover:text-cyan-400 hover:bg-gray-900/70 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Resume
              </motion.button>

              <motion.button
                onClick={() => window.print()}
                onMouseEnter={() => { setIsHovering(true); setCursorIcon('🖨️'); }}
                onMouseLeave={() => { setIsHovering(false); setCursorIcon(''); }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.6)' }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gray-900/50 border-2 border-gray-700 text-gray-300 px-4 py-2.5 rounded-lg font-medium text-sm hover:border-cyan-500 hover:text-cyan-400 hover:bg-gray-900/70 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Portfolio
              </motion.button>
            </motion.div>
          </motion.div>
        );

      case 'experience':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {[
              {
                title: 'Software Engineer',
                company: 'The Algorithm',
                companyUrl: 'https://www.linkedin.com/company/the-algorithm/',
                logo: '/the_algorithm_logo.jpeg',
                startDate: '2025-01-01',
                endDate: null, // Present
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
                title: 'Software Developer Engineer (Intern)',
                company: 'MathonGo',
                companyUrl: 'https://www.linkedin.com/company/mathongo/',
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
                title: 'Software Developer Engineer (Intern)',
                company: 'ARENESS',
                companyUrl: 'https://www.linkedin.com/company/areness/mycompany/',
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
                title: 'Frontend Developer',
                company: 'Freelance Projects',
                companyUrl: 'https://github.com/divyanshu2003singh',
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
            ].map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="relative group"
              >
                {/* Holographic Border Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-cyan-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-100 blur transition-all duration-500 bg-[length:200%_200%] animate-[holographic_3s_ease_infinite]"></div>
                
                {/* Glassmorphism Card */}
                <div className="relative bg-gray-900/70 backdrop-blur-xl border border-gray-700/50 rounded-lg p-4 sm:p-6 font-mono shadow-2xl overflow-hidden"
              >
                  {/* Shine Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  </div>
                {/* Workflow Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Company Logo with Status Effects */}
                    <div className="relative flex-shrink-0 z-10">
                      {job.endDate === null ? (
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
                              src={job.logo} 
                              alt={`${job.company} logo`}
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
                              src={job.logo} 
                              alt={`${job.company} logo`}
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
                        href={job.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => { setIsHovering(true); setCursorIcon('🏢'); }}
                        onMouseLeave={() => { setIsHovering(false); setCursorIcon(''); }}
                        className="text-cyan-400 font-bold text-base sm:text-lg hover:underline truncate block"
                      >
                        {job.company}
                      </a>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 text-xs text-gray-500">
                        {job.endDate === null ? (
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
                        <span className="truncate max-w-[150px] sm:max-w-none" title={job.workflow}>
                          {job.workflow}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500 flex-shrink-0">
                    <div className="font-semibold text-cyan-400">{calculateDuration(job.startDate, job.endDate)}</div>
                    <div className="text-gray-600 text-[10px] sm:text-xs">{job.period}</div>
                  </div>
                </div>

                {/* Job Title */}
                <div className="mb-3 pb-3 border-b border-gray-700">
                  <div className="text-white font-semibold text-xs sm:text-sm md:text-base leading-tight">{job.title}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </div>
                </div>

                {/* Achievements as Build Steps */}
                <div className="space-y-2">
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Build Steps
                  </div>
                  {job.achievements.map((achievement, i) => (
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
                  {job.endDate === null ? (
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
            ))}
          </motion.div>
        );

      case 'projects':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {[
              {
                name: 'Trip-Tide',
                repo: 'divyanshu2003singh/Trip-Tide',
                url: 'https://github.com/divyanshu2003singh/Trip-Tide',
                liveUrl: 'https://trip-tide-demo.vercel.app',
                description: 'Full-stack ride-sharing application',
                tech: ['MongoDB', 'Express', 'React', 'Node.js'],
                icon: '🚗',
                stars: '⭐ 12',
                language: 'JavaScript',
                langColor: 'bg-yellow-400',
                previewGradient: 'from-green-500 via-emerald-500 to-teal-500',
                features: [
                  'Geospatial queries in MongoDB',
                  'JWT authentication',
                  'MERN stack architecture',
                ],
              },
              {
                name: 'SUDOKU-SOLVER',
                repo: 'divyanshu2003singh/SUDOKU-SOLVER',
                url: 'https://github.com/divyanshu2003singh/SUDOKU-SOLVER',
                liveUrl: 'https://sudoku-solver-demo.vercel.app',
                description: 'Java-based puzzle solver and generator',
                tech: ['Java', 'Algorithms', 'DSA'],
                icon: '🎯',
                stars: '⭐ 8',
                language: 'Java',
                langColor: 'bg-orange-500',
                previewGradient: 'from-orange-500 via-red-500 to-pink-500',
                features: [
                  'Backtracking algorithms',
                  'Puzzle generator',
                  'Validation system',
                ],
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden hover:border-cyan-500 transition-all font-mono group"
              >
                {/* Flex Container for Side-by-Side Layout */}
                <div className="flex flex-col lg:flex-row">
                  {/* Project Content - Left Side */}
                  <div className="flex-1 p-4 sm:p-6">
                {/* Repo Header - GitHub Style */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-1 min-w-0">
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onMouseEnter={() => { setIsHovering(true); setCursorIcon(project.icon); }}
                        onMouseLeave={() => { setIsHovering(false); setCursorIcon(''); }}
                        className="group flex items-center gap-2"
                      >
                        <span className="text-cyan-400 font-bold text-base sm:text-lg hover:underline truncate">{project.repo}</span>
                        <svg className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                      </a>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${project.langColor}`}></div>
                          {project.language}
                        </span>
                        <span>{project.stars}</span>
                        <span className="hidden sm:inline">Public</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4">{project.description}</p>

                {/* Tech Stack with Icons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-lg text-xs border border-blue-500/30 font-semibold flex items-center gap-1.5 hover:border-blue-400 transition-all"
                    >
                      <span className="text-base">{getTechIcon(tech)}</span>
                      <span>{tech}</span>
                    </motion.span>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-1.5">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex gap-2 text-xs sm:text-sm text-gray-400">
                      <span className="text-green-400">→</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="mt-4 pt-4 border-t border-gray-700 flex items-center gap-4 text-xs flex-wrap">
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-500 hover:text-cyan-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    View Code
                  </a>
                  <span className="text-gray-600">•</span>
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!project.liveUrl.includes('demo')) {
                        e.preventDefault();
                        alert('Live demo coming soon!');
                      }
                    }}
                    className="flex items-center gap-1 text-gray-500 hover:text-green-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                  <span className="text-gray-600 hidden sm:inline">•</span>
                  <span className="text-gray-500 hidden sm:inline">Updated recently</span>
                </div>
                </div>

                  {/* Project Preview Section - Right Side */}
                  <div className="lg:w-96 xl:w-[420px] relative overflow-hidden border-t lg:border-t-0 lg:border-l border-gray-700/50 group/preview">
                    {/* Animated Gradient Background */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${project.previewGradient} opacity-30`}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.4, 0.3]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Radial Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent opacity-50"></div>
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,.1)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>
                    
                    {/* Floating Orbs */}
                    <motion.div
                      className={`absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-br ${project.previewGradient} blur-3xl opacity-20`}
                      animate={{
                        y: [0, 20, 0],
                        x: [0, 10, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className={`absolute bottom-10 right-10 w-40 h-40 rounded-full bg-gradient-to-br ${project.previewGradient} blur-3xl opacity-20`}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, -10, 0],
                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                    
                    {/* Preview Content */}
                    <div className="relative h-64 lg:h-full flex items-center justify-center p-8">
                      <div className="text-center space-y-6">
                        {/* Animated Icon Container */}
                        <motion.div 
                          className="relative inline-block"
                          whileHover={{ scale: 1.05 }}
                        >
                          {/* Glow Ring */}
                          <motion.div 
                            className={`absolute -inset-4 bg-gradient-to-r ${project.previewGradient} rounded-full opacity-30 blur-xl`}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          
                          {/* Icon */}
                          <motion.div 
                            className="text-7xl sm:text-8xl relative z-10 drop-shadow-2xl"
                            whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            {project.icon}
                          </motion.div>
                        </motion.div>
                        
                        {/* Project Title with Gradient */}
                        <div>
                          <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${project.previewGradient} bg-clip-text text-transparent`}>
                            {project.name}
                          </h3>
                          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            Live Preview Available
                          </p>
                        </div>
                        
                        {/* CTA Button with Enhanced Design */}
                        <motion.a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            if (!project.liveUrl.includes('demo')) {
                              e.preventDefault();
                              alert('Live demo coming soon!');
                            }
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${project.previewGradient} text-white rounded-xl font-bold transition-all text-sm shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 group/btn overflow-hidden`}
                        >
                          {/* Button Shine Effect */}
                          <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                          
                          <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="relative z-10">View Live Demo</span>
                          <motion.svg 
                            className="w-4 h-4 relative z-10" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </motion.svg>
                        </motion.a>
                        
                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-2 justify-center pt-2">
                          {project.tech.slice(0, 3).map((tech, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-full text-xs text-gray-300 flex items-center gap-1.5"
                            >
                              <span>{getTechIcon(tech)}</span>
                              <span>{tech}</span>
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Premium Corner Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-md border border-gray-600/50 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg">
                      <div className={`w-2 h-2 rounded-full ${project.langColor}`}></div>
                      <span className="text-gray-300">{project.language}</span>
                    </div>
                    
                    {/* Stars Badge */}
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-gray-900/80 backdrop-blur-md border border-yellow-500/30 rounded-lg text-xs font-semibold flex items-center gap-2">
                      <span>{project.stars}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        );

      case 'skills':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* NPM Install Output Style */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 sm:p-6 font-mono">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-xs sm:text-sm text-gray-500">npm install --dependencies</span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    category: 'Languages',
                    icon: '💻',
                    packages: [
                      { name: 'java', version: '^17.0.0', status: 'installed' },
                      { name: 'javascript', version: 'ES6+', status: 'installed' },
                      { name: 'typescript', version: '^5.0.0', status: 'installed' },
                    ],
                  },
                  {
                    category: 'Frameworks',
                    icon: '⚡',
                    packages: [
                      { name: 'react', version: '^18.0.0', status: 'installed' },
                      { name: 'node', version: '^20.0.0', status: 'installed' },
                      { name: 'express', version: '^4.18.0', status: 'installed' },
                    ],
                  },
                  {
                    category: 'Cloud & DevOps',
                    icon: '☁️',
                    packages: [
                      { name: 'aws-ec2', version: 'latest', status: 'installed' },
                      { name: 'aws-s3', version: 'latest', status: 'installed' },
                      { name: 'aws-ses', version: 'latest', status: 'installed' },
                      { name: 'aws-sns', version: 'latest', status: 'installed' },
                      { name: 'aws-sqs', version: 'latest', status: 'installed' },
                    ],
                  },
                ].map((cat, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-purple-400 font-semibold mb-2">
                      <span className="text-lg">{cat.icon}</span>
                      <span>// {cat.category}</span>
                    </div>
                    {cat.packages.map((pkg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 text-xs sm:text-sm"
                      >
                        <span className="text-green-400">✓</span>
                        <span className="text-cyan-400 min-w-[100px] sm:min-w-[120px]">{pkg.name}</span>
                        <span className="text-gray-600">@</span>
                        <span className="text-yellow-400">{pkg.version}</span>
                        <div className="flex-1 flex items-center gap-2">
                          <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden max-w-[100px]">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: '100%' }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            />
                          </div>
                          <span className="text-gray-600 text-xs hidden sm:inline">100%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-green-400">
                ✓ All packages installed successfully
              </div>
            </div>
          </motion.div>
        );

      case 'education':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Git Log Style */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 sm:p-6 font-mono">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-xs sm:text-sm text-gray-500">git log --education</span>
              </div>
              
              <div className="space-y-4">
                {/* Commit Entry */}
                <div className="border-l-2 border-yellow-500 pl-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-yellow-400 text-lg">●</span>
                    <div className="flex-1">
                      <div className="text-cyan-400 font-semibold text-sm sm:text-base">commit 8a1c2e4f (HEAD {'->'} main)</div>
                      <div className="text-xs text-gray-500 mt-1">Author: Divyanshu Singh</div>
                      <div className="text-xs text-gray-500">Date: Aug 2024</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-sm text-gray-300">
                    <div className="text-white font-semibold mb-2">🎓 Graduated: B.Tech Computer Science</div>
                    <div className="text-gray-400 space-y-1 text-xs sm:text-sm">
                      <div>• University: <span className="text-cyan-400">MAHARSHI DAYANAND UNIVERSITY (MDU)</span></div>
                      <div>• CGPA: <span className="text-green-400 font-semibold">8.1/10</span></div>
                      <div>• Duration: <span className="text-purple-400">Aug 2020 - Aug 2024</span></div>
                      <div>• Location: <span className="text-orange-400">New Delhi, India</span></div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Computer Science', 'CGPA 8.1', '4 Years', 'B.Tech'].map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs border border-cyan-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'CGPA', value: '8.1', icon: '📊', color: 'green' },
                { label: 'Years', value: '4', icon: '📅', color: 'blue' },
                { label: 'Degree', value: 'B.Tech', icon: '🎓', color: 'purple' },
                { label: 'Status', value: 'Graduate', icon: '✓', color: 'cyan' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-center hover:border-cyan-500 transition-all"
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                  <div className="text-lg text-cyan-400 font-bold">{stat.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'contact':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-6">
              {/* Contact Header */}
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 font-mono">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-xs sm:text-sm text-gray-500">contact.md</span>
                </div>
                <div className="text-gray-300 text-sm sm:text-base">
                  <span className="text-cyan-400">#</span> <span className="text-white font-bold">Get In Touch</span>{'\n\n'}
                  <span className="text-gray-400">I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 sm:p-6 font-mono">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">⚡ Quick Actions</div>
                <div className="space-y-2">
                  {[
                    { cmd: 'npm run email', icon: '✉️', label: 'divyanshusingh.hire@gmail.com', displayLabel: 'Send Email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=divyanshusingh.hire@gmail.com&su=Hello%20Divyanshu&body=Hi%20Divyanshu,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect.%0D%0A%0D%0ABest%20regards', copyValue: 'divyanshusingh.hire@gmail.com' },
                    { cmd: 'npm run call', icon: '📞', label: '+91 7906726655', displayLabel: '+91 7906726655', href: 'tel:+917906726655', copyValue: '+91 7906726655' },
                    { cmd: 'npm run linkedin', icon: '💼', label: 'LinkedIn Profile', displayLabel: 'Connect on LinkedIn', href: 'https://www.linkedin.com/in/divyanshu-singh-624700221', copyValue: 'https://www.linkedin.com/in/divyanshu-singh-624700221' },
                    { cmd: 'npm run github', icon: '💻', label: 'GitHub Profile', displayLabel: 'View GitHub Profile', href: 'https://github.com/divyanshu2003singh', copyValue: 'https://github.com/divyanshu2003singh' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-stretch gap-1.5">
                      <motion.a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        onMouseEnter={() => { setIsHovering(true); setCursorIcon(item.icon); }}
                        onMouseLeave={() => { setIsHovering(false); setCursorIcon(''); }}
                        whileHover={{ x: 3, backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded hover:border-l-2 hover:border-cyan-400 transition-all group flex-1 min-w-0"
                      >
                        <span className="text-lg sm:text-xl flex-shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-500 truncate">{item.cmd}</div>
                          <div className="text-xs sm:text-sm text-cyan-400 group-hover:text-cyan-300 truncate">{item.displayLabel}</div>
                        </div>
                        <div className="hidden sm:flex items-center gap-1 text-xs text-gray-600 group-hover:text-cyan-400 flex-shrink-0">
                          <span>RUN</span>
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </motion.a>
                      <div className="flex items-center">
                        <CopyButton text={item.copyValue} label={item.label} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Info */}
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 sm:p-6 font-mono overflow-x-auto">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-xs sm:text-sm text-gray-500">status.json</span>
                </div>
                <pre className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                <span className="text-yellow-400">const</span> <span className="text-cyan-400">status</span> <span className="text-white">=</span> {'{'}{'\n'}
                {'  '}<span className="text-green-400">availability</span>: <span className="text-orange-400">"Open to opportunities"</span>,{'\n'}
                {'  '}<span className="text-green-400">response_time</span>: <span className="text-orange-400">"Within 24 hours"</span>,{'\n'}
                {'  '}<span className="text-green-400">preferred_contact</span>: <span className="text-orange-400">"Email"</span>,{'\n'}
                {'  '}<span className="text-green-400">timezone</span>: <span className="text-orange-400">"IST (UTC+5:30)"</span>,{'\n'}
                {'}'}<span className="text-gray-500">;</span>
              </pre>
              </div>

              {/* Contact Form */}
              <ContactForm />
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`min-h-screen text-gray-300 font-[family-name:var(--font-inter)] relative ${isResizing ? 'select-none' : ''}`}
      style={{ backgroundColor: theme.bg }}
    >
      {/* Animated Background */}
      <AnimatedBackground theme={theme} />
      
      {/* Command Palette */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        setActiveSection={setActiveSection}
        setTerminalCollapsed={setTerminalCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        setCurrentTheme={setCurrentTheme}
      />
      
      {/* Custom Cursor Follower */}
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
      {/* VS Code-like top bar */}
      <div className="bg-[#323233] border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-gray-400 font-[family-name:var(--font-space)] hidden sm:block flex items-center gap-2">
            <span className="text-cyan-400">divyanshu-portfolio</span>
            <span className="text-gray-600">—</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              DevForge Studio ⚡
            </span>
          </span>
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="sm:hidden text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-mono">
          {mounted && currentTime ? (
            <>
              {/* Mobile: Short date format */}
              <span className="sm:hidden">{currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • </span>
              {/* Desktop: Full date format */}
              <span className="hidden sm:inline">{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} • </span>
              {/* Time - Always visible */}
              <span className="whitespace-nowrap">{currentTime.toLocaleTimeString()}</span>
            </>
          ) : (
            <span className="whitespace-nowrap">--:--:--</span>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
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
      )}

      {/* Menu bar with functional dropdown */}
      <div className="hidden sm:flex bg-[#2d2d30] border-b border-gray-800 px-4 py-1 gap-6 text-sm relative">
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
              <a href="/Divyanshu_Singh_Resume.pdf" download className="w-full text-left px-4 py-2 text-gray-300 hover:bg-[#2d2d30] hover:text-white transition-colors block">
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

        <div className="relative">
          <button 
            onClick={() => {
              console.log('Terminal button clicked. Current state:', terminalCollapsed);
              // Toggle terminal open/closed
              setTerminalCollapsed(!terminalCollapsed);
              
              if (terminalCollapsed) {
                // Opening terminal
                console.log('Opening terminal');
                setTerminalHeight(250);
                setTerminalTab('terminal');
                setTerminalHistory(prev => [...prev, '> Terminal activated! Type "help" for commands 💻']);
                
                // Wait for React to re-render then focus
                setTimeout(() => {
                  const terminal = document.querySelector('input[type="text"]') as HTMLInputElement;
                  terminal?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  terminal?.focus();
                  
                  // Add a visual indicator with border
                  const terminalDiv = terminal?.closest('.bg-\\[\\#1e1e1e\\]') as HTMLElement;
                  if (terminalDiv) {
                    terminalDiv.style.border = '2px solid rgba(6, 182, 212, 0.8)';
                    terminalDiv.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.6), inset 0 0 20px rgba(6, 182, 212, 0.2)';
                    setTimeout(() => {
                      terminalDiv.style.border = '';
                      terminalDiv.style.boxShadow = '';
                    }, 2000);
                  }
                }, 300);
              } else {
                // Closing terminal
                console.log('Closing terminal');
              }
              
              setShowMenu(null);
            }}
            className="text-gray-400 hover:text-white transition-colors hover:bg-gray-700 px-2 py-1 rounded"
          >
            Terminal
          </button>
        </div>

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

      <div className="flex h-[calc(100vh-88px)] sm:h-[calc(100vh-88px)]">
        {/* File Explorer Sidebar - Hidden on mobile */}
        <motion.div 
          initial={false}
          animate={{ width: sidebarCollapsed ? 48 : 256 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="hidden lg:flex bg-[#252526] border-r border-gray-800 flex-col relative"
        >
          {/* Collapse/Expand Button - Fixed positioning */}
          <div className="fixed top-[120px] z-[999] group/toggle" style={{ left: sidebarCollapsed ? '36px' : '244px' }}>
            <motion.button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-8 h-8 bg-gradient-to-r from-[#2d2d30] to-[#252526] border-2 border-cyan-500/30 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500 transition-all shadow-xl hover:shadow-cyan-500/50 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                left: sidebarCollapsed ? '36px' : '244px',
                boxShadow: [
                  '0 0 10px rgba(6, 182, 212, 0.3)',
                  '0 0 20px rgba(6, 182, 212, 0.5)',
                  '0 0 10px rgba(6, 182, 212, 0.3)'
                ]
              }}
              transition={{ 
                left: { duration: 0.3, ease: "easeInOut" },
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              <motion.svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </motion.svg>
            </motion.button>
            {/* Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1e1e1e] border border-cyan-500/50 rounded-lg text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover/toggle:opacity-100 transition-opacity pointer-events-none shadow-xl">
              {sidebarCollapsed ? "Expand" : "Collapse"} Sidebar
              <span className="text-cyan-400 ml-2 font-bold">⌘B</span>
            </div>
          </div>

          {!sidebarCollapsed && (
            <>
          <div className="p-3 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-800 flex items-center justify-between">
            <span>Explorer</span>
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            )}
          </div>
          
          {/* Search Input */}
          <div className="p-2 border-b border-gray-800">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search portfolio..."
                className="w-full bg-[#1e1e1e] text-gray-300 text-sm px-3 py-2 pr-8 rounded border border-gray-700 focus:border-cyan-500 focus:outline-none placeholder-gray-600"
              />
              <svg 
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex-1 p-2 overflow-y-auto">
            {searchQuery ? (
              // Search Results
              <>
                <div className="text-xs text-gray-400 mb-2 px-2 flex items-center justify-between">
                  <span>SEARCH RESULTS</span>
                  <span className="text-cyan-400">{searchResults.length}</span>
                </div>
                {searchResults.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.map((result, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          setActiveSection(result.section);
                          setSearchQuery('');
                          setSearchResults([]);
                        }}
                        onMouseEnter={() => { 
                          setIsHovering(true); 
                          setCursorIcon(result.icon);
                        }}
                        onMouseLeave={() => { setIsHovering(false); setCursorIcon(''); }}
                        whileHover={{ x: 5 }}
                        className="w-full text-left px-3 py-2 rounded text-sm transition-all text-gray-400 hover:bg-[#2a2d2e] hover:text-white group"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-base flex-shrink-0">{result.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold truncate">{result.title}</div>
                            {result.subtitle && (
                              <div className="text-xs text-gray-600 group-hover:text-gray-500 truncate mt-0.5">
                                {result.subtitle}
                              </div>
                            )}
                            <div className="text-xs text-cyan-500 mt-0.5">
                              {result.type} → {result.section}
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    <div className="text-3xl mb-2">🔍</div>
                    <div>No results found</div>
                    <div className="text-xs mt-1">Try different keywords</div>
                  </div>
                )}
              </>
            ) : (
              // Default File Tree
              <>
                <div className="text-xs text-gray-400 mb-2 px-2">PORTFOLIO</div>
                <div className="space-y-1">
                  {fileTree.map((file, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setActiveSection(file.section)}
                      onMouseEnter={() => { 
                        setIsHovering(true); 
                        setCursorIcon(file.name.split(' ')[0]);
                      }}
                      onMouseLeave={() => { setIsHovering(false); setCursorIcon(''); }}
                      whileHover={{ x: 5 }}
                      className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 transition-all ${
                        activeSection === file.section
                          ? 'bg-[#37373d] text-white'
                          : 'text-gray-400 hover:bg-[#2a2d2e]'
                      }`}
                    >
                      {file.name}
                    </motion.button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Status indicators */}
          <div className="p-3 border-t border-gray-800 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-gray-500">Connected</span>
            </div>
            <div className="text-gray-600 font-mono">Lines: {mounted ? lineCount : 0}</div>
            <div className="flex items-center gap-2 text-cyan-400">
              <span>👁️</span>
              <span className="font-mono">{visitorCount} {visitorCount === 1 ? 'visit' : 'visits'}</span>
            </div>
            <div className="text-gray-600 text-[10px]">
              Theme: {themes[currentTheme].name}
            </div>
          </div>
            </>
          )}

          {/* Collapsed Sidebar - Icon Only View */}
          {sidebarCollapsed && (
            <div className="flex-1 flex flex-col items-center py-4 gap-4">
              {fileTree.map((file, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveSection(file.section)}
                  whileHover={{ scale: 1.2, x: 2 }}
                  title={file.name}
                  className={`w-8 h-8 rounded flex items-center justify-center text-xl transition-all ${
                    activeSection === file.section
                      ? 'bg-[#37373d]'
                      : 'hover:bg-[#2a2d2e]'
                  }`}
                >
                  {file.name.split(' ')[0]}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab bar */}
          <div className="border-b flex items-center px-2" style={{ backgroundColor: theme.bgTertiary, borderColor: theme.border }}>
            <div className="flex items-center gap-2 px-4 py-2 border-r text-sm" style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
              <span>📄</span>
              <span style={{ color: theme.text }}>{fileTree.find(f => f.section === activeSection)?.name}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Terminal - Resizable like VS Code */}
          {!terminalCollapsed && (
          <div 
            style={{ height: `${terminalHeight}px` }}
            className="bg-[#1e1e1e] border-t border-gray-800 flex flex-col relative"
          >
            {/* Resize Handle - VS Code Style */}
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                setIsResizing(true);
              }}
              className={`absolute -top-1 left-0 right-0 h-3 cursor-ns-resize group z-50 flex items-center justify-center ${
                isResizing ? 'bg-cyan-500/20' : ''
              }`}
            >
              {/* Visual line indicator */}
              <div className={`w-full h-[2px] transition-all ${
                isResizing ? 'bg-cyan-500' : 'bg-transparent group-hover:bg-cyan-500/50'
              }`}></div>
              
              {/* Visual indicator dots */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
              </div>
            </div>
            
            <div 
              className="bg-[#2d2d30] px-4 py-1 flex items-center gap-4 border-b border-gray-800 text-sm"
              onDoubleClick={() => {
                if (terminalHeight > 300) {
                  setTerminalMinimized(true);
                  setTerminalHeight(150);
                } else {
                  setTerminalMinimized(false);
                  setTerminalHeight(400);
                }
              }}
            >
              <button
                onClick={() => setTerminalTab('terminal')}
                className={`px-2 py-1 transition-colors ${
                  terminalTab === 'terminal' ? 'text-white bg-[#1e1e1e]' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                TERMINAL
              </button>
              <button
                onClick={() => setTerminalTab('problems')}
                className={`px-2 py-1 transition-colors ${
                  terminalTab === 'problems' ? 'text-white bg-[#1e1e1e]' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                PROBLEMS
              </button>
              <button
                onClick={() => setTerminalTab('output')}
                className={`px-2 py-1 transition-colors ${
                  terminalTab === 'output' ? 'text-white bg-[#1e1e1e]' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                OUTPUT
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
              {terminalTab === 'terminal' && (
                <>
                  {terminalHistory.map((line, i) => (
                    <div 
                      key={i} 
                      className={
                        line.startsWith('$') ? 'text-green-400 font-semibold' : 
                        line.startsWith('✓') ? 'text-cyan-400' :
                        line.startsWith('❌') ? 'text-red-400' :
                        line.startsWith('💡') ? 'text-yellow-400' :
                        line.startsWith('━') ? 'text-gray-600' :
                        line.includes('📚') || line.includes('💻') || line.includes('👨‍💻') ? 'text-purple-400 font-semibold' :
                        'text-gray-400'
                      }
                    >
                      {line}
                    </div>
                  ))}
                  <form onSubmit={handleTerminalCommand} className="flex items-center gap-2 mt-2">
                    <span className="text-green-400 font-semibold">$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-600"
                      placeholder="Try: help, whoami, resume, tech..."
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 px-3 py-1 rounded border border-cyan-500/30 hover:border-cyan-500 transition-all flex items-center gap-1 text-sm font-semibold"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </form>
                  <div className="mt-2 text-xs text-gray-600">
                    💡 Quick commands: <span className="text-cyan-400">help</span> | <span className="text-cyan-400">whoami</span> | <span className="text-cyan-400">resume</span> | <span className="text-cyan-400">email</span> | <span className="text-cyan-400">clear</span>
                  </div>
                </>
              )}

              {terminalTab === 'problems' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-400 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">No problems detected</span>
                  </div>
                  <div className="text-gray-500 text-xs space-y-2">
                    <p>✓ All files compiled successfully</p>
                    <p>✓ No TypeScript errors</p>
                    <p>✓ No linting issues</p>
                    <p>✓ Portfolio is production ready!</p>
                  </div>
                  <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded text-green-400 text-xs">
                    <div className="font-semibold mb-1">🎉 Status: Ready to Deploy</div>
                    <div className="text-gray-400">Your portfolio is error-free and optimized for production.</div>
                  </div>
                </div>
              )}

              {terminalTab === 'output' && (
                <div className="space-y-2 text-xs">
                  <div className="text-cyan-400 font-semibold mb-3">Build Output:</div>
                  <div className="text-gray-400">
                    <span className="text-green-400">[✓]</span> Next.js 15.5.4 (Turbopack)
                  </div>
                  <div className="text-gray-400">
                    <span className="text-green-400">[✓]</span> Compiled successfully
                  </div>
                  <div className="text-gray-400">
                    <span className="text-green-400">[✓]</span> Portfolio optimized and ready
                  </div>
                  <div className="text-gray-400">
                    <span className="text-green-400">[✓]</span> All animations loaded
                  </div>
                  <div className="text-gray-400">
                    <span className="text-green-400">[✓]</span> Fonts: Inter, Poppins, Space Grotesk
                  </div>
                  
                  <div className="mt-4 text-purple-400 font-semibold">Performance Metrics:</div>
                  <div className="text-gray-400 ml-4 space-y-1">
                    <div>• Build time: Fast ⚡</div>
                    <div>• Bundle size: Optimized 📦</div>
                    <div>• Lighthouse score: 95+ 🚀</div>
                  </div>

                  <div className="mt-4 text-blue-400 font-semibold">Active Features:</div>
                  <div className="text-gray-400 ml-4 space-y-1">
                    <div>• IDE Theme UI ✓</div>
                    <div>• Framer Motion Animations ✓</div>
                    <div>• Interactive Terminal ✓</div>
                    <div>• Functional Menu System ✓</div>
                    <div>• Responsive Design ✓</div>
                    <div>• Dark Mode Support ✓</div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400">
                    <div className="font-semibold mb-1">💡 Pro Tip:</div>
                    <div className="text-gray-400">Use the terminal to navigate: type 'help' for all commands</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          )}

          {/* Terminal Toggle Button - Floating */}
          <div className="fixed bottom-4 right-8 z-[999] group/terminal-toggle">
            <motion.button
              onClick={() => {
                setTerminalCollapsed(!terminalCollapsed);
                if (terminalCollapsed) {
                  setTerminalHeight(250);
                }
              }}
              className="w-12 h-12 bg-gradient-to-r from-[#2d2d30] to-[#252526] border-2 border-cyan-500/30 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500 transition-all shadow-xl hover:shadow-cyan-500/50 backdrop-blur-sm relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: [
                  '0 0 15px rgba(6, 182, 212, 0.3)',
                  '0 0 25px rgba(6, 182, 212, 0.5)',
                  '0 0 15px rgba(6, 182, 212, 0.3)'
                ]
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              {/* Terminal icon */}
              {terminalCollapsed ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-xl"
                >
                  💻
                </motion.div>
              ) : (
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: terminalCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              )}
              
              {/* Notification Badge when collapsed */}
              {terminalCollapsed && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full border-2 border-gray-900 flex items-center justify-center"
                >
                  <motion.div
                    className="w-1.5 h-1.5 bg-white rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </motion.button>
            {/* Tooltip */}
            <div className="absolute bottom-full mb-3 right-0 px-3 py-1.5 bg-[#1e1e1e] border border-cyan-500/50 rounded-lg text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover/terminal-toggle:opacity-100 transition-opacity pointer-events-none shadow-xl">
              {terminalCollapsed ? "Show" : "Hide"} Terminal
              <span className="text-cyan-400 ml-2 font-bold">⌘J</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Job Fit Analyzer */}
      <JobFitAnalyzer />
    </div>
  );
}
