import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/shared/store/auth-store/auth-store.ts'
import { authService } from '@/shared/services/auth-service/auth.service.ts'
import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'
import { AppRoute } from '@/shared/constants/routes.ts'

export function HomePage() {
  const user = useAuthStore(s => s.user)
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogout = async () => {
    setError(null)
    setIsLoggingOut(true)
    try {
      await authService.logout()
      navigate(AppRoute.Login, { replace: true })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Logout failed')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Meeting Rooms</h1>
      <p className="text-muted-foreground">
        Signed in as {user?.name} ({user?.email})
      </p>
      <UiButton
        variant="outline"
        className="w-fit"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? 'Logging out…' : 'Logout'}
      </UiButton>
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  )
}
