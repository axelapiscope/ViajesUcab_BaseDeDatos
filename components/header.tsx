"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Heart, Globe, Map, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useCurrency } from "@/lib/currency-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useUser } from "@/lib/user-context"
import { useToast } from "@/hooks/use-toast"
import { Logo } from "@/components/logo"
import { useRouter, usePathname } from "next/navigation"
import { NotificationsDropdown } from "@/components/notifications-dropdown"

export function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const { currency, setCurrency } = useCurrency()
  const { totalItems: wishlistItems } = useWishlist()
  const { user, isAuthenticated, login, logout, hasRole } = useUser()
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()
  
  // No mostrar header en rutas de admin o proveedores (tienen su propia navegación)
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/proveedores") || pathname?.startsWith("/auth")) {
    return null
  }

  const handleCurrencyChange = (newCurrency: "USD" | "BS" | "EUR") => {
    setCurrency(newCurrency)
    toast({
      title: "Moneda actualizada",
      description: `Los precios ahora se muestran en ${newCurrency}`,
    })
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    })
    router.push("/")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo />
            </Link>

            <div className="flex items-center gap-3">
              {/* Mostrar navegación según rol */}
              {isAuthenticated && user && (
                <>
                  {hasRole(["cliente", "admin"]) && (
                    <Link href="/clientes/itinerario">
                      <Button variant="ghost" size="sm" className="hidden md:inline-flex gap-2">
                        <Map className="h-4 w-4" />
                        Crear Itinerario
                      </Button>
                    </Link>
                  )}
                  {hasRole("admin") && (
                    <Link href="/admin">
                      <Button variant="ghost" size="sm" className="hidden md:inline-flex gap-2">
                        Dashboard Admin
                      </Button>
                    </Link>
                  )}
                  {hasRole("proveedor") && (
                    <Link href="/proveedores">
                      <Button variant="ghost" size="sm" className="hidden md:inline-flex gap-2">
                        Dashboard Proveedor
                      </Button>
                    </Link>
                  )}
                </>
              )}

              {hasRole(["cliente", "admin"]) && (
                <>
                  <NotificationsDropdown />
                  <Link href="/clientes/wishlist">
                    <Button variant="ghost" size="icon" className="relative">
                      <Heart className="h-5 w-5" />
                      {wishlistItems > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                          {wishlistItems}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                </>
              )}

              {/* Currency Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex gap-1">
                    <Globe className="h-4 w-4" />
                    {currency}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleCurrencyChange("USD")}>USD - Dólar</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCurrencyChange("BS")}>BS - Bolívar</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCurrencyChange("EUR")}>EUR - Euro</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline">{user.name.split(" ")[0]}</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    {hasRole(["cliente", "admin"]) && (
                      <DropdownMenuItem onClick={() => router.push("/clientes/perfil")}>
                        <User className="mr-2 h-4 w-4" />
                        Mi Perfil
                      </DropdownMenuItem>
                    )}
                    {hasRole("admin") && (
                      <DropdownMenuItem onClick={() => router.push("/admin")}>
                        Panel Administrador
                      </DropdownMenuItem>
                    )}
                    {hasRole("proveedor") && (
                      <DropdownMenuItem onClick={() => router.push("/proveedores")}>
                        Panel Proveedor
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:inline-flex"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setShowRegisterModal(true)}
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Iniciar Sesión</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const email = formData.get("email") as string
              const password = formData.get("password") as string
              login(email, password, "cliente")
              toast({
                title: "Inicio de sesión exitoso",
                description: "Bienvenido de vuelta a ViajesUCAB",
              })
              setShowLoginModal(false)
              router.push("/clientes")
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="login-email">Correo electrónico</Label>
              <Input id="login-email" name="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Contraseña</Label>
              <Input id="login-password" name="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => {
                  setShowLoginModal(false)
                  setShowRegisterModal(true)
                }}
              >
                Regístrate aquí
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Crear Cuenta</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const name = formData.get("name") as string
              const email = formData.get("email") as string
              const password = formData.get("password") as string
              const confirmPassword = formData.get("confirmPassword") as string
              const phone = formData.get("phone") as string
              const address = formData.get("address") as string
              const venezuelanId = formData.get("venezuelanId") as string
              const passport = formData.get("passport") as string

              if (password !== confirmPassword) {
                toast({
                  title: "Error",
                  description: "Las contraseñas no coinciden",
                  variant: "destructive",
                })
                return
              }

              login(email, password, "cliente", name, phone, address, {
                venezuelanId: venezuelanId || undefined,
                passport: passport || undefined,
              })
              toast({
                title: "Cuenta creada exitosamente",
                description: "¡Bienvenido a ViajesUCAB! Ya puedes comenzar a buscar ofertas.",
              })
              setShowRegisterModal(false)
              router.push("/clientes")
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" name="name" type="text" placeholder="Juan Pérez" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">Correo electrónico</Label>
              <Input id="register-email" name="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+58 412-555-0100" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" name="address" type="text" placeholder="Caracas, Venezuela" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="venezuelanId">Cédula de Identidad (opcional)</Label>
              <Input id="venezuelanId" name="venezuelanId" type="text" placeholder="V-12345678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passport">Pasaporte (opcional)</Label>
              <Input id="passport" name="passport" type="text" placeholder="P12345678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Contraseña</Label>
              <Input
                id="register-password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
            <Button type="submit" className="w-full">
              Crear Cuenta
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => {
                  setShowRegisterModal(false)
                  setShowLoginModal(true)
                }}
              >
                Inicia sesión aquí
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
