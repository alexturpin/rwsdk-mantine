import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { routes as sample } from "~/server/api/sample"
import { router } from "~/server/trpc-utils"

export const trpcRouter = router({
  sample,
})

export type Router = typeof trpcRouter
export type RouterInputs = inferRouterInputs<Router>
export type RouterOutputs = inferRouterOutputs<Router>
