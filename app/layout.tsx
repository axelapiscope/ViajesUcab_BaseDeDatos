import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { CurrencyProvider } from "@/lib/currency-context"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { ItineraryProvider } from "@/lib/itinerary-context"
import { UserProvider } from "@/lib/user-context"
import { PurchaseHistoryProvider } from "@/lib/purchase-history-context"
import { ClaimsProvider } from "@/lib/claims-context"
import { NotificationsProvider } from "@/lib/notifications-context"
import { Header } from "@/components/header"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "ViajesUCAB - Compara y Ahorra en tus Viajes",
  description: "Encuentra las mejores ofertas en hoteles, vuelos, cruceros y paquetes turísticos",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-background">
        <UserProvider>
          <PurchaseHistoryProvider>
            <ClaimsProvider>
              <NotificationsProvider>
                <CurrencyProvider>
                  <CartProvider>
                    <WishlistProvider>
                      <ItineraryProvider>
                        <Header />
                        {children}
                        <Toaster />
                      </ItineraryProvider>
                    </WishlistProvider>
                  </CartProvider>
                </CurrencyProvider>
              </NotificationsProvider>
            </ClaimsProvider>
          </PurchaseHistoryProvider>
        </UserProvider>
      </body>
    </html>
  )
}
