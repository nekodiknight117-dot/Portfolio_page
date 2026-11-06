import { Award, Code2, Database, Layers, Server, ShieldCheck, Wrench, type LucideProps } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SkillPill } from '../components/ui/SkillPill'
import { certifications, skillCategories, skillsByCategory } from '../data/skills'
import type { SkillCategory } from '../types'
import { Section } from './Section'

const categoryIcons: Record<SkillCategory, React.ComponentType<LucideProps>> = {
  Languages: Code2,
  Frameworks: Layers,
  Databases: Database,
  'Security & Compliance': ShieldCheck,
  Tools: Wrench,
  Platforms: Server,
}

const categoryBlurbs: Record<SkillCategory, string> = {
  Languages: 'The languages I write daily and the ones I can pick up for a project.',
  Frameworks: 'Libraries and frameworks I use to ship features quickly and safely.',
  Databases: 'Where the data lives, and the tooling I use to keep it consistent.',
  'Security & Compliance': 'Frameworks, controls, and concepts I apply to assess risk and keep systems authorized.',
  Tools: 'The everyday toolkit: monitoring, packet analysis, scanning, and development.',
  Platforms: 'The operating systems and enterprise platforms I administer and build on.',
}

export function SkillsSection() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="Technical Skills"
        description="The languages, tools, and platforms I work with, grouped by category."
      />

      <Card className="mb-8 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-highlight-500/15 text-highlight-400">
            <Award size={22} />
          </span>
          <div className="flex-1">
            <h3 className="text-2xl">Certifications</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {certifications.map((c) => (
                <li
                  key={c.name}
                  className="inline-flex items-center gap-2 rounded-lg border border-asphalt-600 bg-asphalt-900 px-3 py-1.5 text-sm font-medium text-asphalt-100"
                >
                  {c.name}
                  {c.status && (
                    <span className="rounded bg-highlight-500/15 px-1.5 py-0.5 text-xs text-highlight-400">
                      {c.status}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {skillCategories.map((cat) => {
          const Icon = categoryIcons[cat]
          const items = skillsByCategory(cat)
          return (
            <Card key={cat} className="p-6 sm:p-8">
              <div className="mb-6 flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="text-2xl">{cat}</h3>
                  <p className="text-sm text-asphalt-300">{categoryBlurbs[cat]}</p>
                </div>
              </div>

              <ul className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <li key={s.name}>
                    <SkillPill name={s.name} />
                  </li>
                ))}
              </ul>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
