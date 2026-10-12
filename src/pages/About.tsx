import { motion } from 'framer-motion'
import { Car, Flag, GraduationCap, Heart } from 'lucide-react'
import { PageTransition } from '../components/PageTransition'
import { SEO } from '../components/SEO'
import { Card } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'
import { careerGoals, education, interests } from '../data/education'
import { profile } from '../data/profile'
import { publicUrl } from '../lib/publicUrl'

export function About() {
  return (
    <PageTransition>
      <SEO title="About" description={profile.bio[0]} />

      {/* Intro */}
      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:items-start">
          <motion.div
            className="relative mx-auto w-full max-w-xs lg:mx-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div aria-hidden className="absolute -left-3 -top-3 h-full w-full rounded-xl border border-racing-500/60" />
            <div className="carbon relative overflow-hidden rounded-xl border border-asphalt-700 shadow-card">
              <img src={publicUrl(profile.photo)} alt={`Portrait of ${profile.name}`} className="aspect-[4/5] w-full object-cover" />
            </div>
            <div aria-hidden className="racing-stripe absolute -bottom-2 left-6 right-6 h-1.5 rounded-full" />
          </motion.div>

          <div>
            <SectionHeading eyebrow="Driver Profile" title="About Me" className="mb-6" />
            <div className="space-y-4 text-lg text-asphalt-300">
              {profile.bio.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="surface p-4">
                <dt className="font-display text-xs uppercase tracking-[0.25em] text-asphalt-400">Role</dt>
                <dd className="mt-1 font-display font-semibold text-asphalt-100">{profile.role}</dd>
              </div>
              <div className="surface p-4">
                <dt className="font-display text-xs uppercase tracking-[0.25em] text-asphalt-400">Based in</dt>
                <dd className="mt-1 font-display font-semibold text-asphalt-100">{profile.location}</dd>
              </div>
              <div className="surface p-4">
                <dt className="font-display text-xs uppercase tracking-[0.25em] text-asphalt-400">Focus</dt>
                <dd className="mt-1 font-display font-semibold text-asphalt-100">Full-stack TypeScript</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="container-page py-12">
        <SectionHeading eyebrow="Training" title="Education" />
        <div className="grid gap-5 md:grid-cols-2">
          {education.map((e) => (
            <Card key={e.institution + e.degree} className="p-6">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-amber-glow-500/15 text-amber-glow-400">
                  <GraduationCap size={22} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-asphalt-400">
                    {e.start} &ndash; {e.end}
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
      </section>

      {/* Goals + interests */}
      <section className="container-page grid gap-12 py-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Race Plan" title="Career Goals" />
          <ol className="space-y-4">
            {careerGoals.map((g, i) => (
              <li key={g} className="surface flex gap-4 p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-racing-500 font-display text-sm font-bold text-asphalt-100">
                  {i + 1}
                </span>
                <p className="text-asphalt-300">{g}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 inline-flex items-center gap-2 font-display text-sm uppercase tracking-wider text-asphalt-400">
            <Flag size={16} className="text-racing-500" /> Chequered flag: senior engineer, automotive software
          </p>
        </div>

        <div>
          <SectionHeading eyebrow="Off the Clock" title="Interests" />
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
                  <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-racing-500/15 text-racing-400">
                    {i === 0 ? <Car size={18} /> : <Heart size={18} />}
                  </span>
                  <h3 className="text-lg">{it.title}</h3>
                  <p className="mt-1.5 text-sm text-asphalt-300">{it.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
