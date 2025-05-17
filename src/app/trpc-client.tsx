import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createTRPCClient, httpBatchLink } from "@trpc/client"
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"
import { ReactNode } from "react"
import { Router } from "~/api/trpc-router"

export const queryClient = new QueryClient()

const trpcClient = createTRPCClient<Router>({
  links: [httpBatchLink({ url: "/api/trpc" })],
})

export const TRPCProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export const trpc = createTRPCOptionsProxy<Router>({
  client: trpcClient,
  queryClient,
})
