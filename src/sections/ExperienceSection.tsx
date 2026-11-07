import { Award, Briefcase, ChevronDown, HandHeart, Laptop, MapPin, School, type LucideProps } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Card } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TechBadge } from '../components/ui/TechBadge'
import { Timeline, TimelineItem } from '../components/ui/Timeline'
import { experience, experienceTypes, formatPeriod } from '../data/experience'
import { cn } from '../lib/cn'
import type { Experience, ExperienceType } from '../types'
import { Section } from './Section'

const PREVIEW_COUNT = 1

const typeIcons: Record<ExperienceType, React.ComponentType<LucideProps>> = {
  Job: Briefcase,
  Internship: School,
  Fellowship: Award,
  Freelance: Laptop,
  Volunteering: HandHeart,
}

const availableTypes = experienceTypes.filter((t) => experience.some((e) => e.type === t))

function ExperienceCard({ item }: { item: Experience }) {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow">{item.type}</p>
          <h3 className="mt-1 text-xl">{item.title}</h3>
          <p className="text-asphalt-200">{item.organization}</p>
        </div>
        <div className="text-right text-sm text-asphalt-400">
          <p className="font-medium text-highlight-400">{formatPeriod(item.start, item.end)}</p>
          <p className="mt-1 inline-flex items-center gap-1">
            <MapPin size={14} /> {item.location}
          </p>
        </div>
      </div>
      <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-asphalt-300">
        {item.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      {item.technologies && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {item.technologies.map((t) => (
            <li key={t}>
              <TechBadge label={t} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export function ExperienceSection() {
  const [filter, setFilter] = useState<ExperienceType | 'All'>('All')
  const [expanded, setExpanded] = useState(false)

  const items = useMemo(() => {
    const sorted = [...experience].sort((a, b) => b.start.localeCompare(a.start))
    return filter === 'All' ? sorted : sorted.filter((e) => e.type === filter)
  }, [filter])

  const visible = expanded ? items : items.slice(0, PREVIEW_COUNT)
  const hiddenCount = Math.max(0, items.length - PREVIEW_COUNT)

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Work Experience"
        description="Teaching, a cybersecurity fellowship, and enterprise IT support. Newest first."
      />

      <div className="mb-12 flex flex-wrap gap-2" role="group" aria-label="Filter by type">
        {(['All', ...availableTypes] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setFilter(t)
              setExpanded(false)
            }}
            aria-pressed={filter === t}
            className={cn(
              'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
              filter === t
                ? 'border-accent-500 bg-accent-500/15 text-accent-400'
                : 'border-asphalt-600 text-asphalt-300 hover:border-asphalt-400 hover:text-asphalt-100',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="text-asphalt-300">Nothing in this category yet.</p>
      ) : (
        <>
          <Timeline>
            {visible.map((e, i) => {
              const Icon = typeIcons[e.type]
              return (
                <TimelineItem key={e.id} index={i} marker={<Icon size={14} />}>
                  <ExperienceCard item={e} />
                </TimelineItem>
              )
            })}
          </Timeline>

          {hiddenCount > 0 && (
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
              className={cn(
                'mt-2 inline-flex items-center gap-2 rounded-lg border border-asphalt-600 bg-asphalt-800 px-4 py-2.5 text-sm font-medium text-asphalt-100 transition-colors',
                'hover:border-asphalt-400 hover:bg-asphalt-700',
              )}
            >
              <ChevronDown
                size={18}
                aria-hidden
                className={cn('transition-transform duration-200', expanded && 'rotate-180')}
              />
              <span>
                {expanded
                  ? 'Show less'
                  : `Show ${hiddenCount} more ${hiddenCount === 1 ? 'role' : 'roles'}`}
              </span>
            </button>
          )}
        </>
      )}
    </Section>
  )
}
