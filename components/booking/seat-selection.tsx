"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Plus, Minus } from "lucide-react"

interface SeatSelectionProps {
  serviceId: string
  bookingData: any
  updateBookingData: (data: any) => void
  onNext: () => void
  serviceType?: string
}

export function SeatSelection({ serviceId, bookingData, updateBookingData, onNext, serviceType }: SeatSelectionProps) {
  const [selectedSeat, setSelectedSeat] = useState("")
  const [selectedCabin, setSelectedCabin] = useState("")
  const [selectedCabinNumber, setSelectedCabinNumber] = useState("")
  const [selectedRoom, setSelectedRoom] = useState("")
  const [selectedTrainClass, setSelectedTrainClass] = useState("")
  const [roomAmenities, setRoomAmenities] = useState<string[]>([])
  const [additionalServices, setAdditionalServices] = useState<string[]>([])
  const [extraLuggage, setExtraLuggage] = useState(0)

  const type = serviceType || "vuelos"

  const handleNext = () => {
    updateBookingData({
      seatSelection: {
        seat: selectedSeat,
        cabin: selectedCabin,
        cabinNumber: selectedCabinNumber,
        room: selectedRoom,
        roomAmenities,
        trainClass: selectedTrainClass,
      },
      additionalServices: {
        services: additionalServices,
        extraLuggage,
      },
    })
    onNext()
  }

  const toggleService = (service: string) => {
    setAdditionalServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  const toggleAmenity = (amenity: string) => {
    setRoomAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-6 pt-6">
          {/* Flight/Bus Seat Selection */}
          {(type === "vuelos" || type === "traslados") && (
            <div>
              <h3 className="font-semibold mb-4">Selecciona tu Asiento</h3>
              <RadioGroup value={selectedSeat} onValueChange={setSelectedSeat}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["1A", "1B", "1C", "1D", "2A", "2B", "2C", "2D", "3A", "3B", "3C", "3D"].map((seat) => (
                    <div key={seat} className="flex items-center space-x-2">
                      <RadioGroupItem value={seat} id={seat} />
                      <Label htmlFor={seat} className="cursor-pointer">
                        Asiento {seat}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Train Class and Seat Selection */}
          {type === "trenes" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Selecciona tu Clase</h3>
                <RadioGroup value={selectedTrainClass} onValueChange={setSelectedTrainClass}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="turista" id="turista" />
                      <Label htmlFor="turista" className="cursor-pointer flex-1">
                        <div>
                          <p className="font-medium">Clase Turista</p>
                          <p className="text-sm text-muted-foreground">Asientos estándar, cómodos</p>
                        </div>
                      </Label>
                      <span className="font-bold">+$0</span>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="preferente" id="preferente" />
                      <Label htmlFor="preferente" className="cursor-pointer flex-1">
                        <div>
                          <p className="font-medium">Clase Preferente</p>
                          <p className="text-sm text-muted-foreground">Más espacio, asientos reclinables</p>
                        </div>
                      </Label>
                      <span className="font-bold">+$50</span>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="primera" id="primera" />
                      <Label htmlFor="primera" className="cursor-pointer flex-1">
                        <div>
                          <p className="font-medium">Primera Clase</p>
                          <p className="text-sm text-muted-foreground">Máximo confort, servicio premium</p>
                        </div>
                      </Label>
                      <span className="font-bold">+$120</span>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="cama" id="cama" />
                      <Label htmlFor="cama" className="cursor-pointer flex-1">
                        <div>
                          <p className="font-medium">Coche Cama</p>
                          <p className="text-sm text-muted-foreground">Camarote privado con cama</p>
                        </div>
                      </Label>
                      <span className="font-bold">+$200</span>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {selectedTrainClass && (
                <div>
                  <h3 className="font-semibold mb-4">Selecciona tu Asiento</h3>
                  <RadioGroup value={selectedSeat} onValueChange={setSelectedSeat}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B", "6A", "6B"].map((seat) => (
                        <div key={seat} className="flex items-center space-x-2">
                          <RadioGroupItem value={seat} id={`train-${seat}`} />
                          <Label htmlFor={`train-${seat}`} className="cursor-pointer">
                            Asiento {seat}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>
          )}

          {/* Cruise Cabin Selection */}
          {type === "cruceros" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Selecciona tu Tipo de Camarote</h3>
                <RadioGroup value={selectedCabin} onValueChange={setSelectedCabin}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="interior" id="interior" />
                      <Label htmlFor="interior" className="cursor-pointer flex-1">
                        <div>
                          <p className="font-medium">Camarote Interior</p>
                          <p className="text-sm text-muted-foreground">Sin ventana, económico</p>
                        </div>
                      </Label>
                      <span className="font-bold">+$0</span>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="oceanview" id="oceanview" />
                      <Label htmlFor="oceanview" className="cursor-pointer flex-1">
                        <div>
                          <p className="font-medium">Camarote con Vista al Mar</p>
                          <p className="text-sm text-muted-foreground">Con ventana</p>
                        </div>
                      </Label>
                      <span className="font-bold">+$200</span>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="balcony" id="balcony" />
                      <Label htmlFor="balcony" className="cursor-pointer flex-1">
                        <div>
                          <p className="font-medium">Camarote con Balcón</p>
                          <p className="text-sm text-muted-foreground">Con balcón privado</p>
                        </div>
                      </Label>
                      <span className="font-bold">+$400</span>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="suite" id="suite" />
                      <Label htmlFor="suite" className="cursor-pointer flex-1">
                        <div>
                          <p className="font-medium">Suite</p>
                          <p className="text-sm text-muted-foreground">Lujo y espacio máximo</p>
                        </div>
                      </Label>
                      <span className="font-bold">+$800</span>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {selectedCabin && (
                <div>
                  <h3 className="font-semibold mb-4">Selecciona el Número de Camarote</h3>
                  <RadioGroup value={selectedCabinNumber} onValueChange={setSelectedCabinNumber}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["101", "102", "103", "104", "201", "202", "203", "204", "301", "302", "303", "304"].map(
                        (cabin) => (
                          <div key={cabin} className="flex items-center space-x-2">
                            <RadioGroupItem value={cabin} id={`cabin-${cabin}`} />
                            <Label htmlFor={`cabin-${cabin}`} className="cursor-pointer">
                              Camarote {cabin}
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>
          )}

          {/* Hotel Room Selection */}
          {type === "hoteles" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Tipo de Habitación</h3>
                <RadioGroup value={selectedRoom} onValueChange={setSelectedRoom}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual" className="cursor-pointer flex-1">
                        <div>
                          <p className="font-medium">Habitación Individual</p>
                          <p className="text-sm text-muted-foreground">1 cama individual</p>
                        </div>
                      </Label>
                      <span className="font-bold">+$0</span>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="doble" id="doble" />
                      <Label htmlFor="doble" className="cursor-pointer flex-1">
                        <div>
                          <p className="font-medium">Habitación Doble</p>
                          <p className="text-sm text-muted-foreground">2 camas o 1 cama matrimonial</p>
                        </div>
                      </Label>
                      <span className="font-bold">+$50</span>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="suite" id="suite-room" />
                      <Label htmlFor="suite-room" className="cursor-pointer flex-1">
                        <div>
                          <p className="font-medium">Suite</p>
                          <p className="text-sm text-muted-foreground">Sala de estar + habitación</p>
                        </div>
                      </Label>
                      <span className="font-bold">+$150</span>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="presidencial" id="presidencial" />
                      <Label htmlFor="presidencial" className="cursor-pointer flex-1">
                        <div>
                          <p className="font-medium">Suite Presidencial</p>
                          <p className="text-sm text-muted-foreground">Máximo lujo y espacio</p>
                        </div>
                      </Label>
                      <span className="font-bold">+$400</span>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Comodidades Adicionales</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="nevera"
                      checked={roomAmenities.includes("nevera")}
                      onCheckedChange={() => toggleAmenity("nevera")}
                    />
                    <Label htmlFor="nevera" className="cursor-pointer flex-1">
                      Mini nevera (+$15/noche)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="aire"
                      checked={roomAmenities.includes("aire")}
                      onCheckedChange={() => toggleAmenity("aire")}
                    />
                    <Label htmlFor="aire" className="cursor-pointer flex-1">
                      Aire acondicionado premium (+$10/noche)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="vista"
                      checked={roomAmenities.includes("vista")}
                      onCheckedChange={() => toggleAmenity("vista")}
                    />
                    <Label htmlFor="vista" className="cursor-pointer flex-1">
                      Vista al mar (+$25/noche)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="jacuzzi"
                      checked={roomAmenities.includes("jacuzzi")}
                      onCheckedChange={() => toggleAmenity("jacuzzi")}
                    />
                    <Label htmlFor="jacuzzi" className="cursor-pointer flex-1">
                      Jacuzzi privado (+$50/noche)
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Additional Services */}
          <div>
            <h3 className="font-semibold mb-4">Servicios Adicionales</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="seguro"
                  checked={additionalServices.includes("seguro")}
                  onCheckedChange={() => toggleService("seguro")}
                />
                <Label htmlFor="seguro" className="cursor-pointer flex-1">
                  Seguro de viaje (+$45)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="comida-especial"
                  checked={additionalServices.includes("comida-especial")}
                  onCheckedChange={() => toggleService("comida-especial")}
                />
                <Label htmlFor="comida-especial" className="cursor-pointer flex-1">
                  Comida especial - vegetariana/vegana/sin gluten (+$20)
                </Label>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <Label htmlFor="extra-luggage" className="flex-1">
                  Maleta adicional (+$30 por maleta)
                </Label>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" onClick={() => setExtraLuggage(Math.max(0, extraLuggage - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{extraLuggage}</span>
                  <Button variant="outline" size="icon" onClick={() => setExtraLuggage(extraLuggage + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleNext}>
          Siguiente
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
