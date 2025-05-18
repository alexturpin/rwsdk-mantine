import { RouteDefinition } from "rwsdk/router"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { trpcRouter as router } from "~/server/trpc-router"

const route: RouteDefinition["handler"] = async ({ request: req, ctx }) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router,
    createContext: () => ctx,
    onError({ error }) {
      console.error(error)
    },
  })

export default route
