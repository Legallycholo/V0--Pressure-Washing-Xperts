"use client"

import type { ReactNode } from "react"

import { TooltipProvider } from "@/components/ui/tooltip"
import { PageTransition } from "@/components/motion/PageTransition"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <PageTransition>{children}</PageTransition>
    </TooltipProvider>
  )
}
