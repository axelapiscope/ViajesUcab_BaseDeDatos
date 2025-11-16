"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function Footer() {
  const { toast } = useToast()

  const handleViewMoreOffers = () => {
    console.log("[v0] View more offers clicked")
    toast({
      title: "Cargando más ofertas",
      description: "Descubre increíbles destinos con descuentos exclusivos",
    })
    // In real app, this would load more offers or navigate to offers page
  }

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">¿Listo para tu próxima aventura?</h3>
          <p className="text-muted-foreground mb-6">
            Descubre más ofertas increíbles y comienza a planificar tu viaje ideal
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={handleViewMoreOffers}>
            Ver más ofertas
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Servicios</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Hoteles</li>
                <li>Vuelos</li>
                <li>Cruceros</li>
                <li>Paquetes</li>
                <li>Tours</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Destinos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Cancún</li>
                <li>Punta Cana</li>
                <li>Cartagena</li>
                <li>Miami</li>
                <li>Buenos Aires</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Ayuda</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Centro de ayuda</li>
                <li>Contacto</li>
                <li>Términos y condiciones</li>
                <li>Política de privacidad</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">ViajesUCAB</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sobre nosotros</li>
                <li>Trabaja con nosotros</li>
                <li>Blog</li>
                <li>Prensa</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 ViajesUCAB. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
