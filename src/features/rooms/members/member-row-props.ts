import type { RoomMemberI } from '@/shared/models/room/room-role.model.ts'

export interface MemberRowProps {
  roomId: string
  member: RoomMemberI
  canRemove: boolean
}
