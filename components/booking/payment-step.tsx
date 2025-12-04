"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, ArrowLeft, CreditCard, Smartphone, Building2, Bitcoin, FileText, Wallet } from "lucide-react"

interface PaymentStepProps {
  bookingData: any
  updateBookingData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function PaymentStep({ bookingData, updateBookingData, onNext, onBack }: PaymentStepProps) {
  const [paymentMethod1, setPaymentMethod1] = useState("")
  const [paymentMethod2, setPaymentMethod2] = useState("")
  const [useSplitPayment, setUseSplitPayment] = useState(false)
  const [paymentDetails1, setPaymentDetails1] = useState<any>({})
  const [paymentDetails2, setPaymentDetails2] = useState<any>({})
  const [amount1, setAmount1] = useState("")
  const [amount2, setAmount2] = useState("")

  // Calculate total from booking data
  const basePrice = bookingData?.service?.price || 450
  const additionalServicesCost = bookingData?.additionalServices?.services?.length 
    ? (bookingData.additionalServices.services.includes("seguro") ? 45 : 0) +
      (bookingData.additionalServices.services.includes("comida-especial") ? 20 : 0) +
      ((bookingData.additionalServices?.extraLuggage || 0) * 30)
    : 0
  const taxes = (basePrice + additionalServicesCost) * 0.16
  const totalAmount = basePrice + additionalServicesCost + taxes

  const handleNext = () => {
    updateBookingData({
      payment: {
        splitPayment: useSplitPayment,
        method1: paymentMethod1,
        details1: paymentDetails1,
        amount1: amount1,
        method2: useSplitPayment ? paymentMethod2 : null,
        details2: useSplitPayment ? paymentDetails2 : null,
        amount2: useSplitPayment ? amount2 : null,
      },
    })
    onNext()
  }

  const updatePaymentDetail1 = (field: string, value: string) => {
    setPaymentDetails1((prev: any) => ({ ...prev, [field]: value }))
  }

  const updatePaymentDetail2 = (field: string, value: string) => {
    setPaymentDetails2((prev: any) => ({ ...prev, [field]: value }))
  }

  const renderPaymentForm = (method: string, details: any, updateDetail: (field: string, value: string) => void) => {
    switch (method) {
      case "tarjeta":
        return (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Número de Tarjeta</Label>
              <Input
                placeholder="1234 5678 9012 3456"
                value={details.cardNumber || ""}
                onChange={(e) => updateDetail("cardNumber", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CVV2/CVC2</Label>
                <Input
                  placeholder="123"
                  value={details.cvv || ""}
                  onChange={(e) => updateDetail("cvv", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha de Vencimiento</Label>
                <Input
                  placeholder="MM/AA"
                  value={details.expiry || ""}
                  onChange={(e) => updateDetail("expiry", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Nombre del Titular</Label>
              <Input
                placeholder="Juan Pérez"
                value={details.cardName || ""}
                onChange={(e) => updateDetail("cardName", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Banco Emisor</Label>
                <Input
                  placeholder="Banco Nacional"
                  value={details.bank || ""}
                  onChange={(e) => updateDetail("bank", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Emisor de la Tarjeta</Label>
                <Select value={details.issuer || ""} onValueChange={(v) => updateDetail("issuer", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visa">Visa</SelectItem>
                    <SelectItem value="mastercard">Mastercard</SelectItem>
                    <SelectItem value="amex">American Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case "cheque":
        return (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Código de Cuenta Cliente</Label>
              <Input
                placeholder="CCC-123456"
                value={details.accountCode || ""}
                onChange={(e) => updateDetail("accountCode", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Número de Cheque</Label>
              <Input
                placeholder="001234"
                value={details.checkNumber || ""}
                onChange={(e) => updateDetail("checkNumber", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Nombre del Titular</Label>
              <Input
                placeholder="Juan Pérez"
                value={details.holderName || ""}
                onChange={(e) => updateDetail("holderName", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Banco Emisor</Label>
                <Input
                  placeholder="Banco Nacional"
                  value={details.bank || ""}
                  onChange={(e) => updateDetail("bank", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha de Emisión</Label>
                <Input
                  type="date"
                  value={details.issueDate || ""}
                  onChange={(e) => updateDetail("issueDate", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case "deposito":
        return (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Número de Cuenta de Destino</Label>
              <Input
                placeholder="0123456789"
                value={details.accountNumber || ""}
                onChange={(e) => updateDetail("accountNumber", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Banco</Label>
              <Input
                placeholder="Banco Nacional"
                value={details.bank || ""}
                onChange={(e) => updateDetail("bank", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha de Transacción</Label>
                <Input
                  type="date"
                  value={details.transactionDate || ""}
                  onChange={(e) => updateDetail("transactionDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Número de Referencia</Label>
                <Input
                  placeholder="REF123456"
                  value={details.referenceNumber || ""}
                  onChange={(e) => updateDetail("referenceNumber", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case "transferencia":
        return (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Número de Referencia o Confirmación</Label>
              <Input
                placeholder="REF123456789"
                value={details.referenceNumber || ""}
                onChange={(e) => updateDetail("referenceNumber", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha de Operación</Label>
                <Input
                  type="date"
                  value={details.operationDate || ""}
                  onChange={(e) => updateDetail("operationDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Hora de Operación</Label>
                <Input
                  type="time"
                  value={details.operationTime || ""}
                  onChange={(e) => updateDetail("operationTime", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Monto Exacto Transferido</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={details.amount || ""}
                onChange={(e) => updateDetail("amount", e.target.value)}
              />
            </div>
          </div>
        )

      case "pago-movil":
        return (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Número de Referencia o Confirmación</Label>
              <Input
                placeholder="123456789"
                value={details.referenceNumber || ""}
                onChange={(e) => updateDetail("referenceNumber", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha de Operación</Label>
                <Input
                  type="date"
                  value={details.operationDate || ""}
                  onChange={(e) => updateDetail("operationDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Hora de Operación</Label>
                <Input
                  type="time"
                  value={details.operationTime || ""}
                  onChange={(e) => updateDetail("operationTime", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Monto Exacto de la Transacción</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={details.amount || ""}
                onChange={(e) => updateDetail("amount", e.target.value)}
              />
            </div>
          </div>
        )

      case "usdt":
        return (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>ID de Transacción (TxID o Hash)</Label>
              <Input
                placeholder="0x..."
                value={details.txId || ""}
                onChange={(e) => updateDetail("txId", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha de Transacción</Label>
                <Input
                  type="date"
                  value={details.transactionDate || ""}
                  onChange={(e) => updateDetail("transactionDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Hora de Transacción</Label>
                <Input
                  type="time"
                  value={details.transactionTime || ""}
                  onChange={(e) => updateDetail("transactionTime", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Monto Exacto de USDT Enviado</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={details.amount || ""}
                onChange={(e) => updateDetail("amount", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Dirección de la Billetera del Emisor</Label>
              <Input
                placeholder="0x..."
                value={details.walletAddress || ""}
                onChange={(e) => updateDetail("walletAddress", e.target.value)}
              />
            </div>
          </div>
        )

      case "zelle":
        return (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Número de Confirmación de la Transacción</Label>
              <Input
                placeholder="ZELLE123456"
                value={details.confirmationNumber || ""}
                onChange={(e) => updateDetail("confirmationNumber", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha del Envío</Label>
                <Input
                  type="date"
                  value={details.sendDate || ""}
                  onChange={(e) => updateDetail("sendDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Hora del Envío</Label>
                <Input
                  type="time"
                  value={details.sendTime || ""}
                  onChange={(e) => updateDetail("sendTime", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Monto Enviado</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={details.amount || ""}
                onChange={(e) => updateDetail("amount", e.target.value)}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Método de Pago</CardTitle>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="split"
                    checked={useSplitPayment}
                    onCheckedChange={(checked) => setUseSplitPayment(checked as boolean)}
                  />
                  <Label htmlFor="split" className="cursor-pointer text-sm">
                    Dividir pago en dos métodos
                  </Label>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* First Payment Method */}
              <div className="space-y-4">
                <h3 className="font-semibold">{useSplitPayment ? "Primer Método de Pago" : "Método de Pago"}</h3>
                <RadioGroup value={paymentMethod1} onValueChange={setPaymentMethod1}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="tarjeta" id="tarjeta1" />
                      <Label htmlFor="tarjeta1" className="cursor-pointer flex-1 flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Tarjeta de Crédito/Débito
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="zelle" id="zelle1" />
                      <Label htmlFor="zelle1" className="cursor-pointer flex-1 flex items-center gap-2">
                        <Smartphone className="h-5 w-5" />
                        Zelle
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="pago-movil" id="pago-movil1" />
                      <Label htmlFor="pago-movil1" className="cursor-pointer flex-1 flex items-center gap-2">
                        <Smartphone className="h-5 w-5" />
                        Pago Móvil
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="transferencia" id="transferencia1" />
                      <Label htmlFor="transferencia1" className="cursor-pointer flex-1 flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Transferencia Bancaria
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="deposito" id="deposito1" />
                      <Label htmlFor="deposito1" className="cursor-pointer flex-1 flex items-center gap-2">
                        <Wallet className="h-5 w-5" />
                        Depósito Bancario
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="cheque" id="cheque1" />
                      <Label htmlFor="cheque1" className="cursor-pointer flex-1 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Cheque
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="usdt" id="usdt1" />
                      <Label htmlFor="usdt1" className="cursor-pointer flex-1 flex items-center gap-2">
                        <Bitcoin className="h-5 w-5" />
                        USDT (Criptomoneda)
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {useSplitPayment && paymentMethod1 && (
                  <div className="space-y-2">
                    <Label>Monto a Pagar con este Método</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount1}
                      onChange={(e) => setAmount1(e.target.value)}
                    />
                  </div>
                )}

                {paymentMethod1 && renderPaymentForm(paymentMethod1, paymentDetails1, updatePaymentDetail1)}
              </div>

              {/* Second Payment Method */}
              {useSplitPayment && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-semibold">Segundo Método de Pago</h3>
                    <RadioGroup value={paymentMethod2} onValueChange={setPaymentMethod2}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="tarjeta" id="tarjeta2" />
                          <Label htmlFor="tarjeta2" className="cursor-pointer flex-1 flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Tarjeta de Crédito/Débito
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="zelle" id="zelle2" />
                          <Label htmlFor="zelle2" className="cursor-pointer flex-1 flex items-center gap-2">
                            <Smartphone className="h-5 w-5" />
                            Zelle
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="pago-movil" id="pago-movil2" />
                          <Label htmlFor="pago-movil2" className="cursor-pointer flex-1 flex items-center gap-2">
                            <Smartphone className="h-5 w-5" />
                            Pago Móvil
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="transferencia" id="transferencia2" />
                          <Label htmlFor="transferencia2" className="cursor-pointer flex-1 flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            Transferencia Bancaria
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="deposito" id="deposito2" />
                          <Label htmlFor="deposito2" className="cursor-pointer flex-1 flex items-center gap-2">
                            <Wallet className="h-5 w-5" />
                            Depósito Bancario
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="cheque" id="cheque2" />
                          <Label htmlFor="cheque2" className="cursor-pointer flex-1 flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Cheque
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="usdt" id="usdt2" />
                          <Label htmlFor="usdt2" className="cursor-pointer flex-1 flex items-center gap-2">
                            <Bitcoin className="h-5 w-5" />
                            USDT (Criptomoneda)
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    {paymentMethod2 && (
                      <div className="space-y-2">
                        <Label>Monto a Pagar con este Método</Label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={amount2}
                          onChange={(e) => setAmount2(e.target.value)}
                        />
                      </div>
                    )}

                    {paymentMethod2 && renderPaymentForm(paymentMethod2, paymentDetails2, updatePaymentDetail2)}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Resumen de Compra</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Servicio</span>
                  <span className="font-medium">${basePrice.toFixed(2)}</span>
                </div>
                {additionalServicesCost > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Servicios adicionales</span>
                    <span className="font-medium">${additionalServicesCost.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Impuestos (16%)</span>
                  <span className="font-medium">${taxes.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-primary">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {useSplitPayment && (amount1 || amount2) && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">División de Pago:</p>
                    {amount1 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Método 1</span>
                        <span className="font-medium">${amount1}</span>
                      </div>
                    )}
                    {amount2 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Método 2</span>
                        <span className="font-medium">${amount2}</span>
                      </div>
                    )}
                    {amount1 && amount2 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Restante</span>
                        <span className="font-medium">
                          $
                          {Math.max(
                            0,
                            totalAmount - Number.parseFloat(amount1 || "0") - Number.parseFloat(amount2 || "0"),
                          ).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" size="lg" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Atrás
        </Button>
        <Button size="lg" onClick={handleNext} disabled={!paymentMethod1 || (useSplitPayment && !paymentMethod2)}>
          Confirmar Pago
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
