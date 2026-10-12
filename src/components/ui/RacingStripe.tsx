import { cn } from '../../lib/cn'

interface RacingStripeProps {
  className?: string
}

/** Thin diagonal racing stripe accent. */
export function RacingStripe({ className }: RacingStripeProps) {
  return <div aria-hidden className={cn('racing-stripe h-1 w-full', className)} />
}
