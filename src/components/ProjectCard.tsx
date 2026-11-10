import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router'
import { publicUrl } from '../lib/publicUrl'
import type { Project } from '../types'
import { GithubIcon } from './BrandIcons'
import { Card } from './ui/Card'
import { TechBadge } from './ui/TechBadge'

interface ProjectCardProps {
  project: Project
  index?: number
}

/** Spec-sheet style project card with screenshot, summary, tech badges, and links. */
export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const detailHref = `/projects/${project.slug}`
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.08, 0.4) }}
      className="h-full"
    >
      <Card interactive className="flex h-full flex-col">
        <Link to={detailHref} className="group relative block aspect-[16/9] overflow-hidden bg-asphalt-950">
          {project.image ? (
            <img
              src={publicUrl(project.image)}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
          <span className="absolute left-3 top-3 rounded-md bg-white/85 px-2 py-0.5 text-xs font-medium text-asphalt-100 backdrop-blur">
            {project.year}
          </span>
          {project.featured && (
            <span className="absolute right-3 top-3 rounded-md bg-accent-500 px-2 py-0.5 text-xs font-medium text-white">
              Featured
            </span>
          )}
        </Link>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-xl">
            <Link to={detailHref} className="hover:text-accent-400 transition-colors">
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 flex-1 text-sm text-asphalt-300">{project.summary}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.technologies.slice(0, 5).map((t) => (
              <li key={t}>
                <TechBadge label={t} />
              </li>
            ))}
            {project.technologies.length > 5 && (
              <li>
                <TechBadge label={`+${project.technologies.length - 5}`} />
              </li>
            )}
          </ul>

          <div className="mt-5 flex items-center justify-between border-t border-asphalt-700 pt-4">
            <Link
              to={detailHref}
              className="inline-flex items-center gap-1 text-sm font-medium text-accent-400 hover:text-accent-300"
            >
              Details <ArrowUpRight size={16} />
            </Link>
            <div className="flex items-center gap-3 text-asphalt-300">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  className="hover:text-asphalt-100 transition-colors"
                >
                  <GithubIcon size={18} />
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo`}
                  className="hover:text-asphalt-100 transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
