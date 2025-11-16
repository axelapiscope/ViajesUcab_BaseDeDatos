"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useUser } from "@/lib/user-context"
import { useCurrency } from "@/lib/currency-context"
import { usePurchaseHistory } from "@/lib/purchase-history-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CreditCard, User, Mail, Phone, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PagoItinerarioPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useUser()
  const { convertPrice } = useCurrency()
  const { addPurchase } = usePurchaseHistory()
  const { toast } = useToast()

  const [purchaseData, setPurchaseData] = useState<any>(null)
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    const stored = localStorage.getItem("itineraryPurchase")
    if (!stored) {
      toast({
        title: "Error",
        description: "No se encontró información de compra",
        variant: "destructive",
      })
      router.push("/perfil?tab=itineraries")
      return
    }

    setPurchaseData(JSON.parse(stored))
  }, [isAuthenticated, router, toast])

  if (!purchaseData || !user) {
    return null
  }

  const { itinerary, selections } = purchaseData

  const calculateTotalWithSelections = () => {
    const total = itinerary.totalPrice
    Object.entries(selections).forEach(([itemId, selection]: [string, any]) => {
      const item = itinerary.items.find((i: any) => i.id === itemId)
      if (item) {
        // Add selection price logic here if needed
      }
    })
    return total
  }

  const totalPrice = calculateTotalWithSelections()
  const convertedTotal = convertPrice(totalPrice)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const reservationNumber = `VU${Date.now().toString().slice(-8)}`
    const milesEarned = Math.floor(totalPrice * 10)

    // Convert itinerary items to cart items format
    const cartItems = itinerary.items.map((item: any) => ({
      id: Number.parseInt(item.id),
      title: item.title,
      location: item.location || item.description,
      price: item.price,
      image: "/placeholder.svg",
      type: item.type === "transport" ? "flight" : item.type === "accommodation" ? "hotel" : "tour",
      companyName: item.companyName || "ViajesUCAB",
      dates: {
        checkIn: item.date,
        checkOut: item.date,
      },
    }))

    addPurchase({
      id: reservationNumber,
      reservationNumber,
      items: cartItems,
      totalPrice,
      purchaseDate: new Date().toISOString(),
      status: "completed",
      milesEarned,
    })

    const confirmationData = {
      reservationNumber,
      customerInfo: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        passport: user.travelDocuments?.passport || "",
      },
      items: cartItems,
      totalPrice,
      purchaseDate: new Date().toISOString(),
    }

    localStorage.setItem("lastPurchase", JSON.stringify(confirmationData))
    localStorage.removeItem("itineraryPurchase")

    router.push(`/confirmacion?reservation=${reservationNumber}`)
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => router.push(`/itinerario/comprar/${params.id}`)} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </div>

          <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Información Personal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nombre Completo</Label>
                      <Input value={user.name} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input value={user.email} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Teléfono
                      </Label>
                      <Input value={user.phone} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Dirección
                      </Label>
                      <Input value={user.address} disabled />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Información de Pago
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número de tarjeta</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength={19}
                        required
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Fecha de vencimiento</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/AA"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Resumen del Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Itinerario: {itinerary.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{itinerary.items.length} servicios</span>
                      </div>
                    </div>
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold">
                          {convertedTotal.symbol}
                          {convertedTotal.value.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Impuestos</span>
                        <span className="font-semibold">Incluidos</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-lg text-primary">
                          {convertedTotal.symbol}
                          {convertedTotal.value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Confirmar y Pagar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
