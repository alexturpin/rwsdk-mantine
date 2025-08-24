import { command, oneOf, positional, run } from "cmd-ts"
import html2md from "html-to-md"
import puppeteer, { Page } from "puppeteer"
import { scrapers } from "./all-scrapers"
import { writeFile, mkdir } from "fs/promises"
import { fileURLToPath } from "url"
import { dirname } from "path"
import fs from "fs"
import path from "path"
import dedent from "dedent"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export type ScraperConfig = {
  initialUrl: string
  scrape: (page: Page, currentUrl: string) => AsyncGenerator<string>
}

const discoverLinks = async (page: Page, currentUrl: string): Promise<string[]> => {
  const links = await page.$$eval(
    "a[href]",
    (anchors, baseUrl) => {
      const base = new URL(baseUrl)
      return anchors
        .map((a) => a.getAttribute("href"))
        .filter((href): href is string => href !== null && !href.startsWith("#"))
        .map((href) => {
          try {
            const url = new URL(href, baseUrl)

            // Only return links from the same origin
            if (url.origin !== base.origin) return null

            // Strip query parameters and hash fragments
            url.search = ""
            url.hash = ""
            return url.href
          } catch {
            return null
          }
        })
        .filter((url): url is string => url !== null)
    },
    currentUrl,
  )

  return [...new Set(links)] // Remove duplicates
}

const scrape = async ({ packageName }: { packageName: keyof typeof scrapers }) => {
  console.time("Scraping completed")

  const outputDir = `${__dirname}/${packageName}`

  // Clean out output directory
  if (fs.existsSync(outputDir)) fs.rmSync(outputDir, { recursive: true, force: true })

  const browser = await puppeteer.launch()

  const config = scrapers[packageName]

  const pagesToVisit = [config.initialUrl]
  const visitedPages = new Set<string>()

  try {
    while (pagesToVisit.length > 0) {
      const currentUrl = pagesToVisit.pop()
      if (!currentUrl) break

      if (visitedPages.has(currentUrl)) continue
      visitedPages.add(currentUrl)

      console.log(`Scraping ${currentUrl}`)

      const page = await browser.newPage()
      await page.goto(currentUrl, { waitUntil: "networkidle0" })

      // Gather links
      const links = await discoverLinks(page, currentUrl)
      links.forEach((link) => {
        if (!visitedPages.has(link)) pagesToVisit.push(link)
      })

      // Scrape content
      let slug = new URL(currentUrl).pathname.replace(/\/$/, "")
      const fileName = outputDir + slug + ".md"

      const html = await Array.fromAsync(config.scrape(page, currentUrl))
      const md = html
        .map((html) => html2md(html))
        .join("\n\n")
        .trim()
      if (md.length > 0) {
        await mkdir(dirname(fileName), { recursive: true })
        await writeFile(fileName, md)
      }

      await page.close()
    }
  } catch (err) {
    console.error(err)
  } finally {
    await browser.close()
  }

  const structure = getFolderStructure(outputDir)
  const directory = dedent`
    # Folder Structure
  
    ~~~
    ${structure}
    ~~~
  `
  await writeFile(`${outputDir}/directory.md`, directory)

  console.timeEnd("Scraping completed")
  console.log(`Visited ${visitedPages.size} pages.`)
}

const buildFolderStructure = (
  folderPath: string,
  prefix = "",
  excludedFolders: string[],
): string => {
  const entries = fs.readdirSync(folderPath).filter((file) => {
    const fullPath = path.join(folderPath, file)
    const isDir = fs.statSync(fullPath).isDirectory()
    return !(file.startsWith(".") && isDir)
  })

  const sorted = entries.sort((a, b) => {
    const aPath = path.join(folderPath, a)
    const bPath = path.join(folderPath, b)
    const aIsDir = fs.statSync(aPath).isDirectory()
    const bIsDir = fs.statSync(bPath).isDirectory()

    if (aIsDir && !bIsDir) return -1
    if (!aIsDir && bIsDir) return 1
    return a.localeCompare(b)
  })

  return sorted
    .map((file, index) => {
      const filePath = path.join(folderPath, file)
      const isDir = fs.statSync(filePath).isDirectory()
      const isLast = index === sorted.length - 1
      const connector = isLast ? "└── " : "├── "
      const line = `${prefix}${connector}${isDir ? `${file}/` : file}`

      if (isDir && !excludedFolders.includes(file)) {
        const newPrefix = `${prefix}${isLast ? "    " : "│   "}`
        return line + "\n" + buildFolderStructure(filePath, newPrefix, excludedFolders)
      }

      return line
    })
    .join("\n")
}

const getFolderStructure = (rootFolderPath: string, excludedFolders: string[] = []) => {
  const folderName = path.basename(rootFolderPath)
  return folderName + "\n" + buildFolderStructure(rootFolderPath, "", excludedFolders)
}

const app = command({
  name: "docs-scraper",
  args: {
    packageName: positional({
      type: oneOf(Object.keys(scrapers) as (keyof typeof scrapers)[]),
      displayName: "package name",
    }),
  },
  handler: scrape,
})

run(app, process.argv.slice(2))
