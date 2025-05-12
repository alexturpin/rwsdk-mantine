import { ColorSchemeScript, MantineProvider } from "@mantine/core"

export const MantineLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ColorSchemeScript />
      <MantineProvider>{children}</MantineProvider>
    </>
  )
}
