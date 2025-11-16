"use client"

import { BoardingPass } from "@/components/boarding-pass"
import type { CartItem } from "@/lib/cart-context"

interface TicketProps {
  item: CartItem
  customerName: string
  reservationNumber: string
  purchaseDate: string
}

export function Ticket({ item, customerName, reservationNumber, purchaseDate }: TicketProps) {
  const getServiceType = () => {
    switch (item.type) {
      case "flight":
        return "vuelos"
      case "cruise":
        return "cruceros"
      case "hotel":
        return "hoteles"
      default:
        return "traslados"
    }
  }

  const getServiceDetails = () => {
    const serviceType = getServiceType()

    // Extract origin and destination from location or title
    const [from, to] = item.location?.split(" - ") || [item.location || "ORIGEN", "DESTINO"]

    // Calculate arrival time/date based on service type
    const departureDate = item.dates?.checkIn ? new Date(item.dates.checkIn) : new Date()
    const arrivalDate = new Date(departureDate)

    if (serviceType === "vuelos") {
      arrivalDate.setHours(arrivalDate.getHours() + 3)
      const arrivalTime = arrivalDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false })

      return {
        number: `AV${Math.floor(Math.random() * 900) + 100}`,
        from: from.toUpperCase().substring(0, 15),
        to: to.toUpperCase().substring(0, 15),
        date: departureDate
          .toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })
          .toUpperCase(),
        arrivalTime: arrivalTime,
        seat: `${Math.floor(Math.random() * 30) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`,
        gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 10))}${Math.floor(Math.random() * 20) + 1}`,
        boardingTime: departureDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false }),
      }
    } else if (serviceType === "cruceros") {
      arrivalDate.setDate(arrivalDate.getDate() + 6)
      const arrivalDateStr = arrivalDate
        .toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })
        .toUpperCase()

      return {
        number: `CR${Math.floor(Math.random() * 900) + 100}`,
        from: from.toUpperCase().substring(0, 15),
        to: to.toUpperCase().substring(0, 15),
        date: departureDate
          .toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })
          .toUpperCase(),
        arrivalDate: arrivalDateStr,
        cabin: `${Math.floor(Math.random() * 200) + 100}`,
        embarkationPort: `Puerto ${from} - Terminal ${Math.floor(Math.random() * 5) + 1}`,
        boardingTime: "14:00",
      }
    } else if (serviceType === "traslados") {
      arrivalDate.setHours(arrivalDate.getHours() + 4)
      const arrivalTime = arrivalDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false })

      return {
        number: `TR${Math.floor(Math.random() * 900) + 100}`,
        from: from.toUpperCase().substring(0, 15),
        to: to.toUpperCase().substring(0, 15),
        date: departureDate
          .toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })
          .toUpperCase(),
        arrivalTime: arrivalTime,
        seat: `${Math.floor(Math.random() * 40) + 1}`,
        station: `Estación ${from}`,
        boardingTime: departureDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false }),
      }
    } else {
      return {
        number: `HT${Math.floor(Math.random() * 900) + 100}`,
        from: "HOTEL",
        to: from.toUpperCase().substring(0, 15),
        date: departureDate
          .toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })
          .toUpperCase(),
        room: `${Math.floor(Math.random() * 500) + 100}`,
        boardingTime: "15:00",
      }
    }
  }

  const serviceType = getServiceType()
  const serviceDetails = getServiceDetails()

  const getReturnServiceDetails = () => {
    const returnDate = item.dates?.checkOut ? new Date(item.dates.checkOut) : new Date()
    const returnArrivalDate = new Date(returnDate)

    if (serviceType === "vuelos") {
      returnArrivalDate.setHours(returnArrivalDate.getHours() + 3)
    } else if (serviceType === "traslados") {
      returnArrivalDate.setHours(returnArrivalDate.getHours() + 4)
    }

    return {
      ...serviceDetails,
      from: serviceDetails.to,
      to: serviceDetails.from,
      date: returnDate.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase(),
      boardingTime: returnDate.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      arrivalTime: returnArrivalDate.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      number: `${serviceDetails.number.substring(0, 2)}${Math.floor(Math.random() * 900) + 100}`,
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">✈️ VUELO DE IDA</span>
          <span className="text-muted-foreground text-sm font-medium">{serviceDetails.date}</span>
        </div>
        <BoardingPass
          passenger={{
            name: customerName,
            passportNumber: "A12345678",
          }}
          serviceType={serviceType}
          serviceDetails={serviceDetails}
          reservationNumber={reservationNumber}
        />
      </div>

      {(serviceType === "vuelos" || serviceType === "traslados") && item.dates?.checkOut && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">🔄 VUELO DE REGRESO</span>
            <span className="text-muted-foreground text-sm font-medium">
              {new Date(item.dates.checkOut)
                .toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })
                .toUpperCase()}
            </span>
          </div>
          <BoardingPass
            passenger={{
              name: customerName,
              passportNumber: "A12345678",
            }}
            serviceType={serviceType}
            serviceDetails={getReturnServiceDetails()}
            reservationNumber={reservationNumber}
          />
        </div>
      )}
    </div>
  )
}
