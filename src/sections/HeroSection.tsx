import { motion } from 'framer-motion'
import { ArrowRight, Cloud, Code2, Cpu, Database, Download, MapPin, Server, Smartphone, type LucideProps } from 'lucide-react'
import { SocialIcon } from '../components/SocialIcon'
import { AnchorButton, LinkButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'
import { profile } from '../data/profile'
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

/** Opening section: hero and specialties. */
export function HeroSection() {
  return (
    <section id="home" className="scroll-mt-16">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="container-page relative grid items-center gap-12 py-20 lg:grid-cols-[1.2fr_1fr] lg:py-28">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Hi, I&rsquo;m <span className="text-accent-400">{profile.name}</span>.
              <span className="mt-3 block text-2xl font-medium leading-snug text-asphalt-300 sm:text-3xl lg:text-4xl">
                {profile.role}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-asphalt-300">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LinkButton to="/#projects" size="lg">
                View Projects <ArrowRight size={18} />
              </LinkButton>
              <AnchorButton href={publicUrl(profile.resumePdf)} variant="secondary" size="lg" download>
                <Download size={18} /> Resume
              </AnchorButton>
            </div>
            <div className="mt-8 flex items-center gap-4 text-asphalt-300">
              <span className="inline-flex items-center gap-1.5 text-sm">
                <MapPin size={16} className="text-accent-400" /> {profile.location}
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
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-asphalt-600 transition-colors hover:border-asphalt-400 hover:text-asphalt-100"
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent-500/20 via-transparent to-highlight-500/10 blur-2xl"
            />
            <div
              data-air-obstacle
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-asphalt-700 bg-asphalt-800 shadow-card"
            >
              <img
                src={publicUrl(profile.photo)}
                alt={`Portrait of ${profile.name}`}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Specialties */}
      <div className="container-page py-24">
        <SectionHeading
          eyebrow="Specialties"
          title="What I Do"
          description="The core disciplines I bring to every project, from the first design to production monitoring."
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
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400">
                    <Icon size={22} />
                  </span>
                  <h3 className="text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm text-asphalt-300">{s.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
