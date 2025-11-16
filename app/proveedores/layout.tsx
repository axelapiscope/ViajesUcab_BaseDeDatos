"use client"

import { AuthGuard } from "@/lib/auth-guard"
import { ProveedorNavigation } from "@/components/proveedor-navigation"

export default function ProveedorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requiredRole={["proveedor", "admin"]}>
      <div className="min-h-screen bg-background">
        <ProveedorNavigation />
        <main className="container mx-auto px-4 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}

