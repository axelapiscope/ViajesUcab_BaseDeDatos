"use client"

import { useState } from "react"
import { Star, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCurrency } from "@/lib/currency-context"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

export function FeaturedOffers() {
  const { toast } = useToast()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(0)
  const { convertPrice } = useCurrency()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const itemsPerPage = 3

  const offers = [
    {
      id: 1,
      title: "Resort Todo Incluido - Cancún",
      location: "Cancún, México",
      rating: 4.8,
      reviews: 1250,
      originalPrice: 2500,
      discountPrice: 1499,
      discount: 40,
      type: "hotel" as const,
      description: "Resort de lujo todo incluido con acceso directo a la playa y todas las comodidades.",
      includedServices: [
        "Todo incluido (comidas y bebidas)",
        "Acceso a playa privada",
        "Piscinas infinity",
        "Spa y gimnasio",
        "Actividades acuáticas",
        "Entretenimiento nocturno",
      ],
    },
    {
      id: 2,
      title: "Crucero por el Caribe",
      location: "Miami - Bahamas - Jamaica",
      rating: 4.6,
      reviews: 890,
      originalPrice: 3200,
      discountPrice: 2100,
      discount: 34,
      type: "cruise" as const,
      description: "Crucero de lujo por el Caribe visitando los destinos más paradisíacos.",
      includedServices: [
        "Camarote con balcón privado",
        "Todas las comidas incluidas",
        "Entretenimiento en vivo",
        "Acceso a casino y spa",
        "Excursiones en puertos",
      ],
    },
    {
      id: 3,
      title: "Hotel 5 Estrellas - Punta Cana",
      location: "Punta Cana, República Dominicana",
      rating: 4.9,
      reviews: 2100,
      originalPrice: 1800,
      discountPrice: 1080,
      discount: 40,
      type: "hotel" as const,
      description: "Hotel de lujo frente al mar con servicio excepcional.",
      includedServices: [
        "Desayuno buffet",
        "WiFi de alta velocidad",
        "Piscina con vista al mar",
        "Servicio de habitaciones 24/7",
        "Acceso al spa",
      ],
    },
    {
      id: 4,
      title: "Hotel Boutique - Cartagena",
      location: "Cartagena, Colombia",
      rating: 4.7,
      reviews: 650,
      originalPrice: 1200,
      discountPrice: 780,
      discount: 35,
      type: "hotel" as const,
      description: "Hotel boutique en el corazón del centro histórico de Cartagena.",
      includedServices: [
        "Desayuno continental",
        "WiFi gratuito",
        "Terraza con vista a la ciudad",
        "Concierge personalizado",
      ],
    },
    {
      id: 5,
      title: "Tour Completo - Buenos Aires",
      location: "Buenos Aires, Argentina",
      rating: 4.8,
      reviews: 980,
      originalPrice: 900,
      discountPrice: 540,
      discount: 40,
      type: "tour" as const,
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
      title: "Hotel Frente al Mar - Miami",
      location: "Miami Beach, Estados Unidos",
      rating: 4.5,
      reviews: 1450,
      originalPrice: 2800,
      discountPrice: 1890,
      discount: 32,
      type: "hotel" as const,
      description: "Hotel de lujo frente al mar en el corazón de Miami Beach.",
      includedServices: [
        "Vista al océano",
        "Desayuno incluido",
        "Acceso a playa privada",
        "Piscina infinity",
        "Gimnasio 24/7",
      ],
    },
  ]

  const totalPages = Math.ceil(offers.length / itemsPerPage)
  const visibleOffers = offers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const toggleFavorite = (offer: (typeof offers)[0]) => {
    if (isInWishlist(offer.id)) {
      removeFromWishlist(offer.id)
    } else {
      addToWishlist({
        id: offer.id,
        title: offer.title,
        location: offer.location,
        price: offer.discountPrice,
        image: "",
        type: offer.type,
        addedAt: new Date().toISOString(),
        originalPrice: offer.originalPrice,
      })
    }
  }

  const handleAddToCart = (offer: (typeof offers)[0]) => {
    addToCart({
      id: offer.id,
      title: offer.title,
      location: offer.location,
      price: offer.discountPrice,
      image: "",
      type: offer.type,
    })
  }

  const handleViewOffer = (offer: (typeof offers)[0]) => {
    router.push(`/servicio/${offer.id}`)
  }

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Ofertas Destacadas</h2>
          <p className="text-lg text-muted-foreground">Los mejores destinos al mejor precio</p>
        </div>

        <div className="relative">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleOffers.map((offer) => {
              const convertedOriginal = convertPrice(offer.originalPrice)
              const convertedDiscount = convertPrice(offer.discountPrice)

              return (
                <Card
                  key={offer.id}
                  className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                  onClick={() => handleViewOffer(offer)}
                >
                  <div className="relative group">
                    <div className="h-48 w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <span className="text-4xl font-bold text-primary/30">{offer.type.toUpperCase()}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(offer)
                      }}
                      className="absolute top-3 left-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all hover:scale-110"
                    >
                      <Heart
                        className={cn(
                          "h-5 w-5 transition-all",
                          isInWishlist(offer.id) ? "fill-red-500 text-red-500" : "text-foreground",
                        )}
                      />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">{offer.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{offer.location}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-sm">{offer.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({offer.reviews} reseñas)</span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Desde</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-muted-foreground line-through">
                          {convertedOriginal.symbol}
                          {convertedOriginal.value.toLocaleString()}
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          {convertedDiscount.symbol}
                          {convertedDiscount.value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewOffer(offer)
                      }}
                    >
                      Ver detalle
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {totalPages > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden lg:flex bg-background shadow-lg hover:scale-110 transition-transform"
                onClick={prevPage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden lg:flex bg-background shadow-lg hover:scale-110 transition-transform"
                onClick={nextPage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button variant="outline" size="icon" onClick={prevPage} className="lg:hidden bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    currentPage === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30",
                  )}
                  aria-label={`Ir a página ${index + 1}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={nextPage} className="lg:hidden bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
