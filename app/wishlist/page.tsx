"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useWishlist } from "@/lib/wishlist-context"
import { useCurrency } from "@/lib/currency-context"
import { Heart, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist()
  const { convertPrice } = useCurrency()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold mb-4">Tu wishlist está vacía</h1>
            <p className="text-muted-foreground mb-8">
              Guarda tus servicios favoritos y podrás acceder a ellos fácilmente
            </p>
            <Link href="/">
              <Button size="lg">Explorar servicios</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mi Wishlist ({items.length})</h1>
            <p className="text-muted-foreground">Tus servicios guardados para consultar más tarde</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const convertedPrice = convertPrice(item.price)

              return (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    {item.image && item.image !== "/placeholder.svg" ? (
                      <div
                        className="h-48 w-full relative overflow-hidden cursor-pointer"
                        onClick={() => router.push(`/servicio/${item.id}`)}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="h-48 w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center cursor-pointer"
                        onClick={() => router.push(`/servicio/${item.id}`)}
                      >
                        <span className="text-4xl font-bold text-primary/30">{item.type.toUpperCase()}</span>
                      </div>
                    )}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 left-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.location}</p>
                    <div className="flex items-baseline gap-2">
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {convertPrice(item.originalPrice).symbol}
                          {convertPrice(item.originalPrice).value.toLocaleString()}
                        </span>
                      )}
                      <span className="text-xl font-bold text-primary">
                        {convertedPrice.symbol}
                        {convertedPrice.value.toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full" onClick={() => router.push(`/servicio/${item.id}`)}>
                      Ver detalle
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
