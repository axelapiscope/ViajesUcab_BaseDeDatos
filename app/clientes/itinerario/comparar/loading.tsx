import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-12 w-96 mb-2" />
        <Skeleton className="h-6 w-[500px] mb-8" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="h-20 w-full" />
                  ))}
                </div>
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
