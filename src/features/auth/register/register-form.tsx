import { FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'
import {
  CardContent,
  CardHeader,
  CardTitle,
  UiCard,
} from '@/shared/ui/ui-card/ui-card.tsx'
import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'
import { ControlledInput } from '@/shared/components/controlled-input/controlled-input.tsx'
import { useRegisterForm } from '@/features/auth/register/hooks/use-register-form.ts'
import type { AuthUserI } from '@/shared/models/user/auth-user.model.ts'
import { AppRoute } from '@/shared/constants/routes.ts'

interface RegisterFormProps {
  onSuccess?: (user: AuthUserI) => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { submit, isLoading, error, ...methods } = useRegisterForm({ onSuccess })

  return (
    <FormProvider {...methods}>
      <form onSubmit={submit} noValidate>
        <UiCard className="w-96 p-6 gap-5">
          <CardHeader className="p-0">
            <CardTitle className="text-lg">Create account</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col p-0 gap-3">
            <ControlledInput
              name="name"
              label="Name"
              type="text"
              control={methods.control}
            />
            <ControlledInput
              name="email"
              label="Email"
              type="email"
              control={methods.control}
            />
            <ControlledInput
              name="password"
              label="Password"
              type="password"
              control={methods.control}
            />
            {error && <span className="text-sm text-destructive">{error}</span>}
            <UiButton type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Creating…' : 'Create account'}
            </UiButton>
            <span className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to={AppRoute.Login} className="text-primary underline">
                Sign in
              </Link>
            </span>
          </CardContent>
        </UiCard>
      </form>
    </FormProvider>
  )
}
