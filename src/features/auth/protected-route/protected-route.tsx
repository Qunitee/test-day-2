import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/shared/store/auth-store/auth-store.ts'
import { UiSpinner } from '@/shared/ui/ui-spinner/ui-spinner.tsx'
import { AppRoute } from '@/shared/constants/routes.ts'

export function ProtectedRoute() {
  const user = useAuthStore(s => s.user)
  const isInitializing = useAuthStore(s => s.isInitializing)

  if (isInitializing) return <UiSpinner fullscreen />
  if (!user) return <Navigate to={AppRoute.Login} replace />

  return <Outlet />
}
