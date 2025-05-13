import { ColorSchemeScript, MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"

export const MantineLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ColorSchemeScript forceColorScheme="dark" />
      <MantineProvider forceColorScheme="dark">{children}</MantineProvider>
    </>
  )
}
