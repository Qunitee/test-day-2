import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginValidationSchema } from '@/shared/schemas/login-validation-schema.ts'
import { localStorageService } from '@/shared/services/local-storage-service/local-storage.service.ts'
import { UserKey } from '@/shared/constants/local-storage-constants.ts'
import type { DefaultUserI } from '@/shared/models/user/default-user.model.ts'

type LoginFormValues = z.infer<typeof loginValidationSchema>

interface useLoginFormHookI {
  onSuccess?: (user: DefaultUserI) => void
}

export function useLoginFormHook({ onSuccess }: useLoginFormHookI = {}) {
  const { ...methods } = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submit = methods.handleSubmit((values) => {
    try {
      const user: DefaultUserI = {
        id: crypto.randomUUID(),
        name: values.email.split('@')[0],
        ...values,
      }

      localStorageService.setItem(UserKey, user)
      onSuccess?.(user)
    } catch (error) {
      throw new Error('Під час логіну виникла помилка', { cause: error })
    }
  })

  return { submit, ...methods }
}
