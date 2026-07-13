import { useAuthStore } from '@/shared/store/auth-store/auth-store.ts'
import { RoomRole } from '@/shared/models/room/room-role.model.ts'
import type { RoomI } from '@/shared/models/room/room.model.ts'

/**
 * Resolves the current user's role within a room. The room owner is always
 * treated as admin. Returns `isAdmin` for gating create/edit/delete actions.
 */
export function useRoomRole(room: RoomI | null | undefined) {
  const user = useAuthStore(s => s.user)

  if (!room || !user) return { role: null, isAdmin: false }

  const member = room.members.find(m => m.email === user.email)
  const isAdmin =
    room.createdBy === user.uid || member?.role === RoomRole.Admin

  return { role: member?.role ?? null, isAdmin }
}
