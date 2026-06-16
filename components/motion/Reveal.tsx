"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

/**
 * Scroll-triggered reveal primitives for the Power Shift homepage.
 * Everything respects prefers-reduced-motion: when reduced, children
 * render immediately with no transform.
 */

const EASE = [0.22, 1, 0.36, 1] as const

interface RevealProps {
  children: ReactNode
  /** Seconds of delay before the reveal starts. */
  delay?: number
  /** Pixels to drift upward from. */
  y?: number
  className?: string
  as?: "div" | "section" | "li" | "article" | "span"
}

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  as = "div",
}: RevealProps) {
  const prefersReduced = useReducedMotion()
  const MotionTag = motion[as]

  if (prefersReduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

/** Container that staggers its <RevealItem> children as they enter view. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  as = "div",
}: {
  children: ReactNode
  className?: string
  stagger?: number
  as?: "div" | "ul" | "section"
}) {
  const prefersReduced = useReducedMotion()
  const MotionTag = motion[as]

  if (prefersReduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  }

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </MotionTag>
  )
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode
  className?: string
  as?: "div" | "li" | "article"
}) {
  const prefersReduced = useReducedMotion()
  const MotionTag = motion[as]

  if (prefersReduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  )
}
