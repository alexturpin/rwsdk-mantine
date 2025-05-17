import { apiRoutes } from "~/api/api-routes"
import { Document } from "~/app/Document"
import { setCommonHeaders } from "~/headers"
import { Home } from "~/app/pages/Home"
import { prefix, render, route } from "rwsdk/router"
import { defineApp } from "rwsdk/worker"
import { PageLayout } from "~/app/layouts/PageLayout"

export type AppContext = {}

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx
  },
  render(Document, [route("/", () => <Home />)]),
  prefix("/api", apiRoutes),
])
