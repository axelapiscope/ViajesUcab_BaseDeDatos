"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Calendar,
  Plane,
  Ship,
  Building2,
  Package,
  Heart,
  Car,
  Coffee,
  Fuel,
  Train,
  ArrowRight,
  Map,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCurrency } from "@/lib/currency-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useUser } from "@/lib/user-context"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const allServices = [
  {
    id: 1,
    type: "vuelos",
    title: "Vuelo Directo a Miami",
    location: "Caracas - Miami",
    image: "/airplane-in-flight.png",
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
        arrivalTime: "11:45 AM",
      },
      return: {
        duration: "3h 50min",
        date: "2025-01-22",
        gate: "D5",
        departure: "01:00 PM - Miami International Airport",
        arrival: "04:50 PM - Aeropuerto Internacional Simón Bolívar",
        arrivalTime: "04:50 PM",
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
    type: "vuelos",
    title: "Vuelo a Ciudad de México",
    location: "Caracas - CDMX",
    image: "/airplane-in-flight.png",
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
        arrivalTime: "01:50 PM",
      },
      return: {
        duration: "4h 25min",
        date: "2025-01-25",
        gate: "C12",
        departure: "03:00 PM - Aeropuerto Internacional de la Ciudad de México",
        arrival: "07:25 PM - Aeropuerto Internacional Simón Bolívar",
        arrivalTime: "07:25 PM",
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
    type: "cruceros",
    title: "Crucero por el Caribe",
    location: "Miami - Bahamas - Jamaica",
    image: "/cruise-ship-caribbean.jpg",
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
    cruiseDetails: {
      baggage: {
        perPassenger: "2 maletas de 23kg cada una",
        carryOn: "1 bolso de mano",
      },
      ports: [
        { name: "Miami, Florida", day: "Día 1", arrivalTime: "Embarque: 2:00 PM - 4:00 PM" },
        { name: "Nassau, Bahamas", day: "Día 2-3", arrivalTime: "Llegada: 8:00 AM" },
        { name: "Montego Bay, Jamaica", day: "Día 4-5", arrivalTime: "Llegada: 9:00 AM" },
        { name: "Regreso a Miami", day: "Día 7", arrivalTime: "Llegada: 7:00 AM" },
      ],
      arrivalDate: "2025-01-22",
      departureDate: "2025-01-15",
    },
  },
  {
    id: 4,
    type: "traslados",
    title: "Traslado Aeropuerto - Hotel",
    location: "Miami International Airport",
    image: "/luxury-hotel-room-orlando.jpg",
    rating: 4.9,
    reviews: 856,
    price: 45,
    originalPrice: 65,
    discount: 31,
    duration: "30-45 min",
    description: "Servicio de traslado privado desde el aeropuerto hasta tu hotel con conductor profesional.",
    includedServices: [
      "Vehículo privado con aire acondicionado",
      "Conductor profesional bilingüe",
      "Asistencia con equipaje",
      "Agua embotellada de cortesía",
      "Seguimiento de vuelo en tiempo real",
    ],
    transferDetails: {
      vehicleOptions: [
        { type: "carro", label: "Carro", capacity: "4 pasajeros", price: 45 },
        { type: "camioneta", label: "Camioneta", capacity: "6 pasajeros", price: 65 },
        { type: "minivan", label: "Minivan", capacity: "10 pasajeros", price: 95 },
        { type: "autobus", label: "Autobús", capacity: "25 pasajeros", price: 180 },
      ],
      vehicleBrands: {
        carro: ["Toyota Camry", "Honda Accord", "Chevrolet Malibu", "Nissan Altima"],
        camioneta: ["Toyota Highlander", "Honda Pilot", "Chevrolet Suburban", "Ford Explorer"],
        minivan: ["Mercedes Sprinter", "Ford Transit", "Chevrolet Express", "Ram ProMaster"],
        autobus: ["Mercedes-Benz", "Volvo", "Scania", "MAN"],
      },
      duration: "45 minutos aproximadamente",
      departureTime: "Flexible según horario de llegada del vuelo",
      arrivalTime: "Calculado según tráfico y destino",
      stops: {
        available: true,
        gasStation: true,
        bathroom: true,
        estimatedStops: "1-2 paradas según duración del trayecto",
        details: "Paradas disponibles para viajes de más de 2 horas",
      },
      foodAllowed: {
        allowed: true,
        restrictions: "Se permite consumo de alimentos y bebidas no alcohólicas",
        notes: "Por favor mantener el vehículo limpio",
      },
      pickupLocations: [
        "Miami International Airport (MIA)",
        "Fort Lauderdale Airport (FLL)",
        "Palm Beach Airport (PBI)",
      ],
      dropoffAreas: ["Miami Beach", "Downtown Miami", "Brickell", "Coral Gables", "Key Biscayne"],
      operatingHours: "24/7 - Servicio disponible todos los días",
      bookingNotice: "Se recomienda reservar con al menos 24 horas de anticipación",
      cancellationPolicy: "Cancelación gratuita hasta 24 horas antes del servicio",
    },
  },
  {
    id: 5,
    type: "hoteles",
    title: "Resort Todo Incluido",
    location: "Cancún, México",
    image: "/luxury-resort.jpg",
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
    hotelDetails: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      amenities: [
        "WiFi gratuito",
        "Estacionamiento incluido",
        "Servicio de habitaciones 24/7",
        "Concierge",
        "Centro de negocios",
      ],
    },
  },
  {
    id: 6,
    type: "hoteles",
    title: "Hotel 5 Estrellas",
    location: "Punta Cana, República Dominicana",
    image: "/luxury-hotel.jpg",
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
    hotelDetails: {
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      amenities: ["WiFi gratuito", "Estacionamiento", "Gimnasio", "Restaurante gourmet", "Bar en la piscina"],
    },
  },
  {
    id: 7,
    type: "hoteles",
    title: "Hotel Boutique Colonial",
    location: "Cartagena, Colombia",
    image: "/cartagena-colonial-hotel.jpg",
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
    hotelDetails: {
      checkIn: "2:00 PM",
      checkOut: "12:00 PM",
      amenities: ["WiFi gratuito", "Terraza panorámica", "Bar", "Biblioteca", "Tours guiados"],
    },
  },
  {
    id: 8,
    type: "paquetes",
    title: "Paquete Completo Miami",
    location: "Vuelo + Hotel + Tours",
    image: "/miami-beach-hotel.jpg",
    rating: 4.6,
    reviews: 980,
    price: 1890,
    originalPrice: 2800,
    discount: 32,
    duration: "6 días",
    description: "Paquete completo para disfrutar de Miami con vuelo, hotel y tours incluidos.",
    includedServices: [
      "Vuelo directo ida y vuelta",
      "5 noches en hotel 4 estrellas",
      "Desayuno diario",
      "Traslados aeropuerto-hotel",
      "3 tours guiados",
    ],
    packageDetails: {
      transfers: ["Vuelo directo ida y vuelta", "Traslados aeropuerto-hotel"],
      accommodation: {
        type: "Hotel 4 estrellas frente al mar",
        nights: 5,
        location: "South Beach, Miami",
      },
      meals: ["Desayuno buffet incluido", "1 cena de bienvenida"],
      activities: ["Tour por Miami Beach", "Visita a Wynwood Walls", "Paseo en barco por Biscayne Bay"],
    },
  },
  {
    id: 9,
    type: "paquetes",
    title: "Paquete Europa Clásica",
    location: "París + Roma + Madrid",
    image: "/eiffel-tower-paris.png",
    rating: 4.9,
    reviews: 1450,
    price: 3500,
    originalPrice: 5000,
    discount: 30,
    duration: "12 días",
    description: "Recorre las capitales más emblemáticas de Europa en este paquete completo.",
    includedServices: [
      "Vuelos internacionales",
      "11 noches en hoteles 4 estrellas",
      "Desayuno diario",
      "Trenes entre ciudades",
      "Tours guiados en cada ciudad",
    ],
    packageDetails: {
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
  },
  {
    id: 10,
    type: "paquetes",
    title: "Paquete Caribe Total",
    location: "Cancún + Punta Cana",
    image: "/cancun-beach-resort.png",
    rating: 4.7,
    reviews: 820,
    price: 2400,
    originalPrice: 3600,
    discount: 33,
    duration: "10 días",
    description: "Disfruta de lo mejor del Caribe visitando dos destinos paradisíacos.",
    includedServices: [
      "Vuelos internacionales",
      "9 noches todo incluido",
      "Traslados incluidos",
      "5 excursiones",
      "Deportes acuáticos",
    ],
    packageDetails: {
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
  },
  {
    id: 11,
    type: "traslados",
    title: "Traslado Caracas - Mérida",
    location: "Caracas - Mérida",
    image: "/city-tour.jpg",
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
      vehicleOptions: [
        { type: "carro", label: "Carro", capacity: "4 pasajeros", price: 85 },
        { type: "camioneta", label: "Camioneta", capacity: "6 pasajeros", price: 105 },
        { type: "minivan", label: "Minivan", capacity: "10 pasajeros", price: 145 },
        { type: "autobus", label: "Autobús", capacity: "25 pasajeros", price: 280 },
      ],
      vehicleBrands: {
        carro: ["Toyota Corolla", "Honda Civic", "Chevrolet Cruze", "Nissan Sentra"],
        camioneta: ["Toyota 4Runner", "Chevrolet Tahoe", "Ford Explorer", "Nissan Pathfinder"],
        minivan: ["Mercedes Sprinter", "Ford Transit", "Chevrolet Express", "Toyota Hiace"],
        autobus: ["Mercedes-Benz", "Volvo", "Scania", "Yutong"],
      },
      duration: "8 horas aproximadamente",
      departureTime: "06:00 AM",
      arrivalTime: "02:00 PM",
      stops: {
        available: true,
        gasStation: true,
        bathroom: true,
        estimatedStops: "2 paradas (desayuno y almuerzo)",
        details: "Paradas programadas en La Victoria y Barinas",
      },
      foodAllowed: {
        allowed: true,
        restrictions: "Se permite consumo de alimentos y bebidas no alcohólicas",
        notes: "Por favor mantener el vehículo limpio",
      },
      pickupLocations: ["Hotel Eurobuilding, Caracas", "Aeropuerto Internacional Simón Bolívar", "Centro de Caracas"],
      dropoffAreas: ["Centro de Mérida", "Zona hotelera", "Universidad de Los Andes"],
      operatingHours: "Salidas diarias a las 6:00 AM",
      bookingNotice: "Se recomienda reservar con al menos 48 horas de anticipación",
      cancellationPolicy: "Cancelación gratuita hasta 48 horas antes del servicio",
    },
  },
  {
    id: 12,
    type: "traslados",
    title: "Traslado Las Vegas - Los Angeles",
    location: "Las Vegas - Los Angeles",
    image: "/travel-itinerary.jpg",
    rating: 4.8,
    reviews: 567,
    price: 120,
    originalPrice: 180,
    discount: 33,
    duration: "5 horas",
    description: "Traslado privado desde Las Vegas hasta Los Angeles con vehículo de lujo y todas las comodidades.",
    includedServices: ["SUV de lujo", "Conductor bilingüe", "WiFi a bordo", "Bebidas y snacks", "Seguro completo"],
    transferDetails: {
      vehicleOptions: [
        { type: "carro", label: "Carro", capacity: "4 pasajeros", price: 120 },
        { type: "camioneta", label: "Camioneta SUV", capacity: "6 pasajeros", price: 150 },
        { type: "minivan", label: "Minivan", capacity: "10 pasajeros", price: 220 },
        { type: "autobus", label: "Autobús", capacity: "25 pasajeros", price: 450 },
      ],
      vehicleBrands: {
        carro: ["Tesla Model S", "BMW 5 Series", "Mercedes E-Class", "Audi A6"],
        camioneta: ["Cadillac Escalade", "Lincoln Navigator", "Mercedes GLS", "BMW X7"],
        minivan: ["Mercedes Sprinter Executive", "Ford Transit Luxury", "Ram ProMaster"],
        autobus: ["Mercedes-Benz Tourismo", "Volvo 9700", "Prevost H3-45"],
      },
      duration: "5 horas aproximadamente",
      departureTime: "Flexible según preferencia del cliente",
      arrivalTime: "5 horas después de la salida",
      stops: {
        available: true,
        gasStation: true,
        bathroom: true,
        estimatedStops: "1 parada opcional",
        details: "Parada opcional en Barstow Premium Outlets (30 minutos)",
      },
      foodAllowed: {
        allowed: true,
        restrictions: "Se permite consumo de alimentos y bebidas, incluyendo bebidas alcohólicas selladas",
        notes: "Vehículos de lujo con sistema de limpieza incluido",
      },
      pickupLocations: ["Hoteles del Strip de Las Vegas", "Aeropuerto Internacional McCarran", "Downtown Las Vegas"],
      dropoffAreas: ["Aeropuerto LAX", "Hoteles de Los Angeles", "Beverly Hills", "Santa Monica", "Hollywood"],
      operatingHours: "24/7 - Servicio disponible todos los días",
      bookingNotice: "Se recomienda reservar con al menos 24 horas de anticipación",
      cancellationPolicy: "Cancelación gratuita hasta 24 horas antes del servicio",
    },
  },
  {
    id: 13,
    type: "traslados",
    title: "Traslado Maracaibo - Maracay",
    location: "Maracaibo - Maracay",
    image: "/city-tour.jpg",
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
      vehicleOptions: [
        { type: "carro", label: "Carro", capacity: "4 pasajeros", price: 95 },
        { type: "camioneta", label: "Camioneta", capacity: "6 pasajeros", price: 115 },
        { type: "minivan", label: "Minivan", capacity: "8 pasajeros", price: 155 },
        { type: "autobus", label: "Autobús", capacity: "25 pasajeros", price: 320 },
      ],
      vehicleBrands: {
        carro: ["Toyota Corolla", "Chevrolet Cruze", "Nissan Sentra", "Hyundai Elantra"],
        camioneta: ["Toyota Fortuner", "Chevrolet Traverse", "Ford Explorer", "Mitsubishi Montero"],
        minivan: ["Toyota Hiace", "Hyundai H1", "Mercedes Sprinter", "Ford Transit"],
        autobus: ["Yutong", "King Long", "Mercedes-Benz", "Volvo"],
      },
      duration: "7 horas aproximadamente",
      departureTime: "07:00 AM",
      arrivalTime: "02:00 PM",
      stops: {
        available: true,
        gasStation: true,
        bathroom: true,
        estimatedStops: "1 parada principal",
        details: "Parada en Valencia para almuerzo (45 minutos)",
      },
      foodAllowed: {
        allowed: true,
        restrictions: "Se permite consumo de alimentos y bebidas no alcohólicas",
        notes: "Mantener el vehículo limpio y ordenado",
      },
      pickupLocations: ["Terminal de transporte de Maracaibo", "Hoteles en Maracaibo", "Aeropuerto La Chinita"],
      dropoffAreas: ["Centro de Maracay", "Zona industrial", "Hoteles de Maracay"],
      operatingHours: "Salidas diarias a las 7:00 AM",
      bookingNotice: "Reservar con al menos 48 horas de anticipación",
      cancellationPolicy: "Cancelación gratuita hasta 48 horas antes",
    },
  },
  {
    id: 14,
    type: "traslados",
    title: "Traslado Miami - Orlando",
    location: "Miami - Orlando",
    image: "/universal-studios-orlando.jpg",
    rating: 4.7,
    reviews: 892,
    price: 95,
    originalPrice: 150,
    discount: 37,
    duration: "4 horas",
    description: "Traslado directo desde Miami hasta Orlando con servicio premium y conductor profesional.",
    includedServices: ["Vehículo de lujo", "Conductor profesional", "WiFi gratis", "Agua y snacks", "Seguro incluido"],
    transferDetails: {
      vehicleOptions: [
        { type: "carro", label: "Sedan de lujo", capacity: "4 pasajeros", price: 95 },
        { type: "camioneta", label: "SUV Premium", capacity: "6 pasajeros", price: 125 },
        { type: "minivan", label: "Minivan", capacity: "10 pasajeros", price: 195 },
        { type: "autobus", label: "Autobús", capacity: "25 pasajeros", price: 420 },
      ],
      vehicleBrands: {
        carro: ["Mercedes E-Class", "BMW 5 Series", "Audi A6", "Lexus ES"],
        camioneta: ["Cadillac Escalade", "Lincoln Navigator", "Mercedes GLS", "Range Rover"],
        minivan: ["Mercedes Sprinter Luxury", "Ford Transit Premium", "Ram ProMaster"],
        autobus: ["Mercedes-Benz Tourismo", "Prevost", "Volvo 9700"],
      },
      duration: "4 horas aproximadamente",
      departureTime: "Flexible según vuelo o preferencia",
      arrivalTime: "4 horas después de la salida",
      stops: {
        available: true,
        gasStation: true,
        bathroom: true,
        estimatedStops: "Sin paradas (directo) o 1 parada opcional",
        details: "Opción de parada en rest area si el cliente lo solicita",
      },
      foodAllowed: {
        allowed: true,
        restrictions: "Se permite consumo de alimentos y bebidas",
        notes: "Vehículos premium con servicio de limpieza incluido",
      },
      pickupLocations: [
        "Aeropuerto Internacional de Miami (MIA)",
        "Hoteles en Miami Beach",
        "Downtown Miami",
        "Puerto de Miami",
      ],
      dropoffAreas: [
        "Hoteles de Disney World",
        "Universal Orlando Resort",
        "Aeropuerto de Orlando (MCO)",
        "Downtown Orlando",
      ],
      operatingHours: "24/7 - Servicio disponible todos los días",
      bookingNotice: "Reservar con al menos 12 horas de anticipación",
      cancellationPolicy: "Cancelación gratuita hasta 24 horas antes del servicio",
    },
  },
  {
    id: 15,
    type: "trenes",
    title: "Tren Caracas - Valencia",
    location: "Caracas - Valencia",
    image: "/city-tour.jpg",
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
        notes: "Por favor mantener el tren limpio",
      },
    },
  },
  {
    id: 16,
    type: "trenes",
    title: "Tren Madrid - Barcelona",
    location: "Madrid - Barcelona",
    image: "/eiffel-tower-paris.png",
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
        notes: "Servicio de limpieza disponible",
      },
    },
  },
  {
    id: 17,
    type: "trenes",
    title: "Tren París - Londres",
    location: "París - Londres",
    image: "/big-ben-london.jpg",
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
        notes: "Mantener el área limpia",
      },
    },
  },
]

interface ServiceDetailPageProps {
  serviceId: string
}

export function ServiceDetailPage({ serviceId }: ServiceDetailPageProps) {
  const router = useRouter()
  const { convertPrice } = useCurrency()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { user, updateProfile } = useUser()
  const { toast } = useToast()

  const [selectedVehicleType, setSelectedVehicleType] = useState<string>("")
  const [selectedBrand, setSelectedBrand] = useState<string>("")

  const service = allServices.find((s) => s.id === Number.parseInt(serviceId))

  if (!service) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Servicio no encontrado</h1>
          <Button onClick={() => router.push("/")}>Volver al inicio</Button>
        </div>
      </div>
    )
  }

  const convertedOriginal = convertPrice(service.originalPrice)
  const convertedPrice = convertPrice(service.price)

  const getCarbonFootprint = () => {
    switch (service.type) {
      case "vuelos":
        return { kg: 250, cost: 12 }
      case "cruceros":
        return { kg: 800, cost: 38 }
      case "traslados":
        return { kg: 45, cost: 2 }
      case "trenes":
        return { kg: 15, cost: 1 }
      case "paquetes":
        return { kg: 400, cost: 19 }
      case "hoteles":
        return { kg: 30, cost: 1.5 }
      default:
        return { kg: 30, cost: 1.5 }
    }
  }

  const carbonFootprint = getCarbonFootprint()

  const handleCarbonCompensation = () => {
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para compensar tu huella de carbono",
        variant: "destructive",
      })
      return
    }

    // Update user's carbon compensation history
    const newCompensation = {
      date: new Date().toISOString(),
      amount: carbonFootprint.cost,
      kgCO2: carbonFootprint.kg,
      serviceType: service.type,
    }

    const updatedCompensations = {
      count: (user.carbonCompensations?.count || 0) + 1,
      totalAmount: (user.carbonCompensations?.totalAmount || 0) + carbonFootprint.cost,
      history: [...(user.carbonCompensations?.history || []), newCompensation],
    }

    updateProfile({ carbonCompensations: updatedCompensations })

    toast({
      title: "¡Compensación exitosa!",
      description: `Has compensado ${carbonFootprint.kg} kg de CO₂. Gracias por contribuir al medio ambiente.`,
    })
  }

  const toggleFavorite = () => {
    if (isInWishlist(service.id)) {
      removeFromWishlist(service.id)
    } else {
      addToWishlist({
        id: service.id,
        title: service.title,
        location: service.location,
        price: service.price,
        image: service.image ?? "",
        type: service.type === "paquetes" ? "tour" : (service.type as "hotel" | "cruise" | "tour"),
        addedAt: new Date().toISOString(),
        originalPrice: service.originalPrice,
      })
    }
  }

  const getTypeIcon = () => {
    switch (service.type) {
      case "vuelos":
        return <Plane className="h-6 w-6" />
      case "cruceros":
        return <Ship className="h-6 w-6" />
      case "hoteles":
        return <Building2 className="h-6 w-6" />
      case "traslados":
        return <Car className="h-6 w-6" />
      case "trenes":
        return <Train className="h-6 w-6" />
      case "paquetes":
        return <Package className="h-6 w-6" />
      default:
        return <Package className="h-6 w-6" />
    }
  }

  const handleNext = () => {
    router.push(`/reserva/${serviceId}`)
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
              {service.image ? (
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary/30">{service.type.toUpperCase()}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <Badge variant="secondary" className="uppercase tracking-wide">
                  {service.type}
                </Badge>
                <span className="text-white text-sm flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {service.location}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon()}
                    <Badge variant="secondary">{service.type}</Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{service.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{service.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{service.rating}</span>
                  <span className="text-muted-foreground">({service.reviews} reseñas)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{service.duration}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h2 className="text-2xl font-bold mb-4">Descripción</h2>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>

              <Separator className="my-6" />

              <div>
                <h2 className="text-2xl font-bold mb-4">Servicios Incluidos</h2>
                <ul className="space-y-2">
                  {service.includedServices.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {"cruiseDetails" in service && service.cruiseDetails && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Detalles del Crucero</h2>

                    <div className="space-y-6">
                      {service.cruiseDetails.departureDate && service.cruiseDetails.arrivalDate && (
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-primary" />
                              Fechas del Crucero
                            </h3>
                            <div className="space-y-3">
                              <p className="text-sm">
                                <span className="font-medium">Fecha de salida:</span>{" "}
                                <span className="text-muted-foreground">
                                  {new Date(service.cruiseDetails.departureDate).toLocaleDateString("es-ES", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Fecha de llegada (regreso al puerto):</span>{" "}
                                <span className="text-primary font-semibold">
                                  {new Date(service.cruiseDetails.arrivalDate).toLocaleDateString("es-ES", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Duración:</span>{" "}
                                <span className="text-muted-foreground">{service.duration}</span>
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4">Equipaje Permitido por Pasajero</h3>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="font-medium">Equipaje facturado:</span>{" "}
                              <span className="text-muted-foreground">
                                {service.cruiseDetails.baggage.perPassenger}
                              </span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Equipaje de mano:</span>{" "}
                              <span className="text-muted-foreground">{service.cruiseDetails.baggage.carryOn}</span>
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4">Itinerario del Crucero</h3>
                          <div className="space-y-3">
                            {service.cruiseDetails.ports.map((port, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <Ship className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium">{port.name}</p>
                                  <p className="text-sm text-muted-foreground">{port.day}</p>
                                  {port.arrivalTime && (
                                    <p className="text-sm text-primary font-medium mt-1">
                                      <Clock className="h-3 w-3 inline mr-1" />
                                      {port.arrivalTime}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </>
              )}

              {service.flightDetails && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Detalles del Vuelo</h2>

                    <div className="space-y-6">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Plane className="h-5 w-5 text-primary" />
                            Vuelo de Ida
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Fecha:</span>
                              <span className="text-muted-foreground">{service.flightDetails.outbound.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Duración:</span>
                              <span className="text-muted-foreground">{service.flightDetails.outbound.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Puerta:</span>
                              <span className="text-muted-foreground">{service.flightDetails.outbound.gate}</span>
                            </div>
                            <div className="pl-6 space-y-2 mt-4">
                              <p className="text-sm">
                                <span className="font-medium">Salida:</span>{" "}
                                <span className="text-muted-foreground">
                                  {service.flightDetails.outbound.departure}
                                </span>
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Llegada:</span>{" "}
                                <span className="text-muted-foreground">{service.flightDetails.outbound.arrival}</span>
                              </p>
                              {service.flightDetails.outbound.arrivalTime && (
                                <p className="text-sm">
                                  <span className="font-medium">Hora de llegada:</span>{" "}
                                  <span className="text-primary font-semibold">
                                    {service.flightDetails.outbound.arrivalTime}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Plane className="h-5 w-5 text-primary rotate-180" />
                            Vuelo de Regreso
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Fecha:</span>
                              <span className="text-muted-foreground">{service.flightDetails.return.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Duración:</span>
                              <span className="text-muted-foreground">{service.flightDetails.return.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Puerta:</span>
                              <span className="text-muted-foreground">{service.flightDetails.return.gate}</span>
                            </div>
                            <div className="pl-6 space-y-2 mt-4">
                              <p className="text-sm">
                                <span className="font-medium">Salida:</span>{" "}
                                <span className="text-muted-foreground">{service.flightDetails.return.departure}</span>
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Llegada:</span>{" "}
                                <span className="text-muted-foreground">{service.flightDetails.return.arrival}</span>
                              </p>
                              {service.flightDetails.return.arrivalTime && (
                                <p className="text-sm">
                                  <span className="font-medium">Hora de llegada:</span>{" "}
                                  <span className="text-primary font-semibold">
                                    {service.flightDetails.return.arrivalTime}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4">Equipaje Permitido</h3>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="font-medium">Equipaje de mano:</span>{" "}
                              <span className="text-muted-foreground">{service.flightDetails.baggage.carry}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Equipaje facturado:</span>{" "}
                              <span className="text-muted-foreground">{service.flightDetails.baggage.checked}</span>
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4">Comidas a Bordo</h3>
                          <p className="text-muted-foreground">{service.flightDetails.meals.type}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </>
              )}

              {"packageDetails" in service && service.packageDetails && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Detalles del Paquete</h2>

                    <div className="space-y-6">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Car className="h-5 w-5 text-primary" />
                            Traslados Incluidos
                          </h3>
                          <ul className="space-y-2">
                            {service.packageDetails.transfers.map((transfer, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="h-2 w-2 rounded-full bg-primary" />
                                </div>
                                <span className="text-muted-foreground">{transfer}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-primary" />
                            Hospedaje
                          </h3>
                          <div className="space-y-3">
                            <p className="text-sm">
                              <span className="font-medium">Tipo:</span>{" "}
                              <span className="text-muted-foreground">{service.packageDetails.accommodation.type}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Noches:</span>{" "}
                              <span className="text-muted-foreground">
                                {service.packageDetails.accommodation.nights} noches
                              </span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Ubicación:</span>{" "}
                              <span className="text-muted-foreground">
                                {service.packageDetails.accommodation.location}
                              </span>
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Coffee className="h-5 w-5 text-primary" />
                            Comidas Incluidas
                          </h3>
                          <ul className="space-y-2">
                            {service.packageDetails.meals.map((meal, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="h-2 w-2 rounded-full bg-primary" />
                                </div>
                                <span className="text-muted-foreground">{meal}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Map className="h-5 w-5 text-primary" />
                            Actividades y Tours
                          </h3>
                          <ul className="space-y-2">
                            {service.packageDetails.activities.map((activity, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="h-2 w-2 rounded-full bg-primary" />
                                </div>
                                <span className="text-muted-foreground">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </>
              )}

              {"transferDetails" in service && service.transferDetails && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Detalles del Traslado</h2>

                    <div className="space-y-6">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Car className="h-5 w-5 text-primary" />
                            Selecciona tu Vehículo
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium mb-2 block">Tipo de Vehículo</label>
                              <Select value={selectedVehicleType} onValueChange={setSelectedVehicleType}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Selecciona el tipo de vehículo" />
                                </SelectTrigger>
                                <SelectContent>
                                  {service.transferDetails.vehicleOptions.map((option) => (
                                    <SelectItem key={option.type} value={option.type}>
                                      {option.label} - {option.capacity} (${option.price})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {selectedVehicleType && (
                              <div>
                                <label className="text-sm font-medium mb-2 block">Marca del Vehículo</label>
                                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecciona la marca" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {service.transferDetails.vehicleBrands[
                                      selectedVehicleType as keyof typeof service.transferDetails.vehicleBrands
                                    ]?.map((brand) => (
                                      <SelectItem key={brand} value={brand}>
                                        {brand}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}

                            {selectedVehicleType && (
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <p className="text-sm text-muted-foreground">
                                  <span className="font-medium text-foreground">Capacidad:</span>{" "}
                                  {
                                    service.transferDetails.vehicleOptions.find((v) => v.type === selectedVehicleType)
                                      ?.capacity
                                  }
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            Horarios del Trayecto
                          </h3>
                          <div className="space-y-3">
                            <p className="text-sm">
                              <span className="font-medium">Duración estimada:</span>{" "}
                              <span className="text-muted-foreground">{service.transferDetails.duration}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Hora de salida:</span>{" "}
                              <span className="text-muted-foreground">{service.transferDetails.departureTime}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Hora de llegada estimada:</span>{" "}
                              <span className="text-primary font-semibold">{service.transferDetails.arrivalTime}</span>
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Fuel className="h-5 w-5 text-primary" />
                            Paradas Durante el Trayecto
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  "h-3 w-3 rounded-full",
                                  service.transferDetails.stops.available ? "bg-green-500" : "bg-red-500",
                                )}
                              />
                              <span className="text-sm font-medium">
                                {service.transferDetails.stops.available ? "Paradas disponibles" : "Sin paradas"}
                              </span>
                            </div>
                            {service.transferDetails.stops.available && (
                              <>
                                <p className="text-sm">
                                  <span className="font-medium">Paradas estimadas:</span>{" "}
                                  <span className="text-muted-foreground">
                                    {service.transferDetails.stops.estimatedStops}
                                  </span>
                                </p>
                                <div className="flex gap-4 mt-3">
                                  {service.transferDetails.stops.gasStation && (
                                    <div className="flex items-center gap-2 text-sm">
                                      <Fuel className="h-4 w-4 text-primary" />
                                      <span className="text-muted-foreground">Gasolinera</span>
                                    </div>
                                  )}
                                  {service.transferDetails.stops.bathroom && (
                                    <div className="flex items-center gap-2 text-sm">
                                      <MapPin className="h-4 w-4 text-primary" />
                                      <span className="text-muted-foreground">Baño</span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                  {service.transferDetails.stops.details}
                                </p>
                              </>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Coffee className="h-5 w-5 text-primary" />
                            Consumo de Alimentos
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  "h-3 w-3 rounded-full",
                                  service.transferDetails.foodAllowed.allowed ? "bg-green-500" : "bg-red-500",
                                )}
                              />
                              <span className="text-sm font-medium">
                                {service.transferDetails.foodAllowed.allowed
                                  ? "Consumo de alimentos permitido"
                                  : "No se permite consumo de alimentos"}
                              </span>
                            </div>
                            {service.transferDetails.foodAllowed.allowed && (
                              <>
                                <p className="text-sm text-muted-foreground">
                                  {service.transferDetails.foodAllowed.restrictions}
                                </p>
                                <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
                                  ℹ️ {service.transferDetails.foodAllowed.notes}
                                </p>
                              </>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4">Puntos de Recogida Disponibles</h3>
                          <ul className="space-y-2">
                            {service.transferDetails.pickupLocations.map((location, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <MapPin className="h-3 w-3 text-primary" />
                                </div>
                                <span className="text-muted-foreground">{location}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4">Áreas de Destino</h3>
                          <ul className="space-y-2">
                            {service.transferDetails.dropoffAreas.map((area, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <MapPin className="h-3 w-3 text-primary" />
                                </div>
                                <span className="text-muted-foreground">{area}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4">Información Importante</h3>
                          <div className="space-y-3">
                            <p className="text-sm">
                              <span className="font-medium">Horario de operación:</span>{" "}
                              <span className="text-muted-foreground">{service.transferDetails.operatingHours}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Tiempo de reserva:</span>{" "}
                              <span className="text-muted-foreground">{service.transferDetails.bookingNotice}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Política de cancelación:</span>{" "}
                              <span className="text-muted-foreground">
                                {service.transferDetails.cancellationPolicy}
                              </span>
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </>
              )}

              {"trainDetails" in service && service.trainDetails && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Detalles del Tren</h2>

                    <div className="space-y-6">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Train className="h-5 w-5 text-primary" />
                            Información del Tren
                          </h3>
                          <div className="space-y-3">
                            <p className="text-sm">
                              <span className="font-medium">Tipo de tren:</span>{" "}
                              <span className="text-muted-foreground">{service.trainDetails.trainType}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Clase:</span>{" "}
                              <span className="text-muted-foreground">{service.trainDetails.class}</span>
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            Estaciones
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium mb-1">Estación de Salida</p>
                              <p className="text-sm text-muted-foreground">{service.trainDetails.departureStation}</p>
                              <p className="text-sm text-muted-foreground">Andén/Vía: {service.trainDetails.gate}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">Estación de Llegada</p>
                              <p className="text-sm text-muted-foreground">{service.trainDetails.arrivalStation}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            Horarios
                          </h3>
                          <div className="space-y-3">
                            <p className="text-sm">
                              <span className="font-medium">Hora de salida:</span>{" "}
                              <span className="text-muted-foreground">{service.trainDetails.departureTime}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Hora de llegada:</span>{" "}
                              <span className="text-muted-foreground">{service.trainDetails.arrivalTime}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Duración:</span>{" "}
                              <span className="text-muted-foreground">{service.duration}</span>
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4">Equipaje Permitido</h3>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="font-medium">Equipaje de mano:</span>{" "}
                              <span className="text-muted-foreground">{service.trainDetails.baggage.carry}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Equipaje facturado:</span>{" "}
                              <span className="text-muted-foreground">{service.trainDetails.baggage.checked}</span>
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Coffee className="h-5 w-5 text-primary" />
                            Comidas a Bordo
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  "h-3 w-3 rounded-full",
                                  service.trainDetails.meals.included ? "bg-green-500" : "bg-red-500",
                                )}
                              />
                              <span className="text-sm font-medium">
                                {service.trainDetails.meals.included ? "Comida incluida" : "Comida no incluida"}
                              </span>
                            </div>
                            {service.trainDetails.meals.included && (
                              <p className="text-sm text-muted-foreground">{service.trainDetails.meals.type}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-4">Consumo de Alimentos</h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  "h-3 w-3 rounded-full",
                                  service.trainDetails.foodAllowed.allowed ? "bg-green-500" : "bg-red-500",
                                )}
                              />
                              <span className="text-sm font-medium">
                                {service.trainDetails.foodAllowed.allowed
                                  ? "Consumo de alimentos permitido"
                                  : "No se permite consumo de alimentos"}
                              </span>
                            </div>
                            {service.trainDetails.foodAllowed.allowed && (
                              <p className="text-sm text-muted-foreground">
                                {service.trainDetails.foodAllowed.restrictions}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </>
              )}

              <Separator className="my-6" />
              {service.type !== "hoteles" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Huella de Carbono
                  </h2>
                  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-lg font-bold text-green-700 dark:text-green-400">
                              ~{carbonFootprint.kg}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-green-900 dark:text-green-100 mb-1">
                              kg CO₂ estimados por persona
                            </p>
                            <p className="text-sm text-green-700 dark:text-green-300">
                              {service.type === "vuelos" &&
                                "Emisiones calculadas basadas en la distancia del vuelo y tipo de aeronave."}
                              {service.type === "cruceros" &&
                                "Emisiones calculadas por día de crucero incluyendo alojamiento y actividades."}
                              {service.type === "traslados" &&
                                "Emisiones calculadas según la distancia y tipo de vehículo."}
                              {service.type === "trenes" &&
                                "Los trenes son una de las opciones más ecológicas para viajar."}
                              {service.type === "paquetes" &&
                                "Emisiones combinadas de vuelos, traslados y alojamiento incluidos."}
                            </p>
                          </div>
                        </div>

                        <Separator className="bg-green-200 dark:bg-green-900" />

                        <div className="space-y-3">
                          <h4 className="font-semibold text-green-900 dark:text-green-100">
                            Compensa tu huella de carbono
                          </h4>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            Puedes compensar las emisiones de CO₂ de tu viaje contribuyendo a proyectos de reforestación
                            y energías renovables.
                          </p>
                          <div className="flex items-center gap-3 p-3 bg-white dark:bg-green-950/40 rounded-lg border border-green-200 dark:border-green-900">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                                Costo de compensación:
                              </p>
                              <p className="text-lg font-bold text-green-700 dark:text-green-400">
                                ${carbonFootprint.cost} USD
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                              onClick={handleCarbonCompensation}
                            >
                              Compensar ahora
                            </Button>
                          </div>
                          <p className="text-xs text-green-600 dark:text-green-400">
                            ✓ Tu contribución apoya proyectos certificados de conservación ambiental
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Desde</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-lg text-muted-foreground line-through">
                      {convertedOriginal.symbol}
                      {convertedOriginal.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-primary">
                    {convertedPrice.symbol}
                    {convertedPrice.value.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Ahorra {service.discount}%</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button variant="outline" className="w-full bg-transparent" size="lg" onClick={toggleFavorite}>
                    <Heart className={cn("mr-2 h-5 w-5", isInWishlist(service.id) && "fill-red-500 text-red-500")} />
                    {isInWishlist(service.id) ? "En Wishlist" : "Agregar a Wishlist"}
                  </Button>

                  <Button className="w-full" size="lg" onClick={handleNext}>
                    Comprar
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
