import { publicProcedure, router } from "~/api/trpc"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { env } from "cloudflare:workers"

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
})

export { r as router }

export type Router = typeof r
export type RouterInputs = inferRouterInputs<Router>
export type RouterOutputs = inferRouterOutputs<Router>
