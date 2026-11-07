import type { Profile } from '../types'

/**
 * Populated from Nekodi Knight's resume. Fields marked TODO still need
 * personal input (LinkedIn URL, any wording you want to tweak).
 */
export const profile: Profile = {
  name: 'Nekodi Knight',
  role: 'Software Developer ',
  tagline: 'Building secure, data-driven software from the API layer to the dashboard.',
  location: 'New York, NY',
  email: 'nekodiknight117@gmail.com',
  phone: '516-650-3300',
  photo: '/profile.jpg',
  intro:
    'Information Systems graduate (Magna Cum Laude) and CompTIA Security+ certified. I build full-stack ' +
    'applications with FastAPI, Spring Boot, and React, train PyTorch models on real-world traffic and market data, and ' +
    'bring a security-first mindset to teams.',
  bio: [
    'I am a new grad based in New York. I recently earned my Bachelor of Science in Information Systems from Brooklyn College (CUNY), graduating Magna Cum Laude, and I hold the CompTIA Security+ certification with Network+ in progress.',
    'My work sits where software engineering meets security. I have engineered real-time data pipelines and AI models for projects like Theme-Trader and Swell Scan, hardened Linux systems against DISA STIGs as a CodePath Cybersecurity Fellow, and supported 16,000+ users and 4,000+ workstations in an enterprise hospital environment.',
    'I care about systems that are fast, reliable, and secure by design. Whether it is an API, a SIEM dashboard, or an intrusion-detection model, I want to understand every component, measure what matters, and keep improving it.',
  ],
  specialties: [
    {
      title: 'Full-Stack Development',
      description:
        'Type-safe APIs and real-time UIs with FastAPI, SQLAlchemy, React, and Vite, from the ORM layer to the dashboard.',
      icon: 'code',
    },
    {
      title: 'Cybersecurity & Compliance',
      description:
        'Risk assessment, RMF and A&A workflows, NIST SP 800-53 controls, and DISA STIG hardening on Linux and Windows.',
      icon: 'server',
    },
    {
      title: 'AI & Data Pipelines',
      description:
        'PyTorch models and Pandas pipelines that turn high-volume network traffic and market data into actionable signals.',
      icon: 'cpu',
    },
    {
      title: 'Network & Infrastructure',
      description:
        'Active Directory, TCP/IP and OSI fundamentals, Splunk, Snort, Wireshark, and Nmap for monitoring and incident response.',
      icon: 'database',
    },
  ],
  socials: [
    { label: 'GitHub', url: 'https://github.com/nekodiknight117-dot', icon: 'github' },
    // TODO: replace with your real LinkedIn profile URL
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/nekodi-knight', icon: 'linkedin' },
    { label: 'Email', url: 'mailto:nekodiknight117@gmail.com', icon: 'mail' },
  ],
  resumePdf: '/resume.pdf',
}
