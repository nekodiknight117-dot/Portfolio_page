import { PageTransition } from '../components/PageTransition'
import { SEO } from '../components/SEO'
import { profile } from '../data/profile'
import { AboutSection } from '../sections/AboutSection'
import { ContactSection } from '../sections/ContactSection'
import { ExperienceSection } from '../sections/ExperienceSection'
import { HeroSection } from '../sections/HeroSection'
import { ProjectsSection } from '../sections/ProjectsSection'
import { ResumeSection } from '../sections/ResumeSection'
import { SkillsSection } from '../sections/SkillsSection'

/** The single-page scroller. Section order matches `navItems` in components/layout/nav.ts. */
export function Home() {
  return (
    <PageTransition>
      <SEO description={profile.intro} />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ResumeSection />
      <ContactSection />
    </PageTransition>
  )
}
