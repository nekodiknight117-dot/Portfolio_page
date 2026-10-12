import { useMemo, useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TechBadge } from '../components/ui/TechBadge'
import { allTechnologies, projects } from '../data/projects'
import { Section } from './Section'

export function ProjectsSection() {
  const [filter, setFilter] = useState<string | null>(null)

  const visible = useMemo(() => {
    const sorted = [...projects].sort((a, b) => b.year - a.year)
    return filter ? sorted.filter((p) => p.technologies.includes(filter)) : sorted
  }, [filter])

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Portfolio"
        title="Projects"
        description="Everything I have built, from production apps to open-source libraries. Filter by technology, then open a project for the full write-up."
      />

      <div className="mb-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by technology">
        <TechBadge label="All" active={filter === null} onClick={() => setFilter(null)} />
        {allTechnologies.map((t) => (
          <TechBadge key={t} label={t} active={filter === t} onClick={() => setFilter(filter === t ? null : t)} />
        ))}
      </div>

      <p className="mb-6 text-sm text-asphalt-400" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        {filter && (
          <>
            {' '}using <span className="text-accent-400">{filter}</span>
          </>
        )}
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </Section>
  )
}
