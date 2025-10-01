// Tech icon mapping
export const getTechIcon = (tech: string): string => {
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

// Function to calculate duration between two dates
export const calculateDuration = (startDate: string, endDate: string | null): string => {
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

