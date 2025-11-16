"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type Moneda = {
  codigo: string
  nombre: string
  tasaActual: number
}

type HistorialTasa = {
  fecha: string
  tasa: number
  transaccionId?: string
}

type HistorialDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  moneda: Moneda | null
  historial: HistorialTasa[]
}

export default function HistorialDialog({ open, onOpenChange, moneda, historial }: HistorialDialogProps) {
  if (!moneda) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Historial de {moneda.codigo} / VES</DialogTitle>
          <DialogDescription>{moneda.nombre}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historial}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="fecha" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="tasa" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Registro de transacciones</h4>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {historial.map((registro, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Bs. {registro.tasa.toFixed(4)}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(registro.fecha).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                  {registro.transaccionId && (
                    <Badge variant="outline" className="text-xs">
                      {registro.transaccionId}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
