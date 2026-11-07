import type { Skill, SkillCategory } from '../types'

/** Skills from Nekodi Knight's resume, grouped by category. */
export const skills: Skill[] = [
  // Languages
  { name: 'Python', category: 'Languages' },
  { name: 'Java', category: 'Languages' },
  { name: 'SQL', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'Bash', category: 'Languages' },
  { name: 'HTML', category: 'Languages' },
  { name: 'CSS', category: 'Languages' },
  { name: 'C++', category: 'Languages' },
  { name : 'Golang', category: 'Languages' },
  { name : 'Typescript', category: 'Languages' },
  // Frameworks
  { name: 'FastAPI', category: 'Frameworks' },
  { name: 'React', category: 'Frameworks' },
  { name: 'PyTorch', category: 'Frameworks' },
  { name: 'SQLAlchemy', category: 'Frameworks' },
  { name: 'Pandas', category: 'Frameworks' },
  { name: 'Tailwind CSS', category: 'Frameworks' },
  { name: 'Spring Boot', category: 'Frameworks' },
  { name: 'Vite', category: 'Frameworks' },

  // Databases
  { name: 'Relational SQL', category: 'Databases' },
  { name: 'SQLAlchemy ORM', category: 'Databases' },
  { name: 'Data Modeling', category: 'Databases' },

  // Security & Compliance
  { name: 'RMF / A&A', category: 'Security & Compliance' },
  { name: 'NIST SP 800-53', category: 'Security & Compliance' },
  { name: 'DISA STIGs', category: 'Security & Compliance' },
  { name: 'Risk Assessment', category: 'Security & Compliance' },
  { name: 'Incident Response', category: 'Security & Compliance' },
  { name: 'TCP/IP & OSI', category: 'Security & Compliance' },

  // Tools
  { name: 'Splunk', category: 'Tools' },
  { name: 'Snort', category: 'Tools' },
  { name: 'Wireshark', category: 'Tools' },
  { name: 'Nmap', category: 'Tools' },
  { name: 'Git & GitHub', category: 'Tools' },
  { name: 'Vite', category: 'Tools' },
  { name: 'VS Code / Cursor', category: 'Tools' },

  // Platforms
  { name: 'Linux', category: 'Platforms' },
  { name: 'Windows 10+', category: 'Platforms' },
  { name: 'Active Directory', category: 'Platforms' },
  { name: 'Office 365', category: 'Platforms' },
  { name: 'Virtualization', category: 'Platforms' },
]

export const skillCategories: SkillCategory[] = [
  'Languages',
  'Frameworks',
  'Databases',
  'Security & Compliance',
  'Tools',
  'Platforms',
]

export function skillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter((s) => s.category === category)
}

/** Certifications shown on the Skills and Resume pages. */
export const certifications: { name: string; status?: string }[] = [
  { name: 'CompTIA Security+ (SY0-701)' },
  { name: 'Certified Cisco Network Associate (CCNA)', status: 'In progress' },
]
