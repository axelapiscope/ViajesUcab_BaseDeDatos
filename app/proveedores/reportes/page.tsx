"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, DollarSign, Users, Calendar, BarChart3, ArrowLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ReportesPage() {
  const router = useRouter()
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")
  const [nombreReporte, setNombreReporte] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fechaInicio || !fechaFin || !nombreReporte) {
      alert("Por favor, completa todos los campos.")
      return
    }
    const url = `http://localhost:8081/reporte?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&nombreReporte=${nombreReporte}`
    window.open(url, "_blank")
  }

  const stats = [
    { label: "Reservas Totales", value: "1,234", change: "+12.5%", icon: Calendar },
    { label: "Ingresos del Mes", value: "$45,230", change: "+18.2%", icon: DollarSign },
    { label: "Clientes Activos", value: "456", change: "+8.3%", icon: Users },
    { label: "Tasa de Ocupación", value: "78%", change: "+5.1%", icon: TrendingUp },
  ]

  const serviciosTop = [
    { nombre: "Vuelo Caracas-Miami", reservas: 234, ingresos: "$12,450", ocupacion: 85 },
    { nombre: "Crucero Caribe", reservas: 189, ingresos: "$28,900", ocupacion: 92 },
    { nombre: "Tour Machu Picchu", reservas: 156, ingresos: "$15,600", ocupacion: 78 },
  ]

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <Button variant="ghost" onClick={() => router.push("/proveedores")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reportes de Rendimiento</h1>
        <p className="text-muted-foreground">Análisis detallado de tus servicios y reservas</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className=" gradient-primary/10 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
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
        ))}
      </div>

      <div className="p-6 bg-muted/10 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Descargar Reportes</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fechaInicio" className="block text-sm font-medium mb-1">
              Fecha Inicio:
            </label>
            <input
              type="date"
              id="fechaInicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="fechaFin" className="block text-sm font-medium mb-1">
              Fecha Fin:
            </label>
            <input
              type="date"
              id="fechaFin"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="nombreReporte" className="block text-sm font-medium mb-1">
              Nombre del Reporte:
            </label>
            <select
              id="nombreReporte"
              value={nombreReporte}
              onChange={(e) => setNombreReporte(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Selecciona un reporte</option>
              <option value="MP_Combinacion">
                Ingresos netos por metodo de pago combinados
              </option>
              <option value="MillasOtorgadas">
                Milla otorgadas por compra de servicos adicionales
              </option>
              <option value="CanjesDePaquetePorMilla">Canjes de Paquete por Milla</option>
              <option value="ClienteConMayorFrecuenciaDeViajesCompleto">
                Cliente con Mayor Frecuencia de Viajes Completo
              </option>
              <option value="Top10ServiciosAdicionalesMasVendidosjrxml">
                Top 10 Servicios Adicionales Más Vendidos
              </option>
              
            </select>
          </div>
          <Button type="submit" className="w-full">
            Descargar Reporte
          </Button>
        </form>
      </div>

      <Tabs defaultValue="ventas" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ventas">Ventas</TabsTrigger>
          <TabsTrigger value="servicios">Servicios</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
        </TabsList>

        <TabsContent value="ventas" className="space-y-4">
          <Card className="">
            <CardHeader>
              <CardTitle>Ingresos por Mes</CardTitle>
              <CardDescription>Evolución de tus ingresos en los últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Gráfico de ingresos (próximamente)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="servicios" className="space-y-4">
          <Card className="">
            <CardHeader>
              <CardTitle>Top Servicios</CardTitle>
              <CardDescription>Servicios con mejor rendimiento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {serviciosTop.map((servicio, index) => (
                <div key={index} className="space-y-2 p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{servicio.nombre}</h4>
                    <span className="text-sm font-medium text-primary">{servicio.ingresos}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Reservas</p>
                      <p className="font-medium">{servicio.reservas}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ocupación</p>
                      <div className="flex items-center gap-2">
                        <Progress value={servicio.ocupacion} className="flex-1" />
                        <span className="text-xs font-medium">{servicio.ocupacion}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clientes" className="space-y-4">
          <Card className="">
            <CardHeader>
              <CardTitle>Análisis de Clientes</CardTitle>
              <CardDescription>Estadísticas de tus clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 rounded-lg bg-gradient-primary/10 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">Clientes Nuevos</p>
                  <p className="text-2xl font-bold text-primary">89</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-accent/10 border border-accent/20">
                  <p className="text-sm text-muted-foreground mb-1">Clientes Recurrentes</p>
                  <p className="text-2xl font-bold text-accent">367</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-secondary/10 border border-secondary/20">
                  <p className="text-sm text-muted-foreground mb-1">Tasa de Retención</p>
                  <p className="text-2xl font-bold text-secondary">82%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

