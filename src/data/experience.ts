import type { Experience, ExperienceType } from '../types'

/**
 * Experience from Nekodi Knight's resume.
 * Dates use "YYYY-MM"; set `end: null` for a current position.
 * Entries are shown newest-first.
 */
export const experience: Experience[] = [
  {
    id: 'brooklyn-college-ta',
    type: 'Job',
    title: 'Teaching Assistant, Intro to Modern Programming Techniques',
    organization: 'Brooklyn College',
    location: 'Brooklyn, NY',
    start: '2026-01',
    end: '2026-05',
    highlights: [
      'Reinforced Java OOP techniques (inheritance, polymorphism, abstraction, encapsulation) for foundational student understanding.',
      'Evaluated student code submissions to ensure conceptual understanding and facilitate objective grading.',
      'Advised students through personalized assignment reviews and hosted exam prep sessions for 40+ students.',
      'Managed lab operations and grading, enabling instruction on advanced concepts bridging Java fundamentals and data structures and algorithms.',
    ],
    technologies: ['Java', 'OOP', 'Data Structures', 'Algorithms'],
  },
  {
    id: 'codepath-cyber-fellow',
    type: 'Fellowship',
    title: 'Cybersecurity Fellow',
    organization: 'CodePath',
    location: 'New York, NY',
    start: '2026-01',
    end: '2026-05',
    highlights: [
      'Applied the Risk Management Framework (RMF) and NIST SP 800-53 security controls to evaluate risk and support A&A workflows.',
      'Configured Snort IDS and Splunk SIEM to monitor Nginx traffic in alignment with DISA STIG compliance standards.',
      'Utilized Nmap for network discovery and Wireshark for troubleshooting connectivity and analyzing potential exploits.',
      'Managed a Linux security architecture, conducting STIG hardening reviews and log correlation to preserve system authorization.',
    ],
    technologies: ['RMF', 'NIST SP 800-53', 'DISA STIGs', 'Snort', 'Splunk', 'Nmap', 'Wireshark', 'Linux', 'Nginx'],
  },
  {
    id: 'hss-end-user-support',
    type: 'Internship',
    title: 'End User Support Intern',
    organization: 'Hospital for Special Surgery',
    location: 'New York, NY',
    start: '2024-06',
    end: '2024-09',
    highlights: [
      'Managed 16,000+ user identities via Active Directory, enforcing least-privilege access control principles.',
      'Restored 4,000+ workstations during a critical outage by executing disaster recovery protocols compliant with ISO 27001 and HIPAA.',
      'Resolved enterprise tickets covering Office 365, Windows 10+, and virtualization to maintain high operational uptime.',
      'Automated IT asset tracking and deployment for 1,000+ devices, streamlining recovery and continuous patch compliance auditing.',
      'Participated in patch management cycles and system vulnerability remediation to sustain organizational compliance and reduce endpoint risk.',
      'Resolved 100+ Tier II technical tickets weekly across Windows and virtualized environments, communicating complex resolutions clearly to non-technical stakeholders and medical personnel.',
    ],
    technologies: ['Active Directory', 'Office 365', 'Windows 10+', 'Virtualization', 'ISO 27001', 'HIPAA'],
  },
]

export const experienceTypes: ExperienceType[] = [
  'Job',
  'Internship',
  'Fellowship',
  'Freelance',
  'Volunteering',
]

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
