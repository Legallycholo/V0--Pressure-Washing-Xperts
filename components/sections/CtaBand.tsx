import type { ReactNode } from "react"
import { CtaButtons } from "@/components/sections/CtaButtons"

interface CtaBandProps {
  title: ReactNode
  description?: ReactNode
  /** Extra line under the description (e.g. availability note). */
  children?: ReactNode
}

/** Closing navy call-to-action band shared by the homepage and inner pages. */
export function CtaBand({ title, description, children }: CtaBandProps) {
  return (
    <section className="bg-gradient-to-br from-brand-blue-dark to-[#12406b] text-white">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {description ? (
          <p className="mx-auto mt-3 max-w-xl text-base text-white/75">{description}</p>
        ) : null}
        {children}
        <CtaButtons tone="dark" className="mt-7" />
      </div>
    </section>
  )
}
