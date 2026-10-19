"use client"

import type { ReactNode } from "react"
import { motion, type Variants } from "framer-motion"

/**
 * Scroll-triggered reveal primitives. The rendered element tree is the same
 * for every visitor; `MotionConfig reducedMotion="user"` (AppProviders) drops
 * the upward drift for people who prefer reduced motion.
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
  y = 16,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
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
  stagger = 0.08,
  as = "div",
}: {
  children: ReactNode
  className?: string
  stagger?: number
  as?: "div" | "ul" | "section"
}) {
  const MotionTag = motion[as]

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
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </MotionTag>
  )
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
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
  const MotionTag = motion[as]

  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  )
}
