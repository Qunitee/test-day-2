import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@/features/auth/protected-route/protected-route.tsx'
import { LoginPage } from '@/pages/login/login-page.tsx'
import { RegisterPage } from '@/pages/register/register-page.tsx'
import { RoomsPage } from '@/pages/rooms/rooms-page.tsx'
import { AppRoute } from '@/shared/constants/routes.ts'

export function AppRoutes() {
  return (
    <Routes>
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route path={AppRoute.Register} element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path={AppRoute.Home} element={<RoomsPage />} />
      </Route>

      <Route path="*" element={<Navigate to={AppRoute.Home} replace />} />
    </Routes>
  )
}
