import { sql } from "drizzle-orm"
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

export * from "./auth-schema"

export const messages = sqliteTable("messages", {
  id: int().primaryKey({ autoIncrement: true }),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),

  name: text().notNull(),
  message: text().notNull(),
})
