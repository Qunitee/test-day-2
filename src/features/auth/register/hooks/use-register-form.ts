import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { registerValidationSchema } from '@/shared/schemas/register-validation-schema.ts'
import { authService } from '@/shared/services/auth-service/auth.service.ts'
import { useAuthStore } from '@/shared/store/auth-store/auth-store.ts'
import type { AuthUserI } from '@/shared/models/user/auth-user.model.ts'

type RegisterFormValues = z.infer<typeof registerValidationSchema>

interface UseRegisterFormI {
  onSuccess?: (user: AuthUserI) => void
}

export function useRegisterForm({ onSuccess }: UseRegisterFormI = {}) {
  const setUser = useAuthStore(s => s.setUser)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerValidationSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const submit = methods.handleSubmit(async values => {
    setError(null)
    setIsLoading(true)
    try {
      const user = await authService.register(values)
      setUser(user)
      onSuccess?.(user)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  })

  return { submit, isLoading, error, ...methods }
}
