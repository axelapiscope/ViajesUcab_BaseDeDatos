import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ConfirmacionLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex gap-3">
                      <Skeleton className="h-10 w-32" />
                      <Skeleton className="h-10 w-32" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
