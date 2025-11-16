"use client"

import { Plane, Ship, Building2, Package } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const travelOptions = [
  {
    id: "vuelos",
    title: "Vuelos",
    description: "Encuentra los mejores precios en vuelos nacionales e internacionales",
    icon: Plane,
    color: "from-blue-500/10 to-blue-600/10",
    iconColor: "text-blue-600",
  },
  {
    id: "cruceros",
    title: "Cruceros",
    description: "Explora el mundo navegando por los mejores destinos",
    icon: Ship,
    color: "from-cyan-500/10 to-cyan-600/10",
    iconColor: "text-cyan-600",
  },
  {
    id: "hoteles",
    title: "Hoteles",
    description: "Reserva hoteles de calidad al mejor precio garantizado",
    icon: Building2,
    color: "from-purple-500/10 to-purple-600/10",
    iconColor: "text-purple-600",
  },
  {
    id: "paquetes",
    title: "Paquetes Turísticos",
    description: "Paquetes completos con vuelo, hotel y actividades incluidas",
    icon: Package,
    color: "from-orange-500/10 to-orange-600/10",
    iconColor: "text-orange-600",
  },
]

export function TravelOptions() {
  const router = useRouter()

  const handleOptionClick = (optionId: string) => {
    router.push(`/resultados?type=${optionId}`)
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">¿Qué estás buscando?</h2>
          <p className="text-lg text-muted-foreground">Selecciona el tipo de viaje que deseas realizar</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {travelOptions.map((option) => {
            const Icon = option.icon
            return (
              <Card
                key={option.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50"
                onClick={() => handleOptionClick(option.id)}
              >
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`h-10 w-10 ${option.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{option.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
