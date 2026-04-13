"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { businessAddress } from "@/data/site"
import { ctaPress } from "@/lib/ctaInteraction"

export default function PrivacyPolicyPage() {
  const goHomeQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goHomeQuote({ target: "contact" })} />

      <main className="min-h-screen bg-gradient-to-b from-section-light to-white">
        <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-12 pt-header-offset">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
                Privacy Policy
              </h1>
              <p className="mx-auto max-w-3xl text-base text-white/80 leading-relaxed">
                How Pressure Washing Xperts collects, uses, and protects information you share with us.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-gray-500 mb-8">
              Last updated: April 12, 2026
            </p>

            <div className="space-y-8 text-base text-gray-700 leading-relaxed">
              <div>
                <h2 className="text-xl font-bold text-brand-blue-dark mb-3">
                  Who we are
                </h2>
                <p>
                  Pressure Washing Xperts provides professional pressure washing and related
                  cleaning services for homes and businesses across Metro Atlanta. This policy
                  describes how we handle personal information collected through this website and
                  our quote and contact forms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-brand-blue-dark mb-3">
                  What we collect
                </h2>
                <p className="mb-3">
                  When you request a quote or contact us, we may collect:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>City, state, and ZIP code (when you provide them)</li>
                  <li>Your message or project details</li>
                  <li>Optional fields such as how you heard about us, selected offers, or campaign
                    tags that help us understand what brought you to our site</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-brand-blue-dark mb-3">
                  Why we use it
                </h2>
                <p>
                  We use this information only to respond to your request, provide estimates,
                  schedule work, and follow up about services you asked about. We do not sell your
                  personal information and we do not use it for unrelated marketing lists.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-brand-blue-dark mb-3">
                  How it is stored
                </h2>
                <p>
                  Form submissions are stored securely using industry-standard services (including
                  encrypted hosting and a protected database). Access is limited to what we need to
                  run the business and serve customers. Our site may also use privacy-friendly
                  analytics to understand how pages are used so we can keep the experience fast
                  and relevant.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-brand-blue-dark mb-3">
                  Sharing
                </h2>
                <p>
                  We do not share your information with third parties for their own advertising
                  purposes. We may use trusted service providers (for example, hosting, email, or
                  analytics) who process data only on our behalf and under appropriate safeguards.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-brand-blue-dark mb-3">
                  Retention
                </h2>
                <p>
                  We keep contact and job-related records for as long as needed to provide
                  services, handle warranty or billing questions, and meet legal requirements.
                  When information is no longer needed, we delete or anonymize it in line with our
                  normal business practices.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-brand-blue-dark mb-3">
                  Your choices
                </h2>
                <p>
                  You may ask us to update or correct your contact details, or to delete
                  information that we no longer have a legitimate reason to keep, subject to
                  applicable law. If you have questions or requests regarding your data, reach out
                  using the contact information below.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-brand-blue-dark mb-3">
                  Contact us
                </h2>
                <p className="mb-3">
                  Pressure Washing Xperts — Licensed & Insured
                </p>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="mailto:pressurewashingxperts@gmail.com"
                      className={`text-brand-blue-dark font-medium underline-offset-2 hover:underline ${ctaPress}`}
                    >
                      pressurewashingxperts@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:800-451-7213"
                      className={`text-brand-blue-dark font-medium underline-offset-2 hover:underline ${ctaPress}`}
                    >
                      (800) 451-7213
                    </a>
                  </li>
                  <li>{businessAddress}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  )
}
