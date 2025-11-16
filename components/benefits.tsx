import { Search, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Benefits() {
  const benefits = [
    {
      icon: Search,
      title: "Busca con facilidad",
      description: "Encuentra el viaje perfecto con nuestro buscador inteligente y filtros avanzados",
    },
    {
      icon: Tag,
      title: "Ofertas alucinantes",
      description: "Accede a descuentos exclusivos y ahorra hasta un 40% en tus reservas",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="border-none shadow-none bg-transparent">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground text-balance">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
