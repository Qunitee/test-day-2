import type { FieldValues } from 'react-hook-form'
import { ControlledField } from '@/shared/components/controlled-field/controlled-field.tsx'
import type { ControlledFieldProps } from '@/shared/components/controlled-field/controlled-field-props.ts'
import { UiDatePicker } from '@/shared/ui/ui-date-picker/ui-date-picker.tsx'
import type { UiDatePickerProps } from '@/shared/ui/ui-date-picker/ui-date-picker-props.ts'

export function ControlledDatePicker<T extends FieldValues>(
  props: Omit<ControlledFieldProps<T, UiDatePickerProps>, 'component'>
) {
  return <ControlledField {...props} component={UiDatePicker} />
}
