export const RoomRole = {
  Admin: 'admin',
  User: 'user',
} as const

export type RoomRole = (typeof RoomRole)[keyof typeof RoomRole]

export interface RoomMemberI {
  email: string
  role: RoomRole
}
