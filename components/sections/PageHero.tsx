import type { ReactNode } from "react"
import Image, { type StaticImageData } from "next/image"
import { CtaButtons } from "@/components/sections/CtaButtons"

interface PageHeroProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  /** Extra content between the description and the buttons. */
  children?: ReactNode
  /** Optional background photo, shown under a navy overlay. */
  image?: StaticImageData | string
  imageAlt?: string
  /** Hide the call / callback buttons (e.g. the thank-you page). */
  showCtas?: boolean
  callLabel?: string
}

/** Navy page header used by every inner page so heroes look identical site-wide. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  image,
  imageAlt = "",
  showCtas = true,
  callLabel,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-blue-dark pt-header-offset text-white">
      {image ? (
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          placeholder={typeof image === "string" ? "empty" : "blur"}
          className="object-cover"
        />
      ) : null}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-brand-blue-dark via-brand-blue-dark/90 to-brand-blue/75"
      />
      <div className="relative mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-blue-light">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
        {description ? (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>
        ) : null}
        {children}
        {showCtas ? <CtaButtons tone="dark" callLabel={callLabel} className="mt-8" /> : null}
      </div>
    </section>
  )
}
