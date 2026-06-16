"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"

interface CountUpProps {
  /** Target number to count to. */
  to: number
  /** Decimal places to render (e.g. 1 for "5.0"). */
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

/**
 * Counts up from 0 to `to` once the element scrolls into view.
 * Falls back to the final value immediately when reduced motion is on.
 */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return

    if (prefersReduced) {
      setValue(to)
      return
    }

    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(latest),
    })

    return () => controls.stop()
  }, [inView, prefersReduced, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}
