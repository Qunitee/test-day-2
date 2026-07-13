import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/shared/store/auth-store/auth-store.ts'
import { authService } from '@/shared/services/auth-service/auth.service.ts'
import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'
import { UiSpinner } from '@/shared/ui/ui-spinner/ui-spinner.tsx'
import { AppRoute } from '@/shared/constants/routes.ts'
import { useRooms } from '@/features/rooms/hooks/use-rooms.ts'
import { RoomList } from '@/features/rooms/room-list/room-list.tsx'
import { RoomFormDialog } from '@/features/rooms/room-form/room-form-dialog.tsx'

export function RoomsPage() {
  const user = useAuthStore(s => s.user)
  const navigate = useNavigate()

  const { data: rooms, isLoading, isError, error } = useRooms()

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState<string | null>(null)

  const handleLogout = async () => {
    setLogoutError(null)
    setIsLoggingOut(true)
    try {
      await authService.logout()
      navigate(AppRoute.Login, { replace: true })
    } catch (e) {
      setLogoutError(e instanceof Error ? e.message : 'Logout failed')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="p-8 flex flex-col gap-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Meeting Rooms</h1>
          <p className="text-sm text-muted-foreground">
            Signed in as {user?.name} ({user?.email})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RoomFormDialog
            open={isCreateOpen}
            onOpenChange={setIsCreateOpen}
            trigger={<UiButton variant="primary">New room</UiButton>}
          />
          <UiButton
            variant="outline"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Logging out…' : 'Logout'}
          </UiButton>
        </div>
      </header>

      {logoutError && (
        <span className="text-sm text-destructive">{logoutError}</span>
      )}

      {isLoading && <UiSpinner />}
      {isError && (
        <span className="text-sm text-destructive">{error.message}</span>
      )}
      {rooms && <RoomList rooms={rooms} />}
    </div>
  )
}
