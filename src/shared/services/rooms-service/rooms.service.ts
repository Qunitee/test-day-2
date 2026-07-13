import { runTransaction } from 'firebase/firestore'
import { db } from '@/firebase/firebase.config.ts'
import { FirestoreCrudService } from '@/shared/services/firestore-service/firestore-crud.service.ts'
import { getFirebaseErrorMessage } from '@/shared/utils/firebase-error.util.ts'
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
   *
   * Runs inside a Firestore transaction so the read-modify-write on the
   * `members` array is atomic — concurrent member changes on the same room
   * cannot overwrite each other.
   */
  async addMember(roomId: string, member: RoomMemberI): Promise<void> {
    await this.mutateMembers(roomId, members => {
      const alreadyMember = members.some(m => m.email === member.email)
      return alreadyMember
        ? members.map(m => (m.email === member.email ? member : m))
        : [...members, member]
    })
  }

  /** Removes a member by email (atomic, see {@link addMember}). */
  async removeMember(roomId: string, email: string): Promise<void> {
    await this.mutateMembers(roomId, members =>
      members.filter(m => m.email !== email)
    )
  }

  /**
   * Atomically reads the room's members, applies `updater`, and writes back
   * within a single transaction.
   */
  private async mutateMembers(
    roomId: string,
    updater: (members: RoomMemberI[]) => RoomMemberI[]
  ): Promise<void> {
    try {
      await runTransaction(db, async tx => {
        const ref = this.docRef(roomId)
        const snapshot = await tx.get(ref)
        if (!snapshot.exists()) throw new Error('Room not found')

        const current = (snapshot.data() as RoomI).members ?? []
        tx.update(ref, { members: updater(current) })
      })
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error), { cause: error })
    }
  }
}

export const roomsService = new RoomsService()
