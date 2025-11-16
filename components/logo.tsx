import Image from "next/image"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image src="/logo.png" alt="ViajesUcab Logo" width={40} height={40} className="w-10 h-10" />
      <span className="text-xl font-bold text-foreground">ViajesUcab</span>
    </div>
  )
}
