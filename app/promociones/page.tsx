"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Tag, ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"

type Promocion = {
  id: string
  nombre: string
  descuento: number
  destinos: string[]
  fechaInicio: string
  fechaFin: string
}

const promocionesIniciales: Promocion[] = [
  {
    id: "1",
    nombre: "Verano Caribeño",
    descuento: 25,
    destinos: ["Cancún", "Punta Cana", "Aruba"],
    fechaInicio: "2025-06-01",
    fechaFin: "2025-08-31",
  },
  {
    id: "2",
    nombre: "Europa Express",
    descuento: 15,
    destinos: ["París", "Roma", "Barcelona", "Madrid"],
    fechaInicio: "2025-04-15",
    fechaFin: "2025-06-30",
  },
  {
    id: "3",
    nombre: "Aventura Sudamericana",
    descuento: 30,
    destinos: ["Buenos Aires", "Lima", "Santiago"],
    fechaInicio: "2025-03-01",
    fechaFin: "2025-05-31",
  },
]

export default function PromocionesPage() {
  const router = useRouter()
  const [promociones] = useState<Promocion[]>(promocionesIniciales)
  const [busqueda, setBusqueda] = useState("")

  const promocionesFiltradas = promociones.filter(
    (promo) =>
      promo.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      promo.destinos.some((destino) => destino.toLowerCase().includes(busqueda.toLowerCase())),
  )

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => router.push("/perfil")} className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>

            <div>
              <h1 className="text-3xl font-bold text-foreground">Promociones Disponibles</h1>
              <p className="text-muted-foreground">Descubre las mejores ofertas y descuentos para tu próximo viaje</p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar promociones por nombre o destino..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {promocionesFiltradas.map((promocion) => (
                <Card key={promocion.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{promocion.nombre}</CardTitle>
                      </div>
                      <Badge variant="secondary" className="text-lg font-bold">
                        -{promocion.descuento}%
                      </Badge>
                    </div>
                    <CardDescription>
                      Válido del {new Date(promocion.fechaInicio).toLocaleDateString("es-ES")} al{" "}
                      {new Date(promocion.fechaFin).toLocaleDateString("es-ES")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Destinos válidos:</p>
                      <div className="flex flex-wrap gap-2">
                        {promocion.destinos.map((destino) => (
                          <Badge key={destino} variant="outline">
                            {destino}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => router.push("/")}>
                      Ver Ofertas
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {promocionesFiltradas.length === 0 && (
              <div className="text-center py-12">
                <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron promociones</h3>
                <p className="text-muted-foreground">Intenta con otros términos de búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
