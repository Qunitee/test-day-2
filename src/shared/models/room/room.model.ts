import type { RoomMemberI } from '@/shared/models/room/room-role.model.ts'

export interface RoomI {
  id: string
  name: string
  description: string
  createdBy: string
  members: RoomMemberI[]
}
