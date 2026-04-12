"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Phone, ChevronDown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  residentialServices,
  commercialServices,
  headerServiceAreaLinks,
  aboutLinks,
} from "@/data/navigation"
import { businessAddressLines, navSlogan } from "@/data/site"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ctaPress } from "@/lib/ctaInteraction"
import { OfferAnnouncementBar } from "@/components/layout/OfferAnnouncementBar"

interface HeaderProps {
  onOpenQuoteForm: () => void
}

export function Header({ onOpenQuoteForm }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navBg, setNavBg] = useState('rgba(13, 27, 42, 1)')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = 300
      
      if (scrollY <= maxScroll) {
        const opacity = 1 - (scrollY / maxScroll) * 0.4
        setNavBg(`rgba(13, 27, 42, ${opacity.toFixed(3)})`)
      } else {
        setNavBg('rgba(13, 27, 42, 0.6)')
      }
    }
    
    handleScroll() // Initial check
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isMenuOpen])

  const exitPage = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  const handleNavClick = () => {
    setIsMenuOpen(false)
    setOpenMobileDropdown(null)
  }

  const scrollToHero = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only hijack the click on the homepage (smooth scroll).
    // On any other page, let Next.js navigate to "/" normally.
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    handleNavClick()
  }

  const toggleMobileDropdown = (menu: string) => {
    setOpenMobileDropdown(openMobileDropdown === menu ? null : menu)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-[background-color] duration-300 backdrop-blur-sm shadow-sm"
      style={{ backgroundColor: isDropdownOpen ? 'rgba(13, 27, 42, 1)' : navBg }}
    >
      <div className="hidden lg:block border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-9 items-center justify-between text-xs text-white/65">
            <div className="flex items-center gap-4">
              <span>Pressure Washing Xperts LLC</span>
              <span className="text-white/30">|</span>
              <span>{navSlogan}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden xl:inline text-right leading-tight">
                {businessAddressLines.join(", ")}
              </span>
              <span className="xl:hidden text-right leading-tight">
                {businessAddressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
              <span className="text-white/30">|</span>
              <a
                href="mailto:pressurewashingxperts@gmail.com"
                className="text-sm xl:text-base text-white/75 hover:text-white transition-colors"
              >
                pressurewashingxperts@gmail.com
              </a>
              <span className="text-white/30">|</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="tel:800-451-7213"
                    className={`text-sm xl:text-base font-semibold text-brand-blue-light hover:text-brand-yellow transition-colors ${ctaPress} inline-block rounded-sm`}
                  >
                    (800)-451-7213
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">Tap to call</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-shrink-0">
        <div className="relative flex min-h-[48px] items-center">
          <div className="hidden min-w-0 lg:flex lg:flex-1" aria-hidden />
          {/* Desktop Navigation */}
          <NavigationMenu
            className="relative z-20 hidden min-w-0 flex-none lg:flex"
            viewport={false}
            onValueChange={(value) => setIsDropdownOpen(value !== "")}
          >
            <NavigationMenuList>
              {/* Home */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    onClick={scrollToHero}
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-brand-yellow focus:bg-white/10 focus:text-brand-yellow focus:outline-none"
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Residential */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/90 hover:bg-white/10 hover:text-brand-yellow data-[state=open]:bg-white/10 data-[state=open]:text-brand-yellow">
                  Residential
                </NavigationMenuTrigger>
                <NavigationMenuContent className="border-t-2 border-brand-yellow shadow-[0_8px_24px_rgba(0,0,0,0.4)] rounded-none mt-0">
                  <ul className="flex flex-col w-max min-w-[220px] max-w-[260px] py-2 bg-[#0d1b2a]">
                    {residentialServices.map((service) => (
                      <li key={service.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={service.href}
                            className="block px-5 py-3 text-sm text-white/90 hover:text-brand-yellow hover:bg-white/10 transition-colors no-underline outline-none whitespace-nowrap"
                          >
                            <div className="font-medium leading-none">{service.label}</div>
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
                <NavigationMenuContent className="border-t-2 border-brand-yellow shadow-[0_8px_24px_rgba(0,0,0,0.4)] rounded-none mt-0">
                  <ul className="flex flex-col w-max min-w-[220px] max-w-[260px] py-2 bg-[#0d1b2a]">
                    {commercialServices.map((service) => (
                      <li key={service.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={service.href}
                            className="block px-5 py-3 text-sm text-white/90 hover:text-brand-yellow hover:bg-white/10 transition-colors no-underline outline-none whitespace-nowrap"
                          >
                            <div className="font-medium leading-none">{service.label}</div>
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
                <NavigationMenuContent className="border-t-2 border-brand-yellow shadow-[0_8px_24px_rgba(0,0,0,0.4)] rounded-none mt-0">
                  <ul className="grid grid-cols-2 w-max min-w-[340px] max-w-[440px] py-2 bg-[#0d1b2a]">
                    {headerServiceAreaLinks.map((area) => (
                      <li key={area.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={area.href}
                            className="block px-5 py-3 text-sm text-white/90 hover:text-brand-yellow hover:bg-white/10 transition-colors no-underline outline-none whitespace-nowrap"
                          >
                            <div className="font-medium leading-none">{area.label}</div>
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
                <NavigationMenuContent className="border-t-2 border-brand-yellow shadow-[0_8px_24px_rgba(0,0,0,0.4)] rounded-none mt-0">
                  <ul className="flex flex-col w-max min-w-[220px] max-w-[260px] py-2 bg-[#0d1b2a]">
                    {aboutLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="block px-5 py-3 text-sm text-white/90 hover:text-brand-yellow hover:bg-white/10 transition-colors no-underline outline-none whitespace-nowrap"
                          >
                            <div className="font-medium leading-none">{link.label}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <button
                    type="button"
                    onClick={exitPage}
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-brand-yellow focus:bg-white/10 focus:text-brand-yellow focus:outline-none"
                  >
                    Exit
                  </button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTA */}
          <div className="hidden min-w-0 lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="tel:800-451-7213"
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white border border-white/60 rounded-md hover:border-white hover:bg-white/10 transition-all font-sans ${ctaPress}`}
                >
                  <span className="inline-flex size-8 items-center justify-center rounded-md bg-white/10 animate-pulse-glow motion-reduce:animate-none">
                    <Phone className="size-4" />
                  </span>
                  <span>Call Now</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom">Tap to call: free estimates</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onOpenQuoteForm}
                  className="bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark px-5 font-sans"
                >
                  Get a Quote
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Free quote, no obligation</TooltipContent>
            </Tooltip>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden ml-auto p-2 text-white"
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
        <nav className="bg-brand-blue-dark/95 backdrop-blur-md px-4 py-4 space-y-2">
          <div className="flex items-center justify-between gap-3 pb-3 mb-1 border-b border-white/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/45">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-brand-yellow ${ctaPress}`}
              aria-label="Exit menu"
            >
              <LogOut className="size-4" aria-hidden />
              Exit menu
            </button>
          </div>

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
                {headerServiceAreaLinks.map((area) => (
                  <Link
                    key={area.href}
                    href={area.href}
                    onClick={handleNavClick}
                    className="block text-sm text-white/80 transition-colors hover:text-brand-yellow py-1"
                  >
                    {area.label}
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
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false)
                exitPage()
              }}
              className={`flex w-full items-center justify-center gap-2 rounded-md border border-white/25 px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-brand-yellow ${ctaPress}`}
            >
              <LogOut className="size-5" aria-hidden />
              Exit page
            </button>
            <a
              href="tel:800-451-7213"
              className={`flex items-center gap-2 text-base font-medium text-white transition-colors hover:text-brand-yellow ${ctaPress}`}
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
      <OfferAnnouncementBar />
    </header>
  )
}
