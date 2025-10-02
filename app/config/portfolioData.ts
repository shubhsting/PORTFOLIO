// Central configuration file for portfolio data
// This eliminates duplication across page.tsx, InteractiveTimeline, and JobFitAnalyzer

export type ExperienceItem = {
  id?: string;
  type?: 'work' | 'education';
  title: string;
  company?: string;
  organization?: string;
  organizationUrl?: string;
  companyUrl?: string;
  logo: string;
  startDate: string;
  endDate: string | null;
  period: string;
  location: string;
  workflow: string;
  status: string;
  achievements: string[];
  duration?: string;
};

export type ProjectItem = {
  name: string;
  repo?: string;
  url?: string;
  liveUrl?: string;
  description?: string;
  tech: string[];
  icon?: string;
  stars?: string;
  language?: string;
  langColor?: string;
  previewGradient?: string;
  features?: string[];
};

export type SkillCategory = {
  category: string;
  icon: string;
  packages?: Array<{
    name: string;
    version: string;
    status: string;
  }>;
  skills?: string[];
};

export type EducationItem = {
  degree: string;
  cgpa: number;
  university: string;
  startDate?: string;
  endDate?: string;
  period?: string;
  location?: string;
  tags?: string[];
};

// Experience Data
export const experienceData: ExperienceItem[] = [
  {
    id: '1',
    type: 'work',
    title: 'Software Engineer II',
    company: 'Atlassian',
    organization: 'Atlassian',
    organizationUrl: 'https://www.atlassian.com/',
    companyUrl: 'https://www.atlassian.com/',
    logo: '/atlassian_logo.jpeg',
    startDate: '2025-05-01',
    endDate: null,
    period: 'May 2025 - Present',
    duration: 'May 2025 - Present (6+ months)',
    location: 'Bengaluru, India',
    workflow: 'full-stack-development.yml',
    status: 'success',
    achievements: [
      'Building super cool stuff at Atlassian Marketplace',
    ],
  },
  {
    id: '2',
    type: 'work',
    title: 'Software Development Engineer II',
    company: 'Amazon',
    organization: 'Amazon',
    organizationUrl: 'https://www.amazon.com/',
    companyUrl: 'https://www.amazon.com/',
    logo: '/amazon_logo.jpeg',
    startDate: '2023-04-01',
    endDate: '2025-05-01',
    period: 'Apr 2023 - May 2025',
    duration: 'Apr 2023 - May 2025 (2 years and 1 month)',
    location: 'Bengaluru, India',
    workflow: 'optimize-and-scale.yml',
    status: 'success',
    achievements: [
      'Collaborated with 4 engineers to drive the end-to-end design and implementation of overhaul of 4 DQ services, which led to compute cost reduction of more than 50%, 18% decrease in storage bills & increased capability to handle 35k TPS across 7 lac tables.',
      'Spearheaded efforts to add support for identifying 15+ data quality issues obstructing table migration from EDX to Cairns across 50k tables, resulting in a cost-saving of $80k for the Cairns migration team.',
      'Enhanced Redshift team’s capabilities by introducing partition level granularity for DQ scans, adding support for DQ rules which reduced sync failures by 31%; achieved significant cost savings of around $10k/month.'
    ],
  },
  {
    id: '3',
    type: 'work',
    title: 'Software Development Engineer',
    company: 'Amazon',
    organization: 'Amazon',
    organizationUrl: 'https://www.amazon.com/',
    companyUrl: 'https://www.amazon.com/',
    logo: '/amazon_logo.jpeg',
    startDate: '2021-10-01',
    endDate: '2023-04-01',
    period: 'Oct 2021 - Apr 2023',
    duration: 'Oct 2021 - Apr 2023 (1 year 6 month)',
    location: 'Bengaluru, India',
    workflow: 'full-stack-development.yml',
    status: 'success',
    achievements: [
      'Teamed up with the Business Data Technology team to develop and launch MVP for a React, Java, TypeScript, and Python-based product to identify and mitigate data quality issues, resulting in an 18% enhancement in overall data reliability and accuracy across Andes (Amazon’s internal Data Lake).',
      'Designed and implemented internal Ray based Data Quality Framework for S3 that impacted more than 13k+ S3 buckets by detecting DQ issues, resulting in cost-saving of $5k per month.',
      'Architected the LLD, HLD, implementation and delivery of a robust reconciliation platform, collaborating closely with senior engineers and SDEs which ensured consistent outputs across 5+ compute platforms (Athena, Redshift, Glue, EMR etc), leading to a remarkable reduction in bug detection time from 3 months to a few hours.',
      'Created comprehensive wikis for new hire onboarding programs and DQ customers, earning recognition from senior engineers and achieving promotion to SDE-2 in just 1.4 years, surpassing the average promotion timeline by 6 months.'
    ],
  },
  {
    id: '4',
    type: 'work',
    title: 'Software Development Engineer Intern',
    company: 'Interviewbit',
    organization: 'Interviewbit',
    organizationUrl: 'https://www.interviewbit.com/',
    companyUrl: 'https://www.interviewbit.com/',
    logo: '/interviewbit_logo.jpeg',
    startDate: '2021-07-01',
    endDate: '2021-10-01',
    period: 'Jul 2021 - Oct 2021',
    duration: 'Jul 2021 - Oct 2021 (3 months)',
    location: 'Bengaluru, India',
    workflow: 'backend-development.yml',
    status: 'success',
    achievements: [
      'Collaborated with cross-functional teams to enhance the traditional interviewbit portal using Ruby on Rails and React, leading to resulting in a 30% decrease in page load time and a 15% decrease in customer support tickets.',
      'Developed the backend for IB’s standalone online compilers, enabling CRUD operations on code snippets, features like forking and sharing; improved user experience by driving a 10% increase user traffic.',
      'Orchestrated the migration of videos from S3 to YouTube, slashing monthly expenses from $900 to $100 for IB’s event pages, achieving a 90% reduction in hosting costs and maximizing profitability.'
    ],
  },
  {
    id: '5',
    type: 'work',
    title: 'Software Development Engineer Intern',
    company: 'Credflow',
    organization: 'Credflow',
    organizationUrl: 'https://www.credflow.in/',
    companyUrl: 'https://www.credflow.in/',
    logo: '/credflow_logo.png',
    startDate: '2021-01-01',
    endDate: '2021-06-01',
    period: 'Jan 2021 - Jun 2021',
    duration: 'Jan 2021 - Jun 2021 (6 months)',
    location: 'New Delhi, India',
    workflow: 'full-stack-development.yml',
    status: 'success',
    achievements: [
      'Orchestrated the successful development and launch of 3 product initiatives utilizing React.js, Node.js, Postgres, Git, Redis, Sequelize, Electron, and Express; resulting in increase in active customers from 500 to 7000.',
      'Built key features such as share receipts automatically, quotations, show tally Groups from scratch to directly impact more than 5000+ B2B clients.',
      'Engineered the implementation of S3-based data flow in Desktop Application for voluminous data sets of major clients, resulting in resulting in a 40% increase in tally data processing efficiency and driving significant business growth.'
    ],
  },
];

// Education Data (as timeline item)
export const educationTimelineItem: ExperienceItem = {
  id: '6',
  type: 'education',
  title: 'Bachelor of Engineering in Computer Science',
  organization: 'Guru Gobind Singh Indraprastha University (GGSIPU)',
  organizationUrl: '#',
  logo: '/guru_gobind_singh_indraprastha_university_logo.jpeg',
  startDate: '2017-08-01',
  endDate: '2021-06-01',
  period: 'Aug 2017 - Jun 2021',
  location: 'New Delhi, India',
  workflow: 'education-journey.yml',
  status: 'success',
  achievements: [
    'CGPA: 8.60/10',
    'Major: Computer Science',
    'Focus: Algorithms, Data Structures, Problem Solving'
  ],
};

// Education Data (detailed)
export const educationData: EducationItem = {
  degree: 'Bachelor of Engineering in Computer Science',
  cgpa: 8.60,
  university: 'Guru Gobind Singh Indraprastha University (GGSIPU)',
  startDate: '2017-08-01',
  endDate: '2021-06-01',
  period: 'Aug 2017 - Jun 2021',
  location: 'New Delhi, India',
  tags: ['Computer Science', 'CGPA 8.60', '4 Years', 'B.E.'],
};

// Projects Data
export const projectsData: ProjectItem[] = [
  {
    name: 'Zoomoboard',
    repo: 'shubhsting/zoomoboard',
    url: 'https://github.com/shubhsting/zoomoboard',
    description: 'The proposed application uses Node.js and supports features like write, erase, redo, undo, upload, download, night mode, current participants, meeting attendee report, sharing admin Rights etc along with profile viewing options.',
    tech: ['Node.js', 'JavaScript', 'React', 'MySQL', 'Socket.io', 'Sequelize'],
    icon: '📋',
    stars: '⭐ 15',
    language: 'JavaScript',
    langColor: 'bg-yellow-400',
    previewGradient: 'from-blue-500 via-purple-500 to-pink-500',
    features: [
      'Write, erase, redo, undo, upload, download features',
      'Night mode, current participants, meeting attendee report',
      'Sharing admin rights, profile viewing options',
    ],
  },
  {
    name: 'Pexcel',
    repo: 'shubhsting/pexcel',
    url: 'https://github.com/shubhsting/NODE_OSS_PEP/tree/master/Lec5_Excel_Electron',
    description: 'Contemporary template for achieving the functionalities of Microsoft Excel using Electron framework and JQuery library of Node.js which justifies the application of graph and recursion algorithm working together.',
    tech: ['Node.js', 'JavaScript', 'MongoDB', 'Electron', 'jQuery'],
    icon: '📊',
    stars: '⭐ 20',
    language: 'JavaScript',
    langColor: 'bg-green-500',
    previewGradient: 'from-green-500 via-emerald-500 to-teal-500',
    features: [
      'Contemporary template for achieving Microsoft Excel functionalities',
      'Electron framework and jQuery library implementation',
      'Graph and recursion algorithm working together',
    ],
  },
  {
    name: 'Ripen',
    repo: 'shubhsting/ripen',
    url: 'https://github.com/shubhsting/ripen',
    liveUrl: 'https://ripen.in',
    description: 'One stop solution for small early stage startups to manage customer community and lead management pipelines.',
    tech: ['Node.js', 'JavaScript', 'React.js', 'Redux', 'MongoDB', 'Docker', 'Nginx'],
    icon: '🔗',
    stars: '⭐ 10',
    language: 'Node.js, React.js',
    langColor: 'bg-orange-500',
    previewGradient: 'from-orange-500 via-red-500 to-pink-500',
    features: [
      'One stop solution for small early stage startups',
      'Customer community and lead management pipelines',
      'Comprehensive business management platform',
    ],
  },
];

// Skills Data
export const skillsData: SkillCategory[] = [
  {
    category: 'Languages',
    icon: '💻',
    packages: [
      { name: 'javascript', version: 'ES6+', status: 'installed' },
      { name: 'c++', version: '^17.0.0', status: 'installed' },
      { name: 'java', version: '^17.0.0', status: 'installed' },
      { name: 'python', version: '^3.9.0', status: 'installed' },
    ],
    skills: ['JavaScript', 'C++', 'Java', 'Python']
  },
  {
    category: 'Technologies/Frameworks',
    icon: '⚡',
    packages: [
      { name: 'node.js', version: '^20.0.0', status: 'installed' },
      { name: 'react.js', version: '^18.0.0', status: 'installed' },
      { name: 'ruby-on-rails', version: '^7.0.0', status: 'installed' },
      { name: 'springboot', version: '^3.0.0', status: 'installed' },
      { name: 'aws', version: 'latest', status: 'installed' },
      { name: 'docker', version: 'latest', status: 'installed' },
    ],
    skills: ['Node.js', 'React.js', 'Ruby on Rails', 'SpringBoot', 'AWS', 'Docker']
  },
  {
    category: 'Database',
    icon: '🗄️',
    packages: [
      { name: 'mysql', version: '^8.0.0', status: 'installed' },
      { name: 'dynamodb', version: 'latest', status: 'installed' },
      { name: 'mongodb', version: '^6.0.0', status: 'installed' },
    ],
    skills: ['MySQL', 'DynamoDB', 'MongoDB']
  },
  {
    category: 'Core Competencies',
    icon: '🎯',
    packages: [
      { name: 'data-structures', version: 'latest', status: 'installed' },
      { name: 'problem-solving', version: 'latest', status: 'installed' },
      { name: 'algorithms', version: 'latest', status: 'installed' },
    ],
    skills: ['Data Structures', 'Problem Solving', 'Algorithms']
  },
];

// Flat list of all skills for AI analyzer
export const allSkills: string[] = [
  // Languages
  'JavaScript', 'C++', 'Java', 'Python',
  // Technologies/Frameworks
  'Node.js', 'React.js', 'Ruby on Rails', 'SpringBoot', 'AWS', 'Docker',
  // Database
  'MySQL', 'DynamoDB', 'MongoDB',
  // Core Competencies
  'Data Structures', 'Problem Solving', 'Algorithms',
  // Additional skills
  'TypeScript', 'Express.js', 'REST APIs', 'Microservices', 'Git', 'CI/CD',
  'AWS EC2', 'AWS S3', 'AWS Redshift', 'Data Quality', 'Backend Development',
  'System Design', 'Scalable Architectures'
];

// Search data for quick reference
export const searchCompanies = [
  { name: 'Atlassian', role: 'Software Engineer II', section: 'experience', icon: '💼' },
  { name: 'Amazon', role: 'Software Development Engineer II', section: 'experience', icon: '💼' },
  { name: 'Interviewbit', role: 'Software Development Engineer Intern', section: 'experience', icon: '💼' },
  { name: 'Credflow', role: 'Software Development Engineer Intern', section: 'experience', icon: '💼' },
];

// Portfolio data for Job Fit Analyzer
export const portfolioDataForAI = {
  skills: allSkills,
  experience: experienceData.map(exp => ({
    title: exp.title,
    company: exp.company || exp.organization,
    duration: exp.period,
    achievements: exp.achievements,
  })),
  education: educationData,
  projects: projectsData.map(project => ({
    name: project.name,
    tech: project.tech,
    description: project.description,
  })),
};

// Personal Information
export const personalInfo = {
  name: 'Shubham Singh',
  title: 'Software Engineer II',
  company: 'Atlassian',
  location: 'New Delhi, India',
  email: 'shubhsting@gmail.com',
  github: 'shubhsting',
  linkedin: 'shubham-singh',
};

