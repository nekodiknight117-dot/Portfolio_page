import { Link } from 'react-router'
import { profile } from '../../data/profile'
import { SocialIcon } from '../SocialIcon'
import { navItems } from './nav'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="mt-24 border-t border-asphalt-700">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold text-asphalt-100">{profile.name}</p>
          <p className="mt-2 max-w-xs text-sm text-asphalt-300">{profile.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-3">Navigate</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link to={item.to} className="text-sm text-asphalt-300 transition-colors hover:text-asphalt-100">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-3">Connect</p>
          <ul className="flex gap-3">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target={s.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-asphalt-600 text-asphalt-200 transition-colors hover:border-asphalt-400 hover:text-asphalt-100"
                >
                  <SocialIcon icon={s.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-asphalt-400">{profile.location}</p>
        </div>
      </div>
      <div className="border-t border-asphalt-700">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-asphalt-400 sm:flex-row">
          <p>
            &copy; {year} {profile.name}. All rights reserved.
          </p>
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
