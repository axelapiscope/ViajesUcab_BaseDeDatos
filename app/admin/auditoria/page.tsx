"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, User, Database, Shield, AlertCircle, CheckCircle, XCircle } from "lucide-react"

type AuditLog = {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  status: "success" | "error" | "warning"
  details: string
}

const auditLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: new Date().toISOString(),
    user: "admin@viajesucab.com",
    action: "CREATE",
    resource: "Promoción",
    status: "success",
    details: "Promoción 'Verano Caribeño' creada exitosamente",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: "proveedor@example.com",
    action: "UPDATE",
    resource: "Inventario",
    status: "success",
    details: "Vuelo VU-101 actualizado: asientos disponibles modificados",
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: "admin@viajesucab.com",
    action: "DELETE",
    resource: "Usuario",
    status: "warning",
    details: "Usuario inactivo eliminado del sistema",
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    user: "admin@viajesucab.com",
    action: "UPDATE",
    resource: "Tasa de Cambio",
    status: "success",
    details: "Tasa USD/VES actualizada a 36.5",
  },
  {
    id: "5",
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    user: "cliente@example.com",
    action: "CREATE",
    resource: "Reserva",
    status: "success",
    details: "Nueva reserva creada: RES-2025-001",
  },
]

export default function AuditoriaPage() {
  const [logs] = useState<AuditLog[]>(auditLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterAction, setFilterAction] = useState<string>("all")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge variant="outline" className="bg-green-50 text-green-700">Éxito</Badge>
      case "error":
        return <Badge variant="outline" className="bg-red-50 text-red-700">Error</Badge>
      case "warning":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Advertencia</Badge>
      default:
        return null
    }
  }

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === "all" || log.status === filterStatus
    const matchesAction = filterAction === "all" || log.action === filterAction

    return matchesSearch && matchesStatus && matchesAction
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Auditoría del Sistema</h1>
        <p className="text-muted-foreground">Registro de todas las acciones realizadas en el sistema</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar en logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="success">Éxito</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="warning">Advertencia</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterAction} onValueChange={setFilterAction}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por acción" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las acciones</SelectItem>
            <SelectItem value="CREATE">Crear</SelectItem>
            <SelectItem value="UPDATE">Actualizar</SelectItem>
            <SelectItem value="DELETE">Eliminar</SelectItem>
            <SelectItem value="READ">Leer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <Card key={log.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(log.status)}
                  <div>
                    <CardTitle className="text-base">{log.action}</CardTitle>
                    <CardDescription>{log.resource}</CardDescription>
                  </div>
                </div>
                {getStatusBadge(log.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{log.user}</span>
              </div>
              <p className="text-sm">{log.details}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Database className="h-3 w-3" />
                <span>{new Date(log.timestamp).toLocaleString("es-ES")}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron registros</h3>
          <p className="text-muted-foreground">Intenta con otros filtros de búsqueda</p>
        </div>
      )}
    </div>
  )
}

