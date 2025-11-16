"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tag, Plus, Calendar } from "lucide-react"

type Promocion = {
  id: string
  nombre: string
  descuento: number
  fechaInicio: string
  fechaFin: string
  estado: "activa" | "vencida" | "próxima"
  serviciosAplicables: number
}

const promocionesIniciales: Promocion[] = [
  {
    id: "1",
    nombre: "Verano Caribeño",
    descuento: 25,
    fechaInicio: "2025-06-01",
    fechaFin: "2025-08-31",
    estado: "próxima",
    serviciosAplicables: 5,
  },
  {
    id: "2",
    nombre: "Descuento de Temporada",
    descuento: 15,
    fechaInicio: "2025-03-01",
    fechaFin: "2025-03-31",
    estado: "activa",
    serviciosAplicables: 8,
  },
]

export default function PromocionesPage() {
  const [promociones] = useState<Promocion[]>(promocionesIniciales)

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "activa":
        return <Badge className="bg-green-500">Activa</Badge>
      case "vencida":
        return <Badge variant="destructive">Vencida</Badge>
      case "próxima":
        return <Badge variant="secondary">Próxima</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Promociones Propias</h1>
          <p className="text-muted-foreground">Gestiona las promociones de tus servicios</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Crear Promoción
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {promociones.map((promocion) => (
          <Card key={promocion.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  <CardTitle>{promocion.nombre}</CardTitle>
                </div>
                {getEstadoBadge(promocion.estado)}
              </div>
              <CardDescription>
                Descuento del {promocion.descuento}%
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(promocion.fechaInicio).toLocaleDateString("es-ES")} -{" "}
                  {new Date(promocion.fechaFin).toLocaleDateString("es-ES")}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Servicios aplicables: </span>
                <span className="font-medium">{promocion.serviciosAplicables}</span>
              </div>
              <Button variant="outline" className="w-full">
                Editar Promoción
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

