"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft, Plus, Trash2 } from "lucide-react"

interface PassengerInfoProps {
  bookingData: any
  updateBookingData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

interface Passenger {
  firstName: string
  lastName: string
  birthDate: string
  passportNumber: string
  email: string
  phone: string
}

export function PassengerInfo({ bookingData, updateBookingData, onNext, onBack }: PassengerInfoProps) {
  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      firstName: "",
      lastName: "",
      birthDate: "",
      passportNumber: "",
      email: "",
      phone: "",
    },
  ])

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        firstName: "",
        lastName: "",
        birthDate: "",
        passportNumber: "",
        email: "",
        phone: "",
      },
    ])
  }

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index))
    }
  }

  const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
    const updated = [...passengers]
    updated[index][field] = value
    setPassengers(updated)
  }

  const handleNext = () => {
    updateBookingData({ passengers })
    onNext()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información de Pasajeros</CardTitle>
          <p className="text-sm text-muted-foreground">
            Por favor ingresa la información de todos los pasajeros que viajarán
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {passengers.map((passenger, index) => (
            <div key={index} className="p-6 border rounded-lg space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Pasajero {index + 1}</h3>
                {passengers.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removePassenger(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`firstName-${index}`}>Nombre(s)</Label>
                  <Input
                    id={`firstName-${index}`}
                    value={passenger.firstName}
                    onChange={(e) => updatePassenger(index, "firstName", e.target.value)}
                    placeholder="Juan Carlos"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`lastName-${index}`}>Apellido(s)</Label>
                  <Input
                    id={`lastName-${index}`}
                    value={passenger.lastName}
                    onChange={(e) => updatePassenger(index, "lastName", e.target.value)}
                    placeholder="García Pérez"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`birthDate-${index}`}>Fecha de Nacimiento</Label>
                  <Input
                    id={`birthDate-${index}`}
                    type="date"
                    value={passenger.birthDate}
                    onChange={(e) => updatePassenger(index, "birthDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`passportNumber-${index}`}>Número de Pasaporte</Label>
                  <Input
                    id={`passportNumber-${index}`}
                    value={passenger.passportNumber}
                    onChange={(e) => updatePassenger(index, "passportNumber", e.target.value)}
                    placeholder="A12345678"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`email-${index}`}>Correo Electrónico</Label>
                  <Input
                    id={`email-${index}`}
                    type="email"
                    value={passenger.email}
                    onChange={(e) => updatePassenger(index, "email", e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`phone-${index}`}>Teléfono de Contacto</Label>
                  <Input
                    id={`phone-${index}`}
                    type="tel"
                    value={passenger.phone}
                    onChange={(e) => updatePassenger(index, "phone", e.target.value)}
                    placeholder="+58 412 1234567"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addPassenger} className="w-full bg-transparent">
            <Plus className="mr-2 h-4 w-4" />
            Agregar Otro Pasajero
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" size="lg" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Atrás
        </Button>
        <Button size="lg" onClick={handleNext}>
          Comprar
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
