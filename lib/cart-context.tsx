"use client"

import { createContext, useContext, useState, type ReactNode, useCallback, useRef, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export interface CartItem {
  id: number
  title: string
  location: string
  price: number
  image: string
  type: "hotel" | "flight" | "cruise" | "tour" | "package"
  dates?: { checkIn: string; checkOut: string }
  guests?: number
  companyName?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()
  const toastRef = useRef(toast)

  // Keep toast ref updated
  useEffect(() => {
    toastRef.current = toast
  }, [toast])

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cartItems")
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch (e) {
        console.error("Error loading cart:", e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(items))
    } else {
      localStorage.removeItem("cartItems")
    }
  }, [items])

  const addToCart = useCallback((item: CartItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      if (exists) {
        setTimeout(() => {
          toastRef.current({
            title: "Ya está en el carrito",
            description: "Este artículo ya fue agregado anteriormente",
            variant: "destructive",
          })
        }, 0)
        return prev
      }
      setTimeout(() => {
        toastRef.current({
          title: "Agregado al carrito",
          description: `${item.title} se agregó a tu carrito`,
        })
      }, 0)
      return [...prev, item]
    })
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    setTimeout(() => {
      toastRef.current({
        title: "Eliminado del carrito",
        description: "El artículo se eliminó de tu carrito",
      })
    }, 0)
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setTimeout(() => {
      toastRef.current({
        title: "Carrito vaciado",
        description: "Todos los artículos fueron eliminados",
      })
    }, 0)
  }, [])

  const totalItems = items.length
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
