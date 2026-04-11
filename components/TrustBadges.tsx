import { Shield, Award, Clock, Users } from "lucide-react"

const badges = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed and insured for your protection",
  },
  {
    icon: Award,
    title: "Top Rated Service",
    description: "5-star rated by our satisfied customers",
  },
  {
    icon: Clock,
    title: "Fast Response",
    description: "Quick quotes and prompt service delivery",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Trained professionals with years of experience",
  },
]

export function TrustBadges() {
  return (
    <section className="relative py-12 bg-section-light border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className={`flex flex-col items-center text-center animate-fade-in-up stagger-${index + 1}`}
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white">
                <badge.icon className="size-7" />
              </div>
              <h3 className="font-semibold text-foreground text-sm md:text-base">
                {badge.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
