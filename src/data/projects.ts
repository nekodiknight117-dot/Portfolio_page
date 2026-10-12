import type { Project } from '../types'

/**
 * PLACEHOLDER CONTENT - replace with your real projects.
 * Screenshots live in `public/projects/`. Each `slug` becomes the URL
 * `/projects/<slug>`, so keep slugs lowercase and URL-safe.
 */
export const projects: Project[] = [
  {
    slug: 'lap-logger',
    title: 'LapLogger',
    summary:
      'A telemetry dashboard that ingests OBD-II and GPS data from track days and turns it into lap-by-lap performance insights.',
    image: '/projects/lap-logger.svg',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'TimescaleDB', 'D3.js'],
    featured: true,
    year: 2025,
    links: {
      github: 'https://github.com/your-username/lap-logger',
      demo: 'https://lap-logger.example.com',
    },
    details: {
      problem:
        'Amateur track-day drivers collect gigabytes of raw sensor data but have no affordable way to visualise it. Existing tools are either locked to expensive hardware or export unreadable CSV dumps.',
      solution:
        'LapLogger accepts data from any OBD-II dongle and phone GPS, automatically detects lap boundaries, and renders synchronised speed, throttle, brake, and G-force traces so drivers can compare laps and find time.',
      features: [
        'Automatic lap detection using a start/finish geofence',
        'Overlay up to four laps with synchronised cursors across every chart',
        'Sector-time deltas and a theoretical best-lap calculator',
        'Shareable, read-only session links for coaches',
        'Offline-first ingestion with background sync',
      ],
      technicalDecisions: [
        'Chose TimescaleDB over plain PostgreSQL for hypertable compression on high-frequency sensor rows.',
        'Rendered charts with D3 on canvas instead of SVG to keep 60 fps with 50k+ points per trace.',
        'Normalised all sensor streams to a shared 20 Hz timeline on ingest so the UI never has to resample.',
      ],
      challenges: [
        'GPS jitter produced false lap boundaries; solved with a Kalman filter and hysteresis on the geofence.',
        'Different dongles report PIDs at different rates, requiring a flexible ingestion schema.',
      ],
      lessons: [
        'Pre-processing data at write time dramatically simplifies the read path.',
        'Canvas rendering is worth the extra complexity once you pass a few thousand data points.',
      ],
    },
  },
  {
    slug: 'garage-ledger',
    title: 'Garage Ledger',
    summary:
      'Maintenance tracker for multi-car households with service reminders, cost analytics, and a parts inventory.',
    image: '/projects/garage-ledger.svg',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    featured: true,
    year: 2024,
    links: {
      github: 'https://github.com/your-username/garage-ledger',
      demo: 'https://garage-ledger.example.com',
    },
    details: {
      problem:
        'Keeping track of oil changes, brake pads, and registration renewals across several vehicles usually means a shoebox of receipts or a messy spreadsheet.',
      solution:
        'Garage Ledger centralises every service record, predicts upcoming maintenance from mileage trends, and surfaces cost-per-kilometre analytics per vehicle.',
      features: [
        'Per-vehicle service history with receipt photo uploads',
        'Mileage-based and date-based reminders via email',
        'Parts inventory with low-stock alerts',
        'Cost breakdown charts by category and month',
        'CSV export for tax season',
      ],
      technicalDecisions: [
        'Server components in Next.js for fast first paint on the history views.',
        'Prisma with a strict relational schema to keep vehicles, services, and parts consistent.',
        'Scheduled Vercel cron job for reminder emails rather than a long-running worker.',
      ],
      challenges: [
        'Mileage predictions were noisy for infrequently driven cars; switched to a rolling 90-day average with a floor.',
      ],
      lessons: [
        'Simple heuristics with good defaults beat clever models for small personal datasets.',
      ],
    },
  },
  {
    slug: 'dealer-dash',
    title: 'DealerDash',
    summary:
      'Inventory and lead-management dashboard for an independent used-car dealership, replacing paper forms and three spreadsheets.',
    image: '/projects/dealer-dash.svg',
    technologies: ['React', 'TypeScript', 'Express', 'MongoDB', 'Redis', 'Docker', 'AWS'],
    featured: true,
    year: 2024,
    links: {
      github: 'https://github.com/your-username/dealer-dash',
    },
    details: {
      problem:
        'A local dealership was losing leads because inventory, test-drive bookings, and customer follow-ups lived in disconnected tools with no single source of truth.',
      solution:
        'DealerDash unifies inventory, leads, and bookings into one role-based dashboard, with a public listing page that stays in sync automatically.',
      features: [
        'Role-based access for sales, finance, and management',
        'Kanban lead pipeline with activity timeline',
        'Test-drive calendar with conflict detection',
        'Public inventory page generated from the same data',
        'Daily KPI digest emailed to managers',
      ],
      technicalDecisions: [
        'MongoDB for flexible vehicle attribute schemas across makes and models.',
        'Redis cache in front of the public listing endpoints to absorb traffic spikes from marketplace syndication.',
        'Dockerised deployment on AWS ECS with a blue/green release strategy.',
      ],
      challenges: [
        'Migrating years of inconsistent spreadsheet data required a multi-pass cleaning pipeline with manual review queues.',
      ],
      lessons: [
        'Spend time with end users early; the most-used feature (the activity timeline) was not in the original spec.',
      ],
    },
  },
  {
    slug: 'dyno-charts',
    title: 'DynoCharts',
    summary:
      'Open-source React component library for rendering dyno-style power and torque curves with interactive comparisons.',
    image: '/projects/dyno-charts.svg',
    technologies: ['React', 'TypeScript', 'Vite', 'Storybook', 'Vitest', 'npm'],
    featured: false,
    year: 2023,
    links: {
      github: 'https://github.com/your-username/dyno-charts',
      demo: 'https://dyno-charts.example.com',
    },
    details: {
      problem:
        'Tuning shops publish dyno results as static screenshots, making it impossible to compare runs or inspect specific RPM ranges.',
      solution:
        'DynoCharts is a tree-shakeable component library that renders power/torque curves from plain JSON, with hover tooltips, run overlays, and unit switching.',
      features: [
        'Overlay unlimited runs with per-run colour and legend toggles',
        'HP / kW and lb-ft / Nm unit switching',
        'Peak markers and area-under-curve stats',
        'Fully typed props with sensible defaults',
      ],
      technicalDecisions: [
        'Published as ESM with Vite library mode for minimal bundle impact.',
        'Storybook used as living documentation and the visual regression target.',
      ],
      challenges: [
        'Supporting both controlled and uncontrolled modes without duplicating state logic.',
      ],
      lessons: [
        'A good Storybook setup doubles as both docs and a test harness.',
      ],
    },
  },
  {
    slug: 'pit-wall',
    title: 'Pit Wall',
    summary:
      'Real-time race strategy simulator that models tyre degradation and pit windows for sim-racing leagues.',
    image: '/projects/pit-wall.svg',
    technologies: ['Vue', 'TypeScript', 'FastAPI', 'Python', 'WebSockets', 'SQLite'],
    featured: false,
    year: 2023,
    links: {
      github: 'https://github.com/your-username/pit-wall',
    },
    details: {
      problem:
        'Sim-racing league strategists had to eyeball pit windows in spreadsheets mid-race, often too slowly to react to safety cars.',
      solution:
        'Pit Wall streams live lap times over WebSockets and continuously re-solves the optimal pit strategy, highlighting undercut and overcut opportunities.',
      features: [
        'Live timing ingestion from the game telemetry API',
        'Tyre degradation model fitted per track and compound',
        'What-if scenarios for safety-car and weather changes',
      ],
      technicalDecisions: [
        'FastAPI with async WebSockets for low-latency pushes to the strategy UI.',
        'Kept the solver in pure Python with NumPy for easy iteration by non-frontend contributors.',
      ],
      challenges: [
        'Keeping the UI responsive while recomputing strategy on every lap; moved solving to a worker process.',
      ],
      lessons: [
        'Design the data model around the questions you want to answer, not the shape of the incoming feed.',
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
