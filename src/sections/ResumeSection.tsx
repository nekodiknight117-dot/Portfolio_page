import { Download, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { SocialIcon } from '../components/SocialIcon'
import { AnchorButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'
import { education } from '../data/education'
import { experience, formatPeriod } from '../data/experience'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { certifications, skillCategories, skillsByCategory } from '../data/skills'
import { publicUrl } from '../lib/publicUrl'
import { Section } from './Section'

function ResumeBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="flex items-center gap-3 text-xl">
        <span aria-hidden className="h-5 w-1 rounded-full bg-accent-500" />
        {title}
      </h3>
      <div className="mt-4 space-y-5">{children}</div>
    </section>
  )
}

const roles = [...experience].sort((a, b) => b.start.localeCompare(a.start)).filter((e) => e.type !== 'Volunteering')
const volunteering = experience.filter((e) => e.type === 'Volunteering')
const topProjects = projects.filter((p) => p.featured)

export function ResumeSection() {
  return (
    <Section id="resume">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Resume"
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
            <h3 className="text-3xl sm:text-4xl">{profile.name}</h3>
            <p className="text-lg font-medium text-accent-400">{profile.role}</p>
          </div>
          <ul className="flex flex-col gap-1 text-sm text-asphalt-300">
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-highlight-500" />
              <a href={`mailto:${profile.email}`} className="hover:text-asphalt-100">
                {profile.email}
              </a>
            </li>
            {profile.phone && (
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-highlight-500" />
                <a href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`} className="hover:text-asphalt-100">
                  {profile.phone}
                </a>
              </li>
            )}
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-highlight-500" /> {profile.location}
            </li>
            {profile.socials
              .filter((s) => s.icon !== 'mail')
              .map((s) => (
                <li key={s.label} className="flex items-center gap-2">
                  <SocialIcon icon={s.icon} size={14} className="text-highlight-500" />
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-asphalt-100">
                    {s.url.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </li>
              ))}
          </ul>
        </header>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="space-y-10">
            <ResumeBlock title="Summary">
              <p className="text-asphalt-300">{profile.intro}</p>
            </ResumeBlock>

            <ResumeBlock title="Experience">
              {roles.map((e) => (
                <div key={e.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-lg">
                      {e.title} <span className="text-asphalt-400">&middot;</span>{' '}
                      <span className="text-asphalt-200">{e.organization}</span>
                    </h4>
                    <span className="text-sm font-medium text-highlight-400">
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
            </ResumeBlock>

            <ResumeBlock title="Selected Projects">
              {topProjects.map((p) => (
                <div key={p.slug}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-lg">{p.title}</h4>
                    <span className="text-sm font-medium text-highlight-400">{p.year}</span>
                  </div>
                  <p className="mt-1 text-sm text-asphalt-300">{p.summary}</p>
                  <p className="mt-1 text-xs text-asphalt-400">{p.technologies.join(' / ')}</p>
                </div>
              ))}
            </ResumeBlock>

            {volunteering.length > 0 && (
              <ResumeBlock title="Volunteering">
                {volunteering.map((e) => (
                  <div key={e.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-lg">
                        {e.title} <span className="text-asphalt-400">&middot;</span>{' '}
                        <span className="text-asphalt-200">{e.organization}</span>
                      </h4>
                      <span className="text-sm font-medium text-highlight-400">
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
              </ResumeBlock>
            )}
          </div>

          <aside className="space-y-10">
            <ResumeBlock title="Education">
              {education.map((e) => (
                <div key={e.institution + e.degree}>
                  <h4 className="text-base">
                    {e.degree}, {e.field}
                  </h4>
                  <p className="text-sm text-asphalt-300">{e.institution}</p>
                  <p className="text-xs font-medium text-highlight-400">
                    {e.start ? `${e.start} \u2013 ${e.end}` : e.end}
                  </p>
                  {e.highlights && (
                    <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-xs text-asphalt-300">
                      {e.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </ResumeBlock>

            <ResumeBlock title="Certifications">
              <ul className="space-y-1.5 text-sm text-asphalt-200">
                {certifications.map((c) => (
                  <li key={c.name}>
                    {c.name}
                    {c.status && <span className="ml-2 text-xs text-highlight-400">{c.status}</span>}
                  </li>
                ))}
              </ul>
            </ResumeBlock>

            <ResumeBlock title="Skills">
              {skillCategories.map((cat) => (
                <div key={cat}>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-asphalt-400">{cat}</h4>
                  <p className="mt-1 text-sm text-asphalt-200">
                    {skillsByCategory(cat)
                      .map((s) => s.name)
                      .join(', ')}
                  </p>
                </div>
              ))}
            </ResumeBlock>
          </aside>
        </div>
      </Card>
    </Section>
  )
}