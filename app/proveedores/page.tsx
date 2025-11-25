"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, MapPin, Tag, TrendingUp, Package, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProveedorDashboard() {
  const stats = [
    {
      title: "Servicios Activos",
      value: "45",
      change: "+5 este mes",
      icon: Package,
      href: "/proveedores/flota",
    },
    {
      title: "Destinos Configurados",
      value: "12",
      change: "+2 nuevos",
      icon: MapPin,
      href: "/proveedores/destinos",
    },
    {
      title: "Promociones Activas",
      value: "8",
      change: "3 próximas a vencer",
      icon: Tag,
      href: "/proveedores/promociones",
    },
    {
      title: "Reservas del Mes",
      value: "234",
      change: "+18% vs mes anterior",
      icon: TrendingUp,
      href: "/proveedores/reservas",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Proveedor</h1>
        <p className="text-muted-foreground">Gestiona tu flota, destinos y promociones</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="gradient-primary/10 border-primary/20 transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Gestión de Flota</CardTitle>
            <CardDescription>Administra tus vuelos, cruceros y tours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/proveedores/flota">
              <Button variant="outline" className="w-full justify-start">
                <Plane className="mr-2 h-4 w-4" />
                Ver Flota Completa
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardHeader>
            <CardTitle>Destinos</CardTitle>
            <CardDescription>Configura y gestiona tus destinos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/proveedores/destinos">
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                Ver Todos los Destinos
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-secondary/20">
          <CardHeader>
            <CardTitle>Promociones</CardTitle>
            <CardDescription>Gestiona tus ofertas especiales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/proveedores/promociones">
              <Button variant="outline" className="w-full justify-start">
                <Tag className="mr-2 h-4 w-4" />
                Ver Promociones
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reportes de Rendimiento</CardTitle>
          <CardDescription>Análisis de tus servicios y reservas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/proveedores/reportes">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                Ver Reportes Completos
              </Button>
            </Link>
            <Link href="/proveedores/reportes?tab=clientes">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Análisis de Clientes
              </Button>
            </Link>
            <Link href="/proveedores/reportes?tab=servicios">
              <Button variant="outline" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                Rendimiento por Servicio
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

