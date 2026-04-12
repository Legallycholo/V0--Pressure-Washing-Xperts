/**
 * One-shot: fetch Wix gallery page, resolve richest thunderbolt JSON, download
 * slideshow images, write pairings.json + manifest for gallery.ts updates.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const OUT_DIR = path.join(ROOT, "public", "gallery", "wix-before-after")
const GALLERY_URL = "https://www.pressurewashingxpert.com/gallery"
const MEDIA_BASE = "https://static.wixstatic.com/media"

const SLIDESHOW_IDS = ["SldShwGllry0-ded", "SldShwGllry2-sdh"]

const TAG_ROTATION = [
  "Residential",
  "Driveways & Patios",
  "Residential",
  "Roof Cleaning",
  "Driveways & Patios",
  "Residential",
  "Commercial",
  "Residential",
  "Masonry & Stone",
  "Driveways & Patios",
  "Residential",
  "HOA & Community",
]

async function fetchText(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`)
  return res.text()
}

function thunderboltUrlsFromHtml(html) {
  const re =
    /href="(https:\/\/siteassets\.parastorage\.com\/pages\/pages\/thunderbolt[^"]+)"/g
  const urls = new Set()
  let m
  while ((m = re.exec(html))) urls.add(m[1].replace(/&amp;/g, "&"))
  return [...urls]
}

async function richestThunderboltUrl(html) {
  let best = { n: 0, url: "" }
  for (const url of thunderboltUrlsFromHtml(html)) {
    const text = await fetchText(url)
    const n = (text.match(/c275e1_/g) || []).length
    if (n > best.n) best = { n, url }
  }
  if (!best.url) throw new Error("No thunderbolt URL found")
  return best.url
}

function parseSlideshows(tbJson) {
  const compProps = tbJson.props?.render?.compProps
  if (!compProps) throw new Error("No compProps in thunderbolt JSON")
  const albums = []
  for (const id of SLIDESHOW_IDS) {
    const p = compProps[id]
    if (!p?.items?.length) throw new Error(`Missing items for ${id}`)
    albums.push({
      id,
      items: p.items.map((it) => ({
        title: it.title || it.image?.title || "Photo",
        uri: it.image.uri,
      })),
    })
  }
  return albums
}

function extFromUri(uri) {
  const m = uri.match(/\.(jpe?g|png|webp)$/i)
  return m ? m[0].toLowerCase() : ".jpg"
}

async function downloadFile(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.writeFileSync(dest, buf)
}

async function main() {
  console.error("Fetching gallery HTML…")
  const html = await fetchText(GALLERY_URL)
  console.error("Resolving thunderbolt bundle…")
  const tbUrl = await richestThunderboltUrl(html)
  const tbRaw = await fetchText(tbUrl)
  const tbJson = JSON.parse(tbRaw)
  const [albumBefore, albumAfter] = parseSlideshows(tbJson)

  const nPair = Math.min(albumBefore.items.length, albumAfter.items.length)
  const overflow = albumBefore.items.slice(nPair)

  fs.mkdirSync(OUT_DIR, { recursive: true })

  const pairings = {
    source: GALLERY_URL,
    thunderboltUrl: tbUrl,
    beforeAlbumId: albumBefore.id,
    afterAlbumId: albumAfter.id,
    pairs: [],
    overflowSingles: [],
  }

  for (let i = 0; i < nPair; i++) {
    const b = albumBefore.items[i]
    const a = albumAfter.items[i]
    const extB = extFromUri(b.uri)
    const extA = extFromUri(a.uri)
    const base = `pair-${String(i + 1).padStart(2, "0")}`
    const beforePath = `/gallery/wix-before-after/${base}-before${extB}`
    const afterPath = `/gallery/wix-before-after/${base}-after${extA}`
    const beforeFile = path.join(ROOT, "public", beforePath.slice(1))
    const afterFile = path.join(ROOT, "public", afterPath.slice(1))
    const tagPlaceholder = TAG_ROTATION[i % TAG_ROTATION.length]
    if (b.uri === a.uri) {
      await downloadFile(`${MEDIA_BASE}/${a.uri}`, afterFile)
      pairings.overflowSingles.push({
        title: a.title,
        uri: a.uri,
        imageSrc: afterPath,
        category: "residential",
        tagPlaceholder: "Residential",
        note: "Same URI in both Wix albums; imported as single (not a comparison slider).",
      })
      console.error(`Pair ${i + 1}/${nPair} OK (single file, duplicate URI)`)
      continue
    }
    await downloadFile(`${MEDIA_BASE}/${b.uri}`, beforeFile)
    await downloadFile(`${MEDIA_BASE}/${a.uri}`, afterFile)
    pairings.pairs.push({
      index: i + 1,
      beforeTitle: b.title,
      afterTitle: a.title,
      beforeUri: b.uri,
      afterUri: a.uri,
      beforeSrc: beforePath,
      afterSrc: afterPath,
      tagPlaceholder,
    })
    console.error(`Pair ${i + 1}/${nPair} OK`)
  }

  for (let j = 0; j < overflow.length; j++) {
    const item = overflow[j]
    const ext = extFromUri(item.uri)
    const base = `overflow-${String(j + 1).padStart(2, "0")}`
    const src = `/gallery/wix-before-after/${base}${ext}`
    const file = path.join(ROOT, "public", src.slice(1))
    await downloadFile(`${MEDIA_BASE}/${item.uri}`, file)
    pairings.overflowSingles.push({
      title: item.title,
      uri: item.uri,
      imageSrc: src,
      /** Best-effort tab + chip; refine after visual QA. */
      category: j % 2 === 0 ? "residential" : "driveways",
      tagPlaceholder: j % 2 === 0 ? "Residential" : "Driveways & Patios",
    })
    console.error(`Overflow ${j + 1}/${overflow.length} OK`)
  }

  fs.writeFileSync(
    path.join(OUT_DIR, "pairings.json"),
    JSON.stringify(pairings, null, 2)
  )
  console.error("Wrote", path.join(OUT_DIR, "pairings.json"))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
