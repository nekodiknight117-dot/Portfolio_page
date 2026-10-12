import { useMemo, useState } from 'react'
import { PageTransition } from '../components/PageTransition'
import { ProjectCard } from '../components/ProjectCard'
import { SEO } from '../components/SEO'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TechBadge } from '../components/ui/TechBadge'
import { allTechnologies, projects } from '../data/projects'

export function Projects() {
  const [filter, setFilter] = useState<string | null>(null)

  const visible = useMemo(() => {
    const sorted = [...projects].sort((a, b) => b.year - a.year)
    return filter ? sorted.filter((p) => p.technologies.includes(filter)) : sorted
  }, [filter])

  return (
    <PageTransition>
      <SEO title="Projects" description="All of my projects with screenshots, technologies, and links." />
      <section className="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Garage"
          title="Projects"
          description="Everything I have built, from production apps to open-source libraries. Filter by technology to find what interests you."
        />

        <div className="mb-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by technology">
          <TechBadge label="All" active={filter === null} onClick={() => setFilter(null)} />
          {allTechnologies.map((t) => (
            <TechBadge key={t} label={t} active={filter === t} onClick={() => setFilter(filter === t ? null : t)} />
          ))}
        </div>

        <p className="mb-6 font-display text-sm uppercase tracking-wider text-asphalt-400" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          {filter && (
            <>
              {' '}using <span className="text-racing-400">{filter}</span>
            </>
          )}
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
