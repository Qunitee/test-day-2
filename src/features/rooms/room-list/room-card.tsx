import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CardContent,
  CardHeader,
  CardTitle,
  UiCard,
} from '@/shared/ui/ui-card/ui-card.tsx'
import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'
import { ConfirmDialog } from '@/shared/components/confirm-dialog/confirm-dialog.tsx'
import { RoomFormDialog } from '@/features/rooms/room-form/room-form-dialog.tsx'
import { useDeleteRoom } from '@/features/rooms/hooks/use-room-mutations.ts'
import { useAuthStore } from '@/shared/store/auth-store/auth-store.ts'
import { buildRoomDetailsPath } from '@/shared/constants/routes.ts'
import type { RoomI } from '@/shared/models/room/room.model.ts'

interface RoomCardProps {
  room: RoomI
}

export function RoomCard({ room }: RoomCardProps) {
  const user = useAuthStore(s => s.user)
  const deleteRoom = useDeleteRoom()
  const [isEditOpen, setIsEditOpen] = useState(false)

  const isOwner = user?.uid === room.createdBy

  return (
    <UiCard className="p-4 gap-3">
      <CardHeader className="p-0 flex-row items-start justify-between gap-2">
        <CardTitle>
          <Link
            to={buildRoomDetailsPath(room.id)}
            className="hover:underline"
          >
            {room.name}
          </Link>
        </CardTitle>
        {isOwner && (
          <div className="flex gap-1">
            <RoomFormDialog
              room={room}
              open={isEditOpen}
              onOpenChange={setIsEditOpen}
              trigger={
                <UiButton variant="accent-soft" size="sm">
                  Edit
                </UiButton>
              }
            />
            <ConfirmDialog
              title="Delete room?"
              description={`"${room.name}" and its members will be permanently removed. This cannot be undone.`}
              confirmLabel="Delete"
              isPending={deleteRoom.isPending}
              onConfirm={() => deleteRoom.mutateAsync(room.id)}
              trigger={
                <UiButton
                  variant="destructive-soft"
                  size="sm"
                  disabled={deleteRoom.isPending}
                >
                  {deleteRoom.isPending ? 'Deleting…' : 'Delete'}
                </UiButton>
              }
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-2">
        {room.description && (
          <p className="text-sm text-muted-foreground">{room.description}</p>
        )}
        <span className="text-xs text-muted-foreground">
          {room.members.length} member{room.members.length === 1 ? '' : 's'}
        </span>
        {deleteRoom.error && (
          <span className="text-sm text-destructive">
            {deleteRoom.error.message}
          </span>
        )}
      </CardContent>
    </UiCard>
  )
}
