"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Heart, ShoppingCart, Plane, Hotel, MapPin, Calendar, Users, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCurrency } from "@/lib/currency-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useState } from "react"

const specialPackages = [
  {
    id: "quince-1",
    type: "quinceanera",
    title: "Tour de 15 Años Mágico",
    destination: "Orlando, Florida",
    duration: "7 días / 6 noches",
    groupSize: "Hasta 20 personas",
    price: 4500,
    originalPrice: 6000,
    discount: 25,
    description: "Celebra tus 15 años en el lugar más mágico del mundo con parques temáticos y experiencias únicas.",
    includes: [
      "Vuelos internacionales para la quinceañera y acompañantes",
      "6 noches en hotel 4 estrellas",
      "Entradas a 4 parques temáticos",
      "Sesión fotográfica profesional en el castillo",
      "Cena de gala en restaurante temático",
      "Coordinador de eventos bilingüe",
      "Transporte privado durante toda la estadía",
    ],
    highlights: ["Magic Kingdom", "Universal Studios", "Sesión de fotos profesional", "Cena de gala"],
    transportType: "vuelos",
    flightDetails: {
      airline: "American Airlines",
      departure: "Caracas (CCS)",
      arrival: "Orlando (MCO)",
      departureTime: "08:00 AM",
      arrivalTime: "2:30 PM",
      duration: "4h 30m",
      class: "Economy",
    },
    hotelDetails: {
      name: "Disney's Grand Floridian Resort & Spa",
      rating: 5,
      address: "4401 Floridian Way, Orlando, FL 32830",
      amenities: ["Piscina", "Spa", "Restaurante", "WiFi gratuito", "Transporte a parques"],
      roomType: "Habitación Deluxe con vista al lago",
    },
    activities: [
      {
        day: 1,
        title: "Llegada y Check-in",
        description: "Recepción en el aeropuerto, traslado al hotel y bienvenida especial",
        time: "Todo el día",
      },
      {
        day: 2,
        title: "Magic Kingdom",
        description: "Día completo en el parque más icónico con sesión fotográfica en el castillo",
        time: "9:00 AM - 10:00 PM",
      },
      {
        day: 3,
        title: "Universal Studios",
        description: "Explora el mundo del cine y disfruta de atracciones emocionantes",
        time: "9:00 AM - 8:00 PM",
      },
      {
        day: 4,
        title: "EPCOT",
        description: "Viaje por el mundo en un solo día, gastronomía internacional",
        time: "10:00 AM - 9:00 PM",
      },
      {
        day: 5,
        title: "Hollywood Studios",
        description: "Aventuras de Star Wars y shows en vivo",
        time: "9:00 AM - 8:00 PM",
      },
      {
        day: 6,
        title: "Cena de Gala",
        description: "Cena especial de celebración en restaurante temático con decoración personalizada",
        time: "7:00 PM - 11:00 PM",
      },
      {
        day: 7,
        title: "Regreso",
        description: "Check-out y traslado al aeropuerto",
        time: "Mañana",
      },
    ],
    images: [
      "/disney-castle-magic-kingdom.jpg",
      "/universal-studios-orlando.jpg",
      "/luxury-hotel-room-orlando.jpg",
      "/quincea-era-celebration-dinner.jpg",
    ],
    reviews: [
      {
        name: "María González",
        rating: 5,
        comment: "¡Experiencia inolvidable! Todo estuvo perfectamente organizado.",
        date: "Marzo 2024",
      },
      {
        name: "Carmen Rodríguez",
        rating: 5,
        comment: "Mi hija quedó encantada. El mejor regalo de 15 años.",
        date: "Febrero 2024",
      },
    ],
  },
  {
    id: "quince-2",
    type: "quinceanera",
    title: "Tour de 15 Años Caribeño",
    destination: "Cancún y Riviera Maya",
    duration: "5 días / 4 noches",
    groupSize: "Hasta 15 personas",
    price: 3200,
    originalPrice: 4500,
    discount: 29,
    description: "Celebración inolvidable en las playas más hermosas del Caribe con actividades exclusivas.",
    includes: [
      "Vuelos internacionales",
      "4 noches en resort todo incluido",
      "Sesión fotográfica en playa y cenote",
      "Excursión a Chichén Itzá",
      "Fiesta privada en la playa",
      "Spa day para la quinceañera",
      "Coordinador de eventos",
    ],
    highlights: ["Playa privada", "Cenotes", "Ruinas mayas", "Fiesta en la playa"],
    transportType: "vuelos",
    flightDetails: {
      airline: "Avianca",
      departure: "Caracas (CCS)",
      arrival: "Cancún (CUN)",
      departureTime: "10:00 AM",
      arrivalTime: "1:45 PM",
      duration: "3h 45m",
      class: "Economy",
    },
    hotelDetails: {
      name: "Grand Palladium Costa Mujeres Resort & Spa",
      rating: 5,
      address: "Carretera Punta Sam Km 5.2, Cancún, México",
      amenities: ["Todo incluido", "Playa privada", "Spa", "5 Restaurantes", "WiFi gratuito"],
      roomType: "Suite Junior con vista al mar",
    },
    activities: [
      {
        day: 1,
        title: "Llegada y Bienvenida",
        description: "Traslado al resort, check-in y cóctel de bienvenida en la playa",
        time: "Todo el día",
      },
      {
        day: 2,
        title: "Sesión Fotográfica",
        description: "Sesión profesional en playa al amanecer y cenote sagrado",
        time: "6:00 AM - 2:00 PM",
      },
      {
        day: 3,
        title: "Excursión Chichén Itzá",
        description: "Tour guiado por las ruinas mayas más famosas del mundo",
        time: "7:00 AM - 6:00 PM",
      },
      {
        day: 4,
        title: "Spa Day y Fiesta en la Playa",
        description: "Día de spa para la quinceañera y fiesta privada al atardecer",
        time: "10:00 AM - 11:00 PM",
      },
      {
        day: 5,
        title: "Regreso",
        description: "Desayuno y traslado al aeropuerto",
        time: "Mañana",
      },
    ],
    images: [
      "/cancun-beach-resort.png",
      "/cenote-mexico.jpg",
      "/chichen-itza-pyramid.jpg",
      "/beach-party-celebration.jpg",
    ],
    reviews: [
      {
        name: "Ana Martínez",
        rating: 5,
        comment: "Las fotos quedaron espectaculares. Todo fue perfecto.",
        date: "Abril 2024",
      },
      {
        name: "Laura Pérez",
        rating: 5,
        comment: "El resort es increíble y la atención fue excelente.",
        date: "Marzo 2024",
      },
    ],
  },
  {
    id: "quince-3",
    type: "quinceanera",
    title: "Tour de 15 Años Europeo",
    destination: "París y Londres",
    duration: "10 días / 9 noches",
    groupSize: "Hasta 12 personas",
    price: 6800,
    originalPrice: 9000,
    discount: 24,
    description: "Vive la experiencia europea de tus sueños visitando las ciudades más románticas del mundo.",
    includes: [
      "Vuelos internacionales",
      "9 noches en hoteles boutique",
      "Sesión fotográfica en Torre Eiffel y Big Ben",
      "Tours guiados en ambas ciudades",
      "Cena en crucero por el Sena",
      "Entradas a museos principales",
      "Tren Eurostar París-Londres",
      "Coordinador bilingüe",
    ],
    highlights: ["Torre Eiffel", "Louvre", "Big Ben", "Crucero por el Sena"],
    transportType: "vuelos",
    flightDetails: {
      airline: "Air France",
      departure: "Caracas (CCS)",
      arrival: "París (CDG)",
      departureTime: "11:00 PM",
      arrivalTime: "2:30 PM +1",
      duration: "9h 30m",
      class: "Economy",
    },
    hotelDetails: {
      name: "Hotel Le Marais (París) / The Savoy (Londres)",
      rating: 5,
      address: "Varios",
      amenities: ["WiFi gratuito", "Desayuno incluido", "Concierge", "Ubicación céntrica"],
      roomType: "Habitación Superior",
    },
    activities: [
      {
        day: 1,
        title: "Llegada a París",
        description: "Traslado al hotel y tour nocturno por la ciudad iluminada",
        time: "Todo el día",
      },
      {
        day: 2,
        title: "Torre Eiffel y Louvre",
        description: "Sesión fotográfica en Torre Eiffel y visita al museo Louvre",
        time: "9:00 AM - 6:00 PM",
      },
      {
        day: 3,
        title: "Versalles",
        description: "Excursión al Palacio de Versalles y sus jardines",
        time: "9:00 AM - 5:00 PM",
      },
      {
        day: 4,
        title: "Montmartre y Crucero",
        description: "Tour por Montmartre y cena en crucero por el Sena",
        time: "10:00 AM - 11:00 PM",
      },
      {
        day: 5,
        title: "Compras en Champs-Élysées",
        description: "Día libre para compras y exploración",
        time: "Todo el día",
      },
      {
        day: 6,
        title: "Eurostar a Londres",
        description: "Viaje en tren de alta velocidad y llegada a Londres",
        time: "Todo el día",
      },
      {
        day: 7,
        title: "Big Ben y Palacio de Buckingham",
        description: "Tour por los íconos de Londres con sesión fotográfica",
        time: "9:00 AM - 6:00 PM",
      },
      {
        day: 8,
        title: "British Museum y Tower Bridge",
        description: "Visita a museos y monumentos históricos",
        time: "10:00 AM - 7:00 PM",
      },
      {
        day: 9,
        title: "Compras y Musical",
        description: "Oxford Street y show de West End",
        time: "Todo el día",
      },
      {
        day: 10,
        title: "Regreso",
        description: "Traslado al aeropuerto",
        time: "Mañana",
      },
    ],
    images: [
      "/eiffel-tower-paris.png",
      "/big-ben-london.jpg",
      "/louvre-museum.png",
      "/seine-river-cruise.png",
    ],
    reviews: [
      {
        name: "Sofía Ramírez",
        rating: 5,
        comment: "Un sueño hecho realidad. Europa es mágica.",
        date: "Mayo 2024",
      },
      {
        name: "Isabella Torres",
        rating: 5,
        comment: "La mejor experiencia de mi vida. Todo estuvo increíble.",
        date: "Abril 2024",
      },
    ],
  },
  {
    id: "honeymoon-1",
    type: "honeymoon",
    title: "Luna de Miel en Maldivas",
    destination: "Maldivas",
    duration: "8 días / 7 noches",
    groupSize: "2 personas",
    price: 8500,
    originalPrice: 12000,
    discount: 29,
    description: "Paraíso tropical con villas sobre el agua, playas de arena blanca y experiencias románticas únicas.",
    includes: [
      "Vuelos internacionales en clase business",
      "7 noches en villa sobre el agua",
      "Pensión completa con bebidas premium",
      "Cena romántica privada en la playa",
      "Spa de parejas",
      "Excursión de snorkel",
      "Traslados en hidroavión",
      "Decoración especial de luna de miel",
    ],
    highlights: ["Villa sobre el agua", "Cena privada", "Spa de parejas", "Snorkel"],
    transportType: "vuelos",
    flightDetails: {
      airline: "Emirates",
      departure: "Caracas (CCS)",
      arrival: "Malé (MLE)",
      departureTime: "9:00 PM",
      arrivalTime: "11:30 PM +1",
      duration: "18h 30m (1 escala)",
      class: "Business",
    },
    hotelDetails: {
      name: "Conrad Maldives Rangali Island",
      rating: 5,
      address: "Rangali Island, Maldivas",
      amenities: ["Villa sobre el agua", "Restaurante submarino", "Spa", "Deportes acuáticos", "WiFi"],
      roomType: "Water Villa con piscina privada",
    },
    activities: [
      {
        day: 1,
        title: "Llegada en Hidroavión",
        description: "Traslado espectacular en hidroavión y bienvenida con champagne",
        time: "Todo el día",
      },
      {
        day: 2,
        title: "Día de Relax",
        description: "Disfruta de tu villa privada y la playa",
        time: "Libre",
      },
      {
        day: 3,
        title: "Excursión de Snorkel",
        description: "Explora los arrecifes de coral y vida marina",
        time: "9:00 AM - 1:00 PM",
      },
      {
        day: 4,
        title: "Spa de Parejas",
        description: "Tratamiento completo de spa con masajes y rituales",
        time: "2:00 PM - 5:00 PM",
      },
      {
        day: 5,
        title: "Cena Romántica Privada",
        description: "Cena exclusiva en la playa bajo las estrellas",
        time: "7:00 PM - 10:00 PM",
      },
      {
        day: 6,
        title: "Deportes Acuáticos",
        description: "Kayak, paddle board y actividades acuáticas",
        time: "Todo el día",
      },
      {
        day: 7,
        title: "Restaurante Submarino",
        description: "Experiencia gastronómica única bajo el mar",
        time: "7:00 PM - 10:00 PM",
      },
      {
        day: 8,
        title: "Regreso",
        description: "Traslado al aeropuerto en hidroavión",
        time: "Mañana",
      },
    ],
    images: [
      "/maldives-water-villa.jpg",
      "/maldives-beach-dinner.jpg",
      "/maldives-underwater-restaurant.jpg",
      "/maldives-snorkeling.jpg",
    ],
    reviews: [
      {
        name: "Carlos y Andrea",
        rating: 5,
        comment: "Perfecta luna de miel. El paraíso existe.",
        date: "Junio 2024",
      },
      {
        name: "Miguel y Valentina",
        rating: 5,
        comment: "Inolvidable. Cada detalle fue perfecto.",
        date: "Mayo 2024",
      },
    ],
  },
  {
    id: "honeymoon-2",
    type: "honeymoon",
    title: "Luna de Miel en Santorini",
    destination: "Santorini, Grecia",
    duration: "7 días / 6 noches",
    groupSize: "2 personas",
    price: 5200,
    originalPrice: 7500,
    discount: 31,
    description: "Romance mediterráneo con vistas espectaculares, atardeceres inolvidables y gastronomía excepcional.",
    includes: [
      "Vuelos internacionales",
      "6 noches en hotel boutique con vista al mar",
      "Desayuno y cena incluidos",
      "Tour privado por la isla",
      "Crucero al atardecer",
      "Sesión fotográfica profesional",
      "Cena romántica con vista a la caldera",
      "Masaje de parejas",
    ],
    highlights: ["Atardeceres en Oia", "Crucero privado", "Gastronomía griega", "Vistas a la caldera"],
    transportType: "cruceros",
    flightDetails: {
      airline: "Aegean Airlines",
      departure: "Caracas (CCS)",
      arrival: "Santorini (JTR)",
      departureTime: "8:00 AM",
      arrivalTime: "6:30 PM",
      duration: "14h 30m (1 escala)",
      class: "Economy",
    },
    hotelDetails: {
      name: "Canaves Oia Suites",
      rating: 5,
      address: "Oia, Santorini, Grecia",
      amenities: ["Piscina infinita", "Vista a la caldera", "Spa", "Restaurante gourmet", "WiFi"],
      roomType: "Suite con piscina privada y vista al volcán",
    },
    activities: [
      {
        day: 1,
        title: "Llegada a Santorini",
        description: "Traslado al hotel y atardecer en Oia",
        time: "Todo el día",
      },
      {
        day: 2,
        title: "Tour por la Isla",
        description: "Visita a pueblos tradicionales y playas volcánicas",
        time: "9:00 AM - 5:00 PM",
      },
      {
        day: 3,
        title: "Crucero al Atardecer",
        description: "Navegación por la caldera con cena a bordo",
        time: "4:00 PM - 9:00 PM",
      },
      {
        day: 4,
        title: "Sesión Fotográfica",
        description: "Fotos profesionales en los lugares más icónicos",
        time: "10:00 AM - 2:00 PM",
      },
      {
        day: 5,
        title: "Spa y Relax",
        description: "Masaje de parejas y día de spa",
        time: "2:00 PM - 6:00 PM",
      },
      {
        day: 6,
        title: "Cena Romántica",
        description: "Cena gourmet con vista a la caldera",
        time: "7:00 PM - 11:00 PM",
      },
      {
        day: 7,
        title: "Regreso",
        description: "Último desayuno y traslado al aeropuerto",
        time: "Mañana",
      },
    ],
    images: [
      "/santorini-oia-sunset.jpg",
      "/santorini-caldera-view.png",
      "/santorini-infinity-pool.jpg",
      "/santorini-cruise.jpg",
    ],
    reviews: [
      {
        name: "Roberto y Daniela",
        rating: 5,
        comment: "Los atardeceres son reales. Mágico.",
        date: "Julio 2024",
      },
      {
        name: "Fernando y Lucía",
        rating: 5,
        comment: "Romántico y hermoso. Altamente recomendado.",
        date: "Junio 2024",
      },
    ],
  },
  {
    id: "honeymoon-3",
    type: "honeymoon",
    title: "Luna de Miel en Bali",
    destination: "Bali, Indonesia",
    duration: "10 días / 9 noches",
    groupSize: "2 personas",
    price: 6200,
    originalPrice: 8800,
    discount: 30,
    description: "Isla de los dioses con templos místicos, arrozales en terrazas y playas paradisíacas.",
    includes: [
      "Vuelos internacionales",
      "9 noches en resorts de lujo (3 ubicaciones diferentes)",
      "Desayuno diario",
      "Tour por templos y arrozales",
      "Clase de cocina balinesa",
      "Spa tradicional balinés",
      "Cena romántica en acantilado",
      "Conductor privado durante toda la estadía",
    ],
    highlights: ["Templos sagrados", "Arrozales de Tegallalang", "Playas de Uluwatu", "Spa balinés"],
    transportType: "vuelos",
    flightDetails: {
      airline: "Singapore Airlines",
      departure: "Caracas (CCS)",
      arrival: "Denpasar (DPS)",
      departureTime: "10:00 PM",
      arrivalTime: "5:30 PM +2",
      duration: "25h 30m (2 escalas)",
      class: "Economy",
    },
    hotelDetails: {
      name: "Ubud: Hanging Gardens / Seminyak: The Legian / Uluwatu: Bulgari Resort",
      rating: 5,
      address: "Varios",
      amenities: ["Piscinas infinitas", "Spa", "Restaurantes", "Vistas espectaculares", "WiFi"],
      roomType: "Villas privadas con piscina",
    },
    activities: [
      {
        day: 1,
        title: "Llegada a Ubud",
        description: "Traslado a Ubud y bienvenida tradicional balinesa",
        time: "Todo el día",
      },
      {
        day: 2,
        title: "Templos y Arrozales",
        description: "Tour por templos sagrados y arrozales en terrazas",
        time: "8:00 AM - 5:00 PM",
      },
      {
        day: 3,
        title: "Clase de Cocina",
        description: "Aprende a cocinar platos tradicionales balineses",
        time: "9:00 AM - 2:00 PM",
      },
      {
        day: 4,
        title: "Traslado a Seminyak",
        description: "Cambio de ubicación y tarde en la playa",
        time: "Todo el día",
      },
      {
        day: 5,
        title: "Día de Playa",
        description: "Relax en las mejores playas de Seminyak",
        time: "Libre",
      },
      {
        day: 6,
        title: "Spa Balinés",
        description: "Tratamiento completo de spa tradicional",
        time: "2:00 PM - 6:00 PM",
      },
      {
        day: 7,
        title: "Traslado a Uluwatu",
        description: "Última ubicación con vistas al acantilado",
        time: "Todo el día",
      },
      {
        day: 8,
        title: "Templo Uluwatu",
        description: "Visita al templo y danza Kecak al atardecer",
        time: "4:00 PM - 8:00 PM",
      },
      {
        day: 9,
        title: "Cena en Acantilado",
        description: "Cena romántica con vista al océano",
        time: "7:00 PM - 10:00 PM",
      },
      {
        day: 10,
        title: "Regreso",
        description: "Traslado al aeropuerto",
        time: "Mañana",
      },
    ],
    images: [
      "/balinese-temple.png",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    reviews: [
      {
        name: "Andrés y Carolina",
        rating: 5,
        comment: "Cultura, naturaleza y romance. Perfecto.",
        date: "Agosto 2024",
      },
      {
        name: "Diego y Mariana",
        rating: 5,
        comment: "Bali es mágico. Experiencia única.",
        date: "Julio 2024",
      },
    ],
  },
]

export default function PackageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { convertPrice } = useCurrency()
  const { addToWishlist, isInWishlist } = useWishlist()
  const [selectedImage, setSelectedImage] = useState(0)

  const packageData = specialPackages.find((pkg) => pkg.id === params.id)

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Paquete no encontrado</h1>
          <Button onClick={() => router.push("/")}>Volver al inicio</Button>
        </div>
      </div>
    )
  }

  const convertedPrice = convertPrice(packageData.price)
  const convertedOriginal = convertPrice(packageData.originalPrice)
  const inWishlist = isInWishlist(packageData.id)

  const handleAddToWishlist = () => {
    addToWishlist({
      id: packageData.id,
      name: packageData.title,
      type: "package",
      price: packageData.price,
      image: packageData.images[0],
      destination: packageData.destination,
    })
  }

  const handleBuy = () => {
    router.push(`/reserva/${packageData.id}`)
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header with Back Button */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => router.push("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={packageData.images[selectedImage] || "/placeholder.svg"}
                alt={packageData.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {packageData.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Vista ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Package Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">-{packageData.discount}% Descuento</Badge>
              <h1 className="text-3xl font-bold mb-2">{packageData.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{packageData.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{packageData.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{packageData.groupSize}</span>
                </div>
              </div>
              <p className="text-muted-foreground">{packageData.description}</p>
            </div>

            <Separator />

            <div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">
                  {convertedPrice.symbol}
                  {convertedPrice.value.toLocaleString()}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  {convertedOriginal.symbol}
                  {convertedOriginal.value.toLocaleString()}
                </span>
              </div>

              <div className="flex gap-3">
                <Button size="lg" className="flex-1 gap-2" onClick={handleBuy}>
                  <ShoppingCart className="h-5 w-5" />
                  COMPRAR
                </Button>
                <Button
                  size="lg"
                  variant={inWishlist ? "default" : "outline"}
                  onClick={handleAddToWishlist}
                  className="gap-2"
                >
                  <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
                  {inWishlist ? "En Wishlist" : "Wishlist"}
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">El paquete incluye:</h3>
                <ul className="space-y-2">
                  {packageData.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Flight Details */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-950/20 flex items-center justify-center">
                <Plane className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">Detalles del Vuelo</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Aerolínea</p>
                  <p className="font-semibold">{packageData.flightDetails.airline}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Salida</p>
                  <p className="font-semibold">{packageData.flightDetails.departure}</p>
                  <p className="text-sm">{packageData.flightDetails.departureTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Llegada</p>
                  <p className="font-semibold">{packageData.flightDetails.arrival}</p>
                  <p className="text-sm">{packageData.flightDetails.arrivalTime}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Duración</p>
                  <p className="font-semibold">{packageData.flightDetails.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Clase</p>
                  <p className="font-semibold">{packageData.flightDetails.class}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hotel Details */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-950/20 flex items-center justify-center">
                <Hotel className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold">Detalles del Hotel</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">{packageData.hotelDetails.name}</h3>
                  <div className="flex">
                    {Array.from({ length: packageData.hotelDetails.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{packageData.hotelDetails.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Tipo de habitación:</p>
                <p className="text-sm">{packageData.hotelDetails.roomType}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Amenidades:</p>
                <div className="flex flex-wrap gap-2">
                  {packageData.hotelDetails.amenities.map((amenity, idx) => (
                    <Badge key={idx} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activities Itinerary */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-950/20 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">Itinerario de Actividades</h2>
            </div>
            <div className="space-y-4">
              {packageData.activities.map((activity, idx) => (
                <div key={idx} className="flex gap-4 pb-4 border-b last:border-0">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">Día {activity.day}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{activity.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6">Reseñas de Clientes</h2>
            <div className="space-y-4">
              {packageData.reviews.map((review, idx) => (
                <div key={idx} className="pb-4 border-b last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{review.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
