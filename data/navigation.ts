import {
  getServiceAreasForNavigation,
  getTopServiceAreas,
} from "@/data/service-areas"

export interface NavLinkItem {
  href: string
  label: string
}

export const residentialServices: NavLinkItem[] = [
  { href: "/services/residential/house-washing", label: "House Washing Services" },
  { href: "/services/residential/decks-fences", label: "Decks and Fences" },
  { href: "/services/residential/driveways-sidewalks", label: "Driveways and Sidewalks" },
  { href: "/services/residential/roof-soft-washing", label: "Roof Soft Washing" },
  { href: "/services/residential/brick-stone-masonry", label: "Brick, Stone & Masonry" },
  { href: "/services/residential/gutters", label: "Gutters" },
  { href: "/services/residential/landscape-features", label: "Landscape Features" },
  { href: "/services/residential/curbing", label: "Curbing" },
]

export const commercialServices: NavLinkItem[] = [
  { href: "/services/commercial/building-washing", label: "Commercial Building Washing" },
  { href: "/services/commercial/parking-lots-garages", label: "Parking Lots & Garages" },
  { href: "/services/commercial/storefronts", label: "Storefronts" },
  { href: "/services/commercial/graffiti-removal", label: "Graffiti Removal" },
  { href: "/services/commercial/dumpster-pads", label: "Dumpster Pads" },
  { href: "/services/commercial/fleet-washing", label: "Fleet Washing" },
]

export const industrialServices: NavLinkItem[] = [
  { href: "/services/industrial/equipment-washing", label: "Industrial Equipment Washing" },
  { href: "/services/industrial/warehouse-exteriors", label: "Warehouse Exteriors" },
  { href: "/services/industrial/loading-docks", label: "Loading Docks" },
]

export const aboutLinks: NavLinkItem[] = [
  { href: "/about/we-do-xpert", label: "We do Xpert" },
  { href: "/about/pressure-vs-soft-washing", label: "Pressure Washing vs. Soft Washing" },
  { href: "/gallery", label: "Gallery" },
]

export const quickLinks: NavLinkItem[] = [
  { href: "/services/residential", label: "Residential Services" },
  { href: "/services/commercial", label: "Commercial Services" },
  { href: "/services/industrial", label: "Industrial Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
]

export const headerServiceAreaLinks: NavLinkItem[] = getServiceAreasForNavigation().map((area) => ({
  href: `/service-areas/${area.slug}`,
  label: `${area.cityName}, ${area.stateCode}`,
}))

export const footerTopServiceAreaLinks: NavLinkItem[] = getTopServiceAreas(8).map((area) => ({
  href: `/service-areas/${area.slug}`,
  label: `${area.cityName}, ${area.stateCode}`,
}))

