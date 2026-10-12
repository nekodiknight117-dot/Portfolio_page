import { Code2, Database, Layers, Server, Wrench, type LucideProps } from 'lucide-react'
import { PageTransition } from '../components/PageTransition'
import { SEO } from '../components/SEO'
import { Card } from '../components/ui/Card'
import { Gauge } from '../components/ui/Gauge'
import { SectionHeading } from '../components/ui/SectionHeading'
import { skillCategories, skillsByCategory } from '../data/skills'
import type { SkillCategory } from '../types'

const categoryIcons: Record<SkillCategory, React.ComponentType<LucideProps>> = {
  Languages: Code2,
  Frameworks: Layers,
  Databases: Database,
  Tools: Wrench,
  Platforms: Server,
}

const categoryBlurbs: Record<SkillCategory, string> = {
  Languages: 'The languages I write daily and the ones I can pick up for a project.',
  Frameworks: 'Libraries and frameworks I use to ship features quickly and safely.',
  Databases: 'Where the data lives, and the tooling I use to keep it consistent.',
  Tools: 'The everyday toolkit: version control, containers, testing, and design.',
  Platforms: 'Where the code runs, and how it gets there.',
}

export function Skills() {
  return (
    <PageTransition>
      <SEO title="Skills" description="Languages, frameworks, databases, tools, and platforms I work with." />
      <section className="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Instrument Cluster"
          title="Skills"
          description="Each gauge is a self-assessed proficiency reading from 0 to 100. Anything in the red zone is a daily driver."
        />

        <div className="mb-10 flex flex-wrap gap-4 text-sm text-asphalt-300">
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-6 rounded-full bg-amber-glow-500" /> Comfortable
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-6 rounded-full bg-racing-500" /> Daily driver (85+)
          </span>
        </div>

        <div className="space-y-8">
          {skillCategories.map((cat) => {
            const Icon = categoryIcons[cat]
            const items = skillsByCategory(cat)
            return (
              <Card key={cat} className="p-6 sm:p-8">
                <div className="mb-6 flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-racing-500/15 text-racing-400">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h2 className="text-2xl">{cat}</h2>
                    <p className="text-sm text-asphalt-300">{categoryBlurbs[cat]}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
                  {items.map((s) => (
                    <li key={s.name} className="flex justify-center">
                      <Gauge value={s.level} label={s.name} size={128} />
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>
      </section>
    </PageTransition>
  )
}
