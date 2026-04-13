"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, CheckCircle2, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ServiceAreaPageContent } from "@/data/service-areas"
import { getCityGalleryComparisonItems } from "@/data/city-gallery"
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider"
import { hubCardLight, ctaPress } from "@/lib/ctaInteraction"
import { cn } from "@/lib/utils"

interface ServiceAreaPageTemplateProps {
  city: ServiceAreaPageContent
  onOpenQuoteForm: () => void
}

export function ServiceAreaPageTemplate({ city, onOpenQuoteForm }: ServiceAreaPageTemplateProps) {
  const galleryPairs = getCityGalleryComparisonItems(city.slug)

  return (
    <div className="min-h-screen bg-gradient-to-b from-section-light to-white">
      <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-8 sm:py-12 pt-header-offset overflow-hidden">
        {city.heroImageSrc ? (
          <Image
            src={city.heroImageSrc}
            alt={city.heroImageAlt ?? `${city.cityName}, Georgia service area`}
            fill
            className="object-cover opacity-35"
            sizes="100vw"
            priority
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-dark/95 to-brand-blue/90" />
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block mb-2 px-3 py-1 bg-brand-yellow text-brand-blue-dark font-semibold rounded-full text-xs sm:text-sm">
              Service Area
            </span>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-5xl mb-3">
              {city.hero.headline}
            </h1>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed mb-2">
              {city.hero.subheadline}
            </p>
            <p className="mx-auto max-w-2xl text-xs sm:text-sm text-white/70 mb-4">
              Serving {city.cityName}, {city.stateCode} in {city.county} · {city.serviceAvailability}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={onOpenQuoteForm}
                size="lg"
                className="bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark min-h-[44px]"
              >
                {city.cta.primary}
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-blue-dark min-h-[44px]"
              >
                <a href="tel:800-451-7213" className={`flex items-center gap-2 ${ctaPress}`}>
                  <Phone className="size-5" />
                  {city.cta.secondary}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-7 items-center">
            <div>
              <h2 className="text-2xl font-bold text-brand-blue-dark mb-4">
                Trust the Xperts in {city.cityName}
              </h2>
              <ul className="space-y-3">
                {city.trustPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-brand-yellow flex-shrink-0 mt-1" />
                    <span className="text-base text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-72 bg-gradient-to-br from-brand-blue/10 to-brand-yellow/10 rounded-lg overflow-hidden flex items-center justify-center ring-1 ring-black/5 md:mx-auto md:max-w-[90%]">
              {city.heroImageSrc ? (
                <Image
                  src={city.heroImageSrc}
                  alt={city.heroImageAlt ?? `${city.cityName} neighborhood`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 50vw"
                />
              ) : city.coverageMapImageSrc ? (
                <Image
                  src={city.coverageMapImageSrc}
                  alt={city.coverageMapAlt ?? `Service coverage near ${city.cityName}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 50vw"
                />
              ) : (
                <div className="text-center px-6 py-8 flex flex-col items-center gap-4 max-w-sm mx-auto">
                  <p className="text-gray-700 text-base font-medium">
                    See your neighborhood on the schedule — call for a quote.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark"
                  >
                    <a href="tel:800-451-7213" className={`flex items-center gap-2 ${ctaPress}`}>
                      <Phone className="size-5" />
                      Call now
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {city.coverageMapImageSrc ? (
        <section className="py-8 bg-section-light">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-brand-blue-dark mb-4">Coverage area</h2>
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-md ring-1 ring-black/5">
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

      <section className="py-10 bg-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7">
            <h2 className="text-2xl font-bold text-brand-blue-dark mb-3">
              Popular work in {city.cityName}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Photos, benefits, and how we run each job. Same crew standards across the metro.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {city.localizedServiceCards.map((service) => (
              <div
                key={service.title}
                className={cn(hubCardLight, "flex h-full flex-col rounded-xl")}
              >
                <h3 className="text-base sm:text-lg font-semibold text-brand-blue-dark mb-1.5">{service.title}</h3>
                <p className="text-gray-600 mb-3 flex-1 text-sm">{service.description}</p>
                <Link
                  href={service.href}
                  className="text-brand-blue font-medium hover:text-brand-blue-dark inline-flex items-center gap-1"
                >
                  View Service
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {galleryPairs.length > 0 ? (
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-brand-blue-dark mb-2 text-center">
              Before and after from our crew
            </h2>
            <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto text-sm">
              Real jobs from the gallery—ask about photos from your neighborhood.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
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

      <section className="py-10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7">
            <h2 className="text-2xl font-bold text-brand-blue-dark mb-2">Our Process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {city.processSteps.map((step, index) => (
              <div
                key={step.title}
                className={`text-center animate-step-reveal ${index < city.processSteps.length - 1 ? "step-connector" : ""} ${index === city.processSteps.length - 1 ? "step-connector-last" : ""}`}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="mx-auto w-14 h-14 bg-brand-yellow text-brand-blue-dark rounded-full flex items-center justify-center text-xl font-bold mb-3 shadow-md ring-4 ring-brand-yellow/20">
                  {index + 1}
                </div>
                <h3 className="text-base font-semibold text-brand-blue-dark mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-section-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-blue-dark mb-6 text-center">
            What {city.cityName} neighbors say
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {city.testimonials.map((t) => (
              <div
                key={`${t.name}-${t.service}`}
                className="rounded-xl border border-brand-blue/10 bg-white p-4 shadow-sm"
              >
                <div className="flex gap-1 mb-3" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-brand-yellow text-brand-yellow" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="font-semibold text-brand-blue-dark text-sm">{t.name}</p>
                <p className="text-xs text-gray-500">{t.locationLabel}</p>
                <p className="text-xs text-brand-blue mt-1">{t.service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-blue-dark mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {city.faqItems.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-brand-blue/10 bg-section-light/50 p-4">
                <h3 className="font-semibold text-brand-blue-dark mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-brand-blue-dark mb-3">Nearby areas we also serve</h2>
          <p className="text-gray-600 mb-4 max-w-3xl leading-relaxed">{city.nearbyAreasNote}</p>
          <div className="flex flex-wrap gap-3 mb-6">
            {city.nearbyAreaSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/service-areas/${slug}`}
                className="rounded-full border border-brand-blue/20 px-4 py-2 text-sm text-brand-blue hover:bg-brand-blue hover:text-white"
              >
                {slug.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
          <p className="text-xs text-gray-500">Content reviewed {city.contentReviewedLabel}</p>
        </div>
      </section>

      <section className="py-10 bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Ready to Refresh Your {city.cityName} Property?
          </h2>
          <p className="text-base text-white/80 mb-3">
            Request a quote and we will hold a slot that fits your week.
          </p>
          <p className="text-sm text-white/70 mb-6">{city.serviceAvailability}</p>
          <Button
            onClick={onOpenQuoteForm}
            size="lg"
            className="bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark"
          >
            Get a Free Quote
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}
