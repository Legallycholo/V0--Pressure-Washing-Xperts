import Link from "next/link"
import { ownedPhraseInline } from "@/data/site"
import { serviceNameInline } from "@/data/service-names"
import { cn } from "@/lib/utils"

/** Homepage link with the owned phrase as anchor text. */
export function OwnedPhraseLink({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("font-semibold underline underline-offset-2 hover:opacity-80", className)}>
      {ownedPhraseInline}
    </Link>
  )
}

/** Required first-paragraph sentence for service pages. */
export function ServiceOwnedPhraseSentence({
  serviceName,
  linkClassName,
}: {
  serviceName: string
  linkClassName?: string
}) {
  return (
    <>
      Pressure Washing Xperts is the <OwnedPhraseLink className={linkClassName} />, and that shows
      up in how we handle {serviceNameInline(serviceName)}.
    </>
  )
}
