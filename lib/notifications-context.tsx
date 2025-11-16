"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Notification {
  id: string
  title: string
  message: string
  type: "offer" | "package" | "promotion" | "expiring" | "low-stock"
  timestamp: string
  read: boolean
  link?: string
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Nueva oferta en vuelos",
      message: "Vuelos a Miami con 40% de descuento. ¡Solo por hoy!",
      type: "offer",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      read: false,
      link: "/vuelos",
    },
    {
      id: "2",
      title: "Paquete especial disponible",
      message: "Nuevo paquete todo incluido a Cancún desde $899",
      type: "package",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      read: false,
      link: "/paquetes",
    },
    {
      id: "3",
      title: "¡Descuento por agotarse!",
      message: "Solo quedan 3 habitaciones con 50% OFF en Hotel Margarita",
      type: "expiring",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      read: false,
      link: "/hoteles",
    },
    {
      id: "4",
      title: "Últimos cupos disponibles",
      message: "Crucero por el Caribe - Solo 5 cabinas disponibles",
      type: "low-stock",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      read: true,
      link: "/cruceros",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error("useNotifications must be used within NotificationsProvider")
  }
  return context
}
