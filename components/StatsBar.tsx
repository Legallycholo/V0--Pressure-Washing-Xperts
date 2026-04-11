import { Briefcase, Star, CalendarCheck, MapPin } from "lucide-react"

const stats = [
  { icon: Star, value: "5.0 ★", label: "Google & Groupon Rating" },
  { icon: Briefcase, value: "500+", label: "Jobs Completed" },
  { icon: CalendarCheck, value: "15+", label: "Years in Business" },
  { icon: MapPin, value: "25+", label: "Metro Atlanta Cities" },
]

export function StatsBar() {
  return (
    <section aria-label="Company statistics" className="bg-brand-blue py-8 border-y border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-2">
              <stat.icon className="size-6 text-brand-yellow" aria-hidden />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
