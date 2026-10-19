import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: "center" | "start"
  /** `dark` when the section background is navy. */
  tone?: "light" | "dark"
  as?: "h1" | "h2"
  id?: string
  className?: string
}

/** Eyebrow + heading + supporting line, shared by every content section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  const onDark = tone === "dark"

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-2 text-sm font-semibold uppercase tracking-wider",
            onDark ? "text-brand-blue-light" : "text-brand-blue"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl",
          onDark ? "text-white" : "text-brand-blue-dark"
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-3 text-base leading-relaxed sm:text-lg",
            onDark ? "text-white/75" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
