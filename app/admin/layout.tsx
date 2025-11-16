"use client"

import { AuthGuard } from "@/lib/auth-guard"
import { AdminNavigation } from "@/components/admin-navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requiredRole="admin">
      <div className="min-h-screen bg-background">
        <AdminNavigation />
        <main className="container mx-auto px-4 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}

