import type { Skill, SkillCategory } from '../types'

/**
 * Skills from Nekodi Knight's resume. `level` (0-100) is a self-assessed
 * proficiency shown on the gauges; adjust the numbers to taste.
 */
export const skills: Skill[] = [
  // Languages
  { name: 'Python', level: 90, category: 'Languages' },
  { name: 'Java', level: 85, category: 'Languages' },
  { name: 'SQL', level: 80, category: 'Languages' },
  { name: 'JavaScript', level: 78, category: 'Languages' },
  { name: 'Bash', level: 72, category: 'Languages' },

  // Frameworks
  { name: 'FastAPI', level: 88, category: 'Frameworks' },
  { name: 'React', level: 80, category: 'Frameworks' },
  { name: 'PyTorch', level: 75, category: 'Frameworks' },
  { name: 'SQLAlchemy', level: 80, category: 'Frameworks' },
  { name: 'Pandas', level: 82, category: 'Frameworks' },
  { name: 'Tailwind CSS', level: 74, category: 'Frameworks' },

  // Databases
  { name: 'Relational SQL', level: 80, category: 'Databases' },
  { name: 'SQLAlchemy ORM', level: 80, category: 'Databases' },
  { name: 'Data Modeling', level: 76, category: 'Databases' },

  // Security & Compliance
  { name: 'RMF / A&A', level: 82, category: 'Security & Compliance' },
  { name: 'NIST SP 800-53', level: 80, category: 'Security & Compliance' },
  { name: 'DISA STIGs', level: 78, category: 'Security & Compliance' },
  { name: 'Risk Assessment', level: 80, category: 'Security & Compliance' },
  { name: 'Incident Response', level: 75, category: 'Security & Compliance' },
  { name: 'TCP/IP & OSI', level: 85, category: 'Security & Compliance' },

  // Tools
  { name: 'Splunk', level: 78, category: 'Tools' },
  { name: 'Snort', level: 75, category: 'Tools' },
  { name: 'Wireshark', level: 80, category: 'Tools' },
  { name: 'Nmap', level: 80, category: 'Tools' },
  { name: 'Git & GitHub', level: 85, category: 'Tools' },
  { name: 'Vite', level: 78, category: 'Tools' },
  { name: 'VS Code / Cursor', level: 90, category: 'Tools' },

  // Platforms
  { name: 'Linux', level: 82, category: 'Platforms' },
  { name: 'Windows 10+', level: 88, category: 'Platforms' },
  { name: 'Active Directory', level: 85, category: 'Platforms' },
  { name: 'Office 365', level: 85, category: 'Platforms' },
  { name: 'Virtualization', level: 74, category: 'Platforms' },
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
  { name: 'CompTIA Network+ (N10-009)', status: 'In progress' },
]
