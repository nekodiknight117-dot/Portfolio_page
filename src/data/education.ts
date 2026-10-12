import type { Education, Interest } from '../types'

/**
 * Education from Nekodi Knight's resume. Career goals and interests are
 * written to match the resume's direction; edit the wording freely.
 */
export const education: Education[] = [
  {
    institution: 'Brooklyn College, City University of New York',
    degree: 'Bachelor of Science',
    field: 'Information Systems',
    end: '2026',
    highlights: [
      'Graduated Magna Cum Laude',
      'Teaching Assistant for Intro to Modern Programming Techniques (Java)',
      'Capstone (CISC 4900): Swell Scan, an AI-driven DDoS intrusion-detection system',
    ],
  },
]

export const careerGoals: string[] = [
  'Land a role where software engineering and security overlap: building secure applications, detection tooling, or compliance automation.',
  'Complete CompTIA Network+ and continue toward deeper security certifications while shipping production software.',
  'Grow into an engineer who can design, build, and defend a system end to end, from the data pipeline to the SIEM dashboard.',
]

// TODO: personalise these with your own hobbies.
export const interests: Interest[] = [
  {
    title: 'Automotive',
    description:
      'A long-standing interest in cars and motorsport, and in how well-engineered systems come together.',
  },
  {
    title: 'Security Research',
    description:
      'Hands-on labs with Snort, Splunk, and Wireshark, and keeping up with new attack techniques and defensive tooling.',
  },
  {
    title: 'Applied AI',
    description:
      'Training models on real-world data, from network traffic to market volatility, and turning them into useful tools.',
  },
  {
    title: 'Teaching & Mentoring',
    description:
      'Helping newer programmers get comfortable with Java and object-oriented design, as I did as a Teaching Assistant.',
  },
]
