"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react"
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
  fleetServices,
  headerServiceAreaLinks,
  aboutLinks,
  type NavLinkItem,
} from "@/data/navigation"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"
import { cn } from "@/lib/utils"
import logo from "@/public/logo.png"

type NavGroup = {
  id: string
  label: string
  links: NavLinkItem[]
  /** Hub page shown as "View all" at the bottom of the dropdown. */
  hub?: { href: string; label: string }
  /** Tailwind grid classes for the desktop dropdown. */
  gridClassName: string
}

const navGroups: NavGroup[] = [
  {
    id: "residential",
    label: "Residential",
    links: residentialServices,
    hub: { href: "/services/residential", label: "All residential services" },
    gridClassName: "w-[min(46rem,calc(100vw-4rem))] grid-cols-2 xl:grid-cols-3",
  },
  {
    id: "commercial",
    label: "Commercial",
    links: commercialServices,
    hub: { href: "/services/commercial", label: "All commercial services" },
    gridClassName: "w-[min(36rem,calc(100vw-4rem))] grid-cols-2",
  },
  {
    id: "fleet",
    label: "Fleet Washing",
    links: fleetServices,
    gridClassName: "w-60 grid-cols-1",
  },
  {
    id: "areas",
    label: "Service Areas",
    links: headerServiceAreaLinks,
    hub: { href: "/service-areas", label: "All service areas" },
    gridClassName: "w-[22rem] grid-cols-2 xl:w-[34rem] xl:grid-cols-3",
  },
  {
    id: "about",
    label: "About",
    links: aboutLinks,
    gridClassName: "w-64 grid-cols-1",
  },
]

const desktopTriggerClass =
  "h-10 bg-transparent px-3 text-[0.9375rem] font-medium text-brand-blue-dark hover:bg-accent hover:text-brand-blue focus:bg-accent data-[state=open]:bg-accent data-[state=open]:text-brand-blue"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    // Lock page scroll behind the full-height mobile menu
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const closeMenu = () => {
    setIsMenuOpen(false)
    setOpenMobileGroup(null)
  }

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only hijack the click on the homepage (smooth scroll).
    // On any other page, let Next.js navigate to "/" normally.
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    closeMenu()
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] border-b bg-white transition-shadow duration-300",
        scrolled ? "border-border shadow-[0_4px_20px_-12px_rgba(11,34,57,0.35)]" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link
          href="/"
          onClick={scrollToTop}
          className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Pressure Washing Xperts home"
        >
          <Image
            src={logo}
            alt="Pressure Washing Xperts logo"
            priority
            sizes="112px"
            className="h-11 w-auto lg:h-16"
          />
        </Link>

        {/* Desktop navigation */}
        <NavigationMenu viewport={false} className="ml-4 hidden flex-1 justify-start lg:flex xl:ml-8">
          <NavigationMenuList className="gap-0.5">
            {navGroups.map((group) => (
              <NavigationMenuItem key={group.id}>
                <NavigationMenuTrigger className={desktopTriggerClass}>{group.label}</NavigationMenuTrigger>
                <NavigationMenuContent className="p-0">
                  <ul className={cn("grid gap-x-2 p-3", group.gridClassName)}>
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-blue-dark hover:bg-accent hover:text-brand-blue"
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  {group.hub ? (
                    <NavigationMenuLink asChild>
                      <Link
                        href={group.hub.href}
                        className="flex flex-row items-center justify-between rounded-none border-t border-border bg-section-light px-6 py-3 text-sm font-semibold text-brand-blue hover:bg-accent"
                      >
                        {group.hub.label}
                        <ArrowRight className="size-4 text-brand-blue" aria-hidden />
                      </Link>
                    </NavigationMenuLink>
                  ) : null}
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2 lg:gap-3">
          <a
            href={businessPhoneTelHref}
            className="hidden items-center gap-2 rounded-lg px-2 py-2 text-[0.9375rem] font-semibold text-brand-blue-dark transition-colors hover:text-brand-blue xl:inline-flex"
          >
            <Phone className="size-4 text-brand-blue" aria-hidden />
            {businessPhoneDisplay}
          </a>
          <Button asChild className="hidden h-10 px-5 lg:inline-flex">
            <Link href="/contact">Request Callback</Link>
          </Button>

          {/* Mobile: one-tap call + menu toggle */}
          <a
            href={businessPhoneTelHref}
            className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-blue text-white lg:hidden"
            aria-label={`Call ${businessPhoneDisplay}`}
          >
            <Phone className="size-5" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex size-10 items-center justify-center rounded-lg text-brand-blue-dark hover:bg-accent lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-y-auto overscroll-contain border-t border-border bg-white lg:hidden",
          isMenuOpen ? "h-[calc(100dvh-4rem)]" : "hidden"
        )}
      >
        <nav className="px-4 pb-8 pt-2" aria-label="Mobile">
          <Link
            href="/"
            onClick={scrollToTop}
            className="flex min-h-12 items-center border-b border-border text-base font-semibold text-brand-blue-dark"
          >
            Home
          </Link>

          {navGroups.map((group) => {
            const isOpen = openMobileGroup === group.id
            return (
              <div key={group.id} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpenMobileGroup(isOpen ? null : group.id)}
                  className="flex min-h-12 w-full items-center justify-between text-base font-semibold text-brand-blue-dark"
                  aria-expanded={isOpen}
                  aria-controls={`mobile-group-${group.id}`}
                >
                  {group.label}
                  <ChevronDown
                    className={cn("size-5 text-muted-foreground transition-transform", isOpen && "rotate-180")}
                    aria-hidden
                  />
                </button>
                {isOpen ? (
                  <ul id={`mobile-group-${group.id}`} className="pb-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className="flex min-h-11 items-center rounded-lg px-3 text-[0.9375rem] text-slate-700 hover:bg-accent hover:text-brand-blue"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    {group.hub ? (
                      <li>
                        <Link
                          href={group.hub.href}
                          onClick={closeMenu}
                          className="flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-[0.9375rem] font-semibold text-brand-blue hover:bg-accent"
                        >
                          {group.hub.label}
                          <ArrowRight className="size-4" aria-hidden />
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                ) : null}
              </div>
            )
          })}

          <div className="mt-6 grid gap-3">
            <Button asChild size="lg">
              <a href={businessPhoneTelHref}>
                <Phone className="size-4" aria-hidden />
                Call {businessPhoneDisplay}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact" onClick={closeMenu}>
                Request Callback
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
