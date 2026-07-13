import { RoomCard } from '@/features/rooms/room-list/room-card.tsx'
import type { RoomI } from '@/shared/models/room/room.model.ts'

interface RoomListProps {
  rooms: RoomI[]
}

export function RoomList({ rooms }: RoomListProps) {
  if (rooms.length === 0) {
    return (
      <p className="text-muted-foreground">
        No rooms yet. Create the first one.
      </p>
    )
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map(room => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  )
}
