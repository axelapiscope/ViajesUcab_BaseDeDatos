"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface ItineraryItem {
  id: string
  type: "destination" | "transport" | "accommodation" | "activity"
  title: string
  description: string
  date: string
  price: number
  location?: string
  companyName?: string
  selectedSeat?: string
  selectedCabin?: string
  selectedRoom?: string
}

interface SavedItinerary {
  id: string
  name: string
  startDate?: string
  endDate?: string
  items: ItineraryItem[]
  totalPrice: number
  createdAt: string
}

interface ItineraryContextType {
  savedItineraries: SavedItinerary[]
  addItinerary: (itinerary: SavedItinerary) => void
  deleteItinerary: (id: string) => void
  clearItineraries: () => void
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined)

export function ItineraryProvider({ children }: { children: ReactNode }) {
  const [savedItineraries, setSavedItineraries] = useState<SavedItinerary[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    console.log("[v0] Loading itineraries from localStorage")
    const stored = localStorage.getItem("savedItineraries")
    console.log("[v0] Stored data:", stored)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        console.log("[v0] Parsed itineraries:", parsed)
        setSavedItineraries(parsed)
      } catch (e) {
        console.error("[v0] Error loading itineraries:", e)
        setSavedItineraries([])
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      console.log("[v0] Saving itineraries to localStorage:", savedItineraries)
      try {
        localStorage.setItem("savedItineraries", JSON.stringify(savedItineraries))
        console.log("[v0] Successfully saved to localStorage")
      } catch (e) {
        console.error("[v0] Error saving itineraries:", e)
      }
    }
  }, [savedItineraries, isLoaded])

  const addItinerary = (itinerary: SavedItinerary) => {
    console.log("[v0] addItinerary called with:", itinerary)
    setSavedItineraries((prev) => {
      console.log("[v0] Previous itineraries:", prev)
      const updated = [...prev, itinerary]
      console.log("[v0] Updated itineraries:", updated)
      return updated
    })
  }

  const deleteItinerary = (id: string) => {
    console.log("[v0] deleteItinerary called with id:", id)
    setSavedItineraries((prev) => prev.filter((it) => it.id !== id))
  }

  const clearItineraries = () => {
    console.log("[v0] clearItineraries called")
    setSavedItineraries([])
  }

  return (
    <ItineraryContext.Provider value={{ savedItineraries, addItinerary, deleteItinerary, clearItineraries }}>
      {children}
    </ItineraryContext.Provider>
  )
}

export function useItinerary() {
  const context = useContext(ItineraryContext)
  if (context === undefined) {
    throw new Error("useItinerary must be used within an ItineraryProvider")
  }
  return context
}
