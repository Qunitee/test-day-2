import type { BookingI } from '@/shared/models/booking/booking.model.ts'

export interface BookingListProps {
  roomId: string
  bookings: BookingI[]
  isAdmin: boolean
}
