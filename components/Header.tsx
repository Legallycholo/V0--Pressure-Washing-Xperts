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
import {
  residentialServices,
  commercialServices,
  industrialServices,
  headerServiceAreaLinks,
  aboutLinks,
} from "@/data/navigation"

interface HeaderProps {
  onOpenQuoteForm: () => void
}

export function Header({ onOpenQuoteForm }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navBg, setNavBg] = useState('rgba(13, 27, 42, 1)')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)

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
      className="fixed top-0 left-0 right-0 z-50 transition-[background-color] duration-300 backdrop-blur-sm shadow-sm"
      style={{ backgroundColor: isDropdownOpen ? 'rgba(13, 27, 42, 1)' : navBg }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-shrink-0">
        <div className="flex py-2 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Image
              src="/images/logo-new.png"
              alt="Pressure Washing Xperts Logo"
              width={800}
              height={280}
              className="h-[180px] w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu 
            className="hidden lg:flex"
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

              {/* Industrial */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/90 hover:bg-white/10 hover:text-brand-yellow data-[state=open]:bg-white/10 data-[state=open]:text-brand-yellow">
                  Industrial
                </NavigationMenuTrigger>
                <NavigationMenuContent className="border-t-2 border-brand-yellow shadow-[0_8px_24px_rgba(0,0,0,0.4)] rounded-none mt-0">
                  <ul className="flex flex-col w-max min-w-[220px] max-w-[260px] py-2 bg-[#0d1b2a]">
                    {industrialServices.map((service) => (
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
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <a
              href="tel:800-451-7213"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white border border-white/60 rounded-md hover:border-white hover:bg-white/10 transition-all font-sans"
            >
              <Phone className="size-4" />
              <span>Call Now</span>
            </a>
            <Button
              onClick={onOpenQuoteForm}
              className="bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark px-5 font-sans"
            >
              Get a Quote
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
