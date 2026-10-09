import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const snapshotPath = process.argv[2]

if (!snapshotPath) {
  throw new Error("Usage: node scripts/import-google-reviews.mjs <google-review-snapshot.txt>")
}

const root = process.cwd()
const snapshot = await readFile(path.resolve(snapshotPath), "utf8")
const blocks = snapshot.split('      - article "Review":').slice(1)

const lineValue = (line) => line.replace(/^\s*- (?:generic|text): /, "").trim()
const slugify = (value) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "google-review"

function classifyService(text, googleServices) {
  const source = `${text} ${googleServices.join(" ")}`.toLowerCase()

  if (/carpet/.test(source)) return ["carpet-cleaning", "Carpet Cleaning"]
  if (/fleet|truck|vehicle/.test(source)) return ["commercial", "Fleet Washing"]
  if (/commercial|business|storefront|office|restaurant|building/.test(source)) {
    return ["commercial", "Commercial Pressure Washing"]
  }
  if (/roof|gutter/.test(source)) return ["gutters-roofs", "Roof & Gutter Cleaning"]
  if (/deck|patio|porch|backyard|pool/.test(source)) {
    return ["decks-patios", "Deck & Patio Cleaning"]
  }
  if (/driveway|concrete|sidewalk|walkway|paver/.test(source)) {
    return ["driveways-concrete", "Driveway & Concrete Cleaning"]
  }
  if (/house|home|siding|exterior|window/.test(source)) {
    return ["house-washing", "House Washing"]
  }
  return ["general", "Pressure Washing"]
}

function parseBlock(block, index) {
  const profileMatch = block.match(
    /\/url: (https:\/\/www\.google\.com\/maps\/contrib\/(\d+)\/reviews\?hl=en)\n\s+- text: ([^\n]+)/,
  )
  if (!profileMatch) throw new Error(`Review ${index + 1} is missing its Google contributor URL`)

  const [, authorProfileUrl, googleContributorId, author] = profileMatch
  const statsLine = block.match(/^\s{8}- generic: (Local Guide • )?(\d+) reviews? • (\d+) photos?/m)
  const ratingMatch = block.match(/- img "(\d+) out of 5 stars"/)
  if (!statsLine || !ratingMatch) throw new Error(`Review ${googleContributorId} has incomplete stats`)

  const ownerMarker = "      - generic: Pressure Washing Xperts\n      - generic: Owner\n"
  const [reviewWithControls, ownerPart] = block.split(ownerMarker)
  const reviewPart = reviewWithControls.split('\n      - button "Reply":')[0]
  const lines = reviewPart.split("\n")
  const ratingLineIndex = lines.findIndex((line) => line.includes("out of 5 stars"))
  const starsEndIndex = lines.findIndex(
    (line, lineIndex) => lineIndex > ratingLineIndex && !line.includes("- generic: star") && line.trim(),
  )
  if (starsEndIndex < 0) throw new Error(`Review ${googleContributorId} is missing its date`)

  const rawTimeAgo = lineValue(lines[starsEndIndex])
  const isNew =
    rawTimeAgo.endsWith(" New") ||
    lines.slice(starsEndIndex + 1).some((line) => line.trim() === "- text: New")
  const timeAgo = rawTimeAgo.replace(/ New$/, "")
  const contentLines = lines.slice(starsEndIndex + 1)
  const highlights = new Set(["Great price", "Reasonable price", "Good value", "Professionalism"])
  let highlightTag
  let inServices = false
  const googleServices = []
  const body = []

  for (const line of contentLines) {
    const trimmed = line.trim()
    if (!trimmed || /button "(?:Report review|View full review)"/.test(trimmed)) continue
    if (trimmed.startsWith('- heading "Services"')) {
      inServices = true
      continue
    }
    if (/^- (?:link|img)(?:\s|$)/.test(trimmed)) continue
    if (!/^- (?:generic|text): /.test(trimmed)) continue

    const value = lineValue(trimmed)
    if (!value || value === "open_in_new" || value === "star" || value === "New") continue
    if (highlights.has(value) && !highlightTag) {
      highlightTag = value
      continue
    }
    if (inServices) googleServices.push(value)
    else body.push(value)
  }

  const text = body.join(" ").trim()
  const [serviceCategory, inferredServiceLabel] = classifyService(text, googleServices)
  const serviceLabel = googleServices[0] || inferredServiceLabel
  let ownerResponse

  if (ownerPart) {
    const ownerLines = ownerPart
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => /^- generic: /.test(line))
      .map(lineValue)
      .filter((value) => !["Edit", "Delete"].includes(value))
    if (ownerLines.length >= 2) {
      ownerResponse = { dateAgo: ownerLines[0], text: ownerLines.slice(1).join(" ") }
    }
  }

  return {
    id: `${slugify(author)}-${googleContributorId.slice(-6)}`,
    googleContributorId,
    author,
    authorProfileUrl,
    isLocalGuide: Boolean(statsLine[1]),
    reviewCount: Number(statsLine[2]),
    photoCount: Number(statsLine[3]),
    rating: Number(ratingMatch[1]),
    timeAgo,
    ...(isNew ? { isNew: true } : {}),
    ...(highlightTag ? { highlightTag } : {}),
    text,
    serviceCategory,
    serviceLabel,
    ...(ownerResponse ? { ownerResponse } : {}),
  }
}

const reviews = blocks.map(parseBlock)
const ids = new Set(reviews.map((review) => review.googleContributorId))
if (reviews.length !== 303 || ids.size !== 303) {
  throw new Error(`Expected 303 unique reviews, received ${reviews.length} rows / ${ids.size} IDs`)
}

const ratingOnlyCount = reviews.filter((review) => !review.text).length
const ownerResponseCount = reviews.filter((review) => review.ownerResponse).length
const generated = `// Generated from the Google Business Profile snapshot captured October 9, 2026.\n` +
  `// Run: pnpm import:google-reviews <snapshot-path>\n` +
  `import type { GoogleReview } from "./reviews"\n\n` +
  `export const GOOGLE_REVIEWS: GoogleReview[] = ${JSON.stringify(reviews, null, 2)}\n`

await writeFile(path.join(root, "data/google-reviews.generated.ts"), generated, "utf8")

console.log(
  JSON.stringify(
    {
      reviews: reviews.length,
      uniqueContributorIds: ids.size,
      ratingOnly: ratingOnlyCount,
      ownerResponses: ownerResponseCount,
      output: "data/google-reviews.generated.ts",
    },
    null,
    2,
  ),
)
