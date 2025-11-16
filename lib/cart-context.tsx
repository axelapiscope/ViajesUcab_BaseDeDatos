"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
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

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      if (exists) {
        toast({
          title: "Ya está en el carrito",
          description: "Este artículo ya fue agregado anteriormente",
          variant: "destructive",
        })
        return prev
      }
      toast({
        title: "Agregado al carrito",
        description: `${item.title} se agregó a tu carrito`,
      })
      return [...prev, item]
    })
  }

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Eliminado del carrito",
      description: "El artículo se eliminó de tu carrito",
    })
  }

  const clearCart = () => {
    setItems([])
    toast({
      title: "Carrito vaciado",
      description: "Todos los artículos fueron eliminados",
    })
  }

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
