"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/lib/user-context"
import { usePurchaseHistory } from "@/lib/purchase-history-context"
import { useItinerary } from "@/lib/itinerary-context"
import { useCurrency } from "@/lib/currency-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  UserIcon,
  ShoppingBag,
  Award,
  Map,
  Tag,
  Calendar,
  DollarSign,
  Package,
  Plane,
  Hotel,
  Ship,
  MapPin,
  ShoppingCart,
  GitCompare,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function PerfilPage() {
  const router = useRouter()
  const { user, isAuthenticated, updateProfile } = useUser()
  const { purchases, getTotalSpent, getTotalMilesEarned } = usePurchaseHistory()
  const { savedItineraries } = useItinerary()
  const { currency, formatPrice } = useCurrency()
  const { toast } = useToast()
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (!user) {
    return null
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getItemIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="h-4 w-4" />
      case "hotel":
        return <Hotel className="h-4 w-4" />
      case "cruise":
        return <Ship className="h-4 w-4" />
      case "tour":
        return <MapPin className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  // Mock valid promotions for the user
  const validPromotions = [
    {
      id: "1",
      name: "Verano Caribeño",
      discount: 25,
      validUntil: "2025-08-31",
      destinations: ["Cancún", "Punta Cana", "Aruba"],
    },
    {
      id: "2",
      name: "Europa Express",
      discount: 15,
      validUntil: "2025-06-30",
      destinations: ["París", "Roma", "Barcelona"],
    },
  ]

  const handleEditProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    updateProfile({
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      travelDocuments: {
        venezuelanId: (formData.get("venezuelanId") as string) || undefined,
        passport: (formData.get("passport") as string) || undefined,
      },
    })
    toast({
      title: "Perfil actualizado",
      description: "Tus datos han sido actualizados exitosamente",
    })
    setEditDialogOpen(false)
  }

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                    <p className="text-muted-foreground mb-4">{user.email}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Miembro desde{" "}
                          {new Date(user.memberSince).toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{getTotalMilesEarned().toLocaleString()} Millas</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" onClick={() => setEditDialogOpen(true)}>
                      Editar Perfil
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Gastado</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(getTotalSpent())}</div>
                  <p className="text-xs text-muted-foreground">En {purchases.length} compras</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Millas Acumuladas</CardTitle>
                  <Award className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{getTotalMilesEarned().toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Disponibles para usar</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Itinerarios</CardTitle>
                  <Map className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{savedItineraries.length}</div>
                  <p className="text-xs text-muted-foreground">Guardados</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Promociones</CardTitle>
                  <Tag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{validPromotions.length}</div>
                  <p className="text-xs text-muted-foreground">Activas</p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Sections */}
            <Tabs defaultValue="info" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="info">
                  <UserIcon className="h-4 w-4 mr-2" />
                  Información
                </TabsTrigger>
                <TabsTrigger value="purchases">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Compras
                </TabsTrigger>
                <TabsTrigger value="miles">
                  <Award className="h-4 w-4 mr-2" />
                  Millas
                </TabsTrigger>
                <TabsTrigger value="itineraries">
                  <Map className="h-4 w-4 mr-2" />
                  Itinerarios
                </TabsTrigger>
                <TabsTrigger value="promotions">
                  <Tag className="h-4 w-4 mr-2" />
                  Promociones
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Tus datos de contacto y preferencias</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Nombre Completo</p>
                        <p className="text-base">{user.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Correo Electrónico</p>
                        <p className="text-base">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Teléfono</p>
                        <p className="text-base">{user.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Dirección</p>
                        <p className="text-base">{user.address}</p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Documentos de Viaje</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Cédula de Identidad</p>
                          <p className="text-base">{user.travelDocuments?.venezuelanId || "No registrada"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Pasaporte</p>
                          <p className="text-base">{user.travelDocuments?.passport || "No registrado"}</p>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Moneda Preferida</p>
                      <p className="text-base">{currency}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Purchase History Tab */}
              <TabsContent value="purchases">
                <Card>
                  <CardHeader>
                    <CardTitle>Historial de Compras</CardTitle>
                    <CardDescription>Todas tus reservas y servicios adquiridos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {purchases.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No hay compras aún</h3>
                        <p className="text-muted-foreground mb-4">Comienza a explorar nuestras ofertas</p>
                        <Button onClick={() => router.push("/")}>Ver Ofertas</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {purchases.map((purchase) => (
                          <Card key={purchase.id}>
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-base">Reserva #{purchase.reservationNumber}</CardTitle>
                                  <CardDescription>
                                    {new Date(purchase.purchaseDate).toLocaleDateString("es-ES", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })}
                                  </CardDescription>
                                </div>
                                <Badge
                                  variant={
                                    purchase.status === "completed"
                                      ? "default"
                                      : purchase.status === "pending"
                                        ? "secondary"
                                        : "destructive"
                                  }
                                >
                                  {purchase.status === "completed"
                                    ? "Completado"
                                    : purchase.status === "pending"
                                      ? "Pendiente"
                                      : "Cancelado"}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {purchase.items.map((item) => (
                                  <div key={item.id} className="flex items-center gap-3">
                                    <div className="flex-shrink-0">{getItemIcon(item.type)}</div>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium truncate">{item.title}</p>
                                      <p className="text-sm text-muted-foreground">{item.location}</p>
                                    </div>
                                    <p className="font-semibold">{formatPrice(item.price)}</p>
                                  </div>
                                ))}
                                <Separator />
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-yellow-500" />
                                    <span className="text-sm">+{purchase.milesEarned} millas ganadas</span>
                                  </div>
                                  <p className="text-lg font-bold">{formatPrice(purchase.totalPrice)}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Miles Tab */}
              <TabsContent value="miles">
                <Card>
                  <CardHeader>
                    <CardTitle>Programa de Millas</CardTitle>
                    <CardDescription>Acumula millas y obtén beneficios exclusivos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center py-8 gradient-accent/20 rounded-lg border border-accent/20">
                      <Award className="h-16 w-16 text-accent mx-auto mb-4" />
                      <p className="text-4xl font-bold mb-2 text-accent">{getTotalMilesEarned().toLocaleString()}</p>
                      <p className="text-muted-foreground">Millas Disponibles</p>
                      <Button 
                        variant="outline" 
                        className="mt-4 gradient-accent border-accent/30"
                        onClick={() => router.push("/clientes/millas")}
                      >
                        Ver Programa Completo de Millas
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Cómo funcionan las millas</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-bold text-primary">1</span>
                              </div>
                              <div>
                                <p className="font-medium mb-1">Gana Millas</p>
                                <p className="text-sm text-muted-foreground">Por cada dólar gastado, ganas 10 millas</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-bold text-primary">2</span>
                              </div>
                              <div>
                                <p className="font-medium mb-1">Canjea Millas</p>
                                <p className="text-sm text-muted-foreground">1000 millas = $10 de descuento</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {getTotalMilesEarned() >= 1000 && (
                      <div className="gradient-accent/20 border border-accent/30 rounded-lg p-4">
                        <p className="font-medium text-accent-foreground mb-2">
                          ¡Tienes millas disponibles para canjear!
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Puedes obtener hasta ${Math.floor(getTotalMilesEarned() / 100)} en descuentos
                        </p>
                        <Button 
                          size="sm" 
                          className="gradient-accent"
                          onClick={() => router.push("/clientes/millas")}
                        >
                          Canjear Millas
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Itineraries Tab */}
              <TabsContent value="itineraries">
                <Card>
                  <CardHeader>
                    <CardTitle>Itinerarios Guardados</CardTitle>
                    <CardDescription>Tus planes de viaje personalizados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {savedItineraries.length === 0 ? (
                      <div className="text-center py-12">
                        <Map className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No hay itinerarios guardados</h3>
                        <p className="text-muted-foreground mb-4">Crea tu primer itinerario personalizado</p>
                        <Button onClick={() => router.push("/itinerario")}>Crear Itinerario</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {savedItineraries.length >= 2 && (
                          <Button
                            onClick={() => router.push("/itinerario/comparar")}
                            className="w-full gap-2"
                            variant="outline"
                          >
                            <GitCompare className="h-4 w-4" />
                            Comparar Itinerarios ({savedItineraries.length})
                          </Button>
                        )}
                        {savedItineraries.map((itinerary) => (
                          <Card key={itinerary.id}>
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-base">{itinerary.name}</CardTitle>
                                  <CardDescription>
                                    {new Date(itinerary.createdAt).toLocaleDateString("es-ES", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })}
                                  </CardDescription>
                                </div>
                                <Badge>{itinerary.items.length} actividades</Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                  {itinerary.items.map((item) => item.type).join(", ")}
                                </p>
                                <p className="font-bold">{formatPrice(itinerary.totalPrice)}</p>
                              </div>
                              <Button
                                onClick={() => router.push(`/itinerario/comprar/${itinerary.id}`)}
                                className="w-full gap-2"
                              >
                                <ShoppingCart className="h-4 w-4" />
                                Comprar Itinerario
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Promotions Tab */}
              <TabsContent value="promotions">
                <Card>
                  <CardHeader>
                    <CardTitle>Promociones Válidas</CardTitle>
                    <CardDescription>Descuentos exclusivos disponibles para ti</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {validPromotions.map((promo) => (
                        <Card key={promo.id} className="border-2 border-primary/20">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <Tag className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">{promo.name}</CardTitle>
                              </div>
                              <Badge variant="secondary" className="text-lg font-bold">
                                -{promo.discount}%
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Destinos válidos:</p>
                                <div className="flex flex-wrap gap-2">
                                  {promo.destinations.map((dest) => (
                                    <Badge key={dest} variant="outline">
                                      {dest}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Button className="w-full" onClick={() => router.push("/")}>
                                Usar Promoción
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleEditProfile}>
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nombre completo</Label>
              <Input id="edit-name" name="name" type="text" defaultValue={user?.name} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Teléfono</Label>
              <Input id="edit-phone" name="phone" type="tel" defaultValue={user?.phone} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">Dirección</Label>
              <Input id="edit-address" name="address" type="text" defaultValue={user?.address} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-venezuelanId">Cédula de Identidad</Label>
              <Input
                id="edit-venezuelanId"
                name="venezuelanId"
                type="text"
                defaultValue={user?.travelDocuments?.venezuelanId}
                placeholder="V-12345678"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-passport">Pasaporte</Label>
              <Input
                id="edit-passport"
                name="passport"
                type="text"
                defaultValue={user?.travelDocuments?.passport}
                placeholder="P12345678"
              />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Guardar Cambios
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
