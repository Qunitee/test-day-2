export interface BookingI {
  id: string
  roomId: string
  /** uid of the user who created the booking. */
  userId: string
  /** Booking day in `yyyy-MM-dd`. */
  date: string
  /** Start time in `HH:mm` (24h). */
  startTime: string
  /** End time in `HH:mm` (24h). */
  endTime: string
  description: string
}
