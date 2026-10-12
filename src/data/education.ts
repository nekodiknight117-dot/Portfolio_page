import type { Education, Interest } from '../types'

/**
 * PLACEHOLDER CONTENT - replace with your education, goals, and interests.
 */
export const education: Education[] = [
  {
    institution: 'University of Toronto',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    start: '2020',
    end: '2024',
    highlights: [
      'Specialist in Software Engineering; minor in Mechanical Engineering electives',
      'Capstone: real-time telemetry pipeline for the Formula SAE team',
      'Dean\u2019s List, 2022 and 2023',
    ],
  },
  {
    institution: 'Online / Self-Directed',
    degree: 'Certifications',
    field: 'Cloud and Web',
    start: '2022',
    end: '2024',
    highlights: ['AWS Certified Cloud Practitioner', 'Meta Front-End Developer Professional Certificate'],
  },
]

export const careerGoals: string[] = [
  'Grow into a senior full-stack role on a product team where performance and craftsmanship matter.',
  'Work at the intersection of software and vehicles: telematics, connected-car platforms, or motorsport data.',
  'Contribute to open-source developer tooling and mentor newer engineers along the way.',
]

export const interests: Interest[] = [
  {
    title: 'Project Car',
    description:
      'Slowly restoring and lightly modifying a 90s sports coupe. Current focus: suspension refresh and a standalone ECU.',
  },
  {
    title: 'Motorsport & Telemetry',
    description:
      'Follow F1 and endurance racing closely, and spend weekends data-logging track days to shave tenths off lap times.',
  },
  {
    title: 'Sim Racing',
    description:
      'Compete in an amateur online league, which is how the Pit Wall strategy project got started.',
  },
  {
    title: 'Open Source',
    description:
      'Maintain a small charting library and contribute fixes upstream to the tools I rely on daily.',
  },
]
