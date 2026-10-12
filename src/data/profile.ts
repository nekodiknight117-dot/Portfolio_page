import type { Profile } from '../types'

/**
 * PLACEHOLDER CONTENT - replace every field below with your own details.
 * Drop your photo into `public/` and update `photo`; put your resume at
 * `public/resume.pdf` (or change `resumePdf`).
 */
export const profile: Profile = {
  name: 'Alex Driver',
  role: 'Full-Stack Software Developer',
  tagline: 'Engineering software with the precision of a well-tuned machine.',
  location: 'Toronto, Canada',
  email: 'hello@example.com',
  photo: '/profile-placeholder.svg',
  intro:
    'I build fast, reliable web applications from the database up to the pixel. ' +
    'When I am not shipping features, you will find me under the hood of a project car ' +
    'or data-logging lap times at the local track.',
  bio: [
    'I am a software developer who fell in love with code the same way I fell in love with cars: by taking things apart to understand how they work, then putting them back together better. That curiosity drives how I approach engineering problems today.',
    'I focus on full-stack TypeScript development, with a strong interest in performance, developer tooling, and clean architecture. I enjoy working on products where the details matter and the feedback loop is tight.',
    'Outside of work I wrench on a project car, follow motorsport closely, and tinker with telemetry and data-logging hardware. Cars taught me that the best systems are the ones where every component has a clear purpose.',
  ],
  specialties: [
    {
      title: 'Front-End Engineering',
      description:
        'Responsive, accessible interfaces with React and TypeScript, tuned for performance.',
      icon: 'code',
    },
    {
      title: 'Back-End & APIs',
      description:
        'REST and GraphQL services in Node.js, with a focus on reliability and observability.',
      icon: 'server',
    },
    {
      title: 'Data & Databases',
      description:
        'Schema design, query optimisation, and migrations across SQL and NoSQL stores.',
      icon: 'database',
    },
    {
      title: 'Cloud & DevOps',
      description:
        'CI/CD pipelines, containerisation, and infrastructure on AWS and Vercel.',
      icon: 'cloud',
    },
  ],
  stats: [
    { label: 'Years coding', value: 5, suffix: '+' },
    { label: 'Projects shipped', value: 24 },
    { label: 'Commits this year', value: 1180 },
    { label: 'Cups of coffee', value: 999, suffix: '+' },
  ],
  socials: [
    { label: 'GitHub', url: 'https://github.com/your-username', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/your-handle', icon: 'linkedin' },
    { label: 'Email', url: 'mailto:hello@example.com', icon: 'mail' },
  ],
  resumePdf: '/resume.pdf',
}
