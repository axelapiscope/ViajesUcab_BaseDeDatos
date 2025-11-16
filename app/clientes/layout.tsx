"use client"

import { AuthGuard } from "@/lib/auth-guard"
import { Header } from "@/components/header"

export default function ClientesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requiredRole={["cliente", "admin"]}>
      {children}
    </AuthGuard>
  )
}

