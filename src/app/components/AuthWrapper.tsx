import { Box, Group, Loader } from "@mantine/core"
import { ReactNode } from "react"
import { authClient } from "~/app/auth-client"
import { PasswordAuthForm } from "./PasswordAuthForm"
import { LogoutButton } from "~/app/components/LogoutButton"

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const session = authClient.useSession()

  if (session.isPending) return <Loader />
  if (!session.data) return <PasswordAuthForm />

  return <>{children}</>
}
