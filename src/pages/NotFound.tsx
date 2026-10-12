import { ArrowLeft, FolderOpen } from 'lucide-react'
import { PageTransition } from '../components/PageTransition'
import { SEO } from '../components/SEO'
import { LinkButton } from '../components/ui/Button'

export function NotFound() {
  return (
    <PageTransition>
      <SEO title="Page not found" />
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-8xl font-bold leading-none text-accent-400 sm:text-9xl">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">Page not found</h1>
        <p className="mt-3 max-w-md text-asphalt-300">
          The page you are looking for does not exist or may have moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton to="/">
            <ArrowLeft size={18} /> Back Home
          </LinkButton>
          <LinkButton to="/#projects" variant="secondary">
            <FolderOpen size={18} /> View Projects
          </LinkButton>
        </div>
      </section>
    </PageTransition>
  )
}
