"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Clock, Phone, ShieldCheck, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/ContactForm"
import { ctaPress } from "@/lib/ctaInteraction"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"
import residentialHeroImage from "@/public/services/home-residential.png"

interface HeroProps {
  onOpenQuoteForm?: () => void
}

const EASE = [0.22, 1, 0.36, 1] as const

/** Orchestrated entrance: content reveals after the water beam wipes (≈0.4s). */
const heroContainer: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.4, staggerChildren: 0.12 } },
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

export function Hero({ onOpenQuoteForm }: HeroProps = {}) {
  const prefersReduced = useReducedMotion()
  const motionProps = prefersReduced
    ? {}
    : { variants: heroContainer, initial: "hidden" as const, animate: "show" as const }

  return (
    <section
      id="hero"
      className="scroll-offset-header relative overflow-hidden bg-[#0A0F1E] pt-header-offset"
    >
      {/* LCP-optimized hero background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={residentialHeroImage}
          alt="Professional pressure washing service on a residential exterior in Ellenwood, GA"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover opacity-20"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-hero-pattern opacity-10" />
      {/* Power Shift gradient + cyan glow accents */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1E] via-[#0c1733]/80 to-[#0A0F1E]" />
        <div className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-ps-cyan/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent" />
      </div>
      {/* Signature: cyan water-pressure beam wipes across on load */}
      <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden" aria-hidden>
        <div className="animate-water-beam absolute top-0 -left-1/3 h-full w-1/3 bg-gradient-to-r from-transparent via-ps-cyan/70 to-transparent blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-12 lg:pb-14">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          <motion.div
            {...motionProps}
            className="lg:col-span-5 text-center lg:text-left hero-mobile-height flex flex-col justify-center lg:min-h-0"
          >
            <motion.p
              variants={prefersReduced ? undefined : heroItem}
              className="mb-3 text-ps-cyan font-semibold text-xs sm:text-sm tracking-[0.28em] uppercase"
            >
              Ellenwood, GA · House, Roof, Driveway &amp; Commercial
            </motion.p>

            <motion.h1
              variants={prefersReduced ? undefined : heroItem}
              className="font-display uppercase leading-[0.92] tracking-wide text-white"
              style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)" }}
            >
              Metro Atlanta&apos;s{" "}
              <span className="text-ps-cyan text-glow-cyan">Pressure Washing</span> Xperts
            </motion.h1>

            <motion.p
              variants={prefersReduced ? undefined : heroItem}
              className="mt-4 text-base sm:text-lg font-semibold text-ps-text-muted"
            >
              Same-Day Free Quotes · Licensed &amp; Insured · Serving GA Since 2010
            </motion.p>

            {/* Trust pills */}
            <motion.div
              variants={prefersReduced ? undefined : heroItem}
              className="mt-5 flex flex-wrap justify-center lg:justify-start gap-2"
            >
              {[
                { Icon: Star, label: "5.0 Stars (100+ Reviews)" },
                { Icon: ShieldCheck, label: "Licensed & Insured" },
                { Icon: Clock, label: "Same-Day Service" },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ps-cyan/40 bg-ps-cyan/5 px-3 py-1.5 text-xs sm:text-sm font-medium text-ps-text"
                >
                  <Icon className="size-3.5 shrink-0 text-ps-cyan" aria-hidden />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Phone number: largest, most prominent element above the fold */}
            <motion.a
              variants={prefersReduced ? undefined : heroItem}
              href={businessPhoneTelHref}
              className={`group mt-6 inline-flex flex-col items-center lg:items-start rounded-2xl ${ctaPress}`}
              aria-label={`Call us now at ${businessPhoneDisplay}`}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ps-text-muted">
                Call Now · We Answer in 60 Seconds
              </span>
              <span className="mt-1 flex items-center gap-2 font-display tracking-wide text-ps-cyan text-glow-cyan group-hover:text-brand-yellow-dark transition-colors" style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}>
                <Phone className="size-7 shrink-0 sm:size-9" aria-hidden />
                {businessPhoneDisplay}
              </span>
            </motion.a>

            <motion.div
              variants={prefersReduced ? undefined : heroItem}
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className={`animate-cyan-pulse w-full sm:w-auto bg-ps-cyan text-[#06121f] font-display tracking-wide sm:tracking-widest text-base sm:text-lg px-4 sm:px-7 py-5 hover:bg-brand-yellow-dark transition-colors min-h-[48px] ${ctaPress}`}
              >
                <a href={businessPhoneTelHref}>
                  <Phone className="size-5 shrink-0" aria-hidden />
                  CALL {businessPhoneDisplay} NOW
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className={`w-full sm:w-auto bg-transparent border-2 border-ps-cyan/60 text-ps-cyan font-semibold text-base px-6 py-4 hover:bg-ps-cyan/10 hover:border-ps-cyan transition-all duration-300 min-h-[48px] ${ctaPress}`}
              >
                <Link href="/contact">Request Callback →</Link>
              </Button>
            </motion.div>

            <motion.p
              variants={prefersReduced ? undefined : heroItem}
              className="mt-4 text-sm text-ps-text-muted lg:mx-0 mx-auto"
            >
              Same-Day Availability · Instant Pricing · No Contracts
            </motion.p>
          </motion.div>

          <div className="hidden lg:block animate-fade-in-up lg:col-span-7 lg:pl-6 xl:pl-10 2xl:pl-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export function HeroWithOfferFromUrl(props: HeroProps = {}) {
  return <Hero {...props} />
}
