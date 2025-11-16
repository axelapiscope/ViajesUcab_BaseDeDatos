"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export interface WishlistItem {
  id: number
  title: string
  location: string
  price: number
  image: string
  type: "hotel" | "flight" | "cruise" | "tour" | "package" | "restaurant"
  addedAt: string
  originalPrice?: number
}

interface WishlistContextType {
  items: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
  totalItems: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const checkPriceDrops = () => {
      items.forEach((item) => {
        if (item.originalPrice && item.price < item.originalPrice) {
          const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
          toast({
            title: "¡Bajó el precio!",
            description: `${item.title} ahora tiene ${discount}% de descuento`,
            duration: 5000,
          })
        }
      })
    }

    // Check for price drops every 30 seconds (in production, this would be server-side)
    const interval = setInterval(checkPriceDrops, 30000)
    return () => clearInterval(interval)
  }, [items, toast])

  const addToWishlist = (item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      if (exists) {
        toast({
          title: "Ya está en tu lista",
          description: "Este artículo ya fue agregado a tu lista de deseos",
          variant: "destructive",
        })
        return prev
      }
      toast({
        title: "Agregado a lista de deseos",
        description: "Te notificaremos cuando baje el precio",
      })
      return [...prev, { ...item, addedAt: new Date().toISOString() }]
    })
  }

  const removeFromWishlist = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Eliminado de lista de deseos",
      description: "El artículo se eliminó de tu lista",
    })
  }

  const isInWishlist = (id: number) => {
    return items.some((item) => item.id === id)
  }

  const totalItems = items.length

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, totalItems }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider")
  }
  return context
}
