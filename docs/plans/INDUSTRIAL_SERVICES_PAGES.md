# Archived: Industrial Services routes and references

Industrial service URLs were removed from the live site. Restore by recreating `app/services/industrial/*`, re-adding `industrialServices` and quick link in `data/navigation.ts`, and wiring Header/Footer/Services again.

## Index (removed URLs → former source paths)

| URL | Source file |
|-----|-------------|
| `/services/industrial` | `app/services/industrial/page.tsx` |
| `/services/industrial/equipment-washing` | `app/services/industrial/equipment-washing/page.tsx` |
| `/services/industrial/warehouse-exteriors` | `app/services/industrial/warehouse-exteriors/page.tsx` |
| `/services/industrial/loading-docks` | `app/services/industrial/loading-docks/page.tsx` |
| `/services/industrial/distribution-centers` | `app/services/industrial/distribution-centers/page.tsx` |
| `/services/industrial/fleet-wash` | `app/services/industrial/fleet-wash/page.tsx` |
| `/services/industrial/manufacturing-plants` | `app/services/industrial/manufacturing-plants/page.tsx` |

## Note on `image_dd791c.jpg`

The home “Industrial Services” card in this repo used a **placeholder** block (no `imageSrc`); it did not reference `image_dd791c.jpg`. If that asset exists only in a design export, it is not under `public/` in this codebase.

---

## Archived `page.tsx` sources

### `app/services/industrial/page.tsx`

```tsx
"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { ServiceCategoryHubTemplate } from "@/components/templates/ServiceCategoryHubTemplate"
import { industrialServices } from "@/data/navigation"

export default function IndustrialServicesHubPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServiceCategoryHubTemplate
        categoryLabel="Industrial Services"
        title="Industrial Pressure Washing Services"
        description="Heavy-duty cleaning for warehouses, loading docks, equipment, and large-scale industrial facilities."
        services={industrialServices}
        onOpenQuoteForm={() => setIsQuoteFormOpen(true)}
      />
      <Footer />
      <FloatingCallButton />
      <ContactFormModal
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
      />
    </>
  )
}
```

### `app/services/industrial/equipment-washing/page.tsx`

```tsx
"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function IndustrialEquipmentPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServicePageTemplate
        title="Industrial Equipment Washing"
        description="Heavy-duty exterior cleaning for large machinery, equipment, and industrial assets."
        category="Industrial"
        benefits={[
          "Removes grease, oil & industrial residue",
          "Safe for steel, aluminum & coated surfaces",
          "High-pressure & hot water systems available",
          "Helps meet safety & facility inspection standards",
          "On-site service at your location",
          "Licensed, bonded & insured"
        ]}
        onOpenQuoteForm={() => setIsQuoteFormOpen(true)}
      />
      <Footer />
      <FloatingCallButton />
      <ContactFormModal
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
      />
    </>
  )
}
```

### `app/services/industrial/warehouse-exteriors/page.tsx`

```tsx
"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function WarehouseExteriorsPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServicePageTemplate
        title="Warehouse Exterior Washing"
        description="Professional large-scale exterior cleaning for warehouses, distribution centers, and industrial facilities."
        category="Industrial"
        benefits={[
          "Cleans large building facades & dock areas",
          "Removes mold, algae & environmental staining",
          "Safe for metal panels, concrete block & masonry",
          "Soft wash or high-pressure by surface type",
          "Commercial-grade equipment handles any scale",
          "Serving Metro Atlanta industrial properties"
        ]}
        onOpenQuoteForm={() => setIsQuoteFormOpen(true)}
      />
      <Footer />
      <FloatingCallButton />
      <ContactFormModal
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
      />
    </>
  )
}
```

### `app/services/industrial/loading-docks/page.tsx`

```tsx
"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function LoadingDocksPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServicePageTemplate
        title="Loading Dock Cleaning"
        description="Professional cleaning for loading docks and shipping areas"
        category="Industrial"
        onOpenQuoteForm={() => setIsQuoteFormOpen(true)}
      />
      <Footer />
      <FloatingCallButton />
      <ContactFormModal
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
      />
    </>
  )
}
```

### `app/services/industrial/distribution-centers/page.tsx`

```tsx
"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function DistributionCentersPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServicePageTemplate
        title="Distribution Center Cleaning"
        description="Professional pressure washing for distribution centers and logistics facilities"
        category="Industrial"
        onOpenQuoteForm={() => setIsQuoteFormOpen(true)}
      />
      <Footer />
      <FloatingCallButton />
      <ContactFormModal
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
      />
    </>
  )
}
```

### `app/services/industrial/fleet-wash/page.tsx`

```tsx
"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function FleetWashPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServicePageTemplate
        title="Fleet Wash Services"
        description="Commercial fleet washing and vehicle cleaning services"
        category="Industrial"
        onOpenQuoteForm={() => setIsQuoteFormOpen(true)}
      />
      <Footer />
      <FloatingCallButton />
      <ContactFormModal
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
      />
    </>
  )
}
```

### `app/services/industrial/manufacturing-plants/page.tsx`

```tsx
"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function ManufacturingPlantsPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServicePageTemplate
        title="Manufacturing Plant Cleaning"
        description="Industrial pressure washing for manufacturing facilities"
        category="Industrial"
        onOpenQuoteForm={() => setIsQuoteFormOpen(true)}
      />
      <Footer />
      <FloatingCallButton />
      <ContactFormModal
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
      />
    </>
  )
}
```

---

## Industrial-related navigation (archived snippet from `data/navigation.ts`)

```ts
export const industrialServices: NavLinkItem[] = [
  { href: "/services/industrial/equipment-washing", label: "Industrial Equipment Washing" },
  { href: "/services/industrial/warehouse-exteriors", label: "Warehouse Exteriors" },
  { href: "/services/industrial/loading-docks", label: "Loading Docks" },
]

// In quickLinks:
  { href: "/services/industrial", label: "Industrial Services" },
```

Industrial pages used `ServicePageTemplate` with `category="Industrial"` and the hub used `ServiceCategoryHubTemplate` with industrial labels and `services={industrialServices}`. Residential and commercial hubs still use the same templates.

### `components/ServicePageTemplate.tsx` (full shared template; industrial used `category="Industrial"`)

```tsx
"use client"

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
```

> **After removal:** live `ServicePageTemplate` narrows `category` to `"Residential" | "Commercial"` only. Restore `"Industrial"` in the union when bringing industrial pages back.

### `components/ServiceCategoryHubTemplate.tsx` (full)

```tsx
"use client"

import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { NavLinkItem } from "@/data/navigation"

interface ServiceCategoryHubTemplateProps {
  categoryLabel: string
  title: string
  description: string
  services: NavLinkItem[]
  onOpenQuoteForm: () => void
}

export function ServiceCategoryHubTemplate({
  categoryLabel,
  title,
  description,
  services,
  onOpenQuoteForm,
}: ServiceCategoryHubTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-section-light to-white">
      <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-20 pt-header-offset">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block mb-4 px-4 py-2 bg-brand-yellow text-brand-blue-dark font-semibold rounded-full text-sm uppercase tracking-wide">
            {categoryLabel}
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">{title}</h1>
          <p className="mx-auto max-w-3xl text-lg text-white/80 leading-relaxed mb-8">{description}</p>
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
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-brand-blue text-xs font-semibold uppercase tracking-[0.2em]">What We Clean</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-blue-dark sm:text-4xl">Our {categoryLabel}</h2>
            <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
              Select a service below to view the dedicated service page. This structure is intentionally simple so it can scale as content is added.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="rounded-lg border border-brand-blue/10 bg-white p-5 sm:p-6 shadow-sm hover:border-brand-blue/40 hover:shadow-md transition-all"
              >
                <h3 className="text-base sm:text-lg font-semibold text-brand-blue-dark mb-2">{service.label}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Structured service placeholder page for upcoming content, FAQs, gallery samples, and pricing context.
                </p>
                <span className="inline-flex items-center text-brand-blue font-semibold text-sm">
                  Learn More
                  <ArrowRight className="size-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-brand-blue/10 bg-white p-6 sm:p-7 text-center">
            <p className="text-gray-600">
              Need help choosing the right service? We can recommend the best process for your property type.
            </p>
            <Button
              onClick={onOpenQuoteForm}
              className="mt-5 bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark"
            >
              Request a Free Estimate
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
```

---

## `scripts/generate-service-pages.js` industrial rows (reference)

These paths may not match every on-disk route; kept for historical generator context:

```js
  { path: 'services/industrial/warehouses', title: 'Warehouses', category: 'Industrial', desc: 'Industrial-strength cleaning for warehouse facilities and loading areas.' },
  { path: 'services/industrial/loading-docks', title: 'Loading Docks', category: 'Industrial', desc: 'Professional cleaning for loading docks to maintain safety and cleanliness standards.' },
  { path: 'services/industrial/manufacturing-plants', title: 'Manufacturing Plants', category: 'Industrial', desc: 'Specialized cleaning services for manufacturing facilities and equipment.' },
  { path: 'services/industrial/distribution-centers', title: 'Distribution Centers', category: 'Industrial', desc: 'Comprehensive cleaning for distribution centers to maintain operational efficiency.' },
  { path: 'services/industrial/fleet-wash', title: 'Fleet Wash', category: 'Industrial', desc: 'Professional fleet washing services to keep your vehicles clean and branded.' },
```
