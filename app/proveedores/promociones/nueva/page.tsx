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

export default function NuevaPromocionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nombre: "",
    descuento: "",
    fechaInicio: "",
    fechaFin: "",
    descripcion: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Promoción creada",
      description: "La promoción ha sido creada exitosamente",
    })
    router.push("/proveedores/promociones")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.push("/proveedores/promociones")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Crear Nueva Promoción</h1>
          <p className="text-muted-foreground">Crea una promoción atractiva para tus servicios</p>
        </div>
      </div>

      <Card className="gradient-secondary/10 border-secondary/20">
        <CardHeader>
          <CardTitle>Detalles de la Promoción</CardTitle>
          <CardDescription>Completa la información de tu nueva promoción</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre de la Promoción *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Verano Caribeño"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descuento">Descuento (%) *</Label>
                <Input
                  id="descuento"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.descuento}
                  onChange={(e) => setFormData({ ...formData, descuento: e.target.value })}
                  placeholder="25"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaInicio">Fecha de Inicio *</Label>
                <Input
                  id="fechaInicio"
                  type="date"
                  value={formData.fechaInicio}
                  onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaFin">Fecha de Fin *</Label>
                <Input
                  id="fechaFin"
                  type="date"
                  value={formData.fechaFin}
                  onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
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
                placeholder="Describe los beneficios y condiciones de la promoción..."
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="gap-2 gradient-secondary">
                Crear Promoción
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/proveedores/promociones")}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

