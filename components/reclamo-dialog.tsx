"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, FileText, AlertCircle, MessageSquare } from "lucide-react"
import type { Claim } from "@/lib/claims-context"

type ReclamoDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  reclamo: Claim | null
}

const estadosConfig = {
  pendiente: { label: "Pendiente", variant: "secondary" as const },
  "en-proceso": { label: "En Proceso", variant: "default" as const },
  resuelto: { label: "Resuelto", variant: "outline" as const },
  rechazado: { label: "Rechazado", variant: "destructive" as const },
  cancelado: { label: "Cancelado", variant: "destructive" as const },
}

export function ReclamoDialog({ open, onOpenChange, reclamo }: ReclamoDialogProps) {
  if (!reclamo) return null

  const estadoConfig = estadosConfig[reclamo.estado]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{reclamo.numeroReclamo}</DialogTitle>
              <DialogDescription>Detalles de tu reclamo</DialogDescription>
            </div>
            <Badge variant={estadoConfig.variant}>{estadoConfig.label}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Detalles del Reclamo
            </h4>
            <div className="space-y-3 pl-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Categoría</p>
                <Badge variant="outline">{reclamo.categoria}</Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Motivo del reclamo</p>
                <p className="text-sm font-medium">{reclamo.razon}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Descripción</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{reclamo.descripcion}</p>
              </div>
              {reclamo.urgente && (
                <div>
                  <Badge variant="destructive" className="gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Marcado como urgente
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Información Adicional
            </h4>
            <div className="space-y-2 pl-6">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Fecha de envío: {new Date(reclamo.fechaCreacion).toLocaleString("es-ES")}
                </span>
              </div>
              {reclamo.reservaRelacionada && (
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Reserva relacionada: {reclamo.reservaRelacionada}</span>
                </div>
              )}
            </div>
          </div>

          {reclamo.respuestaAdmin && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Respuesta del Administrador
                </h4>
                <div className="pl-6">
                  <p className="text-sm text-muted-foreground leading-relaxed bg-muted p-3 rounded-lg">
                    {reclamo.respuestaAdmin}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
