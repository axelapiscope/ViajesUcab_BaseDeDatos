"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Gift, Plane, Star, TrendingUp, Award } from "lucide-react"
import Link from "next/link"

export default function MillasPage() {
  const millasActuales = 12500
  const millasNecesarias = 25000
  const porcentaje = (millasActuales / millasNecesarias) * 100

  const transacciones = [
    { fecha: "2025-03-15", descripcion: "Vuelo Caracas-Miami", millas: 2500, tipo: "ganadas" },
    { fecha: "2025-03-10", descripcion: "Hotel Cancún", millas: 1800, tipo: "ganadas" },
    { fecha: "2025-02-28", descripcion: "Canje de premio", millas: -5000, tipo: "canjeadas" },
    { fecha: "2025-02-20", descripcion: "Crucero Caribe", millas: 3200, tipo: "ganadas" },
  ]

  const beneficios = [
    { nivel: "Bronce", millas: 0, descuento: "5%", icon: Star },
    { nivel: "Plata", millas: 10000, descuento: "10%", icon: Award, activo: millasActuales >= 10000 },
    { nivel: "Oro", millas: 25000, descuento: "15%", icon: Gift, activo: millasActuales >= 25000 },
    { nivel: "Platino", millas: 50000, descuento: "20%", icon: TrendingUp, activo: false },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Programa de Millas</h1>
        <p className="text-muted-foreground">Gana millas con cada reserva y canjéalas por increíbles beneficios</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-hover gradient-primary/10 border-primary/20 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-primary" />
              Tus Millas Actuales
            </CardTitle>
            <CardDescription>Acumula millas para desbloquear beneficios exclusivos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-primary">{millasActuales.toLocaleString()}</span>
                <span className="text-muted-foreground">millas</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Te faltan {(millasNecesarias - millasActuales).toLocaleString()} millas para alcanzar el nivel Oro
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progreso al siguiente nivel</span>
                <span className="font-medium">{porcentaje.toFixed(0)}%</span>
              </div>
              <Progress value={porcentaje} className="h-3" />
            </div>
            <Link href="/clientes">
              <Button className="w-full gradient-primary">
                Ver Ofertas para Ganar Millas
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="card-hover gradient-accent/10 border-accent/20">
          <CardHeader>
            <CardTitle>Nivel Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-accent flex items-center justify-center">
                <Award className="h-10 w-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-accent">Plata</h3>
                <p className="text-sm text-muted-foreground">10% de descuento en todas las reservas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Niveles del Programa</CardTitle>
          <CardDescription>Desbloquea beneficios exclusivos acumulando millas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {beneficios.map((beneficio, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  beneficio.activo
                    ? "border-accent bg-gradient-accent/10"
                    : "border-muted bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <beneficio.icon
                    className={`h-5 w-5 ${
                      beneficio.activo ? "text-accent" : "text-muted-foreground"
                    }`}
                  />
                  <h4 className="font-semibold">{beneficio.nivel}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Desde {beneficio.millas.toLocaleString()} millas
                </p>
                <Badge variant={beneficio.activo ? "default" : "secondary"} className="w-full justify-center">
                  {beneficio.descuento} descuento
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Historial de Millas</CardTitle>
          <CardDescription>Últimas transacciones de millas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transacciones.map((transaccion, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex-1">
                  <p className="font-medium">{transaccion.descripcion}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaccion.fecha).toLocaleDateString("es-ES")}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      transaccion.tipo === "ganadas" ? "text-accent" : "text-destructive"
                    }`}
                  >
                    {transaccion.tipo === "ganadas" ? "+" : ""}
                    {transaccion.millas.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">millas</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

