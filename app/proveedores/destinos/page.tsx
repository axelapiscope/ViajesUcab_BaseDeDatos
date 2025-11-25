"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Plus, Globe, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

type Destino = {
  id: string
  nombre: string
  pais: string
  ciudad: string
  descripcion: string
  serviciosActivos: number
}

const destinosIniciales: Destino[] = [
  {
    id: "1",
    nombre: "Cancún",
    pais: "México",
    ciudad: "Cancún",
    descripcion: "Destino paradisíaco con playas de arena blanca",
    serviciosActivos: 12,
  },
  {
    id: "2",
    nombre: "París",
    pais: "Francia",
    ciudad: "París",
    descripcion: "La ciudad del amor y la luz",
    serviciosActivos: 8,
  },
  {
    id: "3",
    nombre: "Miami",
    pais: "Estados Unidos",
    ciudad: "Miami",
    descripcion: "Playa, sol y diversión en la costa este",
    serviciosActivos: 15,
  },
]

export default function DestinosPage() {
  const [destinos] = useState<Destino[]>(destinosIniciales)
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <Button variant="ghost" onClick={() => router.push("/proveedores")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuración de Destinos</h1>
          <p className="text-muted-foreground">Gestiona los destinos disponibles en tus servicios</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Agregar Destino
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {destinos.map((destino) => (
          <Card key={destino.id} className="transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <CardTitle>{destino.nombre}</CardTitle>
                </div>
                <Badge variant="secondary">{destino.serviciosActivos} servicios</Badge>
              </div>
              <CardDescription>
                {destino.ciudad}, {destino.pais}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{destino.descripcion}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Globe className="h-3 w-3" />
                <span>{destino.pais}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

