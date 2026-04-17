import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")

const manualCommercial = [
  "/services/commercial/apartment-complexes",
  "/services/commercial/office-buildings",
  "/services/commercial/government-complexes",
  "/services/commercial/hotels-hospitality",
  "/services/commercial/gas-stations",
  "/services/commercial/awning-cleaning",
  "/services/commercial/parking-decks",
  "/services/commercial/hoa-services",
]

const extraHubs = [
  "/privacy",
  "/service-areas",
  "/services/residential",
  "/services/commercial",
  "/about/we-do-xpert",
  "/about/pressure-vs-soft-washing",
]

const navText = fs.readFileSync(path.join(root, "data", "navigation.ts"), "utf8")
const navServiceHrefs = [
  ...navText.matchAll(/href:\s*"(\/services\/(?:residential|commercial)\/[^"]+)"/g),
].map((m) => m[1])

const allPaths = [...new Set([...extraHubs, ...navServiceHrefs, ...manualCommercial])].filter(
  (p) => p !== "/gallery"
)

function layoutContents(routePath) {
  return `import { marketingRouteExports } from "@/lib/seo/create-marketing-route-layout"

const { metadata, Layout } = marketingRouteExports("${routePath}")
export { metadata }
export default Layout
`
}

for (const key of allPaths) {
  const dir = path.join(root, "app", ...key.split("/").filter(Boolean))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, "layout.tsx"), layoutContents(key), "utf8")
}
console.log(`Wrote ${allPaths.length} marketing layout files.`)
