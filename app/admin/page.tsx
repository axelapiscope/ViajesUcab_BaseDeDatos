"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, Package, DollarSign, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Reservas",
      value: "1,234",
      change: "+12.5%",
      icon: Package,
      href: "/admin/reservas",
    },
    {
      title: "Usuarios Activos",
      value: "5,678",
      change: "+8.2%",
      icon: Users,
      href: "/admin/usuarios",
    },
    {
      title: "Ingresos del Mes",
      value: "$125,430",
      change: "+15.3%",
      icon: DollarSign,
      href: "/admin/finanzas",
    },
    {
      title: "Reclamos Pendientes",
      value: "23",
      change: "-5.1%",
      icon: AlertTriangle,
      href: "/admin/reclamos",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Administrador</h1>
        <p className="text-muted-foreground">Panel de control y gestión del sistema ViajesUCAB</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="card-hover gradient-primary/10 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-accent" />
                  {stat.change} vs mes anterior
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover border-primary/20">
          <CardHeader>
            <CardTitle>Accesos Rápidos</CardTitle>
            <CardDescription>Gestión del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/promociones">
              <Button variant="outline" className="w-full justify-start">
                Gestión de Promociones
              </Button>
            </Link>
            <Link href="/admin/tasas-cambio">
              <Button variant="outline" className="w-full justify-start">
                Tasas de Cambio
              </Button>
            </Link>
            <Link href="/admin/inventario">
              <Button variant="outline" className="w-full justify-start">
                Control de Inventario
              </Button>
            </Link>
            <Link href="/admin/auditoria">
              <Button variant="outline" className="w-full justify-start">
                Auditoría del Sistema
              </Button>
            </Link>
            <Link href="/admin/reclamos">
              <Button variant="outline" className="w-full justify-start">
                Gestión de Reclamos
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reportes</CardTitle>
            <CardDescription>Análisis y estadísticas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Reporte de Ventas
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Análisis de Usuarios
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Rendimiento de Proveedores
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Nueva reserva creada</span>
                <span className="text-xs text-muted-foreground">Hace 5 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Promoción actualizada</span>
                <span className="text-xs text-muted-foreground">Hace 1 hora</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Nuevo proveedor registrado</span>
                <span className="text-xs text-muted-foreground">Hace 2 horas</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

