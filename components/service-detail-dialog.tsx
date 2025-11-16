"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Plane,
  Clock,
  Calendar,
  MapPin,
  Luggage,
  Utensils,
  CheckCircle2,
  Hotel,
  Ship,
  Car,
  UtensilsCrossed,
  Map,
} from "lucide-react"
import { useCurrency } from "@/lib/currency-context"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

interface ServiceDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: {
    id: number
    type: string
    title: string
    location: string
    price: number
    originalPrice: number
    rating: number
    reviews: number
    discount: number
    description?: string
    includedServices?: string[]
    flightDetails?: {
      outbound: {
        duration: string
        date: string
        gate: string
        departure: string
        arrival: string
      }
      return: {
        duration: string
        date: string
        gate: string
        departure: string
        arrival: string
      }
      baggage: {
        carry: string
        checked: string
      }
      meals: {
        included: boolean
        type: string
      }
    }
  }
}

export function ServiceDetailDialog({ open, onOpenChange, service }: ServiceDetailDialogProps) {
  const { convertPrice } = useCurrency()
  const { addToCart } = useCart()
  const { toast } = useToast()

  const convertedPrice = convertPrice(service.price)
  const convertedOriginal = convertPrice(service.originalPrice)

  const handleAddToCart = () => {
    addToCart({
      id: service.id,
      title: service.title,
      location: service.location,
      price: service.price,
      image: "",
      type: service.type,
    })
    onOpenChange(false)
  }

  const getServiceIcon = () => {
    switch (service.type) {
      case "vuelos":
        return <Plane className="h-6 w-6" />
      case "hoteles":
      case "hotel":
        return <Hotel className="h-6 w-6" />
      case "cruceros":
      case "cruise":
        return <Ship className="h-6 w-6" />
      case "traslados":
        return <Car className="h-6 w-6" />
      case "tours":
      case "tour":
        return <Map className="h-6 w-6" />
      case "restaurantes":
        return <UtensilsCrossed className="h-6 w-6" />
      default:
        return <MapPin className="h-6 w-6" />
    }
  }

  const isLongHaulFlight =
    service.flightDetails &&
    (Number.parseInt(service.flightDetails.outbound.duration) > 6 ||
      Number.parseInt(service.flightDetails.return.duration) > 6)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">{getServiceIcon()}</div>
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{service.title}</DialogTitle>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {service.location}
              </p>
            </div>
            <Badge className="bg-destructive text-destructive-foreground">-{service.discount}%</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Price Section */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Desde</p>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground line-through">
                  {convertedOriginal.symbol}
                  {convertedOriginal.value.toLocaleString()}
                </span>
                <span className="text-3xl font-bold text-primary">
                  {convertedPrice.symbol}
                  {convertedPrice.value.toLocaleString()}
                </span>
              </div>
            </div>
            <Button size="lg" onClick={handleAddToCart}>
              Agregar al carrito
            </Button>
          </div>

          {/* Description */}
          {service.description && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Descripción</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          )}

          {/* Included Services */}
          {service.includedServices && service.includedServices.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Servicios incluidos</h3>
              <div className="grid gap-2">
                {service.includedServices.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Flight Details */}
          {(service.type === "vuelos" || service.type === "flight") && service.flightDetails && (
            <div className="space-y-4">
              <Separator />
              <h3 className="font-semibold text-lg">Detalles del vuelo</h3>

              {/* Outbound Flight */}
              <div className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Plane className="h-5 w-5" />
                  <span>Vuelo de ida</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Fecha</p>
                      <p className="text-sm font-medium">{service.flightDetails.outbound.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duración</p>
                      <p className="text-sm font-medium">{service.flightDetails.outbound.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Salida</p>
                      <p className="text-sm font-medium">{service.flightDetails.outbound.departure}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Llegada</p>
                      <p className="text-sm font-medium">{service.flightDetails.outbound.arrival}</p>
                    </div>
                  </div>
                </div>
                <Badge variant="outline">Puerta: {service.flightDetails.outbound.gate}</Badge>
              </div>

              {/* Return Flight */}
              <div className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Plane className="h-5 w-5 rotate-180" />
                  <span>Vuelo de regreso</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Fecha</p>
                      <p className="text-sm font-medium">{service.flightDetails.return.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duración</p>
                      <p className="text-sm font-medium">{service.flightDetails.return.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Salida</p>
                      <p className="text-sm font-medium">{service.flightDetails.return.departure}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Llegada</p>
                      <p className="text-sm font-medium">{service.flightDetails.return.arrival}</p>
                    </div>
                  </div>
                </div>
                <Badge variant="outline">Puerta: {service.flightDetails.return.gate}</Badge>
              </div>

              {/* Baggage */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Luggage className="h-5 w-5" />
                  <h4 className="font-semibold">Equipaje permitido</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Equipaje de mano</p>
                    <p className="text-sm font-medium">{service.flightDetails.baggage.carry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Equipaje facturado</p>
                    <p className="text-sm font-medium">{service.flightDetails.baggage.checked}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Utensils className="h-5 w-5" />
                  <h4 className="font-semibold">Comidas y bebidas</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Snacks y bebidas incluidos en todos los vuelos</span>
                  </div>
                  {isLongHaulFlight && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm">Comida completa incluida (vuelo largo)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
