export const AppRoute = {
  Home: '/',
  Login: '/login',
  Register: '/register',
  RoomDetails: '/rooms/:roomId',
} as const

export type AppRoute = (typeof AppRoute)[keyof typeof AppRoute]

export const buildRoomDetailsPath = (roomId: string): string =>
  `/rooms/${roomId}`
