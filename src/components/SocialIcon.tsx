import { Globe, Mail } from 'lucide-react'
import type { SocialLink } from '../types'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

interface SocialIconProps {
  icon: SocialLink['icon']
  size?: number
  className?: string
}

export function SocialIcon({ icon, size = 20, className }: SocialIconProps) {
  switch (icon) {
    case 'github':
      return <GithubIcon size={size} className={className} />
    case 'linkedin':
      return <LinkedinIcon size={size} className={className} />
    case 'mail':
      return <Mail size={size} className={className} />
    case 'globe':
      return <Globe size={size} className={className} />
  }
}
