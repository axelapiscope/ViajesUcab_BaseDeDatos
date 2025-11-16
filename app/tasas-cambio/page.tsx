"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import MonedaDialog from "@/components/MonedaDialog"
import HistorialDialog from "@/components/HistorialDialog"
import { useUser } from "@/lib/user-context"

type Moneda = {
  id: string
  codigo: string
  nombre: string
  tasaActual: number
  tasaAnterior: number
  ultimaActualizacion: string
}

type HistorialTasa = {
  fecha: string
  tasa: number
  transaccionId?: string
}

const monedasIniciales: Moneda[] = [
  {
    id: "1",
    codigo: "USD",
    nombre: "Dólar Estadounidense",
    tasaActual: 36.5,
    tasaAnterior: 36.2,
    ultimaActualizacion: new Date().toISOString(),
  },
  {
    id: "2",
    codigo: "EUR",
    nombre: "Euro",
    tasaActual: 39.8,
    tasaAnterior: 39.5,
    ultimaActualizacion: new Date().toISOString(),
  },
  {
    id: "3",
    codigo: "COP",
    nombre: "Peso Colombiano",
    tasaActual: 0.0092,
    tasaAnterior: 0.0091,
    ultimaActualizacion: new Date().toISOString(),
  },
  {
    id: "4",
    codigo: "ARS",
    nombre: "Peso Argentino",
    tasaActual: 0.037,
    tasaAnterior: 0.038,
    ultimaActualizacion: new Date().toISOString(),
  },
]

const historialEjemplo: HistorialTasa[] = [
  { fecha: "2025-03-01", tasa: 35.8 },
  { fecha: "2025-03-05", tasa: 36.0, transaccionId: "TXN-001" },
  { fecha: "2025-03-10", tasa: 36.2, transaccionId: "TXN-002" },
  { fecha: "2025-03-15", tasa: 36.3 },
  { fecha: "2025-03-20", tasa: 36.5, transaccionId: "TXN-003" },
]

export default function TasasCambioPage() {
  const router = useRouter()
  const { isAuthenticated } = useUser()
  const [monedas] = useState<Moneda[]>(monedasIniciales)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [historialOpen, setHistorialOpen] = useState(false)
  const [monedaSeleccionada, setMonedaSeleccionada] = useState<Moneda | null>(null)

  const bolivar = {
    codigo: "VES",
    nombre: "Bolívar Venezolano",
    descripcion: "Moneda base del sistema",
  }

  const handleAgregarMoneda = (moneda: Omit<Moneda, "id">) => {
    setDialogOpen(false)
  }

  const handleEliminarMoneda = (id: string) => {
    // No action needed for client view
  }

  const handleVerHistorial = (moneda: Moneda) => {
    setMonedaSeleccionada(moneda)
    setHistorialOpen(true)
  }

  const calcularCambio = (actual: number, anterior: number) => {
    const cambio = ((actual - anterior) / anterior) * 100
    return cambio.toFixed(2)
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => router.push("/perfil")} className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Tasas de Cambio</h1>
                <p className="text-muted-foreground">
                  Consulta las tasas de cambio actuales frente al Bolívar Venezolano
                </p>
              </div>
              {!isAuthenticated && (
                <Button onClick={() => setDialogOpen(true)} className="gap-2">
                  Agregar Moneda
                </Button>
              )}
            </div>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🇻🇪</span>
                  {bolivar.nombre} ({bolivar.codigo})
                </CardTitle>
                <CardDescription>{bolivar.descripcion}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Todas las tasas están expresadas en Bolívares. Última actualización:{" "}
                  {new Date().toLocaleString("es-ES")}
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {monedas.map((moneda) => {
                const cambio = calcularCambio(moneda.tasaActual, moneda.tasaAnterior)
                const esPositivo = Number(cambio) > 0

                return (
                  <Card key={moneda.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{moneda.codigo} / VES</CardTitle>
                          <CardDescription>{moneda.nombre}</CardDescription>
                        </div>
                        <Badge variant={esPositivo ? "default" : "secondary"} className="gap-1">
                          {esPositivo ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {cambio}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-3xl font-bold text-foreground">Bs. {moneda.tasaActual.toFixed(4)}</p>
                        <p className="text-sm text-muted-foreground">Anterior: Bs. {moneda.tasaAnterior.toFixed(4)}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Actualizado: {new Date(moneda.ultimaActualizacion).toLocaleString("es-ES")}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {monedas.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay tasas de cambio disponibles en este momento.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <MonedaDialog open={dialogOpen} onOpenChange={setDialogOpen} onGuardar={handleAgregarMoneda} />
      <HistorialDialog
        open={historialOpen}
        onOpenChange={setHistorialOpen}
        moneda={monedaSeleccionada}
        historial={historialEjemplo}
      />
    </>
  )
}
