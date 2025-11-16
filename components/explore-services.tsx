"use client"

import { useState } from "react"
import { Plane, Ship, Building2, Package, Star, Heart, MapPin, Map, Car, Train } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCurrency } from "@/lib/currency-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

type ServiceType = "todos" | "vuelos" | "cruceros" | "hoteles" | "paquetes" | "traslados" | "trenes"

const serviceFilters = [
  { id: "todos" as ServiceType, label: "Todos", icon: Package },
  { id: "vuelos" as ServiceType, label: "Vuelos", icon: Plane },
  { id: "cruceros" as ServiceType, label: "Cruceros", icon: Ship },
  { id: "traslados" as ServiceType, label: "Traslados", icon: Car },
  { id: "hoteles" as ServiceType, label: "Hoteles", icon: Building2 },
  { id: "trenes" as ServiceType, label: "Trenes", icon: Train },
  { id: "paquetes" as ServiceType, label: "Paquetes", icon: Package },
]

const exploreOptions = [
  {
    id: 1,
    type: "vuelos" as ServiceType,
    title: "Vuelo Directo a Miami",
    location: "Caracas - Miami",
    rating: 4.7,
    reviews: 342,
    price: 450,
    originalPrice: 650,
    discount: 31,
    duration: "3h 45min",
    description: "Vuelo directo sin escalas con aerolínea premium. Disfruta de comodidad y puntualidad en tu viaje.",
    includedServices: [
      "Asiento reclinable con espacio extra",
      "Entretenimiento a bordo",
      "1 maleta facturada incluida",
      "Snacks y bebidas incluidas",
    ],
    flightDetails: {
      outbound: {
        duration: "3h 45min",
        date: "2025-01-15",
        gate: "A12",
        departure: "08:00 AM - Aeropuerto Internacional Simón Bolívar",
        arrival: "11:45 AM - Miami International Airport",
      },
      return: {
        duration: "3h 50min",
        date: "2025-01-22",
        gate: "D5",
        departure: "01:00 PM - Miami International Airport",
        arrival: "04:50 PM - Aeropuerto Internacional Simón Bolívar",
      },
      baggage: {
        carry: "1 pieza de 10kg",
        checked: "1 pieza de 23kg",
      },
      meals: {
        included: true,
        type: "Snacks y bebidas incluidos en todos los vuelos",
      },
    },
  },
  {
    id: 2,
    type: "vuelos" as ServiceType,
    title: "Vuelo a Ciudad de México",
    location: "Caracas - CDMX",
    rating: 4.5,
    reviews: 289,
    price: 520,
    originalPrice: 780,
    discount: 33,
    duration: "4h 20min",
    description: "Vuelo directo a la Ciudad de México con todas las comodidades.",
    includedServices: ["Entretenimiento a bordo", "Snacks incluidos", "1 maleta facturada"],
    flightDetails: {
      outbound: {
        duration: "4h 20min",
        date: "2025-01-18",
        gate: "B7",
        departure: "09:30 AM - Aeropuerto Internacional Simón Bolívar",
        arrival: "01:50 PM - Aeropuerto Internacional de la Ciudad de México",
      },
      return: {
        duration: "4h 25min",
        date: "2025-01-25",
        gate: "C12",
        departure: "03:00 PM - Aeropuerto Internacional de la Ciudad de México",
        arrival: "07:25 PM - Aeropuerto Internacional Simón Bolívar",
      },
      baggage: {
        carry: "1 pieza de 10kg",
        checked: "1 pieza de 23kg",
      },
      meals: {
        included: true,
        type: "Snacks y bebidas incluidos",
      },
    },
  },
  {
    id: 3,
    type: "cruceros" as ServiceType,
    title: "Crucero por el Caribe",
    location: "Miami - Bahamas - Jamaica",
    rating: 4.8,
    reviews: 1250,
    price: 2100,
    originalPrice: 3200,
    discount: 34,
    duration: "7 días",
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
    id: 4,
    type: "cruceros" as ServiceType,
    title: "Crucero Mediterráneo",
    location: "Barcelona - Roma - Atenas",
    rating: 4.9,
    reviews: 890,
    price: 2800,
    originalPrice: 4000,
    discount: 30,
    duration: "10 días",
    description: "Descubre las maravillas del Mediterráneo en este crucero inolvidable.",
    includedServices: [
      "Suite con vista al mar",
      "Pensión completa",
      "Tours guiados en cada puerto",
      "Spa y gimnasio",
      "Shows nocturnos",
    ],
  },
  {
    id: 5,
    type: "hoteles" as ServiceType,
    title: "Resort Todo Incluido",
    location: "Cancún, México",
    rating: 4.8,
    reviews: 2100,
    price: 1499,
    originalPrice: 2500,
    discount: 40,
    duration: "5 noches",
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
    id: 6,
    type: "hoteles" as ServiceType,
    title: "Hotel 5 Estrellas",
    location: "Punta Cana, República Dominicana",
    rating: 4.9,
    reviews: 1680,
    price: 1080,
    originalPrice: 1800,
    discount: 40,
    duration: "4 noches",
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
    id: 7,
    type: "hoteles" as ServiceType,
    title: "Hotel Boutique Colonial",
    location: "Cartagena, Colombia",
    rating: 4.7,
    reviews: 650,
    price: 780,
    originalPrice: 1200,
    discount: 35,
    duration: "3 noches",
    description: "Hotel boutique en el corazón del centro histórico de Cartagena.",
    includedServices: [
      "Desayuno continental",
      "WiFi gratuito",
      "Terraza con vista a la ciudad",
      "Concierge personalizado",
    ],
  },
  {
    id: 8,
    type: "paquetes" as ServiceType,
    title: "Paquete Completo Miami",
    location: "Vuelo + Hotel + Tours",
    rating: 4.6,
    reviews: 980,
    price: 1890,
    originalPrice: 2800,
    discount: 32,
    duration: "6 días",
    description: "Paquete completo para disfrutar de Miami con vuelo, hotel y tours incluidos.",
    package: {
      transfers: ["Vuelo directo ida y vuelta", "Traslados aeropuerto-hotel"],
      accommodation: {
        type: "Hotel 4 estrellas frente al mar",
        nights: 5,
        location: "South Beach, Miami",
      },
      meals: ["Desayuno buffet incluido", "1 cena de bienvenida"],
      activities: ["Tour por Miami Beach", "Visita a Wynwood Walls", "Paseo en barco por Biscayne Bay"],
    },
    includedServices: [
      "Vuelo directo ida y vuelta",
      "5 noches en hotel 4 estrellas",
      "Desayuno diario",
      "Traslados aeropuerto-hotel",
      "3 tours guiados",
    ],
  },
  {
    id: 9,
    type: "paquetes" as ServiceType,
    title: "Paquete Europa Clásica",
    location: "París + Roma + Madrid",
    rating: 4.9,
    reviews: 1450,
    price: 3500,
    originalPrice: 5000,
    discount: 30,
    duration: "12 días",
    description: "Recorre las capitales más emblemáticas de Europa en este paquete completo.",
    package: {
      transfers: ["Vuelos internacionales", "Trenes de alta velocidad entre ciudades", "Traslados terrestres"],
      accommodation: {
        type: "Hoteles 4 estrellas céntricos",
        nights: 11,
        location: "Centro histórico de cada ciudad",
      },
      meals: ["Desayuno diario", "3 cenas típicas incluidas"],
      activities: [
        "Tour Eiffel y Louvre en París",
        "Coliseo y Vaticano en Roma",
        "Museo del Prado en Madrid",
        "Paseo por Montmartre",
        "Visita a Fontana di Trevi",
      ],
    },
    includedServices: [
      "Vuelos internacionales",
      "11 noches en hoteles 4 estrellas",
      "Desayuno diario",
      "Trenes entre ciudades",
      "Tours guiados en cada ciudad",
    ],
  },
  {
    id: 10,
    type: "paquetes" as ServiceType,
    title: "Paquete Caribe Total",
    location: "Cancún + Punta Cana",
    rating: 4.7,
    reviews: 820,
    price: 2400,
    originalPrice: 3600,
    discount: 33,
    duration: "10 días",
    description: "Disfruta de lo mejor del Caribe visitando dos destinos paradisíacos.",
    package: {
      transfers: ["Vuelos internacionales", "Vuelo Cancún-Punta Cana", "Traslados aeropuerto-resort"],
      accommodation: {
        type: "Resorts Todo Incluido 5 estrellas",
        nights: 9,
        location: "Zona hotelera de Cancún y Bávaro",
      },
      meals: ["Todo incluido: desayuno, almuerzo, cena", "Bebidas ilimitadas", "Snacks 24/7"],
      activities: [
        "Excursión a Chichén Itzá",
        "Snorkel en arrecifes",
        "Paseo en catamarán",
        "Visita a Isla Saona",
        "Deportes acuáticos",
      ],
    },
    includedServices: [
      "Vuelos internacionales",
      "9 noches todo incluido",
      "Traslados incluidos",
      "5 excursiones",
      "Deportes acuáticos",
    ],
  },
  {
    id: 11,
    type: "traslados" as ServiceType,
    title: "Traslado Caracas - Mérida",
    location: "Caracas - Mérida",
    rating: 4.6,
    reviews: 234,
    price: 85,
    originalPrice: 120,
    discount: 29,
    duration: "8 horas",
    description:
      "Traslado terrestre cómodo y seguro desde Caracas hasta Mérida con vehículo moderno y conductor profesional.",
    includedServices: [
      "Vehículo con aire acondicionado",
      "Conductor profesional",
      "Seguro de viaje incluido",
      "Paradas para descanso",
      "Agua embotellada",
    ],
    transferDetails: {
      vehicleType: "Van de lujo con capacidad para 7 pasajeros",
      departure: "Caracas - Punto de encuentro: Hotel Eurobuilding",
      arrival: "Mérida - Destino: Centro de la ciudad",
      departureTime: "06:00 AM",
      arrivalTime: "02:00 PM",
      stops: ["Parada en La Victoria (desayuno)", "Parada en Barinas (almuerzo)"],
    },
  },
  {
    id: 12,
    type: "traslados" as ServiceType,
    title: "Traslado Las Vegas - Los Angeles",
    location: "Las Vegas - Los Angeles",
    rating: 4.8,
    reviews: 567,
    price: 120,
    originalPrice: 180,
    discount: 33,
    duration: "5 horas",
    description: "Traslado privado desde Las Vegas hasta Los Angeles con vehículo de lujo y todas las comodidades.",
    includedServices: ["SUV de lujo", "Conductor bilingüe", "WiFi a bordo", "Bebidas y snacks", "Seguro completo"],
    transferDetails: {
      vehicleType: "SUV de lujo con capacidad para 6 pasajeros",
      departure: "Las Vegas - Recogida en hotel del Strip",
      arrival: "Los Angeles - Destino: LAX o hotel en LA",
      departureTime: "Flexible según preferencia",
      arrivalTime: "5 horas después de la salida",
      stops: ["Parada opcional en outlets de Barstow"],
    },
  },
  {
    id: 13,
    type: "traslados" as ServiceType,
    title: "Traslado Maracaibo - Maracay",
    location: "Maracaibo - Maracay",
    rating: 4.5,
    reviews: 189,
    price: 95,
    originalPrice: 140,
    discount: 32,
    duration: "7 horas",
    description: "Servicio de traslado terrestre entre Maracaibo y Maracay con vehículos modernos y seguros.",
    includedServices: [
      "Vehículo climatizado",
      "Conductor experimentado",
      "Seguro de pasajeros",
      "Paradas programadas",
      "Asistencia en ruta",
    ],
    transferDetails: {
      vehicleType: "Minivan con capacidad para 8 pasajeros",
      departure: "Maracaibo - Terminal de transporte",
      arrival: "Maracay - Centro de la ciudad",
      departureTime: "07:00 AM",
      arrivalTime: "02:00 PM",
      stops: ["Parada en Valencia (almuerzo)"],
    },
  },
  {
    id: 14,
    type: "traslados" as ServiceType,
    title: "Traslado Miami - Orlando",
    location: "Miami - Orlando",
    rating: 4.7,
    reviews: 892,
    price: 95,
    originalPrice: 150,
    discount: 37,
    duration: "4 horas",
    description: "Traslado directo desde Miami hasta Orlando con servicio premium y conductor profesional.",
    includedServices: ["Vehículo de lujo", "Conductor profesional", "WiFi gratis", "Agua y snacks", "Seguro incluido"],
    transferDetails: {
      vehicleType: "Sedan de lujo o SUV según disponibilidad",
      departure: "Miami - Aeropuerto MIA o hotel",
      arrival: "Orlando - Hoteles de Disney/Universal o MCO",
      departureTime: "Flexible según vuelo o preferencia",
      arrivalTime: "4 horas después de la salida",
      stops: ["Sin paradas (directo) o parada opcional en rest area"],
    },
  },
  {
    id: 15,
    type: "trenes" as ServiceType,
    title: "Tren Caracas - Valencia",
    location: "Caracas - Valencia",
    rating: 4.8,
    reviews: 456,
    price: 35,
    originalPrice: 50,
    discount: 30,
    duration: "3 horas",
    description: "Viaje en tren moderno y cómodo desde Caracas hasta Valencia con todas las comodidades.",
    includedServices: [
      "Asiento reclinable",
      "Aire acondicionado",
      "WiFi gratuito",
      "Snacks incluidos",
      "Enchufes en cada asiento",
    ],
    trainDetails: {
      trainType: "Tren de alta velocidad",
      class: "Clase Turista",
      departureStation: "Estación Central de Caracas",
      arrivalStation: "Estación Valencia Norte",
      departureTime: "08:00 AM",
      arrivalTime: "11:00 AM",
      gate: "Andén 3",
      baggage: {
        carry: "1 pieza de 10kg",
        checked: "1 pieza de 25kg",
      },
      meals: {
        included: true,
        type: "Snacks y bebidas incluidos durante el viaje",
      },
      foodAllowed: {
        allowed: true,
        restrictions: "Se permite consumo de alimentos y bebidas",
      },
    },
  },
  {
    id: 16,
    type: "trenes" as ServiceType,
    title: "Tren Madrid - Barcelona",
    location: "Madrid - Barcelona",
    rating: 4.9,
    reviews: 2340,
    price: 85,
    originalPrice: 120,
    discount: 29,
    duration: "2h 45min",
    description: "Viaje en tren AVE de alta velocidad entre las dos ciudades más importantes de España.",
    includedServices: [
      "Asiento Premium reclinable",
      "WiFi de alta velocidad",
      "Comida a bordo",
      "Entretenimiento digital",
      "Servicio de cafetería",
    ],
    trainDetails: {
      trainType: "AVE (Alta Velocidad Española)",
      class: "Clase Preferente",
      departureStation: "Madrid Puerta de Atocha",
      arrivalStation: "Barcelona Sants",
      departureTime: "09:30 AM",
      arrivalTime: "12:15 PM",
      gate: "Vía 7",
      baggage: {
        carry: "2 piezas de equipaje de mano",
        checked: "2 maletas de 23kg cada una",
      },
      meals: {
        included: true,
        type: "Comida completa y bebidas incluidas en Clase Preferente",
      },
      foodAllowed: {
        allowed: true,
        restrictions: "Se permite consumo de alimentos y bebidas",
      },
    },
  },
  {
    id: 17,
    type: "trenes" as ServiceType,
    title: "Tren París - Londres",
    location: "París - Londres",
    rating: 4.9,
    reviews: 3890,
    price: 145,
    originalPrice: 210,
    discount: 31,
    duration: "2h 15min",
    description: "Viaje en Eurostar a través del Canal de la Mancha, conectando dos capitales europeas.",
    includedServices: [
      "Asiento Standard Premier",
      "Comida ligera incluida",
      "WiFi gratuito",
      "Enchufes en cada asiento",
      "Acceso a sala VIP",
    ],
    trainDetails: {
      trainType: "Eurostar",
      class: "Standard Premier",
      departureStation: "Paris Gare du Nord",
      arrivalStation: "London St Pancras International",
      departureTime: "10:00 AM",
      arrivalTime: "12:15 PM (hora local)",
      gate: "Quai 5",
      baggage: {
        carry: "2 piezas de equipaje de mano",
        checked: "2 maletas de 23kg cada una",
      },
      meals: {
        included: true,
        type: "Comida ligera y bebidas incluidas en Standard Premier",
      },
      foodAllowed: {
        allowed: true,
        restrictions: "Se permite consumo de alimentos y bebidas",
      },
    },
  },
]

export function ExploreServices() {
  const [selectedFilter, setSelectedFilter] = useState<ServiceType>("todos")
  const [expandedPackage, setExpandedPackage] = useState<number | null>(null)
  const { convertPrice } = useCurrency()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const router = useRouter()

  const filteredOptions =
    selectedFilter === "todos" ? exploreOptions : exploreOptions.filter((option) => option.type === selectedFilter)

  const toggleFavorite = (option: (typeof exploreOptions)[0]) => {
    if (isInWishlist(option.id)) {
      removeFromWishlist(option.id)
    } else {
      addToWishlist({
        id: option.id,
        title: option.title,
        location: option.location,
        price: option.price,
        image: "",
        type: option.type === "paquetes" ? "tour" : (option.type as "hotel" | "cruise" | "tour"),
        addedAt: new Date().toISOString(),
        originalPrice: option.originalPrice,
      })
    }
  }

  const handleViewDetail = (option: (typeof exploreOptions)[0]) => {
    router.push(`/servicio/${option.id}`)
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Explora Nuestros Servicios</h2>
          <p className="text-lg text-muted-foreground">Descubre las mejores opciones para tu próximo viaje</p>
          <div className="mt-6">
            <Link href="/itinerario">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Map className="h-5 w-5" />
                Crear Tu Propio Itinerario
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {serviceFilters.map((filter) => {
            const Icon = filter.icon
            return (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedFilter(filter.id)}
                className={cn("transition-all duration-300", selectedFilter === filter.id && "shadow-lg scale-105")}
              >
                <Icon className="h-4 w-4 mr-2" />
                {filter.label}
              </Button>
            )
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredOptions.map((option) => {
            const convertedOriginal = convertPrice(option.originalPrice)
            const convertedPrice = convertPrice(option.price)
            const isExpanded = expandedPackage === option.id

            return (
              <Card
                key={option.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group"
                onClick={() => handleViewDetail(option)}
              >
                <div className="relative">
                  <div className="h-48 w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <span className="text-4xl font-bold text-primary/30">{option.type.toUpperCase()}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(option)
                    }}
                    className="absolute top-3 left-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all hover:scale-110"
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5 transition-all",
                        isInWishlist(option.id) ? "fill-red-500 text-red-500" : "text-foreground",
                      )}
                    />
                  </button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">{option.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{option.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">{option.rating}</span>
                      <span className="text-xs text-muted-foreground">({option.reviews})</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{option.duration}</span>
                  </div>

                  {option.type === "paquetes" && option.package && isExpanded && (
                    <div className="mt-4 space-y-3 border-t pt-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <option.package.transfers.icon className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Traslados:</span>
                        </div>
                        <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                          {option.package.transfers.map((transfer, idx) => (
                            <li key={idx}>• {transfer}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <option.package.accommodation.icon className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Hospedaje:</span>
                        </div>
                        <div className="text-xs text-muted-foreground ml-6 space-y-1">
                          <p>• {option.package.accommodation.type}</p>
                          <p>• {option.package.accommodation.nights} noches</p>
                          <p>• {option.package.accommodation.location}</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <option.package.meals.icon className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Comidas:</span>
                        </div>
                        <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                          {option.package.meals.map((meal, idx) => (
                            <li key={idx}>• {meal}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <option.package.activities.icon className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Actividades:</span>
                        </div>
                        <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                          {option.package.activities.map((activity, idx) => (
                            <li key={idx}>• {activity}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {option.type === "traslados" && option.transferDetails && isExpanded && (
                    <div className="mt-4 space-y-3 border-t pt-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <option.transferDetails.vehicleType.icon className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Tipo de Vehículo:</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{option.transferDetails.vehicleType}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <option.transferDetails.departure.icon className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Salida:</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{option.transferDetails.departure}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <option.transferDetails.arrival.icon className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Llegada:</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{option.transferDetails.arrival}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <option.transferDetails.departureTime.icon className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Hora de Salida:</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{option.transferDetails.departureTime}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <option.transferDetails.arrivalTime.icon className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Hora de Llegada:</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{option.transferDetails.arrivalTime}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <option.transferDetails.stops.icon className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Paradas:</span>
                        </div>
                        <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                          {option.transferDetails.stops.map((stop, idx) => (
                            <li key={idx}>• {stop}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {option.type === "trenes" && option.trainDetails && isExpanded && (
                    <div className="mt-4 space-y-3 border-t pt-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Train className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Tipo de Tren:</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{option.trainDetails.trainType}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Clase:</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{option.trainDetails.class}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Estación de Salida:</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{option.trainDetails.departureStation}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Estación de Llegada:</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{option.trainDetails.arrivalStation}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Hora de Salida:</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{option.trainDetails.departureTime}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Hora de Llegada:</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{option.trainDetails.arrivalTime}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Andén:</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{option.trainDetails.gate}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Equipaje:</span>
                        </div>
                        <div className="text-xs text-muted-foreground ml-6 space-y-1">
                          <p>• {option.trainDetails.baggage.carry}</p>
                          <p>• {option.trainDetails.baggage.checked}</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Comidas:</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{option.trainDetails.meals.type}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Alimentos Permitidos:</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">
                          {option.trainDetails.foodAllowed.restrictions}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-1">Desde</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-muted-foreground line-through">
                        {convertedOriginal.symbol}
                        {convertedOriginal.value.toLocaleString()}
                      </span>
                      <span className="text-xl font-bold text-primary">
                        {convertedPrice.symbol}
                        {convertedPrice.value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewDetail(option)
                    }}
                  >
                    Ver detalle
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {filteredOptions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No hay opciones disponibles para este filtro</p>
          </div>
        )}
      </div>
    </section>
  )
}
