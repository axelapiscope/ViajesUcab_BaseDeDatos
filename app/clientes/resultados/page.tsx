"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Star, Heart, SlidersHorizontal, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrency } from "@/lib/currency-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ServiceDetailDialog } from "@/components/service-detail-dialog"

function ResultsContent() {
  const searchParams = useSearchParams()
  const servicesParam = searchParams.get("services") || "hoteles"
  const selectedServices = servicesParam.split(",")
  const destination = searchParams.get("destination") || ""
  const departureDate = searchParams.get("departureDate") || ""
  const returnDate = searchParams.get("returnDate") || ""

  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const { convertPrice } = useCurrency()

  const [selectedService, setSelectedService] = useState<any>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  const allResults = [
    {
      id: 1,
      type: "hoteles",
      image: "/luxury-hotel.jpg",
      title: "Hotel Luxury Paradise",
      location: destination,
      rating: 4.8,
      reviews: 1250,
      price: 1499,
      originalPrice: 2500,
      discount: 40,
      description:
        "Disfruta de una experiencia de lujo en nuestro hotel 5 estrellas con vistas al mar. Habitaciones amplias y elegantes con todas las comodidades modernas.",
      includedServices: [
        "Desayuno buffet incluido",
        "WiFi de alta velocidad",
        "Acceso al spa y gimnasio",
        "Piscina infinity con vista al mar",
        "Servicio de habitaciones 24/7",
        "Estacionamiento gratuito",
      ],
    },
    {
      id: 2,
      type: "hoteles",
      image: "/beach-resort.jpg",
      title: "Beach Resort Premium",
      location: destination,
      rating: 4.6,
      reviews: 890,
      price: 2100,
      originalPrice: 3200,
      discount: 34,
      description: "Resort todo incluido frente a la playa con actividades acuáticas y entretenimiento nocturno.",
      includedServices: [
        "Todo incluido (comidas y bebidas)",
        "Deportes acuáticos",
        "Animación diurna y nocturna",
        "Club infantil",
        "Spa con tratamientos",
      ],
    },
    {
      id: 3,
      type: "vuelos",
      image: "/airplane-in-flight.png",
      title: "Vuelo Directo",
      location: destination,
      rating: 4.5,
      reviews: 650,
      price: 780,
      originalPrice: 1200,
      discount: 35,
      description: "Vuelo directo sin escalas con aerolínea premium. Disfruta de comodidad y puntualidad.",
      includedServices: [
        "Asiento reclinable con espacio extra",
        "Entretenimiento a bordo",
        "Snacks y bebidas incluidas",
        "1 maleta facturada incluida",
      ],
      flightDetails: {
        outbound: {
          duration: "4h 30min",
          date: departureDate || "2025-01-15",
          gate: "A12",
          departure: "08:00 AM - Aeropuerto Internacional",
          arrival: "12:30 PM - " + destination,
        },
        return: {
          duration: "4h 45min",
          date: returnDate || "2025-01-22",
          gate: "B8",
          departure: "02:00 PM - " + destination,
          arrival: "06:45 PM - Aeropuerto Internacional",
        },
        baggage: {
          carry: "1 pieza de 10kg",
          checked: "1 pieza de 23kg",
        },
        meals: {
          included: false,
          type: "Snacks y bebidas incluidos en todos los vuelos",
        },
      },
    },
    {
      id: 4,
      type: "cruceros",
      image: "/cruise-ship.jpg",
      title: "Crucero de Lujo",
      location: destination,
      rating: 4.9,
      reviews: 2100,
      price: 3500,
      originalPrice: 5000,
      discount: 30,
      description: "Crucero de 7 días por el Caribe con paradas en múltiples destinos paradisíacos.",
      includedServices: [
        "Camarote con balcón privado",
        "Todas las comidas incluidas",
        "Entretenimiento en vivo",
        "Acceso a casino y spa",
        "Excursiones en puertos",
      ],
    },
    {
      id: 5,
      type: "tours",
      image: "/city-tour.jpg",
      title: "Tour Completo",
      location: destination,
      rating: 4.7,
      reviews: 980,
      price: 540,
      originalPrice: 900,
      discount: 40,
      description: "Tour guiado de día completo visitando los principales atractivos turísticos de la ciudad.",
      includedServices: [
        "Guía turístico profesional",
        "Transporte en bus climatizado",
        "Almuerzo típico incluido",
        "Entradas a museos y monumentos",
        "Seguro de viaje",
      ],
    },
    {
      id: 6,
      type: "traslados",
      title: "Traslado Privado Aeropuerto-Hotel",
      location: destination,
      rating: 4.8,
      reviews: 450,
      price: 120,
      originalPrice: 180,
      discount: 33,
      description: "Servicio de traslado privado desde el aeropuerto hasta tu hotel con conductor profesional.",
      includedServices: [
        "Vehículo privado climatizado",
        "Conductor bilingüe",
        "Asistencia con equipaje",
        "Agua embotellada",
        "WiFi en el vehículo",
      ],
    },
    {
      id: 7,
      type: "restaurantes",
      title: "Cena Gourmet con Vista al Mar",
      location: destination,
      rating: 4.9,
      reviews: 320,
      price: 85,
      originalPrice: 120,
      discount: 29,
      description: "Experiencia gastronómica única en restaurante de alta cocina con vista panorámica al océano.",
      includedServices: [
        "Menú degustación de 5 tiempos",
        "Maridaje de vinos premium",
        "Mesa con vista al mar",
        "Chef ejecutivo",
        "Música en vivo",
      ],
    },
  ]

  const filteredResults = allResults.filter((result) => {
    const matchesService = selectedServices.includes(result.type)
    const matchesPrice = result.price >= priceRange[0] && result.price <= priceRange[1]
    const matchesRating = selectedRating === null || result.rating >= selectedRating
    const matchesType = selectedType === null || result.type === selectedType
    return matchesService && matchesPrice && matchesRating && matchesType
  })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const clearFilters = () => {
    setPriceRange([0, 5000])
    setSelectedRating(null)
    setSelectedType(null)
  }

  const handleViewDetails = (result: any) => {
    setSelectedService(result)
    setShowDetailDialog(true)
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          <h2 className="font-bold text-lg">Filtros</h2>
        </div>
        {(selectedType || selectedRating || priceRange[0] > 0 || priceRange[1] < 5000) && (
          <Badge variant="secondary">
            {[selectedType, selectedRating, priceRange[0] > 0 || priceRange[1] < 5000].filter(Boolean).length}
          </Badge>
        )}
      </div>

      <div>
        <h3 className="font-semibold mb-3">Tipo de servicio</h3>
        <div className="space-y-2">
          {selectedServices.map((t) => (
            <Button
              key={t}
              variant={selectedType === t ? "default" : "outline"}
              size="sm"
              className="w-full justify-start"
              onClick={() => setSelectedType(selectedType === t ? null : t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Rango de precio</h3>
        <Slider min={0} max={5000} step={100} value={priceRange} onValueChange={setPriceRange} className="mb-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Calificación mínima</h3>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <Button
              key={rating}
              variant={selectedRating === rating ? "default" : "outline"}
              size="sm"
              className="w-full justify-start"
              onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
            >
              <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
              {rating}+ estrellas
            </Button>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full bg-transparent" onClick={clearFilters}>
        <X className="h-4 w-4 mr-2" />
        Limpiar filtros
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Resultados de búsqueda</h1>
              <p className="text-muted-foreground">
                {selectedServices.join(", ")} en {destination} • {departureDate} - {returnDate} •{" "}
                {filteredResults.length} resultados encontrados
              </p>
            </div>
            <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden bg-transparent">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                  {(selectedType || selectedRating || priceRange[0] > 0 || priceRange[1] < 5000) && (
                    <Badge variant="secondary" className="ml-2">
                      {[selectedType, selectedRating, priceRange[0] > 0 || priceRange[1] < 5000].filter(Boolean).length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filtros de búsqueda</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1 hidden lg:block">
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <FilterContent />
                </CardContent>
              </Card>
            </aside>

            <div className="lg:col-span-3">
              {filteredResults.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-xl font-semibold mb-2">No se encontraron resultados</p>
                  <p className="text-muted-foreground mb-4">Intenta ajustar los filtros para ver más opciones</p>
                  <Button onClick={clearFilters}>Limpiar filtros</Button>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredResults.map((result) => {
                    const convertedOriginal = convertPrice(result.originalPrice)
                    const convertedPrice = convertPrice(result.price)

                    return (
                      <Card
                        key={result.id}
                        className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                      >
                        <div className="relative group">
                          <div className="h-48 w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <span className="text-4xl font-bold text-primary/30">{result.type.toUpperCase()}</span>
                          </div>
                          <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                            -{result.discount}%
                          </Badge>
                          <button
                            onClick={() => toggleFavorite(result.id)}
                            className="absolute top-3 left-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all hover:scale-110"
                          >
                            <Heart
                              className={cn(
                                "h-5 w-5 transition-all",
                                favorites.includes(result.id) ? "fill-red-500 text-red-500" : "text-foreground",
                              )}
                            />
                          </button>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-1">{result.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{result.location}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-sm">{result.rating}</span>
                            <span className="text-sm text-muted-foreground">({result.reviews} reseñas)</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Desde</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-sm text-muted-foreground line-through">
                                {convertedOriginal.symbol}
                                {convertedOriginal.value.toLocaleString()}
                              </span>
                              <span className="text-2xl font-bold text-primary">
                                {convertedPrice.symbol}
                                {convertedPrice.value.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button className="w-full" onClick={() => handleViewDetails(result)}>
                            Ver detalle
                          </Button>
                        </CardFooter>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {selectedService && (
        <ServiceDetailDialog open={showDetailDialog} onOpenChange={setShowDetailDialog} service={selectedService} />
      )}
    </div>
  )
}

export default function ResultadosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 py-8">
            <div className="container mx-auto px-4 lg:px-8">
              <Skeleton className="h-12 w-64 mb-8" />
              <div className="grid lg:grid-cols-4 gap-8">
                <Skeleton className="h-96 lg:col-span-1" />
                <div className="lg:col-span-3 grid gap-6 md:grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-96" />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  )
}
