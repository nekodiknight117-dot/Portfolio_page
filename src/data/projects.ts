import type { Project } from '../types'

/**
 * Projects from Nekodi Knight's resume. Replace the `image` SVGs in
 * `public/projects/` with real screenshots, and add `demo` links if you
 * deploy either app.
 */
export const projects: Project[] = [
  {
    slug: 'theme-trader',
    title: 'Theme-Trader',
    summary:
      'AI-powered investment platform that analyzes market volatility in real time and builds data-driven, theme-based portfolios around a user\u2019s interests.',
    image: '/projects/theme-trader.svg',
    technologies: ['FastAPI', 'React', 'WebSockets', 'Alpaca API', 'SQLAlchemy', 'Python', 'Vite', 'uv'],
    featured: true,
    year: 2026,
    links: {
      github: 'https://github.com/nekodiknight117-dot/Theme-trader',
    },
    details: {
      problem:
        'Building a portfolio around a theme (for example, EVs or cybersecurity) normally means hours of manual research and data entry across tickers, news, and price history, and the result is stale the moment the market moves.',
      solution:
        'Theme-Trader runs a real-time AI research pipeline that scores market volatility and assembles a fund from a user\u2019s interests, cutting manual data entry by roughly 95%. A high-frequency ingestion engine streams live prices and can execute trades automatically.',
      features: [
        'Real-time AI research pipeline that analyzes market volatility and proposes theme-based portfolios',
        'High-frequency ingestion engine on Alpaca WebSockets for sub-millisecond streaming updates',
        'Automated trade execution through the Alpaca API',
        'Type-safe ORM layer with FastAPI and SQLAlchemy for database management and data synchronization',
        'Modern React front end served by Vite, with Python dependencies managed by uv',
      ],
      technicalDecisions: [
        'Chose FastAPI for async request handling so WebSocket streams and REST endpoints share one process without blocking.',
        'Modeled the data layer with SQLAlchemy and typed schemas to keep ingestion, analysis, and UI in sync.',
        'Used Alpaca WebSockets rather than polling REST endpoints to achieve sub-millisecond update latency.',
        'Standardized on uv and Vite for fast, reproducible Python and JavaScript builds.',
      ],
      challenges: [
        'Keeping the UI responsive while thousands of streaming price updates arrive per second required batching and back-pressure on the WebSocket consumer.',
        'Reconciling live stream data with persisted records without race conditions drove the design of the ORM synchronization layer.',
      ],
      lessons: [
        'Streaming architectures need explicit back-pressure; otherwise the fastest producer sets the pace for the whole system.',
        'Typed data models at the boundary (API, ORM, UI) catch an entire category of bugs before runtime.',
      ],
    },
  },
  {
    slug: 'swell-scan',
    title: 'Swell Scan',
    summary:
      'AI-driven network intrusion detection system that streams traffic logs to a PyTorch model to flag DDoS attacks with sub-second latency, built for post-attack triage.',
    image: '/projects/swell-scan.svg',
    technologies: ['FastAPI', 'PyTorch', 'Pandas', 'JavaScript', 'React', 'Tailwind CSS', 'Python'],
    featured: true,
    year: 2026,
    links: {
      github: 'https://github.com/nekodiknight117-dot/DDOS-full-stack-CISC-4900',
    },
    details: {
      problem:
        'After a suspected DDoS attack, analysts have to sift through enormous traffic logs by hand to confirm what happened and which records were malicious. Commercial tooling is expensive and heavy for small teams and low-resource environments.',
      solution:
        'Swell Scan is a full-stack triage tool: upload or stream traffic logs, and a PyTorch model extracts high-dimensional traffic features to automatically flag anomalous DDoS patterns across thousands of records in under a second, surfaced in a clean React/Tailwind dashboard.',
      features: [
        'FastAPI endpoint that streams network traffic to the AI model in real time',
        'PyTorch predictive model that extracts high-dimensional traffic features and flags DDoS anomalies',
        'Sub-second classification across thousands of records',
        'Pandas pipelines for cleaning and processing large traffic datasets',
        'Responsive React and Tailwind CSS dashboard for simplified navigation and triage',
      ],
      technicalDecisions: [
        'Selected PyTorch for the detection model to iterate quickly on feature engineering and architecture.',
        'Pre-processed logs with Pandas so the model receives consistent, normalized feature vectors.',
        'Served inference behind FastAPI so the same API supports batch uploads and streaming input.',
        'Kept the front end lightweight (React + Tailwind) so the tool runs well on low-resource machines.',
      ],
      challenges: [
        'Balancing detection accuracy against false positives on imbalanced traffic data required careful feature selection and threshold tuning.',
        'Streaming large log files through the API without exhausting memory meant processing in chunks end to end.',
      ],
      lessons: [
        'Data preparation is most of the work in applied ML; a clean Pandas pipeline mattered as much as the model itself.',
        'Designing for low-resource environments forces good engineering discipline everywhere else.',
      ],
    },
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export const allTechnologies = Array.from(
  new Set(projects.flatMap((p) => p.technologies)),
).sort((a, b) => a.localeCompare(b))
