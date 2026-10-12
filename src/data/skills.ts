import type { Skill, SkillCategory } from '../types'

/**
 * PLACEHOLDER CONTENT - adjust names, levels (0-100), and categories.
 */
export const skills: Skill[] = [
  // Languages
  { name: 'TypeScript', level: 92, category: 'Languages' },
  { name: 'JavaScript', level: 92, category: 'Languages' },
  { name: 'Python', level: 78, category: 'Languages' },
  { name: 'SQL', level: 82, category: 'Languages' },
  { name: 'Java', level: 65, category: 'Languages' },
  { name: 'C#', level: 55, category: 'Languages' },

  // Frameworks
  { name: 'React', level: 93, category: 'Frameworks' },
  { name: 'Next.js', level: 85, category: 'Frameworks' },
  { name: 'Node.js / Express', level: 88, category: 'Frameworks' },
  { name: 'Tailwind CSS', level: 90, category: 'Frameworks' },
  { name: 'FastAPI', level: 70, category: 'Frameworks' },
  { name: 'Vue', level: 60, category: 'Frameworks' },

  // Databases
  { name: 'PostgreSQL', level: 85, category: 'Databases' },
  { name: 'MongoDB', level: 78, category: 'Databases' },
  { name: 'Redis', level: 72, category: 'Databases' },
  { name: 'SQLite', level: 80, category: 'Databases' },
  { name: 'Prisma ORM', level: 83, category: 'Databases' },

  // Tools
  { name: 'Git & GitHub', level: 92, category: 'Tools' },
  { name: 'Docker', level: 78, category: 'Tools' },
  { name: 'Vite', level: 88, category: 'Tools' },
  { name: 'Vitest / Jest', level: 80, category: 'Tools' },
  { name: 'Storybook', level: 70, category: 'Tools' },
  { name: 'Figma', level: 60, category: 'Tools' },

  // Platforms
  { name: 'AWS', level: 72, category: 'Platforms' },
  { name: 'Vercel', level: 88, category: 'Platforms' },
  { name: 'Netlify', level: 80, category: 'Platforms' },
  { name: 'GitHub Actions', level: 82, category: 'Platforms' },
  { name: 'Linux', level: 78, category: 'Platforms' },
]

export const skillCategories: SkillCategory[] = [
  'Languages',
  'Frameworks',
  'Databases',
  'Tools',
  'Platforms',
]

export function skillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter((s) => s.category === category)
}
