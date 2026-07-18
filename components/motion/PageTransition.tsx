"use client"

import { type ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"

/**
 * Subtle cross-page fade on navigation.
 *
 * Animates OPACITY ONLY on purpose: a lingering `transform` on an ancestor
 * turns it into the containing block for `position: fixed` descendants, which
 * would break the fixed Header and FloatingCallButton. Opacity does not.
 *
 * `hasMounted` starts false so the server render and the first client render
 * both paint at full opacity (`initial={false}`) — the fade must never gate
 * first-load LCP. Only later client-side navigations (a new pathname key after
 * mount) fade in. No-ops under prefers-reduced-motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const prefersReduced = useReducedMotion()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (prefersReduced) return <>{children}</>

  return (
    <motion.div
      key={pathname}
      initial={hasMounted ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
