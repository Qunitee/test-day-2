import { FirestoreCrudService } from '@/shared/services/firestore-service/firestore-crud.service.ts'
import type { RoomI } from '@/shared/models/room/room.model.ts'
import type { RoomMemberI } from '@/shared/models/room/room-role.model.ts'

/**
 * Firestore service for the `rooms` collection.
 * Inherits generic CRUD from {@link FirestoreCrudService} and adds
 * membership-specific operations.
 */
export class RoomsService extends FirestoreCrudService<RoomI> {
  constructor() {
    super('rooms')
  }

  /**
   * Adds a member by email, or updates their role if already present.
   * Uses read-modify-write because Firestore cannot target an object inside
   * an array by one of its fields.
   */
  async addMember(roomId: string, member: RoomMemberI): Promise<void> {
    const room = await this.getById(roomId)
    if (!room) throw new Error('Room not found')

    const alreadyMember = room.members.some(m => m.email === member.email)
    const members = alreadyMember
      ? room.members.map(m => (m.email === member.email ? member : m))
      : [...room.members, member]

    await this.update(roomId, { members })
  }

  async removeMember(roomId: string, email: string): Promise<void> {
    const room = await this.getById(roomId)
    if (!room) throw new Error('Room not found')

    await this.update(roomId, {
      members: room.members.filter(m => m.email !== email),
    })
  }
}

export const roomsService = new RoomsService()
