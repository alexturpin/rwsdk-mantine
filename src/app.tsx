import { prefix, render, route } from "rwsdk/router"
import { defineApp } from "rwsdk/worker"
import { apiRoutes } from "~/server/routes"
import { Document } from "~/app/Document"
import { Home } from "~/app/pages/home"
import { setCommonHeaders } from "~/headers"
import { db } from "~/server/db"
import { auth } from "~/server/auth"
import { InferSelectModel } from "drizzle-orm"
import { Dashboard } from "~/app/pages/dashboard"

export type AppContext = {
  db: typeof db
  session: (typeof auth.$Infer.Session)["session"] | null
  user: (typeof auth.$Infer.Session)["user"] | null
}

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request }) => {
    ctx.db = db

    const session = await auth.api.getSession({ headers: request.headers })

    ctx.session = session?.session ?? null
    ctx.user = session?.user ?? null
  },
  render(Document, [route("/", () => <Home />), route("/dashboard", () => <Dashboard />)]),
  prefix("/api", apiRoutes),
])
