"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"
import { ctaPress } from "@/lib/ctaInteraction"

export default function ThankYouPage() {
  const goHomeQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goHomeQuote({ target: "contact" })} />

      <main className="min-h-screen bg-gradient-to-b from-section-light to-white">
        <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-12 pt-header-offset">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />
          <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-success-pop-in mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-4 ring-brand-yellow/20">
              <CheckCircle className="size-9 text-brand-yellow" aria-hidden />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3 text-balance">
              Thank you! We received your request
            </h1>
            <p className="text-base text-white/85 leading-relaxed">
              Our team will review your details and reach out soon. We serve Ellenwood, GA and
              Metro Atlanta with licensed, insured pressure and soft washing.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-lg px-4 sm:px-6 text-center space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Prefer not to wait? Call or text us. We answer 7 days a week, 8am to 10pm ET.
            </p>
            <a
              href="tel:800-451-7213"
              className={`inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-brand-yellow px-6 py-3 text-base font-bold text-brand-blue-dark hover:bg-brand-yellow-dark ${ctaPress}`}
            >
              (800)-451-7213
            </a>
            <p>
              <Link
                href="/"
                className="text-brand-blue font-semibold underline underline-offset-2 hover:text-brand-blue-dark"
              >
                Back to home
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  )
}
