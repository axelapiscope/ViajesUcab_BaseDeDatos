"use client"

import { HeroSearch } from "@/components/hero-search"
import { ExploreServices } from "@/components/explore-services"
import { RestaurantsSection } from "@/components/restaurants-section"
import { RestaurantDetail } from "@/components/restaurant-detail"
import { SpecialPackagesSection } from "@/components/special-packages-section"
import { Benefits } from "@/components/benefits"
import { FeaturedOffers } from "@/components/featured-offers"
import { Footer } from "@/components/footer"
import { useState } from "react"

type Restaurant = {
  id: number
  name: string
  city: string
  country: string
  location: string
  cuisine: string
  atmosphere: string
  rating: number
  reviews: number
  priceRange: string
  specialties: string[]
  image: string
  description: string
  hours: string
  phone: string
  website: string
  bestDishes: Array<{
    name: string
    description: string
    price: string
  }>
  customerReviews: Array<{
    author: string
    rating: number
    comment: string
    date: string
  }>
  photos: string[]
}

export default function ClientesHomePage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)

  if (selectedRestaurant) {
    return (
      <div className="min-h-screen bg-background">
        <RestaurantDetail restaurant={selectedRestaurant} onBack={() => setSelectedRestaurant(null)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSearch />
        <ExploreServices />
        <RestaurantsSection onSelectRestaurant={setSelectedRestaurant} />
        <SpecialPackagesSection />
        <Benefits />
        <FeaturedOffers />
      </main>
      <Footer />
    </div>
  )
}

