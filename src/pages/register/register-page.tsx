import { useNavigate } from 'react-router-dom'
import { RegisterForm } from '@/features/auth/register/register-form.tsx'
import { AppRoute } from '@/shared/constants/routes.ts'

export function RegisterPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <RegisterForm
        onSuccess={() => navigate(AppRoute.Home, { replace: true })}
      />
    </div>
  )
}
