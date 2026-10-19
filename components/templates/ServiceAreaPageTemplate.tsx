"use client"

import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, ArrowRight, Star, MapPin } from "lucide-react"
import { slugToCityName, type ServiceAreaPageContent } from "@/data/service-areas"
import { getCityGalleryComparisonItems } from "@/data/city-gallery"
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider"
import { CtaBand } from "@/components/sections/CtaBand"
import { CtaButtons } from "@/components/sections/CtaButtons"
import { PageHero } from "@/components/sections/PageHero"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { cn } from "@/lib/utils"

interface ServiceAreaPageTemplateProps {
  city: ServiceAreaPageContent
}

export function ServiceAreaPageTemplate({ city }: ServiceAreaPageTemplateProps) {
  const galleryPairs = getCityGalleryComparisonItems(city.slug)
  const sideImageSrc = city.heroImageSrc ?? city.coverageMapImageSrc
  const sideImageAlt = city.heroImageSrc
    ? city.heroImageAlt ?? `${city.cityName} neighborhood`
    : city.coverageMapAlt ?? `Service coverage near ${city.cityName}`

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow="Service area"
        title={city.hero.headline}
        description={city.hero.subheadline}
        image={city.heroImageSrc}
        imageAlt={city.heroImageAlt ?? `${city.cityName}, Georgia service area`}
      >
        <p className="mx-auto mt-3 inline-flex items-center gap-1.5 text-sm text-white/70">
          <MapPin className="size-4 text-brand-blue-light" aria-hidden />
          {city.cityName}, {city.stateCode} · {city.county} · {city.serviceAvailability}
        </p>
      </PageHero>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={cn("grid items-center gap-10 lg:gap-14", sideImageSrc && "md:grid-cols-2")}>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-brand-blue-dark sm:text-3xl">
                Trust the Xperts in {city.cityName}
              </h2>
              <ul className="mt-6 space-y-3">
                {city.trustPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />
                    <span className="text-base text-slate-700">{point}</span>
                  </li>
                ))}
              </ul>
              <CtaButtons align="start" className="mt-8" />
            </div>
            {sideImageSrc ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-border">
                <Image
                  src={sideImageSrc}
                  alt={sideImageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 50vw"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {city.coverageMapImageSrc && city.heroImageSrc ? (
        <section className="bg-section-light py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Coverage area" />
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-border">
              <Image
                src={city.coverageMapImageSrc}
                alt={city.coverageMapAlt ?? `Map of ${city.cityName} service area`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-section-light py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={`Popular work in ${city.cityName}`}
            description="Photos, benefits, and how we run each job. Same crew standards across the metro."
          />
          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {city.localizedServiceCards.map((service) => (
              <RevealItem key={service.title} as="article">
                <Link
                  href={service.href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-[0_16px_32px_-20px_rgba(11,34,57,0.35)]"
                >
                  <h3 className="text-lg font-semibold text-brand-blue-dark">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
                    View service
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {galleryPairs.length > 0 ? (
        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Before and after from our crew"
              description="Real jobs from our gallery. Ask about photos from your neighborhood."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {galleryPairs.map((item) => (
                <BeforeAfterSlider
                  key={item.id}
                  beforeSrc={item.beforeSrc!}
                  afterSrc={item.afterSrc!}
                  beforeAlt={item.beforeAlt ?? "Before cleaning"}
                  afterAlt={item.afterAlt ?? "After cleaning"}
                  comparisonLabel={item.title}
                  beforeObjectPosition={item.beforeObjectPosition}
                  afterObjectPosition={item.afterObjectPosition}
                  sizes="(max-width: 896px) 100vw, 42rem"
                  aspectClassName="aspect-video"
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={cn("py-14 sm:py-16", galleryPairs.length > 0 ? "bg-section-light" : "bg-white")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our process" />
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {city.processSteps.map((step, index) => (
              <RevealItem
                key={step.title}
                className={cn(
                  "text-center",
                  index < city.processSteps.length - 1 ? "step-connector" : "step-connector-last"
                )}
              >
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-brand-blue text-base font-bold text-white ring-4 ring-white">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-brand-blue-dark">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className={cn("py-14 sm:py-16", galleryPairs.length > 0 ? "bg-white" : "bg-section-light")}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={`What ${city.cityName} neighbors say`} />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {city.testimonials.map((t) => (
              <figure
                key={`${t.name}-${t.service}`}
                className="flex flex-col rounded-2xl border border-border bg-white p-6"
              >
                <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <span className="block text-sm font-semibold text-brand-blue-dark">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {t.locationLabel} · {t.service}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={cn("py-14 sm:py-16", galleryPairs.length > 0 ? "bg-section-light" : "bg-white")}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Frequently asked questions" />
          <div className="mt-10 space-y-3">
            {city.faqItems.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-border bg-white p-5">
                <h3 className="font-semibold text-brand-blue-dark">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={cn("py-14 sm:py-16", galleryPairs.length > 0 ? "bg-white" : "bg-section-light")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-brand-blue-dark">Nearby areas we also serve</h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{city.nearbyAreasNote}</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {city.nearbyAreaSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/service-areas/${slug}`}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-brand-blue-dark transition-colors hover:border-brand-blue/40 hover:bg-accent"
              >
                {slugToCityName(slug)}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Content reviewed {city.contentReviewedLabel}</p>
        </div>
      </section>

      <CtaBand
        title={`Ready to refresh your ${city.cityName} property?`}
        description="Request a quote and we will hold a slot that fits your week."
      >
        <p className="mt-2 text-sm text-white/60">{city.serviceAvailability}</p>
      </CtaBand>
    </main>
  )
}
