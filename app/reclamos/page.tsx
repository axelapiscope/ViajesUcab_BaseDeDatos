"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  FileText,
  AlertTriangle,
  MessageSquare,
  ArrowLeft,
} from "lucide-react"
import { ReclamoDialog } from "@/components/reclamo-dialog"
import { useClaims, type Claim } from "@/lib/claims-context"
import { useUser } from "@/lib/user-context"
import { useToast } from "@/hooks/use-toast"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"

const estadosConfig = {
  pendiente: {
    label: "Pendiente",
    icon: Clock,
    variant: "secondary" as const,
    description: "Tu reclamo ha sido recibido y está en espera de revisión",
  },
  "en-proceso": {
    label: "En Proceso",
    icon: AlertCircle,
    variant: "default" as const,
    description: "Estamos trabajando en resolver tu reclamo",
  },
  resuelto: {
    label: "Resuelto",
    icon: CheckCircle,
    variant: "outline" as const,
    description: "Tu reclamo ha sido resuelto satisfactoriamente",
  },
  rechazado: {
    label: "Rechazado",
    icon: XCircle,
    variant: "destructive" as const,
    description: "Tu reclamo no pudo ser procesado",
  },
  cancelado: {
    label: "Cancelado",
    icon: XCircle,
    variant: "destructive" as const,
    description: "Tu reclamo ha sido cancelado",
  },
}

const categorias = ["Vuelo", "Hotel", "Crucero", "Tour", "Traslado", "Tren", "Paquete", "Reembolso", "Otro"]

export default function ReclamosPage() {
  const { addClaim, getUserClaims } = useClaims()
  const { user, isAuthenticated } = useUser()
  const { toast } = useToast()
  const router = useRouter()
  const [reclamoSeleccionado, setReclamoSeleccionado] = useState<Claim | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    categoria: "",
    razon: "",
    descripcion: "",
    reservaRelacionada: "",
    urgente: false,
  })

  const userClaims = getUserClaims()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para enviar un reclamo",
        variant: "destructive",
      })
      return
    }

    if (!formData.categoria || !formData.razon || !formData.descripcion) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    addClaim(formData)

    toast({
      title: "Reclamo enviado",
      description: "Tu reclamo ha sido registrado exitosamente. Te contactaremos pronto.",
    })

    // Reset form
    setFormData({
      categoria: "",
      razon: "",
      descripcion: "",
      reservaRelacionada: "",
      urgente: false,
    })
  }

  const handleVerDetalle = (reclamo: Claim) => {
    setReclamoSeleccionado(reclamo)
    setDialogOpen(true)
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
            <Button variant="ghost" onClick={() => router.push("/")} className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            <div className="flex items-center justify-center min-h-[60vh]">
              <Card className="max-w-md">
                <CardHeader>
                  <CardTitle>Inicia sesión para continuar</CardTitle>
                  <CardDescription>Debes iniciar sesión para enviar y ver tus reclamos</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
          <div className="space-y-8">
            <Button variant="ghost" onClick={() => router.push("/perfil")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>

            <div>
              <h1 className="text-3xl font-bold text-foreground">Centro de Reclamos</h1>
              <p className="text-muted-foreground">Envía tus reclamos y da seguimiento a su estado</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Enviar un Reclamo
                </CardTitle>
                <CardDescription>
                  Completa el formulario para reportar cualquier inconveniente con tu reserva o servicio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="categoria">
                        Categoría <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.categoria}
                        onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                      >
                        <SelectTrigger id="categoria">
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categorias.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reserva">Número de Reserva (opcional)</Label>
                      <Input
                        id="reserva"
                        placeholder="Ej: RES-2025-1234"
                        value={formData.reservaRelacionada}
                        onChange={(e) => setFormData({ ...formData, reservaRelacionada: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="razon">
                      Motivo del Reclamo <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="razon"
                      placeholder="Ej: Retraso de vuelo, habitación no disponible, etc."
                      value={formData.razon}
                      onChange={(e) => setFormData({ ...formData, razon: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descripcion">
                      Descripción Detallada <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="descripcion"
                      placeholder="Describe tu situación con el mayor detalle posible..."
                      rows={5}
                      value={formData.descripcion}
                      onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgente"
                      checked={formData.urgente}
                      onCheckedChange={(checked) => setFormData({ ...formData, urgente: checked as boolean })}
                    />
                    <Label htmlFor="urgente" className="text-sm font-normal cursor-pointer">
                      Marcar como urgente (requiere atención inmediata)
                    </Label>
                  </div>

                  <Button type="submit" className="w-full md:w-auto" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Reclamo
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Mis Reclamos</h2>
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {userClaims.length} {userClaims.length === 1 ? "reclamo" : "reclamos"}
                </Badge>
              </div>

              {userClaims.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No tienes reclamos registrados</h3>
                    <p className="text-muted-foreground text-center">
                      Cuando envíes un reclamo, aparecerá aquí y podrás darle seguimiento
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {userClaims.map((reclamo) => {
                    const estadoConfig = estadosConfig[reclamo.estado]
                    const IconoEstado = estadoConfig.icon

                    return (
                      <Card
                        key={reclamo.id}
                        className="hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => handleVerDetalle(reclamo)}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2">
                                {reclamo.numeroReclamo}
                                {reclamo.urgente && (
                                  <Badge variant="destructive" className="gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    Urgente
                                  </Badge>
                                )}
                              </CardTitle>
                              <CardDescription>
                                {new Date(reclamo.fechaCreacion).toLocaleDateString("es-ES")}
                              </CardDescription>
                            </div>
                            <Badge variant={estadoConfig.variant} className="gap-1">
                              <IconoEstado className="h-3 w-3" />
                              {estadoConfig.label}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {reclamo.categoria}
                            </Badge>
                            <p className="font-medium text-sm text-foreground">{reclamo.razon}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{reclamo.descripcion}</p>
                          </div>
                          {reclamo.reservaRelacionada && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <FileText className="h-3 w-3" />
                              <span>Reserva: {reclamo.reservaRelacionada}</span>
                            </div>
                          )}
                          <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground">{estadoConfig.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>

            <ReclamoDialog open={dialogOpen} onOpenChange={setDialogOpen} reclamo={reclamoSeleccionado} />
          </div>
        </div>
      </main>
    </>
  )
}
