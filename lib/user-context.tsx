"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "admin" | "proveedor" | "cliente"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  address: string
  role: UserRole
  memberSince: string
  avatar?: string
  travelDocuments?: {
    venezuelanId?: string
    passport?: string
  }
  carbonCompensations?: {
    count: number
    totalAmount: number
    history: Array<{
      date: string
      amount: number
      kgCO2: number
      serviceType: string
    }>
  }
}

interface UserContextType {
  user: User | null
  isAuthenticated: boolean
  login: (
    email: string,
    password: string,
    role?: UserRole,
    name?: string,
    phone?: string,
    address?: string,
    travelDocuments?: { venezuelanId?: string; passport?: string },
  ) => void
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  hasRole: (role: UserRole | UserRole[]) => boolean
  canAccess: (path: string) => boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Error loading user:", e)
      }
    }
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user))
    } else {
      localStorage.removeItem("currentUser")
    }
  }, [user])

  const login = (
    email: string,
    password: string,
    role: UserRole = "cliente",
    name?: string,
    phone?: string,
    address?: string,
    travelDocuments?: { venezuelanId?: string; passport?: string },
  ) => {
    // Validate email and password are provided
    if (!email || !password) {
      throw new Error("Email y contraseña son requeridos")
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error("Email inválido")
    }

    // Validate password length
    if (password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres")
    }

    // Mock authentication - in production, this would call an API
    // For now, we'll create a user if credentials are valid
    const newUser: User = {
      id: Date.now().toString(),
      name: name || "Usuario ViajesUCAB",
      email,
      phone: phone || "+58 412-555-0100",
      address: address || "Caracas, Venezuela",
      role,
      memberSince: new Date().toISOString(),
      travelDocuments: travelDocuments || {},
      carbonCompensations: {
        count: 0,
        totalAmount: 0,
        history: [],
      },
    }
    setUser(newUser)
  }

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false
    if (Array.isArray(role)) {
      return role.includes(user.role)
    }
    return user.role === role
  }

  const canAccess = (path: string): boolean => {
    if (!user) return false
    
    // Admin puede acceder a todo
    if (user.role === "admin") return true
    
    // Rutas públicas
    if (path.startsWith("/auth") || path === "/") return true
    
    // Cliente solo puede acceder a rutas de clientes
    if (user.role === "cliente") {
      return path.startsWith("/clientes") || !path.startsWith("/admin") && !path.startsWith("/proveedores")
    }
    
    // Proveedor solo puede acceder a rutas de proveedores
    if (user.role === "proveedor") {
      return path.startsWith("/proveedores")
    }
    
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates })
    }
  }

  return (
    <UserContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateProfile, hasRole, canAccess }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within UserProvider")
  }
  return context
}
