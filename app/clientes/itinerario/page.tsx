"use client"

import { useState } from "react"
import {
  Plus,
  Trash2,
  Calendar,
  MapPin,
  Plane,
  Hotel,
  Compass,
  Package,
  GitCompare,
  ArrowLeft,
  ShoppingCart,
  ShoppingBag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useCurrency } from "@/lib/currency-context"
import { useItinerary } from "@/lib/itinerary-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"

interface ItineraryItem {
  id: string
  type: "destination" | "transport" | "accommodation" | "activity"
  title: string
  description: string
  date: string
  price: number
  location?: string
}

interface SavedItinerary {
  id: string
  name: string
  startDate?: string
  endDate?: string
  items: ItineraryItem[]
  totalPrice: number
  createdAt: string
}

const DESTINATIONS = [
  { id: "1", name: "París, Francia", description: "La ciudad del amor", price: 1200, image: "Eiffel Tower" },
  { id: "2", name: "Roma, Italia", description: "Historia y cultura", price: 1100, image: "Colosseum" },
  { id: "3", name: "Barcelona, España", description: "Arte y arquitectura", price: 950, image: "Sagrada Familia" },
  { id: "4", name: "Londres, Reino Unido", description: "Tradición británica", price: 1300, image: "Big Ben" },
  { id: "5", name: "Ámsterdam, Países Bajos", description: "Canales y cultura", price: 1050, image: "Canal houses" },
  { id: "6", name: "Tokio, Japón", description: "Modernidad y tradición", price: 1800, image: "Tokyo skyline" },
]

const TRANSPORT_OPTIONS = [
  { id: "1", name: "Vuelo Económico", description: "Clase económica", price: 450, duration: "8-12 horas" },
  { id: "2", name: "Vuelo Business", description: "Clase ejecutiva", price: 1200, duration: "8-12 horas" },
  { id: "3", name: "Tren de Alta Velocidad", description: "Cómodo y rápido", price: 150, duration: "2-4 horas" },
  { id: "4", name: "Autobús Turístico", description: "Económico", price: 50, duration: "4-6 horas" },
  { id: "5", name: "Alquiler de Auto", description: "Libertad total", price: 300, duration: "Por día" },
  { id: "6", name: "Crucero", description: "Viaje con alojamiento", price: 2500, duration: "7 días" },
]

const ACCOMMODATION_OPTIONS = [
  { id: "1", name: "Hotel 5 Estrellas", description: "Lujo y confort", price: 250, rating: 5 },
  { id: "2", name: "Hotel 4 Estrellas", description: "Excelente calidad", price: 150, rating: 4 },
  { id: "3", name: "Hotel 3 Estrellas", description: "Buena relación calidad-precio", price: 80, rating: 3 },
  { id: "4", name: "Apartamento Airbnb", description: "Como en casa", price: 100, rating: 4 },
  { id: "5", name: "Hostal", description: "Económico y social", price: 35, rating: 3 },
  { id: "6", name: "Resort Todo Incluido", description: "Sin preocupaciones", price: 350, rating: 5 },
]

const ACTIVITIES = [
  { id: "1", name: "Tour de Ciudad", description: "Conoce los principales atractivos", price: 50, duration: "4 horas" },
  { id: "2", name: "Museo y Galerías", description: "Arte e historia", price: 30, duration: "3 horas" },
  {
    id: "3",
    name: "Excursión de Día Completo",
    description: "Aventura fuera de la ciudad",
    price: 120,
    duration: "8 horas",
  },
  { id: "4", name: "Tour Gastronómico", description: "Sabores locales", price: 80, duration: "3 horas" },
  { id: "5", name: "Actividad de Aventura", description: "Deportes extremos", price: 150, duration: "5 horas" },
  { id: "6", name: "Espectáculo Nocturno", description: "Entretenimiento", price: 70, duration: "2 horas" },
]

export default function ItinerarioPage() {
  const [itineraryName, setItineraryName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [items, setItems] = useState<ItineraryItem[]>([])
  const [showAddForm, setShowAddForm] = useState(true)
  const [selectedType, setSelectedType] = useState<ItineraryItem["type"]>("destination")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const { savedItineraries, addItinerary, deleteItinerary } = useItinerary()
  const { toast } = useToast()
  const { formatPrice } = useCurrency()
  const router = useRouter()
  const { addToCart } = useCart()

  const addPredefinedItem = (option: any, type: ItineraryItem["type"]) => {
    if (!selectedDate) {
      toast({
        title: "Fecha requerida",
        description: "Por favor selecciona una fecha primero",
        variant: "destructive",
      })
      return
    }

    const item: ItineraryItem = {
      id: Date.now().toString(),
      type,
      title: option.name,
      description: option.description,
      date: selectedDate,
      price: option.price,
      location: type === "destination" ? option.name : undefined,
    }

    setItems([...items, item])
    toast({
      title: "Elemento agregado",
      description: `${option.name} se agregó a tu itinerario`,
    })
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
    toast({
      title: "Elemento eliminado",
      description: "El elemento se eliminó de tu itinerario",
    })
  }

  const saveItinerary = () => {
    console.log("[v0] saveItinerary called")
    console.log("[v0] itineraryName:", itineraryName)
    console.log("[v0] items:", items)

    if (!itineraryName) {
      toast({
        title: "Nombre requerido",
        description: "Por favor ingresa un nombre para tu itinerario",
        variant: "destructive",
      })
      return
    }

    if (items.length === 0) {
      toast({
        title: "Itinerario vacío",
        description: "Agrega al menos un elemento a tu itinerario",
        variant: "destructive",
      })
      return
    }

    const newItinerary = {
      id: Date.now().toString(),
      name: itineraryName,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      items: [...items],
      totalPrice: items.reduce((sum, item) => sum + item.price, 0),
      createdAt: new Date().toISOString(),
    }

    console.log("[v0] Calling addItinerary with:", newItinerary)
    addItinerary(newItinerary)
    console.log("[v0] addItinerary called successfully")

    setItineraryName("")
    setStartDate("")
    setEndDate("")
    setItems([])

    toast({
      title: "Itinerario guardado",
      description: `"${newItinerary.name}" se guardó exitosamente en tu perfil`,
    })
  }

  const handleDeleteItinerary = (id: string) => {
    deleteItinerary(id)
    toast({
      title: "Itinerario eliminado",
      description: "El itinerario se eliminó correctamente",
    })
  }

  const handlePurchaseItinerary = (itinerary: SavedItinerary) => {
    const cartItem = {
      id: Number.parseInt(itinerary.id),
      title: itinerary.name,
      location: `${itinerary.items.length} elementos incluidos`,
      price: itinerary.totalPrice,
      image: "/travel-itinerary.jpg",
      type: "package" as const,
      dates:
        itinerary.items.length > 0
          ? {
              checkIn: itinerary.items[0].date,
              checkOut: itinerary.items[itinerary.items.length - 1].date,
            }
          : undefined,
    }

    addToCart(cartItem)
  }

  const handlePurchaseCurrentItinerary = () => {
    if (items.length === 0) {
      toast({
        title: "Itinerario vacío",
        description: "Agrega elementos a tu itinerario antes de comprar",
        variant: "destructive",
      })
      return
    }

    const tempItinerary = {
      id: `temp-${Date.now()}`,
      name: itineraryName || "Itinerario sin nombre",
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      items: [...items],
      totalPrice: items.reduce((sum, item) => sum + item.price, 0),
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem("currentItineraryPurchase", JSON.stringify(tempItinerary))

    router.push(`/reservar/itinerario/${tempItinerary.id}`)
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

  const getIcon = (type: ItineraryItem["type"]) => {
    switch (type) {
      case "destination":
        return <MapPin className="h-5 w-5" />
      case "transport":
        return <Plane className="h-5 w-5" />
      case "accommodation":
        return <Hotel className="h-5 w-5" />
      case "activity":
        return <Compass className="h-5 w-5" />
    }
  }

  const getTypeLabel = (type: ItineraryItem["type"]) => {
    switch (type) {
      case "destination":
        return "Destino"
      case "transport":
        return "Transporte"
      case "accommodation":
        return "Hospedaje"
      case "activity":
        return "Actividad"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Crear Itinerario</h1>
            <p className="text-muted-foreground">
              Combina destinos, transporte, hospedaje y actividades para crear tu viaje perfecto
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Itinerary Name */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Itinerario</CardTitle>
                <CardDescription>Dale un nombre y define las fechas de tu viaje</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nombre del Itinerario</Label>
                  <Input
                    placeholder="Ej: Vacaciones en Europa 2024"
                    value={itineraryName}
                    onChange={(e) => setItineraryName(e.target.value)}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Fecha de Inicio</Label>
                    <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de Fin</Label>
                    <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate} />
                  </div>
                </div>
                {startDate && endDate && (
                  <p className="text-sm text-muted-foreground">
                    Duración:{" "}
                    {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))}{" "}
                    días
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Agregar Elementos</CardTitle>
                    <CardDescription>
                      Selecciona una fecha y haz clic en el botón + para agregar opciones
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddForm(!showAddForm)} variant="outline" size="sm">
                    {showAddForm ? "Ocultar" : "Mostrar"} Opciones
                  </Button>
                </div>
              </CardHeader>
              {showAddForm && (
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Fecha para el elemento *</Label>
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        Selecciona la fecha en la que deseas realizar esta actividad
                      </p>
                    </div>

                    <Tabs value={selectedType} onValueChange={(v) => setSelectedType(v as ItineraryItem["type"])}>
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="destination">Destinos</TabsTrigger>
                        <TabsTrigger value="transport">Transporte</TabsTrigger>
                        <TabsTrigger value="accommodation">Hospedaje</TabsTrigger>
                        <TabsTrigger value="activity">Actividades</TabsTrigger>
                      </TabsList>

                      <TabsContent value="destination" className="space-y-3 mt-4">
                        {DESTINATIONS.map((dest) => (
                          <Card key={dest.id} className="hover:border-primary transition-colors">
                            <CardContent className="pt-4">
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex-1">
                                  <h4 className="font-semibold">{dest.name}</h4>
                                  <p className="text-sm text-muted-foreground">{dest.description}</p>
                                  <p className="text-sm font-semibold text-primary mt-1">
                                    Desde {formatPrice(dest.price)}
                                  </p>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => addPredefinedItem(dest, "destination")}
                                  className="shrink-0"
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Agregar
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </TabsContent>

                      <TabsContent value="transport" className="space-y-3 mt-4">
                        {TRANSPORT_OPTIONS.map((transport) => (
                          <Card key={transport.id} className="hover:border-primary transition-colors">
                            <CardContent className="pt-4">
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex-1">
                                  <h4 className="font-semibold">{transport.name}</h4>
                                  <p className="text-sm text-muted-foreground">{transport.description}</p>
                                  <div className="flex items-center gap-3 mt-1">
                                    <p className="text-sm font-semibold text-primary">{formatPrice(transport.price)}</p>
                                    <span className="text-xs text-muted-foreground">• {transport.duration}</span>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => addPredefinedItem(transport, "transport")}
                                  className="shrink-0"
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Agregar
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </TabsContent>

                      <TabsContent value="accommodation" className="space-y-3 mt-4">
                        {ACCOMMODATION_OPTIONS.map((hotel) => (
                          <Card key={hotel.id} className="hover:border-primary transition-colors">
                            <CardContent className="pt-4">
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex-1">
                                  <h4 className="font-semibold">{hotel.name}</h4>
                                  <p className="text-sm text-muted-foreground">{hotel.description}</p>
                                  <div className="flex items-center gap-3 mt-1">
                                    <p className="text-sm font-semibold text-primary">
                                      {formatPrice(hotel.price)}/noche
                                    </p>
                                    <span className="text-xs text-muted-foreground">• {"⭐".repeat(hotel.rating)}</span>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => addPredefinedItem(hotel, "accommodation")}
                                  className="shrink-0"
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Agregar
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </TabsContent>

                      <TabsContent value="activity" className="space-y-3 mt-4">
                        {ACTIVITIES.map((activity) => (
                          <Card key={activity.id} className="hover:border-primary transition-colors">
                            <CardContent className="pt-4">
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex-1">
                                  <h4 className="font-semibold">{activity.name}</h4>
                                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                                  <div className="flex items-center gap-3 mt-1">
                                    <p className="text-sm font-semibold text-primary">{formatPrice(activity.price)}</p>
                                    <span className="text-xs text-muted-foreground">• {activity.duration}</span>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => addPredefinedItem(activity, "activity")}
                                  className="shrink-0"
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Agregar
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Items List */}
            <Card>
              <CardHeader>
                <CardTitle>Tu Itinerario</CardTitle>
                <CardDescription>Elementos organizados cronológicamente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No hay elementos en tu itinerario</p>
                    <p className="text-sm">Selecciona opciones arriba para comenzar</p>
                  </div>
                )}

                {items
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((item) => (
                    <Card key={item.id}>
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              {getIcon(item.type)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <Badge variant="secondary" className="mb-2">
                                  {getTypeLabel(item.type)}
                                </Badge>
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                {item.location && (
                                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                    <MapPin className="h-3 w-3" />
                                    {item.location}
                                  </p>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(item.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            {item.description && (
                              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                            )}
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {new Date(item.date).toLocaleDateString("es-ES", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                              {item.price > 0 && (
                                <span className="font-semibold text-primary">{formatPrice(item.price)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total de elementos</span>
                  <span className="font-semibold">{items.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Destinos</span>
                  <span className="font-semibold">{items.filter((i) => i.type === "destination").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Transporte</span>
                  <span className="font-semibold">{items.filter((i) => i.type === "transport").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Hospedaje</span>
                  <span className="font-semibold">{items.filter((i) => i.type === "accommodation").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Actividades</span>
                  <span className="font-semibold">{items.filter((i) => i.type === "activity").length}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Precio Total</span>
                    <span className="text-xl font-bold text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                <Button onClick={saveItinerary} className="w-full" size="lg">
                  Guardar Itinerario
                </Button>
                <Button
                  onClick={handlePurchaseCurrentItinerary}
                  className="w-full gap-2"
                  size="lg"
                  variant="default"
                  disabled={items.length === 0}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Comprar Itinerario
                </Button>
                <Link href="/itinerario/comparar" className="block">
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <GitCompare className="h-4 w-4" />
                    Comparar Itinerarios
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {savedItineraries.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Itinerarios Guardados</CardTitle>
                  <CardDescription>Tus itinerarios creados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {savedItineraries.map((itinerary) => (
                    <Card key={itinerary.id} className="border-2">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold truncate">{itinerary.name}</h4>
                              <p className="text-sm text-muted-foreground">{itinerary.items.length} elementos</p>
                              {itinerary.startDate && itinerary.endDate && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(itinerary.startDate).toLocaleDateString("es-ES")} -{" "}
                                  {new Date(itinerary.endDate).toLocaleDateString("es-ES")}
                                </p>
                              )}
                              <p className="text-sm font-semibold text-primary mt-1">
                                {formatPrice(itinerary.totalPrice)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteItinerary(itinerary.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button onClick={() => handlePurchaseItinerary(itinerary)} className="w-full gap-2" size="sm">
                            <ShoppingCart className="h-4 w-4" />
                            Agregar al Carrito
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Consejos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Organiza tu viaje cronológicamente</p>
                <p>• Incluye tiempo de traslado entre destinos</p>
                <p>• Reserva hospedaje cerca de tus actividades</p>
                <p>• Considera días de descanso en tu itinerario</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
