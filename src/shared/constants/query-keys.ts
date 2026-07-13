export const QueryKey = {
  Rooms: 'rooms',
} as const

export type QueryKey = (typeof QueryKey)[keyof typeof QueryKey]
