import { orderBy, where } from 'firebase/firestore'
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

  /** All bookings for a given room, ordered by date then start time. */
  getByRoom(roomId: string): Promise<BookingI[]> {
    return this.getAll(
      where('roomId', '==', roomId),
      orderBy('date'),
      orderBy('startTime')
    )
  }
}

export const bookingsService = new BookingsService()
