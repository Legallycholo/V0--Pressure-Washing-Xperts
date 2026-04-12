"use client"

import type { ReactNode } from "react"

import { ExitIntentPopup } from "@/components/layout/ExitIntentPopup"
import { TooltipProvider } from "@/components/ui/tooltip"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      {children}
      <ExitIntentPopup />
    </TooltipProvider>
  )
}
