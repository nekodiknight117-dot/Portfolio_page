import { motion } from 'framer-motion'
import { ArrowRight, Cloud, Code2, Cpu, Database, Download, MapPin, Server, Smartphone, type LucideProps } from 'lucide-react'
import { PageTransition } from '../components/PageTransition'
import { ProjectCard } from '../components/ProjectCard'
import { SEO } from '../components/SEO'
import { SocialIcon } from '../components/SocialIcon'
import { AnchorButton, LinkButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Odometer } from '../components/ui/Odometer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { profile } from '../data/profile'
import { featuredProjects } from '../data/projects'
import { publicUrl } from '../lib/publicUrl'
import type { Specialty } from '../types'

const specialtyIcons: Record<Specialty['icon'], React.ComponentType<LucideProps>> = {
  code: Code2,
  server: Server,
  database: Database,
  cloud: Cloud,
  cpu: Cpu,
  smartphone: Smartphone,
}

export function Home() {
  return (
    <PageTransition>
      <SEO description={profile.intro} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="grid-fade absolute inset-0" />
        <div className="container-page relative grid items-center gap-12 py-20 lg:grid-cols-[1.2fr_1fr] lg:py-28">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-asphalt-600 bg-asphalt-800/70 px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.25em] text-amber-glow-400">
              <span className="h-2 w-2 animate-pulse-slow rounded-full bg-racing-500" />
              Available for new opportunities
            </p>
            <h1 className="text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Hi, I&rsquo;m <span className="text-racing-500 text-glow-red">{profile.name}</span>.
              <br />
              <span className="text-asphalt-300">{profile.role}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-asphalt-300">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LinkButton to="/projects" size="lg">
                View Projects <ArrowRight size={18} />
              </LinkButton>
              <AnchorButton href={publicUrl(profile.resumePdf)} variant="secondary" size="lg" download>
                <Download size={18} /> Resume
              </AnchorButton>
            </div>
            <div className="mt-8 flex items-center gap-4 text-asphalt-300">
              <span className="inline-flex items-center gap-1.5 text-sm">
                <MapPin size={16} className="text-racing-500" /> {profile.location}
              </span>
              <span aria-hidden className="h-4 w-px bg-asphalt-600" />
              <ul className="flex gap-2">
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target={s.url.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-asphalt-600 transition-colors hover:border-racing-500 hover:text-white"
                    >
                      <SocialIcon icon={s.icon} size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-sm"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Instrument-cluster style bezel around the photo */}
            <div aria-hidden className="absolute -inset-3 rounded-full border border-asphalt-600" />
            <div aria-hidden className="absolute -inset-1.5 rounded-full border-2 border-dashed border-racing-500/50" />
            <div className="carbon relative aspect-square overflow-hidden rounded-full border-4 border-asphalt-700 shadow-card">
              <img
                src={publicUrl(profile.photo)}
                alt={`Portrait of ${profile.name}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-md border border-asphalt-600 bg-asphalt-900 px-4 py-1.5 font-display text-sm font-bold uppercase tracking-[0.3em] text-amber-glow-400 shadow-glow-amber">
              Redline
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page">
        <div className="surface grid grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4">
          {profile.stats.map((s) => (
            <Odometer key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* Specialties */}
      <section className="container-page py-24">
        <SectionHeading
          eyebrow="01 / Specialties"
          title="What I Build"
          description="The core disciplines I bring to every project, from the first wireframe to production monitoring."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {profile.specialties.map((s, i) => {
            const Icon = specialtyIcons[s.icon]
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card interactive className="h-full p-6">
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-racing-500/15 text-racing-400">
                    <Icon size={22} />
                  </span>
                  <h3 className="text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm text-asphalt-300">{s.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Featured projects */}
      <section className="container-page">
        <SectionHeading
          eyebrow="02 / Featured Work"
          title="Featured Projects"
          description="A selection of projects I am proud of. Each one has a full write-up covering the problem, the solution, and what I learned."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <LinkButton to="/projects" variant="secondary">
            All Projects <ArrowRight size={16} />
          </LinkButton>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pt-24">
        <div className="relative overflow-hidden rounded-xl border border-asphalt-700 bg-asphalt-800 px-6 py-12 text-center sm:px-12">
          <div aria-hidden className="checkered absolute inset-y-0 left-0 w-3 opacity-50" />
          <div aria-hidden className="checkered absolute inset-y-0 right-0 w-3 opacity-50" />
          <h2 className="text-3xl sm:text-4xl">Ready to start your engines?</h2>
          <p className="mx-auto mt-3 max-w-xl text-asphalt-300">
            I am open to full-time roles and interesting freelance work. Let&rsquo;s talk about what we can build together.
          </p>
          <div className="mt-6">
            <LinkButton to="/contact" size="lg">
              Get in Touch <ArrowRight size={18} />
            </LinkButton>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
