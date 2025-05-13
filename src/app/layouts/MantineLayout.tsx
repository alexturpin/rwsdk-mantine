import { ColorSchemeScript, MantineProvider } from "@mantine/core"

export const MantineLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ColorSchemeScript forceColorScheme="dark" />
      <MantineProvider forceColorScheme="dark">{children}</MantineProvider>
    </>
  )
}
