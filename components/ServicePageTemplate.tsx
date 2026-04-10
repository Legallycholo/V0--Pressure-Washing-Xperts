"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ServicePageTemplateProps {
  title: string
  description: string
  category: "Residential" | "Commercial" | "Industrial"
  benefits?: string[]
  onOpenQuoteForm: () => void
}

export function ServicePageTemplate({
  title,
  description,
  category,
  benefits = [
    "Professional & Experienced Team",
    "Eco-Friendly Cleaning Solutions",
    "Licensed & Insured",
    "Satisfaction Guaranteed",
    "Free Estimates",
    "Competitive Pricing"
  ],
  onOpenQuoteForm,
}: ServicePageTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-section-light to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-20 pt-header-offset">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="hero-logo-anchor">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Image
              src="/images/logo-new.png"
              alt="Pressure Washing Xperts Logo"
              width={800}
              height={280}
              className="hero-logo-image"
              priority
            />
          </Link>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block mb-4 px-4 py-2 bg-brand-yellow text-brand-blue-dark font-semibold rounded-full text-sm">
              {category} Services
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              {title}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/80 leading-relaxed mb-8">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onOpenQuoteForm}
                size="lg"
                className="bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark"
              >
                Get a Free Quote
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-blue-dark"
              >
                <a href="tel:800-451-7213" className="flex items-center gap-2">
                  <Phone className="size-5" />
                  Call/Text: (800)-451-7213
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-blue-dark mb-6">
                Why Choose Our {title} Service?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="size-6 text-brand-yellow flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  onClick={onOpenQuoteForm}
                  className="bg-brand-blue text-white hover:bg-brand-blue-dark"
                >
                  Request Your Free Quote
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-96 bg-gradient-to-br from-brand-blue/10 to-brand-yellow/10 rounded-lg flex items-center justify-center">
              <div className="text-center px-6">
                <p className="text-gray-500 text-sm">Service Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue-dark mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We follow a proven process to deliver exceptional results every time.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Contact Us", desc: "Reach out for a free quote" },
              { step: "2", title: "Assessment", desc: "We evaluate your needs" },
              { step: "3", title: "Service", desc: "Professional cleaning" },
              { step: "4", title: "Satisfaction", desc: "Guaranteed results" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto w-16 h-16 bg-brand-yellow text-brand-blue-dark rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-brand-blue-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Property?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Get your free quote today and experience the Pressure Washing Xperts difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onOpenQuoteForm}
              size="lg"
              className="bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark"
            >
              Get a Free Quote
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-blue-dark"
            >
              <a href="tel:800-451-7213" className="flex items-center gap-2">
                <Phone className="size-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
