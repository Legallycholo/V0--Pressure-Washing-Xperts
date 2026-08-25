"use client"

import Image from "next/image"
<<<<<<< HEAD
import Link from "next/link"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Clock, Phone, ShieldCheck, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/ContactForm"
=======
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Clock, Phone, ShieldCheck, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
>>>>>>> origin/main
import { ctaPress } from "@/lib/ctaInteraction"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"
import residentialHeroImage from "@/public/services/home-residential.png"

interface HeroProps {
<<<<<<< HEAD
  onOpenQuoteForm?: () => void
=======
  onOpenQuoteForm: () => void
>>>>>>> origin/main
}

const EASE = [0.22, 1, 0.36, 1] as const

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.4, staggerChildren: 0.12 } },
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

<<<<<<< HEAD
export function Hero({ onOpenQuoteForm }: HeroProps = {}) {
=======
export function Hero({ onOpenQuoteForm }: HeroProps) {
>>>>>>> origin/main
  const prefersReduced = useReducedMotion()
  const motionProps = prefersReduced
    ? {}
    : { variants: heroContainer, initial: "hidden" as const, animate: "show" as const }

  return (
    <section
      id="hero"
      className="scroll-offset-header relative overflow-hidden bg-[#0A0F1E] pt-header-offset"
    >
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1E] via-[#0c1733]/80 to-[#0A0F1E]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden" aria-hidden>
        <div className="animate-water-beam absolute top-0 -left-1/3 h-full w-1/3 bg-gradient-to-r from-transparent via-ps-cyan/70 to-transparent blur-md" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div {...motionProps} className="mx-auto max-w-4xl text-center">
          <motion.p
            variants={prefersReduced ? undefined : heroItem}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-ps-cyan sm:text-sm"
          >
            Ellenwood, GA · House, Roof, Driveway &amp; Commercial
          </motion.p>
          <motion.h1
            variants={prefersReduced ? undefined : heroItem}
            className="font-display uppercase leading-[0.92] tracking-wide text-white"
            style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)" }}
          >
            Metro Atlanta&apos;s <span className="text-ps-cyan text-glow-cyan">Pressure Washing</span> Xperts
          </motion.h1>
          <motion.p
            variants={prefersReduced ? undefined : heroItem}
            className="mx-auto mt-5 max-w-2xl text-base font-semibold text-ps-text-muted sm:text-lg"
          >
            Professional exterior cleaning with dependable scheduling, clear scope, and crews ready to get your property looking its best.
          </motion.p>
          <motion.div
            variants={prefersReduced ? undefined : heroItem}
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {[
              { Icon: Star, label: "5.0 Stars (32+ Reviews)" },
              { Icon: ShieldCheck, label: "Licensed & Insured" },
              { Icon: Clock, label: "Same-Day Availability" },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-ps-cyan/40 bg-ps-cyan/5 px-3 py-1.5 text-xs font-medium text-ps-text sm:text-sm"
              >
<<<<<<< HEAD
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
=======
                <Icon className="size-3.5 shrink-0 text-ps-cyan" aria-hidden />
                {label}
              </span>
            ))}
          </motion.div>
          <motion.div
            variants={prefersReduced ? undefined : heroItem}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className={`min-h-[48px] w-full bg-ps-cyan px-5 py-5 text-base font-display tracking-wide text-[#06121f] hover:bg-brand-yellow-dark sm:w-auto sm:text-lg sm:tracking-widest ${ctaPress}`}
            >
              <a href={businessPhoneTelHref}>
                <Phone className="size-5 shrink-0" aria-hidden />
                CALL {businessPhoneDisplay} NOW
              </a>
            </Button>
            <Button
              type="button"
              onClick={onOpenQuoteForm}
              size="lg"
              className={`min-h-[48px] w-full border-2 border-ps-cyan/60 bg-transparent px-6 py-4 text-base font-semibold text-ps-cyan hover:border-ps-cyan hover:bg-ps-cyan/10 sm:w-auto ${ctaPress}`}
            >
              Request Callback
            </Button>
          </motion.div>
          <motion.a
            variants={prefersReduced ? undefined : heroItem}
            href={businessPhoneTelHref}
            className={`mt-5 inline-flex items-center gap-2 font-display tracking-wide text-ps-cyan text-glow-cyan transition-colors hover:text-brand-yellow-dark ${ctaPress}`}
            aria-label={`Call us now at ${businessPhoneDisplay}`}
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            <Phone className="size-6 shrink-0 sm:size-8" aria-hidden />
            {businessPhoneDisplay}
          </motion.a>
        </motion.div>
>>>>>>> origin/main
      </div>
    </section>
  )
}

<<<<<<< HEAD
export function HeroWithOfferFromUrl(props: HeroProps = {}) {
=======
/** Stable export for the homepage Suspense boundary. */
export function HeroWithOfferFromUrl(props: HeroProps) {
>>>>>>> origin/main
  return <Hero {...props} />
}
