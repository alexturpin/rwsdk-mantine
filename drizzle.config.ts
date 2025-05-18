import "dotenv/config"
import { defineConfig } from "drizzle-kit"
import { readdirSync } from "fs"
import { resolve } from "path"
import { z } from "zod"

const getLocalD1 = () => {
  const basePath = resolve(".wrangler")
  const dbFile = readdirSync(basePath, { encoding: "utf-8", recursive: true }).find((f) =>
    f.endsWith(".sqlite")
  )

  if (!dbFile) throw new Error(`.sqlite file not found in ${basePath}`)

  return resolve(basePath, dbFile)
}

const mode = z.enum(["local", "prod"]).default("local").parse(process.env.DB_MODE)

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  ...(mode === "local"
    ? { dbCredentials: { url: getLocalD1() } }
    : {
        // TODO: studio usage in prod
        driver: "d1-http",
        dbCredentials: {
          accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
          databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
          token: process.env.CLOUDFLARE_D1_TOKEN!,
        },
      }),
})
