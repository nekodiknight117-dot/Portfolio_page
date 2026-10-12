import { Clock, MapPin, Phone } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { SocialIcon } from '../components/SocialIcon'
import { Card } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'
import { profile } from '../data/profile'
import { Section } from './Section'

const email = profile.socials.find((s) => s.icon === 'mail')
const others = profile.socials.filter((s) => s.icon !== 'mail')

export function ContactSection() {
  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Get in Touch"
        description="Have a role, a project, or a question? Send a message and I will get back to you."
      />

      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <div className="space-y-4">
          {email && (
            <Card interactive className="p-5">
              <a href={email.url} className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-500 text-white">
                  <SocialIcon icon="mail" size={22} />
                </span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wider text-asphalt-400">Email</span>
                  <span className="block font-semibold text-asphalt-100">{profile.email}</span>
                </span>
              </a>
            </Card>
          )}
          {others.map((s) => (
            <Card key={s.label} interactive className="p-5">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-asphalt-700 text-asphalt-100">
                  <SocialIcon icon={s.icon} size={22} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium uppercase tracking-wider text-asphalt-400">{s.label}</span>
                  <span className="block truncate font-semibold text-asphalt-100">
                    {s.url.replace(/^https?:\/\/(www\.)?/, '')}
                  </span>
                </span>
              </a>
            </Card>
          ))}

          <Card className="p-5">
            <ul className="space-y-3 text-sm text-asphalt-300">
              {profile.phone && (
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-highlight-500" />
                  <a href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`} className="hover:text-white">
                    {profile.phone}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-highlight-500" /> {profile.location}
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-highlight-500" /> Usually replies within 48 hours
              </li>
            </ul>
          </Card>
        </div>

        <ContactForm />
      </div>
    </Section>
  )
}
