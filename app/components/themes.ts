import { Theme } from './types';

export const themes: Record<string, Theme> = {
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

