"use client"

import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider"
import { ContactForm } from "@/components/ContactForm"
import { CtaBand } from "@/components/sections/CtaBand"
import { CtaButtons } from "@/components/sections/CtaButtons"
import { PageHero } from "@/components/sections/PageHero"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { SocialProofBar } from "@/components/sections/SocialProofBar"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { cn } from "@/lib/utils"
import residentialHeroImage from "@/public/services/home-residential.png"
import commercialHeroImage from "@/public/services/home-commercial.png"

export type ServiceProcessStep = { title: string; description: string }

interface ServicePageTemplateProps {
  title: string
  description: string
  category: "Residential" | "Commercial"
  benefits?: string[]
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
    "Free Quotes",
    "Competitive Pricing"
  ],
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
  const heroImage = category === "Commercial" ? commercialHeroImage : residentialHeroImage
  const heroImageAlt =
    category === "Commercial"
      ? "Commercial exterior cleaning and pressure washing project in Metro Atlanta"
      : "Residential exterior pressure washing service in Ellenwood, GA"
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
      ? processSteps.map((step) => ({ title: step.title, desc: step.description }))
      : [
          { title: "Contact Us", desc: "Reach out for a free quote" },
          { title: "Assessment", desc: "We evaluate your needs" },
          { title: "Service", desc: "Professional cleaning" },
          { title: "Satisfaction", desc: "Guaranteed results" },
        ]

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow={`${category} services`}
        title={title}
        description={description}
        image={heroImage}
        imageAlt={heroImageAlt}
      />

      {/* Benefits */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "grid gap-10 md:grid-cols-2 lg:gap-14",
              showContactFormAside ? "md:items-start" : "items-center"
            )}
          >
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight text-brand-blue-dark sm:text-3xl">
                Why choose our {title} service?
              </h2>
              <RevealGroup as="ul" className="mt-6 space-y-3">
                {benefits.map((benefit) => (
                  <RevealItem key={benefit} as="li" className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />
                    <span className="text-base text-slate-700">{benefit}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
              {showContactFormAside ? null : <CtaButtons align="start" className="mt-8" />}
            </Reveal>

            {showContactFormAside ? (
              <div className="relative w-full min-w-0">
                <ContactForm />
              </div>
            ) : showBeforeAfter && beforeSrc && afterSrc && beforeAlt && afterAlt && comparisonLabel ? (
              <Reveal y={24}>
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
              </Reveal>
            ) : showSplit && splitImages ? (
              <Reveal y={24} className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {splitImages.map((img) => (
                  <div
                    key={img.src}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-border"
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
              </Reveal>
            ) : showSingle && imageSrc && imageAlt ? (
              <Reveal y={24}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-border">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className={cn("object-cover", imageClassName)}
                    style={
                      imageObjectPosition ? { objectPosition: imageObjectPosition } : undefined
                    }
                    sizes="(max-width: 896px) 100vw, 42rem"
                  />
                </div>
              </Reveal>
            ) : (
              <div className="rounded-2xl border border-border bg-section-light p-8 text-center">
                <h3 className="text-lg font-semibold text-brand-blue-dark">
                  See it in person, start with a call
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                  Talk to our team and get a straightforward quote before any work starts.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <SocialProofBar />

      {/* Process */}
      <section className="bg-section-light py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our process"
            description={`${processItems.length} steps from first message to final walkthrough.`}
          />

          <RevealGroup
            className={cn(
              "mt-10 grid gap-6 sm:grid-cols-2",
              processItems.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            )}
          >
            {processItems.map((item, idx) => (
              <RevealItem
                key={item.title}
                className={cn(
                  "text-center",
                  idx < processItems.length - 1 ? "step-connector" : "step-connector-last"
                )}
              >
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-brand-blue text-base font-bold text-white ring-4 ring-white">
                  {idx + 1}
                </div>
                <h3 className="font-semibold text-brand-blue-dark">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        title={ctaHeadline ?? "Ready to clean up your exterior?"}
        description={ctaSubline ?? "Straightforward quotes. You know what to expect before we start."}
      />

      {contentRevised ? (
        <p className="px-4 py-4 text-center text-xs text-muted-foreground">
          Content reviewed {contentRevised}
        </p>
      ) : null}
    </main>
  )
}
