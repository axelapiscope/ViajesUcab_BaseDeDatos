"use client"

import Image from "next/image"
import { useState } from "react"
import { MapPin, Star, Utensils, Wine, Coffee } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const restaurants = [
  {
    id: 1,
    name: "Le Bernardin",
    city: "Nueva York",
    country: "Estados Unidos",
    location: "Midtown Manhattan",
    cuisine: "Francesa - Mariscos",
    atmosphere: "Elegante y sofisticado con servicio impecable",
    rating: 4.9,
    reviews: 3250,
    priceRange: "$$$$",
    specialties: ["Atún crudo", "Langosta", "Caviar"],
    image: "/restaurant-fine-dining.svg",
    description:
      "Restaurante de tres estrellas Michelin especializado en mariscos frescos con técnicas francesas contemporáneas. Una experiencia culinaria inolvidable en el corazón de Manhattan.",
    hours: "Lun-Sáb: 12:00 PM - 10:30 PM, Dom: Cerrado",
    phone: "+1 (212) 554-1515",
    website: "https://le-bernardin.com",
    bestDishes: [
      {
        name: "Atún Yellowfin Crudo",
        description: "Atún fresco con salsa de soja y aceite de sésamo",
        price: "$48",
      },
      {
        name: "Langosta Pochada",
        description: "Langosta en mantequilla con trufa negra",
        price: "$85",
      },
      {
        name: "Salmón Salvaje",
        description: "Salmón a la parrilla con vegetales de temporada",
        price: "$62",
      },
    ],
    customerReviews: [
      {
        author: "María González",
        rating: 5,
        comment: "Una experiencia gastronómica excepcional. Cada plato es una obra de arte y el servicio es impecable.",
        date: "15 Dic 2024",
      },
      {
        author: "John Smith",
        rating: 5,
        comment: "El mejor restaurante de mariscos que he visitado. Vale cada centavo.",
        date: "10 Dic 2024",
      },
    ],
    photos: ["photo1", "photo2", "photo3", "photo4", "photo5", "photo6"],
  },
  {
    id: 2,
    name: "Sukiyabashi Jiro",
    city: "Tokio",
    country: "Japón",
    location: "Ginza",
    cuisine: "Japonesa - Sushi",
    atmosphere: "Íntimo y tradicional, experiencia auténtica japonesa",
    rating: 5.0,
    reviews: 2890,
    priceRange: "$$$$",
    specialties: ["Omakase", "Nigiri premium", "Sushi tradicional"],
    image: "/restaurant-sushi.svg",
    description:
      "Legendario restaurante de sushi con tres estrellas Michelin, dirigido por el maestro Jiro Ono. Una experiencia única de omakase con los mejores pescados del mercado de Tsukiji.",
    hours: "Lun-Vie: 11:30 AM - 2:00 PM, 5:30 PM - 8:30 PM, Sáb-Dom: Cerrado",
    phone: "+81 3-3535-3600",
    website: "https://sukiyabashijiro.jp",
    bestDishes: [
      {
        name: "Omakase Completo",
        description: "20 piezas de sushi seleccionadas por el chef",
        price: "¥40,000",
      },
      {
        name: "Toro Premium",
        description: "Atún de vientre graso de la más alta calidad",
        price: "Incluido",
      },
      {
        name: "Uni Fresco",
        description: "Erizo de mar del día",
        price: "Incluido",
      },
    ],
    customerReviews: [
      {
        author: "Carlos Mendoza",
        rating: 5,
        comment: "Una experiencia que cambia tu perspectiva sobre el sushi. Perfección absoluta.",
        date: "20 Dic 2024",
      },
      {
        author: "Yuki Tanaka",
        rating: 5,
        comment: "El mejor sushi del mundo. La dedicación del maestro Jiro es inspiradora.",
        date: "18 Dic 2024",
      },
    ],
    photos: ["photo1", "photo2", "photo3", "photo4", "photo5", "photo6"],
  },
  {
    id: 3,
    name: "Osteria Francescana",
    city: "Módena",
    country: "Italia",
    location: "Centro Histórico",
    cuisine: "Italiana Contemporánea",
    atmosphere: "Moderno y artístico con toques tradicionales",
    rating: 4.9,
    reviews: 2150,
    priceRange: "$$$$",
    specialties: ["Pasta artesanal", "Risotto", "Postres innovadores"],
    image: "/restaurant-italian.svg",
    description:
      "Tres estrellas Michelin y nombrado mejor restaurante del mundo. El chef Massimo Bottura reinventa la cocina italiana tradicional con técnicas vanguardistas.",
    hours: "Mar-Sáb: 12:30 PM - 2:30 PM, 7:30 PM - 11:00 PM, Dom-Lun: Cerrado",
    phone: "+39 059 210118",
    website: "https://osteriafrancescana.it",
    bestDishes: [
      {
        name: "Cinco Edades de Parmigiano Reggiano",
        description: "Parmesano en cinco texturas y temperaturas diferentes",
        price: "€45",
      },
      {
        name: "Tortellini Caminando",
        description: "Tortellini en caldo de parmesano",
        price: "€55",
      },
      {
        name: "Oops! Dejé Caer el Limón",
        description: "Postre de limón deconstructo",
        price: "€35",
      },
    ],
    customerReviews: [
      {
        author: "Isabella Rossi",
        rating: 5,
        comment: "Arte en cada plato. Massimo Bottura es un genio culinario.",
        date: "22 Dic 2024",
      },
      {
        author: "Pierre Dubois",
        rating: 5,
        comment: "Una experiencia transformadora. La creatividad no tiene límites aquí.",
        date: "19 Dic 2024",
      },
    ],
    photos: ["photo1", "photo2", "photo3", "photo4", "photo5", "photo6"],
  },
  {
    id: 4,
    name: "El Celler de Can Roca",
    city: "Girona",
    country: "España",
    location: "Taialà",
    cuisine: "Española Vanguardista",
    atmosphere: "Elegante y acogedor, ambiente familiar",
    rating: 4.9,
    reviews: 2680,
    priceRange: "$$$$",
    specialties: ["Cocina molecular", "Vinos catalanes", "Postres creativos"],
    image: "/restaurant-spanish.svg",
    description:
      "Tres estrellas Michelin dirigido por los hermanos Roca. Combina tradición catalana con innovación culinaria de vanguardia y una bodega excepcional.",
    hours: "Mar-Sáb: 1:00 PM - 3:30 PM, 8:30 PM - 11:00 PM, Dom-Lun: Cerrado",
    phone: "+34 972 22 21 57",
    website: "https://cellercanroca.com",
    bestDishes: [
      {
        name: "Carabinero del Mediterráneo",
        description: "Gamba roja con su jugo y coral",
        price: "€68",
      },
      {
        name: "Cordero Ibérico",
        description: "Cordero con hierbas aromáticas y especias",
        price: "€75",
      },
      {
        name: "Mundo",
        description: "Postre inspirado en los cinco continentes",
        price: "€42",
      },
    ],
    customerReviews: [
      {
        author: "Ana Martínez",
        rating: 5,
        comment: "Cada plato cuenta una historia. Una experiencia sensorial completa.",
        date: "21 Dic 2024",
      },
      {
        author: "Michael Brown",
        rating: 5,
        comment: "La combinación perfecta de tradición e innovación. Simplemente espectacular.",
        date: "17 Dic 2024",
      },
    ],
    photos: ["photo1", "photo2", "photo3", "photo4", "photo5", "photo6"],
  },
  {
    id: 5,
    name: "Noma",
    city: "Copenhague",
    country: "Dinamarca",
    location: "Christianshavn",
    cuisine: "Nórdica Nueva",
    atmosphere: "Rústico-moderno con vistas al canal",
    rating: 4.8,
    reviews: 1950,
    priceRange: "$$$$",
    specialties: ["Ingredientes nórdicos", "Fermentación", "Forrajeo"],
    image: "/restaurant-nordic.svg",
    description:
      "Pionero de la Nueva Cocina Nórdica con tres estrellas Michelin. El chef René Redzepi utiliza ingredientes locales y técnicas de fermentación para crear platos únicos.",
    hours: "Mié-Sáb: 6:00 PM - 12:00 AM, Dom-Mar: Cerrado",
    phone: "+45 32 96 32 97",
    website: "https://noma.dk",
    bestDishes: [
      {
        name: "Langostinos Vivos",
        description: "Langostinos con aceite de rosas y hierbas",
        price: "DKK 450",
      },
      {
        name: "Venado Ahumado",
        description: "Venado con bayas y hongos silvestres",
        price: "DKK 520",
      },
      {
        name: "Postre de Manzana",
        description: "Manzana fermentada con crema de avellana",
        price: "DKK 280",
      },
    ],
    customerReviews: [
      {
        author: "Lars Nielsen",
        rating: 5,
        comment: "René Redzepi es un visionario. Cada ingrediente tiene un propósito.",
        date: "23 Dic 2024",
      },
      {
        author: "Sophie Anderson",
        rating: 5,
        comment: "Una conexión profunda con la naturaleza nórdica a través de la comida.",
        date: "16 Dic 2024",
      },
    ],
    photos: ["photo1", "photo2", "photo3", "photo4", "photo5", "photo6"],
  },
  {
    id: 6,
    name: "Gaggan Anand",
    city: "Bangkok",
    country: "Tailandia",
    location: "Langsuan",
    cuisine: "India Progresiva",
    atmosphere: "Vibrante y divertido, experiencia interactiva",
    rating: 4.8,
    reviews: 2340,
    priceRange: "$$$$",
    specialties: ["Cocina molecular india", "Menú emoji", "Especias exóticas"],
    image: "/restaurant-indian.svg",
    description:
      "Restaurante innovador que fusiona cocina india con técnicas moleculares. El chef Gaggan Anand ofrece un menú único representado por emojis, creando una experiencia gastronómica lúdica.",
    hours: "Mar-Dom: 6:00 PM - 11:30 PM, Lun: Cerrado",
    phone: "+66 2 652 1700",
    website: "https://gaggananand.com",
    bestDishes: [
      {
        name: "Yogurt Explosivo",
        description: "Esfera de yogurt con especias indias",
        price: "฿380",
      },
      {
        name: "Curry Deconstructo",
        description: "Elementos de curry presentados por separado",
        price: "฿520",
      },
      {
        name: "Samosa Líquida",
        description: "Samosa en forma de espuma con chutney",
        price: "฿420",
      },
    ],
    customerReviews: [
      {
        author: "Priya Sharma",
        rating: 5,
        comment: "Gaggan transforma la cocina india en arte. Divertido y delicioso.",
        date: "24 Dic 2024",
      },
      {
        author: "David Lee",
        rating: 5,
        comment: "Una experiencia única que desafía todas las expectativas. Brillante.",
        date: "14 Dic 2024",
      },
    ],
    photos: ["photo1", "photo2", "photo3", "photo4", "photo5", "photo6"],
  },
]

interface RestaurantsSectionProps {
  onSelectRestaurant: (restaurant: (typeof restaurants)[0]) => void
}

export function RestaurantsSection({ onSelectRestaurant }: RestaurantsSectionProps) {
  const [selectedCity, setSelectedCity] = useState<string>("todos")

  const cities = ["todos", ...Array.from(new Set(restaurants.map((r) => r.city)))]

  const filteredRestaurants =
    selectedCity === "todos" ? restaurants : restaurants.filter((r) => r.city === selectedCity)

  const getCuisineIcon = (cuisine: string) => {
    if (cuisine.includes("Café")) return <Coffee className="h-4 w-4" />
    if (cuisine.includes("Mariscos")) return <Wine className="h-4 w-4" />
    return <Utensils className="h-4 w-4" />
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Restaurantes del Mundo</h2>
          <p className="text-lg text-muted-foreground">
            Descubre los mejores restaurantes en las principales ciudades del mundo
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {cities.map((city) => (
            <Button
              key={city}
              variant={selectedCity === city ? "default" : "outline"}
              onClick={() => setSelectedCity(city)}
              className="capitalize"
            >
              {city === "todos" ? "Todas las ciudades" : city}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-black/60 text-white backdrop-blur px-3 py-1">{restaurant.priceRange}</Badge>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                  {getCuisineIcon(restaurant.cuisine)}
                  <span className="text-sm font-medium">{restaurant.cuisine}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="font-bold text-xl mb-1">{restaurant.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>
                      {restaurant.city}, {restaurant.country}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{restaurant.rating}</span>
                    <span className="text-sm text-muted-foreground">({restaurant.reviews} reseñas)</span>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{restaurant.description}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full" onClick={() => onSelectRestaurant(restaurant)}>
                  Ver Detalle
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
