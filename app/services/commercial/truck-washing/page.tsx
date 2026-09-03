"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { commercialTruckWashingMedia } from "@/data/commercial-service-media"

export default function TruckWashingPage() {
  const leaf = getServiceLeafCopy("truck-washing")

  return (
    <>
      <Header />
      <ServicePageTemplate
        title="Commercial Truck Washing & Heavy Vehicle Cleaning in Metro Atlanta"
        description="Highway film, diesel soot, hydraulic grease, and Georgia red clay take a toll on your trucks and company reputation. We bring commercial-grade mobile wash rigs directly to your yard or job site to clean semi-trucks, box trucks, dump trucks, flatbeds, and utility work trucks without disrupting route schedules. Serving Ellenwood, GA and all Metro Atlanta freight corridors."
        category="Commercial"
        benefits={[
          "Semi-trucks, box trucks, dump trucks, trailers & utility fleets",
          "Hot/cold mobile wash rigs with heavy degreasing for chassis & wheels",
          "Flexible on-site scheduling for evenings, weekends & yard downtime"
        ]}
        {...commercialTruckWashingMedia}
        {...leaf}
        contentRevised="August 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
