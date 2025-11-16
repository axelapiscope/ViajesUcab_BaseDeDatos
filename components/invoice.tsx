"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Mail, Plane } from "lucide-react"
import type { CartItem } from "@/lib/cart-context"
import { useCurrency } from "@/lib/currency-context"

interface InvoiceProps {
  items: CartItem[]
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
    passport?: string
  }
  reservationNumber: string
  purchaseDate: string
  totalPrice: number
  onDownload?: () => void
  onEmail?: () => void
}

export function Invoice({
  items,
  customerInfo,
  reservationNumber,
  purchaseDate,
  totalPrice,
  onDownload,
  onEmail,
}: InvoiceProps) {
  const { convertPrice, selectedCurrency } = useCurrency()

  const getCompanyName = (item: CartItem) => {
    if (item.companyName) return item.companyName

    switch (item.type) {
      case "flight":
        return "Avior Airlines"
      case "cruise":
        return "Caribbean Cruise Lines"
      case "hotel":
        return "Hotel Group International"
      case "tour":
        return "ViajesUCAB Tours"
      default:
        return "ViajesUCAB Services"
    }
  }

  const subtotal = totalPrice || 0
  const shipping = 0
  const taxRate = 0.16
  const taxes = subtotal * taxRate
  const total = subtotal + shipping + taxes

  const formatPrice = (amount: number) => {
    try {
      const converted = convertPrice(amount)
      return `${converted.symbol} ${converted.value.toFixed(2)}`
    } catch (error) {
      return `$ ${amount.toFixed(2)}`
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    } catch (error) {
      return dateString
    }
  }

  return (
    <Card className="overflow-hidden bg-white shadow-lg max-w-4xl mx-auto print:shadow-none">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 border-b-2 border-slate-200">
        <div className="flex items-start justify-between mb-8">
          {/* Logo and Company Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center p-3">
              <Plane className="w-full h-full text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                VIAJES<span className="text-yellow-500">UCAB</span>
              </h1>
              <p className="text-sm text-slate-600">+58 (212) 789-789</p>
              <p className="text-sm text-slate-600">viajesucab@mail.com</p>
              <p className="text-sm text-slate-600">www.viajesucab.com</p>
            </div>
          </div>

          {/* Invoice Title and Number */}
          <div className="text-right">
            <h2 className="text-4xl font-bold text-yellow-500 mb-2">INVOICE</h2>
            <p className="text-lg font-bold text-slate-800">#{reservationNumber}</p>
            <p className="text-sm text-slate-600">{formatDate(purchaseDate)}</p>
          </div>
        </div>

        {/* Billing Information */}
        <div className="bg-white border-l-4 border-yellow-500 p-4 rounded shadow-sm">
          <p className="text-xs font-semibold text-slate-500 mb-2">Billing to:</p>
          <p className="font-bold text-lg text-slate-800">{customerInfo.name}</p>
          <p className="text-sm text-slate-600">{customerInfo.address}</p>
          <p className="text-sm text-slate-600">Phone: {customerInfo.phone}</p>
          <p className="text-sm text-slate-600">Email: {customerInfo.email}</p>
          {customerInfo.passport && <p className="text-sm text-slate-600">Passport: {customerInfo.passport}</p>}
        </div>
      </div>

      {/* Items Table */}
      <div className="p-8">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-700 text-white">
              <th className="text-left py-3 px-4 font-semibold text-sm">Product</th>
              <th className="text-right py-3 px-4 font-semibold text-sm">Price</th>
              <th className="text-center py-3 px-4 font-semibold text-sm">Qty</th>
              <th className="text-right py-3 px-4 font-semibold text-sm">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id || index} className="border-b border-slate-200">
                <td className="py-4 px-4">
                  <p className="font-medium text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500">{getCompanyName(item)}</p>
                  <p className="text-xs text-slate-500">{item.location}</p>
                </td>
                <td className="text-right py-4 px-4 text-slate-700">{formatPrice(item.price)}</td>
                <td className="text-center py-4 px-4 text-slate-700">1</td>
                <td className="text-right py-4 px-4 font-semibold text-slate-800">{formatPrice(item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary Section */}
        <div className="mt-8 flex flex-col lg:flex-row justify-between items-start gap-6">
          {/* Notes Section */}
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-slate-700 mb-2">Notes:</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Gracias por confiar en ViajesUCAB para sus servicios de viaje. Esta factura incluye todos los servicios
              contratados. Para cualquier consulta, no dude en contactarnos.
            </p>

            <div className="mt-6">
              <p className="font-semibold text-slate-700 mb-2">Payment Info:</p>
              <p className="text-sm text-slate-600">Name: ViajesUCAB</p>
              <p className="text-sm text-slate-600">Bank Account: 0123 456 7890</p>
            </div>
          </div>

          {/* Totals Section */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-slate-800 font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Shipping</span>
                <span className="text-slate-800 font-medium">{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Tax Rate (16%)</span>
                <span className="text-slate-800 font-medium">{formatPrice(taxes)}</span>
              </div>
              <div className="bg-yellow-500 text-white py-3 px-4 rounded flex justify-between items-center mt-4">
                <span className="font-bold text-lg">TOTAL</span>
                <span className="font-bold text-2xl">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="font-semibold text-slate-700 mb-2 text-sm">TERMS & CONDITIONS:</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Esta factura es válida como comprobante de pago. Los servicios están sujetos a disponibilidad. Las
            cancelaciones deben realizarse con al menos 48 horas de anticipación para obtener un reembolso completo.
            Para consultas, contacte a soporte@viajesucab.com. Todos los precios incluyen impuestos aplicables.
          </p>
        </div>
      </div>

      {/* Decorative Footer */}
      <div className="relative h-32 overflow-hidden print:hidden">
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 L0,120 L1200,120 L1200,0 L900,60 L600,20 L300,80 L0,0 Z" fill="#1e40af" opacity="0.8" />
          <path d="M0,40 L300,100 L600,60 L900,100 L1200,40 L1200,120 L0,120 Z" fill="#3b82f6" opacity="0.6" />
          <path d="M0,80 L400,100 L800,70 L1200,90 L1200,120 L0,120 Z" fill="#eab308" opacity="0.7" />
        </svg>
      </div>

      {/* Action Buttons */}
      {(onDownload || onEmail) && (
        <div className="bg-slate-50 p-4 flex justify-center gap-3 border-t print:hidden">
          {onDownload && (
            <Button onClick={onDownload} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4" />
              Descargar Factura
            </Button>
          )}
          {onEmail && (
            <Button onClick={onEmail} variant="outline" className="gap-2 bg-white hover:bg-slate-50">
              <Mail className="h-4 w-4" />
              Enviar por Email
            </Button>
          )}
        </div>
      )}
    </Card>
  )
}
