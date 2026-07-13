import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { loginValidationSchema } from '@/shared/schemas/login-validation-schema.ts'
import { authService } from '@/shared/services/auth-service/auth.service.ts'
import { useAuthStore } from '@/shared/store/auth-store/auth-store.ts'
import type { AuthUserI } from '@/shared/models/user/auth-user.model.ts'

type LoginFormValues = z.infer<typeof loginValidationSchema>

interface UseLoginFormI {
  onSuccess?: (user: AuthUserI) => void
}

export function useLoginForm({ onSuccess }: UseLoginFormI = {}) {
  const setUser = useAuthStore(s => s.setUser)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submit = methods.handleSubmit(async values => {
    setError(null)
    setIsLoading(true)
    try {
      const user = await authService.login(values)
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
