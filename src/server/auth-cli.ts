import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { getLocalD1 } from "~/../drizzle.config"
import { drizzle } from "drizzle-orm/better-sqlite3"
import * as schema from "./db-schema"
import { config } from "~/server/auth"

const d1 = getLocalD1()
const db = drizzle(d1, { schema })

export const auth = betterAuth({
  ...config,
  database: drizzleAdapter(db, { provider: "sqlite" }),
})
