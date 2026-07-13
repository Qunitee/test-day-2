import type { BookingI } from '@/shared/models/booking/booking.model.ts'

export interface BookingCardProps {
  booking: BookingI
  roomId: string
  /** All bookings of the room — passed to the edit form's conflict check. */
  existingBookings: BookingI[]
  isAdmin: boolean
}
