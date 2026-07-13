import { useNavigate } from 'react-router-dom'
import { LoginForm } from '@/features/auth/login/login-form.tsx'
import { AppRoute } from '@/shared/constants/routes.ts'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <LoginForm
        onSuccess={() => navigate(AppRoute.Home, { replace: true })}
      />
    </div>
  )
}
