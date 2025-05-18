import { publicProcedure, router } from "~/api/trpc"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { env } from "cloudflare:workers"
import { schema } from "~/db/db"
import { desc } from "drizzle-orm"
import { z } from "zod"

const r = router({
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

export { r as router }

export type Router = typeof r
export type RouterInputs = inferRouterInputs<Router>
export type RouterOutputs = inferRouterOutputs<Router>
