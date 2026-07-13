import { Link, useParams } from 'react-router-dom'
import { useRoom } from '@/features/rooms/hooks/use-rooms.ts'
import { UiSpinner } from '@/shared/ui/ui-spinner/ui-spinner.tsx'
import { AppRoute } from '@/shared/constants/routes.ts'

export function RoomDetailsPage() {
  const { roomId } = useParams<{ roomId: string }>()
  const { data: room, isLoading, isError, error } = useRoom(roomId ?? '')

  if (isLoading) return <UiSpinner fullscreen />

  if (isError) {
    return (
      <div className="p-8">
        <span className="text-sm text-destructive">{error.message}</span>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="p-8 flex flex-col gap-2">
        <p className="text-muted-foreground">Room not found.</p>
        <Link to={AppRoute.Home} className="text-primary underline">
          Back to rooms
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8 flex flex-col gap-6">
      <Link
        to={AppRoute.Home}
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Back to rooms
      </Link>

      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">{room.name}</h1>
        {room.description && (
          <p className="text-muted-foreground">{room.description}</p>
        )}
        <span className="text-xs text-muted-foreground">
          {room.members.length} member{room.members.length === 1 ? '' : 's'}
        </span>
      </header>

      <section>
        <h2 className="text-lg font-semibold mb-2">Bookings</h2>
        <p className="text-sm text-muted-foreground">Bookings coming next.</p>
      </section>
    </div>
  )
}
