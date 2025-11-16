"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NuevoServicioPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [tipoServicio, setTipoServicio] = useState<string>("")
  const [formData, setFormData] = useState({
    nombre: "",
    origen: "",
    destino: "",
    fecha: "",
    capacidad: "",
    precio: "",
    descripcion: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Servicio creado",
      description: "El servicio ha sido agregado exitosamente a tu flota",
    })
    router.push("/proveedores/flota")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.push("/proveedores/flota")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agregar Nuevo Servicio</h1>
          <p className="text-muted-foreground">Completa la información para agregar un nuevo servicio a tu flota</p>
        </div>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Información del Servicio</CardTitle>
          <CardDescription>Selecciona el tipo de servicio y completa los datos</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Servicio *</Label>
              <Select value={tipoServicio} onValueChange={setTipoServicio} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo de servicio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vuelo">Vuelo</SelectItem>
                  <SelectItem value="crucero">Crucero</SelectItem>
                  <SelectItem value="tour">Tour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre/Número *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder={tipoServicio === "vuelo" ? "VU-101" : tipoServicio === "crucero" ? "Caribbean Dream" : "Tour Machu Picchu"}
                  required
                />
              </div>

              {tipoServicio === "vuelo" && (
                <div className="space-y-2">
                  <Label htmlFor="origen">Origen *</Label>
                  <Input
                    id="origen"
                    value={formData.origen}
                    onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
                    placeholder="Caracas"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="destino">Destino *</Label>
                <Input
                  id="destino"
                  value={formData.destino}
                  onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                  placeholder={tipoServicio === "vuelo" ? "Miami" : tipoServicio === "crucero" ? "Caribe Oriental" : "Perú"}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha de Salida *</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacidad">Capacidad Total *</Label>
                <Input
                  id="capacidad"
                  type="number"
                  value={formData.capacidad}
                  onChange={(e) => setFormData({ ...formData, capacidad: e.target.value })}
                  placeholder="180"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="precio">Precio Base (USD) *</Label>
                <Input
                  id="precio"
                  type="number"
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                  placeholder="450"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                placeholder="Agrega una descripción del servicio..."
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="gap-2 gradient-primary">
                <Plus className="h-4 w-4" />
                Crear Servicio
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/proveedores/flota")}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

