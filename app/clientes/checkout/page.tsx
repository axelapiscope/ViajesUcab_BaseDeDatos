"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/lib/cart-context"
import { useCurrency } from "@/lib/currency-context"
import { usePurchaseHistory } from "@/lib/purchase-history-context"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, User, Mail, Phone, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { convertPrice } = useCurrency()
  const { addPurchase } = usePurchaseHistory()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const convertedTotal = convertPrice(totalPrice)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateCardNumber = (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\s/g, "")
    return /^\d{13,19}$/.test(cleaned)
  }

  const validateExpiryDate = (expiryDate: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/
    if (!regex.test(expiryDate)) return false
    
    const [month, year] = expiryDate.split("/")
    const expiry = new Date(2000 + Number.parseInt(year), Number.parseInt(month) - 1)
    const now = new Date()
    return expiry > now
  }

  const validateCVV = (cvv: string): boolean => {
    return /^\d{3,4}$/.test(cvv)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar tarjeta
    if (!validateCardNumber(formData.cardNumber)) {
      toast({
        title: "Error de validación",
        description: "El número de tarjeta no es válido. Debe tener entre 13 y 19 dígitos.",
        variant: "destructive",
      })
      return
    }

    // Validar fecha de vencimiento
    if (!validateExpiryDate(formData.expiryDate)) {
      toast({
        title: "Error de validación",
        description: "La fecha de vencimiento no es válida o está vencida. Use el formato MM/AA.",
        variant: "destructive",
      })
      return
    }

    // Validar CVV
    if (!validateCVV(formData.cvv)) {
      toast({
        title: "Error de validación",
        description: "El CVV debe tener 3 o 4 dígitos.",
        variant: "destructive",
      })
      return
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error de validación",
        description: "El correo electrónico no es válido.",
        variant: "destructive",
      })
      return
    }

    // Generate reservation number
    const reservationNumber = `VU${Date.now().toString().slice(-8)}`

    const milesEarned = Math.floor(totalPrice * 10)

    // Store purchase data
    const purchaseData = {
      reservationNumber,
      customerInfo: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.country}`,
      },
      items,
      totalPrice,
      purchaseDate: new Date().toISOString(),
    }

    addPurchase({
      id: reservationNumber,
      reservationNumber,
      items,
      totalPrice,
      purchaseDate: new Date().toISOString(),
      status: "completed",
      milesEarned,
    })

    localStorage.setItem("lastPurchase", JSON.stringify(purchaseData))
    clearCart()
    router.push(`/confirmacion?reservation=${reservationNumber}`)
  }

  if (items.length === 0) {
    router.push("/carrito")
    return null
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  {/* Customer Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Información Personal
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nombre</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Apellido</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Teléfono
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Address Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Dirección
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="city">Ciudad</Label>
                          <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">País</Label>
                          <Input
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Information */}
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
                          onChange={(e) => {
                            // Formatear número de tarjeta con espacios cada 4 dígitos
                            const value = e.target.value.replace(/\s/g, "").replace(/\D/g, "")
                            const formatted = value.match(/.{1,4}/g)?.join(" ") || value
                            setFormData({ ...formData, cardNumber: formatted.slice(0, 19) })
                          }}
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
                            onChange={(e) => {
                              // Formatear fecha MM/AA
                              let value = e.target.value.replace(/\D/g, "")
                              if (value.length >= 2) {
                                value = value.slice(0, 2) + "/" + value.slice(2, 4)
                              }
                              setFormData({ ...formData, expiryDate: value.slice(0, 5) })
                            }}
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

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-20">
                    <CardHeader>
                      <CardTitle>Resumen del Pedido</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {items.map((item) => {
                          const convertedPrice = convertPrice(item.price)
                          return (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-muted-foreground truncate pr-2">{item.title}</span>
                              <span className="font-semibold whitespace-nowrap">
                                {convertedPrice.symbol}
                                {convertedPrice.value.toLocaleString()}
                              </span>
                            </div>
                          )
                        })}
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
      </main>
    </>
  )
}
