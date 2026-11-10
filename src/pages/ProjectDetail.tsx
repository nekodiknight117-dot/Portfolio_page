import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Lightbulb, Target, Wrench, type LucideProps } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { GithubIcon } from '../components/BrandIcons'
import { PageTransition } from '../components/PageTransition'
import { SEO } from '../components/SEO'
import { AnchorButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { TechBadge } from '../components/ui/TechBadge'
import { getProjectBySlug, projects } from '../data/projects'
import { publicUrl } from '../lib/publicUrl'
import { NotFound } from './NotFound'

interface SectionProps {
  icon: React.ComponentType<LucideProps>
  title: string
  children: ReactNode
}

function Section({ icon: Icon, title, children }: SectionProps) {
  return (
    <section className="scroll-mt-24">
      <h2 className="flex items-center gap-3 text-2xl">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400">
          <Icon size={18} />
        </span>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-asphalt-300">{children}</div>
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-highlight-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectBySlug(slug)

  if (!project) return <NotFound />

  const sorted = [...projects].sort((a, b) => b.year - a.year)
  const idx = sorted.findIndex((p) => p.slug === project.slug)
  const prev = sorted[idx - 1]
  const next = sorted[idx + 1]
  const { details } = project

  return (
    <PageTransition>
      <SEO title={project.title} description={project.summary} />

      <article className="container-page py-12 lg:py-16">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-asphalt-300 hover:text-asphalt-100"
        >
          <ArrowLeft size={16} /> Back to projects
        </Link>

        {/* Header */}
        <header className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">
              Project / {project.year}
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl">{project.title}</h1>
            <p className="mt-4 text-lg text-asphalt-300">{project.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
              {project.technologies.map((t) => (
                <li key={t}>
                  <TechBadge label={t} />
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.github && (
                <AnchorButton href={project.links.github} variant="secondary">
                  <GithubIcon size={18} /> Repository
                </AnchorButton>
              )}
              {project.links.demo && (
                <AnchorButton href={project.links.demo}>
                  <ExternalLink size={18} /> Live Demo
                </AnchorButton>
              )}
            </div>
          </div>
          {project.image ? (
            <Card className="aspect-[16/10] bg-asphalt-950">
              <img src={publicUrl(project.image)} alt={`${project.title} screenshot`} className="h-full w-full object-cover" />
            </Card>
          ) : (
            <Card className="aspect-[16/10] bg-asphalt-950" aria-hidden />
          )}
        </header>

        {/* Body */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_280px]">
          <div className="space-y-14">
            <Section icon={Target} title="The Problem & Solution">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-5">
                  <p className="mb-2 eyebrow">Problem</p>
                  <p>{details.problem}</p>
                </Card>
                <Card className="p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-highlight-400">Solution</p>
                  <p>{details.solution}</p>
                </Card>
              </div>
            </Section>

            <Section icon={CheckCircle2} title="Features">
              <BulletList items={details.features} />
            </Section>

            <Section icon={Wrench} title="Technical Decisions">
              <BulletList items={details.technicalDecisions} />
            </Section>

            <Section icon={Lightbulb} title="Challenges & Lessons Learned">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-3 eyebrow">Challenges</p>
                  <BulletList items={details.challenges} />
                </div>
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-highlight-400">Lessons</p>
                  <BulletList items={details.lessons} />
                </div>
              </div>
            </Section>
          </div>

          {/* Spec sheet sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <p className="eyebrow">Overview</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-asphalt-700 pb-3">
                  <dt className="text-asphalt-400">Year</dt>
                  <dd className="font-display font-semibold text-asphalt-100">{project.year}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-asphalt-700 pb-3">
                  <dt className="text-asphalt-400">Status</dt>
                  <dd className="font-display font-semibold text-asphalt-100">
                    {project.links.demo ? 'Live' : 'Source only'}
                  </dd>
                </div>
                <div className="border-b border-asphalt-700 pb-3">
                  <dt className="mb-2 text-asphalt-400">Technologies</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <TechBadge key={t} label={t} />
                    ))}
                  </dd>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-asphalt-200 hover:text-asphalt-100"
                    >
                      <GithubIcon size={16} /> GitHub repository
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-asphalt-200 hover:text-asphalt-100"
                    >
                      <ExternalLink size={16} /> Live demo
                    </a>
                  )}
                </div>
              </dl>
            </Card>
          </aside>
        </div>

        {/* Prev / next */}
        <nav className="mt-16 grid gap-4 border-t border-asphalt-700 pt-8 sm:grid-cols-2" aria-label="Project navigation">
          {prev ? (
            <Link to={`/projects/${prev.slug}`} className="group surface p-4 transition-colors hover:border-asphalt-400">
              <span className="text-xs font-medium uppercase tracking-wider text-asphalt-400">Previous</span>
              <span className="mt-1 flex items-center gap-2 font-display text-lg font-semibold text-asphalt-100 group-hover:text-accent-400">
                <ArrowLeft size={18} /> {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/projects/${next.slug}`} className="group surface p-4 text-right transition-colors hover:border-asphalt-400">
              <span className="text-xs font-medium uppercase tracking-wider text-asphalt-400">Next</span>
              <span className="mt-1 flex items-center justify-end gap-2 font-display text-lg font-semibold text-asphalt-100 group-hover:text-accent-400">
                {next.title} <ArrowRight size={18} />
              </span>
            </Link>
          )}
        </nav>
      </article>
    </PageTransition>
  )
}
