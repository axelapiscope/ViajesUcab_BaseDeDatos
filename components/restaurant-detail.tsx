"use client"

import { ArrowLeft, Heart, MapPin, Star, Clock, DollarSign, Users, Phone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useWishlist } from "@/lib/wishlist-context"
import { useToast } from "@/hooks/use-toast"

interface Restaurant {
  id: number
  name: string
  city: string
  country: string
  location: string
  cuisine: string
  atmosphere: string
  rating: number
  reviews: number
  priceRange: string
  specialties: string[]
  image: string
  description: string
  hours: string
  phone: string
  website: string
  bestDishes: Array<{
    name: string
    description: string
    price: string
  }>
  customerReviews: Array<{
    author: string
    rating: number
    comment: string
    date: string
  }>
  photos: string[]
}

interface RestaurantDetailProps {
  restaurant: Restaurant
  onBack: () => void
}

export function RestaurantDetail({ restaurant, onBack }: RestaurantDetailProps) {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()
  const inWishlist = isInWishlist(restaurant.id)

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(restaurant.id)
    } else {
      addToWishlist({
        id: restaurant.id,
        title: restaurant.name,
        location: `${restaurant.city}, ${restaurant.country}`,
        price: 0,
        image: restaurant.image,
        type: "tour",
        addedAt: new Date().toISOString(),
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver a restaurantes
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">{restaurant.name}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {restaurant.location}, {restaurant.city}, {restaurant.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg">{restaurant.rating}</span>
                      <span className="text-muted-foreground">({restaurant.reviews} reseñas)</span>
                    </div>
                    <Badge variant="secondary" className="text-base px-3 py-1">
                      {restaurant.priceRange}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant={inWishlist ? "default" : "outline"}
                  size="lg"
                  onClick={handleWishlistToggle}
                  className="gap-2"
                >
                  <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
                  {inWishlist ? "En Wishlist" : "Agregar a Wishlist"}
                </Button>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">{restaurant.description}</p>
            </div>

            {/* Photos Gallery */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Galería de Fotos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {restaurant.photos.map((photo, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-lg overflow-hidden relative"
                    >
                      <img
                        src={photo}
                        alt={`${restaurant.name} - Foto ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.jpg"
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Best Dishes */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Mejores Platos</h2>
                <div className="space-y-4">
                  {restaurant.bestDishes.map((dish, idx) => (
                    <div key={idx}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{dish.name}</h3>
                          <p className="text-sm text-muted-foreground">{dish.description}</p>
                        </div>
                        <span className="font-semibold text-lg whitespace-nowrap ml-4">{dish.price}</span>
                      </div>
                      {idx < restaurant.bestDishes.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Reviews */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Reseñas de Clientes</h2>
                <div className="space-y-6">
                  {restaurant.customerReviews.map((review, idx) => (
                    <div key={idx}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{review.author}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                      {idx < restaurant.customerReviews.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-xl mb-4">Información</h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Horario</p>
                      <p className="text-sm text-muted-foreground">{restaurant.hours}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Rango de Precios</p>
                      <p className="text-sm text-muted-foreground">{restaurant.priceRange}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Tipo de Cocina</p>
                      <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-sm text-muted-foreground">{restaurant.phone}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Sitio Web</p>
                      <a
                        href={restaurant.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Visitar sitio
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4">Especialidades</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">Ambiente</h3>
                <p className="text-muted-foreground">{restaurant.atmosphere}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
