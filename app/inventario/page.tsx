"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Plane, Ship, MapPin, AlertTriangle, Plus, Pencil, Trash2 } from "lucide-react"
import { InventarioDialog } from "@/components/inventario-dialog"

type Vuelo = {
  id: string
  numero: string
  origen: string
  destino: string
  fecha: string
  asientosTotal: number
  asientosDisponibles: number
}

type Crucero = {
  id: string
  nombre: string
  ruta: string
  fechaSalida: string
  capacidadTotal: number
  capacidadDisponible: number
}

type Tour = {
  id: string
  nombre: string
  destino: string
  fecha: string
  capacidadTotal: number
  capacidadDisponible: number
}

const vuelosDataInicial: Vuelo[] = [
  {
    id: "1",
    numero: "VU-101",
    origen: "Caracas",
    destino: "Miami",
    fecha: "2025-03-25",
    asientosTotal: 180,
    asientosDisponibles: 12,
  },
  {
    id: "2",
    numero: "VU-202",
    origen: "Caracas",
    destino: "Madrid",
    fecha: "2025-03-28",
    asientosTotal: 250,
    asientosDisponibles: 45,
  },
  {
    id: "3",
    numero: "VU-303",
    origen: "Caracas",
    destino: "Cancún",
    fecha: "2025-03-30",
    asientosTotal: 150,
    asientosDisponibles: 3,
  },
]

const crucerosDataInicial: Crucero[] = [
  {
    id: "1",
    nombre: "Caribbean Dream",
    ruta: "Caribe Oriental",
    fechaSalida: "2025-04-10",
    capacidadTotal: 2000,
    capacidadDisponible: 150,
  },
  {
    id: "2",
    nombre: "Ocean Paradise",
    ruta: "Mediterráneo",
    fechaSalida: "2025-05-15",
    capacidadTotal: 3000,
    capacidadDisponible: 800,
  },
  {
    id: "3",
    nombre: "Tropical Explorer",
    ruta: "Caribe Sur",
    fechaSalida: "2025-04-20",
    capacidadTotal: 1500,
    capacidadDisponible: 50,
  },
]

const toursDataInicial: Tour[] = [
  {
    id: "1",
    nombre: "Tour Machu Picchu",
    destino: "Perú",
    fecha: "2025-04-05",
    capacidadTotal: 30,
    capacidadDisponible: 2,
  },
  {
    id: "2",
    nombre: "Safari Africano",
    destino: "Kenia",
    fecha: "2025-05-20",
    capacidadTotal: 25,
    capacidadDisponible: 15,
  },
  {
    id: "3",
    nombre: "Tour Patagonia",
    destino: "Argentina",
    fecha: "2025-06-10",
    capacidadTotal: 20,
    capacidadDisponible: 8,
  },
]

export default function InventarioPage() {
  const [vuelos, setVuelos] = useState<Vuelo[]>(vuelosDataInicial)
  const [cruceros, setCruceros] = useState<Crucero[]>(crucerosDataInicial)
  const [tours, setTours] = useState<Tour[]>(toursDataInicial)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [tipoActual, setTipoActual] = useState<"vuelo" | "crucero" | "tour">("vuelo")
  const [itemSeleccionado, setItemSeleccionado] = useState<Vuelo | Crucero | Tour | null>(null)
  const [modoEdicion, setModoEdicion] = useState(false)

  const calcularPorcentaje = (disponible: number, total: number) => {
    return ((disponible / total) * 100).toFixed(0)
  }

  const obtenerEstado = (disponible: number, total: number) => {
    const porcentaje = (disponible / total) * 100
    if (porcentaje <= 10) return { label: "Crítico", variant: "destructive" as const }
    if (porcentaje <= 30) return { label: "Bajo", variant: "default" as const }
    return { label: "Disponible", variant: "secondary" as const }
  }

  const handleAgregar = (tipo: "vuelo" | "crucero" | "tour") => {
    setTipoActual(tipo)
    setItemSeleccionado(null)
    setModoEdicion(false)
    setDialogOpen(true)
  }

  const handleEditar = (item: Vuelo | Crucero | Tour, tipo: "vuelo" | "crucero" | "tour") => {
    setTipoActual(tipo)
    setItemSeleccionado(item)
    setModoEdicion(true)
    setDialogOpen(true)
  }

  const handleEliminar = (id: string, tipo: "vuelo" | "crucero" | "tour") => {
    if (confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
      if (tipo === "vuelo") {
        setVuelos(vuelos.filter((v) => v.id !== id))
      } else if (tipo === "crucero") {
        setCruceros(cruceros.filter((c) => c.id !== id))
      } else {
        setTours(tours.filter((t) => t.id !== id))
      }
    }
  }

  const handleGuardar = (item: Vuelo | Crucero | Tour) => {
    if (tipoActual === "vuelo") {
      const vuelo = item as Vuelo
      if (modoEdicion) {
        setVuelos(vuelos.map((v) => (v.id === vuelo.id ? vuelo : v)))
      } else {
        setVuelos([...vuelos, { ...vuelo, id: Date.now().toString() }])
      }
    } else if (tipoActual === "crucero") {
      const crucero = item as Crucero
      if (modoEdicion) {
        setCruceros(cruceros.map((c) => (c.id === crucero.id ? crucero : c)))
      } else {
        setCruceros([...cruceros, { ...crucero, id: Date.now().toString() }])
      }
    } else {
      const tour = item as Tour
      if (modoEdicion) {
        setTours(tours.map((t) => (t.id === tour.id ? tour : t)))
      } else {
        setTours([...tours, { ...tour, id: Date.now().toString() }])
      }
    }
    setDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Inventario</h1>
        <p className="text-muted-foreground">Monitorea la disponibilidad de vuelos, cruceros y tours</p>
      </div>

      <Tabs defaultValue="vuelos" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vuelos" className="gap-2">
            <Plane className="h-4 w-4" />
            Vuelos
          </TabsTrigger>
          <TabsTrigger value="cruceros" className="gap-2">
            <Ship className="h-4 w-4" />
            Cruceros
          </TabsTrigger>
          <TabsTrigger value="tours" className="gap-2">
            <MapPin className="h-4 w-4" />
            Tours
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vuelos" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => handleAgregar("vuelo")} className="gap-2">
              <Plus className="h-4 w-4" />
              Agregar Vuelo
            </Button>
          </div>

          {vuelos.map((vuelo) => {
            const estado = obtenerEstado(vuelo.asientosDisponibles, vuelo.asientosTotal)
            const porcentaje = calcularPorcentaje(vuelo.asientosDisponibles, vuelo.asientosTotal)

            return (
              <Card key={vuelo.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Plane className="h-5 w-5 text-primary" />
                        Vuelo {vuelo.numero}
                      </CardTitle>
                      <CardDescription>
                        {vuelo.origen} → {vuelo.destino}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={estado.variant} className="gap-1">
                        {Number(porcentaje) <= 10 && <AlertTriangle className="h-3 w-3" />}
                        {estado.label}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditar(vuelo, "vuelo")}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEliminar(vuelo.id, "vuelo")}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Fecha de salida</p>
                      <p className="font-medium">{new Date(vuelo.fecha).toLocaleDateString("es-ES")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Asientos disponibles</p>
                      <p className="font-medium">
                        {vuelo.asientosDisponibles} / {vuelo.asientosTotal}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ocupación</span>
                      <span className="font-medium">{100 - Number(porcentaje)}%</span>
                    </div>
                    <Progress value={100 - Number(porcentaje)} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="cruceros" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => handleAgregar("crucero")} className="gap-2">
              <Plus className="h-4 w-4" />
              Agregar Crucero
            </Button>
          </div>

          {cruceros.map((crucero) => {
            const estado = obtenerEstado(crucero.capacidadDisponible, crucero.capacidadTotal)
            const porcentaje = calcularPorcentaje(crucero.capacidadDisponible, crucero.capacidadTotal)

            return (
              <Card key={crucero.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Ship className="h-5 w-5 text-accent" />
                        {crucero.nombre}
                      </CardTitle>
                      <CardDescription>{crucero.ruta}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={estado.variant} className="gap-1">
                        {Number(porcentaje) <= 10 && <AlertTriangle className="h-3 w-3" />}
                        {estado.label}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditar(crucero, "crucero")}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEliminar(crucero.id, "crucero")}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Fecha de salida</p>
                      <p className="font-medium">{new Date(crucero.fechaSalida).toLocaleDateString("es-ES")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Capacidad disponible</p>
                      <p className="font-medium">
                        {crucero.capacidadDisponible} / {crucero.capacidadTotal}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ocupación</span>
                      <span className="font-medium">{100 - Number(porcentaje)}%</span>
                    </div>
                    <Progress value={100 - Number(porcentaje)} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="tours" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => handleAgregar("tour")} className="gap-2">
              <Plus className="h-4 w-4" />
              Agregar Tour
            </Button>
          </div>

          {tours.map((tour) => {
            const estado = obtenerEstado(tour.capacidadDisponible, tour.capacidadTotal)
            const porcentaje = calcularPorcentaje(tour.capacidadDisponible, tour.capacidadTotal)

            return (
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
                      <Badge variant={estado.variant} className="gap-1">
                        {Number(porcentaje) <= 10 && <AlertTriangle className="h-3 w-3" />}
                        {estado.label}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditar(tour, "tour")}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEliminar(tour.id, "tour")}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Fecha de salida</p>
                      <p className="font-medium">{new Date(tour.fecha).toLocaleDateString("es-ES")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Capacidad disponible</p>
                      <p className="font-medium">
                        {tour.capacidadDisponible} / {tour.capacidadTotal}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ocupación</span>
                      <span className="font-medium">{100 - Number(porcentaje)}%</span>
                    </div>
                    <Progress value={100 - Number(porcentaje)} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>

      <InventarioDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        tipo={tipoActual}
        item={itemSeleccionado}
        onGuardar={handleGuardar}
        modoEdicion={modoEdicion}
      />
    </div>
  )
}
