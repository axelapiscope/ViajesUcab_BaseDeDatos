"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser, type UserRole } from "@/lib/user-context"
import { useToast } from "@/hooks/use-toast"
import { Logo } from "@/components/logo"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useUser()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const redirectTo = searchParams.get("redirect") || "/"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Verificar primero si el usuario existe antes de intentar login
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const user = existingUsers.find((u: any) => u.email === email)
      
      if (!user) {
        toast({
          title: "Usuario no registrado",
          description: "Por favor regístrate primero antes de iniciar sesión",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Si el usuario existe, proceder con el login
      login(email, password)
      const userRole = user.role || "cliente"
      
      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido como ${userRole}`,
      })
      
      // Redirigir según el rol
      if (redirectTo && redirectTo !== "/") {
        router.push(redirectTo)
      } else {
        if (userRole === "admin") {
          router.push("/admin")
        } else if (userRole === "proveedor") {
          router.push("/proveedores")
        } else {
          router.push("/clientes")
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al iniciar sesión. Por favor intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>Ingresa tus credenciales para acceder a ViajesUCAB</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => router.push("/auth/register")}
              >
                Regístrate aquí
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

