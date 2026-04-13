"use client"

import Image from "next/image"
import { Phone, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider"
import { ContactQuoteFormCard } from "@/components/sections/ContactQuoteFormCard"
import { ctaPress } from "@/lib/ctaInteraction"
import { cn } from "@/lib/utils"

export type ServiceProcessStep = { title: string; description: string }

interface ServicePageTemplateProps {
  title: string
  description: string
  category: "Residential" | "Commercial"
  benefits?: string[]
  onOpenQuoteForm: () => void
  /** When set, replaces the default four process cards. */
  processSteps?: ServiceProcessStep[]
  ctaHeadline?: string
  ctaSubline?: string
  /** Shown at the bottom of the page for content freshness. */
  contentRevised?: string
  /** Single benefits-column image */
  imageSrc?: string
  imageAlt?: string
  imageClassName?: string
  imageObjectPosition?: string
  /** Two static images (grid on md+, stack on small screens) */
  splitImages?: ReadonlyArray<{ src: string; alt: string }>
  /** Before/after comparison slider */
  beforeSrc?: string
  afterSrc?: string
  beforeAlt?: string
  afterAlt?: string
  comparisonLabel?: string
  beforeObjectPosition?: string
  afterObjectPosition?: string
  beforeImageClassName?: string
  afterImageClassName?: string
  /** Embed the homepage contact quote form in the benefits column (e.g. Roof Soft Washing). */
  benefitsAside?: "contactForm"
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
  imageSrc,
  imageAlt,
  imageClassName,
  imageObjectPosition,
  splitImages,
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  comparisonLabel,
  beforeObjectPosition,
  afterObjectPosition,
  beforeImageClassName,
  afterImageClassName,
  benefitsAside,
  processSteps,
  ctaHeadline,
  ctaSubline,
  contentRevised,
}: ServicePageTemplateProps) {
  const showContactFormAside = benefitsAside === "contactForm"
  const showBeforeAfter =
    !showContactFormAside &&
    Boolean(beforeSrc && afterSrc && beforeAlt && afterAlt && comparisonLabel)
  const showSplit =
    !showContactFormAside &&
    !showBeforeAfter &&
    splitImages &&
    splitImages.length === 2 &&
    splitImages.every((i) => i.src && i.alt)
  const showSingle =
    !showContactFormAside &&
    !showBeforeAfter &&
    !showSplit &&
    Boolean(imageSrc && imageAlt)

  const processItems =
    processSteps && processSteps.length > 0
      ? processSteps.map((step, i) => ({
          step: String(i + 1),
          title: step.title,
          desc: step.description,
        }))
      : [
          { step: "1", title: "Contact Us", desc: "Reach out for a free quote" },
          { step: "2", title: "Assessment", desc: "We evaluate your needs" },
          { step: "3", title: "Service", desc: "Professional cleaning" },
          { step: "4", title: "Satisfaction", desc: "Guaranteed results" },
        ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-section-light to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-8 sm:py-12 pt-header-offset">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block mb-2 px-3 py-1 bg-brand-yellow text-brand-blue-dark font-semibold rounded-full text-xs sm:text-sm">
              {category} Services
            </span>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-5xl mb-3">
              {title}
            </h1>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed mb-4">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
                <a href="tel:800-451-7213" className={`flex items-center gap-2 ${ctaPress}`}>
                  <Phone className="size-5" />
                  Call/Text: (800)-451-7213
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "grid md:grid-cols-2 gap-7",
              showContactFormAside ? "md:items-start" : "items-center"
            )}
          >
            <div>
              <h2 className="text-2xl font-bold text-brand-blue-dark mb-4">
                Why Choose Our {title} Service?
              </h2>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-brand-yellow flex-shrink-0 mt-1" />
                    <span className="text-base text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button
                  onClick={onOpenQuoteForm}
                  className="bg-brand-blue text-white hover:bg-brand-blue-dark"
                >
                  Request Your Free Quote
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </div>

            {showContactFormAside ? (
              <ContactQuoteFormCard />
            ) : showBeforeAfter && beforeSrc && afterSrc && beforeAlt && afterAlt && comparisonLabel ? (
              <BeforeAfterSlider
                beforeSrc={beforeSrc}
                afterSrc={afterSrc}
                beforeAlt={beforeAlt}
                afterAlt={afterAlt}
                comparisonLabel={comparisonLabel}
                beforeObjectPosition={beforeObjectPosition}
                afterObjectPosition={afterObjectPosition}
                beforeImageClassName={beforeImageClassName}
                afterImageClassName={afterImageClassName}
                sizes="(max-width: 896px) 100vw, 42rem"
                aspectClassName="aspect-video"
              />
            ) : showSplit && splitImages ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {splitImages.map((img) => (
                  <div
                    key={img.src}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            ) : showSingle && imageSrc && imageAlt ? (
              <div className="relative h-72 overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 md:mx-auto md:max-w-[90%]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className={cn("object-cover", imageClassName)}
                  style={
                    imageObjectPosition ? { objectPosition: imageObjectPosition } : undefined
                  }
                  sizes="(max-width: 896px) 100vw, 42rem"
                  priority
                />
              </div>
            ) : (
              <div className="relative flex min-h-72 flex-col items-center justify-center rounded-lg border border-brand-blue/15 bg-gradient-to-br from-brand-blue/10 to-brand-yellow/10 p-6 text-center shadow-sm">
                <Phone className="size-10 text-brand-blue-dark mb-3" aria-hidden />
                <h3 className="text-lg font-bold text-brand-blue-dark mb-2">
                  See it in person—start with a call
                </h3>
                <p className="text-gray-600 mb-4 max-w-sm text-pretty text-sm">
                  Talk to our team and get a straightforward quote.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark"
                >
                  <a href="tel:800-451-7213" className={`flex items-center gap-2 ${ctaPress}`}>
                    <Phone className="size-5" aria-hidden />
                    Call Now
                  </a>
                </Button>
                <p className="mt-4 text-sm font-medium text-brand-blue-dark">(800)-451-7213</p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 border-brand-blue/30 text-brand-blue-dark hover:bg-brand-blue/5"
                  onClick={onOpenQuoteForm}
                >
                  Get a Free Quote
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-10 bg-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7">
            <h2 className="text-2xl font-bold text-brand-blue-dark mb-2">
              Our Process
            </h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Four steps from first message to final walkthrough.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processItems.map((item, idx) => (
              <div
                key={`${item.step}-${item.title}`}
                className={`text-center animate-step-reveal ${idx < processItems.length - 1 ? "step-connector" : ""} ${idx === processItems.length - 1 ? "step-connector-last" : ""}`}
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                <div className="mx-auto w-14 h-14 bg-brand-yellow text-brand-blue-dark rounded-full flex items-center justify-center text-xl font-bold mb-3 shadow-md ring-4 ring-brand-yellow/20">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-brand-blue-dark mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {ctaHeadline ?? "Ready to Clean Up Your Exterior?"}
          </h2>
          <p className="text-sm sm:text-base text-white/80 mb-5">
            {ctaSubline ?? "Straightforward quotes—know what to expect before we start."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
              <a href="tel:800-451-7213" className={`flex items-center gap-2 ${ctaPress}`}>
                <Phone className="size-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {contentRevised ? (
        <p className="text-center text-xs text-gray-500 py-4 px-4">
          Content reviewed {contentRevised}
        </p>
      ) : null}
    </div>
  )
}
