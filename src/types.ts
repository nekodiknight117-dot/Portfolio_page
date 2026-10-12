/**
 * Shared content types. All site content lives in `src/data/*` and conforms to
 * these shapes, so replacing placeholder content only requires editing data files.
 */

export interface SocialLink {
  label: string
  url: string
  /** Icon key resolved in the UI layer (see `components/SocialIcon.tsx`). */
  icon: 'github' | 'linkedin' | 'mail' | 'globe'
}

export interface Specialty {
  title: string
  description: string
  /** lucide icon name key resolved in the UI layer. */
  icon: 'code' | 'server' | 'database' | 'cloud' | 'cpu' | 'smartphone'
}

export interface Stat {
  label: string
  value: number
  suffix?: string
}

export interface Profile {
  name: string
  role: string
  tagline: string
  location: string
  email: string
  photo: string
  /** Short intro shown on the Home hero. */
  intro: string
  /** Longer bio paragraphs shown on About. */
  bio: string[]
  specialties: Specialty[]
  stats: Stat[]
  socials: SocialLink[]
  resumePdf: string
}

export interface ProjectLink {
  github?: string
  demo?: string
}

export interface Project {
  slug: string
  title: string
  summary: string
  image: string
  technologies: string[]
  featured: boolean
  year: number
  links: ProjectLink
  details: {
    problem: string
    solution: string
    features: string[]
    technicalDecisions: string[]
    challenges: string[]
    lessons: string[]
  }
}

export type SkillCategory =
  | 'Languages'
  | 'Frameworks'
  | 'Databases'
  | 'Tools'
  | 'Platforms'

export interface Skill {
  name: string
  /** Proficiency 0-100 displayed on the gauge. */
  level: number
  category: SkillCategory
}

export type ExperienceType = 'Job' | 'Internship' | 'Freelance' | 'Volunteering'

export interface Experience {
  id: string
  type: ExperienceType
  title: string
  organization: string
  location: string
  start: string
  /** `null` means current position. */
  end: string | null
  highlights: string[]
  technologies?: string[]
}

export interface Education {
  institution: string
  degree: string
  field: string
  start: string
  end: string
  highlights?: string[]
}

export interface Interest {
  title: string
  description: string
}
