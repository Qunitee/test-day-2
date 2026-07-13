import { where } from 'firebase/firestore'
import { FirestoreCrudService } from '@/shared/services/firestore-service/firestore-crud.service.ts'
import type { BookingI } from '@/shared/models/booking/booking.model.ts'

/**
 * Firestore service for the `bookings` collection.
 * Inherits generic CRUD from {@link FirestoreCrudService}.
 */
export class BookingsService extends FirestoreCrudService<BookingI> {
  constructor() {
    super('bookings')
  }

  /**
   * All bookings for a given room, sorted by date then start time.
   * Sorting is done client-side to avoid requiring a Firestore composite
   * index (equality filter + order-by on different fields); the per-room
   * list is small.
   */
  async getByRoom(roomId: string): Promise<BookingI[]> {
    const bookings = await this.getAll(where('roomId', '==', roomId))
    return bookings.sort(
      (a, b) =>
        a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime)
    )
  }
}

export const bookingsService = new BookingsService()
