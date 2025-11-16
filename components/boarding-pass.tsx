import { Card } from "@/components/ui/card"
import { Plane, Ship, Train, Hotel } from "lucide-react"

interface BoardingPassProps {
  passenger: {
    name: string
    passportNumber: string
  }
  serviceType: string
  serviceDetails: {
    number: string
    from: string
    to: string
    date: string
    arrivalTime?: string
    arrivalDate?: string
    seat?: string
    cabin?: string
    room?: string
    gate?: string
    platform?: string
    boardingTime: string
    embarkationPort?: string
    station?: string
  }
  reservationNumber: string
}

export function BoardingPass({ passenger, serviceType, serviceDetails, reservationNumber }: BoardingPassProps) {
  const getServiceIcon = () => {
    switch (serviceType) {
      case "vuelos":
        return <Plane className="h-6 w-6" />
      case "cruceros":
        return <Ship className="h-6 w-6" />
      case "traslados":
        return <Train className="h-6 w-6" />
      case "hoteles":
        return <Hotel className="h-6 w-6" />
      default:
        return <Plane className="h-6 w-6" />
    }
  }

  const getServiceTitle = () => {
    switch (serviceType) {
      case "vuelos":
        return "BOARDING PASS"
      case "cruceros":
        return "CRUISE TICKET"
      case "traslados":
        return "TRANSFER TICKET"
      case "hoteles":
        return "HOTEL VOUCHER"
      default:
        return "BOARDING PASS"
    }
  }

  return (
    <Card className="overflow-hidden">
      <div
        className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 p-6 text-white relative"
        style={{
          backgroundImage: "url(/images/world-map-dots.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "soft-light",
          backgroundColor: "#2563eb",
        }}
      >
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div>
            <p className="text-sm opacity-90 font-semibold">{getServiceTitle()}</p>
            <p className="text-xs opacity-75">ViajesUcab</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{serviceDetails.from}</span>
            {getServiceIcon()}
            <span className="text-2xl font-bold">{serviceDetails.to}</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1">PASAJERO</p>
            <p className="font-bold text-sm">{passenger.name.toUpperCase()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {serviceType === "vuelos"
                ? "VUELO"
                : serviceType === "cruceros"
                  ? "CRUCERO"
                  : serviceType === "traslados"
                    ? "SERVICIO"
                    : "RESERVA"}
            </p>
            <p className="font-bold text-sm">{serviceDetails.number}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">FECHA</p>
            <p className="font-bold text-sm">{serviceDetails.date}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {serviceType === "cruceros" ? "CAMAROTE" : serviceType === "hoteles" ? "HABITACIÓN" : "ASIENTO"}
            </p>
            <p className="font-bold text-sm">{serviceDetails.cabin || serviceDetails.room || serviceDetails.seat}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {serviceType === "vuelos"
                ? "PUERTA"
                : serviceType === "cruceros"
                  ? "PUERTO"
                  : serviceType === "traslados"
                    ? "ESTACIÓN"
                    : "CHECK-IN"}
            </p>
            <p className="font-bold text-lg">
              {serviceDetails.gate || serviceDetails.embarkationPort || serviceDetails.station || "Recepción"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">{serviceType === "hoteles" ? "HORA" : "EMBARQUE"}</p>
            <p className="font-bold text-lg">{serviceDetails.boardingTime}</p>
          </div>
        </div>

        <div className="border-t pt-4 mb-4 bg-blue-50/50 -mx-6 px-6 py-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {serviceType === "cruceros" ? "FECHA DE LLEGADA AL PUERTO" : "HORA DE LLEGADA"}
              </p>
              <p className="font-bold text-xl text-primary">
                {serviceType === "cruceros"
                  ? serviceDetails.arrivalDate || "Por confirmar"
                  : serviceDetails.arrivalTime || "Por confirmar"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">DESTINO FINAL</p>
              <p className="font-bold text-xl">{serviceDetails.to}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">RESERVA</p>
              <p className="font-mono font-bold">{reservationNumber}</p>
            </div>
            <div className="h-16 w-16 bg-gray-200 flex items-center justify-center">
              <div className="text-xs text-center">QR</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
