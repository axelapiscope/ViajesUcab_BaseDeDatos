import { Header } from "@/components/header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CheckoutLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-10 w-64 mb-8" />
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-32 w-full" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
