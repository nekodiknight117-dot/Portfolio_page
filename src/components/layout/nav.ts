export interface NavItem {
  label: string
  /** DOM id of the section on the home page. */
  id: string
  /** Router path (hash link into the home page). */
  to: string
}

/** Sections of the single-page scroller, in display order. */
export const navItems: NavItem[] = [
  { label: 'Home', id: 'home', to: '/' },
  { label: 'Projects', id: 'projects', to: '/#projects' },
  { label: 'About', id: 'about', to: '/#about' },
  { label: 'Skills', id: 'skills', to: '/#skills' },
  { label: 'Experience', id: 'experience', to: '/#experience' },
  { label: 'Resume', id: 'resume', to: '/#resume' },
  { label: 'Contact', id: 'contact', to: '/#contact' },
]

export const sectionIds = navItems.map((item) => item.id)
