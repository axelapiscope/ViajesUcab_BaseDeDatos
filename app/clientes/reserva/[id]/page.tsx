import { BookingFlow } from "@/components/booking-flow"

export default function ReservaPage({ params }: { params: { id: string } }) {
  return <BookingFlow serviceId={params.id} />
}
