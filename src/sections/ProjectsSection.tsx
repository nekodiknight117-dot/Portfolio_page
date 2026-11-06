import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '../components/BrandIcons'
import { ProjectCard } from '../components/ProjectCard'
import { AnchorButton } from '../components/ui/Button'
import { SectionHeading } from '../components/ui/SectionHeading'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { Section } from './Section'

const githubProfile = profile.socials.find((s) => s.icon === 'github')

const sorted = [...projects].sort((a, b) => b.year - a.year)

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Portfolio"
        title="Projects"
        description="Everything I have built, from production apps to open-source libraries. Open a project for the full write-up."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      {githubProfile && (
        <div className="mt-10 text-center">
          <AnchorButton href={githubProfile.url} variant="secondary">
            <GithubIcon size={18} /> View all repositories on GitHub <ArrowUpRight size={16} />
          </AnchorButton>
        </div>
      )}
    </Section>
  )
}
