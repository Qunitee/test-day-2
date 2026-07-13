import {
  CardContent,
  CardHeader,
  UiCard,
} from '@/shared/ui/ui-card/ui-card.tsx'
import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'
import { UiSeparatorWithLabel } from '@/shared/ui/ui-separator/ui-separator-with-label.tsx'
import { FormProvider } from 'react-hook-form'
import { useLoginFormHook } from '@/entities/login-form/hooks/login-form-hook.ts'
import { ControlledInput } from '@/shared/components/controlled-input/controlled-input.tsx'
import type { DefaultUserI } from '@/shared/models/user/default-user.model.ts'

export function LoginForm() {
  const onSuccess = (user: DefaultUserI) => console.log('logged in:', user)

  const { submit, ...methods } = useLoginFormHook({ onSuccess })

  return (
    <FormProvider {...methods}>
      <form onSubmit={submit}>
        <UiCard className="flex flex-col size-96 p-6 gap-5">
          <CardHeader className="p-0">
            <UiButton> test button </UiButton>
          </CardHeader>
          <UiSeparatorWithLabel className="px-2" label="або" />
          <CardContent className="flex flex-col p-0 gap-3">
            <ControlledInput
              name="email"
              label="email"
              type="email"
              control={methods.control}
            />
            <ControlledInput
              name="password"
              label="password"
              type="password"
              control={methods.control}
            />
            <UiButton type="submit"> Submit </UiButton>
          </CardContent>
        </UiCard>
      </form>
    </FormProvider>
  )
}
