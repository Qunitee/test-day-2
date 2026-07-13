import { useQuery } from '@tanstack/react-query'
import { roomsService } from '@/shared/services/rooms-service/rooms.service.ts'
import { QueryKey } from '@/shared/constants/query-keys.ts'

export function useRooms() {
  return useQuery({
    queryKey: [QueryKey.Rooms],
    queryFn: () => roomsService.getAll(),
  })
}

export function useRoom(roomId: string) {
  return useQuery({
    queryKey: [QueryKey.Rooms, roomId],
    queryFn: () => roomsService.getById(roomId),
    enabled: Boolean(roomId),
  })
}
