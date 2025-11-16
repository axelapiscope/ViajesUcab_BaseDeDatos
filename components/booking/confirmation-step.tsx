"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Download, Mail, Home } from "lucide-react"
import { useRouter } from "next/navigation"
import { BoardingPass } from "@/components/boarding-pass"
import { Invoice } from "@/components/invoice"
import { useUser } from "@/lib/user-context"
import { useToast } from "@/hooks/use-toast"
import type { CartItem } from "@/lib/cart-context"

interface ConfirmationStepProps {
  bookingData: any
  serviceType: string
}

export function ConfirmationStep({ bookingData, serviceType }: ConfirmationStepProps) {
  const router = useRouter()
  const { user } = useUser()
  const { toast } = useToast()

  const handleFinish = () => {
    router.push("/")
  }

  const handleDownload = () => {
    window.print()
  }

  const handleSendEmail = () => {
    const email = user?.email || bookingData.passengers?.[0]?.email || "cliente@example.com"
    toast({
      title: "Correo enviado exitosamente",
      description: `La factura y los boletos han sido enviados a ${email}`,
    })
  }

  const getServiceDetails = () => {
    const seatSelection = bookingData.seatSelection || {}

    switch (serviceType) {
      case "vuelos":
        return {
          number: "AV147",
          from: "CARACAS",
          to: "MIAMI",
          date: "15 ENE 2025",
          seat: seatSelection.seat || "1A",
          gate: "A12",
          boardingTime: "08:00",
        }
      case "cruceros":
        return {
          number: "RC2025",
          from: "MIAMI",
          to: "BAHAMAS",
          date: "20 ENE 2025",
          cabin: `${seatSelection.cabinNumber || "101"}`,
          embarkationPort: "Puerto de Miami - Terminal 3",
          boardingTime: "14:00",
        }
      case "traslados":
        return {
          number: "TR456",
          from: "CARACAS",
          to: "MÉRIDA",
          date: "18 ENE 2025",
          seat: seatSelection.seat || "1A",
          station: "Estación Central",
          boardingTime: "09:30",
        }
      case "hoteles":
        return {
          number: "HTL789",
          from: "HOTEL",
          to: "PARADISE",
          date: "22 ENE 2025",
          room: seatSelection.room || "Suite",
          boardingTime: "15:00",
        }
      default:
        return {
          number: "SRV001",
          from: "ORIGEN",
          to: "DESTINO",
          date: "01 ENE 2025",
          seat: "1A",
          gate: "A1",
          boardingTime: "10:00",
        }
    }
  }

  const getCompanyName = () => {
    switch (serviceType) {
      case "vuelos":
        return "Avior Airlines"
      case "cruceros":
        return "Caribbean Cruise Lines"
      case "traslados":
        return "ViajesUCAB Transport"
      case "hoteles":
        return "Hotel Paradise International"
      default:
        return "ViajesUCAB Services"
    }
  }

  const getServiceTitle = () => {
    const details = getServiceDetails()
    switch (serviceType) {
      case "vuelos":
        return `Vuelo ${details.from} - ${details.to}`
      case "cruceros":
        return `Crucero ${details.from} - ${details.to}`
      case "traslados":
        return `Traslado ${details.from} - ${details.to}`
      case "hoteles":
        return `Hotel ${details.to}`
      default:
        return "Servicio de Viaje"
    }
  }

  const getServicePrice = () => {
    switch (serviceType) {
      case "vuelos":
        return 450
      case "cruceros":
        return 1200
      case "traslados":
        return 85
      case "hoteles":
        return 180
      default:
        return 100
    }
  }

  const passengers = bookingData.passengers || [{ firstName: "Juan", lastName: "Pérez", passportNumber: "A12345678" }]
  const serviceDetails = getServiceDetails()
  const reservationNumber = `VU${Math.random().toString(36).substring(2, 10).toUpperCase()}`

  const invoiceItems: CartItem[] = passengers.map((passenger: any, index: number) => ({
    id: `${serviceType}-${index}`,
    type: serviceType as any,
    title: getServiceTitle(),
    location: `${serviceDetails.from} - ${serviceDetails.to}`,
    price: getServicePrice(),
    image: "",
    companyName: getCompanyName(),
  }))

  const customerInfo = {
    name: user?.name || `${passengers[0].firstName} ${passengers[0].lastName}`,
    email: user?.email || passengers[0].email || "cliente@example.com",
    phone: user?.phone || passengers[0].phone || "+58 212-555-0100",
    address: user?.address || "Caracas, Venezuela",
    passport: user?.travelDocuments?.passport || passengers[0].passportNumber || "N/A",
  }

  const totalPrice = invoiceItems.reduce((sum, item) => sum + item.price, 0)
  const purchaseDate = new Date().toISOString()

  return (
    <div className="space-y-8">
      <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">¡Reserva Confirmada!</h2>
          <p className="text-muted-foreground">
            Tu reserva ha sido procesada exitosamente. Hemos generado tus boletos y factura.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="invoice" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 h-14 bg-muted">
              <TabsTrigger
                value="invoice"
                className="text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                🧾 Factura
              </TabsTrigger>
              <TabsTrigger
                value="tickets"
                className="text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                🎫 Boletos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="invoice" className="space-y-6 mt-6">
              <Invoice
                items={invoiceItems}
                customerInfo={customerInfo}
                reservationNumber={reservationNumber}
                purchaseDate={purchaseDate}
                totalPrice={totalPrice}
                onDownload={handleDownload}
                onEmail={handleSendEmail}
              />
            </TabsContent>

            <TabsContent value="tickets" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Tus Boletos</h3>
                    <p className="text-muted-foreground">Descarga o imprime tus boletos de viaje</p>
                  </div>
                </div>
                {passengers.map((passenger: any, index: number) => {
                  const passengerServiceDetails = {
                    ...serviceDetails,
                    seat: serviceDetails.seat ? `${index + 1}A` : undefined,
                  }

                  return (
                    <BoardingPass
                      key={index}
                      passenger={{
                        name: `${passenger.firstName} ${passenger.lastName}`,
                        passportNumber: passenger.passportNumber,
                      }}
                      serviceType={serviceType}
                      serviceDetails={passengerServiceDetails}
                      reservationNumber={reservationNumber}
                    />
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" variant="outline" onClick={handleDownload} className="gap-2 bg-transparent">
          <Download className="h-5 w-5" />
          Descargar Boletos
        </Button>
        <Button size="lg" variant="outline" onClick={handleSendEmail} className="gap-2 bg-transparent">
          <Mail className="h-5 w-5" />
          Enviar por Correo
        </Button>
        <Button size="lg" onClick={handleFinish} className="gap-2">
          <Home className="h-5 w-5" />
          Finalizar
        </Button>
      </div>
    </div>
  )
}
