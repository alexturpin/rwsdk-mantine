import { env } from "cloudflare:workers"
import { desc } from "drizzle-orm"
import { z } from "zod"
import { schema } from "~/server/db"
import { publicProcedure, router } from "~/server/trpc-utils"

export const routes = router({
  getValue: publicProcedure.query(
    async () => (await env.KV.get<number>("counter", { type: "json" })) || 0
  ),
  incrementValue: publicProcedure.mutation(async () => {
    const currentValue = (await env.KV.get<number>("counter", "json")) || 0
    const newValue = currentValue + 1
    await env.KV.put("counter", JSON.stringify(newValue))
    return newValue
  }),

  getMessages: publicProcedure.query(async ({ ctx }) =>
    ctx.db.query.messages.findMany({
      orderBy: desc(schema.messages.createdAt),
    })
  ),
  addMessage: publicProcedure
    .input(
      z.object({
        name: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => ctx.db.insert(schema.messages).values(input)),
})
