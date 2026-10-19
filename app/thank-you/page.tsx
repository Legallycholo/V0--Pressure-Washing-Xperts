"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { CtaButtons } from "@/components/sections/CtaButtons"
import { PageHero } from "@/components/sections/PageHero"

export default function ThankYouPage() {

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <PageHero
          title="Thank you! We received your request"
          description="Our team will review your details and reach out soon. We serve Ellenwood, GA and Metro Atlanta with licensed, insured pressure and soft washing."
          showCtas={false}
        >
          <CheckCircle className="mx-auto mt-6 size-10 text-brand-blue-light" aria-hidden />
        </PageHero>

        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
            <p className="text-lg leading-relaxed text-slate-700">
              Prefer not to wait? Call or text us. We answer 7 days a week, 8 AM to 10 PM ET.
            </p>
            <CtaButtons className="mt-6" />
            <p className="mt-8">
              <Link href="/" className="font-semibold text-brand-blue underline-offset-2 hover:underline">
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
