"use client"

import { createContext, useContext, useState, type ReactNode, useEffect, useCallback, useRef } from "react"
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
  const toastRef = useRef(toast)
  const itemsRef = useRef(items)

  // Keep refs updated
  useEffect(() => {
    toastRef.current = toast
    itemsRef.current = items
  }, [toast, items])

  // Check price drops in useEffect to avoid render-time state updates
  useEffect(() => {
    const checkPriceDrops = () => {
      itemsRef.current.forEach((item) => {
        if (item.originalPrice && item.price < item.originalPrice) {
          const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
          // Use setTimeout to ensure toast is called outside render cycle
          setTimeout(() => {
            toastRef.current({
              title: "¡Bajó el precio!",
              description: `${item.title} ahora tiene ${discount}% de descuento`,
              duration: 5000,
            })
          }, 0)
        }
      })
    }

    // Check for price drops every 30 seconds (in production, this would be server-side)
    const interval = setInterval(checkPriceDrops, 30000)
    return () => clearInterval(interval)
  }, []) // Remove items and toast from dependencies

  const addToWishlist = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      if (exists) {
        // Use setTimeout to ensure toast is called outside render cycle
        setTimeout(() => {
          toastRef.current({
            title: "Ya está en tu lista",
            description: "Este artículo ya fue agregado a tu lista de deseos",
            variant: "destructive",
          })
        }, 0)
        return prev
      }
      setTimeout(() => {
        toastRef.current({
          title: "Agregado a lista de deseos",
          description: "Te notificaremos cuando baje el precio",
        })
      }, 0)
      return [...prev, { ...item, addedAt: new Date().toISOString() }]
    })
  }, [])

  const removeFromWishlist = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    // Use setTimeout to ensure toast is called outside render cycle
    setTimeout(() => {
      toastRef.current({
        title: "Eliminado de lista de deseos",
        description: "El artículo se eliminó de tu lista",
      })
    }, 0)
  }, [])

  const isInWishlist = useCallback((id: number) => {
    return items.some((item) => item.id === id)
  }, [items])

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
