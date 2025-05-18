import { prefix, render, route } from "rwsdk/router"
import { defineApp } from "rwsdk/worker"
import { apiRoutes } from "~/server/routes"
import { Document } from "~/app/Document"
import { Home } from "~/app/pages/home"
import { makeDB } from "~/server/db"
import { setCommonHeaders } from "~/headers"

export type AppContext = {
  db: ReturnType<typeof makeDB>
}

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    ctx.db = makeDB()
  },
  render(Document, [route("/", () => <Home />)]),
  prefix("/api", apiRoutes),
])
