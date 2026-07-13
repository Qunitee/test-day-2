import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useRoom } from '@/features/rooms/hooks/use-rooms.ts'
import { useRoomRole } from '@/features/rooms/hooks/use-room-role.ts'
import { useBookings } from '@/features/bookings/hooks/use-bookings.ts'
import { BookingList } from '@/features/bookings/booking-list/booking-list.tsx'
import { BookingFormDialog } from '@/features/bookings/booking-form/booking-form-dialog.tsx'
import { MemberForm } from '@/features/rooms/members/member-form.tsx'
import { MemberList } from '@/features/rooms/members/member-list.tsx'
import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'
import { UiSpinner } from '@/shared/ui/ui-spinner/ui-spinner.tsx'
import { useAuthStore } from '@/shared/store/auth-store/auth-store.ts'
import { AppRoute } from '@/shared/constants/routes.ts'

export function RoomDetailsPage() {
  const { roomId = '' } = useParams<{ roomId: string }>()

  const user = useAuthStore(s => s.user)
  const roomQuery = useRoom(roomId)
  const bookingsQuery = useBookings(roomId)
  const { isAdmin } = useRoomRole(roomQuery.data)

  const [isCreateOpen, setIsCreateOpen] = useState(false)

  if (roomQuery.isLoading) return <UiSpinner fullscreen />

  if (roomQuery.isError) {
    return (
      <div className="p-8">
        <span className="text-sm text-destructive">
          {roomQuery.error.message}
        </span>
      </div>
    )
  }

  const room = roomQuery.data
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

  const bookings = bookingsQuery.data ?? []

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
          {isAdmin && ' · you are an admin'}
        </span>
      </header>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Bookings</h2>
          {isAdmin && (
            <BookingFormDialog
              roomId={roomId}
              existingBookings={bookings}
              open={isCreateOpen}
              onOpenChange={setIsCreateOpen}
              trigger={<UiButton variant="primary">New booking</UiButton>}
            />
          )}
        </div>

        {bookingsQuery.isLoading && <UiSpinner />}
        {bookingsQuery.isError && (
          <span className="text-sm text-destructive">
            {bookingsQuery.error.message}
          </span>
        )}
        {!bookingsQuery.isLoading && (
          <BookingList roomId={roomId} bookings={bookings} isAdmin={isAdmin} />
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Members</h2>
        {isAdmin && <MemberForm roomId={roomId} />}
        <MemberList
          roomId={roomId}
          members={room.members}
          isAdmin={isAdmin}
          currentUserEmail={user?.email ?? ''}
        />
      </section>
    </div>
  )
}
