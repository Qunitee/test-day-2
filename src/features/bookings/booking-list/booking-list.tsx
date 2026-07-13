import { BookingCard } from '@/features/bookings/booking-list/booking-card.tsx'
import type { BookingListProps } from '@/features/bookings/booking-list/booking-list-props.ts'

export function BookingList({ roomId, bookings, isAdmin }: BookingListProps) {
  if (bookings.length === 0) {
    return <p className="text-sm text-muted-foreground">No bookings yet.</p>
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {bookings.map(booking => (
        <BookingCard
          key={booking.id}
          booking={booking}
          roomId={roomId}
          existingBookings={bookings}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  )
}
