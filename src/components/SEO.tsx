import { useEffect } from 'react'
import { profile } from '../data/profile'

interface SEOProps {
  title?: string
  description?: string
}

/** Sets document title + meta description per page (no extra dependency needed). */
export function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = title ? `${title} | ${profile.name}` : `${profile.name} | ${profile.role}`
    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    }
  }, [title, description])
  return null
}
