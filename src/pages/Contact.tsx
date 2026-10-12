import { Clock, MapPin } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { PageTransition } from '../components/PageTransition'
import { SEO } from '../components/SEO'
import { SocialIcon } from '../components/SocialIcon'
import { Card } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'
import { profile } from '../data/profile'

export function Contact() {
  const email = profile.socials.find((s) => s.icon === 'mail')
  const others = profile.socials.filter((s) => s.icon !== 'mail')

  return (
    <PageTransition>
      <SEO title="Contact" description={`Get in touch with ${profile.name}.`} />
      <section className="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Pit Lane"
          title="Contact"
          description="Have a role, a project, or just want to talk cars and code? Send a message and I will get back to you."
        />

        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <div className="space-y-4">
            {email && (
              <Card interactive className="p-5">
                <a href={email.url} className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-racing-500 text-white shadow-glow-red">
                    <SocialIcon icon="mail" size={22} />
                  </span>
                  <span>
                    <span className="block font-display text-xs font-semibold uppercase tracking-[0.25em] text-asphalt-400">
                      Email
                    </span>
                    <span className="block font-semibold text-asphalt-100">{profile.email}</span>
                  </span>
                </a>
              </Card>
            )}
            {others.map((s) => (
              <Card key={s.label} interactive className="p-5">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-asphalt-700 text-asphalt-100">
                    <SocialIcon icon={s.icon} size={22} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-xs font-semibold uppercase tracking-[0.25em] text-asphalt-400">
                      {s.label}
                    </span>
                    <span className="block truncate font-semibold text-asphalt-100">
                      {s.url.replace(/^https?:\/\/(www\.)?/, '')}
                    </span>
                  </span>
                </a>
              </Card>
            ))}

            <Card className="p-5">
              <ul className="space-y-3 text-sm text-asphalt-300">
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-amber-glow-500" /> {profile.location}
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={16} className="text-amber-glow-500" /> Usually replies within 48 hours
                </li>
              </ul>
            </Card>
          </div>

          <ContactForm />
        </div>
      </section>
    </PageTransition>
  )
}
