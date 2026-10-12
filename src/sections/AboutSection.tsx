import { motion } from 'framer-motion'
import { Award, GraduationCap, Sparkles } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'
import { careerGoals, education, interests } from '../data/education'
import { profile } from '../data/profile'
import { certifications } from '../data/skills'
import { publicUrl } from '../lib/publicUrl'
import { Section } from './Section'

export function AboutSection() {
  return (
    <Section id="about">
      {/* Intro */}
      <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:items-start">
        <motion.div
          className="relative mx-auto w-full max-w-xs lg:mx-0"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <div
            aria-hidden
            className="absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-accent-500/20 via-transparent to-highlight-500/10 blur-xl"
          />
          <div className="relative overflow-hidden rounded-2xl border border-asphalt-700 bg-asphalt-800 shadow-card">
            <img src={publicUrl(profile.photo)} alt={`Portrait of ${profile.name}`} className="aspect-[4/5] w-full object-cover object-top" />
          </div>
        </motion.div>

        <div>
          <SectionHeading eyebrow="About" title="About Me" className="mb-6" />
          <div className="space-y-4 text-lg text-asphalt-300">
            {profile.bio.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="surface p-4">
              <dt className="text-xs font-medium uppercase tracking-wider text-asphalt-400">Role</dt>
              <dd className="mt-1 font-display font-semibold text-asphalt-100">{profile.role}</dd>
            </div>
            <div className="surface p-4">
              <dt className="text-xs font-medium uppercase tracking-wider text-asphalt-400">Based in</dt>
              <dd className="mt-1 font-display font-semibold text-asphalt-100">{profile.location}</dd>
            </div>
            <div className="surface p-4">
              <dt className="text-xs font-medium uppercase tracking-wider text-asphalt-400">Focus</dt>
              <dd className="mt-1 font-display font-semibold text-asphalt-100">Software & Security</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Education */}
      <div className="mt-20">
        <SectionHeading eyebrow="Background" title="Education & Certifications" />
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="order-last p-6">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400">
                <Award size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-asphalt-400">Certifications</p>
                <ul className="mt-2 space-y-2">
                  {certifications.map((c) => (
                    <li key={c.name} className="flex flex-wrap items-center gap-2 text-asphalt-100">
                      <span className="font-medium">{c.name}</span>
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
          {education.map((e) => (
            <Card key={e.institution + e.degree} className="p-6">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-highlight-500/15 text-highlight-400">
                  <GraduationCap size={22} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-asphalt-400">
                    {e.start ? `${e.start} \u2013 ${e.end}` : e.end}
                  </p>
                  <h3 className="mt-1 text-xl">
                    {e.degree}, {e.field}
                  </h3>
                  <p className="text-asphalt-300">{e.institution}</p>
                  {e.highlights && (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-asphalt-300">
                      {e.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Goals + interests */}
      <div className="mt-20 grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Goals" title="Career Goals" />
          <ol className="space-y-4">
            {careerGoals.map((g, i) => (
              <li key={g} className="surface flex gap-4 p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-500/15 font-display text-sm font-bold text-accent-400">
                  {i + 1}
                </span>
                <p className="text-asphalt-300">{g}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <SectionHeading eyebrow="Interests" title="Outside of Work" />
          <div className="grid gap-4 sm:grid-cols-2">
            {interests.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Card interactive className="h-full p-5">
                  <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400">
                    <Sparkles size={18} />
                  </span>
                  <h3 className="text-lg">{it.title}</h3>
                  <p className="mt-1.5 text-sm text-asphalt-300">{it.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
