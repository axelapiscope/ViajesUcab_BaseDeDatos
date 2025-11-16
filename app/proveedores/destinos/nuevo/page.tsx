"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NuevoDestinoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nombre: "",
    ciudad: "",
    pais: "",
    descripcion: "",
    clima: "",
    mejorEpoca: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Destino creado",
      description: "El destino ha sido agregado exitosamente",
    })
    router.push("/proveedores/destinos")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.push("/proveedores/destinos")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agregar Nuevo Destino</h1>
          <p className="text-muted-foreground">Completa la información del nuevo destino</p>
        </div>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Información del Destino</CardTitle>
          <CardDescription>Agrega los detalles del destino para que los clientes puedan encontrarlo</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Destino *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Cancún"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad *</Label>
                <Input
                  id="ciudad"
                  value={formData.ciudad}
                  onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                  placeholder="Cancún"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pais">País *</Label>
                <Input
                  id="pais"
                  value={formData.pais}
                  onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                  placeholder="México"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clima">Clima</Label>
                <Input
                  id="clima"
                  value={formData.clima}
                  onChange={(e) => setFormData({ ...formData, clima: e.target.value })}
                  placeholder="Tropical"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="mejorEpoca">Mejor Época para Visitar</Label>
                <Input
                  id="mejorEpoca"
                  value={formData.mejorEpoca}
                  onChange={(e) => setFormData({ ...formData, mejorEpoca: e.target.value })}
                  placeholder="Diciembre - Abril"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción *</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                placeholder="Describe el destino, sus atracciones principales, actividades disponibles..."
                rows={5}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="gap-2 gradient-accent">
                Crear Destino
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/proveedores/destinos")}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

