"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useUser, type UserRole } from "@/lib/user-context"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: UserRole | UserRole[]
  redirectTo?: string
}

export function AuthGuard({ children, requiredRole, redirectTo = "/auth/login" }: AuthGuardProps) {
  const { user, isAuthenticated, hasRole } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Si no está autenticado, redirigir a login
    if (!isAuthenticated) {
      router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`)
      return
    }

    // Si se requiere un rol específico, verificar
    if (requiredRole && user && !hasRole(requiredRole)) {
      // Redirigir según el rol del usuario
      if (user.role === "admin") {
        router.push("/admin")
      } else if (user.role === "proveedor") {
        router.push("/proveedores")
      } else {
        router.push("/clientes")
      }
    }
  }, [isAuthenticated, user, requiredRole, hasRole, router, pathname, redirectTo])

  // Mostrar loading mientras se verifica
  if (!isAuthenticated || (requiredRole && user && !hasRole(requiredRole))) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

