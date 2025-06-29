import { Container, ContainerProps, Group, MantineProvider, Title } from "@mantine/core"
import { ReactNode } from "react"
import { LogoutButton } from "~/app/components/LogoutButton"
import { TRPCProvider } from "~/app/trpc-client"

export const PageLayout = ({
  title,
  children,
  ...props
}: { title?: string; children: ReactNode } & ContainerProps) => (
  <MantineProvider forceColorScheme="dark">
    <TRPCProvider>
      <Container {...props}>
        <Group my="md" justify="flex-end">
          <LogoutButton />
        </Group>

        {title && (
          <Title order={1} mb="lg">
            {title}
          </Title>
        )}

        {children}
      </Container>
    </TRPCProvider>
  </MantineProvider>
)
