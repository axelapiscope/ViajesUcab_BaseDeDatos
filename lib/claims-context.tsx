"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useUser } from "./user-context"

export type ClaimStatus = "pendiente" | "en-proceso" | "resuelto" | "rechazado"

export interface Claim {
  id: string
  numeroReclamo: string
  userId: string
  categoria: string
  razon: string
  descripcion: string
  estado: ClaimStatus
  urgente: boolean
  fechaCreacion: string
  reservaRelacionada?: string
  respuestaAdmin?: string
}

interface ClaimsContextType {
  claims: Claim[]
  addClaim: (claim: Omit<Claim, "id" | "numeroReclamo" | "userId" | "estado" | "fechaCreacion">) => void
  getUserClaims: () => Claim[]
}

const ClaimsContext = createContext<ClaimsContextType | undefined>(undefined)

export function ClaimsProvider({ children }: { children: ReactNode }) {
  const [claims, setClaims] = useState<Claim[]>([])
  const { user } = useUser()

  // Load claims from localStorage on mount
  useEffect(() => {
    const storedClaims = localStorage.getItem("userClaims")
    if (storedClaims) {
      try {
        setClaims(JSON.parse(storedClaims))
      } catch (e) {
        console.error("Error loading claims:", e)
      }
    }
  }, [])

  // Save claims to localStorage whenever they change
  useEffect(() => {
    if (claims.length > 0) {
      localStorage.setItem("userClaims", JSON.stringify(claims))
    }
  }, [claims])

  const addClaim = (claimData: Omit<Claim, "id" | "numeroReclamo" | "userId" | "estado" | "fechaCreacion">) => {
    if (!user) return

    const newClaim: Claim = {
      ...claimData,
      id: Date.now().toString(),
      numeroReclamo: `REC-${new Date().getFullYear()}-${String(claims.length + 1).padStart(3, "0")}`,
      userId: user.id,
      estado: "pendiente",
      fechaCreacion: new Date().toISOString(),
    }

    setClaims((prev) => [newClaim, ...prev])
  }

  const getUserClaims = () => {
    if (!user) return []
    return claims.filter((claim) => claim.userId === user.id)
  }

  return <ClaimsContext.Provider value={{ claims, addClaim, getUserClaims }}>{children}</ClaimsContext.Provider>
}

export function useClaims() {
  const context = useContext(ClaimsContext)
  if (!context) {
    throw new Error("useClaims must be used within ClaimsProvider")
  }
  return context
}
