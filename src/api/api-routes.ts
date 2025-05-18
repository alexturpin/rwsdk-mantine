import { route } from "rwsdk/router"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { router } from "~/api/trpc-router"

export const apiRoutes = [
  route("/health", () => Response.json({ status: "ok" })),
  route("/trpc/*", ({ request, ctx }) =>
    fetchRequestHandler({
      endpoint: "/api/trpc",
      req: request,
      router,
      createContext: () => ctx,
      onError({ error }) {
        console.error(error)
      },
    })
  ),
]
