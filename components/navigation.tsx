"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Tag, DollarSign, AlertCircle } from "lucide-react"

const navItems = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Promociones", href: "/promociones", icon: Tag },
  { name: "Tasas de Cambio", href: "/tasas-cambio", icon: DollarSign },
  { name: "Reclamos", href: "/reclamos", icon: AlertCircle },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
