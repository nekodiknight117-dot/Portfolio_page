export interface NavItem {
  label: string
  to: string
}

export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Skills', to: '/skills' },
  { label: 'Experience', to: '/experience' },
  { label: 'Resume', to: '/resume' },
  { label: 'Contact', to: '/contact' },
]
