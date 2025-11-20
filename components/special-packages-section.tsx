"use client"

import Image from "next/image"
import { Heart, Cake, MapPin, Calendar, Users } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCurrency } from "@/lib/currency-context"
import { useRouter } from "next/navigation"

const specialPackages = [
  {
    id: "quince-1",
    type: "quinceanera",
    title: "Tour de 15 Años Mágico",
    destination: "Orlando, Florida",
    image: "/disney-castle-magic-kingdom.jpg",
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
  },
  {
    id: "quince-2",
    type: "quinceanera",
    title: "Tour de 15 Años Caribeño",
    destination: "Cancún y Riviera Maya",
    image: "/cancun-beach-resort.png",
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
  },
  {
    id: "quince-3",
    type: "quinceanera",
    title: "Tour de 15 Años Europeo",
    destination: "París y Londres",
    image: "/big-ben-london.jpg",
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
  },
  {
    id: "honeymoon-1",
    type: "honeymoon",
    title: "Luna de Miel en Maldivas",
    destination: "Maldivas",
    image: "/maldives-water-villa.jpg",
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
  },
  {
    id: "honeymoon-2",
    type: "honeymoon",
    title: "Luna de Miel en Santorini",
    destination: "Santorini, Grecia",
    image: "/santorini-oia-sunset.jpg",
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
  },
  {
    id: "honeymoon-3",
    type: "honeymoon",
    title: "Luna de Miel en Bali",
    destination: "Bali, Indonesia",
    image: "/balinese-temple.png",
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
  },
]

export function SpecialPackagesSection() {
  const { convertPrice } = useCurrency()
  const router = useRouter()

  const quinceaneraPackages = specialPackages.filter((p) => p.type === "quinceanera")
  const honeymoonPackages = specialPackages.filter((p) => p.type === "honeymoon")

  const handleViewPackage = (packageId: string) => {
    router.push(`/paquete-especial/${packageId}`)
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Paquetes Especiales</h2>
          <p className="text-lg text-muted-foreground">Momentos únicos que merecen experiencias inolvidables</p>
        </div>

        <div className="space-y-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-full bg-pink-100 dark:bg-pink-950/20 flex items-center justify-center">
                <Cake className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Tours de 15 Años</h3>
                <p className="text-muted-foreground">Celebra este momento especial con un viaje inolvidable</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quinceaneraPackages.map((pkg) => {
                const convertedPrice = convertPrice(pkg.price)
                const convertedOriginal = convertPrice(pkg.originalPrice)

                return (
                  <Card
                    key={pkg.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleViewPackage(pkg.id)}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <Badge className="absolute top-3 right-3 bg-pink-600">-{pkg.discount}%</Badge>
                      <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                        <Cake className="h-5 w-5" />
                        <span className="text-sm font-semibold">Tour de 15</span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="font-bold text-xl mb-2">{pkg.title}</h4>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{pkg.destination}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{pkg.groupSize}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pkg.description}</p>

                      <div className="mb-4">
                        <p className="text-xs font-medium mb-2">Incluye:</p>
                        <div className="flex flex-wrap gap-2">
                          {pkg.highlights.map((highlight, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <p className="text-xs text-muted-foreground mb-1">Desde</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm text-muted-foreground line-through">
                            {convertedOriginal.symbol}
                            {convertedOriginal.value.toLocaleString()}
                          </span>
                          <span className="text-2xl font-bold text-primary">
                            {convertedPrice.symbol}
                            {convertedPrice.value.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button className="w-full">Ver detalles completos</Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-950/20 flex items-center justify-center">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Lunas de Miel</h3>
                <p className="text-muted-foreground">Comienza tu vida juntos con el viaje perfecto</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {honeymoonPackages.map((pkg) => {
                const convertedPrice = convertPrice(pkg.price)
                const convertedOriginal = convertPrice(pkg.originalPrice)

                return (
                  <Card
                    key={pkg.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleViewPackage(pkg.id)}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <Badge className="absolute top-3 right-3 bg-red-600">-{pkg.discount}%</Badge>
                      <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                        <Heart className="h-5 w-5" />
                        <span className="text-sm font-semibold">Luna de miel</span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="font-bold text-xl mb-2">{pkg.title}</h4>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{pkg.destination}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{pkg.groupSize}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pkg.description}</p>

                      <div className="mb-4">
                        <p className="text-xs font-medium mb-2">Incluye:</p>
                        <div className="flex flex-wrap gap-2">
                          {pkg.highlights.map((highlight, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <p className="text-xs text-muted-foreground mb-1">Desde</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm text-muted-foreground line-through">
                            {convertedOriginal.symbol}
                            {convertedOriginal.value.toLocaleString()}
                          </span>
                          <span className="text-2xl font-bold text-primary">
                            {convertedPrice.symbol}
                            {convertedPrice.value.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button className="w-full">Ver detalles completos</Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
