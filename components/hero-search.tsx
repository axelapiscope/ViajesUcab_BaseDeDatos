"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Calendar, Users, MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const POPULAR_DESTINATIONS = [
  "Cancún, México",
  "Punta Cana, República Dominicana",
  "Miami, Estados Unidos",
  "Cartagena, Colombia",
  "Buenos Aires, Argentina",
  "Lima, Perú",
  "Río de Janeiro, Brasil",
  "Barcelona, España",
  "París, Francia",
  "Roma, Italia",
  "Londres, Reino Unido",
  "Tokio, Japón",
  "Dubai, Emiratos Árabes",
  "Maldivas",
  "Bali, Indonesia",
]

const SERVICE_TYPES = [
  { value: "vuelos", label: "Vuelos" },
  { value: "cruceros", label: "Cruceros" },
  { value: "traslados", label: "Traslados" },
  { value: "hoteles", label: "Hoteles" },
  { value: "tours", label: "Tours" },
  { value: "restaurantes", label: "Restaurantes" },
]

export function HeroSearch() {
  const [selectedServices, setSelectedServices] = useState<string[]>(["hoteles"])
  const [destination, setDestination] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [flightType, setFlightType] = useState<"nacional" | "internacional">("internacional")
  const { toast } = useToast()
  const router = useRouter()

  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [filteredDestinations, setFilteredDestinations] = useState<string[]>([])
  const autocompleteRef = useRef<HTMLDivElement>(null)

  const [showPassengersSelector, setShowPassengersSelector] = useState(false)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  useEffect(() => {
    if (destination.length > 0) {
      const filtered = POPULAR_DESTINATIONS.filter((dest) => dest.toLowerCase().includes(destination.toLowerCase()))
      setFilteredDestinations(filtered)
      setShowAutocomplete(filtered.length > 0)
    } else {
      setShowAutocomplete(false)
    }
  }, [destination])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleService = (service: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(service)) {
        return prev.filter((s) => s !== service)
      } else {
        return [...prev, service]
      }
    })
  }

  const handleSearch = () => {
    if (!destination) {
      toast({
        title: "Destino requerido",
        description: "Por favor ingresa un destino para buscar",
        variant: "destructive",
      })
      return
    }

    if (selectedServices.length === 0) {
      toast({
        title: "Servicio requerido",
        description: "Por favor selecciona al menos un tipo de servicio",
        variant: "destructive",
      })
      return
    }

    if (!departureDate || !returnDate) {
      toast({
        title: "Fechas requeridas",
        description: "Por favor selecciona las fechas de tu viaje",
        variant: "destructive",
      })
      return
    }

    if (new Date(returnDate) <= new Date(departureDate)) {
      toast({
        title: "Fechas inválidas",
        description: "La fecha de regreso debe ser posterior a la fecha de salida",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    toast({
      title: "Buscando viajes...",
      description: `Buscando ${selectedServices.join(", ")} en ${destination}`,
    })

    setTimeout(() => {
      setIsLoading(false)
      const params = new URLSearchParams({
        services: selectedServices.join(","),
        destination,
        departureDate,
        returnDate,
        adults: adults.toString(),
        children: children.toString(),
        flightType,
      })
      router.push(`/resultados?${params.toString()}`)
    }, 1500)
  }

  const getPassengersText = () => {
    const totalPassengers = adults + children
    return totalPassengers === 1 ? "1 pasajero" : `${totalPassengers} pasajeros`
  }

  const showFlightTypeSelector = selectedServices.includes("vuelos") || selectedServices.includes("traslados")

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Encuentra tu próximo destino
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            Busca y reserva hoteles, vuelos, cruceros y paquetes turísticos
          </p>
        </div>

        <Card className="mx-auto max-w-5xl p-6 shadow-xl">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Selecciona los servicios que deseas buscar:</Label>
              <div className="flex flex-wrap gap-3">
                {SERVICE_TYPES.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.value}
                      checked={selectedServices.includes(type.value)}
                      onCheckedChange={() => toggleService(type.value)}
                    />
                    <Label
                      htmlFor={type.value}
                      className="text-sm font-normal cursor-pointer hover:text-primary transition-colors"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {showFlightTypeSelector && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tipo de vuelo/traslado:</Label>
                <RadioGroup
                  value={flightType}
                  onValueChange={(value) => setFlightType(value as "nacional" | "internacional")}
                >
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nacional" id="nacional" />
                      <Label htmlFor="nacional" className="text-sm font-normal cursor-pointer">
                        Nacional
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="internacional" id="internacional" />
                      <Label htmlFor="internacional" className="text-sm font-normal cursor-pointer">
                        Internacional
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative" ref={autocompleteRef}>
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                <Input
                  placeholder="¿A dónde viajas?"
                  className="pl-10 h-12"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onFocus={() => destination && setShowAutocomplete(true)}
                />
                {showAutocomplete && filteredDestinations.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                    {filteredDestinations.map((dest, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-sm"
                        onClick={() => {
                          setDestination(dest)
                          setShowAutocomplete(false)
                        }}
                      >
                        <MapPin className="inline h-4 w-4 mr-2 text-muted-foreground" />
                        {dest}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="date"
                  placeholder="Fecha de salida"
                  className="pl-10 h-12"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="date"
                  placeholder="Fecha de regreso"
                  className="pl-10 h-12"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={departureDate || new Date().toISOString().split("T")[0]}
                />
              </div>

              <Popover open={showPassengersSelector} onOpenChange={setShowPassengersSelector}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-12 justify-start text-left font-normal bg-transparent">
                    <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span className="truncate">{getPassengersText()}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="start">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Adultos</p>
                        <p className="text-sm text-muted-foreground">Mayores de 18 años</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">{adults}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => setAdults(Math.min(10, adults + 1))}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Niños</p>
                        <p className="text-sm text-muted-foreground">0-17 años</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">{children}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => setChildren(Math.min(10, children + 1))}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <Button
              size="lg"
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  BUSCAR VIAJES
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
