import { ScraperConfig } from "./scraper"

// URL patterns that need tab handling
const TAB_PATTERNS = [
  "https://mantine.dev/core/",
  "https://mantine.dev/x/",
  "https://mantine.dev/dates/",
  "https://mantine.dev/charts/",
]

const shouldHandleTabs = (url: string) => TAB_PATTERNS.some((pattern) => url.startsWith(pattern))

export const mantine: ScraperConfig = {
  initialUrl: "https://mantine.dev/",
  scrape: async function* (page, currentUrl) {
    yield await page
      .$eval('div[class*="MdxPageHeader_header"]', (el) => el.innerHTML)
      .catch(() => "")

    yield await page.$eval("#mdx", (el) => el.innerHTML).catch(() => "")

    if (shouldHandleTabs(currentUrl)) {
      const url = new URL(currentUrl)

      url.searchParams.set("t", "props")
      await page.goto(url.toString(), { waitUntil: "networkidle0" })
      yield await page
        .$eval('div[class*="MdxTabs_tabContent"]', (el) => el.innerHTML)
        .catch(() => "")

      url.searchParams.set("t", "styles-api")
      await page.goto(url.toString(), { waitUntil: "networkidle0" })
      yield await page
        .$eval('div[class*="MdxTabs_tabContent"]', (el) => el.innerHTML)
        .catch(() => "")
    }
  },
}
