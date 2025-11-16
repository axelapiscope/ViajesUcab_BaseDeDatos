import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, Users } from "lucide-react"

export default function OfertaPage({ params }: { params: { id: string } }) {
  // Mock offer data - in real app, fetch based on params.id
  const offer = {
    id: params.id,
    image: "/luxury-resort.jpg",
    title: "Resort Todo Incluido - Cancún",
    location: "Cancún, México",
    rating: 4.8,
    reviews: 1250,
    originalPrice: 2500,
    discountPrice: 1499,
    discount: 40,
    description:
      "Disfruta de unas vacaciones inolvidables en este resort todo incluido frente al mar Caribe. Incluye todas las comidas, bebidas, actividades acuáticas y entretenimiento nocturno.",
    amenities: ["WiFi gratis", "Piscina", "Spa", "Restaurantes", "Bar en la playa", "Gimnasio"],
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <img
              src={offer.image || "/placeholder.svg"}
              alt={offer.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <Badge className="mb-4 bg-destructive text-destructive-foreground">
                    -{offer.discount}% DESCUENTO
                  </Badge>
                  <h1 className="text-4xl font-bold mb-4">{offer.title}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{offer.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{offer.rating}</span>
                      <span>({offer.reviews} reseñas)</span>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed">{offer.description}</p>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Servicios incluidos</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {offer.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Precio por persona</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg text-muted-foreground line-through">${offer.originalPrice}</span>
                        <span className="text-3xl font-bold text-primary">${offer.discountPrice}</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Fechas flexibles</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Hasta 4 huéspedes</span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      Reservar ahora
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Contactar agente
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
