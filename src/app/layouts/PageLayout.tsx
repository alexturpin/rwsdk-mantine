import { MantineProvider } from "@mantine/core"

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MantineProvider forceColorScheme="dark">{children}</MantineProvider>
    </>
  )
}
