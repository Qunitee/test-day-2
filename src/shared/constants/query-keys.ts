export const QueryKey = {
  Rooms: 'rooms',
  Bookings: 'bookings',
} as const

export type QueryKey = (typeof QueryKey)[keyof typeof QueryKey]
