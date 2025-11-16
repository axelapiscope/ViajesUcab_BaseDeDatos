import { Skeleton } from "@/components/ui/skeleton"

export default function CarritoLoading() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
