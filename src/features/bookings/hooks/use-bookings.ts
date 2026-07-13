import { useQuery } from '@tanstack/react-query'
import { bookingsService } from '@/shared/services/bookings-service/bookings.service.ts'
import { QueryKey } from '@/shared/constants/query-keys.ts'

export function useBookings(roomId: string) {
  return useQuery({
    queryKey: [QueryKey.Bookings, roomId],
    queryFn: () => bookingsService.getByRoom(roomId),
    enabled: Boolean(roomId),
  })
}
