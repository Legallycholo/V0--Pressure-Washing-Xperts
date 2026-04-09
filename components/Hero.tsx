"use client"

import Image from "next/image"
import { Phone, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps {
  onOpenQuoteForm: () => void
}

export function Hero({ onOpenQuoteForm }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-blue-dark via-[#1a2942] to-brand-blue">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0 bg-hero-pattern opacity-10" />
      
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-dark/80 via-transparent to-brand-blue/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/90 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements - Enhanced */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-yellow/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-blue-light/15 rounded-full blur-3xl animate-pulse-slower" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="animate-fade-in-up">
          {/* Mascot */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/mascot.png"
              alt="Pressure Washing Expert Mascot"
              width={200}
              height={250}
              className="h-48 w-auto drop-shadow-2xl"
              priority
            />
          </div>

          {/* Tagline */}
          <p className="mb-4 text-brand-yellow font-semibold text-lg tracking-wide uppercase">
            Where Pressure Meets Xpertise
          </p>

          {/* Main Headline */}
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Professional Pressure Washing
            <span className="block text-brand-yellow mt-2">You Can Trust</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 leading-relaxed sm:text-xl">
            Residential, Commercial & Industrial cleaning services. 
            Licensed & Insured professionals delivering exceptional results every time.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              onClick={onOpenQuoteForm}
              size="lg"
              className="w-full sm:w-auto bg-brand-yellow text-brand-blue-dark font-bold text-lg px-8 py-6 hover:bg-brand-yellow-dark hover:scale-105 transition-all duration-300 shadow-lg animate-pulse-glow"
            >
              Get a Free Quote Today
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-blue-dark font-bold text-lg px-8 py-6 transition-all duration-300"
            >
              <a href="tel:800-451-7213" className="flex items-center gap-2">
                <Phone className="size-5" />
                Call/Text: (800)-451-7213
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Licensed & Insured
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Free Estimates
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Satisfaction Guaranteed
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#services" className="text-white/50 hover:text-white transition-colors">
            <ArrowDown className="size-8" />
          </a>
        </div>
      </div>
    </section>
  )
}
