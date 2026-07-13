import type { FieldValues } from 'react-hook-form'
import { ControlledField } from '@/shared/components/controlled-field/controlled-field.tsx'
import type { ControlledFieldProps } from '@/shared/components/controlled-field/controlled-field-props.ts'
import { UiInput } from '@/shared/ui/ui-input/input.tsx'
import type { UiInputProps } from '@/shared/ui/ui-input/ui-input-props.ts'

export function ControlledInput<T extends FieldValues>(
  props: Omit<ControlledFieldProps<T, UiInputProps>, 'component'>
) {
  return <ControlledField {...props} component={UiInput} />
}
