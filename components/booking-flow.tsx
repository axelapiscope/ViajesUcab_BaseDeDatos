"use client"

import { useState } from "react"
import { Check, Globe, Users, CreditCard, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { SeatSelection } from "@/components/booking/seat-selection"
import { PassengerInfo } from "@/components/booking/passenger-info"
import { PaymentStep } from "@/components/booking/payment-step"
import { ConfirmationStep } from "@/components/booking/confirmation-step"

const steps = [
  { id: 1, name: "Selección", icon: Globe },
  { id: 2, name: "Pasajeros", icon: Users },
  { id: 3, name: "Pago", icon: CreditCard },
  { id: 4, name: "Confirmación", icon: CheckCircle2 },
]

const allServices = [
  { id: 1, type: "vuelos" },
  { id: 2, type: "vuelos" },
  { id: 3, type: "cruceros" },
  { id: 4, type: "traslados" },
  { id: 5, type: "hoteles" },
  { id: 6, type: "hoteles" },
  { id: 7, type: "hoteles" },
  { id: 8, type: "paquetes", transportType: "vuelos" },
  { id: 9, type: "paquetes", transportType: "vuelos" },
  { id: 10, type: "paquetes", transportType: "vuelos" },
  { id: 11, type: "traslados" },
  { id: 12, type: "traslados" },
  { id: 13, type: "traslados" },
  { id: 14, type: "traslados" },
  { id: 15, type: "trenes" },
  { id: 16, type: "trenes" },
  { id: 17, type: "trenes" },
  { id: "quince-1", type: "paquetes", transportType: "vuelos" },
  { id: "quince-2", type: "paquetes", transportType: "vuelos" },
  { id: "quince-3", type: "paquetes", transportType: "vuelos" },
  { id: "honeymoon-1", type: "paquetes", transportType: "vuelos" },
  { id: "honeymoon-2", type: "paquetes", transportType: "cruceros" },
  { id: "honeymoon-3", type: "paquetes", transportType: "vuelos" },
]

interface BookingFlowProps {
  serviceId: string
}

export function BookingFlow({ serviceId }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<any>({
    serviceId,
    passengers: [],
    seatSelection: {},
    additionalServices: [],
    payment: {},
  })

  const service = allServices.find((s) => String(s.id) === String(serviceId))
  const serviceType = service?.type || "vuelos"
  const transportType = service?.transportType || serviceType

  const updateBookingData = (data: any) => {
    setBookingData((prev: any) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = currentStep > step.id
              const isCurrent = currentStep === step.id

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                        isCompleted && "bg-primary text-primary-foreground",
                        isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                        !isCompleted && !isCurrent && "bg-muted text-muted-foreground",
                      )}
                    >
                      {isCompleted ? <Check className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                    </div>
                    <span
                      className={cn(
                        "mt-2 text-sm font-medium",
                        (isCompleted || isCurrent) && "text-foreground",
                        !isCompleted && !isCurrent && "text-muted-foreground",
                      )}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn("h-1 flex-1 mx-4 transition-all", isCompleted ? "bg-primary" : "bg-muted")} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <div>
          {currentStep === 1 && (
            <SeatSelection
              serviceId={serviceId}
              bookingData={bookingData}
              updateBookingData={updateBookingData}
              onNext={nextStep}
              serviceType={transportType}
            />
          )}
          {currentStep === 2 && (
            <PassengerInfo
              bookingData={bookingData}
              updateBookingData={updateBookingData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 3 && (
            <PaymentStep
              bookingData={bookingData}
              updateBookingData={updateBookingData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 4 && <ConfirmationStep bookingData={bookingData} serviceType={serviceType} />}
        </div>
      </div>
    </div>
  )
}
