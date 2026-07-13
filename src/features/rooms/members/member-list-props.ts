import type { RoomMemberI } from '@/shared/models/room/room-role.model.ts'

export interface MemberListProps {
  roomId: string
  members: RoomMemberI[]
  isAdmin: boolean
  currentUserEmail: string
}
