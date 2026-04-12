import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  getServiceAreaBySlug,
  normalizeServiceAreaSlug,
  serviceAreaContent,
} from "@/data/service-areas"
import { ServiceAreaCityPageClient } from "@/app/service-areas/[city]/service-area-city-page-client"

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

  return {
    title: city.seo.title,
    description: city.seo.description,
  }
}

export default async function ServiceAreaPage({ params }: ServiceAreaPageProps) {
  const resolvedParams = await params
  const normalizedSlug = normalizeServiceAreaSlug(resolvedParams.city)
  const city = getServiceAreaBySlug(normalizedSlug)

  if (!city || city.slug !== normalizedSlug) {
    notFound()
  }

  return <ServiceAreaCityPageClient city={city} />
}
