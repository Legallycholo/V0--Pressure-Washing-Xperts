"use client"

import { useRef, type ReactNode } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"

/**
 * Scroll-stacking cards (n8n / Stripe style, adapted to Power Shift).
 *
 * Layout: each card sits in normal flow and sticks below the fixed header
 * (`.stack-card` in globals.css owns the sticky offsets). As the next card
 * scrolls up to cover it, the covered card gently scales down and dims,
 * which reads as depth without any scroll listeners: framer's useScroll
 * drives transform/opacity only.
 *
 * Reduced motion: sticky positioning stays (it is layout, not motion) but
 * the scale/dim layer is disabled and cards render statically.
 */

export function StackCards({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}

export function StackCard({
  index,
  isLast = false,
  children,
  className,
}: {
  /** Position in the stack, 0-based; controls the sticky top offset. */
  index: number
  /** The last card is never covered, so it skips the scale/dim layer. */
  isLast?: boolean
  children: ReactNode
  className?: string
}) {
  const prefersReduced = useReducedMotion()
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Progress of this card being covered: as the wrapper's bottom edge
  // travels from 85% to 40% of the viewport, the next card is sliding over.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["end 0.85", "end 0.4"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.945])
  const brightness = useTransform(
    scrollYProgress,
    [0, 1],
    ["brightness(1)", "brightness(0.55)"]
  )

  const animated = !prefersReduced && !isLast

  return (
    <div
      ref={wrapperRef}
      className="stack-card"
      style={{ "--stack-index": index } as React.CSSProperties}
    >
      <motion.div
        className={className}
        style={animated ? { scale, filter: brightness } : undefined}
      >
        {children}
      </motion.div>
    </div>
  )
}
