import Link from "next/link"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"
import { cn } from "@/lib/utils"

interface CtaButtonsProps {
  /** `dark` for navy bands and photo heroes, `light` for white sections. */
  tone?: "light" | "dark"
  align?: "center" | "start"
  /** Overrides the default "Call (800) 451-7213" label. */
  callLabel?: string
  className?: string
}

/**
 * The site's one pair of conversion buttons: call (primary) and request a
 * callback (secondary). Every hero and CTA band uses this so the wording,
 * phone format, and styling stay identical everywhere.
 */
export function CtaButtons({
  tone = "light",
  align = "center",
  callLabel,
  className,
}: CtaButtonsProps) {
  const onDark = tone === "dark"

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row",
        align === "center" ? "sm:justify-center" : "sm:justify-start",
        className
      )}
    >
      <Button asChild size="lg" variant={onDark ? "inverse" : "default"}>
        <a href={businessPhoneTelHref}>
          <Phone className="size-4" aria-hidden />
          {callLabel ?? `Call ${businessPhoneDisplay}`}
        </a>
      </Button>
      <Button asChild size="lg" variant={onDark ? "outlineInverse" : "outline"}>
        <Link href="/contact">Request Callback</Link>
      </Button>
    </div>
  )
}
