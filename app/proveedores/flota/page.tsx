"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane, Ship, MapPin, Plus, Pencil, Trash2 } from "lucide-react"

type Servicio = {
  id: string
  tipo: "vuelo" | "crucero" | "tour"
  nombre: string
  origen?: string
  destino: string
  fecha: string
  capacidad: number
  disponible: number
  precio: number
}

const serviciosIniciales: Servicio[] = [
  {
    id: "1",
    tipo: "vuelo",
    nombre: "VU-101",
    origen: "Caracas",
    destino: "Miami",
    fecha: "2025-03-25",
    capacidad: 180,
    disponible: 12,
    precio: 450,
  },
  {
    id: "2",
    tipo: "crucero",
    nombre: "Caribbean Dream",
    destino: "Caribe Oriental",
    fecha: "2025-04-10",
    capacidad: 2000,
    disponible: 150,
    precio: 1200,
  },
  {
    id: "3",
    tipo: "tour",
    nombre: "Tour Machu Picchu",
    destino: "Perú",
    fecha: "2025-04-05",
    capacidad: 30,
    disponible: 2,
    precio: 850,
  },
]

export default function FlotaPage() {
  const [servicios] = useState<Servicio[]>(serviciosIniciales)

  const vuelos = servicios.filter((s) => s.tipo === "vuelo")
  const cruceros = servicios.filter((s) => s.tipo === "crucero")
  const tours = servicios.filter((s) => s.tipo === "tour")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Flota</h1>
          <p className="text-muted-foreground">Administra tus vuelos, cruceros y tours</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Agregar Servicio
        </Button>
      </div>

      <Tabs defaultValue="vuelos" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vuelos" className="gap-2">
            <Plane className="h-4 w-4" />
            Vuelos ({vuelos.length})
          </TabsTrigger>
          <TabsTrigger value="cruceros" className="gap-2">
            <Ship className="h-4 w-4" />
            Cruceros ({cruceros.length})
          </TabsTrigger>
          <TabsTrigger value="tours" className="gap-2">
            <MapPin className="h-4 w-4" />
            Tours ({tours.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vuelos" className="space-y-4">
          {vuelos.map((vuelo) => (
            <Card key={vuelo.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Plane className="h-5 w-5 text-primary" />
                      {vuelo.nombre}
                    </CardTitle>
                    <CardDescription>
                      {vuelo.origen} → {vuelo.destino}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Fecha</p>
                    <p className="font-medium">{new Date(vuelo.fecha).toLocaleDateString("es-ES")}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Disponibilidad</p>
                    <p className="font-medium">
                      {vuelo.disponible} / {vuelo.capacidad}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Precio</p>
                    <p className="font-medium">${vuelo.precio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="cruceros" className="space-y-4">
          {cruceros.map((crucero) => (
            <Card key={crucero.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Ship className="h-5 w-5 text-accent" />
                      {crucero.nombre}
                    </CardTitle>
                    <CardDescription>{crucero.destino}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Fecha Salida</p>
                    <p className="font-medium">{new Date(crucero.fecha).toLocaleDateString("es-ES")}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Disponibilidad</p>
                    <p className="font-medium">
                      {crucero.disponible} / {crucero.capacidad}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Precio</p>
                    <p className="font-medium">${crucero.precio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tours" className="space-y-4">
          {tours.map((tour) => (
            <Card key={tour.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-secondary" />
                      {tour.nombre}
                    </CardTitle>
                    <CardDescription>{tour.destino}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Fecha</p>
                    <p className="font-medium">{new Date(tour.fecha).toLocaleDateString("es-ES")}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Disponibilidad</p>
                    <p className="font-medium">
                      {tour.disponible} / {tour.capacidad}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Precio</p>
                    <p className="font-medium">${tour.precio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

