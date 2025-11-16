"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Plane, Hotel, Compass, Check, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCurrency } from "@/lib/currency-context"
import { useItinerary } from "@/lib/itinerary-context"
import Link from "next/link"

export default function CompararItinerariosPage() {
  const { formatPrice } = useCurrency()
  const { savedItineraries } = useItinerary()
  const [selectedItinerary, setSelectedItinerary] = useState<string | null>(null)

  const getIcon = (type: string) => {
    switch (type) {
      case "destination":
        return <MapPin className="h-4 w-4" />
      case "transport":
        return <Plane className="h-4 w-4" />
      case "accommodation":
        return <Hotel className="h-4 w-4" />
      case "activity":
        return <Compass className="h-4 w-4" />
      default:
        return null
    }
  }

  const getItineraryStats = (itinerary: any) => {
    return {
      destinations: itinerary.items.filter((i: any) => i.type === "destination").length,
      transports: itinerary.items.filter((i: any) => i.type === "transport").length,
      accommodations: itinerary.items.filter((i: any) => i.type === "accommodation").length,
      activities: itinerary.items.filter((i: any) => i.type === "activity").length,
    }
  }

  if (savedItineraries.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <Link href="/itinerario">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Crear Itinerario
            </Button>
          </Link>
          <Card className="mt-8">
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h2 className="text-2xl font-bold mb-2">No hay itinerarios para comparar</h2>
              <p className="text-muted-foreground mb-6">Crea al menos un itinerario para usar esta función</p>
              <Link href="/itinerario">
                <Button>Crear Itinerario</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <div className="mb-8">
          <Link href="/itinerario">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Crear Itinerario
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Comparar Itinerarios</h1>
          <p className="text-muted-foreground">
            Compara precios, destinos y detalles para elegir el mejor viaje para ti
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedItineraries.map((itinerary) => {
            const stats = getItineraryStats(itinerary)
            return (
              <Card
                key={itinerary.id}
                className={`relative transition-all ${
                  selectedItinerary === itinerary.id ? "border-primary border-2 shadow-lg" : ""
                }`}
              >
                {selectedItinerary === itinerary.id && (
                  <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary-foreground" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{itinerary.name}</CardTitle>
                  <CardDescription>{itinerary.items.length} elementos en total</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Price */}
                  <div className="text-center py-4 bg-primary/5 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Precio Total</p>
                    <p className="text-3xl font-bold text-primary">{formatPrice(itinerary.totalPrice)}</p>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <MapPin className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-2xl font-bold">{stats.destinations}</p>
                      <p className="text-xs text-muted-foreground">Destinos</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Plane className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-2xl font-bold">{stats.transports}</p>
                      <p className="text-xs text-muted-foreground">Transportes</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Hotel className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-2xl font-bold">{stats.accommodations}</p>
                      <p className="text-xs text-muted-foreground">Hospedajes</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Compass className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-2xl font-bold">{stats.activities}</p>
                      <p className="text-xs text-muted-foreground">Actividades</p>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold mb-3">Incluye:</p>
                    {itinerary.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <div className="mt-0.5 text-muted-foreground">{getIcon(item.type)}</div>
                        <div className="flex-1">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full"
                    variant={selectedItinerary === itinerary.id ? "default" : "outline"}
                    onClick={() => setSelectedItinerary(itinerary.id)}
                  >
                    {selectedItinerary === itinerary.id ? "Seleccionado" : "Seleccionar Este"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Comparison Table */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Comparación Detallada</CardTitle>
            <CardDescription>Vista lado a lado de todos los itinerarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Característica</th>
                    {savedItineraries.map((itinerary) => (
                      <th key={itinerary.id} className="text-center py-3 px-4 font-semibold">
                        {itinerary.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Precio Total</td>
                    {savedItineraries.map((itinerary) => (
                      <td key={itinerary.id} className="text-center py-3 px-4">
                        <span className="font-bold text-primary">{formatPrice(itinerary.totalPrice)}</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Destinos</td>
                    {savedItineraries.map((itinerary) => (
                      <td key={itinerary.id} className="text-center py-3 px-4">
                        {getItineraryStats(itinerary).destinations}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Transportes</td>
                    {savedItineraries.map((itinerary) => (
                      <td key={itinerary.id} className="text-center py-3 px-4">
                        {getItineraryStats(itinerary).transports}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Hospedajes</td>
                    {savedItineraries.map((itinerary) => (
                      <td key={itinerary.id} className="text-center py-3 px-4">
                        {getItineraryStats(itinerary).accommodations}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Actividades</td>
                    {savedItineraries.map((itinerary) => (
                      <td key={itinerary.id} className="text-center py-3 px-4">
                        {getItineraryStats(itinerary).activities}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Total Elementos</td>
                    {savedItineraries.map((itinerary) => (
                      <td key={itinerary.id} className="text-center py-3 px-4">
                        {itinerary.items.length}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {selectedItinerary && (
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg">Reservar Itinerario Seleccionado</Button>
            <Button variant="outline" size="lg">
              Compartir Comparación
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
