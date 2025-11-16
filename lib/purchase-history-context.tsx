"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItem } from "./cart-context"

export interface Purchase {
  id: string
  reservationNumber: string
  items: CartItem[]
  totalPrice: number
  purchaseDate: string
  status: "completed" | "pending" | "cancelled"
  milesEarned: number
}

interface PurchaseHistoryContextType {
  purchases: Purchase[]
  addPurchase: (purchase: Purchase) => void
  getTotalSpent: () => number
  getTotalMilesEarned: () => number
}

const PurchaseHistoryContext = createContext<PurchaseHistoryContextType | undefined>(undefined)

export function PurchaseHistoryProvider({ children }: { children: ReactNode }) {
  const [purchases, setPurchases] = useState<Purchase[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("purchaseHistory")
    if (stored) {
      try {
        setPurchases(JSON.parse(stored))
      } catch (e) {
        console.error("Error loading purchase history:", e)
      }
    }
  }, [])

  // Save to localStorage whenever purchases change
  useEffect(() => {
    localStorage.setItem("purchaseHistory", JSON.stringify(purchases))
  }, [purchases])

  const addPurchase = (purchase: Purchase) => {
    setPurchases((prev) => [purchase, ...prev])
  }

  const getTotalSpent = () => {
    return purchases.reduce((sum, purchase) => sum + purchase.totalPrice, 0)
  }

  const getTotalMilesEarned = () => {
    return purchases.reduce((sum, purchase) => sum + purchase.milesEarned, 0)
  }

  return (
    <PurchaseHistoryContext.Provider value={{ purchases, addPurchase, getTotalSpent, getTotalMilesEarned }}>
      {children}
    </PurchaseHistoryContext.Provider>
  )
}

export function usePurchaseHistory() {
  const context = useContext(PurchaseHistoryContext)
  if (!context) {
    throw new Error("usePurchaseHistory must be used within PurchaseHistoryProvider")
  }
  return context
}
