import { useMutation, useQueryClient } from '@tanstack/react-query'
import { roomsService } from '@/shared/services/rooms-service/rooms.service.ts'
import type { RoomI } from '@/shared/models/room/room.model.ts'
import type { EntityData } from '@/shared/services/firestore-service/firestore-crud.service.ts'
import { QueryKey } from '@/shared/constants/query-keys.ts'

function useInvalidateRooms() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: [QueryKey.Rooms] })
}

export function useCreateRoom() {
  const invalidateRooms = useInvalidateRooms()
  return useMutation({
    mutationFn: (payload: EntityData<RoomI>) => roomsService.create(payload),
    onSuccess: invalidateRooms,
  })
}

export function useUpdateRoom() {
  const invalidateRooms = useInvalidateRooms()
  return useMutation({
    mutationFn: (params: { id: string; payload: Partial<EntityData<RoomI>> }) =>
      roomsService.update(params.id, params.payload),
    onSuccess: invalidateRooms,
  })
}

export function useDeleteRoom() {
  const invalidateRooms = useInvalidateRooms()
  return useMutation({
    mutationFn: (id: string) => roomsService.remove(id),
    onSuccess: invalidateRooms,
  })
}
