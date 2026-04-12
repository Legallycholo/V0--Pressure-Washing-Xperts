"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, CheckCircle2, ArrowRight, MapPin, Star } from "lucide-react"
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
      <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-20 pt-header-offset overflow-hidden">
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
            <span className="inline-block mb-4 px-4 py-2 bg-brand-yellow text-brand-blue-dark font-semibold rounded-full text-sm">
              Service Area
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              {city.hero.headline}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/80 leading-relaxed mb-2">
              {city.hero.subheadline}
            </p>
            <p className="mx-auto max-w-3xl text-sm text-white/70 mb-4">
              Serving {city.cityName}, {city.stateCode} in {city.county}
            </p>
            <p className="mx-auto max-w-2xl text-sm text-white/75 mb-8">{city.serviceAvailability}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onOpenQuoteForm}
                size="lg"
                className="bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark"
              >
                {city.cta.primary}
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-blue-dark"
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

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-blue-dark mb-6">
                Trust the Xperts in {city.cityName}
              </h2>
              <ul className="space-y-4">
                {city.trustPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="size-6 text-brand-yellow flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-brand-blue/10 to-brand-yellow/10 rounded-lg overflow-hidden flex items-center justify-center ring-1 ring-black/5">
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
                <div className="text-center px-6">
                  <MapPin className="size-14 text-brand-blue-dark/50 mx-auto mb-4" />
                  <p className="text-gray-600 text-sm max-w-xs mx-auto">
                    Add a coverage map here when you have one. Until then we still walk the property and lock the scope on site.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {city.coverageMapImageSrc ? (
        <section className="py-12 bg-section-light">
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

      <section className="py-16 bg-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue-dark mb-4">
              Popular work in {city.cityName}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Open any link for photos, benefits, and how we run the job. Same crew habits wherever we go in the metro.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {city.localizedServiceCards.map((service) => (
              <div
                key={service.title}
                className={cn(hubCardLight, "flex h-full flex-col rounded-xl")}
              >
                <h3 className="text-xl font-semibold text-brand-blue-dark mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 flex-1">{service.description}</p>
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
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-blue-dark mb-2 text-center">
              Before and after from our crew
            </h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto text-sm">
              Real jobs from the gallery. Ask if you want photos from a neighborhood like yours in {city.cityName}.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
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
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue-dark mb-4">Our Process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {city.processSteps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto w-16 h-16 bg-brand-yellow text-brand-blue-dark rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-brand-blue-dark mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-section-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-blue-dark mb-8 text-center">
            What {city.cityName} neighbors say
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {city.testimonials.map((t) => (
              <div
                key={`${t.name}-${t.service}`}
                className="rounded-xl border border-brand-blue/10 bg-white p-6 shadow-sm"
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

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-blue-dark mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {city.faqItems.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-brand-blue/10 bg-section-light/50 p-5">
                <h3 className="font-semibold text-brand-blue-dark mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-blue-dark mb-4">Nearby areas we also serve</h2>
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

      <section className="py-16 bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Refresh Your {city.cityName} Property?
          </h2>
          <p className="text-lg text-white/80 mb-4">
            Request a quote and we will hold a slot that fits your week.
          </p>
          <p className="text-sm text-white/70 mb-8">{city.serviceAvailability}</p>
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
