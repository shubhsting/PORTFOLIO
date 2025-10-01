export type Section = 'about' | 'experience' | 'projects' | 'skills' | 'education' | 'contact';

export type Theme = {
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

export type FileTreeItem = {
  name: string;
  section: Section;
};

