"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

type InventarioDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  tipo: "vuelo" | "crucero" | "tour"
  item: Vuelo | Crucero | Tour | null
  onGuardar: (item: Vuelo | Crucero | Tour) => void
  modoEdicion: boolean
}

export function InventarioDialog({ open, onOpenChange, tipo, item, onGuardar, modoEdicion }: InventarioDialogProps) {
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    if (item) {
      setFormData(item)
    } else {
      // Inicializar formulario vacío según el tipo
      if (tipo === "vuelo") {
        setFormData({
          numero: "",
          origen: "",
          destino: "",
          fecha: "",
          asientosTotal: 0,
          asientosDisponibles: 0,
        })
      } else if (tipo === "crucero") {
        setFormData({
          nombre: "",
          ruta: "",
          fechaSalida: "",
          capacidadTotal: 0,
          capacidadDisponible: 0,
        })
      } else {
        setFormData({
          nombre: "",
          destino: "",
          fecha: "",
          capacidadTotal: 0,
          capacidadDisponible: 0,
        })
      }
    }
  }, [item, tipo, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGuardar(formData)
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value })
  }

  const getTitulo = () => {
    if (modoEdicion) {
      return `Editar ${tipo === "vuelo" ? "Vuelo" : tipo === "crucero" ? "Crucero" : "Tour"}`
    }
    return `Agregar ${tipo === "vuelo" ? "Vuelo" : tipo === "crucero" ? "Crucero" : "Tour"}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{getTitulo()}</DialogTitle>
          <DialogDescription>
            {modoEdicion ? "Modifica los datos del elemento" : "Completa los datos para agregar un nuevo elemento"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tipo === "vuelo" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="numero">Número de Vuelo</Label>
                <Input
                  id="numero"
                  value={formData.numero || ""}
                  onChange={(e) => handleChange("numero", e.target.value)}
                  placeholder="VU-101"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origen">Origen</Label>
                  <Input
                    id="origen"
                    value={formData.origen || ""}
                    onChange={(e) => handleChange("origen", e.target.value)}
                    placeholder="Caracas"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destino">Destino</Label>
                  <Input
                    id="destino"
                    value={formData.destino || ""}
                    onChange={(e) => handleChange("destino", e.target.value)}
                    placeholder="Miami"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha de Salida</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha || ""}
                  onChange={(e) => handleChange("fecha", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="asientosTotal">Asientos Totales</Label>
                  <Input
                    id="asientosTotal"
                    type="number"
                    value={formData.asientosTotal || 0}
                    onChange={(e) => handleChange("asientosTotal", Number.parseInt(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asientosDisponibles">Asientos Disponibles</Label>
                  <Input
                    id="asientosDisponibles"
                    type="number"
                    value={formData.asientosDisponibles || 0}
                    onChange={(e) => handleChange("asientosDisponibles", Number.parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {tipo === "crucero" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Crucero</Label>
                <Input
                  id="nombre"
                  value={formData.nombre || ""}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  placeholder="Caribbean Dream"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ruta">Ruta</Label>
                <Input
                  id="ruta"
                  value={formData.ruta || ""}
                  onChange={(e) => handleChange("ruta", e.target.value)}
                  placeholder="Caribe Oriental"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaSalida">Fecha de Salida</Label>
                <Input
                  id="fechaSalida"
                  type="date"
                  value={formData.fechaSalida || ""}
                  onChange={(e) => handleChange("fechaSalida", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacidadTotal">Capacidad Total</Label>
                  <Input
                    id="capacidadTotal"
                    type="number"
                    value={formData.capacidadTotal || 0}
                    onChange={(e) => handleChange("capacidadTotal", Number.parseInt(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacidadDisponible">Capacidad Disponible</Label>
                  <Input
                    id="capacidadDisponible"
                    type="number"
                    value={formData.capacidadDisponible || 0}
                    onChange={(e) => handleChange("capacidadDisponible", Number.parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {tipo === "tour" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Tour</Label>
                <Input
                  id="nombre"
                  value={formData.nombre || ""}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  placeholder="Tour Machu Picchu"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destino">Destino</Label>
                <Input
                  id="destino"
                  value={formData.destino || ""}
                  onChange={(e) => handleChange("destino", e.target.value)}
                  placeholder="Perú"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha de Salida</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha || ""}
                  onChange={(e) => handleChange("fecha", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacidadTotal">Capacidad Total</Label>
                  <Input
                    id="capacidadTotal"
                    type="number"
                    value={formData.capacidadTotal || 0}
                    onChange={(e) => handleChange("capacidadTotal", Number.parseInt(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacidadDisponible">Capacidad Disponible</Label>
                  <Input
                    id="capacidadDisponible"
                    type="number"
                    value={formData.capacidadDisponible || 0}
                    onChange={(e) => handleChange("capacidadDisponible", Number.parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{modoEdicion ? "Guardar Cambios" : "Agregar"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
