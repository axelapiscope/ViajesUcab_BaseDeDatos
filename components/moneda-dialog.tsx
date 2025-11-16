"use client"

import type React from "react"

import { useState } from "react"
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

type MonedaData = {
  codigo: string
  nombre: string
  tasaActual: number
  tasaAnterior: number
  ultimaActualizacion: string
}

type MonedaDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGuardar: (moneda: MonedaData) => void
}

export default function MonedaDialog({ open, onOpenChange, onGuardar }: MonedaDialogProps) {
  const [codigo, setCodigo] = useState("")
  const [nombre, setNombre] = useState("")
  const [tasaActual, setTasaActual] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGuardar({
      codigo: codigo.toUpperCase(),
      nombre,
      tasaActual: Number(tasaActual),
      tasaAnterior: Number(tasaActual),
      ultimaActualizacion: new Date().toISOString(),
    })
    setCodigo("")
    setNombre("")
    setTasaActual("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Agregar Nueva Moneda</DialogTitle>
            <DialogDescription>Ingresa los datos de la nueva moneda a registrar</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="codigo">Código de la moneda</Label>
              <Input
                id="codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Ej: USD, EUR, COP"
                maxLength={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre de la moneda</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Dólar Estadounidense"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tasa">Tasa actual (en Bolívares)</Label>
              <Input
                id="tasa"
                type="number"
                step="0.0001"
                min="0"
                value={tasaActual}
                onChange={(e) => setTasaActual(e.target.value)}
                placeholder="Ej: 36.5000"
                required
              />
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
