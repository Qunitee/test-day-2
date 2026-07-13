import { Controller, type FieldValues } from 'react-hook-form'
import { UiLabel } from '@/shared/ui/ui-label/ui-label.tsx'
import type {
  ControlledFieldProps,
  FieldComponentProps,
} from '@/shared/components/controlled-field/controlled-field-props.ts'

export function ControlledField<
  T extends FieldValues,
  P extends FieldComponentProps,
>({
  name,
  control,
  label,
  component: Component,
  ...rest
}: ControlledFieldProps<T, P>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1.5">
          {label && <UiLabel htmlFor={name}>{label}</UiLabel>}
          <Component
            {...(rest as unknown as P)}
            id={name}
            value={field.value ?? ''}
            onChange={field.onChange}
            aria-invalid={!!fieldState.error}
          />
          {fieldState.error && (
            <span className="text-sm text-destructive">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  )
}
