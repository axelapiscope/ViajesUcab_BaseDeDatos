"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Check, Globe, Users, CreditCard, CheckCircle2, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useCurrency } from "@/lib/currency-context"
import { PassengerInfo } from "@/components/booking/passenger-info"
import { PaymentStep } from "@/components/booking/payment-step"
import { ConfirmationStep } from "@/components/booking/confirmation-step"

const steps = [
  { id: 1, name: "Selección", icon: Globe },
  { id: 2, name: "Pasajeros", icon: Users },
  { id: 3, name: "Pago", icon: CreditCard },
  { id: 4, name: "Confirmación", icon: CheckCircle2 },
]

interface ItineraryItem {
  id: string
  type: "destination" | "transport" | "accommodation" | "activity"
  title: string
  description: string
  date: string
  price: number
  location?: string
  selectedSeat?: string
  selectedCabin?: string
  selectedRoom?: string
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

export default function ItineraryBookingPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { formatPrice } = useCurrency()
  const [currentStep, setCurrentStep] = useState(1)
  const [itinerary, setItinerary] = useState<SavedItinerary | null>(null)
  const [bookingData, setBookingData] = useState<any>({
    passengers: [],
    payment: {},
  })

  useEffect(() => {
    const stored = localStorage.getItem("currentItineraryPurchase")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setItinerary(parsed)
      } catch (e) {
        console.error("Error loading itinerary:", e)
        toast({
          title: "Error",
          description: "No se pudo cargar el itinerario",
          variant: "destructive",
        })
        router.push("/itinerario")
      }
    } else {
      toast({
        title: "Error",
        description: "No se encontró el itinerario",
        variant: "destructive",
      })
      router.push("/itinerario")
    }
  }, [params.id, router, toast])

  const updateBookingData = (data: any) => {
    setBookingData((prev: any) => ({ ...prev, ...data }))
  }

  const updateItineraryItem = (itemId: string, updates: Partial<ItineraryItem>) => {
    if (!itinerary) return

    const updatedItems = itinerary.items.map((item) => (item.id === itemId ? { ...item, ...updates } : item))

    setItinerary({ ...itinerary, items: updatedItems })
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!itinerary) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = currentStep > step.id
              const isCurrent = currentStep === step.id

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                        isCompleted && "bg-primary text-primary-foreground",
                        isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                        !isCompleted && !isCurrent && "bg-muted text-muted-foreground",
                      )}
                    >
                      {isCompleted ? <Check className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                    </div>
                    <span
                      className={cn(
                        "mt-2 text-sm font-medium",
                        (isCompleted || isCurrent) && "text-foreground",
                        !isCompleted && !isCurrent && "text-muted-foreground",
                      )}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn("h-1 flex-1 mx-4 transition-all", isCompleted ? "bg-primary" : "bg-muted")} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <div>
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Personaliza tu Itinerario</CardTitle>
                <CardDescription>
                  Selecciona asientos, camarotes y habitaciones para cada elemento de tu viaje
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {itinerary.items.map((item) => (
                  <Card key={item.id} className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {new Date(item.date).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <span className="font-semibold text-primary">{formatPrice(item.price)}</span>
                      </div>

                      {/* Seat selection for flights and trains */}
                      {item.type === "transport" && (item.title.includes("Vuelo") || item.title.includes("Tren")) && (
                        <div className="space-y-2">
                          <Label>Seleccionar Asiento</Label>
                          <Select
                            value={item.selectedSeat || ""}
                            onValueChange={(value) => updateItineraryItem(item.id, { selectedSeat: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Elige tu asiento" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1A">1A - Ventana</SelectItem>
                              <SelectItem value="1B">1B - Pasillo</SelectItem>
                              <SelectItem value="2A">2A - Ventana</SelectItem>
                              <SelectItem value="2B">2B - Pasillo</SelectItem>
                              <SelectItem value="3A">3A - Ventana</SelectItem>
                              <SelectItem value="3B">3B - Pasillo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Cabin selection for cruises */}
                      {item.type === "transport" && item.title.includes("Crucero") && (
                        <div className="space-y-2">
                          <Label>Tipo de Camarote</Label>
                          <Select
                            value={item.selectedCabin || ""}
                            onValueChange={(value) => updateItineraryItem(item.id, { selectedCabin: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Elige tu camarote" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="interior">Interior - Económico</SelectItem>
                              <SelectItem value="oceanview">Vista al Mar - Estándar</SelectItem>
                              <SelectItem value="balcony">Balcón - Premium</SelectItem>
                              <SelectItem value="suite">Suite - Lujo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Room selection for hotels */}
                      {item.type === "accommodation" && (
                        <div className="space-y-2">
                          <Label>Tipo de Habitación</Label>
                          <Select
                            value={item.selectedRoom || ""}
                            onValueChange={(value) => updateItineraryItem(item.id, { selectedRoom: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Elige tu habitación" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single">Individual - 1 Cama</SelectItem>
                              <SelectItem value="double">Doble - 2 Camas</SelectItem>
                              <SelectItem value="queen">Queen - Cama Grande</SelectItem>
                              <SelectItem value="king">King - Cama Extra Grande</SelectItem>
                              <SelectItem value="suite">Suite - Lujo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={() => router.push("/itinerario")}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver
                  </Button>
                  <Button onClick={nextStep}>Continuar</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <PassengerInfo
              bookingData={bookingData}
              updateBookingData={updateBookingData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 3 && (
            <PaymentStep
              bookingData={bookingData}
              updateBookingData={updateBookingData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 4 && (
            <ConfirmationStep
              bookingData={{
                ...bookingData,
                itinerary,
                serviceType: "package",
              }}
              serviceType="package"
            />
          )}
        </div>
      </div>
    </div>
  )
}
