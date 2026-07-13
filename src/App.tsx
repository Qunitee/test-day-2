import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { useApplyTheme } from '@/shared/hooks/use-apply-theme.tsx'
import { useAuthListener } from '@/features/auth/hooks/use-auth-listener.ts'
import { AppRoutes } from '@/app/router/app-routes.tsx'
import { queryClient } from '@/app/providers/query-client.ts'

export function App() {
  useApplyTheme()
  useAuthListener()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
