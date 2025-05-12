import { MantineProvider } from "@mantine/core"

export const MantineLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MantineProvider>{children}</MantineProvider>
    </>
  )
}
