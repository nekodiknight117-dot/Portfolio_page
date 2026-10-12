import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Light fade applied to each page on mount. Opacity only: a translate here would
 * shift anchored sections after the layout has already scrolled to them.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
