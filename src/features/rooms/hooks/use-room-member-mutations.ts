import { useMutation, useQueryClient } from '@tanstack/react-query'
import { roomsService } from '@/shared/services/rooms-service/rooms.service.ts'
import type { RoomMemberI } from '@/shared/models/room/room-role.model.ts'
import { QueryKey } from '@/shared/constants/query-keys.ts'

function useInvalidateRooms() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: [QueryKey.Rooms] })
}

export function useAddMember() {
  const invalidateRooms = useInvalidateRooms()
  return useMutation({
    mutationFn: (params: { roomId: string; member: RoomMemberI }) =>
      roomsService.addMember(params.roomId, params.member),
    onSuccess: invalidateRooms,
  })
}

export function useRemoveMember() {
  const invalidateRooms = useInvalidateRooms()
  return useMutation({
    mutationFn: (params: { roomId: string; email: string }) =>
      roomsService.removeMember(params.roomId, params.email),
    onSuccess: invalidateRooms,
  })
}
