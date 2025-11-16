"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useItinerary } from "@/lib/itinerary-context"
import { useUser } from "@/lib/user-context"
import { useCurrency } from "@/lib/currency-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plane, Hotel, Calendar, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ComprarItinerarioPage() {
  const params = useParams()
  const router = useRouter()
  const { savedItineraries } = useItinerary()
  const { user, isAuthenticated } = useUser()
  const { formatPrice } = useCurrency()
  const { toast } = useToast()
  const [selections, setSelections] = useState<Record<string, string>>({})

  const itinerary = savedItineraries.find((it) => it.id === params.id)

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para comprar un itinerario",
        variant: "destructive",
      })
      router.push("/")
      return
    }

    if (!itinerary) {
      toast({
        title: "Itinerario no encontrado",
        description: "El itinerario que buscas no existe",
        variant: "destructive",
      })
      router.push("/perfil?tab=itineraries")
    }
  }, [isAuthenticated, itinerary, router, toast])

  if (!itinerary || !user) {
    return null
  }

  const handleSelectionChange = (itemId: string, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [itemId]: value,
    }))
  }

  const handleContinueToPayment = () => {
    // Validate all selections are made
    const requiredSelections = itinerary.items.filter(
      (item) => item.type === "transport" || item.type === "accommodation" || item.type === "activity",
    )

    const missingSelections = requiredSelections.filter((item) => !selections[item.id])

    if (missingSelections.length > 0) {
      toast({
        title: "Selecciones incompletas",
        description: "Por favor completa todas las selecciones antes de continuar",
        variant: "destructive",
      })
      return
    }

    // Store purchase data
    const purchaseData = {
      itinerary,
      selections,
      customerInfo: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        passport: user.travelDocuments?.passport || "",
      },
    }

    localStorage.setItem("itineraryPurchase", JSON.stringify(purchaseData))
    router.push(`/itinerario/pago/${itinerary.id}`)
  }

  const getSelectionOptions = (item: any) => {
    switch (item.type) {
      case "transport":
        if (item.title.toLowerCase().includes("vuelo") || item.title.toLowerCase().includes("avión")) {
          return [
            { value: "economy-window", label: "Económica - Ventana", price: 0 },
            { value: "economy-aisle", label: "Económica - Pasillo", price: 0 },
            { value: "business-window", label: "Business - Ventana", price: 500 },
            { value: "business-aisle", label: "Business - Pasillo", price: 500 },
          ]
        }
        if (item.title.toLowerCase().includes("tren")) {
          return [
            { value: "standard", label: "Asiento Estándar", price: 0 },
            { value: "comfort", label: "Asiento Confort", price: 50 },
            { value: "first-class", label: "Primera Clase", price: 150 },
          ]
        }
        if (item.title.toLowerCase().includes("crucero")) {
          return [
            { value: "interior", label: "Camarote Interior", price: 0 },
            { value: "oceanview", label: "Camarote con Vista al Mar", price: 300 },
            { value: "balcony", label: "Camarote con Balcón", price: 600 },
            { value: "suite", label: "Suite", price: 1200 },
          ]
        }
        return []

      case "accommodation":
        return [
          { value: "standard", label: "Habitación Estándar", price: 0 },
          { value: "deluxe", label: "Habitación Deluxe", price: 100 },
          { value: "suite", label: "Suite", price: 250 },
          { value: "presidential", label: "Suite Presidencial", price: 500 },
        ]

      default:
        return []
    }
  }

  const getItemIcon = (type: string) => {
    switch (type) {
      case "transport":
        return <Plane className="h-5 w-5" />
      case "accommodation":
        return <Hotel className="h-5 w-5" />
      case "activity":
        return <MapPin className="h-5 w-5" />
      default:
        return <MapPin className="h-5 w-5" />
    }
  }

  const calculateTotalWithSelections = () => {
    let total = itinerary.totalPrice
    Object.entries(selections).forEach(([itemId, selection]) => {
      const item = itinerary.items.find((i) => i.id === itemId)
      if (item) {
        const options = getSelectionOptions(item)
        const selectedOption = options.find((opt) => opt.value === selection)
        if (selectedOption) {
          total += selectedOption.price
        }
      }
    })
    return total
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push("/perfil?tab=itineraries")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a Mis Itinerarios
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Comprar Itinerario</h1>
          <p className="text-muted-foreground">Selecciona tus preferencias para cada servicio</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{itinerary.name}</CardTitle>
                <CardDescription>
                  {itinerary.items.length} servicios incluidos
                  {itinerary.startDate && itinerary.endDate && (
                    <span className="ml-2">
                      • {new Date(itinerary.startDate).toLocaleDateString("es-ES")} -{" "}
                      {new Date(itinerary.endDate).toLocaleDateString("es-ES")}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
            </Card>

            {itinerary.items
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((item) => {
                const options = getSelectionOptions(item)
                const requiresSelection = options.length > 0

                return (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {getItemIcon(item.type)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <CardTitle className="text-lg">{item.title}</CardTitle>
                              <CardDescription>{item.description}</CardDescription>
                            </div>
                            <Badge variant="secondary">{formatPrice(item.price)}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(item.date).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                            {item.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {item.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    {requiresSelection && (
                      <CardContent>
                        <Label className="text-base font-semibold mb-3 block">Selecciona tu preferencia</Label>
                        <RadioGroup
                          value={selections[item.id] || ""}
                          onValueChange={(value) => handleSelectionChange(item.id, value)}
                        >
                          <div className="space-y-3">
                            {options.map((option) => (
                              <div
                                key={option.value}
                                className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary transition-colors"
                              >
                                <RadioGroupItem value={option.value} id={`${item.id}-${option.value}`} />
                                <Label
                                  htmlFor={`${item.id}-${option.value}`}
                                  className="flex-1 cursor-pointer flex items-center justify-between"
                                >
                                  <span>{option.label}</span>
                                  {option.price > 0 && (
                                    <span className="text-primary font-semibold">+{formatPrice(option.price)}</span>
                                  )}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Resumen de Compra</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Precio base del itinerario</span>
                    <span className="font-semibold">{formatPrice(itinerary.totalPrice)}</span>
                  </div>
                  {Object.entries(selections).map(([itemId, selection]) => {
                    const item = itinerary.items.find((i) => i.id === itemId)
                    if (!item) return null
                    const options = getSelectionOptions(item)
                    const selectedOption = options.find((opt) => opt.value === selection)
                    if (!selectedOption || selectedOption.price === 0) return null
                    return (
                      <div key={itemId} className="flex justify-between text-sm">
                        <span className="text-muted-foreground truncate pr-2">{selectedOption.label}</span>
                        <span className="font-semibold whitespace-nowrap">+{formatPrice(selectedOption.price)}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-xl text-primary">
                      {formatPrice(calculateTotalWithSelections())}
                    </span>
                  </div>
                </div>
                <Button onClick={handleContinueToPayment} className="w-full" size="lg">
                  Continuar al Pago
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
