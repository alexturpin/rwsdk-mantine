"use client"

import { AuthWrapper } from "~/app/components/AuthWrapper"
import { PageLayout } from "~/app/layouts/PageLayout"

export const Dashboard = () => (
  <PageLayout title="dashboard">
    <AuthWrapper>hello</AuthWrapper>
  </PageLayout>
)
