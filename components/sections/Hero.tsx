"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { ShieldCheck, Star, CalendarCheck } from "lucide-react"
import { ContactForm } from "@/components/ContactForm"
import { CtaButtons } from "@/components/sections/CtaButtons"
import { GOOGLE_REVIEW_COUNT, GOOGLE_REVIEW_RATING } from "@/data/review-summary"
import residentialHeroImage from "@/public/services/home-residential.png"

const EASE = [0.22, 1, 0.36, 1] as const

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.08 } },
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

export function Hero() {
  return (
    <section
      id="hero"
      className="scroll-offset-header relative overflow-hidden bg-brand-blue-dark pt-header-offset text-white"
    >
      <Image
        src={residentialHeroImage}
        alt="Freshly pressure washed residential patio in Ellenwood, GA"
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-brand-blue-dark/90 to-brand-blue-dark/55"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8 lg:py-20">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="text-center lg:col-span-6 lg:text-left"
        >
          <motion.p
            variants={heroItem}
            className="text-sm font-semibold uppercase tracking-wider text-brand-blue-light"
          >
            Ellenwood, GA &amp; Metro Atlanta
          </motion.p>

          <motion.h1
            variants={heroItem}
            className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Best Pressure Washing in Ellenwood, GA
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/80 lg:mx-0"
          >
            House, roof, driveway, and commercial exterior cleaning done right the first time.
            Free quotes and same-day availability.
          </motion.p>

          <motion.ul
            variants={heroItem}
            className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/85 lg:justify-start"
          >
            <li className="inline-flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
              <span>
                <strong className="font-semibold text-white">{GOOGLE_REVIEW_RATING.toFixed(1)}</strong> from{" "}
                {GOOGLE_REVIEW_COUNT} Google reviews
              </span>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-brand-blue-light" aria-hidden />
              Licensed &amp; insured
            </li>
            <li className="inline-flex items-center gap-1.5">
              <CalendarCheck className="size-4 text-brand-blue-light" aria-hidden />
              Serving Georgia since 2010
            </li>
          </motion.ul>

          <motion.div variants={heroItem}>
            <CtaButtons tone="dark" className="mt-8 lg:justify-start" />
          </motion.div>
        </motion.div>

        <div className="hidden lg:col-span-6 lg:block">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
