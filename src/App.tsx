import { BrowserRouter } from 'react-router-dom'
import { useApplyTheme } from '@/shared/hooks/use-apply-theme.tsx'
import { useAuthListener } from '@/features/auth/hooks/use-auth-listener.ts'
import { AppRoutes } from '@/app/router/app-routes.tsx'

export function App() {
  useApplyTheme()
  useAuthListener()

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
