import { Download, ExternalLink, Mail, MapPin } from 'lucide-react'
import { PageTransition } from '../components/PageTransition'
import { SEO } from '../components/SEO'
import { SocialIcon } from '../components/SocialIcon'
import { AnchorButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'
import { education } from '../data/education'
import { experience, formatPeriod } from '../data/experience'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { skillCategories, skillsByCategory } from '../data/skills'
import { publicUrl } from '../lib/publicUrl'

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="flex items-center gap-3 text-xl uppercase tracking-wider">
        <span aria-hidden className="h-5 w-1 rounded-full bg-racing-500" />
        {title}
      </h2>
      <div className="mt-4 space-y-5">{children}</div>
    </section>
  )
}

export function Resume() {
  const roles = [...experience].sort((a, b) => b.start.localeCompare(a.start)).filter((e) => e.type !== 'Volunteering')
  const volunteering = experience.filter((e) => e.type === 'Volunteering')
  const topProjects = projects.filter((p) => p.featured)

  return (
    <PageTransition>
      <SEO title="Resume" description={`Resume of ${profile.name}, ${profile.role}.`} />
      <section className="container-page py-16 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Spec Sheet"
            title="Resume"
            description="An online summary of my background. Download the PDF for the full, printer-friendly version."
            className="mb-0"
          />
          <div className="flex flex-wrap gap-3">
            <AnchorButton href={publicUrl(profile.resumePdf)} download>
              <Download size={18} /> Download PDF
            </AnchorButton>
            <AnchorButton href={publicUrl(profile.resumePdf)} variant="secondary">
              <ExternalLink size={18} /> Open in new tab
            </AnchorButton>
          </div>
        </div>

        <Card className="mt-12 p-6 sm:p-10">
          {/* Header */}
          <header className="flex flex-col gap-4 border-b border-asphalt-700 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl">{profile.name}</h1>
              <p className="font-display text-lg uppercase tracking-wider text-racing-400">{profile.role}</p>
            </div>
            <ul className="flex flex-col gap-1 text-sm text-asphalt-300">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-amber-glow-500" />
                <a href={`mailto:${profile.email}`} className="hover:text-white">
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-amber-glow-500" /> {profile.location}
              </li>
              {profile.socials
                .filter((s) => s.icon !== 'mail')
                .map((s) => (
                  <li key={s.label} className="flex items-center gap-2">
                    <SocialIcon icon={s.icon} size={14} className="text-amber-glow-500" />
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      {s.url.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  </li>
                ))}
            </ul>
          </header>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_300px]">
            <div className="space-y-10">
              <ResumeSection title="Summary">
                <p className="text-asphalt-300">{profile.intro}</p>
              </ResumeSection>

              <ResumeSection title="Experience">
                {roles.map((e) => (
                  <div key={e.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-lg">
                        {e.title} <span className="text-asphalt-400">&middot;</span>{' '}
                        <span className="text-asphalt-200">{e.organization}</span>
                      </h3>
                      <span className="font-display text-sm uppercase tracking-wider text-amber-glow-400">
                        {formatPeriod(e.start, e.end)}
                      </span>
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-asphalt-300">
                      {e.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ResumeSection>

              <ResumeSection title="Selected Projects">
                {topProjects.map((p) => (
                  <div key={p.slug}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-lg">{p.title}</h3>
                      <span className="font-display text-sm uppercase tracking-wider text-amber-glow-400">{p.year}</span>
                    </div>
                    <p className="mt-1 text-sm text-asphalt-300">{p.summary}</p>
                    <p className="mt-1 text-xs text-asphalt-400">{p.technologies.join(' / ')}</p>
                  </div>
                ))}
              </ResumeSection>

              {volunteering.length > 0 && (
                <ResumeSection title="Volunteering">
                  {volunteering.map((e) => (
                    <div key={e.id}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-lg">
                          {e.title} <span className="text-asphalt-400">&middot;</span>{' '}
                          <span className="text-asphalt-200">{e.organization}</span>
                        </h3>
                        <span className="font-display text-sm uppercase tracking-wider text-amber-glow-400">
                          {formatPeriod(e.start, e.end)}
                        </span>
                      </div>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-asphalt-300">
                        {e.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ResumeSection>
              )}
            </div>

            <aside className="space-y-10">
              <ResumeSection title="Education">
                {education.map((e) => (
                  <div key={e.institution + e.degree}>
                    <h3 className="text-base">
                      {e.degree}, {e.field}
                    </h3>
                    <p className="text-sm text-asphalt-300">{e.institution}</p>
                    <p className="font-display text-xs uppercase tracking-wider text-amber-glow-400">
                      {e.start} &ndash; {e.end}
                    </p>
                  </div>
                ))}
              </ResumeSection>

              <ResumeSection title="Skills">
                {skillCategories.map((cat) => (
                  <div key={cat}>
                    <h3 className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-asphalt-400">{cat}</h3>
                    <p className="mt-1 text-sm text-asphalt-200">
                      {skillsByCategory(cat)
                        .map((s) => s.name)
                        .join(', ')}
                    </p>
                  </div>
                ))}
              </ResumeSection>
            </aside>
          </div>
        </Card>
      </section>
    </PageTransition>
  )
}
