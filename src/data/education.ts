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
  'Land a role where I am building software that creates a positive impact on the world. The impact of the work I do is the very reason I am in this field.',
  'Continue to grow as a developer and engineer, and to learn from the best in the field.',
  'Grow into a leader who can mentor and guide other within a team.',
]

// TODO: personalise these with your own hobbies.
export const interests: Interest[] = [
  {
    title: 'Automotive',
    description:
      'A long-standing interest in cars and motorsport, I enjoy working on my car in my free time.',
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
