import type { ReactNode } from 'react'
import type { BookingI } from '@/shared/models/booking/booking.model.ts'

export interface BookingFormDialogProps {
  roomId: string
  /** Booking to edit; omit for create mode. */
  booking?: BookingI
  /** All bookings of the room — passed to the conflict check. */
  existingBookings: BookingI[]
  trigger: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}
