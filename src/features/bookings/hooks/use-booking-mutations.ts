import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingsService } from '@/shared/services/bookings-service/bookings.service.ts'
import type { BookingI } from '@/shared/models/booking/booking.model.ts'
import type { EntityData } from '@/shared/services/firestore-service/firestore-crud.service.ts'
import { QueryKey } from '@/shared/constants/query-keys.ts'

function useInvalidateBookings() {
  const queryClient = useQueryClient()
  return (roomId: string) =>
    queryClient.invalidateQueries({ queryKey: [QueryKey.Bookings, roomId] })
}

export function useCreateBooking() {
  const invalidateBookings = useInvalidateBookings()
  return useMutation({
    mutationFn: (payload: EntityData<BookingI>) =>
      bookingsService.create(payload),
    onSuccess: booking => invalidateBookings(booking.roomId),
  })
}

export function useUpdateBooking() {
  const invalidateBookings = useInvalidateBookings()
  return useMutation({
    mutationFn: (params: {
      id: string
      roomId: string
      payload: Partial<EntityData<BookingI>>
    }) => bookingsService.update(params.id, params.payload),
    onSuccess: (_result, params) => invalidateBookings(params.roomId),
  })
}

export function useDeleteBooking() {
  const invalidateBookings = useInvalidateBookings()
  return useMutation({
    mutationFn: (params: { id: string; roomId: string }) =>
      bookingsService.remove(params.id),
    onSuccess: (_result, params) => invalidateBookings(params.roomId),
  })
}
