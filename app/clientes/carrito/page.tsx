"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { useCurrency } from "@/lib/currency-context"
import { Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CarritoPage() {
  const { items, removeFromCart, clearCart, totalPrice } = useCart()
  const { convertPrice } = useCurrency()
  const router = useRouter()

  const convertedTotal = convertPrice(totalPrice)

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center py-16">
              <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
              <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
              <p className="text-muted-foreground mb-8">
                Agrega ofertas a tu carrito para comenzar a planificar tu viaje
              </p>
              <Link href="/">
                <Button size="lg">Explorar ofertas</Button>
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Mi Carrito ({items.length})</h1>
              <Button variant="outline" onClick={clearCart}>
                Vaciar carrito
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => {
                  const convertedPrice = convertPrice(item.price)
                  return (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-32 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{item.location}</p>
                            <p className="text-xl font-bold text-primary">
                              {convertedPrice.symbol}
                              {convertedPrice.value.toLocaleString()}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Resumen</h2>
                    <div className="space-y-3 mb-6">
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
                      <div className="border-t pt-3 flex justify-between">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-lg text-primary">
                          {convertedTotal.symbol}
                          {convertedTotal.value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full" size="lg" onClick={handleCheckout}>
                      Proceder al pago
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
