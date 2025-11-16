"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Currency = "USD" | "BS" | "EUR"

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  convertPrice: (usdPrice: number) => { value: number; symbol: string; code: Currency }
  formatPrice: (usdPrice: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

const EXCHANGE_RATES = {
  USD: 1,
  BS: 36.5, // Bolívar rate (example)
  EUR: 0.92, // Euro rate (example)
}

const CURRENCY_SYMBOLS = {
  USD: "$",
  BS: "Bs.",
  EUR: "€",
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD")

  const convertPrice = (usdPrice: number) => {
    const rate = EXCHANGE_RATES[currency]
    const value = Math.round(usdPrice * rate)
    return {
      value,
      symbol: CURRENCY_SYMBOLS[currency],
      code: currency,
    }
  }

  const formatPrice = (usdPrice: number) => {
    const converted = convertPrice(usdPrice)
    return `${converted.symbol}${converted.value.toLocaleString()}`
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
