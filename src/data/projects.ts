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
    image: '/projects/theme-trader.png',
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
    image: '/projects/swell-scan.png',
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
  {
    slug: 'dev-sync',
    title: 'Dev-Sync',
    summary:
      'Undergraduate developer collaboration platform where student developers post projects with open roles, apply to join teams, and coordinate through real-time chat, comments, and notifications.',
    image: '/projects/dev-sync.webp',
    technologies: [
      'FastAPI',
      'React',
      'TypeScript',
      'PostgreSQL',
      'SQLAlchemy',
      'Supabase',
      'WebSockets',
      'Tailwind CSS',
      'shadcn/ui',
      'JWT',
      'Python',
    ],
    featured: true,
    year: 2026,
    links: {
      github: 'https://github.com/yoomimoomi/Dev-Sync',
    },
    details: {
      problem:
        'Students with project ideas struggle to find teammates with the right skills on campus, and students looking to build experience struggle to find projects that need them. Coordination then scatters across group chats, spreadsheets, and email.',
      solution:
        'Dev-Sync is a full-stack matchmaking and collaboration hub built with a four-person team. Owners post projects with the roles, skills, and technologies they need; developers browse, filter, and apply for a specific role; accepted members form a team with shared messaging, comments, and notifications. The React/Vite client deploys to Vercel and the FastAPI backend runs on Render against PostgreSQL.',
      features: [
        'Project feed with search, filters by category, skill level, and team size, pagination, and a Popular page',
        'Role-based applications: apply for a specific open role, with owners accepting or declining and roles marked as filled',
        'Real-time application chat and a messaging hub powered by Supabase Realtime',
        'Comments on projects, a notification center, and a showcase page for completed work',
        'JWT authentication with Argon2 password hashing and route guards on the client',
        'Profile and team-management pages built on shadcn/ui components',
      ],
      technicalDecisions: [
        'Modeled accounts, projects, applications, teams, messages, comments, and notifications as SQLAlchemy 2.0 typed models over PostgreSQL, using array columns for roles, skills, and technologies.',
        'Used association proxies and model properties (accepted team members, filled roles) so the API returns ready-to-render data instead of pushing joins to the client.',
        'Chose Supabase Realtime for message delivery rather than hand-rolling a WebSocket broker, with the backend issuing Supabase-compatible JWTs.',
        'Split deployment: static Vite build on Vercel, long-running FastAPI on Render, because serverless functions fit poorly with WebSockets and ORM session lifecycles.',
        'Managed Python dependencies with uv for reproducible installs across the team.',
      ],
      challenges: [
        'Keeping realtime chat consistent with persisted messages across two services (FastAPI and Supabase) required a careful auth handoff and a thread-utility layer on the client.',
        'CORS and environment configuration across local, Vercel preview, and production origins took deliberate setup (origin regexes, per-environment variables).',
        'Creating a ui capable of handling communication of technical topics and providing a seamless experience for the user regardless of technical skill level.',
      ],
      lessons: [
        'Shape API responses around what the UI needs; it removes a whole class of client-side data wrangling.',
        'Deployment architecture is a design decision: picking hosts that match each service\u2019s runtime model saved more time than any single feature.',
        'Working in a team repo made conventions (typed schemas, env examples, READMEs) as important as the code itself.',
      ],
    },
  },
  {
    slug: 'food-inspect',
    title: 'FoodInspect',
    summary:
      'Hackathon-built Chrome extension that overlays NYC restaurant health-inspection grades directly on Google Maps listings, backed by NYC Open Data.',
    image: '/projects/food-inspect.jpg',
    technologies: ['JavaScript', 'Chrome Extensions', 'Python', 'Pandas', 'NYC Open Data', 'HTML', 'CSS'],
    featured: false,
    year: 2026,
    links: {
      github: 'https://github.com/yoomimoomi/MHC-Hackathon',
    },
    details: {
      problem:
        'New York publishes every restaurant health inspection, but the data lives on a separate city portal that nobody checks while picking a place to eat. The letter grade is only visible once you are already standing at the door.',
      solution:
        'FoodInspect is a Manifest V3 Chrome extension built at the MHC Hackathon. A content script watches the Google Maps listing panel and injects an inspection-grade badge next to a restaurant or bar\u2019s name. I built the data layer: a Python module that queries the NYC DOHMH inspection dataset through the Socrata API and returns the latest grade for a given establishment.',
      features: [
        'Grade badge injected into the Google Maps place panel for restaurants and bars',
        'MutationObserver-driven injection that survives Maps\u2019 single-page navigation and re-renders',
        'Place-type detection so the badge only appears on restaurants and bars, not every listing',
        'Idempotent updates: the badge is left alone when the place and grade have not changed',
        'Python lookup against the NYC Open Data inspection dataset with SoQL filtering and Pandas parsing',
      ],
      technicalDecisions: [
        'Queried NYC Open Data with a server-side SoQL `where` clause and `limit=1` instead of downloading the dataset, keeping lookups fast and rate-limit friendly.',
        'Escaped establishment names for SoQL string literals and handled empty results and missing columns explicitly so callers get `None` rather than exceptions.',
        'Keyed places by the panel heading text rather than the URL, which changes on zoom, to avoid flickering badges.',
        'Kept the extension permission-free (no host permissions beyond the Maps content script) to make installation low-friction.',
      ],
      challenges: [
        'Google Maps uses minified, unstable class names, so the content script had to locate the title and place-type nodes defensively and re-run on DOM mutations.',
        'Matching Maps listing names to the city\u2019s "DBA" field is fuzzy; exact matches work for many places but naming differences remain the main source of misses.',
        'Within hackathon time, the grade lookup was prototyped in Python while the extension used a placeholder resolver; wiring them through a small API is the natural next step.',
      ],
      lessons: [
        'Open-data APIs reward reading the query language docs first; a precise SoQL query replaced what would have been a large local data pipeline.',
        'Browser-extension UI is at the mercy of the host page; defensive selectors and idempotent rendering matter more than clever features.',
      ],
    },
  },
  {
    slug: 'portfolio-site',
    title: 'Portfolio Site',
    summary:
      'This website: a single-page React and TypeScript portfolio that captures my projects, skills, and experience, driven entirely by typed content files.',
    image: '',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Framer Motion', 'EmailJS'],
    featured: false,
    year: 2026,
    links: {
      github: 'https://github.com/nekodiknight117-dot/Portfolio_page',
    },
    details: {
      problem:
        'Resumes and GitHub profiles scatter the story of my work across formats. I wanted one place that presents projects, experience, and skills professionally, is easy to keep current, and can be hosted anywhere without a backend.',
      solution:
        'A single-page scroller built with React 19, TypeScript, and Tailwind CSS v4. All content lives in typed data files, so updating a project or role is a data edit rather than a UI change. The contact form sends through EmailJS, and the build deploys as static files to Vercel, Netlify, or GitHub Pages.',
      features: [
        'Single vertical scroller with anchored sections, smooth scrolling, and a navbar that tracks the section in view',
        'Dedicated project detail pages with problem/solution, features, technical decisions, and lessons learned',
        'Technology and experience-type filters, animated stat counters, and proficiency bars',
        'Contact form wired to EmailJS with validation, a honeypot field, and a mailto fallback',
        'Online resume summary alongside a downloadable PDF',
      ],
      technicalDecisions: [
        'Kept every piece of content in typed data files (src/data/*.ts) so the UI stays generic and the site is trivial to update.',
        'Used Tailwind v4 theme tokens and a small set of custom utilities for a consistent design system without a component library.',
        'Chose React Router with hash-based section links so deep links, old per-page URLs, and project detail routes all work on a static host.',
        'Bundled fonts with Fontsource and avoided runtime dependencies on third-party services other than EmailJS.',
      ],
      challenges: [
        'Making a sticky navbar highlight the correct section while scrolling, including the last section at the bottom of the page, needed a scroll-position approach rather than a plain IntersectionObserver.',
        'Supporting SPA routing on GitHub Pages, Netlify, and Vercel at once required per-host fallbacks (404 redirect script, _redirects, and vercel.json).',
      ],
      lessons: [
        'Separating content from presentation pays off immediately; most later changes were data edits.',
        'Small details such as scroll offsets, reduced-motion handling, and heading hierarchy are what make a site feel finished.',
      ],
    },
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
