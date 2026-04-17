import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { JsonLd } from "@/components/seo/JsonLd"
import {
  getServiceAreaBySlug,
  normalizeServiceAreaSlug,
  serviceAreaContent,
} from "@/data/service-areas"
import { ServiceAreaCityPageClient } from "@/app/service-areas/[city]/service-area-city-page-client"
import { buildBreadcrumbListJsonLd } from "@/lib/seo/json-ld-builders"
import { buildPublicMetadata } from "@/lib/seo/build-page-metadata"
import { getSiteUrl } from "@/lib/site-url"

interface ServiceAreaPageProps {
  params: Promise<{ city: string }>
}

export function generateStaticParams() {
  return serviceAreaContent.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({
  params,
}: ServiceAreaPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const normalizedSlug = normalizeServiceAreaSlug(resolvedParams.city)
  const city = getServiceAreaBySlug(normalizedSlug)

  if (!city || city.slug !== normalizedSlug) {
    return { title: "Service Area" }
  }

  const pathname = `/service-areas/${city.slug}`
  return buildPublicMetadata({
    title: city.seo.title,
    description: city.seo.description,
    pathname,
  })
}

export default async function ServiceAreaPage({ params }: ServiceAreaPageProps) {
  const resolvedParams = await params
  const normalizedSlug = normalizeServiceAreaSlug(resolvedParams.city)
  const city = getServiceAreaBySlug(normalizedSlug)

  if (!city || city.slug !== normalizedSlug) {
    notFound()
  }

  const base = getSiteUrl()
  const pathname = `/service-areas/${city.slug}`
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas" },
    { name: `${city.cityName}, ${city.stateCode}`, path: pathname },
  ]

  return (
    <>
      <JsonLd data={buildBreadcrumbListJsonLd(base, breadcrumbItems)} />
      <ServiceAreaCityPageClient city={city} />
    </>
  )
}
