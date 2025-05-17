import { MantineProvider } from "@mantine/core"
import { TRPCProvider } from "~/app/trpc-client"

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider forceColorScheme="dark">
      <TRPCProvider>{children}</TRPCProvider>
    </MantineProvider>
  )
}
