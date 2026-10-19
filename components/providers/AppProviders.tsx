"use client"

import type { ReactNode } from "react"
import { MotionConfig } from "framer-motion"

import { TooltipProvider } from "@/components/ui/tooltip"
import { PageTransition } from "@/components/motion/PageTransition"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    // "user" honors prefers-reduced-motion inside framer-motion (transforms are
    // skipped) without swapping element trees, which would break hydration.
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <PageTransition>{children}</PageTransition>
      </TooltipProvider>
    </MotionConfig>
  )
}
