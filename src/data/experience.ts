import type { Experience, ExperienceType } from '../types'

/**
 * PLACEHOLDER CONTENT - replace with your real roles.
 * Dates use "YYYY-MM"; set `end: null` for a current position.
 * Entries are shown newest-first.
 */
export const experience: Experience[] = [
  {
    id: 'acme-swe',
    type: 'Job',
    title: 'Software Developer',
    organization: 'Acme Mobility Inc.',
    location: 'Toronto, ON (Hybrid)',
    start: '2024-06',
    end: null,
    highlights: [
      'Lead developer on a fleet-telematics dashboard used by 300+ commercial vehicles, cutting report generation time from minutes to under two seconds.',
      'Introduced end-to-end TypeScript across the API and client, reducing production type errors to near zero.',
      'Mentored two co-op students and ran the team\u2019s weekly code-review clinic.',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'northstar-intern',
    type: 'Internship',
    title: 'Software Engineering Intern',
    organization: 'Northstar Automotive Software',
    location: 'Waterloo, ON',
    start: '2023-05',
    end: '2023-12',
    highlights: [
      'Built an internal tool to visualise CAN-bus logs, replacing a manual spreadsheet workflow for the diagnostics team.',
      'Wrote integration tests that caught three regressions before release.',
    ],
    technologies: ['Python', 'FastAPI', 'Vue', 'SQLite'],
  },
  {
    id: 'freelance-dealer',
    type: 'Freelance',
    title: 'Full-Stack Developer (Contract)',
    organization: 'Independent Used-Car Dealership',
    location: 'Remote',
    start: '2023-01',
    end: '2023-04',
    highlights: [
      'Designed and delivered DealerDash, an inventory and lead-management system that replaced paper forms.',
      'Handled requirements gathering, deployment, and staff training end to end.',
    ],
    technologies: ['React', 'Express', 'MongoDB', 'Docker'],
  },
  {
    id: 'volunteer-stem',
    type: 'Volunteering',
    title: 'Coding Mentor',
    organization: 'Community STEM Garage',
    location: 'Toronto, ON',
    start: '2022-09',
    end: null,
    highlights: [
      'Teach high-school students the basics of web development through a build-your-own-car-club-site project.',
      'Organised a yearly hackathon themed around sustainable transportation.',
    ],
  },
  {
    id: 'campus-dev',
    type: 'Job',
    title: 'Web Developer (Part-Time)',
    organization: 'University IT Services',
    location: 'Toronto, ON',
    start: '2021-09',
    end: '2023-04',
    highlights: [
      'Maintained and modernised departmental sites, migrating legacy jQuery pages to React.',
      'Improved Lighthouse accessibility scores from the 60s to 95+ across the main portal.',
    ],
    technologies: ['React', 'JavaScript', 'PHP', 'MySQL'],
  },
]

export const experienceTypes: ExperienceType[] = ['Job', 'Internship', 'Freelance', 'Volunteering']

/** Format "YYYY-MM" to "Mon YYYY"; `null` becomes "Present". */
export function formatPeriod(start: string, end: string | null): string {
  const fmt = (ym: string) => {
    const [y, m] = ym.split('-').map(Number)
    return new Date(y, (m ?? 1) - 1, 1).toLocaleString('en-US', {
      month: 'short',
      year: 'numeric',
    })
  }
  return `${fmt(start)} \u2014 ${end ? fmt(end) : 'Present'}`
}
