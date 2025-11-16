"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

type Promocion = {
  id: string
  nombre: string
  descuento: number
  destinos: string[]
  fechaInicio: string
  fechaFin: string
}

type PromocionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  promocion: Promocion | null
  onGuardar: (promocion: Promocion) => void
}

export function PromocionDialog({ open, onOpenChange, promocion, onGuardar }: PromocionDialogProps) {
  const [nombre, setNombre] = useState("")
  const [descuento, setDescuento] = useState("")
  const [destinos, setDestinos] = useState<string[]>([])
  const [destinoInput, setDestinoInput] = useState("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")

  useEffect(() => {
    if (promocion) {
      setNombre(promocion.nombre)
      setDescuento(promocion.descuento.toString())
      setDestinos(promocion.destinos)
      setFechaInicio(promocion.fechaInicio)
      setFechaFin(promocion.fechaFin)
    } else {
      setNombre("")
      setDescuento("")
      setDestinos([])
      setDestinoInput("")
      setFechaInicio("")
      setFechaFin("")
    }
  }, [promocion, open])

  const handleAgregarDestino = () => {
    if (destinoInput.trim() && !destinos.includes(destinoInput.trim())) {
      setDestinos([...destinos, destinoInput.trim()])
      setDestinoInput("")
    }
  }

  const handleEliminarDestino = (destino: string) => {
    setDestinos(destinos.filter((d) => d !== destino))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGuardar({
      id: promocion?.id || "",
      nombre,
      descuento: Number(descuento),
      destinos,
      fechaInicio,
      fechaFin,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{promocion ? "Editar Promoción" : "Nueva Promoción"}</DialogTitle>
            <DialogDescription>
              {promocion ? "Modifica los datos de la promoción" : "Completa los datos para crear una nueva promoción"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre de la promoción</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Verano Caribeño"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descuento">Descuento (%)</Label>
              <Input
                id="descuento"
                type="number"
                min="1"
                max="100"
                value={descuento}
                onChange={(e) => setDescuento(e.target.value)}
                placeholder="Ej: 25"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destino">Destinos válidos</Label>
              <div className="flex gap-2">
                <Input
                  id="destino"
                  value={destinoInput}
                  onChange={(e) => setDestinoInput(e.target.value)}
                  placeholder="Ej: Cancún"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAgregarDestino()
                    }
                  }}
                />
                <Button type="button" onClick={handleAgregarDestino} variant="secondary">
                  Agregar
                </Button>
              </div>
              {destinos.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {destinos.map((destino) => (
                    <Badge key={destino} variant="secondary" className="gap-1">
                      {destino}
                      <button
                        type="button"
                        onClick={() => handleEliminarDestino(destino)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fechaInicio">Fecha de inicio</Label>
                <Input
                  id="fechaInicio"
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaFin">Fecha de fin</Label>
                <Input
                  id="fechaFin"
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
