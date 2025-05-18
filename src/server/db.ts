import { env } from "cloudflare:workers"
import { drizzle } from "drizzle-orm/d1"
import * as schema from "./db-schema"

export { schema }
export const makeDB = () => drizzle(env.DB, { schema })
