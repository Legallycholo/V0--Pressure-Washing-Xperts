"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const residentialServices = [
  { href: "/services/residential/house-washing", label: "House Washing Services" },
  { href: "/services/residential/decks-fences", label: "Decks and Fences" },
  { href: "/services/residential/driveways-sidewalks", label: "Driveways and Sidewalks" },
  { href: "/services/residential/roof-soft-washing", label: "Roof Soft Washing" },
  { href: "/services/residential/brick-stone-masonry", label: "Brick, Stone & Masonry" },
  { href: "/services/residential/gutters", label: "Gutters" },
  { href: "/services/residential/landscape-features", label: "Landscape Features" },
  { href: "/services/residential/curbing", label: "Curbing" },
]

const commercialServices = [
  { href: "/services/commercial/hoa-services", label: "HOA Services" },
  { href: "/services/commercial/commercial-buildings", label: "Commercial Buildings" },
  { href: "/services/commercial/office-buildings", label: "Office Buildings" },
  { href: "/services/commercial/apartment-complexes", label: "Apartment Complexes" },
  { href: "/services/commercial/hotels-hospitality", label: "Hotels & Hospitality" },
  { href: "/services/commercial/government-complexes", label: "Government Complexes" },
  { href: "/services/commercial/awning-cleaning", label: "Awning Cleaning" },
  { href: "/services/commercial/gas-stations", label: "Gas Stations" },
  { href: "/services/commercial/graffiti-removal", label: "Graffiti Removal" },
  { href: "/services/commercial/parking-decks", label: "Parking Decks" },
]

const industrialServices = [
  { href: "/services/industrial/warehouses", label: "Warehouses" },
  { href: "/services/industrial/loading-docks", label: "Loading Docks" },
  { href: "/services/industrial/manufacturing-plants", label: "Manufacturing Plants" },
  { href: "/services/industrial/distribution-centers", label: "Distribution Centers" },
  { href: "/services/industrial/fleet-wash", label: "Fleet Wash" },
]

const serviceAreas = [
  "Atlanta, GA", "Alpharetta, GA", "Buford, GA", "College Park, GA", "Conyers, GA",
  "Cumming, GA", "Covington, GA", "Dacula, GA", "Douglasville, GA", "Duluth, GA",
  "Fairburn, GA", "Fayetteville, GA", "Grayson, GA", "Hiram, GA", "Johns Creek, GA",
  "Jonesboro, GA", "Kennesaw, GA", "Lawrenceville, GA", "Lilburn, GA", "Lithonia, GA",
  "Locust Grove, GA", "Mableton, GA", "Marietta, GA", "Milton, GA", "Norcross, GA",
  "Newnan, GA", "Riverdale, GA", "Smyrna, GA", "Snellville, GA", "Stockbridge, GA",
  "Stonecrest, GA", "Stone Mountain, GA", "Union City, GA", "Villa Rica, GA",
]

const aboutLinks = [
  { href: "/about/we-do-xpert", label: "We do Xpert" },
  { href: "/about/pressure-vs-soft-washing", label: "Pressure Washing vs. Soft Washing" },
  { href: "/#gallery", label: "Gallery" },
]

interface HeaderProps {
  onOpenQuoteForm: () => void
}

export function Header({ onOpenQuoteForm }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = () => {
    setIsMenuOpen(false)
    setOpenMobileDropdown(null)
  }

  const scrollToHero = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
    handleNavClick()
  }

  const toggleMobileDropdown = (menu: string) => {
    setOpenMobileDropdown(openMobileDropdown === menu ? null : menu)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-blue-dark/90 backdrop-blur-md shadow-lg"
          : "bg-brand-blue-dark/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Image
              src="/images/logo-new.png"
              alt="Pressure Washing Xperts Logo"
              width={220}
              height={80}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {/* Home */}
              <NavigationMenuItem>
                <Link href="/" onClick={scrollToHero} legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-brand-yellow focus:bg-white/10 focus:text-brand-yellow focus:outline-none">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Residential */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/90 hover:bg-white/10 hover:text-brand-yellow data-[state=open]:bg-white/10 data-[state=open]:text-brand-yellow">
                  Residential
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {residentialServices.map((service) => (
                      <li key={service.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={service.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{service.label}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Commercial */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/90 hover:bg-white/10 hover:text-brand-yellow data-[state=open]:bg-white/10 data-[state=open]:text-brand-yellow">
                  Commercial
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {commercialServices.map((service) => (
                      <li key={service.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={service.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{service.label}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Industrial */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/90 hover:bg-white/10 hover:text-brand-yellow data-[state=open]:bg-white/10 data-[state=open]:text-brand-yellow">
                  Industrial
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {industrialServices.map((service) => (
                      <li key={service.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={service.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{service.label}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Service Areas */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/90 hover:bg-white/10 hover:text-brand-yellow data-[state=open]:bg-white/10 data-[state=open]:text-brand-yellow">
                  Service Areas
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] grid-cols-2 gap-3 p-4">
                    {serviceAreas.map((area) => (
                      <li key={area}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/service-areas/${area.toLowerCase().replace(/,?\s+/g, '-')}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{area}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/90 hover:bg-white/10 hover:text-brand-yellow data-[state=open]:bg-white/10 data-[state=open]:text-brand-yellow">
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {aboutLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{link.label}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <a
              href="tel:800-451-7213"
              className="flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-brand-yellow"
            >
              <Phone className="size-4" />
              <span>Call/Text: (800)-451-7213</span>
            </a>
            <Button
              onClick={onOpenQuoteForm}
              className="bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark"
            >
              Get a Free Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0"
        }`}
      >
        <nav className="bg-brand-blue-dark/95 backdrop-blur-md px-4 py-6 space-y-2">
          {/* Home */}
          <Link
            href="/"
            onClick={scrollToHero}
            className="block text-base font-medium text-white/90 transition-colors hover:text-brand-yellow py-2"
          >
            Home
          </Link>

          {/* Residential Dropdown */}
          <div>
            <button
              onClick={() => toggleMobileDropdown('residential')}
              className="flex items-center justify-between w-full text-base font-medium text-white/90 transition-colors hover:text-brand-yellow py-2"
            >
              Residential
              <ChevronDown className={`size-4 transition-transform ${openMobileDropdown === 'residential' ? 'rotate-180' : ''}`} />
            </button>
            {openMobileDropdown === 'residential' && (
              <div className="pl-4 space-y-2 mt-2">
                {residentialServices.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={handleNavClick}
                    className="block text-sm text-white/80 transition-colors hover:text-brand-yellow py-1"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Commercial Dropdown */}
          <div>
            <button
              onClick={() => toggleMobileDropdown('commercial')}
              className="flex items-center justify-between w-full text-base font-medium text-white/90 transition-colors hover:text-brand-yellow py-2"
            >
              Commercial
              <ChevronDown className={`size-4 transition-transform ${openMobileDropdown === 'commercial' ? 'rotate-180' : ''}`} />
            </button>
            {openMobileDropdown === 'commercial' && (
              <div className="pl-4 space-y-2 mt-2">
                {commercialServices.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={handleNavClick}
                    className="block text-sm text-white/80 transition-colors hover:text-brand-yellow py-1"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Industrial Dropdown */}
          <div>
            <button
              onClick={() => toggleMobileDropdown('industrial')}
              className="flex items-center justify-between w-full text-base font-medium text-white/90 transition-colors hover:text-brand-yellow py-2"
            >
              Industrial
              <ChevronDown className={`size-4 transition-transform ${openMobileDropdown === 'industrial' ? 'rotate-180' : ''}`} />
            </button>
            {openMobileDropdown === 'industrial' && (
              <div className="pl-4 space-y-2 mt-2">
                {industrialServices.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={handleNavClick}
                    className="block text-sm text-white/80 transition-colors hover:text-brand-yellow py-1"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Service Areas Dropdown */}
          <div>
            <button
              onClick={() => toggleMobileDropdown('areas')}
              className="flex items-center justify-between w-full text-base font-medium text-white/90 transition-colors hover:text-brand-yellow py-2"
            >
              Service Areas
              <ChevronDown className={`size-4 transition-transform ${openMobileDropdown === 'areas' ? 'rotate-180' : ''}`} />
            </button>
            {openMobileDropdown === 'areas' && (
              <div className="pl-4 space-y-2 mt-2 max-h-48 overflow-y-auto">
                {serviceAreas.map((area) => (
                  <Link
                    key={area}
                    href={`/service-areas/${area.toLowerCase().replace(/,?\s+/g, '-')}`}
                    onClick={handleNavClick}
                    className="block text-sm text-white/80 transition-colors hover:text-brand-yellow py-1"
                  >
                    {area}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About Dropdown */}
          <div>
            <button
              onClick={() => toggleMobileDropdown('about')}
              className="flex items-center justify-between w-full text-base font-medium text-white/90 transition-colors hover:text-brand-yellow py-2"
            >
              About
              <ChevronDown className={`size-4 transition-transform ${openMobileDropdown === 'about' ? 'rotate-180' : ''}`} />
            </button>
            {openMobileDropdown === 'about' && (
              <div className="pl-4 space-y-2 mt-2">
                {aboutLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="block text-sm text-white/80 transition-colors hover:text-brand-yellow py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-4">
            <a
              href="tel:800-451-7213"
              className="flex items-center gap-2 text-base font-medium text-white transition-colors hover:text-brand-yellow"
            >
              <Phone className="size-5" />
              <span>Call/Text: (800)-451-7213</span>
            </a>
            <Button
              onClick={() => {
                onOpenQuoteForm()
                setIsMenuOpen(false)
              }}
              className="w-full bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark"
            >
              Get a Free Quote
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
