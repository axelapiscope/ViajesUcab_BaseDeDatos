import { Header } from "@/components/header"
import { Skeleton } from "@/components/ui/skeleton"

export default function ResultadosLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <Skeleton className="h-12 w-64 mb-2" />
          <Skeleton className="h-6 w-96 mb-8" />
          <div className="grid lg:grid-cols-4 gap-8">
            <Skeleton className="h-96 lg:col-span-1" />
            <div className="lg:col-span-3 grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-96" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
